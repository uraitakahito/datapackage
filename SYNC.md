# 本家追従の同期手順 (fork: uraitakahito/datapackage)

このリポジトリは [frictionlessdata/datapackage](https://github.com/frictionlessdata/datapackage)
の fork で、本家に追従しながら日本語訳を追加する。日本語版は fork の GitHub Pages
(<https://uraitakahito.github.io/datapackage/>)で Astro + Starlight の i18n により公開する。

## ブランチ運用

- `main` は本家ミラー。**翻訳を commit しない**。
- `main` は **ローカル限定**。`origin`(fork)へ **push しない**
  (push しても本家由来の `general.yaml`(lint)が走るだけで無意味。
  公開は `develop` からの Actions → Pages に一本化する)。
- 翻訳は `develop`(既定ブランチ)に積む。`develop → main` の逆流は **しない**。
- 英語本文 `content/docs/**` は **触らない**。日本語は `content/docs/ja/**` にだけ置く
  → upstream 追従マージが無競合になる(Starlight i18n: 英語=root locale / 日本語=`ja`)。

## 手順

```sh
# 1. main を本家へ追随 (無編集なので fast-forward。push はしない)
git checkout main
git fetch upstream
git merge --ff-only upstream/main

# 2. develop に取り込む
git checkout develop
git merge --no-edit main
```

3. 競合は基本起きない(英語=upstream / 日本語=fork でファイルが分離)。
   ただし `astro.config.js` だけは fork 差分(i18n + `site`/`base` の env 化)を持つため、
   そこが衝突したら **fork 側の変更を残す**。

## ヘルパ

`scripts/sync-upstream.sh` で 1〜2 を自動化する(`develop` は push、`main` は push しない)。
