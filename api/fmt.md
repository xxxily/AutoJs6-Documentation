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
    - **fromUnit** { [string](dataTypes#string) } - 来源单位
    - **toUnit** { [string](dataTypes#string) } - 目标单位, 默认 `AUTO`
    - **useIecIdentifier** { [boolean](dataTypes#boolean) } - 是否输出 `KiB` / `MiB` 等 IEC 标识
    - **useSpace** { [boolean](dataTypes#boolean) } - 数值与单位之间是否保留空格, 默认 `true`
    - **fractionDigits** { [number](dataTypes#number) } - 小数位数, 默认 `2`
    - **trimTrailingZero** { [boolean](dataTypes#boolean) } - 是否去除尾随零, 默认 `false`
    - **autoCarryThreshold** { [number](dataTypes#number) } - 自动进位阈值, 仅 `toUnit` 为 `AUTO` 时允许
    - **strict** { [boolean](dataTypes#boolean) } - 是否使用严格单位模式
- }}
- <ins>**returns**</ins> { [string](dataTypes#string) }

将字节数据格式化为字符串.

```js
console.log(fmt.bytes(1024)); // 1.00 KB
console.log(fmt.bytes(1536, { fractionDigits: 1 })); // 1.5 KB
console.log(fmt.bytes(1024, { useIecIdentifier: true })); // 1.00 KiB
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

严格模式格式化. 严格模式区分 SI 与 IEC 单位, 并默认使用 IEC 单位标识.

```js
console.log(fmt.bytes.strict(1000, 'KB')); // 1.00 KB
console.log(fmt.bytes.strict(1024, 'KiB')); // 1.00 KiB
```

## [m] bytes.loose

### bytes.loose(source, options?)

**`6.7.0`**

宽松模式格式化. 宽松模式以 `1024` 为默认换算基数, 并允许使用更宽松的单位写法.

## [p] bytes.UNITS

**`6.7.0`**

- [[ `"KMGTPEZYRQ"` ]] { [string](dataTypes#string) }

## [p] bytes.AUTO

**`6.7.0`**

- [[ `"AUTO"` ]] { [string](dataTypes#string) }

## [p] bytes.IEC_DIV

**`6.7.0`**

- [[ `1024` ]] { [number](dataTypes#number) }

## [p] bytes.SI_DIV

**`6.7.0`**

- [[ `1000` ]] { [number](dataTypes#number) }
