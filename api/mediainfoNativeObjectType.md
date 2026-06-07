# MediainfoNativeObject

MediainfoNativeObject 是 `mediainfo(path)` / `mediainfo.read(path)` 返回的媒体信息对象.

源码依据:

- `app/src/main/java/org/autojs/autojs/runtime/api/augment/mediainfo/Mediainfo.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/mediainfo/MediainfoNativeObject.kt`
- `app/src/main/java/org/mediainfo/android/MediaInfo.kt`

常见相关方法或属性:

- [mediainfo.read](mediainfo#m-read)(path)

---

<p style="font: bold 2em sans-serif; color: #FF7043">MediainfoNativeObject</p>

---

`MediainfoNativeObject` 构造时会读取一次 MediaInfo 输出文本, 并把文本解析为可访问的对象属性. 当前对象没有显式 `close()` 方法; 底层读取由 `scriptRuntime.mediaInfo` 完成.

## [p] path

- { [string](dataTypes#string) }

运行时解析后的媒体文件路径.

## [p] inform

- { [string](dataTypes#string) }

MediaInfo 输出的原始文本. 动态属性解析也来自这段文本.

## [m] general

### general(parameter?)

- **[ parameter = `""` ]** { [string](dataTypes#string) }
- <ins>**returns**</ins> { [string](dataTypes#string) }

读取 `GENERAL` 流第 `0` 个流的字段. `parameter` 为空时返回该流的默认信息.

## [m] video

### video(parameter?)

- **[ parameter = `""` ]** { [string](dataTypes#string) }
- <ins>**returns**</ins> { [string](dataTypes#string) }

读取 `VIDEO` 流第 `0` 个流的字段.

## [m] audio

### audio(parameter?)

- **[ parameter = `""` ]** { [string](dataTypes#string) }
- <ins>**returns**</ins> { [string](dataTypes#string) }

读取 `AUDIO` 流第 `0` 个流的字段.

## [m] text

### text(parameter?)

读取 `TEXT` 流第 `0` 个流的字段.

## [m] other

### other(parameter?)

读取 `OTHER` 流第 `0` 个流的字段.

## [m] image

### image(parameter?)

读取 `IMAGE` 流第 `0` 个流的字段.

## [m] menu

### menu(parameter?)

读取 `MENU` 流第 `0` 个流的字段.

## [m] max

### max(parameter?)

底层 `MediaInfo.StreamKind.MAX` 也会按枚举动态暴露为函数. 一般脚本不需要直接使用.

## 动态分组属性

`inform` 文本会按 section 解析为对象属性:

- section 标题会转为小写属性名, 例如 `General` -> `info.general`.
- 字段名会转为 camelCase, 非字母数字分隔符会被移除, 例如 `Overall bit rate` -> `overallBitRate`.
- 只解析包含冒号的行; 不含冒号的非空行会被视为新的 section.
- 解析后的字段值均为字符串.

## 异常与限制

- `path` 不能为 `null` / `undefined` / 空白字符串.
- MediaInfo 原生库不可用时, 底层 `MediaInfo` 会抛出 `MediaInfo library is not available`.
- 各 stream 函数固定读取第 `0` 个流; 当前脚本包装层没有暴露 stream index 参数.
- 字段名称必须使用底层 MediaInfo 识别的参数名, 如 `Width` / `Format` / `Duration`.
- 动态属性名可能与 `general()` / `video()` 等动态函数同名. 依赖完整媒体字段时, 建议优先使用 `info.video('Width')` 这类函数形式.

