# 日本語訳ガイド & 進捗 (fork: uraitakahito/datapackage)

本家 [frictionlessdata/datapackage](https://github.com/frictionlessdata/datapackage) を
追従しながら、Starlight i18n で日本語訳を追加する。公開: <https://uraitakahito.github.io/datapackage/ja/>

ブランチ運用・同期手順は [SYNC.md](./SYNC.md) を参照。

## ライセンス

本家リポジトリは **The Unlicense(パブリックドメイン)**([LICENSE.md](./LICENSE.md))。
翻訳・改変・再配布は法的に完全に自由(帰属表示すら不要)。それでも礼儀として、各ページ冒頭に
「非公式翻訳」注記と原典 <https://datapackage.org> へのリンクを置く。

## 方針(最小ローカライズ)

英語=root locale はそのまま、日本語は `content/docs/ja/<path>` に **コピーして翻訳**する。
英語ファイル(`content/docs/**`)は **絶対に編集しない**(編集すると本家追従マージが競合する)。

- **翻訳する**: 本文(prose)、frontmatter の `title` / `description`。
- **触らない**: コードブロック、JSX / コンポーネント、`profile:` の値、見出しの `{#id}`、
  リンクの URL 構造、表の構造、`[[REF]]` 風の参照。
- 未訳ページは Starlight が英語へ **自動フォールバック**(「このコンテンツはまだ日本語訳が
  ありません」の通知付き)。なので **1ファイルずつ** 訳して push すれば順次反映される。
- 各ページ冒頭(frontmatter 直後)に注記ブロックを付ける:

  ```md
  > **非公式翻訳 (Unofficial translation).** これはデータパッケージ標準の有志による日本語訳です。
  > 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照。
  ```

## 1ファイルの手順

```sh
# 例: standard/data-package.mdx を訳す
cp content/docs/standard/data-package.mdx content/docs/ja/standard/data-package.mdx
# → ja 側を編集して prose と title/description を和訳
npm run start   # http://localhost:5000/ja/standard/data-package/ で確認
git add content/docs/ja/standard/data-package.mdx
git commit -m "docs(ja): translate standard/data-package"
git push origin develop   # publish-ja が発火 → Pages 更新
```

### 注意点(実行時に判明した落とし穴)

1. **相対パスの深さ**: `ja/` は 1 階層深いので、`.mdx` 内のコンポーネント import や
   アセット参照の相対パスを 1 段増やす。
   例: 英語 `content/docs/index.mdx` の `../../components/About.astro` /
   `../../assets/hero.png` は、`ja/index.mdx` では
   **`../../../components/About.astro` / `../../../assets/hero.png`**。
   → プレーン `.md`(prose のみ)はこの問題なし。`.mdx`(import あり)だけ注意。
2. **内部リンク(確定済み)**: 本文の内部リンクは **英語の絶対パスのまま**書く
   (例: `[Extensions](/standard/extensions)`)。`/ja/` を自分で付けないこと。
   `astro.config.js` の `rehypeBaseLinks` プラグインが、ビルド時に base(`/datapackage`)と、
   ja ページなら locale(`/ja`)を自動付与する(アセットには locale を付けない)。
   ※ Astro/Starlight は本文の著者リンクに base を付けないため、このプラグインで補っている。
   ※ frontmatter の hero アクションやコンポーネント prop の `href` は rehype を通らず base が
   付かないので、homepage では使わず markdown リンクで導線を作る。
3. **lint**: pre-push フックで `npm test`(eslint + prettier)が走る。push 前に
   `npx prettier --write content/docs/ja/<file>` で整形しておく(英語ファイルは触らない)。

## 進捗台帳

優先度: overview(まず introduction)→ standard(仕様本体)→ recipes / guides / extensions。
`blog/`(2件)は仕様本体でないため対象外(英語フォールバックのまま)。

凡例: ☐ 未 / ◑ 作業中 / ☑ 済 ・ 形式: `md`=prose のみ / `mdx`=import あり(相対パス注意)

### overview (6)

| ファイル                 | 形式 | 状態 |
| ------------------------ | ---- | ---- |
| overview/introduction.md | md   | ☑   |
| overview/software.mdx    | mdx  | ☑   |
| overview/adoption.mdx    | mdx  | ☑   |
| overview/governance.md   | md   | ☑   |
| overview/contributing.md | md   | ☑   |
| overview/changelog.md    | md   | ☑   |

### standard (7) — 仕様本体

| ファイル                   | 形式 | 状態 |
| -------------------------- | ---- | ---- |
| standard/data-package.mdx  | mdx  | ☑   |
| standard/data-resource.mdx | mdx  | ☑   |
| standard/table-dialect.mdx | mdx  | ☑   |
| standard/table-schema.mdx  | mdx  | ☑   |
| standard/extensions.mdx    | mdx  | ☑   |
| standard/glossary.mdx      | mdx  | ☑   |
| standard/security.mdx      | mdx  | ☑   |

### recipes (13)

| ファイル                               | 形式 | 状態 |
| -------------------------------------- | ---- | ---- |
| recipes/caching-of-resources.md        | md   | ☑   |
| recipes/compression-of-resources.md    | md   | ☑   |
| recipes/data-catalog.md                | md   | ☑   |
| recipes/data-dependencies.md           | md   | ☑   |
| recipes/data-package-version.md        | md   | ☑   |
| recipes/external-foreign-keys.md       | md   | ☑   |
| recipes/files-inside-archives.md       | md   | ☑   |
| recipes/json-data-resources.md         | md   | ☑   |
| recipes/language-support.md            | md   | ☑   |
| recipes/metadata-in-table-schema.md    | md   | ☑   |
| recipes/private-properties.md          | md   | ☑   |
| recipes/relationship-between-fields.md | md   | ☑   |
| recipes/translation-support.md         | md   | ☑   |

### guides (4)

| ファイル                         | 形式 | 状態 |
| -------------------------------- | ---- | ---- |
| guides/using-data-package.md     | md   | ☑   |
| guides/extending-data-package.md | md   | ☑   |
| guides/csvw-data-package.md      | md   | ☑   |
| guides/mediawiki-tabular-data.md | md   | ☑   |

### extensions (2)

| ファイル                           | 形式 | 状態 |
| ---------------------------------- | ---- | ---- |
| extensions/camtrap-data-package.md | md   | ☑   |
| extensions/fiscal-data-package.md  | md   | ☑   |

### その他

| ファイル  | 形式 | 状態 | 備考                                 |
| --------- | ---- | ---- | ------------------------------------ |
| index.mdx | mdx  | ☑   | 完成版(splash hero + 主要導線リンク) |

合計: 33 ファイル(+ index は種を作成済)。
