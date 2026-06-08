# Permission Capability Matrix - 权限能力矩阵

本章节集中记录 AutoJs6 `6.7.0` 中对 Android 权限、系统服务、Root、Shizuku、无障碍或特定 Android 版本敏感的脚本能力.

源码基准:

- 上游仓库: `xxxily/AutoJs6`
- 基准提交: `ed3eb10e88db5a8425fd94bdddefa4176e5e1c94`
- 版本: `6.7.0`
- 主包 SDK: `minSdk=24`, `targetSdk=36`
- INRT 包 SDK: `targetSdk=29`

源码依据:

- `app/src/main/AndroidManifest.xml`
- `app/src/main/java/org/autojs/autojs/runtime/ScriptRuntime.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/*`
- `app/src/main/java/org/autojs/autojs/core/*`

机器可读数据:

- `json/runtimeApiIndexData.json`

---

## 能力矩阵

| 能力 | API / 模块 | 依赖 / 权限 | Android 版本边界 | 源码依据 | 文档入口 |
|------|------------|-------------|------------------|----------|----------|
| 无障碍服务 | `auto`, `automator`, `selector`, `UiObject`, `events.observeKey`, `events.observeToast`, `events.observeNotification` | 用户启用 AutoJs6 无障碍服务; 部分开关可借 root 或 `WRITE_SECURE_SETTINGS` 写入; 运行时通过 `AccessibilityBridge.ensureServiceStarted()` 获取服务 | 手势分发依赖 Android 无障碍能力; 部分 `UiObjectActions` 仅在较高 API 返回有效动作 | `augment/automator/Auto.kt`<br>`augment/automator/Automator.kt`<br>`core/accessibility/AccessibilityTool.kt`<br>`core/accessibility/AccessibilityServiceUsher.kt`<br>`core/automator/*` | [Automator](automator)<br>[UiSelector](uiSelectorType)<br>[UiObject](uiObjectType)<br>[Event](events) |
| 全局按键 / 手势 / 控件动作 | `click`, `longClick`, `press`, `swipe`, `gesture`, `back`, `home`, `recents`, `UiObject.click()` 等 | 优先依赖无障碍服务; `RootAutomator` 走 root / Shizuku 输入设备后端 | `Automator.captureScreen()` 使用无障碍截图时需 Android R / API 30+ | `augment/automator/Automator.kt`<br>`core/automator/UiObjectActions.kt`<br>`core/inputevent/RootAutomator.java` | [Automator](automator)<br>[UiObject](uiObjectType) |
| Root 输入与 Root shell | `new RootAutomator()`, `shell(cmd, true)`, `autojs.setRootMode(...)`, root 模式启动应用 | root 可用, 或 `RootAutomator` 可使用 Shizuku 后端; root shell 会执行特权命令 | 受设备 root 状态和系统 SELinux / shell 权限限制 | `augment/automator/RootAutomator.kt`<br>`augment/automator/RootAutomatorNativeObject.kt`<br>`augment/shell/Shell.kt`<br>`runtime/api/ProcessShell.java`<br>`util/RootUtils.java` | [Automator](automator)<br>[Shell](shell)<br>[AutoJs6](autojs) |
| Shizuku 命令与系统组件查询 | `shizuku.execCommand`, `shizuku.kill`, `shizuku.currentPackage`, `shizuku.currentActivity`, `shizuku.currentComponent` | Shizuku 安装、服务运行、已授权且 `WrappedShizuku.isOperational()` 为真; manifest 声明 `moe.shizuku.manager.permission.API_V23` | 依赖 Shizuku 服务可用性和用户授权, 不等同于 root | `augment/shizuku/Shizuku.kt`<br>`runtime/api/WrappedShizuku.kt`<br>`permission/ShizukuPermission.kt`<br>`core/shizuku/UserService.kt`<br>`AndroidManifest.xml` | [Shizuku](shizuku) |
| 当前前台包名 / Activity / Component | `currentPackage`, `currentActivity`, `currentComponent`, `app.currentPackage`, `shizuku.currentPackage` | 默认可走无障碍; 可选择 root / Shizuku 模式 | 受 Android 后台限制和可访问窗口信息影响 | `augment/global/Global.kt`<br>`augment/app/App.kt`<br>`augment/shizuku/Shizuku.kt` | [Global](global)<br>[App](app)<br>[Shizuku](shizuku) |
| 悬浮窗 | `floaty.window`, `floaty.rawWindow`, `floaty.hasPermission`, `floaty.ensurePermission`, `console.show`, `console.build` | `android.permission.SYSTEM_ALERT_WINDOW`; 用户允许 "显示在其他应用上层" | Android O+ 使用新的 overlay window type; 具体展示还受系统厂商限制 | `AndroidManifest.xml`<br>`augment/floaty/Floaty.kt`<br>`runtime/api/Floaty.kt`<br>`permission/DisplayOverOtherAppsPermission.kt`<br>`util/FloatingPermission.java`<br>`ui/enhancedfloaty/util/WindowTypeCompat.java` | [Floaty](floaty)<br>[Console](console) |
| 剪贴板读取 | `floaty.getClip`, 全局 `getClip` / `setClip` | Android Q / API 29+ 后台剪贴板限制下, 源码优先借助悬浮窗权限创建窗口后读取 | Android Q+ 对后台剪贴板读取更严格; 无悬浮窗权限时可能失败或返回空 | `augment/floaty/Floaty.kt`<br>`augment/global/Global.kt`<br>`runtime/api/Floaty.kt`<br>`com/stardust/util/ClipboardUtil.java` | [Floaty](floaty)<br>[Global](global) |
| 屏幕截图 / MediaProjection | `images.requestScreenCapture`, `images.requestScreenCaptureAsync`, `images.captureScreen`, 全局 `requestScreenCapture`, `captureScreen` | 用户授予 MediaProjection 截屏确认; 或系统 `appops PROJECT_MEDIA`; manifest 包含前台服务和 media projection 相关权限 | Android 10+ 涉及前台服务类型; Android 14+ 对 MediaProjection 前台服务和一次性授权更严格; AutoJs6 通过 `ScreenCaptureRequester` / `ScreenCapturer` 管理会话 | `augment/images/Images.kt`<br>`runtime/api/Images.java`<br>`core/image/capture/ScreenCaptureRequester.java`<br>`core/image/capture/ScreenCapturer.java`<br>`core/image/capture/ScreenCapturerForegroundService.kt`<br>`permission/MediaProjectionPermission.kt`<br>`AndroidManifest.xml` | [Image](image) |
| 无障碍截图 | `automator.captureScreen()` | 已启用无障碍服务 | 源码中 `takeScreenshot` / 无障碍截图依赖 Android R / API 30+ | `augment/automator/Automator.kt`<br>`core/accessibility/AccessibilityService.kt` | [Automator](automator) |
| 通知发布与通知渠道 | `notice(...)`, `notice.channel.*`, `notice.ensureEnabled`, `events.observeNotification` | 系统通知开关; Android 13+ 需要 `POST_NOTIFICATIONS`; 监听通知需通知监听服务或无障碍通知观察 | Android O / API 26+ 必须使用通知渠道; Android 13 / API 33+ 新增运行时通知权限 | `AndroidManifest.xml`<br>`augment/notice/Notice.kt`<br>`augment/notice/Channel.kt`<br>`runtime/api/Notice.kt`<br>`util/NotificationUtils.kt`<br>`core/notification/NotificationListenerService.kt`<br>`runtime/api/Events.java`<br>`core/accessibility/AccessibilityNotificationObserver.kt` | [Notice](notice)<br>[Event](events) |
| 系统设置写入 | `autojs.canModifySystemSettings`, `autojs.canWriteSecureSettings`, `device.setBrightness`, `device.setMusicVolume`, 指针位置相关能力 | `WRITE_SETTINGS` 需用户授权; `WRITE_SECURE_SETTINGS` 通常需 adb / root / 系统签名; manifest 已声明但不代表已授权 | Android M / API 23+ 对修改系统设置有专门授权页; secure settings 更受系统保护 | `AndroidManifest.xml`<br>`permission/WriteSystemSettingsPermission.kt`<br>`permission/WriteSecureSettingsPermission.kt`<br>`util/SettingsUtils.java`<br>`augment/autojs/Autojs.kt`<br>`runtime/api/Device.java`<br>`core/accessibility/AccessibilityTool.kt` | [AutoJs6](autojs)<br>[Device](device) |
| 文件 / 外部存储 | `files.*`, `sqlite.open`, `zip.*`, `http.saveToFile`, `mediainfo.read`, `images.read/save` | 文件路径访问、媒体读取、外部存储权限或 Android scoped storage 策略; manifest 声明 READ/WRITE/MANAGE_EXTERNAL_STORAGE 与 READ_MEDIA_* | Android 10+ scoped storage; Android 11+ `MANAGE_EXTERNAL_STORAGE`; Android 13+ 分媒体类型读取权限; manifest 设置 `requestLegacyExternalStorage=true` | `AndroidManifest.xml`<br>`augment/files/Files.kt`<br>`runtime/api/Files.kt`<br>`permission/AllFilesAccessPermission.kt`<br>`external/fileprovider/AppFileProvider.java`<br>`augment/sqlite/SQLite.kt`<br>`augment/zip/Zip.kt`<br>`augment/http/ResponseBodyNativeObject.kt`<br>`augment/mediainfo/Mediainfo.kt` | [File](files)<br>[SQLite](sqlite)<br>[Zip](zip)<br>[HTTP](http)<br>[MediaInfo](mediainfo) |
| 网络请求 / WebSocket / WebView 加载 | `http.*`, `web.newWebSocket`, `new WebSocket`, `web.loadUrl`, `images.load` URL | manifest 声明 `INTERNET`; 网络状态读取依赖 `ACCESS_NETWORK_STATE` / `ACCESS_WIFI_STATE` | `INTERNET` 不是运行时弹窗权限; 明文 HTTP 还受网络安全配置和 `usesCleartextTraffic=true` 影响 | `AndroidManifest.xml`<br>`augment/http/Http.kt`<br>`runtime/api/Http.kt`<br>`augment/web/Web.kt`<br>`augment/web/WebSocket.kt`<br>`core/web/WebSocket.kt`<br>`augment/images/Images.kt` | [HTTP](http)<br>[Web](web)<br>[WebSocket](webSocketType)<br>[Image](image) |
| OCR / 条码 / 二维码识别 | `ocr.mlkit`, `ocr.paddle`, `ocr.rapid`, `barcode`, `qrcode` | 传入图片时依赖图片文件 / bitmap; 不传图片而截图识别时依赖屏幕截图能力; Paddle 非 INRT 场景依赖插件或嵌入模型 | MLKit / Paddle / Rapid 各自依赖库可用性; 区域裁剪受图片坐标边界限制 | `augment/ocr/Ocr.kt`<br>`augment/ocr/OcrMLKit.kt`<br>`augment/ocr/OcrPaddle.kt`<br>`augment/ocr/OcrRapid.kt`<br>`runtime/api/OcrMLKit.kt`<br>`runtime/api/OcrRapid.kt`<br>`core/plugin/ocr/PaddleOcrPluginHost.kt`<br>`augment/barcode/Barcode.kt`<br>`augment/barcode/QrCode.kt`<br>`runtime/api/WrappedBarcode.kt` | [OCR](ocr)<br>[Barcode](barcode)<br>[QR Code](qrcode) |
| MediaInfo 原生库 | `mediainfo(path)`, `mediainfo.read(path)` | 本地媒体文件路径可访问; MediaInfo 原生库可用 | 原生库不可用会抛出 `MediaInfo library is not available`; stream 函数固定读取 index `0` | `augment/mediainfo/Mediainfo.kt`<br>`augment/mediainfo/MediainfoNativeObject.kt`<br>`org/mediainfo/android/MediaInfo.kt` | [MediaInfo](mediainfo)<br>[MediainfoNativeObject](mediainfoNativeObjectType) |
| 系统属性 | `sysprops.get`, `sysprops.list`, `sysprops.filter` | 普通属性可读; 受系统属性权限和 SELinux 限制; root / Shizuku 可提升命令读取能力但不是 `sysprops` 入口默认保证 | Android 版本和厂商系统会影响可见属性 | `augment/sysprops/Sysprops.kt` | [Sysprops](sysprops) |
| 定时任务 / 精确闹钟 / 开机广播 | `tasks.*` | manifest 声明 `USE_EXACT_ALARM`, `SCHEDULE_EXACT_ALARM`, `RECEIVE_BOOT_COMPLETED`; 用户系统策略可能限制精确闹钟和后台启动 | Android 12+ 精确闹钟权限策略更严格 | `AndroidManifest.xml`<br>`augment/tasks/Tasks.kt`<br>`core/database/TimedTaskManager` | [Task](tasks) |
| 应用安装 / 卸载 / 包查询 | `app.install`, `app.uninstall`, `app.getAppName`, `app.getPackageName`, `app.openAppSetting` | manifest 声明安装 / 删除包、查询全部包等权限; 部分操作需要用户确认或系统授权 | Android 11+ 包可见性受 `QUERY_ALL_PACKAGES` 和 package visibility 影响 | `AndroidManifest.xml`<br>`augment/app/App.kt`<br>`runtime/api/AppUtils.kt` | [App](app) |
| 震动 / 设备状态 | `device.vibrate`, `device.getBattery`, `device.getScreenWidth`, `device.keepScreenOn` | `VIBRATE`, `WAKE_LOCK`; 大多设备信息读取无需运行时权限 | 厂商系统可能限制后台保活与保持亮屏 | `AndroidManifest.xml`<br>`augment/device/Device.kt`<br>`runtime/api/Device.java` | [Device](device) |
| 传感器 | `sensors.register`, `sensors.on` | 设备硬件传感器可用; 某些传感器可能受系统隐私策略限制 | Android 版本和设备硬件决定可用传感器列表与采样频率 | `augment/sensors/Sensors.kt` | [Sensor](sensors) |
| 录音 / 录制 | `recorder.*` | manifest 声明 `RECORD_AUDIO`; 录音需用户运行时授权 | Android 6+ 危险权限需动态授权; 后台录音受系统策略限制 | `AndroidManifest.xml`<br>`augment/recorder/Recorder.kt` | [Recorder](recorder) |

## 使用建议

- 知识库回答权限问题时, 优先引用本矩阵和具体模块页面的 "源码依据" 小节.
- manifest 中存在的权限不代表脚本调用时已获得授权; 仍需结合运行时授权、系统开关和设备策略判断.
- Root / Shizuku / 无障碍是三种不同执行通道, 不能互相等价. API 文档若标注了其中之一, 应按实际源码路径回答.
