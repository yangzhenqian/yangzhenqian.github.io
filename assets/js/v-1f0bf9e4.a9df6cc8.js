"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[173],{4713:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-1f0bf9e4",path:"/engineering/babel.html",title:"babel",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"1 介绍",slug:"_1-介绍",children:[]},{level:2,title:"2 使用",slug:"_2-使用",children:[]}],filePathRelative:"engineering/babel.md",git:{updatedTime:1684392364e3,contributors:[{name:"yangzhenqian",email:"zhenqian.yang@i-tage.com",commits:1}]}}},2467:(n,s,a)=>{a.r(s),a.d(s,{default:()=>r});var p=a(6252);const e=(0,p.uE)('<h1 id="babel" tabindex="-1"><a class="header-anchor" href="#babel" aria-hidden="true">#</a> babel</h1><h2 id="_1-介绍" tabindex="-1"><a class="header-anchor" href="#_1-介绍" aria-hidden="true">#</a> 1 介绍</h2><h4 id="babel-是什么" tabindex="-1"><a class="header-anchor" href="#babel-是什么" aria-hidden="true">#</a> babel 是什么 ？</h4><p>Babel 是一个 JavaScript 编译器</p><ul><li>语法转换 将 es6+ 转换为 es5</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n<span class="token comment">// var a = 1;</span>\n<span class="token keyword">const</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>\n<span class="token comment">// var sum = function sum(a, b) {</span>\n<span class="token comment">//   return a + b;</span>\n<span class="token comment">// };</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul><li>polyfill（在目标环境中添加缺失的特性）</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// 保证在老的环境中能使用新api</span>\nPromise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul><li>源码转换</li></ul><p>比如 去除 TypeScript 代码中的类型标识</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> i @babel/preset-typescript  <span class="token parameter variable">-D</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">n</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span><span class="token operator">:</span> number <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> n <span class="token operator">+</span> n<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token comment">// ------transformation------</span>\n<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> n <span class="token operator">+</span> n<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="babel-工作原理" tabindex="-1"><a class="header-anchor" href="#babel-工作原理" aria-hidden="true">#</a> 🍓 babel 工作原理 ？</h4><p><code>parsing-transforming-generating（解析-转换-生成）</code></p><ul><li><p>解析</p><p>将代码解析为 <code>AST</code>，babel 通过 <code>babylon</code> 实现，解析过程分为<code>词法分析</code>和<code>语法分析</code></p></li></ul><ol><li>词法分析 （源代码 -&gt; Token 序列）</li></ol><p><code>将整个代码字符串分割成最小语法单元数组，也就是一个个的标识Tokens（type 和 value )。</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Keyword&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 关键词</span>\n    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;var&#39;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Identifier&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 标识符</span>\n    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Punctuator&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 标点符号</span>\n    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;=&#39;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Numeric&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 数字</span>\n    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token operator">...</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><ol start="2"><li>语法分析 （Token 序列 -&gt; 抽象语法树 AST）</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>\n  <span class="token comment">// 表示是一段程序代码</span>\n  <span class="token string-property property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Program&quot;</span><span class="token punctuation">,</span>\n  <span class="token comment">// 代码的具体内容</span>\n  <span class="token string-property property">&quot;body&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      <span class="token comment">// 表示这个内容块是干什么的</span>\n      <span class="token string-property property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;VariableDeclaration&quot;</span><span class="token punctuation">,</span>\n      <span class="token comment">// 装变量内容的块</span>\n      <span class="token string-property property">&quot;declarations&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">{</span>\n          <span class="token comment">// 声明的类型是个变量</span>\n          <span class="token string-property property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;VariableDeclarator&quot;</span><span class="token punctuation">,</span>\n          <span class="token comment">// 表示变量名</span>\n          <span class="token string-property property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token string-property property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Identifier&quot;</span><span class="token punctuation">,</span>\n            <span class="token string-property property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;a&quot;</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          <span class="token comment">// 表示为这个变量设置的初值</span>\n          <span class="token string-property property">&quot;init&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token string-property property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Literal&quot;</span><span class="token punctuation">,</span>\n            <span class="token string-property property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n            <span class="token string-property property">&quot;raw&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span>\n          <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">]</span><span class="token punctuation">,</span>\n      <span class="token string-property property">&quot;kind&quot;</span><span class="token operator">:</span> <span class="token string">&quot;var&quot;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token comment">// 表示语言的种类</span>\n  <span class="token string-property property">&quot;sourceType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;script&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><ul><li>转换</li></ul><p>将 AST 通过 <code>babel-traverse</code> 进行深度遍历，在此过程中对节点进行添加、更新及移除</p><ul><li>生成</li></ul><p>将转换后的 AST 通过 <code>babel-generator</code> 再转换成 js 代码，过程是深度遍历整个 AST，然后构建可以表示转换后代码的字符串</p>',24),t={href:"https://astexplorer.net/",target:"_blank",rel:"noopener noreferrer"},o=(0,p.Uk)("AST 在线生成"),l=(0,p.uE)('<h4 id="preset-plugin" tabindex="-1"><a class="header-anchor" href="#preset-plugin" aria-hidden="true">#</a> preset / plugin</h4><ul><li>preset 预设</li></ul><p>可以被看作是一组 Babel 插件，处理相关语法</p><p>官方 preset</p><ol><li>@babel/preset-env for compiling ES2015+ syntax 代指最新的标准</li><li>@babel/preset-typescript for TypeScript</li><li>@babel/preset-react for React</li><li>@babel/preset-flow for Flow</li></ol><p><code>执行顺序</code></p><ol><li>preset 在 plugin 之后执行</li><li>preset 之间从后往前依次执行</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// 执行顺序 c-&gt;b-&gt;a，这个设计babel文档中说是历史原因造成的</span>\n<span class="token punctuation">{</span>\n    <span class="token string-property property">&quot;preset&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>\n        <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;c&quot;</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>...</p><ul><li>plugin 插件</li></ul><p>babel 本身不会对代码做任何操作，所有功能都靠插件实现</p><ol><li>@bable/plugin-transform-arrow-functions</li><li>@babel/plugin-transform-for-of</li><li>@babel/plugin-transform-classes</li></ol><p><code>执行顺序</code></p><ol><li>plugin 在 preset 之前执行</li><li>plugin 之间从前往后依次执行</li></ol><p>为什么 plugin 在 preset 之前执行？</p><p><code>因为 preset 配置的是比较成熟的语法，plugin 主要配置一些更新特性，plugin 在 preset 之前执行是保证这些新特性是最先被转换的，保证 preset 只关心比较稳定的语法</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// 执行顺序 c-&gt;b-&gt;a，这个设计babel文档中说是历史原因造成的</span>\n<span class="token punctuation">{</span>\n    <span class="token string-property property">&quot;preset&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;c&quot;</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n<span class="token operator">...</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="polyfill" tabindex="-1"><a class="header-anchor" href="#polyfill" aria-hidden="true">#</a> polyfill</h4><p>babel 只转换语法(如 let,const)不转换新的 api(Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等)，老旧环境需要正确解析 js 新特性(或 api)就需要用到 polyfill</p><ul><li>babel v7.4 之前</li></ul><p>安装@babel/polyfill（其实就是对 core-js 和 regenerator-runtime 进行了包装）</p><p><code>由于polyfill会用于运行时，所以要以dependencies方式安装</code></p><ul><li>babel v7.4 之后</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">&#39;core-js/stable&#39;</span><span class="token punctuation">;</span> <span class="token comment">// core-js用于polyfill大部分的ES新特性</span>\n<span class="token keyword">import</span> <span class="token string">&#39;regenerator-runtime/runtime&#39;</span><span class="token punctuation">;</span> <span class="token comment">// 用于转换generator函数</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li>按需引入</li></ul><p>@babel/polyfill 很大 不建议直接引入，结合 preset-env 进行按需引入 &quot;useBuiltIns&quot;: &quot;false&quot;, // 此时不对 polyfill 做操作。如果引入 @babel/polyfill，则无视配置的浏览器兼容，引入所有的 polyfill。 &quot;useBuiltIns&quot;: &quot;entry&quot;, // 会将文件中 import&quot;@babel/polyfill&quot;语句 结合 targets ，转换为一系列引入语句，去掉目标浏览器已支持的 polyfill 模块，不管代码里有没有用到，只要目标浏览器不支持都会引入对应的 polyfill 模块。 &quot;useBuiltIns&quot;: &quot;usage&quot; // 按需引入</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">[</span>\n      <span class="token string">&quot;@babel/preset-env&quot;</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        <span class="token property">&quot;targets&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n          <span class="token comment">//如果浏览器低于这些版本，会引入对应的polyfill</span>\n          <span class="token property">&quot;edge&quot;</span><span class="token operator">:</span> <span class="token string">&quot;17&quot;</span><span class="token punctuation">,</span>\n          <span class="token property">&quot;firefox&quot;</span><span class="token operator">:</span> <span class="token string">&quot;60&quot;</span><span class="token punctuation">,</span>\n          <span class="token property">&quot;chrome&quot;</span><span class="token operator">:</span> <span class="token string">&quot;67&quot;</span><span class="token punctuation">,</span>\n          <span class="token property">&quot;safari&quot;</span><span class="token operator">:</span> <span class="token string">&quot;11.1&quot;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;useBuiltIns&quot;</span><span class="token operator">:</span> <span class="token string">&quot;usage&quot;</span><span class="token punctuation">,</span> <span class="token comment">// false | entry | useage</span>\n        <span class="token property">&quot;corejs&quot;</span><span class="token operator">:</span> <span class="token string">&quot;3&quot;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>配置&quot;useBuiltIns&quot;: &quot;usage&quot;后，babel 编译时会按需引入 polyfill，如下</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>\n\nPromise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\n<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> transform <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>\n\n<span class="token string">&quot;use strict&quot;</span><span class="token punctuation">;</span>\n\n<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;core-js/modules/es.object.to-string.js&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;core-js/modules/es.promise.js&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\nPromise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h4 id="polyfill-和-runtime-的区别" tabindex="-1"><a class="header-anchor" href="#polyfill-和-runtime-的区别" aria-hidden="true">#</a> polyfill 和 runtime 的区别</h4><p>如果你开发的库中引用了 polyfill,而别人使用了你的库，且在他自己的应用中重写了 Promise 对象，此时就造成了全局变量被污染，导致功能异常，在此情境下 runtime 应运而生。</p><p>为了满足 npm 组件开发的需要 使用@babel/runtime 来做隔离</p><ol><li>@babel/runtime 不会污染全局环境</li><li>开发第三方 lib 需要使用@babel/runtime</li></ol><h4 id="transform-runtime-和-babel-runtime" tabindex="-1"><a class="header-anchor" href="#transform-runtime-和-babel-runtime" aria-hidden="true">#</a> transform-runtime 和 babel-runtime</h4><ol><li>二者缺一不可</li><li>babel-runtime 就是一个提供了 regenerator core-js helpers 的运行时库，transform-runtime 依赖 babel-runtime</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-dev @babel/plugin-transform-runtime\n<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--save</span> @babel/runtime\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>\n  <span class="token string-property property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">[</span>\n      <span class="token string">&quot;@babel/preset-env&quot;</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        <span class="token string-property property">&quot;useBuiltIns&quot;</span><span class="token operator">:</span> <span class="token string">&quot;usage&quot;</span><span class="token punctuation">,</span>\n        <span class="token string-property property">&quot;corejs&quot;</span><span class="token operator">:</span> <span class="token string">&quot;3&quot;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token string-property property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&quot;@babel/plugin-transform-runtime&quot;</span><span class="token punctuation">]</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h4 id="proxy-为什么不能被-polyfill" tabindex="-1"><a class="header-anchor" href="#proxy-为什么不能被-polyfill" aria-hidden="true">#</a> proxy 为什么不能被 polyfill</h4><p>Class 可以用 function 模拟， Promise 可以用 callback 模拟</p><p>而 es6 的 proxy 无法用 Object.defineProerty 模拟</p><h2 id="_2-使用" tabindex="-1"><a class="header-anchor" href="#_2-使用" aria-hidden="true">#</a> 2 使用</h2><ul><li>使用方式</li></ul><ol><li>直接 require</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> bable <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;@babel/core&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nbabel<span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span>code<span class="token punctuation">,</span> options<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="2"><li>babel-cli</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># 将src/index.js 编译到lib文件夹</span>\nnpx babel src/index.js  --out-dir lib\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="3"><li>webpack</li></ol><p>结合 babel-loader 使用</p><p>下面是 demo 演示</p><ul><li>安装</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> @babel/core @babel/cli @babel/preset-env <span class="token parameter variable">-D</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul><li>测试代码</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// index.js</span>\n<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul><li>配置 .babelrc</li></ul><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&quot;@babel/preset-env&quot;</span><span class="token punctuation">]</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul><li>编译</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>npx babel index.js\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>编译结果</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token string">&#39;use strict&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>',59),c={},r=(0,a(3744).Z)(c,[["render",function(n,s){const a=(0,p.up)("OutboundLink");return(0,p.wg)(),(0,p.iD)(p.HY,null,[e,(0,p._)("p",null,[(0,p._)("a",t,[o,(0,p.Wm)(a)])]),l],64)}]])},3744:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,p]of s)a[n]=p;return a}}}]);