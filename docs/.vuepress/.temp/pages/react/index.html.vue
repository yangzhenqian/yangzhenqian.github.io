<template><h1 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h1>
<h2 id="_1-什么是-react" tabindex="-1"><a class="header-anchor" href="#_1-什么是-react" aria-hidden="true">#</a> 1. 什么是 React</h2>
<p>用于构建用户界面的 JavaScript 库</p>
<h2 id="_2-什么是-jsx" tabindex="-1"><a class="header-anchor" href="#_2-什么是-jsx" aria-hidden="true">#</a> 2. 什么是 jsx</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> ele <span class="token operator">=</span> <span class="token operator">&lt;</span>h1<span class="token operator">></span>hello<span class="token punctuation">,</span>world<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这个有趣的标签语法既不是字符串也不是 html,它是 jsx
jsx 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖</p>
<ul>
<li>
<p>jsx JavaScript,不是模板语言(vue template),但具有 js 的所有功能</p>
</li>
<li>
<p>jsx 语法上更接近 JavaScript 而不是 HTML,所以 react dom 使用小驼峰命名来定义属性的名称
如: class -&gt; className tabindex -&gt; tabIndex</p>
</li>
<li>
<p>jsx 防止注入攻击(cross-site-scripting,跨站脚本)</p>
<ul>
<li>React DOM 在渲染所有输入内容之前，默认会进行转义</li>
<li>所有的内容在渲染之前都被转换成了字符串</li>
</ul>
</li>
<li>
<p>jsx 表示对象</p>
<ul>
<li>Babel 会把 jsx 转译成一个名为 React.createElement()函数调用</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token operator">&lt;</span>h1 className<span class="token operator">=</span><span class="token string">"greeting"</span><span class="token operator">></span>Hello<span class="token punctuation">,</span> world<span class="token operator">!</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span><span class="token punctuation">;</span>

<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 等价于<span class="token operator">:</span> <span class="token operator">--</span><span class="token operator">></span>

<span class="token keyword">const</span> element <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
<span class="token string">'h1'</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span><span class="token literal-property property">className</span><span class="token operator">:</span> <span class="token string">'greeting'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token string">'Hello, world!'</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul>
<li>react 并不强制要求使用 jsx</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 使用jsx编写 <span class="token operator">--</span><span class="token operator">></span>
<span class="token keyword">class</span> <span class="token class-name">Hello</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>div<span class="token operator">></span>Hello <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>toWhat<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>Hello toWhat<span class="token operator">=</span><span class="token string">"World"</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">,</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'root'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 不使用jsx编写 <span class="token operator">--</span><span class="token operator">></span>
<span class="token keyword">class</span> <span class="token class-name">Hello</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>toWhat<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>Hello<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">toWhat</span><span class="token operator">:</span> <span class="token string">'World'</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'root'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div></li>
</ul>
<p>共享组件之间的状态逻辑: render props 和高阶组件</p>
<h2 id="_3-css-in-react" tabindex="-1"><a class="header-anchor" href="#_3-css-in-react" aria-hidden="true">#</a> 3. css in react</h2>
<ol>
<li>行内样式</li>
</ol>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> red<span class="token punctuation">,</span> <span class="token literal-property property">backGround</span><span class="token operator">:</span> yellow <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="2">
<li>引入样式表</li>
</ol>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> <span class="token string">'./index.css'</span><span class="token punctuation">;</span> <span class="token comment">// index.less   index.scss</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="3">
<li>css module</li>
</ol>
<p>css 文件命名方式增加<code>module</code> ,如 <code>index.module.css</code></p>
<ol start="4">
<li>styled-component</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> styled-components
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// styles.js</span>
<span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">'styled-components'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> Wrapper <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
  height: 100%;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>使用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Wrapper <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./styles.js'</span><span class="token punctuation">;</span>

<span class="token operator">&lt;</span>Wrapper<span class="token operator">></span>hello<span class="token operator">&lt;</span><span class="token operator">/</span>Wrapper<span class="token operator">></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="5">
<li>classnames</li>
</ol>
<ul>
<li>合并多个类名</li>
<li>会过滤掉 falsy 的值</li>
</ul>
<p>classNames('active', { current: true, hasHead: false }, { isShow: true }); // =&gt; 'active current isShow'</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> classnames
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>使用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> cx <span class="token keyword">from</span> <span class="token string">'classNames'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Home</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> current<span class="token punctuation">,</span> isShow <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> boxClass <span class="token operator">=</span> <span class="token function">classNames</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">active</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">current</span><span class="token operator">:</span> current<span class="token punctuation">,</span>
    <span class="token literal-property property">isShow</span><span class="token operator">:</span> isShow<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token punctuation">{</span>boxClass<span class="token punctuation">}</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Home<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div></template>
