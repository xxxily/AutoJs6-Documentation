# JsMime

JsMime 是 `mime(mimeStr)` 返回的 MIME 解析结果对象.

源码依据:

- `app/src/main/java/org/autojs/autojs/runtime/api/augment/mime/Mime.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/mime/JsMime.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/Mime.kt`

常见相关方法或属性:

- [mime](mime)(mimeStr)

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

## 解析边界

- `mime` 不做文件扩展名推断; 传入 `png` 不等同于 `image/png`.
- 参数解析使用 `;` 分隔, 并按 `=` 拆分键值. 当前实现期望单个参数片段最多只有一个 `=`.
- `null` / `undefined` 会在转字符串阶段失败; 空白字符串会被底层 `MimeType` 拒绝.
- 底层 `MimeType` 不是严格 MIME 语法校验器. 例如 `mime('jpg')` 这类无 `/` 的字符串仍可能被接受, 此时 `type` 来自输入, `subtype` 可能为 `*`.
- 需要按文件扩展名推断 MIME 时, 源码中的 `runtime/api/Mime.kt` 提供 `fromFile` / `fromFileOr` 等 Java/Kotlin 侧工具, 但这些不是当前 `mime(...)` 脚本入口的返回字段.

## 示例

```js
let m = mime('application/json; charset=utf-8; version=1; flag');
console.log(m.type); // application
console.log(m.subtype); // json
console.log(m.parameters.charset); // utf-8
console.log(m.parameters.flag); // undefined
```
