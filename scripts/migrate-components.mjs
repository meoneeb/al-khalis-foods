import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "src");
const componentsDir = path.join(root, "components");
const commonDir = path.join(componentsDir, "commonComponents");
const pageDir = path.join(componentsDir, "pageComponents");

const common = [
  "SiteHeader",
  "SiteFooter",
  "MobileNav",
  "MotionProvider",
  "ScrollBackdrop",
  "MotionSection",
  "HeroMotion",
  "SectionImage",
  "SplitSection",
];

const page = [
  "HomeHero",
  "AudienceChips",
  "FeaturedProducts",
  "ProductCard",
  "ProductImage",
  "ProductGrid",
  "ProductCategoryFilter",
  "ProductDetailView",
];

function fixImports(content) {
  return content
    .replace(/@\/components\/(commonComponents|pageComponents)\//g, "@/__TMP__/$1/")
    .replace(
      /from "@\/__TMP__\/(commonComponents|pageComponents)\/([^"]+)"/g,
      (_, folder, name) => `from "@/components/${folder}/${name}"`,
    )
    .replace(/@\/commonComponents\//g, "@/components/commonComponents/")
    .replace(/@\/pageComponents\//g, "@/components/pageComponents/");
}

fs.mkdirSync(commonDir, { recursive: true });
fs.mkdirSync(pageDir, { recursive: true });

function writeFromJsx(name, destDir) {
  const jsx = path.join(componentsDir, `${name}.jsx`);
  const js = path.join(destDir, `${name}.js`);
  if (fs.existsSync(jsx)) {
    fs.writeFileSync(js, fixImports(fs.readFileSync(jsx, "utf8")));
  }
}

for (const name of common) writeFromJsx(name, commonDir);
for (const name of page) writeFromJsx(name, pageDir);

const appFiles = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(js|jsx|mjs)$/.test(f)) appFiles.push(p);
  }
}
walk(path.join(root, "app"));

for (const file of appFiles) {
  let c = fs.readFileSync(file, "utf8");
  const n = fixImports(c);
  if (n !== c) fs.writeFileSync(file, n);
}


console.log("Migrated", common.length, "common +", page.length, "page components");
