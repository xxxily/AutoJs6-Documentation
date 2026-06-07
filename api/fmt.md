# Fmt - 数据格式化

`fmt` 模块用于将数据格式化为适合阅读的字符串. 当前公开实现以字节大小格式化为主.

> 源码依据: `runtime/api/augment/formatter/Formatter.kt`, `runtime/api/augment/formatter/Bytes.kt`, `runtime/api/augment/converter/core/Bytes.kt`.

---

<p style="font: bold 2em sans-serif; color: #FF7043">fmt</p>

---

## [m] bytes

### bytes(source, options?)

**`6.7.0`**

- **source** { [number](dataTypes#number) | [string](dataTypes#string) } - 数值或带单位字符串
- **[ options ]** {{
    - **fromUnit** { [string](dataTypes#string) } - 来源单位, 默认 `B`
    - **toUnit** { [string](dataTypes#string) } - 目标单位, 默认 `AUTO`
    - **useIecIdentifier** { [boolean](dataTypes#boolean) } - 非严格模式下是否输出 `KiB` / `MiB` 等 IEC 标识
    - **useSpace** { [boolean](dataTypes#boolean) } - 数值与单位之间是否保留空格, 默认 `true`
    - **fractionDigits** { [number](dataTypes#number) } - 小数位数, 默认 `2`
    - **trimTrailingZero** { [boolean](dataTypes#boolean) } - 是否去除尾随零, 默认 `false`
    - **autoCarryThreshold** { [number](dataTypes#number) } - 自动进位阈值, 默认 `1024`, 仅 `toUnit` 为 `AUTO` 时允许
    - **strict** { [boolean](dataTypes#boolean) } - 是否使用严格单位模式, 默认 `false`
- }}
- <ins>**returns**</ins> { [string](dataTypes#string) }

将字节数据格式化为字符串.

```js
console.log(fmt.bytes(1024)); // 1.00 KB
console.log(fmt.bytes(1536, { fractionDigits: 1 })); // 1.5 KB
console.log(fmt.bytes(1024, { useIecIdentifier: true })); // 1.00 KiB
console.log(fmt.bytes(1024, { useSpace: false })); // 1.00KB
```

### bytes(source, toUnit, options?)

**`6.7.0`**

- **source** { [number](dataTypes#number) | [string](dataTypes#string) }
- **toUnit** { [string](dataTypes#string) }
- **[ options ]** { [object](dataTypes#object) }
- <ins>**returns**</ins> { [string](dataTypes#string) }

### bytes(source, fromUnit, toUnit, options?)

**`6.7.0`**

- **source** { [number](dataTypes#number) | [string](dataTypes#string) }
- **fromUnit** { [string](dataTypes#string) }
- **toUnit** { [string](dataTypes#string) }
- **[ options ]** { [object](dataTypes#object) }
- <ins>**returns**</ins> { [string](dataTypes#string) }

## [m] bytes.strict

### bytes.strict(source, options?)

**`6.7.0`**

严格模式格式化. 严格模式区分 SI 与 IEC 单位:

- `KB` / `MB` / `GB` 等使用 `1000` 进位.
- `KiB` / `MiB` / `GiB` 等使用 `1024` 进位.
- 默认输出 IEC 标识, 但目标单位是 `KB` / `MB` 这类 SI 单位时会输出对应 SI 后缀.

在严格模式中, `options.strict` 和 `useIecIdentifier` 必须为空; 如果传入会抛出异常.

```js
console.log(fmt.bytes.strict(1000, 'KB')); // 1.00 KB
console.log(fmt.bytes.strict(1024, 'KiB')); // 1.00 KiB
```

## [m] bytes.loose

### bytes.loose(source, options?)

**`6.7.0`**

宽松模式格式化. 宽松模式会将 `KiB` / `MiB` 等 IEC 标识规范化为普通单位文本, 并始终以 `1024` 为换算基数. 在宽松模式中, `options.strict` 必须为空.

## 格式化规则

- 支持前缀: `K` / `M` / `G` / `T` / `P` / `E` / `Z` / `Y` / `R` / `Q`.
- `source` 为字符串时, 格式必须匹配 `数字 + 可选空格 + 可选英文字母单位`, 如 `1.5 MB`; 不接受负数、指数、`.5` 或逗号格式.
- `source` 不能为负数, 也不能是 `NaN`.
- `fromUnit` 同时出现在字符串和参数中时, 两者必须一致, 否则抛出 `Ambiguous "fromUnit" values`.
- `fractionDigits` 会转为整数, 必须大于等于 `0`.
- `autoCarryThreshold` 会转为长整数, 必须大于 `0`, 且只能在 `toUnit` 为 `AUTO` 时设置.
- 格式化使用 `BigDecimal.setScale(fractionDigits, RoundingMode.HALF_UP)`.
- `trimTrailingZero: true` 会移除小数部分末尾的 `0`, 并在小数部分为空时移除小数点.
- `useSpace` 只控制数值与单位之间的空格, 默认 `true`.
- 非严格模式下 `useIecIdentifier: true` 会输出 `KiB` / `MiB`; 默认输出 `KB` / `MB`.
- 严格模式下 `useIecIdentifier` 不允许显式传入, 后缀由 `toUnit` 和基数自动决定.
- `AUTO` 选择单位时使用整数幂比较; 非严格模式固定按 `1024`, 严格模式按来源单位对应基数.

## [p] bytes.UNITS

**`6.7.0`**

- [[ `"KMGTPEZYRQ"` ]] { [string](dataTypes#string) }

支持的单位前缀.

## [p] bytes.AUTO

**`6.7.0`**

- [[ `"AUTO"` ]] { [string](dataTypes#string) }

自动选择目标单位.

## [p] bytes.IEC_DIV

**`6.7.0`**

- [[ `1024` ]] { [number](dataTypes#number) }

## [p] bytes.SI_DIV

**`6.7.0`**

- [[ `1000` ]] { [number](dataTypes#number) }
