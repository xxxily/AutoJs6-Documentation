# MIME

`mime` 模块用于解析 MIME 类型字符串, 返回一个包含主类型、子类型和参数的 `JsMime` 对象.

> 源码依据: `runtime/api/augment/mime/Mime.kt`, `runtime/api/augment/mime/JsMime.kt`, `runtime/api/Mime.kt`.

---

<p style="font: bold 2em sans-serif; color: #FF7043">mime</p>

---

## [@] mime

### mime(mimeStr)

**`6.6.0`**

- **mimeStr** { [string](dataTypes#string) } - MIME 类型字符串
- <ins>**returns**</ins> { [JsMime](#jsmime) }

解析 MIME 字符串. 入口只接受一个参数, 参数会通过 `coerceString` 转为字符串后交给 `eu.medsea.mimeutil.MimeType`.

```js
let m = mime('text/html; charset=utf-8');
console.log(m.type); // text
console.log(m.subtype); // html
console.log(m.mimeType); // text/html; charset=utf-8
console.log(m.mimeTypeRefined); // text/html
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

由 `type/subtype` 和有效参数重新拼接出的 MIME 字符串. 参数顺序沿用原始字符串中 `;` 后的顺序.

## [p] mimeTypeRefined

- { [string](dataTypes#string) }

仅包含主类型与子类型的 MIME 类型, 形如 `text/html`.

## [p] parameters

- { [object](dataTypes#object) }

参数对象. 当前实现只解析 `;` 后包含 `=` 的片段, 并按 `key=value` 放入对象; 不含 `=` 的片段只会保留在 `mimeType` 字符串里, 不会进入 `parameters`.

```js
let m = mime('application/json; charset=utf-8; version=1; flag');
console.log(m.parameters.charset); // utf-8
console.log(m.parameters.version); // 1
console.log(m.parameters.flag); // undefined
```

## 解析边界

- `mime` 不做文件扩展名推断; 传入 `png` 不等同于 `image/png`.
- 参数解析使用 `;` 分隔, 并按 `=` 拆分键值. 当前实现期望单个参数片段最多只有一个 `=`.
- `null` / `undefined` 会在转字符串阶段失败; 空白字符串会被底层 `MimeType` 拒绝.
- 底层 `MimeType` 不是严格 MIME 语法校验器. 例如 `mime('jpg')` 这类无 `/` 的字符串仍可能被接受, 此时 `type` 来自输入, `subtype` 可能为 `*`.
- 需要按文件扩展名推断 MIME 时, 源码中的 `runtime/api/Mime.kt` 提供 `fromFile` / `fromFileOr` 等 Java/Kotlin 侧工具, 但这些不是当前 `mime(...)` 脚本入口的返回字段.
