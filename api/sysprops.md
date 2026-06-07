# Sysprops - 系统属性

`sysprops` 模块用于读取 Android 系统属性.

> 源码依据: `runtime/api/augment/sysprops/Sysprops.kt`.

---

<p style="font: bold 2em sans-serif; color: #FF7043">sysprops</p>

---

## [m] get

### get(propName, defaultValue?)

**`6.6.0`**

- **propName** { [string](dataTypes#string) }
- **[ defaultValue ]** { [string](dataTypes#string) }
- <ins>**returns**</ins> { [string](dataTypes#string) | null }

读取字符串系统属性.

```js
console.log(sysprops.get('ro.product.model'));
```

## [m] getInt

### getInt(propName, defaultValue?)

**`6.6.0`**

- **propName** { [string](dataTypes#string) }
- **[ defaultValue ]** { [number](dataTypes#number) }
- <ins>**returns**</ins> { [number](dataTypes#number) }

读取整数系统属性.

## [m] getBoolean

### getBoolean(propName, defaultValue?)

**`6.6.0`**

- **propName** { [string](dataTypes#string) }
- **[ defaultValue ]** { [boolean](dataTypes#boolean) }
- <ins>**returns**</ins> { [boolean](dataTypes#boolean) }

读取布尔系统属性.

## [m] getAll

### getAll()

**`6.6.0`**

- <ins>**returns**</ins> { [object](dataTypes#object) }

读取全部可访问系统属性.

### getAll(keyFilter)

- **keyFilter** { [string](dataTypes#string) | [RegExp](dataTypes#regexp) }
- <ins>**returns**</ins> { [object](dataTypes#object) }

按属性名过滤.

### getAll(keyFilter, valueFilter)

- **keyFilter** { [string](dataTypes#string) | [RegExp](dataTypes#regexp) }
- **valueFilter** { [string](dataTypes#string) | [RegExp](dataTypes#regexp) }
- <ins>**returns**</ins> { [object](dataTypes#object) }

按属性名和属性值过滤.

### getAll(options)

- **options** {{
    - **key** / **keys** { [string](dataTypes#string) | [RegExp](dataTypes#regexp) }
    - **value** / **values** { [string](dataTypes#string) | [RegExp](dataTypes#regexp) }
- }}
- <ins>**returns**</ins> { [object](dataTypes#object) }

过滤器为字符串时使用包含匹配; 过滤器为正则时使用正则匹配.
