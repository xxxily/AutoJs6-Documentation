# Cvt - 单位转换

`cvt` 模块用于数据单位转换. 当前公开实现以字节单位转换为主.

> 源码依据: `runtime/api/augment/converter/Converter.kt`, `runtime/api/augment/converter/Bytes.kt`, `runtime/api/augment/converter/core/Bytes.kt`.

---

<p style="font: bold 2em sans-serif; color: #FF7043">cvt</p>

---

## [m] bytes

### bytes(source, options?)

**`6.7.0`**

- **source** { [number](dataTypes#number) | [string](dataTypes#string) } - 数值或带单位字符串
- **[ options ]** {{
    - **fromUnit** { [string](dataTypes#string) } - 来源单位
    - **toUnit** { [string](dataTypes#string) } - 目标单位, 默认 `AUTO`
    - **fractionDigits** { [number](dataTypes#number) } - 小数位数, 默认 `2`
    - **autoCarryThreshold** { [number](dataTypes#number) } - 自动进位阈值, 仅 `toUnit` 为 `AUTO` 时允许
    - **strict** { [boolean](dataTypes#boolean) } - 是否使用严格单位模式
- }}
- <ins>**returns**</ins> { [number](dataTypes#number) | [java.math.BigDecimal](https://docs.oracle.com/javase/8/docs/api/java/math/BigDecimal.html) }

将字节数据转换为目标单位的数值.

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

在严格模式中, `options.strict` 必须为空.

```js
console.log(cvt.bytes.strict(1000, 'KB')); // 1
console.log(cvt.bytes.strict(1024, 'KiB')); // 1
```

## [m] bytes.loose

### bytes.loose(source, options?)

**`6.7.0`**

宽松模式转换. 宽松模式会将 `KiB` 等 IEC 标识折算为普通单位文本, 并以 `1024` 为换算基数. 在宽松模式中, `options.strict` 必须为空.

## [p] bytes.UNITS

**`6.7.0`**

- [[ `"KMGTPEZYRQ"` ]] { [string](dataTypes#string) }

支持的单位前缀, 依次表示 K/M/G/T/P/E/Z/Y/R/Q.

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
