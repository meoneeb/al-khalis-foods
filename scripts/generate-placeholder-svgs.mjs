import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "public", "images");

function svg({ title, subtitle, accent = "#A42A22", accent2 = "#E68525" }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${title}">
  <rect width="800" height="600" fill="#faf5ee"/>
  <circle cx="120" cy="100" r="180" fill="${accent2}" opacity="0.12"/>
  <circle cx="680" cy="480" r="200" fill="${accent}" opacity="0.1"/>
  <rect x="200" y="140" width="400" height="320" rx="24" fill="#f5efe6" stroke="#d4c4b0" stroke-width="2"/>
  <rect x="280" y="200" width="240" height="200" rx="12" fill="${accent}" opacity="0.15"/>
  <text x="400" y="320" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#721112">${title}</text>
  <text x="400" y="360" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" fill="#6b6356">${subtitle}</text>
</svg>`;
}

const dirs = [
  "placeholders",
  "sections",
  "products",
];
for (const d of dirs) {
  fs.mkdirSync(path.join(root, d), { recursive: true });
}

const placeholders = [
  ["product-bulk-spices.svg", "Bulk Spices", "1000g commercial packs"],
  ["product-bulk-recipe.svg", "Bulk Recipe", "Masala & blends"],
  ["product-dessert.svg", "Dessert", "Specialty mixes"],
  ["product-default.svg", "Al-Khalis Prime", "Product image"],
];

for (const [file, t, s] of placeholders) {
  fs.writeFileSync(
    path.join(root, "placeholders", file),
    svg({ title: t, subtitle: s }),
  );
}

const sections = [
  ["hero-home.svg", "Al-Khalis Prime", "Premium commercial spices"],
  ["hero-about.svg", "Our story", "Quality & tradition"],
  ["hero-products.svg", "Product catalog", "51 bulk SKUs"],
  ["commercial-kitchen.svg", "Professional kitchens", "Hotels · Catering · Restaurants"],
  ["quality-assured.svg", "Quality assured", "Trusted sourcing"],
  ["hygienic-packing.svg", "Hygienic packing", "1000g bulk format"],
  ["product-range.svg", "Complete range", "Spices & recipe masalas"],
  ["ltg-process.svg", "LTG process", "Low temperature grinding"],
];

for (const [file, t, s] of sections) {
  fs.writeFileSync(path.join(root, "sections", file), svg({ title: t, subtitle: s }));
}

fs.writeFileSync(
  path.join(root, "products", "README.md"),
  `# Product photos\n\nAdd files named \`{slug}.jpg\` matching \`id\` in \`src/data/products.json\`.\nExample: \`red-chilli-powder.jpg\`\n`,
);
fs.writeFileSync(path.join(root, "products", ".gitkeep"), "");

console.log("SVG placeholders written");
