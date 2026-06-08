# Documentation Roadmap - 文档更新推进清单

本章节用于承接后续文档更新工作. 后续 agent 应按本清单逐步推进, 只有完成源码对照、文档更新、生成验证后, 才能将对应条目标记为 `[x]`.

---

## 当前基准

| 项目 | 基准 |
|------|------|
| 上游源码仓库 | [xxxily/AutoJs6](https://github.com/xxxily/AutoJs6) |
| 源码基准提交 | `ed3eb10e88db5a8425fd94bdddefa4176e5e1c94` |
| 源码基准版本 | `6.7.0` |
| 文档仓库版本 | `1.2.0` |
| 推进清单创建日期 | `2026/06/07` |

> 若后续上游 AutoJs6 出现新提交或新版本, 应先更新本基准, 再继续校对.

---

## Agent 工作规则

- [ ] 更新前先确认上游源码版本, 不要只按旧文档或记忆补写.
- [ ] 每个页面必须回链到具体源码路径, 至少包含模块入口、主要方法、参数、返回值、关键限制.
- [ ] 涉及运行时注入对象时, 必须对照 `ScriptRuntime.kt` 的 `augment(...)` 注册情况.
- [ ] 涉及类型或选项时, 必须对照实现类、NativeObject 包装类、数据转换逻辑.
- [ ] 修改 `api/*.md` 后, 同步更新 `api/toc.md`, `api/sidebar.md`, `api/all.md`, `api/progress.md` 和必要的 `api/changelog.md`.
- [ ] 每轮完成后重新生成 `docs/*.html` 与 `json/*.json`.
- [ ] 每轮完成后运行空白检查与关键内容检索, 并记录残留风险.

验收命令参考:

```sh
cd ~/work/github/AutoJs6-Documentation/generator
rtk proxy env AUTOJS6_VERSION=6.7.0 /tmp/autojs6-doc-generator-venv/bin/python auto-generate.py
cd ..
rtk proxy git diff --check
rtk proxy rg -n "目标 API 名称|目标页面标题" api docs json
```

---

## 本轮已完成

- [x] 确认旧文档偏旧: 文档 `1.1.8` 停留在 `2023/12/01`, 上游源码已到 `6.7.0`.
- [x] 新增 [文档覆盖审计](documentationAudit), 记录旧文档与上游源码能力差异.
- [x] 新增 [Cvt - 单位转换](cvt) 基础页, 覆盖 `cvt.bytes` / `strict` / `loose`.
- [x] 新增 [Fmt - 数据格式化](fmt) 基础页, 覆盖 `fmt.bytes` / `strict` / `loose`.
- [x] 新增 [SQLite](sqlite) 基础页, 覆盖 `sqlite.open`, `Database`, `CursorWrapper` 的主要入口.
- [x] 新增 [Zip](zip) 基础页, 覆盖 `zip.open`, `zipFile`, `zipDir`, `zipFiles`, `unzip`, `ZipNativeObject`.
- [x] 新增 [MediaInfo - 媒体信息](mediainfo) 基础页, 覆盖 `mediainfo.read` 与动态媒体流信息读取.
- [x] 新增 [MIME](mime) 基础页, 覆盖 MIME 字符串解析结果.
- [x] 新增 [NanoID](nanoid) 基础页, 覆盖随机 ID 生成能力.
- [x] 新增 [Sysprops - 系统属性](sysprops) 基础页, 覆盖系统属性读取与过滤.
- [x] 新增 [Pinyin - 汉语拼音](pinyin) 基础页, 覆盖主要拼音转换入口.
- [x] 新增 [Pinyin4j - 汉语拼音](pinyin4j) 基础页, 覆盖 Pinyin4j 兼容入口.
- [x] 更新 [HTTP](http), 补充 `6.7.0` 异步请求、`HEAD` / `PUT` / `DELETE`, 响应体流式保存与请求选项.
- [x] 更新 [HttpRequestBuilderOptions](httpRequestBuilderOptionsType), 补充 `method`, `body`, `files`, `client`, `cacheBody`, `bodyCacheThresholdBytes`, `insecure` 等选项.
- [x] 更新 [HttpResponseBody](httpResponseBodyType), 补充 `stream`, `saveToFile`, `close`, `HttpSaveResult`.
- [x] 更新导航、全量文档、部署进度、更新日志和静态 HTML / JSON 输出.
- [x] 修复生成器版本来源与失败检查, 避免硬编码本地 Windows 路径和吞掉 Node 生成失败.
- [x] 将 `js-yaml` 升级到 `3.14.2`, 消除对应生成器依赖风险.
- [x] 新增 [Runtime API Index - 运行时 API 索引](runtimeApiIndex), 对照 `ScriptRuntime.kt` 记录所有运行时注入对象、`$` 别名、嵌套对象、源码路径和文档入口.
- [x] 新增 [Permission Capability Matrix - 权限能力矩阵](permissionCapabilityMatrix), 集中记录权限、Android 版本、Root/Shizuku/无障碍等敏感能力边界.
- [x] 新增机器可读运行时索引 `json/runtimeApiIndexData.json`, 供后续知识库构建直接读取模块、类型、权限和旧文档风险.
- [x] 将 `ZipOptions`, `ZipNativeObject`, `Database`, `CursorWrapper`, `HttpSaveResult`, `JsMime`, `MediainfoNativeObject` 拆为独立类型页并接入导航.

---

## 仍需优先补齐

### P0: 本轮新增基础页的完整化

- [x] [SQLite](sqlite): 已在现有页面补全 `Database` 主要方法, 校对 `insert`, `update`, `delete`, `transaction`, `rawQuery`, `query` 的完整签名、异常与示例.
- [x] [SQLite](sqlite): 已在现有页面补全 `CursorWrapper`, 校对游标生命周期、自动关闭行为和字段类型映射.
- [x] [Zip](zip): 已在现有页面补全 `ZipOptions`, `ZipNativeObject`, 校对 Zip4j 选项枚举、密码、加密、符号链接、覆盖写入行为.
- [x] [MediaInfo](mediainfo): 已补全 `MediainfoNativeObject` 动态属性、固定 stream 函数、字段解析、关闭释放边界和异常条件.
- [x] [MIME](mime): 已补全 `JsMime` 返回结构、扩展名推断边界、宽松 MIME 字符串处理与异常条件.
- [x] [HTTP](http): 已校对 `request`, `buildRequest`, `post`, `postJson`, `postMultipart`, 移除旧 Auto.js 4.x 过时说法.
- [x] [HTTP](http): 已在 [HttpResponseBody](httpResponseBodyType) 补充 `HttpSaveResult` 完整字段、成功/失败 code 与关闭行为.
- [x] [Pinyin](pinyin): 已对照 `PinyinCore.kt` 补齐选项、格式枚举、多音字、分词、姓氏模式和占位方法边界.
- [x] [Pinyin4j](pinyin4j): 已对照实现补齐兼容 API、格式参数、默认值、别名、返回结构和错误边界.
- [x] [Cvt](cvt) / [Fmt](fmt): 已补充字节单位转换边界、大小写、空格、非法输入、`AUTO` 和 `HALF_UP` 四舍五入规则.
- [x] [Global](global): 已补充 6.7.0 运行时注入依据、当前全局能力清单, 修正 `wait`, `cY`, `species` 过时说明.
- [x] [Automator](automator): 已补充 `auto` / `automator` / `RootAutomator` 当前入口、无障碍手势限制、Root/Shizuku 边界.
- [x] [UiSelector](uiSelectorType): 已补充选择器动态全局注入、`*Match` 新命名、阻塞查找 UI 线程限制.
- [x] [UiObject](uiObjectType): 已补充 `AccessibilityNodeInfoCompat` 包装关系、状态方法、行为方法和 deprecated 入口.
- [x] [App](app): 已补充 Intent、启动、双开、Root/Shizuku 启动、应用查询和文件操作入口.
- [x] [AutoJs6](autojs): 已补充版本、资源、方向、权限、Root 模式、重启/退出和 `autojs.version` 能力.
- [x] [Device](device): 已补充设备信息、屏幕、震动、网络、指针位置和系统权限边界.
- [x] [Files](files): 已补充路径解析、全局 `open`, 读写、移动复制、列表、大小格式化和存储权限边界.
- [x] [Engines](engines): 已重写占位页, 补充执行配置、`getEngines`, `execArgv`, 事件和 `ScriptExecution` / `ScriptEngine`.
- [x] [Tasks](tasks): 已重写占位页, 补充定时任务、广播任务、查询、删除、更新、`callback` / `async` 行为.
- [x] [UI](ui): 已补充 UI 模式解析、线程调度、布局、控件注册、状态栏 / 导航栏和 activity 要求.
- [x] [Floaty](floaty): 已补充悬浮窗权限、窗口类型、剪贴板读取、公开 Rhino 入口和窗口对象方法.
- [x] [Web](web): 已补充 WebView 注入、WebClient、WebSocket 当前构造行为, 移除 Auto.js 4.1.1 旧引用.
- [x] [OCR](ocr): 已补充 MLKit / Paddle / Rapid 三模式、参数分派、区域裁剪和 Paddle 插件 / INRT 边界.
- [x] [Notice](notice): 已补充通知重载、配置、渠道、Intent、优先级和 Android O+ 渠道差异.
- [x] [Console](console): 已补充日志、trace、assert、build、全局日志配置和 abandoned 输入 API 当前异常行为.

### P1: 高价值既有页面源码校对

- [x] [Global - 全局对象](global): 已对照全局函数、全局类、legacy 兼容项.
- [x] [Automator - 自动化](automator): 已对照自动化动作、RootAutomator、无障碍桥接限制.
- [x] [UiSelector - 选择器](uiSelectorType): 已对照选择器方法、过滤条件、链式调用和兼容别名.
- [x] [UiObject - 控件节点](uiObjectType): 已对照控件属性、动作、查找方法和回收/刷新行为.
- [x] [App - 通用应用](app): 已对照 Intent、启动、卸载、应用信息、权限相关方法.
- [x] [AutoJs6 - 本体应用](autojs): 已对照版本、构建信息、项目/脚本入口能力.
- [x] [Device - 设备](device): 已对照设备信息、亮度、音量、电池、屏幕、指针位置和权限边界.
- [x] [File - 文件](files): 已对照路径解析、读写、移动复制、递归、编码和权限边界.
- [x] [Engine - 引擎](engines): 已对照脚本执行、引擎枚举、停止、事件与隔离行为.
- [x] [Task - 任务](tasks): 已对照定时任务、广播/Intent、持久化与 Android 版本限制.
- [x] [UI - 用户界面](ui): 已对照 UI DSL、组件、事件、线程要求和生命周期.
- [x] [Floaty - 悬浮窗](floaty): 已对照权限、窗口类型、坐标、关闭与 Android 版本限制.
- [x] [Web - 万维网](web): 已对照 WebView 注入、WebSocket、客户端配置.
- [x] [OCR - 光学字符识别](ocr): 已对照 MLKit / Paddle / Rapid OCR 能力、选项与模型限制.
- [x] [Notice - 消息通知](notice): 已对照通知渠道、构建器、权限和 Android 版本差异.
- [x] [Console - 控制台](console): 已对照日志、格式化、计时、悬浮控制台和构建选项.

### P2: 类型页与知识库结构化

- [x] 为高频类型补齐独立页面: `ZipOptions`, `ZipNativeObject`, `Database`, `CursorWrapper`, `HttpSaveResult`, `JsMime`, `MediainfoNativeObject`.
- [x] 为所有运行时注入模块建立机器可读索引: 模块名、版本、源码路径、文档入口、方法摘要、关键类型和权限分类; 详细参数、返回值与示例继续回链到已校对页面.
- [x] 为 P0 / P1 / P2 已校对页面补充 "源码依据" 小节, 便于知识库回答时回链权威来源.
- [x] 为权限敏感能力补充 Android 版本、权限、Shizuku/Root/无障碍依赖.
- [x] 清理 P0 / P1 / P2 范围内旧 Auto.js 4.x 文档残留, 标记 AutoJs6 中已删除、替换或行为变化的 API; 未校对旧章节已在 [运行时 API 索引](runtimeApiIndex) 中标记为历史背景风险.

---

## 覆盖矩阵

| 页面 | 当前状态 | 下一步 |
|------|----------|--------|
| [Documentation Audit](documentationAudit) | `[x]` 已新增 | 后续版本变更时更新基准 |
| [Documentation Roadmap](documentationRoadmap) | `[x]` 已新增 | 每轮更新后同步勾选状态 |
| [Runtime API Index](runtimeApiIndex) | `[x]` P2 已新增 | 后续版本变更时重新对照 `ScriptRuntime.kt` |
| [Permission Capability Matrix](permissionCapabilityMatrix) | `[x]` P2 已新增 | 后续权限或 target SDK 变化时更新 |
| `json/runtimeApiIndexData.json` | `[x]` P2 已新增 | 后续知识库 ingest 前可直接消费 |
| [Cvt](cvt) | `[x]` P0 源码校对完成 | 已纳入 P2 机器可读索引 |
| [Fmt](fmt) | `[x]` P0 源码校对完成 | 已纳入 P2 机器可读索引 |
| [SQLite](sqlite) | `[x]` P0 源码校对完成 | 已拆分 [Database](databaseType) / [CursorWrapper](cursorWrapperType) |
| [Zip](zip) | `[x]` P0 源码校对完成 | 已拆分 [ZipOptions](zipOptionsType) / [ZipNativeObject](zipNativeObjectType) |
| [MediaInfo](mediainfo) | `[x]` P0 源码校对完成 | 已拆分 [MediainfoNativeObject](mediainfoNativeObjectType) |
| [MIME](mime) | `[x]` P0 源码校对完成 | 已拆分 [JsMime](jsMimeType) |
| [NanoID](nanoid) | `[x]` 基础覆盖 | 后续增加随机源与参数边界说明 |
| [Sysprops](sysprops) | `[x]` 基础覆盖 | 后续增加权限与过滤说明 |
| [Pinyin](pinyin) | `[x]` P0 源码校对完成 | 已纳入 P2 机器可读索引 |
| [Pinyin4j](pinyin4j) | `[x]` P0 源码校对完成 | 已纳入 P2 机器可读索引 |
| [HTTP](http) | `[x]` P0 源码校对完成 | 已纳入 P2 机器可读索引 |
| [HttpRequestBuilderOptions](httpRequestBuilderOptionsType) | `[x]` P0 源码校对完成 | 已纳入 P2 机器可读索引 |
| [HttpResponse](httpResponseType) | `[x]` P0 源码校对完成 | 已纳入 P2 机器可读索引 |
| [HttpResponseBody](httpResponseBodyType) | `[x]` P0 源码校对完成 | 已拆分 [HttpSaveResult](httpSaveResultType) |
| [Global](global) | `[x]` P1 源码校对完成 | 已纳入 P2 机器可读索引 |
| [Automator](automator) | `[x]` P1 源码校对完成 | 已纳入 P2 权限/动作矩阵 |
| [UiSelector](uiSelectorType) | `[x]` P1 源码校对完成 | 已纳入 P2 机器可读索引 |
| [UiObject](uiObjectType) | `[x]` P1 源码校对完成 | 已纳入 P2 机器可读索引 |
| [App](app) | `[x]` P1 源码校对完成 | 后续类型拆分候选: Intent 选项 |
| [AutoJs6](autojs) | `[x]` P1 源码校对完成 | 已纳入 P2 机器可读索引 |
| [Device](device) | `[x]` P1 源码校对完成 | 已纳入 P2 权限/Android 版本矩阵 |
| [Files](files) | `[x]` P1 源码校对完成 | 后续类型拆分候选: 文件对象 |
| [Engines](engines) | `[x]` P1 源码校对完成 | 后续类型拆分候选: `ExecutionConfig` |
| [Tasks](tasks) | `[x]` P1 源码校对完成 | 后续类型拆分候选: `TimedTask` / `IntentTask` |
| [UI](ui) | `[x]` P1 源码校对完成 | 后续专题索引候选: UI 组件 |
| [Floaty](floaty) | `[x]` P1 源码校对完成 | 后续类型拆分候选: 窗口对象 |
| [Web](web) | `[x]` P1 源码校对完成 | 已纳入 P2 机器可读索引与权限矩阵 |
| [OCR](ocr) | `[x]` P1 源码校对完成 | 已纳入 P2 机器可读索引与权限矩阵 |
| [Notice](notice) | `[x]` P1 源码校对完成 | 已纳入 P2 机器可读索引与权限矩阵 |
| [Console](console) | `[x]` P1 源码校对完成 | 已纳入 P2 机器可读索引与悬浮窗权限矩阵 |

---

## 残留风险

- [ ] `generator` 仍依赖 marked `0.3.19`; 安全版本 marked `4.0.10` 与当前 TOC 生成逻辑不兼容, 需要后续单独改造生成器兼容层.
- [ ] P2 已完成当前基准的运行时索引、权限矩阵和高频类型拆分; 但 `image`, `events`, `timers`, `shell`, `ui`, `modules`, `threads`, `media` 等旧章节仍需后续按源码逐页重写, 知识库回答当前行为时应优先引用 P0 / P1 / P2 已校对页面和源码索引.
