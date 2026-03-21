#!/usr/bin/env node
/**
 * Lightweight edge function security audit.
 * Flags:
 * - verify_jwt = false in supabase/config.toml
 * - functions missing Authorization guard (heuristic)
 * Exits 1 when any blocking issues are found.
 */
import fs from "fs";
import path from "path";

const configPath = "supabase/config.toml";
const functionsRoot = "supabase/functions";
const configText = fs.existsSync(configPath) ? fs.readFileSync(configPath, "utf8") : "";

const issues = [];

// Parse verify_jwt flags
const functionBlocks = [...configText.matchAll(/\[functions\.([^\]]+)\][^\[]*/g)];
functionBlocks.forEach((match) => {
  const name = match[1];
  const block = match[0];
  const verify = /verify_jwt\s*=\s*false/i.test(block);
  if (verify) {
    issues.push({
      type: "verify_jwt_disabled",
      function: name,
      severity: "fail",
      detail: "verify_jwt=false in config.toml",
    });
  }
});

// Heuristic auth guard detection
const collectFiles = (dir) => {
  const files = [];
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    if (!fs.existsSync(current)) continue;
    const stat = fs.statSync(current);
    if (stat.isDirectory()) {
      fs.readdirSync(current).forEach((n) => stack.push(path.join(current, n)));
    } else if (/\.(ts|js|mjs)$/.test(current)) {
      files.push(current);
    }
  }
  return files;
};

collectFiles(functionsRoot).forEach((file) => {
  const text = fs.readFileSync(file, "utf8");
  const hasAuth =
    /Authorization/i.test(text) ||
    /supabase\.auth\.getUser/i.test(text) ||
    /verify_jwt/i.test(text);
  const allowsAllCors = /Access-Control-Allow-Origin"\s*:\s*"\*"/.test(text);
  if (!hasAuth) {
    issues.push({
      type: "missing_auth_guard",
      function: file.replace(`${functionsRoot}/`, ""),
      severity: "fail",
      detail: "No Authorization handling detected",
    });
  }
  if (allowsAllCors) {
    issues.push({
      type: "permissive_cors",
      function: file.replace(`${functionsRoot}/`, ""),
      severity: "warn",
      detail: 'Access-Control-Allow-Origin: "*" detected',
    });
  }
});

const report = { summary: { total: issues.length }, issues };
console.log(JSON.stringify(report, null, 2));

const hasBlocking = issues.some((i) => i.severity === "fail");
if (hasBlocking) process.exit(1);
