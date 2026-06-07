# HttpSaveResult

HttpSaveResult 是 [HttpResponseBody.saveToFile](httpResponseBodyType#m-savetofile) 的返回类型, 用于描述响应体流式保存结果.

源码依据:

- `app/src/main/java/org/autojs/autojs/runtime/api/augment/http/HttpSaveResult.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/http/ResponseBodyNativeObject.kt`

常见相关方法或属性:

- [HttpResponseBody.saveToFile](httpResponseBodyType#m-savetofile)

---

<p style="font: bold 2em sans-serif; color: #FF7043">HttpSaveResult</p>

---

`saveToFile(path, bufferSize?)` 会边读边写响应体, 成功或失败都会关闭输入流、输出流和响应体. 保存过程中发生异常不会向外抛出, 而是返回失败的 `HttpSaveResult`; 但 `path` 为目录或以 `/` 结尾时会在保存前直接抛出参数异常.

## [p] code

- { [number](dataTypes#number) } - `0` 表示成功

成功为 `0`; 通用失败为 `-1`.

## [p] path

- { [string](dataTypes#string) | null }

保存目标路径.

## [p] bytesCopied

- { [number](dataTypes#number) }

已写入字节数.

## [p] success

- { [boolean](dataTypes#boolean) }

是否成功. 等价于 `code === 0`.

## [p] error

- { [Error](dataTypes#error) | null }

保存失败时的错误对象.

## [m] isSuccess

### isSuccess()

- <ins>**returns**</ins> { [boolean](dataTypes#boolean) }

判断保存是否成功. 此方法不接受参数.

## 示例

```js
let res = http.get('https://example.com/file.zip');
let saved = res.body.saveToFile('./file.zip');

if (!saved.isSuccess()) {
    console.error(saved.error);
}
```

