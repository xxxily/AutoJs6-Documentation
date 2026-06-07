<!--suppress HtmlDeprecatedAttribute, HttpUrlsUsage -->

<div align="center">
  <p>
    <img src="https://s1.imagehub.cc/images/2023/03/07/a611060ac75cf0d48edacff319cc1666.png" alt="autojs6-documentation-banner_800×208_transparent" border="0" width="660"/>
  </p>

  <p>AutoJs6 应用文档</p>

  <p>
    <a href="http://docs-project.autojs6.com/blob/master/project.json"><img alt="Version name" src="https://img.shields.io/badge/dynamic/json?color=1283C3&label=version&query=%24.versionName&url=https%3A%2F%2Fraw.githubusercontent.com%2FSuperMonster003%2FAutoJs6-Documentation%2Fmaster%2Fproject.json"/></a>
    <a href="http://docs-project.autojs6.com/issues"><img alt="GitHub closed issues" src="https://img.shields.io/github/issues/SuperMonster003/AutoJs6-Documentation?color=009688"/></a>
    <a href="http://docs-project.autojs6.com/commit/f7389a70ffc7bac4406cd0b19a1e6341d6e50238"><img alt="Created" src="https://img.shields.io/date/1657941168?color=2e7d32&label=created"/></a>
    <br>
    <a href="http://docs-project.autojs6.com/find/master"><img alt="GitHub Code Size" src="https://img.shields.io/github/languages/code-size/SuperMonster003/AutoJs6-Documentation?color=795548"/></a>
    <a href="http://docs-project.autojs6.com/blob/master/LICENSE"><img alt="GitHub License" src="https://img.shields.io/github/license/SuperMonster003/AutoJs6-Documentation?color=534BAE"/></a>
    <a href="https://www.jetbrains.com/?from=Ant-Forest"><img alt="JetBrains supporter" src="https://img.shields.io/badge/supporter-JetBrains-ee4677"/></a>
  </p>
</div>

******

### 简介

******

- [AutoJs6](http://project.autojs6.com) 应用文档
- 克隆 (Clone) 自 [hyb1996/AutoJs-Docs](https://github.com/hyb1996/AutoJs-Docs/)
- 模板 / 样式 / Generator 来自 [Node.js](https://github.com/nodejs/node/tree/master/doc/)

******

### 阅读

******

* [点此阅读 (网页版)](https://docs.autojs6.com)

******

### 说明

******

- 文档可能会随时更新
- 部分文档与实际代码行为可能存在出入
- 如有任何问题可在当前项目的 [议题 (Issues)](http://docs-project.autojs6.com/issues) 页面提交反馈
- 如需快速了解文档的常见问题, 可参阅 [疑难解答](https://docs.autojs6.com/#/qa) 章节

******

### 进度

******

- 基于 `Auto.js 4.1.0` 文档修改完善, [部署进度](https://docs.autojs6.com/#/progress) 可能相对缓慢

******

### 版本历史

******

[comment]: <> "Version history only shows last 3 versions"

## v1.2.0

<p style="font: bold 0.8em sans-serif; color: #888888">2026/06/07</p>

- `新增` [文档覆盖审计](https://docs.autojs6.com/#/documentationAudit) 页面, 记录文档与 AutoJs6 `6.7.0` 源码能力的差异基线
- `新增` [文档更新推进清单](https://docs.autojs6.com/#/documentationRoadmap) 页面, 记录已完成、待更新和后续 agent 验收规则
- `新增` [单位转换 (Cvt)](https://docs.autojs6.com/#/cvt) / [数据格式化 (Fmt)](https://docs.autojs6.com/#/fmt) / [SQLite](https://docs.autojs6.com/#/sqlite) / [Zip](https://docs.autojs6.com/#/zip) / [MediaInfo](https://docs.autojs6.com/#/mediainfo) 基础文档
- `新增` [MIME](https://docs.autojs6.com/#/mime) / [NanoID](https://docs.autojs6.com/#/nanoid) / [系统属性 (Sysprops)](https://docs.autojs6.com/#/sysprops) / [汉语拼音 (Pinyin)](https://docs.autojs6.com/#/pinyin) / [Pinyin4j](https://docs.autojs6.com/#/pinyin4j) 基础文档
- `优化` [HTTP](https://docs.autojs6.com/#/http) 章节补充 `6.7.0` 异步请求、PUT/DELETE/HEAD、响应体流式保存、请求缓存及不安全 TLS 选项说明
- `优化` 更新文档导航、全量文档与部署进度, 为后续知识库整理提供覆盖矩阵

## v1.1.8

<p style="font: bold 0.8em sans-serif; color: #888888">2023/12/01</p>

- `新增` [中文转换 (OpenCC)](https://docs.autojs6.com/#/opencc) 文档
- `新增` [OpenCCConversion](https://docs.autojs6.com/#/openCCConversionType) 类型
- `新增` [选择器](https://docs.autojs6.com/#/uiSelectorType) 章节增加 [plus](https://docs.autojs6.com/#/uiObjectType?id=m-plus) / [append](https://docs.autojs6.com/#/uiObjectType?id=m-append) 条目
- `新增` [控制台 (Console)](https://docs.autojs6.com/#/console) 章节增加 [setTouchable](https://docs.autojs6.com/#/console?id=m-settouchable) 条目
- `新增` [ConsoleBuildOptions](https://docs.autojs6.com/#/consoleBuildOptionsType) 章节增加 [touchable](https://docs.autojs6.com/#/consoleBuildOptionsType?id=p-touchable) 条目
- `优化` [光学字符识别 (OCR)](https://docs.autojs6.com/#/ocr) 章节增加 Paddle 工作模式使用提示
- `优化` 完善 [Shizuku](https://docs.autojs6.com/#/shizuku) 章节
- `优化` 完善 [选择器](https://docs.autojs6.com/#/uiSelectorType) 章节

## v1.1.7

<p style="font: bold 0.8em sans-serif; color: #888888">2023/10/30</p>

- `新增` [Shizuku](https://docs.autojs6.com/#/shizuku) 文档
- `新增` [WebSocket](https://docs.autojs6.com/#/websocketType) 文档
- `新增` [条码 (Barcode)](https://docs.autojs6.com/#/barcode) 文档
- `新增` [二维码 (QR Code)](https://docs.autojs6.com/#/qrcode) 文档
- `优化` 完善 [颜色 (Color)](https://docs.autojs6.com/#/color) 章节
- `优化` 完善 [光学字符识别 (OCR)](https://docs.autojs6.com/#/ocr) 章节

##### 更多版本历史可参阅

* [CHANGELOG.md](http://docs-project.autojs6.com/blob/master/api/changelog.md)
