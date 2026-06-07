# CursorWrapper

CursorWrapper 是 `Database.rawQuery(...)`, `Database.query(...)` 等查询方法返回的游标包装对象.

源码依据:

- `app/src/main/java/org/autojs/autojs/runtime/api/SQLite.kt`
- `app/src/main/java/org/autojs/autojs/core/database/Database.java`

常见相关方法或属性:

- [Database.rawQuery](databaseType#m-rawquery)
- [Database.query](databaseType#m-query)

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

## 示例

```js
let cursor = db.rawQuery('SELECT id, name FROM user', []);
let rows = cursor.all(); // 默认关闭 cursor.

let one = db.rawQuery('SELECT id, name FROM user LIMIT 1', []).single();
console.log(one && one.name);
```

