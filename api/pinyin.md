# Pinyin - 汉语拼音

`pinyin` 模块用于将汉字转换为拼音, 支持多音字、分词、姓氏模式和多种输出风格.

> 源码依据: `runtime/api/augment/pinyin/Pinyin.kt`, `runtime/api/augment/pinyin/PinyinCore.kt`.

---

<p style="font: bold 2em sans-serif; color: #FF7043">pinyin</p>

---

## [@] pinyin

### pinyin(hans, options?)

**`6.6.0`**

`pinyin(...)` 与 [pinyin.convert(...)](#m-convert) 等价.

## [m] convert

### convert(hans, options?)

**`6.6.0`**

- **hans** { [string](dataTypes#string) } - 待转换字符串
- **[ options ]** {{
    - **style** { [number](dataTypes#number) | [string](dataTypes#string) } - 输出风格, 默认 `STYLE_TONE`
    - **mode** { [number](dataTypes#number) | [string](dataTypes#string) } - 转换模式, 默认 `MODE_NORMAL`
    - **segment** { [boolean](dataTypes#boolean) } - 是否启用分词, 默认 `false`
    - **heteronym** { [boolean](dataTypes#boolean) } - 是否启用多音字, 默认 `false`
    - **group** { [boolean](dataTypes#boolean) } - 是否组合词组结果, 默认 `false`
- }}
- <ins>**returns**</ins> { [array](dataTypes#array) }

返回二维数组. 每个汉字或词组对应一个拼音候选数组. 返回数组额外带有 `compact()` 方法.

```js
console.log(pinyin.convert('重庆'));
console.log(pinyin.convert('重庆', { heteronym: true }));
console.log(pinyin.convert('重庆', { segment: true, group: true }).compact());
```

## [m] simple

### simple(str, enableNumericTone?, enableSegment?)

**`6.6.0`**

- **str** { [string](dataTypes#string) }
- **[ enableNumericTone = `false` ]** { [boolean](dataTypes#boolean) }
- **[ enableSegment = `false` ]** { [boolean](dataTypes#boolean) }
- <ins>**returns**</ins> { [string](dataTypes#string) }

返回拼接后的简化拼音字符串.

```js
console.log(pinyin.simple('中文')); // zhongwen
console.log(pinyin.simple('中文', true)); // zhong1wen2
```

## [m] fromCodePoint

### fromCodePoint(codePoint)

**`6.6.0`**

- **codePoint** { [number](dataTypes#number) }
- <ins>**returns**</ins> { [string](dataTypes#string) | null }

按 Unicode code point 查询单字拼音.

## [m] fromPhrase

### fromPhrase(phrase)

**`6.6.0`**

- **phrase** { [string](dataTypes#string) }
- <ins>**returns**</ins> { [array](dataTypes#array) }

查询词组拼音.

## [m] compare

### compare(a, b)

**`6.6.0`**

当前源码中此方法为占位实现, 返回空字符串. 知识库回答中不应将其描述为可用排序函数.

## [m] compact

### compact(arr)

**`6.6.0`**

当前源码中此方法为占位实现, 返回空字符串. `convert()` 返回值上绑定的 `compact()` 方法由运行时另行绑定.

---

<p style="font: bold 2em sans-serif; color: #FF7043">常量</p>

---

## [p] STYLE_NORMAL

普通风格, 不带声调.

## [p] STYLE_TONE

标准风格, 声调在韵母上. 这是默认风格.

## [p] STYLE_TONE2

数字形式标记声调.

## [p] STYLE_TO3NE

数字方式, 声母后加声调.

## [p] STYLE_INITIALS

仅保留声母.

## [p] STYLE_FIRST_LETTER

仅保留首字母.

## [p] MODE_NORMAL

普通模式.

## [p] MODE_SURNAME

姓氏模式.

## [p] MODE_PLACE_NAME

地名模式.

## [p] MODE_PLACENAME

地名模式兼容别名.
