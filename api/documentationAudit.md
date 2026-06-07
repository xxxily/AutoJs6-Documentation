# 文档覆盖审计 (Documentation Audit)

本章节用于记录文档仓库与 AutoJs6 上游源码之间的覆盖关系, 便于后续构建面向 AI 问答的知识库时判断资料可信度.

---

## 审计基准

| 项目 | 基准 |
|------|------|
| 应用源码仓库 | [SuperMonster003/AutoJs6](http://project.autojs6.com) |
| 源码基准提交 | `ed3eb10e88db5a8425fd94bdddefa4176e5e1c94` |
| 源码基准版本 | `6.7.0` |
| 文档仓库旧版本 | `1.1.8` |
| 旧文档最近更新 | `2023/12/01` |
| 审计日期 | `2026/06/07` |

结论: `1.1.8` 版本文档已明显落后于 AutoJs6 `6.7.0` 的实际能力. 主要证据包括:

- 上游 `README.md` 的发行历史已经包含 `v6.7.0`, 并声明 `cvt` / `fmt` / `zip` / `mediainfo` 等模块.
- 上游 `ScriptRuntime.kt` 已将 `mime` / `sysprops` / `sqlite` / `zip` / `nanoid` / `pinyin` / `pinyin4j` / `mediainfo` 等对象注入脚本运行时.
- 旧文档导航与全量文档中缺少上述多个模块页面, 且 `http` 等既有页面未覆盖 `6.7.0` 新增的异步请求、PUT/DELETE/HEAD、响应体流式保存和请求选项.

---

## 覆盖状态

| 模块或能力 | 源码状态 | 文档状态 | 本次处理 |
|------------|----------|----------|----------|
| `cvt` | 已注入运行时 | 缺页 | 新增基础页 |
| `fmt` | 已注入运行时 | 缺页 | 新增基础页 |
| `sqlite` | 已注入运行时 | 缺页 | 新增基础页 |
| `zip` | 已注入运行时 | 缺页 | 新增基础页 |
| `mediainfo` | 已注入运行时 | 缺页 | 新增基础页 |
| `mime` | 已注入运行时 | 缺页 | 新增基础页 |
| `nanoid` | 已注入运行时 | 缺页 | 新增基础页 |
| `sysprops` | 已注入运行时 | 缺页 | 新增基础页 |
| `pinyin` | 已注入运行时 | 缺页 | 新增基础页 |
| `pinyin4j` | 已注入运行时 | 缺页 | 新增基础页 |
| `http` | 已有新能力 | 页面过旧 | 补充 `6.7.0` 速查 |

> 注: "基础页" 表示已经补齐模块入口、主要方法、核心参数和源码证据, 可用于知识库回答基础事实问题. 仍建议后续为每个模块继续补充完整类型页、错误条件和更多示例.

---

## 源码证据

主要源码路径:

- `app/src/main/java/org/autojs/autojs/runtime/ScriptRuntime.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/converter/Converter.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/converter/Bytes.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/formatter/Formatter.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/formatter/Bytes.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/sqlite/SQLite.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/SQLite.kt`
- `app/src/main/java/org/autojs/autojs/core/database/Database.java`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/zip/Zip.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/zip/ZipNativeObject.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/mediainfo/Mediainfo.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/mediainfo/MediainfoNativeObject.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/mime/Mime.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/mime/JsMime.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/nanoid/NanoID.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/sysprops/Sysprops.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/pinyin/Pinyin.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/pinyin/PinyinCore.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/pinyin4j/Pinyin4j.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/http/Http.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/http/RequestBuilder.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/http/ResponseBodyNativeObject.kt`

---

## 知识库建议

建议将知识库按以下层级拆分:

1. 项目总览与版本边界: 项目定位、Android/API 版本、Rhino 版本、构建环境、上游提交.
2. 脚本运行时对象: 全局函数、运行时注入模块、模块别名和版本新增时间.
3. 核心自动化能力: 无障碍、选择器、控件、自动化动作、Root/Shizuku.
4. 文件与媒体能力: 文件、SQLite、Zip、MediaInfo、图片、OCR、Barcode/QR Code.
5. 网络能力: HTTP、Web、WebSocket、响应体处理、TLS/客户端配置.
6. UI 与交互能力: UI、Floaty、Dialog、Console、Toast、Notice.
7. 工程能力: 模块加载、插件、打包 APK、VSCode 扩展、Tasker.
8. 兼容性和限制: 权限、Android 版本、读写路径、线程/协程、异步结果.

---

## 后续优先级

- 为新增基础页补充完整类型页: `ZipOptions`, `ZipNativeObject`, `Database`, `CursorWrapper`, `HttpSaveResult`, `JsMime`, `MediainfoNativeObject`.
- 继续同步 `v6.6.0` 到 `v6.7.0` 的新增 API 到既有页面, 尤其是 `autojs` / `app` / `device` / `ui` / `engines` / `http` / `ocr`.
- 将源码方法签名自动抽取为机器可读索引, 让知识库回答可以回链到具体源码路径.
