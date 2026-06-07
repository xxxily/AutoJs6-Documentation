# ZipNativeObject

ZipNativeObject 是 `zip.open`, `zipFile`, `zipDir`, `zipFiles`, `unzip` 等入口返回的 ZIP 操作对象.

源码依据:

- `app/src/main/java/org/autojs/autojs/runtime/api/augment/zip/Zip.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/zip/ZipNativeObject.kt`

常见相关方法或属性:

- [zip.open](zip#m-open)
- [zip.zipFile](zip#m-zipfile)
- [zip.zipDir](zip#m-zipdir)
- [zip.zipFiles](zip#m-zipfiles)
- [zip.unzip](zip#m-unzip)
- [ZipOptions](zipOptionsType)

---

<p style="font: bold 2em sans-serif; color: #FF7043">ZipNativeObject</p>

---

`ZipNativeObject` 构造时会解析 ZIP 路径、校验选项对象、创建底层 `net.lingala.zip4j.ZipFile`, 并构造 `zipParameters` / `unzipParameters`. 构造失败或压缩 / 解压入口操作失败时, 源码会尝试关闭底层 `ZipFile` 后再抛出异常.

## [p] name

- { [string](dataTypes#string) }

创建对象的操作名, 如 `open` / `zipFile` / `unzip`.

## [p] path

- { [string](dataTypes#string) }

ZIP 文件的运行时解析路径.

## [p] zipFile

- { [net.lingala.zip4j.ZipFile](https://javadoc.io/doc/net.lingala.zip4j/zip4j/latest/net/lingala/zip4j/ZipFile.html) }

底层 Zip4j 对象.

## [p] options

- { [object](dataTypes#object) }

原始选项对象. 空选项会被转换为空 JavaScript 对象.

## [p] zipParameters

- { [net.lingala.zip4j.model.ZipParameters](https://javadoc.io/doc/net.lingala.zip4j/zip4j/latest/net/lingala/zip4j/model/ZipParameters.html) }

由 [ZipOptions](zipOptionsType) 构造出的压缩参数.

## [p] unzipParameters

- { [net.lingala.zip4j.model.UnzipParameters](https://javadoc.io/doc/net.lingala.zip4j/zip4j/latest/net/lingala/zip4j/model/UnzipParameters.html) }

由 [ZipOptions](zipOptionsType) 构造出的解压参数.

## [m] addFile

### addFile(filePath, options?)

- **filePath** { [string](dataTypes#string) }
- **[ options ]** { [ZipOptions](zipOptionsType) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

添加文件到当前 ZIP.

## [m] addFiles

### addFiles(filePathList, options?)

- **filePathList** { [Iterable](dataTypes#iterable) }
- **[ options ]** { [ZipOptions](zipOptionsType) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

添加多个文件. `filePathList` 必须可迭代.

## [m] addFolder

### addFolder(filePath, options?)

- **filePath** { [string](dataTypes#string) }
- **[ options ]** { [ZipOptions](zipOptionsType) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

添加文件夹.

## [m] extractAll

### extractAll(destPath, options?)

- **destPath** { [string](dataTypes#string) }
- **[ options ]** { [ZipOptions](zipOptionsType) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

解压全部文件.

## [m] extractFile

### extractFile(zipFilePath, destPath, options?, newFileName?)

- **zipFilePath** { [string](dataTypes#string) } - ZIP 内部文件路径
- **destPath** { [string](dataTypes#string) } - 解压目标目录
- **[ options ]** { [ZipOptions](zipOptionsType) }
- **[ newFileName ]** { [string](dataTypes#string) } - 解压后的新文件名
- <ins>**returns**</ins> { [void](dataTypes#void) }

解压指定文件.

## [m] setPassword

### setPassword(password)

- **password** { [string](dataTypes#string) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

设置 ZIP 密码.

## [m] getFileHeader

### getFileHeader(fileName)

- **fileName** { [string](dataTypes#string) }
- <ins>**returns**</ins> { [net.lingala.zip4j.model.FileHeader](https://javadoc.io/doc/net.lingala.zip4j/zip4j/latest/net/lingala/zip4j/model/FileHeader.html) }

返回指定文件头.

## [m] getFileHeaders

### getFileHeaders()

- <ins>**returns**</ins> { [array](dataTypes#array) }

返回全部文件头数组.

## [m] isEncrypted

### isEncrypted()

- <ins>**returns**</ins> { [boolean](dataTypes#boolean) }

返回 ZIP 是否加密.

## [m] removeFile

### removeFile(fileName)

- **fileName** { [string](dataTypes#string) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

移除指定文件.

## [m] isValidZipFile

### isValidZipFile()

- <ins>**returns**</ins> { [boolean](dataTypes#boolean) }

返回是否为有效 ZIP 文件.

## [m] getPath

### getPath()

- <ins>**returns**</ins> { [string](dataTypes#string) }

返回 ZIP 路径.

## [m] getZipFile

### getZipFile()

- <ins>**returns**</ins> { [net.lingala.zip4j.ZipFile](https://javadoc.io/doc/net.lingala.zip4j/zip4j/latest/net/lingala/zip4j/ZipFile.html) }

返回底层 Zip4j 对象.

## 边界

- `rawPath` 不能为 `null` / `undefined` / 空白字符串.
- `options` 不是 JavaScript 对象时会抛出参数异常.
- `addFiles(filePathList, options?)` 要求 `filePathList` 可迭代.
- `extractFile(zipFilePath, destPath, options?, newFileName?)` 的 `zipFilePath` 是 ZIP 内部路径, 不是本地文件路径.

