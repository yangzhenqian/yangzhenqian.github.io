"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[127],{5357:(s,n,a)=>{a.r(n),a.d(n,{data:()=>p});const p={key:"v-3ea3b912",path:"/formatCode/husky.html",title:"husky",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"插件  eslint + prettier + husky",slug:"插件-eslint-prettier-husky",children:[]}],filePathRelative:"formatCode/husky.md",git:{updatedTime:1709188762e3,contributors:[{name:"yangzhenqian",email:"zhenqian.yang@i-tage.com",commits:2}]}}},369:(s,n,a)=>{a.r(n),a.d(n,{default:()=>e});const p=(0,a(6252).uE)('<h1 id="husky" tabindex="-1"><a class="header-anchor" href="#husky" aria-hidden="true">#</a> husky</h1><p>commit提交自动校验格式化代码</p><h2 id="插件-eslint-prettier-husky" tabindex="-1"><a class="header-anchor" href="#插件-eslint-prettier-husky" aria-hidden="true">#</a> 插件 eslint + prettier + husky</h2><p>eslint安装配置自行百度</p><p>项目安装 <strong>prettier husky lint-staged</strong>(只检测格式化add区域的代码)</p><p>命令 <strong>npm i prettier husky lint-staged --save-dev</strong><strong>根目录下创建 .prettierrc.cjs文件 不创建默认使用prettier默认配置</strong> .prettierrc.cjs配置</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//结尾是否使用分号</span>\n  <span class="token literal-property property">singleQuote</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 是否使用单引号</span>\n  <span class="token literal-property property">trailingComma</span><span class="token operator">:</span> <span class="token string">&#39;es5&#39;</span><span class="token punctuation">,</span> <span class="token comment">//尾随逗号</span>\n  <span class="token literal-property property">tabWidth</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//缩进字节数</span>\n  <span class="token literal-property property">arrowParens</span><span class="token operator">:</span> <span class="token string">&#39;avoid&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 箭头函数只有一个参数时省略括号</span>\n  <span class="token literal-property property">printWidth</span><span class="token operator">:</span> <span class="token number">120</span><span class="token punctuation">,</span> <span class="token comment">// 最大值换行</span>\n  <span class="token literal-property property">htmlWhitespaceSensitivity</span><span class="token operator">:</span> <span class="token string">&#39;ignore&#39;</span><span class="token punctuation">,</span>\n  <span class="token literal-property property">jsxBracketSameLine</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// &#39;&gt;&#39; 是否不换行</span>\n  <span class="token literal-property property">jsxSingleQuote</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 是否使用单引号代替双引号</span>\n  <span class="token literal-property property">vueIndentScriptAndStyle</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><strong>package.json配置</strong></p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>\n  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;prepare&quot;</span><span class="token operator">:</span> <span class="token string">&quot;husky install&quot;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;husky&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;hooks&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token property">&quot;pre-commit&quot;</span><span class="token operator">:</span> <span class="token string">&quot;lint-staged&quot;</span> <span class="token comment">// commit时执行的命令</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;lint-staged&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token comment">//检测得文件类型</span>\n    <span class="token property">&quot;*.{ts,tsx,js,vue,css,less,sass}&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token string">&quot;eslint --fix&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 执行eslint检测</span>\n      <span class="token string">&quot;prettier --write&quot;</span><span class="token punctuation">,</span> <span class="token comment">//执行格式化代码操作</span>\n      <span class="token string">&quot;git add&quot;</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div>',9),t={},e=(0,a(3744).Z)(t,[["render",function(s,n){return p}]])},3744:(s,n)=>{n.Z=(s,n)=>{const a=s.__vccOpts||s;for(const[s,p]of n)a[s]=p;return a}}}]);