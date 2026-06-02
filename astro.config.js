import { rehypeHeadingIds } from "@astrojs/markdown-remark"
import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"
import process from "process"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { remarkHeadingId } from "remark-custom-heading-id"
import starlightBlog from "starlight-blog"

// import starlightLinksValidator from "starlight-links-validator"

// fork (base=/datapackage) では Astro は本文(著者が書いた markdown/MDX)の root 相対
// リンク・画像に base を付与しない (Starlight 生成のナビ等は別途 base+locale 対応済)。
// 本文の href/src が "/" 始まりのものに base を付け、ja ページのドキュメントリンクには
// locale (/ja) も付ける。アセット (拡張子あり) には locale を付けない。
function rehypeBaseLinks() {
  const base = (process.env.DP_BASE || "").replace(/\/$/, "")
  return (tree, file) => {
    if (!base) return
    const path = file.path || (file.history && file.history[0]) || ""
    const inJa = /[\\/]docs[\\/]ja[\\/]/.test(path)
    const visit = node => {
      if (node.type === "element" && node.properties) {
        for (const attr of ["href", "src"]) {
          const val = node.properties[attr]
          if (
            typeof val === "string" &&
            val.startsWith("/") &&
            !val.startsWith("//") &&
            !val.startsWith(base + "/")
          ) {
            const lastSeg = val.split(/[?#]/)[0].split("/").pop() || ""
            const isAsset = lastSeg.includes(".")
            const locale =
              inJa && !isAsset && !val.startsWith("/ja/") && val !== "/ja" ? "/ja" : ""
            node.properties[attr] = base + locale + val
          }
        }
      }
      if (node.children) node.children.forEach(visit)
    }
    visit(tree)
  }
}

// https://astro.build/config
export default defineConfig({
  // site/base は env 経由: 本家の apex 配信 (datapackage.org) はそのまま、
  // fork の Pages ビルドだけ DP_SITE/DP_BASE で /datapackage 配下に出す。
  site: process.env.DP_SITE ?? "https://datapackage.org",
  base: process.env.DP_BASE,
  srcDir: ".",
  outDir: "build",
  integrations: [
    starlight({
      // タイトルは言語コード別。ja は固有名詞を音訳した「データパッケージスタンダード」。
      // キーは locale の lang(root の lang は "en")。
      title: {
        en: "Data Package Standard",
        ja: "データパッケージスタンダード",
      },
      // i18n: 英語=root locale / 日本語=ja。英語ファイルは触らず ja/ に追加するだけなので
      // upstream 追従マージが無競合になる。未訳ページは英語へ自動フォールバック。
      defaultLocale: "root",
      locales: {
        root: { label: "English", lang: "en" },
        ja: { label: "日本語", lang: "ja" },
      },
      description:
        "Data Package is a standard consisting of a set of simple yet extensible specifications to describe datasets, data files and tabular data. It is a data definition language (DDL) and data API that facilitates findability, accessibility, interoperability, and reusability (FAIR) of data.",
      logo: {
        light: "/assets/logo-light.svg",
        dark: "/assets/logo-dark.svg",
        alt: "Data Package Logo",
        replacesTitle: true,
      },
      social: {
        github: "https://github.com/frictionlessdata/datapackage",
      },
      favicon: "favicon.svg",
      editLink: {
        baseUrl: "https://github.com/frictionlessdata/datapackage/edit/main/",
      },
      lastUpdated: true,
      customCss: ["/assets/styles.css"],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 5 },
      components: {
        MarkdownContent: "./components/MarkdownContent.astro",
        SocialIcons: "./components/SocialIcons.astro",
      },
      plugins: [
        starlightBlog({
          authors: {
            sapetti9: {
              name: "sapetti9",
              title: "Sara Petti",
              picture: "https://avatars.githubusercontent.com/u/74717970?v=4",
              url: "https://github.com/sapetti9",
            },
          },
        }),
        // The link validator is useful for debugging but it cleates a lot of false positives
        // starlightLinksValidator(),
      ],
      sidebar: [
        { label: "Overview", autogenerate: { directory: "overview" } },
        { label: "Standard", autogenerate: { directory: "standard" } },
        {
          label: "Extensions",
          collapsed: true,
          autogenerate: { directory: "extensions" },
        },
        {
          label: "Recipes",
          collapsed: true,
          autogenerate: { directory: "recipes" },
        },
        {
          label: "Guides",
          collapsed: true,
          autogenerate: { directory: "guides" },
        },
      ],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.png",
            sizes: "256x256",
          },
        },
        {
          tag: "script",
          attrs: {
            src: "https://plausible.io/js/script.js",
            "data-domain": "datapackage.org",
            defer: true,
          },
        },
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkHeadingId],
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
      rehypeBaseLinks,
    ],
  },
  vite: {
    resolve: {
      preserveSymlinks: true,
    },
  },
})
