---
title: 言語サポート
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージスタンダードの有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

<table>
  <tr>
    <th>Authors</th>
    <td>Paul Walsh</td>
  </tr>
</table>

言語サポートは、翻訳サポートとは異なる関心事である。言語サポートは、ディスクリプタ(descriptor)と、その resources 配列に含まれるデータの既定言語を宣言することを扱う。言語サポートは、ディスクリプタやデータで一つ以上の言語がサポートされている場合に、翻訳が存在するかどうかについては何ら主張しない。任意のディスクリプタに `languages` 配列を導入することで、既定言語と、そのディスクリプタおよびデータに見いだされるべき (`SHOULD`) その他の言語を宣言できる。

## 実装 {#implementations}

現時点で、このパターンの既知の実装はない。

## 仕様 {#specification}

任意の Frictionless Data ディスクリプタは、`languages` 配列によって、そのメタデータとデータの言語構成を宣言できる。

`languages` は配列でなければならず (`MUST`)、配列の最初の項目が既定の(翻訳されていない)言語である。

`languages` 配列が存在しない場合、既定言語は英語 (`en`) であり、したがって以下と等価である。

```
{
  "name": "my-package",
  "languages": ["en"]
}
```

languages 配列が存在するからといって、メタデータやデータがサポートされるすべての言語の翻訳を備えていることが保証されるわけではない。

ディスクリプタとデータソースは既定言語でなければならない (`MUST`)。ディスクリプタとデータソースは、同じ言語コードを用いて、配列内の他の言語に対する翻訳を備えてもよい (`MAY`)。翻訳が存在しない場合 (`IF`)、実装するコードは既定言語の文字列にフォールバックしなければならない (`MUST`)。

`languages` の使用例を、ディスクリプタのメタデータに実装したものを以下に示す。

```
{
  "name": "sun-package",
  "languages": ["es", "en"],
  "title": "Sol"
}

# which is equivalent to
{
  "name": "sun-package",
  "languages": ["es", "en"],
  "title": {
    "": "Sol",
    "en": "Sun"
  }
}
```

`languages` の使用例を、リソースが記述するデータに実装したものを以下に示す。

```
# resource descriptor
{
  "name": "solar-system",
  "data": [ "solar-system.csv" ]
  "fields": [
    ...
  ],
  "languages": ["es", "en", "he", "fr", "ar"]
}

# data source
# some languages have translations, some do not
# assumes a certain translation pattern, see the related section
id,name,name@fr,name@he,name@en
1,Sol,Soleil,שמש,Sun
2,Luna,Lune,ירח,Moon
```
