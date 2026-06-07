# Cvt - 单位转换

`cvt` 模块用于数据单位转换. 当前公开实现以字节单位转换为主, 返回数值或 `BigDecimal`.

> 源码依据: `runtime/api/augment/converter/Converter.kt`, `runtime/api/augment/converter/Bytes.kt`, `runtime/api/augment/converter/core/Bytes.kt`.

---

<p style="font: bold 2em sans-serif; color: #FF7043">cvt</p>

---

## [m] bytes

### bytes(source, options?)

**`6.7.0`**

- **source** { [number](dataTypes#number) | [string](dataTypes#string) } - 数值或带单位字符串
- **[ options ]** {{
    - **fromUnit** { [string](dataTypes#string) } - 来源单位, 默认 `B`
    - **toUnit** { [string](dataTypes#string) } - 目标单位, 默认 `AUTO`
    - **fractionDigits** { [number](dataTypes#number) } - 小数位数, 默认 `2`
    - **autoCarryThreshold** { [number](dataTypes#number) } - 自动进位阈值, 默认 `1024`, 仅 `toUnit` 为 `AUTO` 时允许
    - **strict** { [boolean](dataTypes#boolean) } - 是否使用严格单位模式, 默认 `false`
- }}
- <ins>**returns**</ins> { [number](dataTypes#number) | [java.math.BigDecimal](https://docs.oracle.com/javase/8/docs/api/java/math/BigDecimal.html) }

将字节数据转换为目标单位的数值. 结果在 JavaScript 安全整数范围内时返回 `number`, 否则保留为 `BigDecimal`.

```js
console.log(cvt.bytes(1024, 'KB')); // 1
console.log(cvt.bytes('1 MB', 'KB')); // 1024
console.log(cvt.bytes(1536, { toUnit: 'KB', fractionDigits: 1 })); // 1.5
```

### bytes(source, toUnit, options?)

**`6.7.0`**

- **source** { [number](dataTypes#number) | [string](dataTypes#string) }
- **toUnit** { [string](dataTypes#string) }
- **[ options ]** { [object](dataTypes#object) }
- <ins>**returns**</ins> { [number](dataTypes#number) | [java.math.BigDecimal](https://docs.oracle.com/javase/8/docs/api/java/math/BigDecimal.html) }

### bytes(source, fromUnit, toUnit, options?)

**`6.7.0`**

- **source** { [number](dataTypes#number) | [string](dataTypes#string) }
- **fromUnit** { [string](dataTypes#string) }
- **toUnit** { [string](dataTypes#string) }
- **[ options ]** { [object](dataTypes#object) }
- <ins>**returns**</ins> { [number](dataTypes#number) | [java.math.BigDecimal](https://docs.oracle.com/javase/8/docs/api/java/math/BigDecimal.html) }

## [m] bytes.strict

### bytes.strict(source, options?)

**`6.7.0`**

严格模式转换. 严格模式区分 SI 与 IEC 单位:

- `KB` / `MB` / `GB` 等使用 `1000` 进位.
- `KiB` / `MiB` / `GiB` 等使用 `1024` 进位.
- `B` 表示字节.

在严格模式中, `options.strict` 必须为空; 如果传入会抛出异常.

```js
console.log(cvt.bytes.strict(1000, 'KB')); // 1
console.log(cvt.bytes.strict(1024, 'KiB')); // 1
```

## [m] bytes.loose

### bytes.loose(source, options?)

**`6.7.0`**

宽松模式转换. 宽松模式会将 `KiB` / `MiB` 等 IEC 标识规范化为普通单位文本, 并始终以 `1024` 为换算基数. 在宽松模式中, `options.strict` 必须为空.

## 单位与解析规则

- 支持前缀: `K` / `M` / `G` / `T` / `P` / `E` / `Z` / `Y` / `R` / `Q`.
- `source` 为字符串时, 格式必须匹配 `数字 + 可选空格 + 可选英文字母单位`, 如 `1.5 MB`; 不接受负数、指数、`.5` 或逗号格式.
- `source` 不能为负数, 也不能是 `NaN`.
- `fromUnit` 同时出现在字符串和参数中时, 两者必须一致, 否则抛出 `Ambiguous "fromUnit" values`.
- `fractionDigits` 会转为整数, 必须大于等于 `0`.
- `autoCarryThreshold` 会转为长整数, 必须大于 `0`, 且只能在 `toUnit` 为 `AUTO` 时设置.
- 非严格模式下单位不区分大小写, 且 `KiB` 会按 `KB` 处理.
- 严格模式下会保留 `KiB` / `MiB` 这类 IEC 标识并选择对应基数.
- `AUTO` 选择单位时使用整数幂比较; 非严格模式固定按 `1024`, 严格模式按来源单位对应基数.

数值计算使用 `BigDecimal` 和 `RoundingMode.HALF_UP`. 非 `AUTO` 目标单位会按 `fractionDigits` 做除法舍入, 之后去除尾随零.

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
