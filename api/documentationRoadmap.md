# Documentation Roadmap - 文档更新推进清单

本章节用于承接后续文档更新工作. 后续 agent 应按本清单逐步推进, 只有完成源码对照、文档更新、生成验证后, 才能将对应条目标记为 `[x]`.

---

## 当前基准

| 项目 | 基准 |
|------|------|
| 上游源码仓库 | [SuperMonster003/AutoJs6](http://project.autojs6.com) |
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

### P1: 高价值既有页面源码校对

- [ ] [Global - 全局对象](global): 对照全局函数、全局类、legacy 兼容项.
- [ ] [Automator - 自动化](automator): 对照自动化动作、RootAutomator、无障碍桥接限制.
- [ ] [UiSelector - 选择器](uiSelectorType): 对照选择器方法、过滤条件、链式调用和兼容别名.
- [ ] [UiObject - 控件节点](uiObjectType): 对照控件属性、动作、查找方法和回收/刷新行为.
- [ ] [App - 通用应用](app): 对照 Intent、启动、卸载、应用信息、权限相关方法.
- [ ] [AutoJs6 - 本体应用](autojs): 对照版本、构建信息、项目/脚本入口能力.
- [ ] [Device - 设备](device): 对照设备信息、亮度、音量、电池、屏幕、剪贴板能力.
- [ ] [File - 文件](files): 对照路径解析、读写、移动复制、递归、编码和权限边界.
- [ ] [Engine - 引擎](engines): 对照脚本执行、引擎枚举、停止、事件与隔离行为.
- [ ] [Task - 任务](tasks): 对照定时任务、广播/Intent、持久化与 Android 版本限制.
- [ ] [UI - 用户界面](ui): 对照 UI DSL、组件、事件、线程要求和生命周期.
- [ ] [Floaty - 悬浮窗](floaty): 对照权限、窗口类型、坐标、关闭与 Android 版本限制.
- [ ] [Web - 万维网](web): 对照 WebView 注入、WebSocket、客户端配置.
- [ ] [OCR - 光学字符识别](ocr): 对照 MLKit / Paddle / Rapid OCR 能力、选项与模型限制.
- [ ] [Notice - 消息通知](notice): 对照通知渠道、构建器、权限和 Android 版本差异.
- [ ] [Console - 控制台](console): 对照日志、格式化、计时、悬浮控制台和构建选项.

### P2: 类型页与知识库结构化

- [ ] 为高频类型补齐独立页面: `ZipOptions`, `ZipNativeObject`, `Database`, `CursorWrapper`, `HttpSaveResult`, `JsMime`, `MediainfoNativeObject`.
- [ ] 为所有运行时注入模块建立机器可读索引: 模块名、版本、源码路径、方法名、参数、返回值、示例.
- [ ] 为所有页面补充 "源码依据" 小节, 便于知识库回答时回链权威来源.
- [ ] 为权限敏感能力补充 Android 版本、权限、Shizuku/Root/无障碍依赖.
- [ ] 清理旧 Auto.js 4.x 文档残留, 标记 AutoJs6 中已删除、替换或行为变化的 API.

---

## 覆盖矩阵

| 页面 | 当前状态 | 下一步 |
|------|----------|--------|
| [Documentation Audit](documentationAudit) | `[x]` 已新增 | 后续版本变更时更新基准 |
| [Documentation Roadmap](documentationRoadmap) | `[x]` 已新增 | 每轮更新后同步勾选状态 |
| [Cvt](cvt) | `[x]` P0 源码校对完成 | P2 机器可读索引 |
| [Fmt](fmt) | `[x]` P0 源码校对完成 | P2 机器可读索引 |
| [SQLite](sqlite) | `[x]` P0 源码校对完成 | P2 独立类型页 |
| [Zip](zip) | `[x]` P0 源码校对完成 | P2 独立类型页 |
| [MediaInfo](mediainfo) | `[x]` P0 源码校对完成 | P2 独立类型页 |
| [MIME](mime) | `[x]` P0 源码校对完成 | P2 独立类型页 |
| [NanoID](nanoid) | `[x]` 基础覆盖 | 增加随机源与参数边界说明 |
| [Sysprops](sysprops) | `[x]` 基础覆盖 | 增加权限与过滤说明 |
| [Pinyin](pinyin) | `[x]` P0 源码校对完成 | P2 机器可读索引 |
| [Pinyin4j](pinyin4j) | `[x]` P0 源码校对完成 | P2 机器可读索引 |
| [HTTP](http) | `[x]` P0 源码校对完成 | P2 机器可读索引 |
| [HttpRequestBuilderOptions](httpRequestBuilderOptionsType) | `[x]` P0 源码校对完成 | P2 机器可读索引 |
| [HttpResponse](httpResponseType) | `[x]` P0 源码校对完成 | P2 机器可读索引 |
| [HttpResponseBody](httpResponseBodyType) | `[x]` P0 源码校对完成 | P2 独立 `HttpSaveResult` 类型页 |
| [Global](global) | `[ ]` 待源码校对 | P1 |
| [Automator](automator) | `[ ]` 待源码校对 | P1 |
| [UiSelector](uiSelectorType) | `[ ]` 待源码校对 | P1 |
| [UiObject](uiObjectType) | `[ ]` 待源码校对 | P1 |
| [App](app) | `[ ]` 待源码校对 | P1 |
| [AutoJs6](autojs) | `[ ]` 待源码校对 | P1 |
| [Device](device) | `[ ]` 待源码校对 | P1 |
| [Files](files) | `[ ]` 待源码校对 | P1 |
| [Engines](engines) | `[ ]` 待源码校对 | P1 |
| [Tasks](tasks) | `[ ]` 待源码校对 | P1 |
| [UI](ui) | `[ ]` 待源码校对 | P1 |
| [Floaty](floaty) | `[ ]` 待源码校对 | P1 |
| [Web](web) | `[ ]` 待源码校对 | P1 |
| [OCR](ocr) | `[ ]` 待源码校对 | P1 |
| [Notice](notice) | `[ ]` 待源码校对 | P1 |
| [Console](console) | `[ ]` 待源码校对 | P1 |

---

## 残留风险

- [ ] `generator` 仍依赖 marked `0.3.19`; 安全版本 marked `4.0.10` 与当前 TOC 生成逻辑不兼容, 需要后续单独改造生成器兼容层.
- [ ] P0 页面已完成源码对照和边界补充, 但高频类型仍未全部拆成独立页面, 后续知识库结构化仍需 P2 推进.
- [ ] 仍有大量旧页面来自 Auto.js 4.x 文档, 后续必须逐页与 AutoJs6 源码核对.
