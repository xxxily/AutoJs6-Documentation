# HttpResponse

HTTP 请求响应对象. `HttpResponse` 是文档中的虚拟类型, 不是全局构造函数; 实例由 [http](http) 模块返回.

> 源码依据: `runtime/api/augment/http/ResponseWrapper.kt`, `runtime/api/augment/http/ResponseBodyNativeObject.kt`.

```js
typeof global.HttpResponse; // "undefined"

let res = http.get('https://example.com');
console.log(res.statusCode);
console.log(res.url.toString());
```

---

<p style="font: bold 2em sans-serif; color: #FF7043">HttpResponse</p>

---

## [p#] request

- { [Okhttp3Request](okhttp3RequestType) }

当前响应对应的 OkHttp `Request`.

```js
let res = http.get('https://www.msn.com');
console.log(res.request.method()); // GET
```

## [p#] statusCode

- { [number](dataTypes#number) }

HTTP 状态码, 对应 OkHttp `Response.code`.

## [p#] statusMessage

- { [string](dataTypes#string) }

HTTP 状态消息, 对应 OkHttp `Response.message`.

## [p#] body

- { [HttpResponseBody](httpResponseBodyType) }

响应体包装对象. 读取字符串、字节数组、JSON、流式保存等能力见 [HttpResponseBody](httpResponseBodyType).

## [p#] headers

- { [HttpResponseHeaders](httpResponseHeadersType) }

响应头对象. 当前实现会把响应头名称统一转为小写; 同名响应头第一次以字符串保存, 后续同名值会聚合为数组.

```js
Object.entries(http.get('https://www.msn.com').headers).forEach((entry) => {
    let [key, value] = entry;
    console.log(`${key}: ${value}`);
});
```

## [p#] url

- { [Okhttp3HttpUrl](okhttp3HttpUrlType) }

当前响应对应请求的 OkHttp `HttpUrl`.

## [p#] method

- { [string](dataTypes#string) }

当前响应对应请求的 HTTP 方法, 例如 `GET` / `POST` / `PUT` / `DELETE`.
