# Pinyin4j - 汉语拼音

`pinyin4j` 模块是对 pinyin4j 库的轻量封装, 用于将汉字转换为拼音字符串.

> 源码依据: `runtime/api/augment/pinyin4j/Pinyin4j.kt`.

---

<p style="font: bold 2em sans-serif; color: #FF7043">pinyin4j</p>

---

## [@] pinyin4j

### pinyin4j(str, options?)

**`6.6.0`**

`pinyin4j(...)` 与 [pinyin4j.of(...)](#m-of) 等价.

## [m] of

### of(str, options?)

**`6.6.0`**

- **str** { [string](dataTypes#string) }
- **[ options ]** {{
    - **separator** / **sep** { [string](dataTypes#string) } - 分隔符, 默认空字符串
    - **case** / **caseType** { [string](dataTypes#string) } - `LOWERCASE` / `UPPERCASE` 及其别名
    - **tone** / **toneType** { [string](dataTypes#string) } - `WITHOUT_TONE` / `WITH_TONE_NUMBER` / `WITH_TONE_MARK` 及其别名
    - **v** / **vChar** / **vCharType** { [string](dataTypes#string) } - `WITH_V` / `WITH_U_AND_COLON` / `WITH_U_UNICODE` 及其别名
- }}
- <ins>**returns**</ins> { [string](dataTypes#string) }

```js
console.log(pinyin4j.of('中文')); // zhongwen
console.log(pinyin4j.of('中文', { sep: ' ', tone: 'WITH_TONE_NUMBER' }));
console.log(pinyin4j.of('中文', { tone: 'WITH_TONE_MARK' }));
```

### of(str, separator)

- **str** { [string](dataTypes#string) }
- **separator** { [string](dataTypes#string) }
- <ins>**returns**</ins> { [string](dataTypes#string) }

第二个参数为字符串时, 会作为分隔符使用.

## [m] as

### as(str)

**`6.6.0`**

- **str** { [string](dataTypes#string) } - 带数字声调的拼音字符串
- <ins>**returns**</ins> { [string](dataTypes#string) }

将 `zhong1` / `lü4` / `nv3` 等数字声调写法转换为声调符号写法.

```js
console.log(pinyin4j.as('zhong1wen2')); // zhōngwén
console.log(pinyin4j.as('nv3')); // nǚ
```
