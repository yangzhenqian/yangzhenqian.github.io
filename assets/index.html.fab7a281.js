import{d as s}from"./app.c3ff6c08.js";import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";const a={},p=s(`<h1 id="\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#\u4ECB\u7ECD" aria-hidden="true">#</a> \u4ECB\u7ECD</h1><h2 id="_1-\u4EC0\u4E48\u662F-react" tabindex="-1"><a class="header-anchor" href="#_1-\u4EC0\u4E48\u662F-react" aria-hidden="true">#</a> 1. \u4EC0\u4E48\u662F React</h2><p>\u7528\u4E8E\u6784\u5EFA\u7528\u6237\u754C\u9762\u7684 JavaScript \u5E93</p><h2 id="_2-\u4EC0\u4E48\u662F-jsx" tabindex="-1"><a class="header-anchor" href="#_2-\u4EC0\u4E48\u662F-jsx" aria-hidden="true">#</a> 2. \u4EC0\u4E48\u662F jsx</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> ele <span class="token operator">=</span> <span class="token operator">&lt;</span>h1<span class="token operator">&gt;</span>hello<span class="token punctuation">,</span>world<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u8FD9\u4E2A\u6709\u8DA3\u7684\u6807\u7B7E\u8BED\u6CD5\u65E2\u4E0D\u662F\u5B57\u7B26\u4E32\u4E5F\u4E0D\u662F html,\u5B83\u662F jsx jsx \u4EC5\u4EC5\u53EA\u662F React.createElement(component, props, ...children) \u51FD\u6570\u7684\u8BED\u6CD5\u7CD6</p><ul><li><p>jsx JavaScript,\u4E0D\u662F\u6A21\u677F\u8BED\u8A00(vue template),\u4F46\u5177\u6709 js \u7684\u6240\u6709\u529F\u80FD</p></li><li><p>jsx \u8BED\u6CD5\u4E0A\u66F4\u63A5\u8FD1 JavaScript \u800C\u4E0D\u662F HTML,\u6240\u4EE5 react dom \u4F7F\u7528\u5C0F\u9A7C\u5CF0\u547D\u540D\u6765\u5B9A\u4E49\u5C5E\u6027\u7684\u540D\u79F0 \u5982: class -&gt; className tabindex -&gt; tabIndex</p></li><li><p>jsx \u9632\u6B62\u6CE8\u5165\u653B\u51FB(cross-site-scripting,\u8DE8\u7AD9\u811A\u672C)</p><ul><li>React DOM \u5728\u6E32\u67D3\u6240\u6709\u8F93\u5165\u5185\u5BB9\u4E4B\u524D\uFF0C\u9ED8\u8BA4\u4F1A\u8FDB\u884C\u8F6C\u4E49</li><li>\u6240\u6709\u7684\u5185\u5BB9\u5728\u6E32\u67D3\u4E4B\u524D\u90FD\u88AB\u8F6C\u6362\u6210\u4E86\u5B57\u7B26\u4E32</li></ul></li><li><p>jsx \u8868\u793A\u5BF9\u8C61</p><ul><li>Babel \u4F1A\u628A jsx \u8F6C\u8BD1\u6210\u4E00\u4E2A\u540D\u4E3A React.createElement()\u51FD\u6570\u8C03\u7528</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token operator">&lt;</span>h1 className<span class="token operator">=</span><span class="token string">&quot;greeting&quot;</span><span class="token operator">&gt;</span>Hello<span class="token punctuation">,</span> world<span class="token operator">!</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span><span class="token punctuation">;</span>

<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> \u7B49\u4EF7\u4E8E<span class="token operator">:</span> <span class="token operator">--</span><span class="token operator">&gt;</span>

<span class="token keyword">const</span> element <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
<span class="token string">&#39;h1&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span>className<span class="token operator">:</span> <span class="token string">&#39;greeting&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token string">&#39;Hello, world!&#39;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul><li>react \u5E76\u4E0D\u5F3A\u5236\u8981\u6C42\u4F7F\u7528 jsx</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> \u4F7F\u7528jsx\u7F16\u5199 <span class="token operator">--</span><span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">Hello</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>Hello <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>toWhat<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>Hello toWhat<span class="token operator">=</span><span class="token string">&quot;World&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> \u4E0D\u4F7F\u7528jsx\u7F16\u5199 <span class="token operator">--</span><span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">Hello</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>toWhat<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>Hello<span class="token punctuation">,</span> <span class="token punctuation">{</span>toWhat<span class="token operator">:</span> <span class="token string">&#39;World&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div></li></ul><p>\u5171\u4EAB\u7EC4\u4EF6\u4E4B\u95F4\u7684\u72B6\u6001\u903B\u8F91: render props \u548C\u9AD8\u9636\u7EC4\u4EF6</p><h2 id="_3-css-in-react" tabindex="-1"><a class="header-anchor" href="#_3-css-in-react" aria-hidden="true">#</a> 3. css in react</h2><ol><li>\u884C\u5185\u6837\u5F0F</li></ol><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> color<span class="token operator">:</span> red<span class="token punctuation">,</span> backGround<span class="token operator">:</span> yellow <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="2"><li>\u5F15\u5165\u6837\u5F0F\u8868</li></ol><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token keyword">import</span> <span class="token string">&#39;./index.css&#39;</span><span class="token punctuation">;</span> <span class="token comment">// index.less   index.scss</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="3"><li>css module</li></ol><p>css \u6587\u4EF6\u547D\u540D\u65B9\u5F0F\u589E\u52A0<code>module</code> ,\u5982 <code>index.module.css</code></p><ol start="4"><li>styled-component</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> styled-components
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// styles.js</span>
<span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;styled-components&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> Wrapper <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  height: 100%;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u4F7F\u7528</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Wrapper <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./styles.js&#39;</span><span class="token punctuation">;</span>

<span class="token operator">&lt;</span>Wrapper<span class="token operator">&gt;</span>hello<span class="token operator">&lt;</span><span class="token operator">/</span>Wrapper<span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="5"><li>classnames</li></ol><ul><li>\u5408\u5E76\u591A\u4E2A\u7C7B\u540D</li><li>\u4F1A\u8FC7\u6EE4\u6389 falsy \u7684\u503C</li></ul><p>classNames(&#39;active&#39;, { current: true, hasHead: false }, { isShow: true }); // =&gt; &#39;active current isShow&#39;</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> classnames
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u4F7F\u7528</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> cx <span class="token keyword">from</span> <span class="token string">&#39;classNames&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Home</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> current<span class="token punctuation">,</span> isShow <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> boxClass <span class="token operator">=</span> <span class="token function">classNames</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    active<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    current<span class="token operator">:</span> current<span class="token punctuation">,</span>
    isShow<span class="token operator">:</span> isShow<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token punctuation">{</span>boxClass<span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Home<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div>`,26);function e(t,o){return p}var r=n(a,[["render",e]]);export{r as default};
