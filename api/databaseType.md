# Database

Database 是 `sqlite.open(...)` 返回的 SQLite 数据库包装对象.

源码依据:

- `app/src/main/java/org/autojs/autojs/runtime/api/augment/sqlite/SQLite.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/SQLite.kt`
- `app/src/main/java/org/autojs/autojs/core/database/Database.java`
- `app/src/main/java/org/autojs/autojs/core/database/Transaction.kt`
- `app/src/main/java/org/autojs/autojs/core/database/TransactionCallback.java`

常见相关方法或属性:

- [sqlite.open](sqlite#m-open)
- [CursorWrapper](cursorWrapperType)

---

<p style="font: bold 2em sans-serif; color: #FF7043">Database</p>

---

`Database` 继承 Android `SQLiteOpenHelper`, 内部持有一个 `SQLiteDatabase` 实例, 并注册到脚本运行时 `closeableManager`. 脚本结束时可被统一关闭, 但长期运行脚本仍建议主动调用 `close()`.

写入对象会先转换为 `ContentValues`. 支持的值类型:

- `null` / `undefined` - 写入 SQL `NULL`
- `number` - 整数值写入 `Long`, 非整数写入 `Double`
- `boolean`
- `string`
- `byte[]`

其他类型会抛出 `Unsupported data type for key: ...`.

## [m] execSQL

### execSQL(sql)

### execSQL(sql, bindArgs)

- **sql** { [string](dataTypes#string) }
- **bindArgs** { [array](dataTypes#array) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

执行不返回结果集的 SQL.

## [m] rawQuery

### rawQuery(sql, selectionArgs)

### rawQuery(sql, selectionArgs, cancellationSignal)

- **sql** { [string](dataTypes#string) }
- **selectionArgs** { [string](dataTypes#string)[] }
- <ins>**returns**</ins> { [CursorWrapper](cursorWrapperType) }

执行原始查询并返回包装后的游标.

## [m] rawQueryWithFactory

### rawQueryWithFactory(cursorFactory, sql, selectionArgs, editTable)

### rawQueryWithFactory(cursorFactory, sql, selectionArgs, editTable, cancellationSignal)

- <ins>**returns**</ins> { [CursorWrapper](cursorWrapperType) }

参数含义与 Android `SQLiteDatabase.rawQueryWithFactory` 保持一致.

## [m] query

### query(table, columns, selection, selectionArgs, groupBy, having, orderBy)

### query(table, columns, selection, selectionArgs, groupBy, having, orderBy, limit)

### query(distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit)

### query(distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit, cancellationSignal)

- <ins>**returns**</ins> { [CursorWrapper](cursorWrapperType) }

查询表并返回包装后的游标.

## [m] queryWithFactory

### queryWithFactory(cursorFactory, distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit)

### queryWithFactory(cursorFactory, distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit, cancellationSignal)

- <ins>**returns**</ins> { [CursorWrapper](cursorWrapperType) }

## [m] insert

### insert(table, values)

### insert(table, nullColumnHack, values)

- **table** { [string](dataTypes#string) }
- **values** { [object](dataTypes#object) }
- <ins>**returns**</ins> { [number](dataTypes#number) }

插入一行数据. `values` 会按上文规则转换为 `ContentValues`.

## [m] insertOrThrow

### insertOrThrow(table, nullColumnHack, values)

- <ins>**returns**</ins> { [number](dataTypes#number) }

## [m] insertWithOnConflict

### insertWithOnConflict(table, nullColumnHack, initialValues, conflictAlgorithm)

- **conflictAlgorithm** { [number](dataTypes#number) } - Android `SQLiteDatabase.CONFLICT_*` 常量值
- <ins>**returns**</ins> { [number](dataTypes#number) }

## [m] replace

### replace(table, nullColumnHack, initialValues)

- <ins>**returns**</ins> { [number](dataTypes#number) }

## [m] replaceOrThrow

### replaceOrThrow(table, nullColumnHack, initialValues)

- <ins>**returns**</ins> { [number](dataTypes#number) }

## [m] update

### update(table, values, whereClause, whereArgs)

- **table** { [string](dataTypes#string) }
- **values** { [object](dataTypes#object) }
- **whereClause** { [string](dataTypes#string) | null }
- **whereArgs** { [string](dataTypes#string)[] | null }
- <ins>**returns**</ins> { [number](dataTypes#number) } - 受影响行数

## [m] updateWithOnConflict

### updateWithOnConflict(table, values, whereClause, whereArgs, conflictAlgorithm)

- <ins>**returns**</ins> { [number](dataTypes#number) }

## [m] delete

### delete(table, whereClause, whereArgs)

- **table** { [string](dataTypes#string) }
- **whereClause** { [string](dataTypes#string) | null }
- **whereArgs** { [string](dataTypes#string)[] | null }
- <ins>**returns**</ins> { [number](dataTypes#number) } - 删除行数

## [m] transaction

### transaction(transactionCallback, exclusive?)

- **transactionCallback** { [function](dataTypes#function) }
- **[ exclusive = `true` ]** { [boolean](dataTypes#boolean) }
- <ins>**returns**</ins> { [EventEmitter](eventEmitterType) }

同步执行事务并返回事件发射器. `transactionCallback` 会收到 `Transaction` 对象; 正常执行后内部调用 `transaction.succeed()`, 最终调用 `transaction.end()`.

事务事件:

- `begin` - 事务开始
- `commit` - 事务成功提交
- `rollback` - 事务回滚
- `end` - 事务结束
- `error` - 回调抛出异常时触发

## [m] close

### close()

关闭底层数据库连接, 并从运行时 `closeableManager` 中移除.

## 代理方法

当前 `Database` 还暴露以下 Android `SQLiteDatabase` 代理方法:

- `acquireReference()` / `releaseReference()`
- `beginTransaction()` / `beginTransactionNonExclusive()` / `beginTransactionWithListener(listener)` / `beginTransactionWithListenerNonExclusive(listener)`
- `endTransaction()` / `setTransactionSuccessful()` / `inTransaction()`
- `compileStatement(sql)` / `validateSql(sql, cancellationSignal)`
- `disableWriteAheadLogging()` / `enableWriteAheadLogging()` / `isWriteAheadLoggingEnabled()`
- `getAttachedDbs()` / `getMaximumSize()` / `getPageSize()` / `getPath()` / `getVersion()`
- `isDatabaseIntegrityOk()` / `isDbLockedByCurrentThread()` / `isOpen()` / `isReadOnly()`
- `needUpgrade(newVersion)`
- `setForeignKeyConstraintsEnabled(enable)` / `setLocale(locale)` / `setMaxSqlCacheSize(cacheSize)`
- `setMaximumSize(numBytes)` / `setPageSize(numBytes)` / `setVersion(version)`
- `yieldIfContendedSafely()` / `yieldIfContendedSafely(sleepAfterYieldDelay)`

