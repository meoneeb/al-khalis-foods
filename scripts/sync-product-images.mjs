import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const productsPath = path.join(ROOT, "src/data/products.json");
const sitePath = path.join(ROOT, "src/data/site.json");
const imagesDir = path.join(ROOT, "public/images/products");

/** Product id → image filename stem when they differ on disk. */
const STEM_OVERRIDES = {
  "crushed-corrainder": "crushed-corriander",
  "white-cumin-whole": "white-cumin",
};

const site = JSON.parse(fs.readFileSync(sitePath, "utf8"));
const PRODUCT_PLACEHOLDER =
  site.placeholders?.find((p) => p.type === "product")?.path ??
  "/images/placeholders/product-package.webp";

const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const files = fs.readdirSync(imagesDir);

const fileByStem = new Map();
for (const file of files) {
  const stem = path.parse(file).name;
  const ext = path.parse(file).ext.toLowerCase();
  const existing = fileByStem.get(stem);
  if (!existing || ext === ".webp") {
    fileByStem.set(stem, file);
  }
}

function resolveImage(item) {
  const stem = STEM_OVERRIDES[item.id] ?? item.id;
  const match = fileByStem.get(stem);
  if (match) {
    return `/images/products/${match}`;
  }
  return PRODUCT_PLACEHOLDER;
}

let updated = 0;
for (const item of products.items) {
  const next = resolveImage(item);
  if (item.image !== next) {
    item.image = next;
    updated += 1;
  }
}

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2) + "\n");
console.log(`Synced ${products.items.length} products (${updated} image URLs updated).`);
