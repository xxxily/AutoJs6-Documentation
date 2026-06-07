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

打开或创建一个 ZIP 操作对象.

## [m] zipFile

### zipFile(filePath, destZipPath?, options?)

**`6.7.0`**

- **filePath** { [string](dataTypes#string) }
- **[ destZipPath ]** { [string](dataTypes#string) } - 目标 ZIP 路径; 省略时使用源文件名
- **[ options ]** { [ZipOptions](#zipoptions) }
- <ins>**returns**</ins> { [ZipNativeObject](#zipnativeobject) }

将单个文件加入 ZIP.

```js
zip.zipFile('./logs/a.txt', './logs.zip');
```

## [m] zipDir

### zipDir(filePath, destZipPath?, options?)

**`6.7.0`**

将目录加入 ZIP.

## [m] zipFiles

### zipFiles(filePathList, destZipPath?, options?)

**`6.7.0`**

- **filePathList** { [Iterable](dataTypes#iterable) } - 文件路径列表
- **[ destZipPath ]** { [string](dataTypes#string) }
- **[ options ]** { [ZipOptions](#zipoptions) }
- <ins>**returns**</ins> { [ZipNativeObject](#zipnativeobject) }

批量压缩文件. `filePathList` 必须可迭代, 且每个文件必须存在.

## [m] unzip

### unzip(zipPath, destPath?, options?)

**`6.7.0`**

解压 ZIP 到目标目录.

```js
zip.unzip('./logs.zip', './logs');
```

---

<p style="font: bold 2em sans-serif; color: #FF7043">ZipNativeObject</p>

---

## [p] path

- { [string](dataTypes#string) }

ZIP 文件的运行时解析路径.

## [p] zipFile

- { [net.lingala.zip4j.ZipFile](https://javadoc.io/doc/net.lingala.zip4j/zip4j/latest/net/lingala/zip4j/ZipFile.html) }

底层 Zip4j 对象.

## [m] addFile

### addFile(filePath, options?)

添加文件.

## [m] addFiles

### addFiles(filePathList, options?)

添加多个文件. `filePathList` 必须可迭代.

## [m] addFolder

### addFolder(filePath, options?)

添加文件夹.

## [m] extractAll

### extractAll(destPath, options?)

解压全部文件.

## [m] extractFile

### extractFile(zipFilePath, destPath, options?, newFileName?)

解压指定文件. `newFileName` 可用于指定解压后的新名称.

## [m] setPassword

### setPassword(password)

设置 ZIP 密码.

## [m] getFileHeader

### getFileHeader(fileName)

返回指定文件头.

## [m] getFileHeaders

### getFileHeaders()

返回全部文件头数组.

## [m] isEncrypted

### isEncrypted()

返回 ZIP 是否加密.

## [m] removeFile

### removeFile(fileName)

移除指定文件.

## [m] isValidZipFile

### isValidZipFile()

返回是否为有效 ZIP 文件.

## [m] getPath

### getPath()

返回 ZIP 路径.

## [m] getZipFile

### getZipFile()

返回底层 Zip4j 对象.

---

<p style="font: bold 2em sans-serif; color: #FF7043">ZipOptions</p>

---

常用选项:

- **password** { [string](dataTypes#string) } - ZIP 密码. 压缩时会自动启用加密.
- **aesKeyStrength** { [number](dataTypes#number) | [string](dataTypes#string) } - AES 强度, 支持 `128` / `192` / `256`.
- **aesVersion** { [number](dataTypes#number) | [string](dataTypes#string) } - AES 版本.
- **compressionLevel** { [number](dataTypes#number) | [string](dataTypes#string) } - 压缩等级.
- **compressionMethod** { [number](dataTypes#number) | [string](dataTypes#string) } - 压缩方式.
- **encryptionMethod** { [number](dataTypes#number) | [string](dataTypes#string) } - 加密方式.
- **defaultFolderPath** { [string](dataTypes#string) }
- **entryCRC** { [number](dataTypes#number) }
- **entrySize** { [number](dataTypes#number) }
- **excludeFileFilter** { [function](dataTypes#function) } - 返回 `true` 时排除文件.
- **fileComment** / **comment** { [string](dataTypes#string) }
- **fileNameInZip** { [string](dataTypes#string) }
- **includeRootFolder** { [boolean](dataTypes#boolean) }
- **overrideExistingFilesInZip** { [boolean](dataTypes#boolean) }
- **readHiddenFiles** { [boolean](dataTypes#boolean) }
- **readHiddenFolders** { [boolean](dataTypes#boolean) }
- **unixMode** { [boolean](dataTypes#boolean) }
- **writeExtendedLocalFileHeader** { [boolean](dataTypes#boolean) }
- **lastModifiedFileTime** { [number](dataTypes#number) }
- **rootFolderNameInZip** { [string](dataTypes#string) }
- **symbolicLinkAction** { [string](dataTypes#string) }

解压选项:

- **password** { [string](dataTypes#string) }
- **isExtractSymbolicLinks** { [boolean](dataTypes#boolean) }

> 注: `ignoreDateTimeAttributes` / `isIgnoreDateTimeAttributes` 在当前 Zip4j 2.x 实现中不再支持.
