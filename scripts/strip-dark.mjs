import fs from "fs";
import path from "path";

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(js|jsx|css)$/.test(f)) {
      const c = fs.readFileSync(p, "utf8");
      const n = c.replace(/\s+dark:[^\s"']+/g, "");
      if (n !== c) {
        fs.writeFileSync(p, n);
        console.log(p);
      }
    }
  }
}

walk(path.join(process.cwd(), "src"));
