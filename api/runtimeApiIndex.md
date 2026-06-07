# Runtime API Index - 运行时 API 索引

本章节面向后续知识库构建, 记录 AutoJs6 `6.7.0` 运行时实际注入到脚本环境的对象、别名、源码路径和文档入口.

源码基准:

- 上游仓库: `SuperMonster003/AutoJs6`
- 基准提交: `ed3eb10e88db5a8425fd94bdddefa4176e5e1c94`
- 版本: `6.7.0`

源码依据:

- `app/src/main/java/org/autojs/autojs/runtime/ScriptRuntime.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/Augmentable.kt`

机器可读数据:

- `json/runtimeApiIndexData.json`

---

## 注入规则

`ScriptRuntime.augment(target)` 是运行时 API 注入入口. `Augmentable.augment(..., withDollarPrefix = true)` 会同时注入 `name` 和 `$name`; `withDollarPrefix = false` 只注入原始名称. 部分对象还会通过 `assignWithRuntime(...)` 直接把函数、类或 getter 写入全局对象.

因此, 判断某个 API 是否真实存在时, 应优先对照本页和 `ScriptRuntime.kt`, 其次再看具体模块页面.

## 运行时注入对象

| 注入对象 | `$` 别名 | 嵌套 / 全局补充 | 主要源码 | 文档入口 |
|----------|----------|----------------|----------|----------|
| `global` 函数与类 | 不适用 | `Global`, `GlobalLegacy`, `GlobalClasses` 直接写入全局作用域 | `augment/global/Global.kt`<br>`augment/global/Legacy.kt`<br>`augment/global/Classes.kt` | [Global](global) |
| `isNullish` / `isNonNullish` | 不适用 | 直接写入全局作用域 | `augment/global/IsNullish.kt` | [Global](global) |
| `util` | `$util` | `java`, `version`, `versionCodes`, `inspect`, `morseCode` | `augment/util/Util.kt`<br>`augment/util/Java.kt`<br>`augment/util/Version.kt`<br>`augment/util/VersionCodes.kt`<br>`augment/util/Inspect.kt`<br>`augment/util/MorseCode.kt` | [Util](util) |
| `species` | `$species` | 判断 JavaScript / Java / Android 对象类型 | `augment/global/Species.kt` | [Global](global) |
| `app` | `$app` | `app.autojs` 指向 `autojs` 对象 | `augment/app/App.kt` | [App](app) |
| `autojs` | `$autojs` | `version` 子对象 | `augment/autojs/Autojs.kt`<br>`augment/autojs/Version.kt` | [AutoJs6](autojs) |
| `shell` | `$shell` | 全局 `shell(...)` 入口与 root shell 辅助 | `augment/shell/Shell.kt` | [Shell](shell) |
| `timers` | `$timers` | `setTimeout`, `setInterval` 等计时器兼容入口 | `augment/timers/Timers.kt`<br>`augment/timers/SetIntervalExt.kt` | [Timer](timers) |
| `auto` | `$auto` | 无障碍服务启停、等待、状态 | `augment/automator/Auto.kt` | [Automator](automator) |
| `automator` | `$automator` | `click`, `swipe`, `back`, `home` 等动作还会以全局函数注入 | `augment/automator/Automator.kt` | [Automator](automator) |
| `selector` | `$selector` | `text`, `id`, `className` 等选择器构造函数以全局函数注入 | `augment/selector/Selector.kt` | [UiSelector](uiSelectorType) |
| `events` | `$events` | 按键、触摸、通知、Toast、无障碍手势事件 | `augment/events/Events.kt`<br>`runtime/api/Events.java` | [Event](events) |
| `keys` | `$keys` | 按键码和按键辅助函数 | `augment/events/Keys.kt` | [Keys](keys) |
| `Canvas` | 否 | 可构造类, Canvas / Paint / Path 相关包装 | `augment/canvas/Canvas.kt` | [Canvas](canvas) |
| `images` | `$images` | `captureScreen`, `requestScreenCapture`, `findImage` 等部分函数也有全局入口 | `augment/images/Images.kt` | [Image](image) |
| `ocr` | `$ocr` | `mlkit`, `paddle`, `rapid` 三个子对象 | `augment/ocr/Ocr.kt`<br>`augment/ocr/OcrMLKit.kt`<br>`augment/ocr/OcrPaddle.kt`<br>`augment/ocr/OcrRapid.kt` | [OCR](ocr) |
| `barcode` | `$barcode` | MLKit 条码识别 | `augment/barcode/Barcode.kt` | [Barcode](barcode) |
| `qrcode` | `$qrcode` | 条码识别的二维码限定包装 | `augment/barcode/QrCode.kt` | [QR Code](qrcode) |
| `threads` | `$threads` | 线程、锁、原子变量、一次性结果 | `augment/threads/Threads.kt` | [Thread](threads) |
| `ui` | `$ui` | UI DSL、线程调度、控件注册 | `augment/ui/UI.kt`<br>`augment/ui/UIWidget.kt` | [UI](ui) |
| `colors` | `$colors` | Android / CSS / Web / Material 色表 | `augment/colors/Colors.kt` | [Color](color) |
| `color` | 否 | `Color` 构造与颜色对象能力 | `augment/colors/Color.kt`<br>`augment/colors/ColorNativeObject.kt` | [Color](color) |
| `tasks` | `$tasks` | 定时任务、广播任务、任务查询与更新 | `augment/tasks/Tasks.kt` | [Task](tasks) |
| `dialogs` | `$dialogs` | 对话框构建与显示 | `augment/dialogs/Dialogs.kt` | [Dialog](dialogs) |
| `continuation` | `$continuation` | 协程 / continuation 内部模块 | `augment/continuation/Continuation.kt`<br>`augment/continuation/Creator.kt` | [Continuation](continuation) |
| `http` | `$http` | OkHttp 请求、响应包装、流式保存 | `augment/http/Http.kt`<br>`augment/http/RequestBuilder.kt`<br>`augment/http/ResponseWrapper.kt`<br>`augment/http/ResponseBodyNativeObject.kt` | [HTTP](http) |
| `web` | `$web` | WebView 注入、WebClient、WebSocket 辅助 | `augment/web/Web.kt` | [Web](web) |
| `WebSocket` | 否 | 可构造类, 不注入 `$WebSocket` | `augment/web/WebSocket.kt`<br>`augment/web/WebSocketFields.kt` | [WebSocket](webSocketType) |
| `s13n` | `$s13n` | 标准化工具 | `augment/s13n/S13n.kt` | [Standardization](s13n) |
| `cvt` | `$cvt` | `bytes` 子对象 | `augment/converter/Converter.kt`<br>`augment/converter/Bytes.kt` | [Cvt](cvt) |
| `fmt` | `$fmt` | `bytes` 子对象 | `augment/formatter/Formatter.kt`<br>`augment/formatter/Bytes.kt` | [Fmt](fmt) |
| `console` | `$console` | 代理全局控制台对象, 含悬浮控制台配置 | `augment/console/Console.kt` | [Console](console) |
| `plugins` | `$plugins` | 插件加载与插件上下文 | `augment/plugins/Plugins.kt` | [Plugins](plugins) |
| `Arrayx` | 否 | `Array` 扩展工具对象 | `augment/jsox/Arrayx.kt` | [Arrayx](arrayx) |
| `Numberx` | 否 | `Number` 扩展工具对象 | `augment/jsox/Numberx.kt` | [Numberx](numberx) |
| `Mathx` | 否 | `Math` 扩展工具对象 | `augment/jsox/Mathx.kt` | [Mathx](mathx) |
| `jsox` | `$jsox` | JavaScript 内建对象扩展聚合 | `augment/jsox/Jsox.kt` | 暂无独立页; 相关页见 [Polyfill](polyfill), [Arrayx](arrayx), [Numberx](numberx), [Mathx](mathx) |
| `files` | `$files` | 全局 `open`、路径解析、读写、复制移动 | `augment/files/Files.kt` | [File](files) |
| `crypto` | `$crypto` | 加密、摘要、密钥、密钥对 | `augment/cryptyo/Crypto.kt` | [Crypto](crypto) |
| `RootAutomator` | 否 | 可构造类, 依赖 root 或 Shizuku | `augment/automator/RootAutomator.kt`<br>`augment/automator/RootAutomatorNativeObject.kt` | [Automator](automator) |
| `engines` | `$engines` | 脚本执行、执行配置、引擎列表 | `augment/engines/Engines.kt` | [Engine](engines) |
| `floaty` | `$floaty` | 悬浮窗、悬浮窗权限、Android Q+ 剪贴板辅助 | `augment/floaty/Floaty.kt`<br>`runtime/api/Floaty.kt` | [Floaty](floaty) |
| `storages` | `$storages` | 本地键值存储 | `augment/storages/Storages.kt`<br>`augment/storages/StorageNativeObject.kt` | [Storage](storages) |
| `device` | `$device` | 设备信息、亮度、音量、电量、屏幕、指针位置 | `augment/device/Device.kt`<br>`runtime/api/Device.java` | [Device](device) |
| `recorder` | `$recorder` | 录制与输入事件相关能力 | `augment/recorder/Recorder.kt` | [Recorder](recorder) |
| `toast` | `$toast` | Toast 显示与解析 | `augment/toast/Toast.kt`<br>`augment/toast/ToastParser.kt` | [Toast](toast) |
| `media` | `$media` | 媒体库扫描等 Android media 能力 | `augment/media/Media.kt` | [Media](media) |
| `sensors` | `$sensors` | 传感器注册与事件 | `augment/sensors/Sensors.kt` | [Sensor](sensors) |
| `base64` | `$base64` | Base64 编解码 | `augment/base64/Base64.kt` | [Base64](base64) |
| `notice` | `$notice` | `channel` 子对象, 通知发布与渠道管理 | `augment/notice/Notice.kt`<br>`augment/notice/Channel.kt` | [Notice](notice) |
| `shizuku` | `$shizuku` | 命令执行、状态、前台组件查询 | `augment/shizuku/Shizuku.kt` | [Shizuku](shizuku) |
| `opencc` | `$opencc` | 中文转换 | `augment/opencc/OpenCC.kt` | [OpenCC](opencc) |
| `mime` | `$mime` | MIME 字符串解析 | `augment/mime/Mime.kt`<br>`augment/mime/JsMime.kt` | [MIME](mime) |
| `sysprops` | `$sysprops` | Android 系统属性读取 | `augment/sysprops/Sysprops.kt` | [Sysprops](sysprops) |
| `sqlite` | `$sqlite` | SQLite 打开、`Database`, `CursorWrapper` | `augment/sqlite/SQLite.kt`<br>`runtime/api/SQLite.kt`<br>`core/database/Database.java` | [SQLite](sqlite) |
| `zip` | `$zip` | Zip4j 包装、`ZipOptions`, `ZipNativeObject` | `augment/zip/Zip.kt`<br>`augment/zip/ZipNativeObject.kt` | [Zip](zip) |
| `nanoid` | `$nanoid` | Nano ID 生成 | `augment/nanoid/NanoID.kt` | [NanoID](nanoid) |
| `pinyin` | `$pinyin` | 拼音转换核心 | `augment/pinyin/Pinyin.kt`<br>`augment/pinyin/PinyinCore.kt` | [Pinyin](pinyin) |
| `pinyin4j` | `$pinyin4j` | Pinyin4j 兼容入口 | `augment/pinyin4j/Pinyin4j.kt` | [Pinyin4j](pinyin4j) |
| `mediainfo` | `$mediainfo` | MediaInfo 原生库包装 | `augment/mediainfo/Mediainfo.kt`<br>`augment/mediainfo/MediainfoNativeObject.kt` | [MediaInfo](mediainfo) |

## 高频独立类型页

P2 已将以下高频运行时返回类型或选项对象拆为独立页面, 便于知识库按类型建立节点:

- [ZipOptions](zipOptionsType)
- [ZipNativeObject](zipNativeObjectType)
- [Database](databaseType)
- [CursorWrapper](cursorWrapperType)
- [HttpSaveResult](httpSaveResultType)
- [JsMime](jsMimeType)
- [MediainfoNativeObject](mediainfoNativeObjectType)

## 旧 Auto.js 4.x 残留核对

本轮已对 P0 / P1 / P2 覆盖页面中的旧 Auto.js 4.x 叙述进行集中核对:

| 位置 | 当前处理 |
|------|----------|
| [HTTP](http), [Web](web), [OCR](ocr), [Console](console) | 已按 AutoJs6 `6.7.0` 源码改写旧行为说明, 废弃 / abandoned API 已标注. |
| [UiSelector](uiSelectorType) | 仍保留 Auto.js 4.x 差异提示, 但已明确为兼容差异说明, 不是当前行为. |
| [Q & A](qa), [About](documentation), [Overview](overview), [Progress](progress) | 保留项目来源和历史背景叙述; 不作为当前 API 行为依据. |
| `timers`, `shell`, `ui`, `modules`, `threads`, `image`, `events`, `media` 等未进入 P0 / P1 的旧章节 | 已在 [Documentation Roadmap](documentationRoadmap) 中作为后续源码校对风险保留; 知识库回答当前行为时不应优先引用这些旧章节. |

判断原则: 当历史背景与本页运行时索引、具体页面 "源码依据" 小节或源码路径冲突时, 以后者为准.
