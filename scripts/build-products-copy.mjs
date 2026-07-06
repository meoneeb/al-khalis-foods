import fs from "fs";

const products = JSON.parse(
  fs.readFileSync("src/data/products.json", "utf8"),
);

/** Product identity notes only — packaging (print + photo) stays unchanged. */
const SKU_GRAPHICS = {
  "red-chilli-powder": {
    bowl: "mound of vivid red chilli powder",
    topBowls: "red chilli powder in small wooden bowls",
    elements: "whole dried red chilies",
  },
  "red-chilli-crushed": {
    bowl: "coarse crushed red chilli flakes",
    topBowls: "crushed red chilli mix",
    elements: "broken dried red chilli pieces",
  },
  "turmeric-powder": {
    bowl: "bright golden turmeric powder",
    topBowls: "turmeric powder in wooden bowls",
    elements: "fresh turmeric root slices",
  },
  "corriander-powder": {
    bowl: "soft green-tan coriander powder",
    topBowls: "ground coriander powder",
    elements: "coriander seeds",
  },
  "crushed-corrainder": {
    bowl: "coarse crushed coriander",
    topBowls: "crushed coriander seeds and powder",
    elements: "whole coriander seeds",
  },
  "black-pepper-crushed": {
    bowl: "dark crushed black pepper",
    topBowls: "coarse crushed peppercorns",
    elements: "whole black peppercorns",
  },
  "black-pepper-powder": {
    bowl: "fine dark grey-black pepper powder",
    topBowls: "ground black pepper",
    elements: "black peppercorns",
  },
  "white-cumin-crushed": {
    bowl: "tan crushed cumin",
    topBowls: "crushed white cumin seeds",
    elements: "whole cumin seeds",
  },
  "white-cumin-powder": {
    bowl: "pale tan cumin powder",
    topBowls: "fine cumin powder",
    elements: "whole cumin seeds",
  },
  "white-cumin-whole": {
    bowl: "whole white cumin seeds",
    topBowls: "whole cumin seeds in wooden bowls",
  },
  "white-pepper-powder": {
    bowl: "cream-white pepper powder",
    topBowls: "fine white pepper powder",
    elements: "white peppercorns",
  },
  "garlic-powder": {
    bowl: "fine off-white garlic powder",
    topBowls: "garlic powder",
    elements: "garlic cloves",
  },
  "ginger-powder": {
    bowl: "golden-tan ginger powder",
    topBowls: "ginger powder",
    elements: "dried ginger root pieces",
  },
  "lemon-powder": {
    bowl: "light yellow lemon powder",
    topBowls: "citrus lemon powder",
    elements: "dried lemon slices",
  },
  "kachari-powder": {
    bowl: "earthy brown kachari powder",
    topBowls: "kachari spice powder",
    elements: "dried kachari pieces",
  },
  "papaya-powder": {
    bowl: "pale green-beige papaya powder",
    topBowls: "papaya powder",
    elements: "dried papaya chunks",
  },
  "biryani-masala": {
    bowl: "golden-orange biryani masala",
    topBowls: "biryani blend with visible whole spices",
    elements: "star anise, bay leaf, cloves",
  },
  "quorma-masala": {
    bowl: "rich brown-red qorma masala",
    topBowls: "qorma curry blend",
    elements: "cardamom pods, cinnamon stick",
  },
  "chicken-masala": {
    bowl: "warm orange-brown chicken masala",
    topBowls: "chicken curry blend",
    elements: "dried red chilli, cumin seeds",
  },
  "achar-gosht-masala": {
    bowl: "tangy red-brown achar gosht masala",
    topBowls: "achar gosht blend",
    elements: "pickled spice tones, fenugreek seeds",
  },
  "karahi-gosht-masala": {
    bowl: "vibrant red karahi masala",
    topBowls: "karahi blend with spice specks",
    elements: "dried red chillies, coriander seeds",
  },
  "tikka-masala": {
    bowl: "orange-red tikka masala",
    topBowls: "tikka marinade blend",
    elements: "dried red chilli, kasuri methi leaves",
  },
  "tikka-boti-masala": {
    bowl: "orange tikka boti masala",
    topBowls: "tikka boti seasoning",
    elements: "char-grilled spice props, red chilli flakes",
  },
  "tandori-masala": {
    bowl: "deep orange-red tandoori masala",
    topBowls: "tandoori blend",
    elements: "kashmiri chilli, kasuri methi",
  },
  "seekh-kabab-masala": {
    bowl: "aromatic seekh kabab masala",
    topBowls: "seekh kabab spice blend",
    elements: "cumin seeds, coriander seeds",
  },
  "fish-masala": {
    bowl: "golden fish masala powder",
    topBowls: "mild fish curry blend",
    elements: "fenugreek seeds, curry leaves",
  },
  "sajji-masala": {
    bowl: "Balochi-style sajji masala",
    topBowls: "sajji roast seasoning",
    elements: "rock salt crystals, whole cumin",
  },
  "chapali-kabab-masala": {
    bowl: "Peshawari chapali kabab masala",
    topBowls: "chapali kabab spice mix",
    elements: "coriander seeds, pomegranate seed tones",
  },
  "chicken-powder": {
    bowl: "beige savoury chicken powder",
    topBowls: "chicken stock-style powder",
    elements: "dried herb flecks",
  },
  "bombay-biryani-masala": {
    bowl: "golden Bombay biryani masala",
    topBowls: "Bombay-style biryani blend",
    elements: "star anise, mace, bay leaf",
  },
  "haleem-masala": {
    bowl: "warm brown haleem masala",
    topBowls: "haleem stew spice blend",
    elements: "whole spices, lentil-tone flecks",
  },
  "malai-tikka-masala": {
    bowl: "creamy orange malai tikka masala",
    topBowls: "malai tikka blend",
    elements: "cashew-tone creaminess, kasuri methi",
  },
  "muragh-cholay-masala": {
    bowl: "muragh cholay masala",
    topBowls: "chickpea chicken curry blend",
    elements: "chickpeas, dried red chilli",
  },
  "nihari-masala": {
    bowl: "rich dark nihari masala",
    topBowls: "deep brown nihari blend",
    elements: "whole garam spices, fennel seeds",
  },
  "broast-mix": {
    bowl: "golden broast coating mix",
    topBowls: "crispy broast seasoning",
    elements: "golden breadcrumb-style flecks",
  },
  "curry-salan-masala": {
    bowl: "yellow-amber curry salan masala",
    topBowls: "everyday curry salan blend",
    elements: "turmeric tone, cumin seeds",
  },
  "chaat-masala": {
    bowl: "tangy speckled chaat masala",
    topBowls: "chaat masala blend",
    elements: "black salt crystals, amchur tone",
  },
  "garam-masala-mix-powder": {
    bowl: "warm brown garam masala powder",
    topBowls: "ground garam masala",
    elements: "cardamom, cloves, cinnamon",
  },
  "garam-masala-mix-whole": {
    bowl: "whole garam masala mix",
    topBowls: "cardamom pods, cloves, cinnamon sticks",
    elements: "star anise, black peppercorns",
  },
  "instant-haleem-mix-powder": {
    bowl: "instant haleem mix with visible grains",
    topBowls: "haleem blend with lentils and wheat grains",
    elements: "split lentils, whole spices",
  },
  "zeera-raita-mix": {
    bowl: "zeera raita mix with green herb flecks",
    topBowls: "cumin raita seasoning",
    elements: "cumin seeds, mint leaves",
  },
  "dahi-bhally-masala-mix": {
    bowl: "dahi bhalla chaat masala mix",
    topBowls: "street-style chaat blend",
    elements: "tamarind tone, black salt",
  },
  "french-fries-masala-mix": {
    bowl: "golden french fries masala",
    topBowls: "fries seasoning mix",
    elements: "paprika flecks, salt crystals",
  },
  "zinger-merination-mix-masala": {
    bowl: "spicy orange zinger marination mix",
    topBowls: "zinger marinade blend",
    elements: "red chilli flakes, garlic powder tone",
  },
  "zinger-seasoning-mix-masala": {
    bowl: "zinger crispy chicken seasoning",
    topBowls: "zinger seasoning blend",
    elements: "paprika, black pepper flecks",
  },
  "finger-fish-merination-mix": {
    bowl: "fish fry marination mix",
    topBowls: "finger fish marinade blend",
    elements: "lemon tone, coriander seeds",
  },
  "finger-fish-seasoning-mix": {
    bowl: "crispy fish finger seasoning",
    topBowls: "fish seasoning blend",
    elements: "lemon zest tone, parsley flecks",
  },
  "macaroni-masala": {
    bowl: "tomato-forward macaroni masala",
    topBowls: "macaroni spice blend",
    elements: "dried herb flecks, paprika",
  },
  "badam-pista-kheer-mix": {
    bowl: "pale gold badam pista kheer mix",
    topBowls: "kheer dessert mix",
    elements: "sliced almonds, pistachios, saffron strands",
  },
  "shami-kabab-masala": {
    bowl: "aromatic shami kabab masala",
    topBowls: "shami kabab spice blend",
    elements: "whole spices, lentil-tone flecks",
  },
  "yakhni-powder": {
    bowl: "savoury yakhni broth powder",
    topBowls: "yakhni spice powder",
    elements: "whole garam spices, fennel seeds",
  },
};

const PACKAGING_LOCK =
  "Do not modify the packaging in any way — no changes to print, photo areas, bowls, elements, colors, typography, layout, or borders. Use the reference pack image exactly as uploaded.";

function productRef(name, detail) {
  return `${PACKAGING_LOCK} Product reference: ${name}${detail ? ` — ${detail}` : ""}.`;
}

function formatProductDetail({ bowl, elements }) {
  const parts = [bowl];
  if (elements) parts.push(elements);
  return parts.join("; ");
}

function aiDesc(item) {
  const g = SKU_GRAPHICS[item.id];
  if (!g) {
    return productRef(item.name);
  }
  return productRef(item.name, formatProductDetail(g));
}

const items = products.items.map((item) => ({
  sku: item.id,
  aiPrompt: aiDesc(item),
}));

const out = { items };

fs.writeFileSync("src/data/productsai.json", JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${items.length} SKUs to productsai.json`);
