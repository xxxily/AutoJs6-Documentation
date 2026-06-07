# MIME

`mime` 模块用于解析 MIME 类型字符串.

> 源码依据: `runtime/api/augment/mime/Mime.kt`, `runtime/api/augment/mime/JsMime.kt`.

---

<p style="font: bold 2em sans-serif; color: #FF7043">mime</p>

---

## [@] mime

### mime(mimeStr)

**`6.6.0`**

- **mimeStr** { [string](dataTypes#string) } - MIME 类型字符串
- <ins>**returns**</ins> { [JsMime](#jsmime) }

解析 MIME 字符串.

```js
let m = mime('text/html; charset=utf-8');
console.log(m.type); // text
console.log(m.subtype); // html
console.log(m.parameters.charset); // utf-8
```

---

<p style="font: bold 2em sans-serif; color: #FF7043">JsMime</p>

---

## [p] raw

- { [string](dataTypes#string) }

原始 MIME 字符串.

## [p] type

- { [string](dataTypes#string) }

主类型, 如 `text`.

## [p] subtype

- { [string](dataTypes#string) }

子类型, 如 `html`.

## [p] mimeType

- { [string](dataTypes#string) }

规范化后的 MIME 类型, 包含参数.

## [p] mimeTypeRefined

- { [string](dataTypes#string) }

仅包含主类型与子类型的 MIME 类型.

## [p] parameters

- { [object](dataTypes#object) }

参数对象. 例如 `text/html; charset=utf-8` 的 `parameters.charset` 为 `utf-8`.
