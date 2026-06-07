# Zip

`zip` 模块用于创建、读取、解压和修改 ZIP 文件. 底层使用 Zip4j.

> 源码依据: `runtime/api/augment/zip/Zip.kt`, `runtime/api/augment/zip/ZipNativeObject.kt`.

---

<p style="font: bold 2em sans-serif; color: #FF7043">zip</p>

---

## [@] zip

### zip(zipPath)

**`6.7.0`**

`zip(zipPath)` 与 [zip.open(zipPath)](#m-open) 等价.

## [m] open

### open(zipPath, options?)

**`6.7.0`**

- **zipPath** { [string](dataTypes#string) } - ZIP 文件路径, 不可为空
- **[ options ]** { [ZipOptions](#zipoptions) }
- <ins>**returns**</ins> { [ZipNativeObject](#zipnativeobject) }

打开或创建一个 ZIP 操作对象. 路径会经过 AutoJs6 运行时路径解析.

## [m] zipFile

### zipFile(filePath, destZipPath, options?)

### zipFile(filePath, options)

**`6.7.0`**

- **filePath** { [string](dataTypes#string) }
- **destZipPath** { [string](dataTypes#string) } - 目标 ZIP 路径
- **[ options ]** { [ZipOptions](#zipoptions) }
- <ins>**returns**</ins> { [ZipNativeObject](#zipnativeobject) }

将单个文件加入 ZIP. 当前源码要求参数长度为 `2..3`; 第二个参数为对象时会被识别为 `options`, 目标 ZIP 默认使用源文件名去掉扩展名后追加 `.zip`.

```js
zip.zipFile('./logs/a.txt', './logs.zip');
zip.zipFile('./logs/a.txt', { password: 'secret' });
```

## [m] zipDir

### zipDir(filePath, destZipPath, options?)

### zipDir(filePath, options)

**`6.7.0`**

- **filePath** { [string](dataTypes#string) } - 目录路径
- **destZipPath** { [string](dataTypes#string) } - 目标 ZIP 路径
- **[ options ]** { [ZipOptions](#zipoptions) }
- <ins>**returns**</ins> { [ZipNativeObject](#zipnativeobject) }

将目录创建为 ZIP. 内部调用 `ZipFile.createSplitZipFileFromFolder(file, zipParameters, false, -1)`.

## [m] zipFiles

### zipFiles(filePathList, destZipPath, options?)

### zipFiles(filePathList, options)

**`6.7.0`**

- **filePathList** { [Iterable](dataTypes#iterable) } - 文件路径列表
- **destZipPath** { [string](dataTypes#string) } - 目标 ZIP 路径
- **[ options ]** { [ZipOptions](#zipoptions) }
- <ins>**returns**</ins> { [ZipNativeObject](#zipnativeobject) }

批量压缩文件. `filePathList` 必须可迭代, 且每个文件必须存在. 省略目标路径时:

- 仅一个文件: 使用该文件名去掉扩展名后追加 `.zip`
- 多个文件且来自同一目录: 使用该目录名追加 `.zip`
- 其他情况: 使用 `yyyyMMdd-HHmmss-XXXX.zip` 随机名

## [m] unzip

### unzip(zipPath, destPath, options?)

### unzip(zipPath, options)

**`6.7.0`**

- **zipPath** { [string](dataTypes#string) }
- **destPath** { [string](dataTypes#string) } - 解压目标目录
- **[ options ]** { [ZipOptions](#zipoptions) }
- <ins>**returns**</ins> { [ZipNativeObject](#zipnativeobject) }

解压 ZIP 到目标目录. 第二个参数为对象时会被识别为 `options`, `destPath` 按空字符串解析.

```js
zip.unzip('./logs.zip', './logs');
zip.unzip('./secret.zip', './out', { password: 'secret' });
```

---

<p style="font: bold 2em sans-serif; color: #FF7043">ZipNativeObject</p>

---

`ZipNativeObject` 是每次 `zip.open` / `zipFile` / `zipDir` / `zipFiles` / `unzip` 返回的操作对象. 构造失败或操作失败时, 内部会尝试关闭底层 `ZipFile` 后再抛出异常.

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

原始选项对象.

## [p] zipParameters

- { [net.lingala.zip4j.model.ZipParameters](https://javadoc.io/doc/net.lingala.zip4j/zip4j/latest/net/lingala/zip4j/model/ZipParameters.html) }

由 [ZipOptions](#zipoptions) 构造出的压缩参数.

## [p] unzipParameters

- { [net.lingala.zip4j.model.UnzipParameters](https://javadoc.io/doc/net.lingala.zip4j/zip4j/latest/net/lingala/zip4j/model/UnzipParameters.html) }

由 [ZipOptions](#zipoptions) 构造出的解压参数.

## [m] addFile

### addFile(filePath, options?)

- **filePath** { [string](dataTypes#string) }
- **[ options ]** { [ZipOptions](#zipoptions) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

添加文件到当前 ZIP.

## [m] addFiles

### addFiles(filePathList, options?)

- **filePathList** { [Iterable](dataTypes#iterable) }
- **[ options ]** { [ZipOptions](#zipoptions) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

添加多个文件. `filePathList` 必须可迭代.

## [m] addFolder

### addFolder(filePath, options?)

- **filePath** { [string](dataTypes#string) }
- **[ options ]** { [ZipOptions](#zipoptions) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

添加文件夹.

## [m] extractAll

### extractAll(destPath, options?)

- **destPath** { [string](dataTypes#string) }
- **[ options ]** { [ZipOptions](#zipoptions) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

解压全部文件.

## [m] extractFile

### extractFile(zipFilePath, destPath, options?, newFileName?)

- **zipFilePath** { [string](dataTypes#string) } - ZIP 内部文件路径
- **destPath** { [string](dataTypes#string) } - 解压目标目录
- **[ options ]** { [ZipOptions](#zipoptions) }
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

---

<p style="font: bold 2em sans-serif; color: #FF7043">ZipOptions</p>

---

`ZipOptions` 会被转换为 Zip4j 的 `ZipParameters` 和 `UnzipParameters`. 选项对象必须是 JavaScript 对象.

## 压缩选项

- **password** { [string](dataTypes#string) } - ZIP 密码. 设置后会调用 `zipFile.setPassword(...)`, 并自动将 `encryptFiles` 设为 `true`.
- **aesKeyStrength** { [number](dataTypes#number) | [string](dataTypes#string) } - 默认 `256`. 数字支持 `128` / `192` / `256`; 字符串支持 `128` / `192` / `256` 或 Zip4j 枚举名.
- **aesVersion** { [number](dataTypes#number) | [string](dataTypes#string) } - 默认 `2`. 支持 `1` / `2` 或 `ONE` / `TWO`.
- **compressionLevel** { [number](dataTypes#number) | [string](dataTypes#string) } - 默认 `NORMAL`. 数字按 Zip4j `CompressionLevel.level` 匹配; 字符串可使用去掉 `DEFLATE_LEVEL_` 前缀后的枚举名.
- **compressionMethod** { [number](dataTypes#number) | [string](dataTypes#string) } - 默认 `DEFLATE`. 数字按 Zip4j `CompressionMethod.code` 匹配; 字符串可使用去掉 `COMP_` 前缀后的枚举名.
- **encryptionMethod** { [number](dataTypes#number) | [string](dataTypes#string) } - 默认 `AES`. 数字支持 `-1` = `NONE`, `0` = `ZIP_STANDARD`, `1` = `ZIP_STANDARD_VARIANT_STRONG`, `99` = `AES`.
- **defaultFolderPath** { [string](dataTypes#string) }
- **entryCRC** { [number](dataTypes#number) }
- **entrySize** { [number](dataTypes#number) }
- **excludeFileFilter** { [function](dataTypes#function) | `ExcludeFileFilter` } - 返回 `true` 时排除文件.
- **fileComment** / **comment** { [string](dataTypes#string) }
- **fileNameInZip** { [string](dataTypes#string) }
- **isIncludeRootFolder** / **includeRootFolder** { [boolean](dataTypes#boolean) }
- **isOverrideExistingFilesInZip** / **overrideExistingFilesInZip** { [boolean](dataTypes#boolean) }
- **isReadHiddenFiles** / **readHiddenFiles** { [boolean](dataTypes#boolean) }
- **isReadHiddenFolders** / **readHiddenFolders** { [boolean](dataTypes#boolean) }
- **isUnixMode** / **unixMode** { [boolean](dataTypes#boolean) }
- **isWriteExtendedLocalFileHeader** / **writeExtendedLocalFileHeader** { [boolean](dataTypes#boolean) }
- **lastModifiedFileTime** { [number](dataTypes#number) }
- **rootFolderNameInZip** { [string](dataTypes#string) }
- **symbolicLinkAction** { [string](dataTypes#string) } - 默认 `INCLUDE_LINKED_FILE_ONLY`, 字符串必须能匹配 Zip4j `SymbolicLinkAction` 枚举.
- **isEncryptFiles** / **encryptFiles** { [boolean](dataTypes#boolean) }

## 解压选项

- **password** { [string](dataTypes#string) } - 解压加密 ZIP 时使用.
- **isExtractSymbolicLinks** { [boolean](dataTypes#boolean) } - 当前源码读取此项, 默认 `true`; 但没有写回 `UnzipParameters`, 行为以 Zip4j 默认值为准.

> 注: `ignoreDateTimeAttributes` / `isIgnoreDateTimeAttributes` 在当前 Zip4j 2.x 实现中不再支持. 传入这些选项会抛出异常.

## 示例

```js
let z = zip.zipFiles([
    './logs/a.txt',
    './logs/b.txt',
], './logs.zip', {
    password: 'secret',
    compressionLevel: 'MAXIMUM',
    aesKeyStrength: 256,
    includeRootFolder: false,
});

console.log(z.isEncrypted());
console.log(z.getFileHeaders().length);
```
