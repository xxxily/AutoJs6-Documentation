# ZipOptions

ZipOptions 是 `zip` 模块的压缩 / 解压选项对象, 会被转换为 Zip4j 的 `ZipParameters` 和 `UnzipParameters`.

源码依据:

- `app/src/main/java/org/autojs/autojs/runtime/api/augment/zip/Zip.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/zip/ZipNativeObject.kt`

常见相关方法或属性:

- [zip.open](zip#m-open)(zipPath, **options**)
- [zip.zipFile](zip#m-zipfile)(filePath, destZipPath, **options**)
- [zip.zipDir](zip#m-zipdir)(filePath, destZipPath, **options**)
- [zip.zipFiles](zip#m-zipfiles)(filePathList, destZipPath, **options**)
- [zip.unzip](zip#m-unzip)(zipPath, destPath, **options**)
- [ZipNativeObject.addFile](zipNativeObjectType#m-addfile)(filePath, **options**)
- [ZipNativeObject.extractAll](zipNativeObjectType#m-extractall)(destPath, **options**)

---

<p style="font: bold 2em sans-serif; color: #FF7043">ZipOptions</p>

---

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

## 异常与边界

- `options` 必须是 JavaScript 对象; `null` / `undefined` 会按空对象处理.
- `excludeFileFilter` 只能是 Zip4j `ExcludeFileFilter` 或 JavaScript 函数; 其他值会抛出参数异常.
- `aesKeyStrength`, `compressionLevel`, `compressionMethod`, `encryptionMethod`, `symbolicLinkAction` 等枚举字段传入非法值时会抛出异常.
- `ignoreDateTimeAttributes` / `isIgnoreDateTimeAttributes` 在当前 Zip4j 2.x 实现中不再支持. 传入这些选项会抛出异常.

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
```

