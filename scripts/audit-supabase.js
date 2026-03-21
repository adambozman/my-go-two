#!/usr/bin/env node
/**
 * Supabase schema vs code drift detector.
 * - Parses live schema dump (SQL) and migration folder to build column lists.
 * - Scans TS/TSX/JS files for Supabase table/column usage.
 * - Emits JSON report to --out (default stdout).
 * Exits 1 when missing tables/columns are detected; unused columns are warnings only.
 */
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const getArg = (flag, fallback = null) => {
  const idx = args.indexOf(flag);
  return idx >= 0 ? args[idx + 1] : fallback;
};

const livePath = getArg("--live");
const migrationsDir = getArg("--migrations", "supabase/migrations");
const codeDir = getArg("--code", "src");
const functionsDir = getArg("--functions", "supabase/functions");
const outPath = getArg("--out");

if (!livePath) {
  console.error("Missing --live <live_schema.sql>");
  process.exit(2);
}

const readFileSafe = (p) => {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return "";
  }
};

const collectFiles = (dir, exts = [".ts", ".tsx", ".js", ".mjs", ".cjs"]) => {
  const results = [];
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    if (!fs.existsSync(current)) continue;
    const stat = fs.statSync(current);
    if (stat.isDirectory()) {
      fs.readdirSync(current).forEach((name) => stack.push(path.join(current, name)));
    } else if (exts.includes(path.extname(current))) {
      results.push(current);
    }
  }
  return results;
};

const parseSchema = (sqlText) => {
  const tables = new Map();
  const regex = /create\s+table\s+(?:if\s+not\s+exists\s+)?["']?public["']?\.["']?([\w\-]+)["']?\s*\(([\s\S]*?)\);/gi;
  let match;
  while ((match = regex.exec(sqlText)) !== null) {
    const [, table, body] = match;
    const cols = new Set();
    body.split("\n").forEach((line) => {
      const colMatch = line.trim().match(/^["']?([\w\-]+)["']?\s+/);
      if (colMatch) cols.add(colMatch[1]);
    });
    tables.set(table, cols);
  }
  return tables;
};

const parseMigrations = () => {
  const files = collectFiles(migrationsDir, [".sql"]);
  const all = files.map(readFileSafe).join("\n");
  return parseSchema(all);
};

const parseLiveSchema = () => parseSchema(readFileSafe(livePath));

const parseCodeUsage = () => {
  const tables = new Map();
  const files = [...collectFiles(codeDir), ...collectFiles(functionsDir)];
  const tableRegex = /from\(\s*["'`]([\w\-]+)["'`]\s*\)/g;
  const selectRegex = /\.select\(\s*["'`]([^"'`)]*)["'`]/g;

  files.forEach((file) => {
    const text = readFileSafe(file);
    let tMatch;
    while ((tMatch = tableRegex.exec(text)) !== null) {
      const table = tMatch[1];
      if (!tables.has(table)) tables.set(table, new Set());
    }
    let sMatch;
    while ((sMatch = selectRegex.exec(text)) !== null) {
      const cols = sMatch[1]
        .split(",")
        .map((c) => c.trim().replace(/["'`]/g, ""))
        .filter(Boolean)
        .map((c) => c.split(" ")[0].split(":")[0]); // strip aliases
      cols.forEach((col) => {
        const tableHintMatch = text.slice(0, sMatch.index).match(tableRegex);
        const table = tableHintMatch ? tableHintMatch[1] : null;
        if (!table) return;
        if (!tables.has(table)) tables.set(table, new Set());
        tables.get(table).add(col);
      });
    }
  });
  return tables;
};

const liveTables = parseLiveSchema();
const migrationTables = parseMigrations();
const codeTables = parseCodeUsage();

const issues = {
  missingTables: [],
  missingColumns: [],
  unusedColumns: [],
  tablesWithoutCode: [],
};

// Tables referenced in code but missing in live schema
for (const [table] of codeTables) {
  if (!liveTables.has(table)) {
    issues.missingTables.push({ table, source: "code" });
  }
}

// Columns referenced in code but missing in live schema
for (const [table, cols] of codeTables) {
  const liveCols = liveTables.get(table);
  if (!liveCols) continue;
  cols.forEach((col) => {
    if (!liveCols.has(col)) {
      issues.missingColumns.push({ table, column: col, source: "code" });
    }
  });
}

// Columns present in live schema but not referenced anywhere (warning only)
for (const [table, liveCols] of liveTables) {
  const codeCols = codeTables.get(table) ?? new Set();
  liveCols.forEach((col) => {
    if (!codeCols.has(col)) {
      issues.unusedColumns.push({ table, column: col });
    }
  });
}

// Tables defined in migrations but not touched in code (could be backend-only)
for (const [table] of migrationTables) {
  if (!codeTables.has(table)) {
    issues.tablesWithoutCode.push({ table });
  }
}

const report = {
  summary: {
    missingTables: issues.missingTables.length,
    missingColumns: issues.missingColumns.length,
    unusedColumns: issues.unusedColumns.length,
    tablesWithoutCode: issues.tablesWithoutCode.length,
  },
  issues,
};

if (outPath) {
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
} else {
  console.log(JSON.stringify(report, null, 2));
}

if (issues.missingTables.length || issues.missingColumns.length) {
  process.exit(1);
}
