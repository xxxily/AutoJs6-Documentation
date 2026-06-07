# 任务 (Tasks)

tasks 模块用于创建、查询、更新和移除 AutoJs6 的定时任务与广播任务.

## 6.7.0 源码校对

本页已按 AutoJs6 `6.7.0` (`ed3eb10e88db5a8425fd94bdddefa4176e5e1c94`) 对照以下源码路径校对:

- `app/src/main/java/org/autojs/autojs/runtime/ScriptRuntime.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/tasks/Tasks.kt`
- `app/src/main/java/org/autojs/autojs/timing/TimedTask.java`
- `app/src/main/java/org/autojs/autojs/timing/IntentTask.java`

运行时中 `tasks` 由 `ScriptRuntime.augment(...)` 注入为全局对象. 当前公开入口包括 `addTask`, `addDailyTask`, `addWeeklyTask`, `addDisposableTask`, `addIntentTask`, `getTimedTask`, `getIntentTask`, `removeTask`, `removeTimedTask`, `removeIntentTask`, `updateTask`, `queryTimedTasks`, `queryIntentTasks`, `timeFlagToDays`, `daysToTimeFlag`.

新增任务的 `options.path` 是必填脚本路径, 会转换为运行时路径. 定时任务的 `time` 优先于 `date`, 空值默认当前时间; 可接受毫秒数、JavaScript `Date` 或字符串. 任务配置项 `delay`, `interval`, `loopTimes` 默认分别为 `0`, `0`, `1`.

若 `options.callback` 存在, 必须是函数; 当 `async` / `isAsync` 为真或当前处于 UI 线程时, 源码会用 `Threads.start(...)` 异步执行回调, 否则同步返回任务或回调结果.

---

<p style="font: bold 2em sans-serif; color: #FF7043">tasks</p>

---

## [m] addTask

### addTask(task)

- **task** { TimedTask | IntentTask } - 待加入任务管理器的任务对象
- <ins>**returns**</ins> { TimedTask | IntentTask }

加入一个已构造的定时任务或广播任务.

传入非 `TimedTask` / `IntentTask` 对象时, 源码会抛出参数异常. 常规脚本更推荐使用 [addDailyTask](#m-adddailytask), [addWeeklyTask](#m-addweeklytask), [addDisposableTask](#m-adddisposabletask) 或 [addIntentTask](#m-addintenttask) 由模块创建任务.

## [m] addDailyTask

### addDailyTask(options?)

- **[ options ]** { Object } - 每日任务选项
- <ins>**returns**</ins> { TimedTask | any | Thread }

新增每日定时任务.

常用选项:

- `path` {string} - 必填, 要执行的脚本路径.
- `time` {number | Date | string} - 触发时间; 字符串按本地时间格式解析.
- `date` {number | Date | string} - `time` 为空时使用的备用时间.
- `delay` {number} - 延迟执行毫秒数, 默认 `0`.
- `interval` {number} - 循环间隔毫秒数, 默认 `0`.
- `loopTimes` {number} - 循环次数, 默认 `1`.
- `callback` {Function} - 任务加入后的回调.
- `async` / `isAsync` {boolean} - 是否异步执行回调.

```js
tasks.addDailyTask({
    path: './daily.js',
    time: '08:30',
});
```

## [m] addWeeklyTask

### addWeeklyTask(options?)

- **[ options ]** { Object } - 每周任务选项
- <ins>**returns**</ins> { TimedTask | any | Thread }

新增每周定时任务.

除 [addDailyTask](#m-adddailytask) 的通用选项外, 支持:

- `daysOfWeek` {Array | any} - 星期集合, 为空时默认今天.

`daysOfWeek` 的元素可使用英文全称或缩写, 中文星期名, 或数字 `0..7`. 其中源码按 `LocalDate.now().dayOfWeek.value % 7` 处理默认值; 非法星期值会抛出 `Unknown day` 异常.

```js
tasks.addWeeklyTask({
    path: './weekly.js',
    time: '20:00',
    daysOfWeek: [ 'mon', '三', 5 ],
});
```

## [m] addDisposableTask

### addDisposableTask(options?)

- **[ options ]** { Object } - 一次性任务选项
- <ins>**returns**</ins> { TimedTask | any | Thread }

新增一次性定时任务.

`path`, `time` / `date`, `delay`, `interval`, `loopTimes`, `callback`, `async` / `isAsync` 的处理规则与 [addDailyTask](#m-adddailytask) 一致.

```js
tasks.addDisposableTask({
    path: './once.js',
    date: new Date(Date.now() + 60e3),
});
```

## [m] addIntentTask

### addIntentTask(options?)

- **[ options ]** { Object } - 广播任务选项
- <ins>**returns**</ins> { IntentTask | any | Thread }

新增通过 Intent / Broadcast 触发的任务.

常用选项:

- `path` {string} - 必填, 要执行的脚本路径.
- `action` {string} - 广播 action.
- `dataType` {string} - Intent data type.
- `isLocal` / `local` {boolean} - 是否使用本地广播.
- `callback` {Function} - 任务加入后的回调.
- `async` / `isAsync` {boolean} - 是否异步执行回调.

当 `action` 为 AutoJs6 启动广播 action 时, 源码会先默认 `isLocal = true`, 但最终仍可被 `local` / `isLocal` 选项覆盖.

`IntentTask` 实体包含 `category` 字段, 但 `addIntentTask(options)` 当前源码没有从 `options` 读取 `category`.

## [m] getTimedTask

### getTimedTask(id)

- **id** {number} - 定时任务 ID
- <ins>**returns**</ins> { TimedTask | null }

按 ID 查询定时任务. 未找到时返回 `null`.

## [m] getIntentTask

### getIntentTask(id)

- **id** {number} - 广播任务 ID
- <ins>**returns**</ins> { IntentTask | null }

按 ID 查询广播任务. 未找到时返回 `null`.

## [m] removeTask

### removeTask(task)

- **task** { TimedTask | IntentTask } - 要移除的任务对象
- <ins>**returns**</ins> { boolean }

移除指定任务对象.

## [m] removeTimedTask

### removeTimedTask(id)

- **id** {number} - 定时任务 ID
- <ins>**returns**</ins> { boolean }

按 ID 移除定时任务.

## [m] removeIntentTask

### removeIntentTask(id)

- **id** {number} - 广播任务 ID
- <ins>**returns**</ins> { boolean }

按 ID 移除广播任务.

## [m] updateTask

### updateTask(task)

- **task** { TimedTask | IntentTask } - 要更新的任务对象
- <ins>**returns**</ins> { boolean }

更新已存在的任务.

## [m] queryTimedTasks

### queryTimedTasks(options?)

- **[ options ]** { Object } - 查询过滤选项
- <ins>**returns**</ins> { TimedTask[] }

查询定时任务列表.

支持过滤:

- `path` {string} - 脚本路径.

## [m] queryIntentTasks

### queryIntentTasks(options?)

- **[ options ]** { Object } - 查询过滤选项
- <ins>**returns**</ins> { IntentTask[] }

查询广播任务列表.

支持过滤:

- `path` {string} - 脚本路径.
- `action` {string} - 广播 action.

## [m] timeFlagToDays

### timeFlagToDays(flag)

- **flag** {number} - 星期位标记
- <ins>**returns**</ins> { number[] }

将星期位标记转换为星期数组.

## [m] daysToTimeFlag

### daysToTimeFlag(days)

- **days** {Array} - 星期数组
- <ins>**returns**</ins> { number }

将星期数组转换为星期位标记. 星期值解析规则与 [addWeeklyTask](#m-addweeklytask) 的 `daysOfWeek` 一致.

## TimedTask

`TimedTask` 是定时任务实体. 源码字段 / 访问器包括 `id`, `millis`, `timeFlag`, `scheduled`, `delay`, `interval`, `loopTimes`, `scriptPath`; `getNextTime()` 返回下一次触发时间对应的毫秒数.

## IntentTask

`IntentTask` 是广播任务实体. 源码字段 / 访问器包括 `scriptPath`, `action`, `category`, `dataType`, `local`.
