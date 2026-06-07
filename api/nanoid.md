# NanoID

`nanoid` 模块用于生成短字符串 ID.

> 源码依据: `runtime/api/augment/nanoid/NanoID.kt`.

---

<p style="font: bold 2em sans-serif; color: #FF7043">nanoid</p>

---

## [@] nanoid

### nanoid(size?)

**`6.6.0`**

- **[ size = `21` ]** { [number](dataTypes#number) } - ID 长度
- <ins>**returns**</ins> { [string](dataTypes#string) }

生成指定长度的随机字符串 ID. 随机源为 `java.security.SecureRandom`.

```js
console.log(nanoid()); // 默认 21 位
console.log(nanoid(10)); // 10 位
```

当前字符表来自源码中的 `urlAlphabet` 常量, 由 64 个 URL 友好字符组成.
