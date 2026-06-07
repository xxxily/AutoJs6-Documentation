# SQLite

`sqlite` 模块用于在脚本中打开和操作 SQLite 数据库文件.

> 源码依据: `runtime/api/augment/sqlite/SQLite.kt`, `runtime/api/SQLite.kt`, `core/database/Database.java`, `core/database/Transaction.kt`, `core/database/TransactionCallback.java`.

---

<p style="font: bold 2em sans-serif; color: #FF7043">sqlite</p>

---

## [@] sqlite

### sqlite(databaseFilePath, options?, callback?)

**`6.6.0`**

`sqlite(...)` 与 [sqlite.open(...)](#m-open) 等价.

## [m] open

### open(databaseFilePath, options?, callback?)

**`6.6.0`**

- **databaseFilePath** { [string](dataTypes#string) } - 数据库文件路径, 不可为空
- **[ options ]** {{
    - **version** { [number](dataTypes#number) } - 数据库版本, 默认 `1`
    - **readOnly** { [boolean](dataTypes#boolean) } - 是否以只读方式打开, 默认 `false`
- }}
- **[ callback ]** {{
    - **onCreate(database)** { [function](dataTypes#function) }
    - **onOpen(database)** { [function](dataTypes#function) }
    - **onUpgrade(database, oldVersion, newVersion)** { [function](dataTypes#function) }
    - **onCorruption(db)** { [function](dataTypes#function) }
- }}
- <ins>**returns**</ins> { [Database](databaseType) }

打开 SQLite 数据库. `databaseFilePath` 会经过 AutoJs6 运行时路径解析; `options` 必须是 JavaScript 对象, `callback` 会被转换为 `DatabaseCallback`.

```js
let db = sqlite.open('./data/demo.db', {
    version: 1,
});

db.execSQL('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, name TEXT)');
db.insert('user', { name: 'Alice' });
let row = db.rawQuery('SELECT * FROM user WHERE name = ?', [ 'Alice' ]).single();
console.log(row.name);
db.close();
```

---

<p style="font: bold 2em sans-serif; color: #FF7043">Database</p>

---

`Database` 是对 Android `SQLiteDatabase` 的脚本侧包装. 当前实现继承 `SQLiteOpenHelper`, 内部持有一个 `SQLiteDatabase` 实例, 并注册到脚本运行时的 `closeableManager`, 脚本结束时可被统一关闭.

写入对象会先转换为 `ContentValues`. 支持的值类型:

- `null` / `undefined` - 写入 SQL `NULL`
- `number` - 整数值写入 `Long`, 非整数写入 `Double`
- `boolean`
- `string`
- `byte[]`

其他类型会抛出 `Unsupported data type for key: ...`.

## [m] execSQL

### execSQL(sql)

- **sql** { [string](dataTypes#string) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

执行不返回结果集的 SQL.

### execSQL(sql, bindArgs)

- **sql** { [string](dataTypes#string) }
- **bindArgs** { [array](dataTypes#array) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

使用绑定参数执行 SQL.

## [m] rawQuery

### rawQuery(sql, selectionArgs)

- **sql** { [string](dataTypes#string) }
- **selectionArgs** { [string](dataTypes#string)[] }
- <ins>**returns**</ins> { [CursorWrapper](cursorWrapperType) }

执行原始查询并返回包装后的游标.

### rawQuery(sql, selectionArgs, cancellationSignal)

- **cancellationSignal** { [android.os.CancellationSignal](https://developer.android.com/reference/android/os/CancellationSignal) }
- <ins>**returns**</ins> { [CursorWrapper](cursorWrapperType) }

## [m] rawQueryWithFactory

### rawQueryWithFactory(cursorFactory, sql, selectionArgs, editTable)

### rawQueryWithFactory(cursorFactory, sql, selectionArgs, editTable, cancellationSignal)

参数含义与 Android `SQLiteDatabase.rawQueryWithFactory` 保持一致, 返回 [CursorWrapper](cursorWrapperType).

## [m] query

### query(table, columns, selection, selectionArgs, groupBy, having, orderBy)

### query(table, columns, selection, selectionArgs, groupBy, having, orderBy, limit)

### query(distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit)

### query(distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit, cancellationSignal)

- <ins>**returns**</ins> { [CursorWrapper](cursorWrapperType) }

查询表并返回包装后的游标. 参数含义与 Android `SQLiteDatabase.query` 保持一致.

## [m] queryWithFactory

### queryWithFactory(cursorFactory, distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit)

### queryWithFactory(cursorFactory, distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit, cancellationSignal)

- <ins>**returns**</ins> { [CursorWrapper](cursorWrapperType) }

## [m] insert

### insert(table, values)

- **table** { [string](dataTypes#string) }
- **values** { [object](dataTypes#object) }
- <ins>**returns**</ins> { [number](dataTypes#number) }

插入一行数据. `values` 会按上文规则转换为 `ContentValues`.

### insert(table, nullColumnHack, values)

- **nullColumnHack** { [string](dataTypes#string) | null }
- <ins>**returns**</ins> { [number](dataTypes#number) }

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

```js
let events = db.transaction(function (tx) {
    tx.database.insert('user', { name: 'Bob' });
});
events.on('commit', function () {
    console.log('committed');
});
```

## [m] beginTransaction

### beginTransaction()

## [m] beginTransactionNonExclusive

### beginTransactionNonExclusive()

## [m] beginTransactionWithListener

### beginTransactionWithListener(listener)

## [m] beginTransactionWithListenerNonExclusive

### beginTransactionWithListenerNonExclusive(listener)

## [m] endTransaction

### endTransaction()

## [m] setTransactionSuccessful

### setTransactionSuccessful()

## [m] inTransaction

### inTransaction()

- <ins>**returns**</ins> { [boolean](dataTypes#boolean) }

## [m] compileStatement

### compileStatement(sql)

- <ins>**returns**</ins> { [android.database.sqlite.SQLiteStatement](https://developer.android.com/reference/android/database/sqlite/SQLiteStatement) }

## [m] validateSql

### validateSql(sql, cancellationSignal)

## [m] close

### close()

关闭底层数据库连接, 并从运行时 `closeableManager` 中移除.

## [m] 状态与配置方法

当前 `Database` 还暴露以下 Android `SQLiteDatabase` 代理方法:

- `acquireReference()` / `releaseReference()`
- `disableWriteAheadLogging()` / `enableWriteAheadLogging()` / `isWriteAheadLoggingEnabled()`
- `getAttachedDbs()` / `getMaximumSize()` / `getPageSize()` / `getPath()` / `getVersion()`
- `isDatabaseIntegrityOk()` / `isDbLockedByCurrentThread()` / `isOpen()` / `isReadOnly()`
- `needUpgrade(newVersion)`
- `setForeignKeyConstraintsEnabled(enable)` / `setLocale(locale)` / `setMaxSqlCacheSize(cacheSize)`
- `setMaximumSize(numBytes)` / `setPageSize(numBytes)` / `setVersion(version)`
- `yieldIfContendedSafely()` / `yieldIfContendedSafely(sleepAfterYieldDelay)`

---

<p style="font: bold 2em sans-serif; color: #FF7043">CursorWrapper</p>

---

`CursorWrapper` 委托了 Android `Cursor` 的全部能力, 并额外提供更适合脚本使用的读取方法. 查询返回游标后, 调用方应主动 `close()`; `single()` 与默认的 `all()` 会自动关闭游标.

字段类型映射:

- `FIELD_TYPE_NULL` -> `null`
- `FIELD_TYPE_INTEGER` -> `Long`
- `FIELD_TYPE_FLOAT` -> `Double`
- `FIELD_TYPE_STRING` -> `String`
- `FIELD_TYPE_BLOB` -> `byte[]`

## [m] get

### get(index)

- **index** { [number](dataTypes#number) } - 列索引
- <ins>**returns**</ins> { * }

按列索引读取当前行字段.

## [m] getByColumn

### getByColumn(column)

- **column** { [string](dataTypes#string) } - 列名
- <ins>**returns**</ins> { * }

按列名读取当前行字段. 列不存在时会由 `getColumnIndexOrThrow` 抛出异常.

## [m] pick

### pick()

- <ins>**returns**</ins> { [object](dataTypes#object) }

将当前行转换为对象, 键为列名.

## [m] next

### next()

- <ins>**returns**</ins> { [object](dataTypes#object) | null }

移动到下一行并返回对象; 无下一行时返回 `null`. 此方法不会自动关闭游标.

## [m] single

### single()

- <ins>**returns**</ins> { [object](dataTypes#object) | null }

返回第一条记录并关闭游标.

## [m] all

### all(close?)

- **[ close = `true` ]** { [boolean](dataTypes#boolean) }
- <ins>**returns**</ins> { [array](dataTypes#array) }

从当前位置继续读取全部行. 默认读取后关闭游标; 传入 `false` 时保留游标打开状态.
