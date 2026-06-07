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
    - **case** / **caseType** { [string](dataTypes#string) | `HanyuPinyinCaseType` } - 大小写类型
    - **tone** / **toneType** { [string](dataTypes#string) | `HanyuPinyinToneType` } - 声调类型
    - **v** / **vChar** / **vCharType** { [string](dataTypes#string) | `HanyuPinyinVCharType` } - `ü` 的输出形式
- }}
- <ins>**returns**</ins> { [string](dataTypes#string) }

将字符串中的 CJK 基本汉字范围 `\u4E00..\u9FA5` 转为拼音; 非该范围字符原样保留. 每个字符转换后都会追加一次分隔符, 最终结果调用 `trim()`.

```js
console.log(pinyin4j.of('中文')); // zhongwen
console.log(pinyin4j.of('中文', { sep: ' ', tone: 'WITH_TONE_NUMBER' }));
console.log(pinyin4j.of('中文', { tone: 'WITH_TONE_MARK' }));
```

### of(str, separator)

- **str** { [string](dataTypes#string) }
- **separator** { [string](dataTypes#string) }
- <ins>**returns**</ins> { [string](dataTypes#string) }

第二个参数为字符串时, 会作为分隔符使用. 如果第二个参数不是字符串也不是 JavaScript 对象, 会按默认选项处理.

> 注意: `separator` 会追加在每个字符之后, 最后只调用 `trim()`. 因此空格分隔符会去掉尾部空格, 但 `-` 等非空白分隔符会保留在末尾.

## [m] as

### as(str)

**`6.6.0`**

- **str** { [string](dataTypes#string) } - 带数字声调的拼音字符串
- <ins>**returns**</ins> { [string](dataTypes#string) }

将 `zhong1` / `lü4` / `nv3` / `u:3` 等数字声调写法转换为声调符号写法. 这是基于内置映射的片段替换器, 不会校验整串拼音; 未匹配或映射表没有的片段会保持原样.

```js
console.log(pinyin4j.as('zhong1wen2')); // zhōngwén
console.log(pinyin4j.as('nv3')); // nǚ
console.log(pinyin4j.as('u:4')); // ǜ
```

## 选项取值

### case / caseType

默认 `LOWERCASE`.

- `LOWERCASE` / `LOW` / `L` / `0`
- `UPPERCASE` / `UP` / `U` / `1`

非法值会抛出 `Invalid case type`.

### tone / toneType

默认 `WITHOUT_TONE`.

- `WITH_TONE_NUMBER` / `WITH_NUMBER` / `NUMBER` / `NUM`
- `WITHOUT_TONE` / `NO_TONE` / `NO` / `FALSE` / `0`
- `WITH_TONE_MARK` / `WITH_MARK` / `MARK` / `TRUE` / `1`

非法值会抛出 `Invalid tone type`.

### v / vChar / vCharType

默认 `WITH_V`; 当 `toneType` 为 `WITH_TONE_MARK` 且没有显式设置 vChar 时, 默认改为 `WITH_U_UNICODE`.

- `WITH_U_AND_COLON` / `U_AND_COLON` / `U_COLON` / `U:`
- `WITH_V` / `V`
- `WITH_U_UNICODE` / `U_UNICODE` / `UNICODE` / `Ü`

非法值会抛出 `Invalid v char type`.

## 返回与边界

- 空字符串返回空字符串.
- 单个汉字如果底层 pinyin4j 返回多个读音, 当前实现只取 `firstOrNull()`.
- `of` 返回的是一维字符串, 不保留多音字候选结构; 需要二维候选时应使用 [pinyin.convert](pinyin#m-convert).
- pinyin4j 库自身的非法格式组合异常不会被重新包装.
