# MediaInfo - 媒体信息

`mediainfo` 模块用于读取媒体文件的元信息.

> 源码依据: `runtime/api/augment/mediainfo/Mediainfo.kt`, `runtime/api/augment/mediainfo/MediainfoNativeObject.kt`.

---

<p style="font: bold 2em sans-serif; color: #FF7043">mediainfo</p>

---

## [@] mediainfo

### mediainfo(path)

**`6.7.0`**

`mediainfo(path)` 与 [mediainfo.read(path)](#m-read) 等价.

## [m] read

### read(path)

**`6.7.0`**

- **path** { [string](dataTypes#string) } - 媒体文件路径, 不可为空
- <ins>**returns**</ins> { [MediainfoNativeObject](#mediainfonativeobject) }

读取媒体文件信息.

```js
let info = mediainfo.read('./video.mp4');
console.log(info.inform);
console.log(info.general('Format'));
console.log(info.video('Width'));
```

---

<p style="font: bold 2em sans-serif; color: #FF7043">MediainfoNativeObject</p>

---

## [p] path

- { [string](dataTypes#string) }

运行时解析后的媒体文件路径.

## [p] inform

- { [string](dataTypes#string) }

MediaInfo 输出的原始文本.

## [m] general

### general(parameter?)

读取 General 流信息. `parameter` 为空时返回该流的默认信息.

## [m] video

### video(parameter?)

读取 Video 流信息.

## [m] audio

### audio(parameter?)

读取 Audio 流信息.

## 其他流类型

模块会根据 `MediaInfo.StreamKind` 枚举动态创建同名小写函数, 因此除 `general` / `video` / `audio` 外, 还可能存在 `text` / `image` / `menu` 等函数, 具体取决于底层 MediaInfo 库.

## 动态属性

模块会解析 `inform` 文本, 将各节转换为小写分组属性, 并将字段名称转换为 camelCase. 例如 `Overall bit rate` 可能被转换为 `overallBitRate`.
