# Pinyin - 汉语拼音

`pinyin` 模块用于将汉字转换为拼音, 支持分词、姓氏模式、多音字和多种输出风格.

> 源码依据: `runtime/api/augment/pinyin/Pinyin.kt`, `runtime/api/augment/pinyin/PinyinCore.kt`, `runtime/api/augment/pinyin/Util.kt`.

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
    - **style** { [number](dataTypes#number) | [string](dataTypes#string) | `PinyinStyle` } - 输出风格, 默认 `STYLE_TONE`
    - **mode** { [number](dataTypes#number) | [string](dataTypes#string) | `PinyinMode` } - 转换模式, 默认 `MODE_NORMAL`
    - **segment** { [boolean](dataTypes#boolean) } - 是否启用 Jieba 分词, 默认 `false`
    - **heteronym** { [boolean](dataTypes#boolean) } - 是否启用多音字, 默认 `false`
    - **group** { [boolean](dataTypes#boolean) } - 是否组合词组结果, 默认 `false`
- }}
- <ins>**returns**</ins> { [array](dataTypes#array) }

返回二维数组. 每个汉字、词组或连续非汉字片段对应一个拼音候选数组. 返回数组额外绑定只读不可枚举的 `compact()` 方法; 该方法会对各组候选做笛卡尔组合, 返回二维组合结果.

```js
console.log(pinyin.convert('重庆'));
console.log(pinyin.convert('重庆', { heteronym: true }));
console.log(pinyin.convert('朝阳东升', { segment: true, heteronym: true }).compact());
```

转换流程:

- `hans` 会先转为字符串; 空字符串返回空数组.
- `options` 不是 JavaScript 对象时会按空对象处理.
- `segment: true` 时使用 Jieba `cutSmall(hans, 4)` 分词; 否则按连续汉字/非汉字分组.
- 非汉字片段会原样保留为单项数组.
- 词组优先查 `PhrasesDict`; 查不到时退回单字转换.
- `heteronym: true` 时返回多音字候选; 单字分支会去重, 默认只取第一个候选.
- `group: true` 只影响普通转换分支, 会把一个词组内各字候选拼接成一组候选字符串; `false` 时按字/词组拆成多组.

## [m] simple

### simple(str, enableNumericTone?, enableSegment?)

**`6.6.0`**

- **str** { [string](dataTypes#string) }
- **[ enableNumericTone = `false` ]** { [boolean](dataTypes#boolean) }
- **[ enableSegment = `false` ]** { [boolean](dataTypes#boolean) }
- <ins>**returns**</ins> { [string](dataTypes#string) }

返回拼接后的简化拼音字符串. `enableNumericTone` 为 `true` 时使用 `STYLE_TONE2`, 否则使用 `STYLE_NORMAL`; `enableSegment` 对应 `segment` 选项.

```js
console.log(pinyin.simple('中文')); // zhongwen
console.log(pinyin.simple('中文', true)); // zhong1wen2
```

## [m] fromCodePoint

### fromCodePoint(codePoint)

**`6.6.0`**

- **codePoint** { [number](dataTypes#number) }
- <ins>**returns**</ins> { [string](dataTypes#string) | null }

按 Unicode code point 查询单字拼音. 返回字典中的原始拼音字符串; 不存在时返回 `null`.

## [m] fromPhrase

### fromPhrase(phrase)

**`6.6.0`**

- **phrase** { [string](dataTypes#string) }
- <ins>**returns**</ins> { [array](dataTypes#array) }

查询词组拼音字典, 返回按 `OrderIndex ASC` 排列的二维数组. 未命中时返回空数组.

## [m] compare

### compare(a, b)

**`6.6.0`**

当前脚本入口源码是占位实现, 参数数量为 `1..2`, 返回空字符串. `PinyinCore.compare(...)` 内部存在排序逻辑, 但没有被该入口调用; 知识库回答中不应将 `pinyin.compare()` 描述为可用排序函数.

## [m] compact

### compact(arr)

**`6.6.0`**

当前脚本入口源码是占位实现, 参数数量为 `1..2`, 返回空字符串. [convert](#m-convert) 返回值上绑定的 `compact()` 方法由 `Util.compact` 另行绑定, 两者不是同一个实现.

---

<p style="font: bold 2em sans-serif; color: #FF7043">选项与常量</p>

---

## style

`style` 支持传入常量对象、数值或枚举名字符串. 字符串应使用 `NORMAL` / `TONE` / `TONE2` 等枚举名, 不是 `STYLE_TONE` 这种常量属性名. 非空非法值会抛出 `Invalid style constant` 或 `Invalid style name`.

| 常量 | 字符串 | 数值 | 行为 |
|------|--------|------|------|
| `STYLE_NORMAL` | `NORMAL` | `0` | 普通风格, 去掉声调 |
| `STYLE_TONE` | `TONE` | `1` | 标准风格, 声调在韵母上; 默认值 |
| `STYLE_TONE2` | `TONE2` | `2` | 数字声调放在拼音末尾, 如 `zhong1` |
| `STYLE_INITIALS` | `INITIALS` | `3` | 仅保留声母 |
| `STYLE_FIRST_LETTER` | `FIRST_LETTER` | `4` | 仅保留首字母 |
| `STYLE_TO3NE` | `TO3NE` | `5` | 将声调数字嵌入声母之后的形式 |

## mode

`mode` 支持传入常量对象、数值或枚举名字符串. 字符串应使用 `NORMAL` / `SURNAME` / `PLACE_NAME` / `PLACENAME`, 不是 `MODE_SURNAME` 这种常量属性名. 非空非法值会抛出 `Invalid mode constant` 或 `Invalid mode name`.

| 常量 | 字符串 | 数值 | 行为 |
|------|--------|------|------|
| `MODE_NORMAL` | `NORMAL` | `0` | 普通模式; 默认值 |
| `MODE_SURNAME` | `SURNAME` | `1` | 姓氏/复姓优先模式 |
| `MODE_PLACE_NAME` | `PLACE_NAME` | `2` | 地名模式常量 |
| `MODE_PLACENAME` | `PLACENAME` | `2` | 地名模式兼容别名 |

> 注意: 当前 `convertRhino` 只对 `MODE_SURNAME` 做特殊分支. `MODE_PLACE_NAME` / `MODE_PLACENAME` 已暴露为常量, 但没有独立地名转换逻辑, 行为落回普通转换分支.
