#!/usr/bin/env node
/**
 * Guardrail: prevent reintroducing hard-coded Gemini API key fallbacks.
 * Exits 1 when suspicious key material/decoding patterns are found.
 */
import fs from "fs";
import path from "path";

const FUNCTIONS_ROOT = "supabase/functions";
const ALLOWED_EXT = new Set([".ts", ".js", ".mjs"]);

const FORBIDDEN_PATTERNS = [
  { name: "encoded key constant", regex: /\bconst\s+_K\s*=/g },
  { name: "base64 key decode chain", regex: /TextDecoder\s*\(\)\s*\.decode\s*\(\s*Uint8Array\.from\s*\(\s*atob\s*\(/g },
];

const walkFiles = (rootDir) => {
  const files = [];
  const stack = [rootDir];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current || !fs.existsSync(current)) continue;
    const stat = fs.statSync(current);
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(current)) {
        stack.push(path.join(current, entry));
      }
      continue;
    }

    const ext = path.extname(current).toLowerCase();
    if (ALLOWED_EXT.has(ext)) files.push(current);
  }
  return files;
};

const countLine = (source, offset) => source.slice(0, offset).split("\n").length;

const findings = [];
for (const filePath of walkFiles(FUNCTIONS_ROOT)) {
  const source = fs.readFileSync(filePath, "utf8");
  for (const rule of FORBIDDEN_PATTERNS) {
    rule.regex.lastIndex = 0;
    let match;
    while ((match = rule.regex.exec(source)) !== null) {
      findings.push({
        file: filePath,
        line: countLine(source, match.index),
        issue: rule.name,
      });
    }
  }
}

if (findings.length > 0) {
  console.error("Hard-coded Gemini key patterns detected:");
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line} (${finding.issue})`);
  }
  process.exit(1);
}

console.log("Gemini key guard check passed.");
