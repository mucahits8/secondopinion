import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const locales = ["tr", "en", "es"];
const namespaces = ["common", "navigation", "home", "blog", "doctors", "specialties", "auth", "patient", "cases", "upload", "report", "validation", "errors"];
const errors = [];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function signature(value) {
  if (Array.isArray(value)) {
    if (value.length === 0) return "array";
    return `array<${signature(value[0])}>`;
  }
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .map((key) => `${key}:${signature(value[key])}`)
      .join("|");
  }
  return typeof value;
}

for (const namespace of namespaces) {
  const baselinePath = path.join(root, "messages", "tr", `${namespace}.json`);
  if (!fs.existsSync(baselinePath)) errors.push(`Missing baseline namespace: ${baselinePath}`);
  const baseline = fs.existsSync(baselinePath) ? signature(readJson(baselinePath)) : "";

  for (const locale of locales) {
    const file = path.join(root, "messages", locale, `${namespace}.json`);
    if (!fs.existsSync(file)) {
      errors.push(`Missing ${locale}/${namespace}.json`);
      continue;
    }
    const current = signature(readJson(file));
    if (current !== baseline) errors.push(`Mismatched key structure in ${locale}/${namespace}.json`);
  }
}

const routing = fs.readFileSync(path.join(root, "i18n", "routing.ts"), "utf8");
if (!routing.includes('["tr", "en", "es"]')) errors.push("Supported locales are not exactly tr/en/es in i18n/routing.ts");
if (!routing.includes('defaultLocale: Locale = "tr"')) errors.push("Default locale is not tr in i18n/routing.ts");

const formatter = fs.readFileSync(path.join(root, "lib", "i18n-format.ts"), "utf8");
if (!formatter.includes("Intl.DateTimeFormat")) errors.push("Date formatting helper must use Intl.DateTimeFormat");
if (!formatter.includes("Intl.NumberFormat")) errors.push("Number formatting helper must use Intl.NumberFormat");

const nav = fs.readFileSync(path.join(root, "components", "site-chrome.tsx"), "utf8");
if (!nav.includes("localizePath(pathname, targetLocale)")) errors.push("Language switcher must preserve the equivalent current path");
if (!nav.includes("NEXT_LOCALE")) errors.push("Language switcher must persist locale preference");

const sourceDirs = ["app", "components"];
for (const sourceDir of sourceDirs) {
  const dir = path.join(root, sourceDir);
  const files = [];
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) walk(absolute);
      if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) files.push(absolute);
    }
  };
  walk(dir);

  for (const file of files) {
    const rel = path.relative(root, file);
    const content = fs.readFileSync(file, "utf8");
    if (/aria-label="|placeholder="/.test(content)) {
      errors.push(`Hardcoded aria-label or placeholder in ${rel}`);
    }
    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (!line.includes("</")) return;
      const jsxTextMatches = line.match(/>\s*[^<{>\s][^<{>]*[A-Za-zÇĞİÖŞÜçğıöşü][^<{>]*\s*</g) ?? [];
      for (const match of jsxTextMatches) {
        const text = match.replace(/^>\s*/, "").replace(/\s*<$/, "").trim();
        if (text && !/^[-–—]$/.test(text)) errors.push(`Possible hardcoded JSX text in ${rel}:${index + 1}: ${text}`);
      }
    });
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("i18n checks passed");
