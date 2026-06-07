# SQLite

`sqlite` 模块用于在脚本中打开和操作 SQLite 数据库文件.

> 源码依据: `runtime/api/augment/sqlite/SQLite.kt`, `runtime/api/SQLite.kt`, `core/database/Database.java`.

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
- <ins>**returns**</ins> { [Database](#database) }

打开 SQLite 数据库. 路径会经过 AutoJs6 运行时文件路径解析.

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

## [m] execSQL

### execSQL(sql)

- **sql** { [string](dataTypes#string) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

执行不返回结果集的 SQL.

### execSQL(sql, bindArgs)

- **sql** { [string](dataTypes#string) }
- **bindArgs** { [array](dataTypes#array) }
- <ins>**returns**</ins> { [void](dataTypes#void) }

## [m] rawQuery

### rawQuery(sql, selectionArgs)

- **sql** { [string](dataTypes#string) }
- **selectionArgs** { [string](dataTypes#string)[] }
- <ins>**returns**</ins> { [CursorWrapper](#cursorwrapper) }

执行原始查询并返回包装后的游标.

## [m] query

### query(table, columns, selection, selectionArgs, groupBy, having, orderBy, limit?)

返回包装后的游标. 参数含义与 Android `SQLiteDatabase.query` 保持一致.

## [m] insert

### insert(table, values)

- **table** { [string](dataTypes#string) }
- **values** { [object](dataTypes#object) }
- <ins>**returns**</ins> { [number](dataTypes#number) }

插入一行数据. `values` 支持 `null` / `number` / `boolean` / `string` / `byte[]`; 其他类型会抛出异常.

### insert(table, nullColumnHack, values)

## [m] update

### update(table, values, whereClause, whereArgs)

## [m] delete

### delete(table, whereClause, whereArgs)

## [m] transaction

### transaction(transactionCallback, exclusive?)

- **transactionCallback** { [function](dataTypes#function) }
- **[ exclusive = `true` ]** { [boolean](dataTypes#boolean) }
- <ins>**returns**</ins> { [EventEmitter](eventEmitterType) }

执行事务并返回事件发射器. 事务过程中可能触发 `begin` / `commit` / `rollback` / `end` / `error` 事件.

## [m] close

### close()

关闭数据库连接.

---

<p style="font: bold 2em sans-serif; color: #FF7043">CursorWrapper</p>

---

## [m] get

### get(index)

按列索引读取当前行字段.

## [m] getByColumn

### getByColumn(column)

按列名读取当前行字段.

## [m] pick

### pick()

将当前行转换为对象.

## [m] next

### next()

移动到下一行并返回对象; 无下一行时返回 `null`.

## [m] single

### single()

返回第一条记录并关闭游标.

## [m] all

### all(close?)

- **[ close = `true` ]** { [boolean](dataTypes#boolean) }
- <ins>**returns**</ins> { [array](dataTypes#array) }

读取全部行. 默认读取后关闭游标.
