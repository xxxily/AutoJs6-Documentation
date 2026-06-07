import{_ as e,o as s,c as t,a2 as n}from"./chunks/framework.BZO4qERu.js";const d=JSON.parse('{"title":"E4X","description":"","frontmatter":{},"headers":[],"relativePath":"e4x.md","filePath":"e4x.md","lastUpdated":1669882888000}'),p={name:"e4x.md"};function r(o,a,i,l,c,u){return s(),t("div",null,[...a[0]||(a[0]=[n(`<h1 id="e4x" tabindex="-1">E4X</h1><blockquote><p>注: E4X <strong>已弃用</strong>.</p><p>尽管少数浏览器依然支持, 但随着件更新正逐步被废除, 应尽量避免使用.<br> AutoJs6 使用 Rhino 引擎, 因此依然保持对 E4X 的支持.</p><p>本章节仅用于技术概念的归档及溯源, 不建议用于脚本编写.</p></blockquote><p>ECMAScript for XML (E4X) 是对 ECMAScript 的扩展, 增加对 XML 的内在支持.<br> 其目标是在访问 XML 文档时, 提供一种更直观且语法更简洁的的 DOM 接口, 成为处理 XML 文档的新方式.</p><div class="language-e4x vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">e4x</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var sales = &lt;sales vendor=&quot;John&quot;&gt;</span></span>
<span class="line"><span>    &lt;item type=&quot;peas&quot; price=&quot;4&quot; quantity=&quot;6&quot;/&gt;</span></span>
<span class="line"><span>    &lt;item type=&quot;carrot&quot; price=&quot;3&quot; quantity=&quot;10&quot;/&gt;</span></span>
<span class="line"><span>    &lt;item type=&quot;chips&quot; price=&quot;5&quot; quantity=&quot;3&quot;/&gt;</span></span>
<span class="line"><span>  &lt;/sales&gt;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>alert( sales.item.(@type == &quot;carrot&quot;).@quantity );</span></span>
<span class="line"><span>alert( sales.@vendor );</span></span>
<span class="line"><span>for each( var price in sales..@price ) {</span></span>
<span class="line"><span>  alert( price );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>delete sales.item[0];</span></span>
<span class="line"><span>sales.item += &lt;item type=&quot;oranges&quot; price=&quot;4&quot;/&gt;;</span></span>
<span class="line"><span>sales.item.(@type == &quot;oranges&quot;).@quantity = 4;</span></span></code></pre></div><blockquote><p>参阅: <a href="https://en.wikipedia.org/wiki/ECMAScript_for_XML" target="_blank" rel="noreferrer">Wikipedia (英)</a> / <a href="https://zh.wikipedia.org/wiki/E4X" target="_blank" rel="noreferrer">Wikipedia (中)</a><br> 替代: <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser" target="_blank" rel="noreferrer">DOMParser</a> / <a href="https://www.npmjs.com/package/dom-serializer" target="_blank" rel="noreferrer">DOMSerializer</a></p></blockquote>`,5)])])}const _=e(p,[["render",r]]);export{d as __pageData,_ as default};
