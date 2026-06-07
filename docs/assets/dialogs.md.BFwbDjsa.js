import{_ as a,o as n,c as e,a2 as p}from"./chunks/framework.BZO4qERu.js";const q=JSON.parse('{"title":"对话框 (Dialogs)","description":"","frontmatter":{},"headers":[],"relativePath":"dialogs.md","filePath":"dialogs.md","lastUpdated":1669882888000}'),i={name:"dialogs.md"};function t(l,s,o,c,d,u){return n(),e("div",null,[...s[0]||(s[0]=[p(`<h1 id="对话框-dialogs" tabindex="-1">对话框 (Dialogs)</h1><hr><p style="font:italic 1em sans-serif;color:#78909C;">此章节待补充或完善...</p><p style="font:italic 1em sans-serif;color:#78909C;">Marked by SuperMonster003 on Oct 22, 2022.</p><hr><p>dialogs 模块提供了简单的对话框支持, 可以通过对话框和用户进行交互. 最简单的例子如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>alert(&quot;您好&quot;);</span></span></code></pre></div><p>这段代码会弹出一个消息提示框显示&quot;您好&quot;, 并在用户点击&quot;确定&quot;后继续运行. 稍微复杂一点的例子如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var clear = confirm(&quot;要清除所有缓存吗?&quot;);</span></span>
<span class="line"><span>if(clear){</span></span>
<span class="line"><span>    alert(&quot;清除成功!&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>confirm()</code>会弹出一个对话框并让用户选择&quot;是&quot;或&quot;否&quot;, 如果选择&quot;是&quot;则返回true.</p><p>需要特别注意的是, 对话框在ui模式下不能像通常那样使用, 应该使用回调函数或者<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/" target="_blank" rel="noreferrer">Promise</a>的形式. 理解这一点可能稍有困难. 举个例子:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ui&quot;;</span></span>
<span class="line"><span>//回调形式</span></span>
<span class="line"><span> confirm(&quot;要清除所有缓存吗?&quot;, function(clear){</span></span>
<span class="line"><span>     if(clear){</span></span>
<span class="line"><span>          alert(&quot;清除成功!&quot;);</span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span> });</span></span>
<span class="line"><span>//Promise形式</span></span>
<span class="line"><span>confirm(&quot;要清除所有缓存吗?&quot;)</span></span>
<span class="line"><span>    .then(clear =&gt; {</span></span>
<span class="line"><span>        if(clear){</span></span>
<span class="line"><span>          alert(&quot;清除成功!&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span></code></pre></div><h2 id="dialogs-alert-title-content-callback" tabindex="-1">dialogs.alert(title[, content, callback])</h2><ul><li><code>title</code> {string} 对话框的标题.</li><li><code>content</code> {string} 可选, 对话框的内容. 默认为空.</li><li><code>callback</code> {Function} 回调函数, 可选. 当用户点击确定时被调用,一般用于ui模式.</li></ul><p>显示一个只包含“确定”按钮的提示对话框. 直至用户点击确定脚本才继续运行.</p><p>该函数也可以作为全局函数使用.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>alert(&quot;出现错误~&quot;, &quot;出现未知错误, 请联系脚本作者”);</span></span></code></pre></div><p>在ui模式下该函数返回一个<code>Promise</code>. 例如:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ui&quot;;</span></span>
<span class="line"><span>alert(&quot;嘿嘿嘿&quot;).then(()=&gt;{</span></span>
<span class="line"><span>    //当点击确定后会执行这里</span></span>
<span class="line"><span>});</span></span></code></pre></div><h2 id="dialogs-confirm-title-content-callback" tabindex="-1">dialogs.confirm(title[, content, callback])</h2><ul><li><code>title</code> {string} 对话框的标题.</li><li><code>content</code> {string} 可选, 对话框的内容. 默认为空.</li><li><code>callback</code> {Function} 回调函数, 可选. 当用户点击确定时被调用,一般用于ui模式.</li></ul><p>显示一个包含“确定”和“取消”按钮的提示对话框. 如果用户点击“确定”则返回 <code>true</code> , 否则返回 <code>false</code> .</p><p>该函数也可以作为全局函数使用.</p><p>在ui模式下该函数返回一个<code>Promise</code>. 例如:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ui&quot;;</span></span>
<span class="line"><span>confirm(&quot;确定吗&quot;).then(value=&gt;{</span></span>
<span class="line"><span>    //当点击确定后会执行这里, value为true或false, 表示点击&quot;确定&quot;或&quot;取消&quot;</span></span>
<span class="line"><span>});</span></span></code></pre></div><h2 id="dialogs-rawinput-title-prefill-callback" tabindex="-1">dialogs.rawInput(title[, prefill, callback])</h2><ul><li><code>title</code> {string} 对话框的标题.</li><li><code>prefill</code> {string} 输入框的初始内容, 可选, 默认为空.</li><li><code>callback</code> {Function} 回调函数, 可选. 当用户点击确定时被调用,一般用于ui模式.</li></ul><p>显示一个包含输入框的对话框, 等待用户输入内容, 并在用户点击确定时将输入的字符串返回. 如果用户取消了输入, 返回null.</p><p>该函数也可以作为全局函数使用.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var name = rawInput(&quot;请输入您的名字&quot;, &quot;小明&quot;);</span></span>
<span class="line"><span>alert(&quot;您的名字是&quot; + name);</span></span></code></pre></div><p>在ui模式下该函数返回一个<code>Promise</code>. 例如:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ui&quot;;</span></span>
<span class="line"><span>rawInput(&quot;请输入您的名字&quot;, &quot;小明&quot;).then(name =&gt; {</span></span>
<span class="line"><span>    alert(&quot;您的名字是&quot; + name);</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>当然也可以使用回调函数, 例如:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rawInput(&quot;请输入您的名字&quot;, &quot;小明&quot;, name =&gt; {</span></span>
<span class="line"><span>     alert(&quot;您的名字是&quot; + name);</span></span>
<span class="line"><span>});</span></span></code></pre></div><h2 id="dialogs-input-title-prefill-callback" tabindex="-1">dialogs.input(title[, prefill, callback])</h2><p>等效于 <code>eval(dialogs.rawInput(title, prefill, callback))</code>, 该函数和rawInput的区别在于, 会把输入的字符串用eval计算一遍再返回, 返回的可能不是字符串.</p><p>可以用该函数输入数字、数组等. 例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var age = dialogs.input(&quot;请输入您的年龄&quot;, &quot;18&quot;);</span></span>
<span class="line"><span>// new Date().getYear() + 1900 可获取当前年份</span></span>
<span class="line"><span>var year = new Date().getYear() + 1900 - age;</span></span>
<span class="line"><span>alert(&quot;您的出生年份是&quot; + year);</span></span></code></pre></div><p>在ui模式下该函数返回一个<code>Promise</code>. 例如:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ui&quot;;</span></span>
<span class="line"><span>dialogs.input(&quot;请输入您的年龄&quot;, &quot;18&quot;).then(age =&gt; {</span></span>
<span class="line"><span>    var year = new Date().getYear() + 1900 - age;</span></span>
<span class="line"><span>    alert(&quot;您的出生年份是&quot; + year);</span></span>
<span class="line"><span>});</span></span></code></pre></div><h2 id="dialogs-prompt-title-prefill-callback" tabindex="-1">dialogs.prompt(title[, prefill, callback])</h2><p>相当于 <code>dialogs.rawInput()</code>;</p><h2 id="dialogs-select-title-items-callback" tabindex="-1">dialogs.select(title, items, callback)</h2><ul><li><code>title</code> {string} 对话框的标题.</li><li><code>items</code> {Array} 对话框的选项列表, 是一个字符串数组.</li><li><code>callback</code> {Function} 回调函数, 可选. 当用户点击确定时被调用,一般用于ui模式.</li></ul><p>显示一个带有选项列表的对话框, 等待用户选择, 返回用户选择的选项索引(0 ~ item.length - 1). 如果用户取消了选择, 返回-1.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var options = [&quot;选项A&quot;, &quot;选项B&quot;, &quot;选项C&quot;, &quot;选项D&quot;]</span></span>
<span class="line"><span>var i = dialogs.select(&quot;请选择一个选项&quot;, options);</span></span>
<span class="line"><span>if(i &gt;= 0){</span></span>
<span class="line"><span>    toast(&quot;您选择的是&quot; + options[i]);</span></span>
<span class="line"><span>}else{</span></span>
<span class="line"><span>    toast(&quot;您取消了选择&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在ui模式下该函数返回一个<code>Promise</code>. 例如:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ui&quot;;</span></span>
<span class="line"><span>dialogs.select(&quot;请选择一个选项&quot;, [&quot;选项A&quot;, &quot;选项B&quot;, &quot;选项C&quot;, &quot;选项D&quot;])</span></span>
<span class="line"><span>    .then(i =&gt; {</span></span>
<span class="line"><span>        toast(i);</span></span>
<span class="line"><span>    });</span></span></code></pre></div><h2 id="dialogs-singlechoice-title-items-index-callback" tabindex="-1">dialogs.singleChoice(title, items[, index, callback])</h2><ul><li><code>title</code> {string} 对话框的标题.</li><li><code>items</code> {Array} 对话框的选项列表, 是一个字符串数组.</li><li><code>index</code> {number} 对话框的初始选项的位置, 默认为0.</li><li><code>callback</code> {Function} 回调函数, 可选. 当用户点击确定时被调用,一般用于ui模式.</li></ul><p>显示一个单选列表对话框, 等待用户选择, 返回用户选择的选项索引(0 ~ item.length - 1). 如果用户取消了选择, 返回-1.</p><p>在ui模式下该函数返回一个<code>Promise</code>.</p><h2 id="dialogs-multichoice-title-items-indices-callback" tabindex="-1">dialogs.multiChoice(title, items[, indices, callback])</h2><ul><li><code>title</code> {string} 对话框的标题.</li><li><code>items</code> {Array} 对话框的选项列表, 是一个字符串数组.</li><li><code>indices</code> {Array} 选项列表中初始选中的项目索引的数组, 默认为空数组.</li><li><code>callback</code> {Function} 回调函数, 可选. 当用户点击确定时被调用,一般用于ui模式.</li></ul><p>显示一个多选列表对话框, 等待用户选择, 返回用户选择的选项索引的数组. 如果用户取消了选择, 返回<code>[]</code>.</p><p>在ui模式下该函数返回一个<code>Promise</code>.</p><h2 id="dialogs-build-properties" tabindex="-1">dialogs.build(properties)</h2><ul><li><code>properties</code> {Object} 对话框属性, 用于配置对话框.</li><li>返回 {Dialog}</li></ul><p>创建一个可自定义的对话框, 例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dialogs.build({</span></span>
<span class="line"><span>    //对话框标题</span></span>
<span class="line"><span>    title: &quot;发现新版本&quot;,</span></span>
<span class="line"><span>    //对话框内容</span></span>
<span class="line"><span>    content: &quot;更新日志: 新增了若干了BUG&quot;,</span></span>
<span class="line"><span>    //确定键内容</span></span>
<span class="line"><span>    positive: &quot;下载&quot;,</span></span>
<span class="line"><span>    //取消键内容</span></span>
<span class="line"><span>    negative: &quot;取消&quot;,</span></span>
<span class="line"><span>    //中性键内容</span></span>
<span class="line"><span>    neutral: &quot;到浏览器下载&quot;,</span></span>
<span class="line"><span>    //勾选框内容</span></span>
<span class="line"><span>    checkBoxPrompt: &quot;不再提示&quot;</span></span>
<span class="line"><span>}).on(&quot;positive&quot;, ()=&gt;{</span></span>
<span class="line"><span>    //监听确定键</span></span>
<span class="line"><span>    toast(&quot;开始下载....&quot;);</span></span>
<span class="line"><span>}).on(&quot;neutral&quot;, ()=&gt;{</span></span>
<span class="line"><span>    //监听中性键</span></span>
<span class="line"><span>    app.openUrl(&quot;https://www.autojs.org&quot;);</span></span>
<span class="line"><span>}).on(&quot;check&quot;, (checked)=&gt;{</span></span>
<span class="line"><span>    //监听勾选框</span></span>
<span class="line"><span>    log(checked);</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><p>选项properties可供配置的项目为:</p><ul><li><code>title</code> {string} 对话框标题</li><li><code>titleColor</code> {string} | {number} 对话框标题的颜色</li><li><code>buttonRippleColor</code> {string} | {number} 对话框按钮的波纹效果颜色</li><li><code>icon</code> {string} | {Image} 对话框的图标, 是一个URL或者图片对象</li><li><code>content</code> {string} 对话框文字内容</li><li><code>contentColor</code>{string} | {number} 对话框文字内容的颜色</li><li><code>contentLineSpacing</code>{number} 对话框文字内容的行高倍数, 1.0为一倍行高</li><li><code>items</code> {Array} 对话框列表的选项</li><li><code>itemsColor</code> {string} | {number} 对话框列表的选项的文字颜色</li><li><code>itemsSelectMode</code> {string} 对话框列表的选项选择模式, 可以为: <ul><li><code>select</code> 普通选择模式</li><li><code>single</code> 单选模式</li><li><code>multi</code> 多选模式</li></ul></li><li><code>itemsSelectedIndex</code> {number} | {Array} 对话框列表中预先选中的项目索引, 如果是单选模式为一个索引；多选模式则为数组</li><li><code>positive</code> {string} 对话框确定按钮的文字内容(最右边按钮)</li><li><code>positiveColor</code> {string} | {number} 对话框确定按钮的文字颜色(最右边按钮)</li><li><code>neutral</code> {string} 对话框中立按钮的文字内容(最左边按钮)</li><li><code>neutralColor</code> {string} | {number} 对话框中立按钮的文字颜色(最左边按钮)</li><li><code>negative</code> {string} 对话框取消按钮的文字内容(确定按钮左边的按钮)</li><li><code>negativeColor</code> {string} | {number} 对话框取消按钮的文字颜色(确定按钮左边的按钮)</li><li><code>checkBoxPrompt</code> {string} 勾选框文字内容</li><li><code>checkBoxChecked</code> {boolean} 勾选框是否勾选</li><li><code>progress</code> {Object} 配置对话框进度条的对象： <ul><li><code>max</code> {number} 进度条的最大值, 如果为-1则为无限循环的进度条</li><li><code>horizontal</code> {boolean} 如果为true, 则对话框无限循环的进度条为水平进度条</li><li><code>showMinMax</code> {boolean} 是否显示进度条的最大值和最小值</li></ul></li><li><code>cancelable</code> {boolean} 对话框是否可取消, 如果为false, 则对话框只能用代码手动取消</li><li><code>canceledOnTouchOutside</code> {boolean} 对话框是否在点击对话框以外区域时自动取消, 默认为true</li><li><code>inputHint</code> {string} 对话框的输入框的输入提示</li><li><code>inputPrefill</code> {string} 对话框输入框的默认输入内容</li></ul><p>通过这些选项可以自定义一个对话框, 并通过监听返回的Dialog对象的按键、输入事件来实现交互. 下面是一些例子.</p><p>模拟alert对话框：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dialogs.build({</span></span>
<span class="line"><span>    title: &quot;你好&quot;,</span></span>
<span class="line"><span>    content: &quot;今天也要元气满满哦&quot;,</span></span>
<span class="line"><span>    positive: &quot;好的&quot;</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><p>模拟confirm对话框:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dialogs.build({</span></span>
<span class="line"><span>    title: &quot;你好&quot;,</span></span>
<span class="line"><span>    content: &quot;请问你是笨蛋吗?&quot;,</span></span>
<span class="line"><span>    positive: &quot;是的&quot;,</span></span>
<span class="line"><span>    negative: &quot;我是大笨蛋&quot;</span></span>
<span class="line"><span>}).on(&quot;positive&quot;, ()=&gt;{</span></span>
<span class="line"><span>    alert(&quot;哈哈哈笨蛋&quot;);</span></span>
<span class="line"><span>}).on(&quot;negative&quot;, ()=&gt;{</span></span>
<span class="line"><span>    alert(&quot;哈哈哈大笨蛋&quot;);</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><p>模拟单选框:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dialogs.build({</span></span>
<span class="line"><span>    title: &quot;单选&quot;,</span></span>
<span class="line"><span>    items: [&quot;选项1&quot;, &quot;选项2&quot;, &quot;选项3&quot;, &quot;选项4&quot;],</span></span>
<span class="line"><span>    itemsSelectMode: &quot;single&quot;,</span></span>
<span class="line"><span>    itemsSelectedIndex: 3</span></span>
<span class="line"><span>}).on(&quot;single_choice&quot;, (index, item)=&gt;{</span></span>
<span class="line"><span>    toast(&quot;您选择的是&quot; + item);</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><p>&quot;处理中&quot;对话框:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var d = dialogs.build({</span></span>
<span class="line"><span>    title: &quot;下载中...&quot;,</span></span>
<span class="line"><span>    progress: {</span></span>
<span class="line"><span>        max: -1</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    cancelable: false</span></span>
<span class="line"><span>}).show();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>setTimeout(()=&gt;{</span></span>
<span class="line"><span>    d.dismiss();</span></span>
<span class="line"><span>}, 3000);</span></span></code></pre></div><p>输入对话框:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dialogs.build({</span></span>
<span class="line"><span>    title: &quot;请输入您的年龄&quot;,</span></span>
<span class="line"><span>    inputPrefill: &quot;18&quot;</span></span>
<span class="line"><span>}).on(&quot;input&quot;, (input)=&gt;{</span></span>
<span class="line"><span>    var age = parseInt(input);</span></span>
<span class="line"><span>    toastLog(age);</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><p>使用这个函数来构造对话框, 一个明显的不同是需要使用回调函数而不能像dialogs其他函数一样同步地返回结果；但也可以通过threads模块的方法来实现. 例如显示一个输入框并获取输入结果为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var input = threads.disposable();</span></span>
<span class="line"><span>dialogas.build({</span></span>
<span class="line"><span>    title: &quot;请输入您的年龄&quot;,</span></span>
<span class="line"><span>    inputPrefill: &quot;18&quot;</span></span>
<span class="line"><span>}).on(&quot;input&quot;, text =&gt; {</span></span>
<span class="line"><span>    input.setAndNotify(text);</span></span>
<span class="line"><span>}).show();</span></span>
<span class="line"><span>var age = parseInt(input.blockedGet());</span></span>
<span class="line"><span>tosatLog(age);</span></span></code></pre></div><h1 id="dialog" tabindex="-1">Dialog</h1><p><code>dialogs.build()</code>返回的对话框对象, 内置一些事件用于响应用户的交互, 也可以获取对话框的状态和信息.</p><h2 id="事件-show" tabindex="-1">事件: <code>show</code></h2><ul><li><code>dialog</code> {Dialog} 对话框</li></ul><p>对话框显示时会触发的事件. 例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dialogs.build({</span></span>
<span class="line"><span>    title: &quot;标题&quot;</span></span>
<span class="line"><span>}).on(&quot;show&quot;, (dialog)=&gt;{</span></span>
<span class="line"><span>    toast(&quot;对话框显示了&quot;);</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><h2 id="事件-cancel" tabindex="-1">事件: <code>cancel</code></h2><ul><li><code>dialog</code> {Dialog} 对话框</li></ul><p>对话框被取消时会触发的事件. 一个对话框可能按取消按钮、返回键取消或者点击对话框以外区域取消. 例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dialogs.build({</span></span>
<span class="line"><span>    title: &quot;标题&quot;,</span></span>
<span class="line"><span>    positive: &quot;确定&quot;,</span></span>
<span class="line"><span>    negative: &quot;取消&quot;</span></span>
<span class="line"><span>}).on(&quot;cancel&quot;, (dialog)=&gt;{</span></span>
<span class="line"><span>    toast(&quot;对话框取消了&quot;);</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><h2 id="事件-dismiss" tabindex="-1">事件: <code>dismiss</code></h2><ul><li><code>dialog</code> {Dialog} 对话框</li></ul><p>对话框消失时会触发的事件. 对话框被取消或者手动调用<code>dialog.dismiss()</code>函数都会触发该事件. 例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var d = dialogs.build({</span></span>
<span class="line"><span>    title: &quot;标题&quot;,</span></span>
<span class="line"><span>    positive: &quot;确定&quot;,</span></span>
<span class="line"><span>    negative: &quot;取消&quot;</span></span>
<span class="line"><span>}).on(&quot;dismiss&quot;, (dialog)=&gt;{</span></span>
<span class="line"><span>    toast(&quot;对话框消失了&quot;);</span></span>
<span class="line"><span>}).show();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>setTimeout(()=&gt;{</span></span>
<span class="line"><span>    d.dismiss();</span></span>
<span class="line"><span>}, 5000);</span></span></code></pre></div><h2 id="事件-positive" tabindex="-1">事件: <code>positive</code></h2><ul><li><code>dialog</code> {Dialog} 对话框</li></ul><p>确定按钮按下时触发的事件. 例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var d = dialogs.build({</span></span>
<span class="line"><span>    title: &quot;标题&quot;,</span></span>
<span class="line"><span>    positive: &quot;确定&quot;,</span></span>
<span class="line"><span>    negative: &quot;取消&quot;</span></span>
<span class="line"><span>}).on(&quot;positive&quot;, (dialog)=&gt;{</span></span>
<span class="line"><span>    toast(&quot;你点击了确定&quot;);</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><h2 id="事件-negative" tabindex="-1">事件: <code>negative</code></h2><ul><li><code>dialog</code> {Dialog} 对话框</li></ul><p>取消按钮按下时触发的事件. 例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var d = dialogs.build({</span></span>
<span class="line"><span>    title: &quot;标题&quot;,</span></span>
<span class="line"><span>    positive: &quot;确定&quot;,</span></span>
<span class="line"><span>    negative: &quot;取消&quot;</span></span>
<span class="line"><span>}).on(&quot;negative&quot;, (dialog)=&gt;{</span></span>
<span class="line"><span>    toast(&quot;你点击了取消&quot;);</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><h2 id="事件-neutral" tabindex="-1">事件: <code>neutral</code></h2><ul><li><code>dialog</code> {Dialog} 对话框</li></ul><p>中性按钮按下时触发的事件. 例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var d = dialogs.build({</span></span>
<span class="line"><span>    title: &quot;标题&quot;,</span></span>
<span class="line"><span>    positive: &quot;确定&quot;,</span></span>
<span class="line"><span>    negative: &quot;取消&quot;,</span></span>
<span class="line"><span>    neutral: &quot;稍后提示&quot;</span></span>
<span class="line"><span>}).on(&quot;positive&quot;, (dialog)=&gt;{</span></span>
<span class="line"><span>    toast(&quot;你点击了稍后提示&quot;);</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><h2 id="事件-any" tabindex="-1">事件: <code>any</code></h2><ul><li><code>dialog</code> {Dialog} 对话框</li><li><code>action</code> {string} 被点击的按钮, 可能的值为: <ul><li><code>positive</code> 确定按钮</li><li><code>negative</code> 取消按钮</li><li><code>neutral</code> 中性按钮</li></ul></li></ul><p>任意按钮按下时触发的事件. 例如:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var d = dialogs.build({</span></span>
<span class="line"><span>    title: &quot;标题&quot;,</span></span>
<span class="line"><span>    positive: &quot;确定&quot;,</span></span>
<span class="line"><span>    negative: &quot;取消&quot;,</span></span>
<span class="line"><span>    neutral: &quot;稍后提示&quot;</span></span>
<span class="line"><span>}).on(&quot;any&quot;, (action, dialog)=&gt;{</span></span>
<span class="line"><span>    if(action == &quot;positive&quot;){</span></span>
<span class="line"><span>        toast(&quot;你点击了确定&quot;);</span></span>
<span class="line"><span>    }else if(action == &quot;negative&quot;){</span></span>
<span class="line"><span>        toast(&quot;你点击了取消&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><h2 id="事件-item-select" tabindex="-1">事件: <code>item_select</code></h2><ul><li><code>index</code> {number} 被选中的项目索引, 从0开始</li><li><code>item</code> {Object} 被选中的项目</li><li><code>dialog</code> {Dialog} 对话框</li></ul><p>对话框列表(itemsSelectMode为&quot;select&quot;)的项目被点击选中时触发的事件. 例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var d = dialogs.build({</span></span>
<span class="line"><span>    title: &quot;请选择&quot;,</span></span>
<span class="line"><span>    positive: &quot;确定&quot;,</span></span>
<span class="line"><span>    negative: &quot;取消&quot;,</span></span>
<span class="line"><span>    items: [&quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;D&quot;],</span></span>
<span class="line"><span>    itemsSelectMode: &quot;select&quot;</span></span>
<span class="line"><span>}).on(&quot;item_select&quot;, (index, item, dialog)=&gt;{</span></span>
<span class="line"><span>    toast(&quot;您选择的是第&quot; + (index + 1) + &quot;项, 选项为&quot; + item);</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><h2 id="事件-single-choice" tabindex="-1">事件: <code>single_choice</code></h2><ul><li><code>index</code> {number} 被选中的项目索引, 从0开始</li><li><code>item</code> {Object} 被选中的项目</li><li><code>dialog</code> {Dialog} 对话框</li></ul><p>对话框单选列表(itemsSelectMode为&quot;singleChoice&quot;)的项目被选中并点击确定时触发的事件. 例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var d = dialogs.build({</span></span>
<span class="line"><span>    title: &quot;请选择&quot;,</span></span>
<span class="line"><span>    positive: &quot;确定&quot;,</span></span>
<span class="line"><span>    negative: &quot;取消&quot;,</span></span>
<span class="line"><span>    items: [&quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;D&quot;],</span></span>
<span class="line"><span>    itemsSelectMode: &quot;singleChoice&quot;</span></span>
<span class="line"><span>}).on(&quot;item_select&quot;, (index, item, dialog)=&gt;{</span></span>
<span class="line"><span>    toast(&quot;您选择的是第&quot; + (index + 1) + &quot;项, 选项为&quot; + item);</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><h2 id="事件-multi-choice" tabindex="-1">事件: <code>multi_choice</code></h2><ul><li><code>indices</code> {Array} 被选中的项目的索引的数组</li><li><code>items</code> {Array} 被选中的项目的数组</li><li><code>dialog</code> {Dialog} 对话框</li></ul><p>对话框多选列表(itemsSelectMode为&quot;multiChoice&quot;)的项目被选中并点击确定时触发的事件. 例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var d = dialogs.build({</span></span>
<span class="line"><span>    title: &quot;请选择&quot;,</span></span>
<span class="line"><span>    positive: &quot;确定&quot;,</span></span>
<span class="line"><span>    negative: &quot;取消&quot;,</span></span>
<span class="line"><span>    items: [&quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;D&quot;],</span></span>
<span class="line"><span>    itemsSelectMode: &quot;multiChoice&quot;</span></span>
<span class="line"><span>}).on(&quot;item_select&quot;, (indices, items, dialog)=&gt;{</span></span>
<span class="line"><span>    toast(util.format(&quot;您选择的项目为%o, 选项为%o&quot;, indices, items);</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><h2 id="事件-input" tabindex="-1">事件: <code>input</code></h2><ul><li><code>text</code> {string} 输入框的内容</li><li><code>dialog</code> {Dialog} 对话框</li></ul><p>带有输入框的对话框当点击确定时会触发的事件. 例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dialogs.build({</span></span>
<span class="line"><span>    title: &quot;请输入&quot;,</span></span>
<span class="line"><span>    positive: &quot;确定&quot;,</span></span>
<span class="line"><span>    negative: &quot;取消&quot;,</span></span>
<span class="line"><span>    inputPrefill: &quot;&quot;</span></span>
<span class="line"><span>}).on(&quot;input&quot;, (text, dialog)=&gt;{</span></span>
<span class="line"><span>    toast(&quot;你输入的是&quot; + text);</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><h2 id="事件-input-change" tabindex="-1">事件: <code>input_change</code></h2><ul><li><code>text</code> {string} 输入框的内容</li><li><code>dialog</code> {Dialog} 对话框</li></ul><p>对话框的输入框的文本发生变化时会触发的事件. 例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dialogs.build({</span></span>
<span class="line"><span>    title: &quot;请输入&quot;,</span></span>
<span class="line"><span>    positive: &quot;确定&quot;,</span></span>
<span class="line"><span>    negative: &quot;取消&quot;,</span></span>
<span class="line"><span>    inputPrefill: &quot;&quot;</span></span>
<span class="line"><span>}).on(&quot;input_change&quot;, (text, dialog)=&gt;{</span></span>
<span class="line"><span>    toast(&quot;你输入的是&quot; + text);</span></span>
<span class="line"><span>}).show();</span></span></code></pre></div><h2 id="dialog-getprogress" tabindex="-1">dialog.getProgress()</h2><ul><li>返回 {number}</li></ul><p>获取当前进度条的进度值, 是一个整数</p><h2 id="dialog-getmaxprogress" tabindex="-1">dialog.getMaxProgress()</h2><ul><li>返回 {number}</li></ul><p>获取当前进度条的最大进度值, 是一个整数</p><h2 id="dialog-getactionbutton-action" tabindex="-1">dialog.getActionButton(action)</h2><ul><li><code>action</code> {string} 动作, 包括: <ul><li><code>positive</code></li><li><code>negative</code></li><li><code>neutral</code></li></ul></li></ul>`,133)])])}const h=a(i,[["render",t]]);export{q as __pageData,h as default};
