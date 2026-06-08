# 文档更新日志 (Changelog)

## v1.2.0

<p style="font: bold 0.8em sans-serif; color: #888888">2026/06/07</p>

- `新增` [文档覆盖审计](https://autojs6.anzz.top/documentationAudit) 页面, 记录文档仓库 `1.1.8` 与 AutoJs6 上游 `6.7.0` 源码之间的差异基线
- `新增` [文档更新推进清单](https://autojs6.anzz.top/documentationRoadmap) 页面, 记录已完成、待更新和后续 agent 验收规则
- `新增` [运行时 API 索引](https://autojs6.anzz.top/runtimeApiIndex) 页面, 对照 `ScriptRuntime.kt` 记录所有运行时注入对象、`$` 别名、嵌套对象、源码路径和文档入口
- `新增` [权限能力矩阵](https://autojs6.anzz.top/permissionCapabilityMatrix) 页面, 集中记录无障碍、Root/Shizuku、悬浮窗、截屏、通知、系统设置、存储、网络、OCR 等敏感能力的权限与 Android 版本边界
- `新增` 机器可读运行时索引 `json/runtimeApiIndexData.json`, 为后续知识库构建提供模块、类型、权限与旧文档风险的结构化数据
- `新增` [单位转换 (Cvt)](https://autojs6.anzz.top/cvt) 文档, 覆盖 `cvt.bytes` / `cvt.bytes.strict` / `cvt.bytes.loose`
- `新增` [数据格式化 (Fmt)](https://autojs6.anzz.top/fmt) 文档, 覆盖 `fmt.bytes` / `fmt.bytes.strict` / `fmt.bytes.loose`
- `新增` [SQLite](https://autojs6.anzz.top/sqlite) 文档, 覆盖 `sqlite.open`、`Database` 与 `CursorWrapper` 基础能力
- `新增` [Zip](https://autojs6.anzz.top/zip) 文档, 覆盖 `zip.open` / `zipFile` / `zipDir` / `zipFiles` / `unzip` 及 `ZipNativeObject`
- `新增` [MediaInfo](https://autojs6.anzz.top/mediainfo) 文档, 覆盖 `mediainfo.read` 与动态媒体流信息读取
- `新增` [MIME](https://autojs6.anzz.top/mime) 文档, 覆盖 MIME 字符串解析结果
- `新增` [NanoID](https://autojs6.anzz.top/nanoid) 文档, 覆盖随机 ID 生成
- `新增` [系统属性 (Sysprops)](https://autojs6.anzz.top/sysprops) 文档, 覆盖系统属性读取及过滤
- `新增` [汉语拼音 (Pinyin)](https://autojs6.anzz.top/pinyin) 与 [Pinyin4j](https://autojs6.anzz.top/pinyin4j) 文档
- `新增` [ZipOptions](https://autojs6.anzz.top/zipOptionsType), [ZipNativeObject](https://autojs6.anzz.top/zipNativeObjectType), [Database](https://autojs6.anzz.top/databaseType), [CursorWrapper](https://autojs6.anzz.top/cursorWrapperType), [HttpSaveResult](https://autojs6.anzz.top/httpSaveResultType), [JsMime](https://autojs6.anzz.top/jsMimeType), [MediainfoNativeObject](https://autojs6.anzz.top/mediainfoNativeObjectType) 独立类型页
- `优化` [HTTP](https://autojs6.anzz.top/http) 章节补充 `6.7.0` 新增异步请求、PUT/DELETE/HEAD、响应体保存及请求选项
- `优化` [HttpRequestBuilderOptions](https://autojs6.anzz.top/httpRequestBuilderOptionsType) 与 [HttpResponseBody](https://autojs6.anzz.top/httpResponseBodyType) 类型说明
- `优化` 完成 P1 高频 API 源码校对, 覆盖 [Global](https://autojs6.anzz.top/global), [Automator](https://autojs6.anzz.top/automator), [UiSelector](https://autojs6.anzz.top/uiSelectorType), [UiObject](https://autojs6.anzz.top/uiObjectType), [App](https://autojs6.anzz.top/app), [AutoJs6](https://autojs6.anzz.top/autojs), [Device](https://autojs6.anzz.top/device), [Files](https://autojs6.anzz.top/files), [Engines](https://autojs6.anzz.top/engines), [Tasks](https://autojs6.anzz.top/tasks), [UI](https://autojs6.anzz.top/ui), [Floaty](https://autojs6.anzz.top/floaty), [Web](https://autojs6.anzz.top/web), [OCR](https://autojs6.anzz.top/ocr), [Notice](https://autojs6.anzz.top/notice), [Console](https://autojs6.anzz.top/console)
- `修复` [Global](https://autojs6.anzz.top/global) 中 `cY()` 示例高度引用、`wait` UI 线程标签和 `species` 中源码不存在的条目
- `修复` [Web](https://autojs6.anzz.top/web) 与 [OCR](https://autojs6.anzz.top/ocr) 中 Auto.js 4.x / 2023 年旧说明, 补充 Rapid OCR 与当前 WebSocket / WebView 行为
- `修复` [Console](https://autojs6.anzz.top/console) 中 `input` / `rawInput` 的废弃行为说明
- `修复` P0 / P1 / P2 覆盖页面中的旧 Auto.js 4.x 行为残留, 并在运行时索引中标记仍应作为历史背景处理的旧章节
- `优化` 更新侧边栏、静态页目录、全量文档和部署进度

## v1.1.8

<p style="font: bold 0.8em sans-serif; color: #888888">2023/12/01</p>

- `新增` [中文转换 (OpenCC)](https://autojs6.anzz.top/opencc) 文档
- `新增` [OpenCCConversion](https://autojs6.anzz.top/openCCConversionType) 类型
- `新增` [选择器](https://autojs6.anzz.top/uiSelectorType) 章节增加 [plus](https://autojs6.anzz.top/uiObjectType#m-plus) / [append](https://autojs6.anzz.top/uiObjectType#m-append) 条目
- `新增` [控制台 (Console)](https://autojs6.anzz.top/console) 章节增加 [setTouchable](https://autojs6.anzz.top/console#m-settouchable) 条目
- `新增` [ConsoleBuildOptions](https://autojs6.anzz.top/consoleBuildOptionsType) 章节增加 [touchable](https://autojs6.anzz.top/consoleBuildOptionsType#p-touchable) 条目
- `优化` [光学字符识别 (OCR)](https://autojs6.anzz.top/ocr) 章节增加 Paddle 工作模式使用提示
- `优化` 完善 [Shizuku](https://autojs6.anzz.top/shizuku) 章节
- `优化` 完善 [选择器](https://autojs6.anzz.top/uiSelectorType) 章节

## v1.1.7

<p style="font: bold 0.8em sans-serif; color: #888888">2023/10/30</p>

- `新增` [Shizuku](https://autojs6.anzz.top/shizuku) 文档
- `新增` [WebSocket](https://autojs6.anzz.top/webSocketType) 文档
- `新增` [条码 (Barcode)](https://autojs6.anzz.top/barcode) 文档
- `新增` [二维码 (QR Code)](https://autojs6.anzz.top/qrcode) 文档
- `优化` 完善 [颜色 (Color)](https://autojs6.anzz.top/color) 章节
- `优化` 完善 [光学字符识别 (OCR)](https://autojs6.anzz.top/ocr) 章节

## v1.1.6

<p style="font: bold 0.8em sans-serif; color: #888888">2023/07/21</p>

- `优化` 完善 [控件节点](https://autojs6.anzz.top/uiObjectType) 章节

## v1.1.5

<p style="font: bold 0.8em sans-serif; color: #888888">2023/07/06</p>

- `新增` [密文 (Crypto)](https://autojs6.anzz.top/crypto) 文档
- `新增` [CryptoCipherOptions](https://autojs6.anzz.top/cryptoCipherOptionsType) / [CryptoKey](https://autojs6.anzz.top/cryptoKeyType) / [CryptoKeyPair](https://autojs6.anzz.top/cryptoKeyPairType) 等类型
- `修复` floaty 模块 widht 拼写失误 _[`issue #1`](https://github.com/xxxily/AutoJs6-Documentation/issues/1)_
- `优化` 完善 [Base64](https://autojs6.anzz.top/base64) 章节
- `优化` 完善 [颜色 (Color)](https://autojs6.anzz.top/color) 章节

## v1.1.4

<p style="font: bold 0.8em sans-serif; color: #888888">2023/05/26</p>

- `新增` [console.resetGlobalLogConfig](https://autojs6.anzz.top/console#m-resetgloballogconfig) 文档
- `新增` [web.newWebSocket](https://autojs6.anzz.top/web#m-newwebsocket) 文档
- `优化` 完善 [全能类型 (Omnipotent Types)](https://autojs6.anzz.top/omniTypes) 章节
- `优化` 完善 [安卓 API 级别 (Android API Level)](https://autojs6.anzz.top/apiLevel) 章节

## v1.1.3

<p style="font: bold 0.8em sans-serif; color: #888888">2023/04/29</p>

- `新增` [颜色类 (Color)](https://autojs6.anzz.top/colorType) 文档
- `新增` [控制台 (Console)](https://autojs6.anzz.top/console) 文档
- `新增` [标准化 (Standardization)](https://autojs6.anzz.top/s13n) 文档
- `新增` [全能类型 (Omnipotent Types)](https://autojs6.anzz.top/omniTypes) 文档
- `新增` [NoticeBuilder](https://autojs6.anzz.top/noticeBuilderType) / [NoticeChannelOptions](https://autojs6.anzz.top/noticeChannelOptionsType) / [NoticeOptions](https://autojs6.anzz.top/noticeOptionsType) 等类型
- `新增` 示例代码区域增加 Copy 按钮以复制代码内容
- `新增` 文档中的图片内容支持点击以全屏方式查看
- `修复` 文档内容中部分图片资源丢失的问题
- `优化` 生成器根据 properties 文件自动获取 AutoJs6 版本信息
- `优化` 压缩本地 JavaScript 文件以提升页面加载速度
- `优化` 本地化字体文件避免网络条件不佳时影响页面加载速度
- `优化` 部分表格内容强制禁用自动断行以提升阅读体验
- `优化` 完善 [颜色 (Color)](https://autojs6.anzz.top/color) 章节
- `优化` 完善 [消息通知 (Notice)](https://autojs6.anzz.top/notice) 章节
- `优化` 完善 [光学字符识别 (OCR)](https://autojs6.anzz.top/ocr) 章节

## v1.1.2

<p style="font: bold 0.8em sans-serif; color: #888888">2023/03/21</p>

- `新增` [光学字符识别 (OCR)](https://autojs6.anzz.top/ocr) 文档
- `新增` [消息通知 (Notice)](https://autojs6.anzz.top/notice) 文档
- `新增` [HttpRequestHeaders](https://autojs6.anzz.top/httpRequestHeadersType) / [HttpResponseHeaders](https://autojs6.anzz.top/httpResponseHeadersType) / [OpenCVRect](https://autojs6.anzz.top/opencvRectType) 等类型
- `新增` [通知渠道](https://autojs6.anzz.top/glossaries#通知渠道) / [HTTP 标头](https://autojs6.anzz.top/glossaries#HTTP-标头) / [MIME 类型](https://autojs6.anzz.top/glossaries#MIME-类型) / [HTTP 请求方法](https://autojs6.anzz.top/glossaries#HTTP-请求方法) 等术语
- `新增` [颜色 (Color)](https://autojs6.anzz.top/color) 章节增加 [toColorStateList](https://autojs6.anzz.top/color#m-tocolorstatelist) 及 [setPaintColor](https://autojs6.anzz.top/color#m-setpaintcolor) 条目
- `修复` 文档更新日志条目中的链接无效的问题
- `优化` 完善 [疑难解答 (Q & A)](https://autojs6.anzz.top/qa) 章节

## v1.1.1

<p style="font: bold 0.8em sans-serif; color: #888888">2023/03/02</p>

- `新增` [Base64](https://autojs6.anzz.top/base64) 文档
- `新增` [活动 (Activity)](https://autojs6.anzz.top/activity) 文档
- `新增` [插件 (Plugins)](https://autojs6.anzz.top/plugins) 文档
- `新增` [存储 (Storages)](https://autojs6.anzz.top/storages) 文档
- `新增` [万维网 (Web)](https://autojs6.anzz.top/web) 文档
- `新增` [global.species](https://autojs6.anzz.top/global#m-species) 文档
- `新增` [术语](https://autojs6.anzz.top/glossaries) 章节增加 [阈值](https://autojs6.anzz.top/glossaries#阈值) / [注入](https://autojs6.anzz.top/glossaries#注入) 等条目
- `新增` [数据类型](https://autojs6.anzz.top/dataTypes) 章节增加 [Storage](https://autojs6.anzz.top/storageType) / [ColorDetectionAlgorithm](https://autojs6.anzz.top/dataTypes#colordetectionalgorithm) / [InjectableWebView](https://autojs6.anzz.top/injectableWebViewType) 等类型
- `修复` 示例代码中与美元符号 ($) 相关内容可能出现占位符替换失败的问题
- `优化` 完善 [颜色 (Color)](https://autojs6.anzz.top/color) 章节

## v1.1.0

<p style="font: bold 0.8em sans-serif; color: #888888">2023/01/21</p>

- `新增` [AutoJs6 本体应用](https://autojs6.anzz.top/autojs) 文档
- `新增` [颜色列表 (Color Table)](https://autojs6.anzz.top/colorTable) 文档
- `新增` [版本工具类 (Version)](https://autojs6.anzz.top/versionType) 文档
- `新增` [数据类型](https://autojs6.anzz.top/dataTypes) 章节增加 [RootMode](https://autojs6.anzz.top/dataTypes#rootmode) / [ColorInt](https://autojs6.anzz.top/dataTypes#colorint) / [IntRange](https://autojs6.anzz.top/dataTypes#intrange) 等类型
- `新增` [global.R](https://autojs6.anzz.top/global#p-r) 文档
- `新增` [Numberx.clampTo](https://autojs6.anzz.top/numberx#m-clampto) / [Numberx.parseAny](https://autojs6.anzz.top/numberx#m-parseany) 文档
- `优化` 完善 [颜色 (Color)](https://autojs6.anzz.top/color) 章节

## v1.0.6

<p style="font: bold 0.8em sans-serif; color: #888888">2022/12/18</p>

- `新增` [版本工具类 (Version)](https://autojs6.anzz.top/versionType) 文档
- `新增` [global.existsAll](https://autojs6.anzz.top/global#m-existsall) / [global.existsOne](https://autojs6.anzz.top/global#m-existsone) 文档

## v1.0.5

<p style="font: bold 0.8em sans-serif; color: #888888">2022/12/16</p>

- `新增` [global.cX](https://autojs6.anzz.top/global#m-cx) / [global.cY](https://autojs6.anzz.top/global#m-cy) 等相关文档

## v1.0.4

<p style="font: bold 0.8em sans-serif; color: #888888">2022/12/04</p>

- `新增` [global.exit(e)](https://autojs6.anzz.top/global#exite) 文档
- `新增` [Numberx.check](https://autojs6.anzz.top/numberx#m-check) 文档

## v1.0.3

<p style="font: bold 0.8em sans-serif; color: #888888">2022/12/02</p>

- `优化` App 文档去除右上角 Repo 区域防止遮挡文档内容
- `优化` [选择器](https://autojs6.anzz.top/uiSelectorType) 章节完善选择器行为相关内容
- `优化` 完善 [UiSelector#paste](https://autojs6.anzz.top/uiSelectorType#m-paste) 方法相关内容

## v1.0.2

<p style="font: bold 0.8em sans-serif; color: #888888">2022/12/01</p>

- `新增` 夜间模式主题适配
- `新增` [E4X](https://autojs6.anzz.top/e4x) / [术语](https://autojs6.anzz.top/glossaries) / [异常](https://autojs6.anzz.top/exceptions) / [数据类型](https://autojs6.anzz.top/dataTypes) / [选择器](https://autojs6.anzz.top/uiSelectorType) / [控件节点](https://autojs6.anzz.top/uiObjectType) / [控件集合](https://autojs6.anzz.top/uiObjectCollectionType) 等条目
- `修复` 章节标题可能显示不全的问题
- `修复` 代码区域滑动时导致页面滑动的问题
- `修复` App 文档无法跳转到其他章节的问题
- `优化` 重新部署文档结构并统一样式 (暂未全部完成)
- `优化` 完善 [脚本化 Java](https://autojs6.anzz.top/scriptingJava) 章节
- `优化` 支持 Java 等语言的语法高亮 (有限支持)
- `优化` 去除章节标题的锚点标记
- `优化` Web 文档封面适配夜间模式
