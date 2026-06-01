#!/usr/bin/env bash
# 本家 (frictionlessdata/datapackage) に追従する。
# main はローカル限定ミラー (origin へ push しない)。公開は develop からの Actions→Pages。
# 詳細は SYNC.md を参照。
set -euo pipefail

git fetch upstream

# main を本家ミラーに (無編集なので ff のはず)。origin へは push しない。
git checkout main
git merge --ff-only upstream/main

# develop に取り込む
git checkout develop
if git merge --no-edit main; then
  git push origin develop
  echo "sync 完了: develop を本家に追随しました"
else
  echo "⚠ 競合あり。astro.config.js は fork 差分 (i18n + site/base) を優先して解決してください" >&2
  exit 1
fi
