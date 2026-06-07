import{_ as a,o as n,c as p,a2 as e}from"./chunks/framework.BZO4qERu.js";const h=JSON.parse('{"title":"模块 (Module)","description":"","frontmatter":{},"headers":[],"relativePath":"modules.md","filePath":"modules.md","lastUpdated":1669882888000}'),l={name:"modules.md"};function t(c,s,i,o,r,d){return n(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="模块-module" tabindex="-1">模块 (Module)</h1><hr><p style="font:italic 1em sans-serif;color:#78909C;">此章节待补充或完善...</p><p style="font:italic 1em sans-serif;color:#78909C;">Marked by SuperMonster003 on Oct 22, 2022.</p><hr><p>Auto.js 有一个简单的模块加载系统. 在 Auto.js 中, 文件和模块是一一对应的（每个文件被视为一个独立的模块）.</p><p>例子, 假设有一个名为 foo.js 的文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var circle = require(&#39;circle.js&#39;);</span></span>
<span class="line"><span>console.log(&quot;半径为 4 的圆的面积是 %d&quot;, circle.area(4));</span></span></code></pre></div><p>在第一行中, foo.js 加载了同一目录下的 circle.js 模块.</p><p>circle.js 文件的内容为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const PI = Math.PI;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var circle = {};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>circle.area = function (r) {</span></span>
<span class="line"><span>  return PI * r * r;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>circle.circumference = (r) =&gt; 2 * PI * r;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module.exports = circle;</span></span></code></pre></div><p>circle.js 模块导出了 area() 和 circumference() 两个函数. 通过在特殊的 exports 对象上指定额外的属性, 函数和对象可以被添加到模块的根部.</p><p>模块内的本地变量是私有的. 在这个例子中, 变量 PI 是 circle.js 私有的, 不会影响到加载他的脚本的变量环境.</p><p>module.exports属性可以被赋予一个新的值（例如函数或对象）.</p><p>如下, bar.js 会用到 square 模块, square 导出一个构造函数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const square = require(&#39;square.js&#39;);</span></span>
<span class="line"><span>const mySquare = square(2);</span></span>
<span class="line"><span>console.log(&quot;正方形的面积是 %d&quot;, mySquare.area());</span></span>
<span class="line"><span>square 模块定义在 square.js 中：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 赋值给 \`exports\` 不会修改模块, 必须使用 \`module.exports\`</span></span>
<span class="line"><span>module.exports = function(width) {</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    area: () =&gt; width ** 2</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>};</span></span></code></pre></div>`,16)])])}const m=a(l,[["render",t]]);export{h as __pageData,m as default};
