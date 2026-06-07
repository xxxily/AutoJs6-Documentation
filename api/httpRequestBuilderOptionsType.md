# HttpRequestBuilderOptions

---

<p style="font: italic 1em sans-serif; color: #78909C">此章节待补充或完善...</p>
<p style="font: italic 1em sans-serif; color: #78909C">Marked by SuperMonster003 on Mar 21, 2023.</p>

---

HttpRequestBuilderOptions 是一个构建 HTTP 请求时用于传递构建选项的接口.  
这些选项将影响 HTTP 请求的构建.

常见相关方法或属性:

- [http.buildRequest](http#m-buildRequest)(url, **options**)
- [http.request](http#m-request)(url, **options**, callback)
- [http.get](http#m-get)(url, **options**, callback)
- [http.post](http#m-post)(url, data, **options**, callback)
- [http.postJson](http#m-postJson)(url, data, **options**, callback)
- [http.postMultipart](http#m-postMultipart)(url, files, **options**, callback)

---

<p style="font: bold 2em sans-serif; color: #FF7043">HttpRequestBuilderOptions</p>

---

## [p?] timeout

- [ `30000` ] { [number](dataTypes#number) } - 超时时间, 单位为毫秒

## [p?] method

- { [string](dataTypes#string) } - HTTP 方法, 如 `GET` / `POST` / `PUT` / `DELETE` / `HEAD`

## [p?] headers

- { [HttpRequestHeaders](httpRequestHeadersType) } - 请求标头

## [p?] contentType

- { [string](dataTypes#string) } - 请求体内容类型

## [p?] body

- { * } - 请求体

## [p?] files

- { [object](dataTypes#object) } - multipart 文件映射

## [p?] maxRetries

- { [number](dataTypes#number) } - OkHttp 最大重试次数

## [p?] cacheBody

**`6.7.0`**

- [ `false` ] { [boolean](dataTypes#boolean) } - 是否缓存响应体

启用后, `response.body.string()` 或 `response.body.bytes()` 在响应体大小不超过阈值时可重复读取.

## [p?] bodyCacheThresholdBytes

**`6.7.0`**

- [ `8388608` ] { [number](dataTypes#number) } - 响应体缓存阈值, 默认 8 MiB

## [p?] insecure

**`6.7.0`**

- [ `false` ] { [boolean](dataTypes#boolean) } - 是否跳过 TLS 证书和主机名校验

`isInsecure` 是同义选项.

> 警告: 此选项会降低 HTTPS 安全性, 仅应在明确知道风险的调试或特殊网络环境中使用.

## [p?] client

**`6.7.0`**

- { [object](dataTypes#object) } - OkHttpClient.Builder 配置

键名会按反射方式映射到 `okhttp3.OkHttpClient.Builder` 的一参或两参方法. 示例:

```js
http.get('https://example.com', {
    client: {
        followRedirects: false,
        retryOnConnectionFailure: true,
    },
});
```
