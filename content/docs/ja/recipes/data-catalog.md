---
title: データカタログ
---

> **非公式翻訳 (Unofficial translation).** これはデータパッケージ標準の有志による日本語訳です。
> 正典は英語原典 [datapackage.org](https://datapackage.org) 。未訳の箇所は英語の原文を参照してください。

<table>
  <tr>
    <th>Authors</th>
    <td>Michael Joseph Rosenthal</td>
  </tr>
</table>

オンラインレジストリを構築する場合や、複数のデータセットを取り込むパイプラインを構築する場合など、データパッケージの集合を記述する必要がある場面がある。

こうした場面では、その集合を「カタログ」を用いて記述できる。カタログでは、各データセットは次のような単一のリソースとして表現される。

```json
{
  "profile": "data-package",
  "format": "json"
}
```

## 仕様 {#specification}

データパッケージカタログは、データパッケージ仕様の上に直接構築される。したがって、データパッケージカタログはデータパッケージでなければならず (`MUST`)、[データパッケージ仕様][dp] に準拠しなければならない。

データパッケージカタログには、データパッケージによって課される要件に加えて、次の要件がある。

- 値が `data-package-catalog` である `profile` プロパティ、またはそれを拡張した `profile` が存在しなければならない (`MUST`)
- 各リソースもまたデータパッケージでなければならない (`MUST`)

### 例 {#examples}

汎用的なパッケージカタログ:

```json
{
  "profile": "data-package-catalog",
  "name": "climate-change-packages",
  "resources": [
    {
      "profile": "json-data-package",
      "format": "json",
      "name": "beacon-network-description",
      "path": "https://http://beacon.berkeley.edu/hypothetical_deployment_description.json"
    },
    {
      "profile": "tabular-data-package",
      "format": "json",
      "path": "https://pkgstore.datahub.io/core/co2-ppm/10/datapackage.json"
    },
    {
      "profile": "tabular-data-package",
      "name": "co2-fossil-global",
      "format": "json",
      "path": "https://pkgstore.datahub.io/core/co2-fossil-global/11/datapackage.json"
    }
  ]
}
```

最小限の表形式データカタログ:

```json
{
  "profile": "tabular-data-package-catalog",
  "name": "datahub-climate-change-packages",
  "resources": [
    {
      "path": "https://pkgstore.datahub.io/core/co2-ppm/10/datapackage.json"
    },
    {
      "name": "co2-fossil-global",
      "path": "https://pkgstore.datahub.io/core/co2-fossil-global/11/datapackage.json"
    }
  ]
}
```

データパッケージは、データカタログ内にインラインで宣言することもできる。

```json
{
  "profile": "tabular-data-package-catalog",
  "name": "my-data-catalog",
  "resources": [
    {
      "profile": "tabular-data-package",
      "name": "my-dataset",
      // here we list the data files in this dataset
      "resources": [
        {
          "profile": "tabular-data-resource",
          "name": "resource-name",
          "data": [
            {
              "id": 1,
              "first_name": "Louise"
            },
            {
              "id": 2,
              "first_name": "Julia"
            }
          ],
          "schema": {
            "fields": [
              {
                "name": "id",
                "type": "integer"
              },
              {
                "name": "first_name",
                "type": "string"
              }
            ],
            "primaryKey": "id"
          }
        }
      ]
    }
  ]
}
```

[dr]: /standard/data-resource/
[dp]: /standard/data-package/

## 実装 {#implementations}

既知のものはない。
