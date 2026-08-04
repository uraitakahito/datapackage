/**
 * サイトの base を前置した URL を作る。
 *
 * Astro は **Markdown のリンク記法** には base と locale を補うが、
 * **HTML / JSX の属性** には一切触れない。`<a href="/standard/…">` や
 * `<LinkCard href="…">` はそのまま出力され、base 配下に置かれた fork
 * (https://uraitakahito.github.io/datapackage/) では 404 になる。
 * しかもビルドは警告を出さない —— 検知は `npm run check:base` の役目。
 *
 * 末尾スラッシュを落としてから繋ぐのは、`BASE_URL` の形が環境で違うため。
 *
 *   DP_BASE=/datapackage → BASE_URL = "/datapackage" → "/datapackage/x"
 *   DP_BASE 未設定       → BASE_URL = "/"            → "/x"
 *
 * 正規化せずに連結すると前者が `/datapackagex` になる。
 */
export const withBase = (path: string): string =>
  `${import.meta.env.BASE_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`
