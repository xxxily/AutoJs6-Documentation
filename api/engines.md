# 引擎 (Engines)

engines 模块包含脚本引擎枚举、脚本执行、脚本停止和跨引擎事件通信相关函数.

## 6.7.0 源码校对

本页已按 AutoJs6 `6.7.0` (`ed3eb10e88db5a8425fd94bdddefa4176e5e1c94`) 对照以下源码路径校对:

- `app/src/main/java/org/autojs/autojs/runtime/ScriptRuntime.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/augment/engines/Engines.kt`
- `app/src/main/java/org/autojs/autojs/runtime/api/Engines.kt`
- `app/src/main/java/org/autojs/autojs/execution/ExecutionConfig.kt`
- `app/src/main/java/org/autojs/autojs/engine/JavaScriptEngine.java`

运行时中 `engines` 既是 `ScriptRuntime` 字段, 也由 augment 层补充同名模块函数. 当前公开入口包括 `all`, `myEngine`, `getEngines`, `stopAll`, `stopAllAndToast`, `execScript`, `execScriptFile`, `execAutoFile`.

`engines` 实现 `AsEmitter`, 因此模块对象本身具备事件发射能力. 当前引擎启动时, `ExecutionConfig.arguments` 会被转换为 `myEngine().execArgv`.

> 注: `execScript` / `execScriptFile` / `execAutoFile` 的 `config.path` 或 `config.workingDirectory` 在 `6.7.0` 源码中代表脚本工作目录, 不是旧文档里描述的 `require` 搜索路径数组.

---

<p style="font: bold 2em sans-serif; color: #FF7043">engines</p>

---

## [m] execScript

### execScript(name, script, config?)

- **name** {string} - 要运行的脚本名称, 用于任务显示和源码标识.
- **script** {string} - 要运行的脚本文本.
- **[ config ]** {Object} - 运行配置.
- <ins>**returns**</ins> { ScriptExecution }

在新的脚本环境中执行字符串脚本. 新环境中的全局变量与当前脚本不共享, 脚本会在新的线程中运行.

```js
engines.execScript('hello world', 'toast("hello world")');
```

`execScript` 内部使用 `StringScriptSource`, source prefix 为 `$engine/`.

## [m] execScriptFile

### execScriptFile(path, config?)

- **path** {string} - 要运行的脚本路径.
- **[ config ]** {Object} - 运行配置.
- <ins>**returns**</ins> { ScriptExecution }

在新的脚本环境中运行脚本文件.

```js
engines.execScriptFile('/sdcard/scripts/receiver.js');
```

源码会将 `path` 解析为非空运行时路径, 并使用 `JavaScriptFileSource` 执行.

## [m] execAutoFile

### execAutoFile(path, config?)

- **path** {string} - 要运行的录制文件路径.
- **[ config ]** {Object} - 运行配置.
- <ins>**returns**</ins> { ScriptExecution }

在新的脚本环境中运行录制文件.

```js
engines.execAutoFile('/sdcard/scripts/1.auto');
```

源码会将 `path` 解析为非空运行时路径, 并使用 `AutoFileSource` 执行.

## [p] config

`execScript`, `execScriptFile`, `execAutoFile` 的 `config` 可为空, 或为 `ExecutionConfig` / JavaScript 对象.

支持字段:

- `path` {string} - 工作目录, 会写入 `ExecutionConfig.workingDirectory`.
- `workingDirectory` {string} - 工作目录, 与 `path` 等价.
- `delay` {number} - 延迟执行毫秒数, 默认 `0`.
- `interval` {number} - 循环间隔毫秒数, 默认 `0`.
- `loopTimes` {number} - 循环次数, 默认 `1`, `0` 表示无限循环.
- `arguments` {Object} - 启动参数, 会写入新引擎的 `execArgv`.

非法 `config` 类型会抛出参数异常.

```js
let execution = engines.execScriptFile('./worker.js', {
    workingDirectory: files.cwd(),
    delay: 1000,
    arguments: {
        from: engines.myEngine().getSource().toString(),
    },
});
```

## [m] stopAll

### stopAll()

- <ins>**returns**</ins> { number }

停止所有正在运行的脚本, 包括当前脚本自身. 返回停止数量.

## [m] stopAllAndToast

### stopAllAndToast()

- <ins>**returns**</ins> { number }

停止所有正在运行的脚本并显示停止数量, 包括当前脚本自身.

## [m] myEngine

### myEngine()

- <ins>**returns**</ins> { JavaScriptEngine }

返回当前脚本引擎对象.

```js
log(engines.myEngine().cwd());
log(engines.myEngine().execArgv);
```

普通脚本的 `execArgv` 通常为空; 通过 `engines.execScript*` 传入 `config.arguments` 或由任务 / Intent 启动时, 可从 `execArgv` 读取参数.

## [m] all

### all()

- <ins>**returns**</ins> { ScriptEngine[] }

返回当前所有正在运行脚本的脚本引擎数组.

```js
log(engines.all());
```

## [m] getEngines

### getEngines()

- <ins>**returns**</ins> { Set&lt;ScriptEngine&gt; }

返回脚本引擎集合. 该方法直接透出运行时 `ScriptEngineService.engines` 集合.

## ScriptExecution

执行脚本时返回的对象, 可通过它获取执行引擎、运行配置, 或停止对应引擎.

### ScriptExecution.getEngine()

- <ins>**returns**</ins> { ScriptEngine }

返回执行该脚本的脚本引擎对象.

### ScriptExecution.getConfig()

- <ins>**returns**</ins> { ScriptConfig }

返回该脚本的运行配置.

## ScriptEngine

脚本引擎对象.

### ScriptEngine.forceStop()

停止脚本引擎执行.

### ScriptEngine.cwd()

- <ins>**returns**</ins> { string | null }

返回脚本执行目录. 对脚本文件通常为脚本所在目录; 对字符串脚本则取决于执行配置.

### ScriptEngine.getSource()

- <ins>**returns**</ins> { ScriptSource }

返回当前脚本引擎正在执行的脚本源对象.

### ScriptEngine.emit(eventName, ...args)

- **eventName** {string} - 事件名称.
- **...args** {any} - 事件参数.

向该脚本引擎发送事件. 目标脚本可通过 `events` 模块监听并在脚本主线程处理.

```js
/* receiver.js */
events.on('say', words => toastLog(words));
setInterval(() => {}, 1000);
```

```js
let execution = engines.execScriptFile('./receiver.js');
sleep(2000);
execution.getEngine().emit('say', 'hello');
```

## ScriptConfig

脚本执行配置. 对 `engines.execScript*` 入口而言, 当前源码支持 `delay`, `interval`, `loopTimes`, `workingDirectory` 和 `arguments` 等字段.
