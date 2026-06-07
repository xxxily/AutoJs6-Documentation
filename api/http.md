# HTTP

`http` 模块用于构建和发送 HTTP 请求, 并把 OkHttp 响应包装为脚本侧对象.

> 源码依据: `runtime/api/augment/http/Http.kt`, `RequestBuilder.kt`, `RequestBuilderHelper.kt`, `ResponseBodyNativeObject.kt`, `HttpSaveResult.kt`.

---

## `6.7.0` 能力速查

AutoJs6 `6.7.0` 的 HTTP 模块覆盖同步请求、回调请求和异步请求三类用法.

- 同步/回调: `request`, `get`, `head`, `post`, `postJson`, `postMultipart`, `put`, `delete`, `del`.
- 异步: `requestAsync`, `getAsync`, `headAsync`, `postAsync`, `postJsonAsync`, `postMultipartAsync`, `putAsync`, `deleteAsync`, `delAsync`.
- 构建: `buildRequest`.
- 响应体: `response.body.string()`, `bytes()`, `json()`, `stream()`, `saveToFile()`, `close()`.
- 请求选项: `headers`, `method`, `contentType`, `body`, `files`, `timeout`, `maxRetries`, `cacheBody`, `bodyCacheThresholdBytes`, `client`, `insecure`.

> 注意: 便捷方法不会自动把第二个参数函数识别为 callback. 如果需要 callback 且没有 options, 请显式传 `{}` / `null` 占位, 如 `http.get(url, {}, callback)` 或 `http.post(url, data, {}, callback)`.

---

<p style="font: bold 2em sans-serif; color: #FF7043">http</p>

---

## [m] buildRequest

### buildRequest(url, options?)

**`6.7.0`**

- **url** { [string](dataTypes#string) } - 请求 URL; 没有 `http://` / `https://` 前缀时自动补 `http://`
- **[ options ]** { [HttpRequestBuilderOptions](httpRequestBuilderOptionsType) }
- <ins>**returns**</ins> { [okhttp3.Request](https://square.github.io/okhttp/5.x/okhttp/okhttp3/-request/) }

只构建 OkHttp `Request`, 不发送网络请求. `options` 非空时必须是 JavaScript 对象. 直接使用此方法时必须提供 `options.method`; 源码没有为裸 `buildRequest` 默认设置 `GET`, 缺少 method 会在构建请求时失败. 便捷方法会自动写入请求方法.

```js
let req = http.buildRequest('https://example.com/api', {
    method: 'GET',
    headers: { Accept: 'application/json' },
});
console.log(req.url().toString());
```

## [m] request

### request(url, options?)

**`6.7.0`**

- **url** { [string](dataTypes#string) }
- **[ options ]** { [HttpRequestBuilderOptions](httpRequestBuilderOptionsType) }
- <ins>**returns**</ins> { [HttpResponse](httpResponseType) }

同步发送请求并返回响应. `options` 会规范化为对象, 再构建请求和 OkHttp call. 直接使用 `request` 时必须提供 `options.method`; 源码没有默认 `GET`. 普通 GET 请求应优先使用 [get](#m-get).

```js
let res = http.request('https://example.com', { method: 'GET' });
console.log(res.statusCode);
console.log(res.body.string());
```

### request(url, options, callback)

- **callback** { [function](dataTypes#function) } - 回调参数为 `(response, error)`
- <ins>**returns**</ins> { [void](dataTypes#void) }

回调模式使用 OkHttp `enqueue`. 成功时调用 `callback(response, null)`, 失败时调用 `callback(null, error)`.

## [m] requestAsync

### requestAsync(url, options?, callback?)

**`6.7.0`**

- **url** { [string](dataTypes#string) }
- **[ options ]** { [HttpRequestBuilderOptions](httpRequestBuilderOptionsType) }
- **[ callback ]** { [function](dataTypes#function) } - 回调参数为 `(response, error)`
- <ins>**returns**</ins> { [object](dataTypes#object) }

在后台线程执行网络请求, 并返回 AutoJs6 运行时的异步操作对象. 如果提供 callback, 会在 UI 线程包装响应后调用.

```js
http.getAsync('https://example.com', { cacheBody: true }, function (res, err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(res.statusCode);
    console.log(res.body.string());
});
```

## [m] get

### get(url, options?)

**`6.7.0`**

- **url** { [string](dataTypes#string) }
- **[ options ]** { [HttpRequestBuilderOptions](httpRequestBuilderOptionsType) }
- <ins>**returns**</ins> { [HttpResponse](httpResponseType) }

发送 `GET` 请求. `options` 非空时必须是 JavaScript 对象.

### get(url, options, callback)

- **callback** { [function](dataTypes#function) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

回调模式发送 `GET` 请求.

## [m] getAsync

### getAsync(url, options?, callback?)

**`6.7.0`**

异步 `GET` 请求. 参数与 [requestAsync](#m-requestAsync) 一致, 但会自动设置 `method: "GET"`.

## [m] head

### head(url, options?, callback?)

**`6.7.0`**

发送 `HEAD` 请求. `options` 非空时必须是 JavaScript 对象.

## [m] headAsync

### headAsync(url, options?, callback?)

**`6.7.0`**

异步 `HEAD` 请求.

## [m] post

### post(url, data?, options?, callback?)

**`6.7.0`**

- **url** { [string](dataTypes#string) }
- **[ data ]** { [object](dataTypes#object) | [string](dataTypes#string) | * }
- **[ options ]** { [HttpRequestBuilderOptions](httpRequestBuilderOptionsType) }
- **[ callback ]** { [function](dataTypes#function) }
- <ins>**returns**</ins> { [HttpResponse](httpResponseType) | [void](dataTypes#void) }

发送 `POST` 请求. 默认 `contentType` 为 `application/x-www-form-urlencoded`, 此时 `data` 需要是可转为 JavaScript 对象的键值映射, 并会转换为 `FormBody`. 默认情况下传入字符串不会作为原始表单体字符串发送; 如需字符串请求体, 请设置非默认 `contentType`. 当 `contentType` 为 `application/json` 时会通过 [postJson](#m-postJson) 使用 `JSON.stringify(data)`. 其他 `contentType` 下会把 `data` 作为请求体交给 `RequestBuilderHelper.parseBody`.

```js
let res = http.post('https://example.com/login', {
    username: 'alice',
    password: 'secret',
});
console.log(res.statusCode);
```

## [m] postAsync

### postAsync(url, data?, options?, callback?)

**`6.7.0`**

异步 `POST` 请求. 参数与 [post](#m-post) 一致.

## [m] postJson

### postJson(url, data?, options?, callback?)

**`6.7.0`**

- **url** { [string](dataTypes#string) }
- **[ data ]** { * }
- **[ options ]** { [HttpRequestBuilderOptions](httpRequestBuilderOptionsType) }
- **[ callback ]** { [function](dataTypes#function) }
- <ins>**returns**</ins> { [HttpResponse](httpResponseType) | [void](dataTypes#void) }

发送 JSON `POST` 请求. 内部设置 `contentType` 为 `application/json`, 然后通过 `JSON.stringify(data)` 生成请求体.

```js
let res = http.postJson('https://example.com/api', {
    name: 'AutoJs6',
});
console.log(res.body.json());
```

## [m] postJsonAsync

### postJsonAsync(url, data?, options?, callback?)

**`6.7.0`**

异步 JSON `POST` 请求.

## [m] postMultipart

### postMultipart(url, files, options?, callback?)

**`6.7.0`**

- **url** { [string](dataTypes#string) }
- **files** { [object](dataTypes#object) }
- **[ options ]** { [HttpRequestBuilderOptions](httpRequestBuilderOptionsType) }
- **[ callback ]** { [function](dataTypes#function) }
- <ins>**returns**</ins> { [HttpResponse](httpResponseType) | [void](dataTypes#void) }

发送 `multipart/form-data` 请求. `files` 必须是 JavaScript 对象, 值支持以下形式:

- `string` / `number` - 普通表单字段.
- `[fileName, path]` - 文件字段, MIME 类型按文件扩展名推断, 推断失败使用 `application/octet-stream`.
- `[fileName, mimeType, path]` - 文件字段, 显式指定 MIME 类型.
- `PFileInterface` - 例如文件模块返回的文件对象; 文件名取路径文件名.

```js
let res = http.postMultipart('https://example.com/upload', {
    token: 'abc',
    file: ['report.txt', 'text/plain', './report.txt'],
});
console.log(res.body.string());
```

数组长度不是 `2` 或 `3`, 或值不是上述类型时会抛出异常.

## [m] postMultipartAsync

### postMultipartAsync(url, files, options?, callback?)

**`6.7.0`**

异步 `multipart/form-data` 请求. `files` 参数格式与 [postMultipart](#m-postMultipart) 一致.

## [m] put

### put(url, data?, options?, callback?)

**`6.7.0`**

- **url** { [string](dataTypes#string) }
- **[ data ]** { [object](dataTypes#object) | [string](dataTypes#string) | * }
- **[ options ]** { [HttpRequestBuilderOptions](httpRequestBuilderOptionsType) }
- **[ callback ]** { [function](dataTypes#function) }
- <ins>**returns**</ins> { [HttpResponse](httpResponseType) | [void](dataTypes#void) }

发送 `PUT` 请求. 数据处理方式与 [post](#m-post) 一致, 默认 `contentType` 为 `application/x-www-form-urlencoded`.

## [m] putAsync

### putAsync(url, data?, options?, callback?)

**`6.7.0`**

异步 `PUT` 请求.

## [m] delete

### delete(url, data?, options?, callback?)

**`6.7.0`**

发送 `DELETE` 请求. 数据处理方式与 [post](#m-post) 一致, 默认 `contentType` 为 `application/x-www-form-urlencoded`.

## [m] del

### del(url, data?, options?, callback?)

**`6.7.0`**

[delete](#m-delete) 的别名.

## [m] deleteAsync

### deleteAsync(url, data?, options?, callback?)

**`6.7.0`**

异步 `DELETE` 请求.

## [m] delAsync

### delAsync(url, data?, options?, callback?)

**`6.7.0`**

[deleteAsync](#m-deleteAsync) 的别名.

---

<p style="font: bold 2em sans-serif; color: #FF7043">请求构建规则</p>

---

## URL

`RequestBuilderHelper.getUrl` 只检查字符串是否匹配 `^https?://.*`. 不匹配时自动补 `http://`.

## headers

`headers` 必须是 JavaScript 对象. 每个键值都会通过 `Request.Builder.header(name, value)` 设置; 值为数组时会按数组项依次调用 `header`. 这里不是 `addHeader`, 因此同名请求头会被后一次设置覆盖.

```js
http.get('https://example.com', {
    headers: {
        Accept: 'application/json',
        'X-Trace': ['a', 'b'],
    },
});
```

## body

`options.body` 存在时优先作为请求体. 如果 `body` 和 `files` 同时存在, 源码会走 `body` 分支, 不会构建 multipart. 支持:

- `okhttp3.RequestBody` - 直接使用.
- `string` - 按 `options.contentType` 转为 RequestBody.
- `function(sink)` - 创建自定义 RequestBody, 写入时以 `BufferedSink` 调用函数.

其他类型会抛出 `Unknown type of body for header options`.

## files

`options.files` 存在且 `body` 不存在时会构建 `MultipartBody`. 该对象格式与 [postMultipart](#m-postMultipart) 一致.

## client / timeout / insecure

请求发送前会更新运行时 OkHttp 配置:

- `timeout` - 同时设置 read / write / connect timeout, 单位毫秒.
- `maxRetries` - 设置运行时 `MutableOkHttp.maxRetries`.
- `client` - 必须是对象. 键名对应 `OkHttpClient.Builder` 的一参或二参方法; 值为长度为 `2` 的列表时尝试调用二参方法, 否则调用一参方法. 0 参数 Builder 方法不允许通过此方式调用.
- `insecure` / `isInsecure` - 为 `true` 时安装信任所有证书的 `TrustManager`, 并关闭主机名校验.

## 响应体缓存

- `cacheBody` 默认 `false`.
- `bodyCacheThresholdBytes` 默认 `8 * 1024 * 1024`.

启用缓存后, `response.body.string()` / `bytes()` 在内容长度未知或不超过阈值时会把结果缓存在 `ResponseWrapper` 中, 便于重复读取. 完整读取后响应体会自动关闭.

---

<p style="font: bold 2em sans-serif; color: #FF7043">返回值与资源释放</p>

---

- 无 callback 的同步方法返回 [HttpResponse](httpResponseType).
- 有 callback 的方法返回 `undefined`, callback 接收 `(response, error)`.
- `*Async` 方法返回运行时异步操作对象, callback 同样接收 `(response, error)`.
- `response.body.string()` / `bytes()` / `json()` / `saveToFile()` 会在完整消费后关闭响应体.
- `response.body.stream()` 不会自动关闭, 调用方需要关闭流或调用 `response.body.close()`.
