# HttpResponseBody

HttpResponseBody 是 `http` 模块响应对象的 `body` 字段类型.

> 源码依据: `runtime/api/augment/http/ResponseBodyNativeObject.kt`, `HttpSaveResult.kt`.

---

<p style="font: bold 2em sans-serif; color: #FF7043">HttpResponseBody</p>

---

## [m] string

### string()

- <ins>**returns**</ins> { [string](dataTypes#string) }

读取响应体字符串. 读取完整内容后会自动关闭响应体. 如果请求选项启用了 `cacheBody` 且内容大小不超过阈值, 结果会被缓存以支持重复读取.

## [m] bytes

### bytes()

- <ins>**returns**</ins> { [ByteArray](dataTypes#bytearray) }

读取响应体字节数组. 读取完整内容后会自动关闭响应体.

## [m] json

### json()

- <ins>**returns**</ins> { * }

读取响应体字符串并使用 `JSON.parse` 解析.

## [m] stream

### stream()

**`6.7.0`**

- <ins>**returns**</ins> { [java.io.InputStream](https://docs.oracle.com/javase/8/docs/api/java/io/InputStream.html) }

返回响应体输入流. 此方法不会自动关闭响应体, 调用方需要自行关闭流或调用 [close](#m-close).

## [m] saveToFile

### saveToFile(path, bufferSize?)

**`6.7.0`**

- **path** { [string](dataTypes#string) } - 保存目标文件路径, 不可为目录
- **[ bufferSize = `8192` ]** { [number](dataTypes#number) } - 缓冲区大小
- <ins>**returns**</ins> { [HttpSaveResult](#httpsaveresult) }

将响应体直接保存到文件, 避免把大响应整体加载到内存.

```js
let res = http.get('https://example.com/file.zip');
let saved = res.body.saveToFile('./file.zip');
console.log(saved.success, saved.bytesCopied);
```

## [m] close

### close()

**`6.7.0`**

- <ins>**returns**</ins> { [void](dataTypes#void) }

显式关闭响应体.

---

<p style="font: bold 2em sans-serif; color: #FF7043">HttpSaveResult</p>

---

## [p] code

- { [number](dataTypes#number) } - `0` 表示成功

## [p] path

- { [string](dataTypes#string) | null } - 目标路径

## [p] bytesCopied

- { [number](dataTypes#number) } - 已写入字节数

## [p] success

- { [boolean](dataTypes#boolean) } - 是否成功

## [p] error

- { [Error](dataTypes#error) | null } - 保存失败时的错误对象

## [m] isSuccess

### isSuccess()

- <ins>**returns**</ins> { [boolean](dataTypes#boolean) }
