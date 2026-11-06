// После сборки: убираем страницу 404 от Next.js, чтобы на неизвестных адресах всё было как раньше (стандартная 404 GitHub Pages)
import { rmSync } from "node:fs";

for (const f of ["404.html", "_not-found.html", "_not-found.txt", "_not-found"]) {
  rmSync(new URL(`../out/${f}`, import.meta.url), { recursive: true, force: true });
}
