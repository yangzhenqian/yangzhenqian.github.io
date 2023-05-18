<template><h1 id="vue2-核心功能" tabindex="-1"><a class="header-anchor" href="#vue2-核心功能" aria-hidden="true">#</a> vue2 核心功能</h1>
<ol>
<li>响应式</li>
<li>模板编译</li>
<li>虚拟 dom (vdom)</li>
</ol>
<h2 id="响应式" tabindex="-1"><a class="header-anchor" href="#响应式" aria-hidden="true">#</a> 响应式</h2>
<h4 id="不得不提的-object-defineproperty" tabindex="-1"><a class="header-anchor" href="#不得不提的-object-defineproperty" aria-hidden="true">#</a> 不得不提的 Object.defineProperty</h4>
<h5 id="object-defineproperty-obj-prop-descriptor" tabindex="-1"><a class="header-anchor" href="#object-defineproperty-obj-prop-descriptor" aria-hidden="true">#</a> Object.defineProperty(obj, prop, descriptor)</h5>
<ul>
<li>obj: 必须。目标对象</li>
<li>prop: 必须。 需定义或修改属性的名字</li>
<li>descriptor: 必须。目标属性所拥有的他特性
<ul>
<li>value
被定义的属性默认为 undefined</li>
<li>wraitable
是否可以被重写。 true 为可重写，false 为不可重写</li>
<li>enumerable
是否可以被枚举(for...in 或 Object.keys())。 true 为可枚举，false 为不可枚举</li>
<li>configurable
是否可以删除或修改目标属性。true 为可以删除或修改目标属性，false 则不能被删除或者修改目标属性</li>
</ul>
</li>
</ul>
<h5 id="存取器-getter-setter" tabindex="-1"><a class="header-anchor" href="#存取器-getter-setter" aria-hidden="true">#</a> 存取器 getter/setter</h5>
<p><code>当使用了getter或setter方法不允许使用value和writable这两个属性</code></p>
<ul>
<li>getter 当访问改属性时，该方法会被执行。函数的返回值会作为该属性的值返回</li>
<li>setter 当属性值修改时，该方法会被执行。该方法接受唯一参数，即改属性新的参数值</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'ray'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> msg <span class="token operator">=</span> <span class="token string">'hello'</span><span class="token punctuation">;</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'newkey'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> msg<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">set</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    msg <span class="token operator">=</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取值</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>newkey<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// hello</span>
<span class="token comment">// 设置值</span>
obj<span class="token punctuation">.</span>newkey <span class="token operator">=</span> <span class="token string">'hello,world'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>newkey<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// hello world</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="模板编译" tabindex="-1"><a class="header-anchor" href="#模板编译" aria-hidden="true">#</a> 模板编译</h2>
<p>简单来讲，就是将 template 编译成 render 函数的过程，这个过程大致可以分为三个阶段</p>
<ul>
<li>解析阶段</li>
</ul>
<p>将模板字符串转换为 ast</p>
<ul>
<li>优化阶段</li>
</ul>
<p>对 ast 进行静态节点标记，主要用来做 vdom 的渲染优化</p>
<ul>
<li>生成阶段</li>
</ul>
<p>通过 ast 生成代码字符串，并最终生成 render 函数</p>
<p>看看 vue-template-compiler 源码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token function">createCompilerCreator</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">baseCompile</span> <span class="token punctuation">(</span>
  template<span class="token punctuation">,</span> <span class="token comment">// 模板字符串</span>
  options
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 第一步  将模板字符串转换为 ast</span>
  <span class="token keyword">var</span> ast <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 第二步  对 ast 进行静态节点标记，主要用来做 vdom 的渲染优化</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>optimize <span class="token operator">!==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">optimize</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 第三步 通过 ast 生成代码字符串，并最终生成 render 函数</span>
  <span class="token keyword">var</span> code <span class="token operator">=</span> <span class="token function">generate</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    ast<span class="token operator">:</span> ast<span class="token punctuation">,</span>
    render<span class="token operator">:</span> code<span class="token punctuation">.</span>render<span class="token punctuation">,</span>
    staticRenderFns<span class="token operator">:</span> code<span class="token punctuation">.</span>staticRenderFns
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="解析阶段" tabindex="-1"><a class="header-anchor" href="#解析阶段" aria-hidden="true">#</a> 解析阶段</h3>
<p>先看看解析出来的 ast 到底是什么</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// index.js</span>
<span class="token keyword">const</span> compiler <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vue-template-compiler'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> template <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;div id='app'>{{message}}&lt;/div></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> compiler<span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>template<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>执行代码</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>node index.js
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>解析结果</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"ast"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 1-元素节点 2-带变量的文本节点 3-纯文本节点</span>
    <span class="token property">"tag"</span><span class="token operator">:</span> <span class="token string">"div"</span><span class="token punctuation">,</span>
    <span class="token property">"attrsList"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"id"</span><span class="token punctuation">,</span> <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"app"</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"attrsMap"</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"app"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"rawAttrsMap"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"children"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token property">"type"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token property">"expression"</span><span class="token operator">:</span> <span class="token string">"_s(message)"</span><span class="token punctuation">,</span> <span class="token property">"tokens"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token property">"@binding"</span><span class="token operator">:</span> <span class="token string">"message"</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token property">"text"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"{{message}}"</span><span class="token punctuation">,</span> <span class="token property">"static"</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"plain"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">"attrs"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"id"</span><span class="token punctuation">,</span> <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"\"app\""</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"static"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">"staticRoot"</span><span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"render"</span><span class="token operator">:</span> <span class="token string">"with(this){return _c('div',{attrs:{\"id\":\"app\"}},[_v(_s(message))])}"</span><span class="token punctuation">,</span>
  <span class="token property">"staticRenderFns"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"errors"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"tips"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>精简一下</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"tag"</span><span class="token operator">:</span> <span class="token string">"div"</span><span class="token punctuation">,</span>
    <span class="token property">"parent"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"children"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token property">"type"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token property">"expression"</span><span class="token operator">:</span> <span class="token string">"_s(message)"</span><span class="token punctuation">,</span> <span class="token property">"tokens"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token property">"@binding"</span><span class="token operator">:</span> <span class="token string">"message"</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"text"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"{{message}}"</span><span class="token punctuation">,</span> <span class="token property">"static"</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 文本节点编译前的字符串</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="vue-是如何将模板字符串解析成-ast-语法树的" tabindex="-1"><a class="header-anchor" href="#vue-是如何将模板字符串解析成-ast-语法树的" aria-hidden="true">#</a> vue 是如何将模板字符串解析成 ast 语法树的</h4>
<h5 id="来看看源码" tabindex="-1"><a class="header-anchor" href="#来看看源码" aria-hidden="true">#</a> 来看看源码</h5>
<!-- vue-template-compiler/build.js -->
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token operator">...</span>


  <span class="token comment">// 通过一个栈来维护dom的层级</span>
  <span class="token keyword">var</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">// 抽象语法树的根节点，在解析的过程中，会不断给它添加子孙节点</span>
  <span class="token keyword">var</span> root<span class="token punctuation">;</span>
  <span class="token comment">// 当前解析内容的父节点</span>
  <span class="token keyword">var</span> currentParent<span class="token punctuation">;</span>

  <span class="token function">parseHTML</span><span class="token punctuation">(</span>template<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// 匹配到开始标签时的回调</span>
    <span class="token comment">// 当匹配到开始标签，会创建一个元素类型的树节点，如果当前不存在根节点，则设置为根节点，如不存在，则将其设置为currentParent的子节点</span>
    <span class="token comment">// 然后将当前节点压入stack栈中，并将它设置为currentParent</span>
    <span class="token function-variable function">start</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">start</span> <span class="token punctuation">(</span><span class="token parameter">tag<span class="token punctuation">,</span> attrs<span class="token punctuation">,</span> unary</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// tag为当前的标签名</span>
      <span class="token comment">// attrs为当前标签上的属性列表</span>
      <span class="token comment">// unary 当前标签是否为闭合标签</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 匹配到结束标签时的回调</span>
    <span class="token comment">// 匹配到结束标签时会从栈中弹出一个节点，并将栈中的最后一个节点设置为currentParent</span>
    <span class="token function-variable function">end</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">end</span> <span class="token punctuation">(</span><span class="token parameter">tag<span class="token punctuation">,</span> start</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 匹配到文本节点的回调</span>
    <span class="token comment">// 匹配到文本节点后，会有text进一步分析，判断是静态字符串还是{{}}绑定的字符串变量，创建不同的文本节点，并将其设置为currentParent的子节点</span>
    <span class="token function-variable function">chars</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">chars</span> <span class="token punctuation">(</span><span class="token parameter">text<span class="token punctuation">,</span> start<span class="token punctuation">,</span> end</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 匹配到注释节点的回调，其处理逻辑跟文本处理逻辑相似</span>
    <span class="token function-variable function">comment</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">comment</span> <span class="token punctuation">(</span><span class="token parameter">text<span class="token punctuation">,</span> start<span class="token punctuation">,</span> end</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token operator">...</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><h5 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h5>
<p><code>思路：</code></p>
<p>以<code>&lt;</code>为标识符，代表一个开始标签或者结束标签，如果是开始标签，代表树的层级加了一层，如果是结束标签代表层级回退了一层。同时每一层都要记录他的父元素</p>
<p>用一个栈去维护层级，有开始标签则入栈，结束标签则出栈，标签之前若是文本节点，文本节点不对栈进行操作</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 解析模板字符串为AST语法树
 *
 * 模板字符串的截取步骤
 * 0 &lt;div>111&lt;p>222&lt;/p>&lt;/div>
 * 1 111&lt;p>222&lt;/p>&lt;/div>
 * 2 &lt;p>222&lt;/p>&lt;/div>
 * 3 222&lt;/p>&lt;/div>
 * 4 &lt;/p>&lt;/div>
 * 5 &lt;/div>
 * 6 ""
 */</span>

<span class="token keyword">const</span> template <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;div>111&lt;p>222&lt;/p>&lt;/div></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">parseHTML</span><span class="token punctuation">(</span><span class="token parameter">template</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 定义栈</span>
  <span class="token keyword">let</span> root<span class="token punctuation">;</span> <span class="token comment">// 定义根节点</span>
  <span class="token keyword">let</span> currentParent<span class="token punctuation">;</span> <span class="token comment">// 当前父元素，维护层级关系</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> index <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'&lt;'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 说明是文本节点</span>
      <span class="token keyword">const</span> text <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 定义文本节点结构</span>
      <span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token punctuation">{</span>
        type<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        parent<span class="token operator">:</span> currentParent<span class="token punctuation">,</span>
        text<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
      currentParent<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
      template <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">[</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token string">'/'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> gtIndex <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 说明是开始标签</span>
      <span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token punctuation">{</span>
        type<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        tag<span class="token operator">:</span> template<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> gtIndex<span class="token punctuation">)</span><span class="token punctuation">,</span>
        parent<span class="token operator">:</span> currentParent<span class="token punctuation">,</span>
        children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>

      <span class="token comment">// 判断根节点是否存在，如果根节点不存在，将当前元素设置为根节点，否则push到当前父元素的children中</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        root <span class="token operator">=</span> element<span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        currentParent<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 入栈</span>
      currentParent <span class="token operator">=</span> element<span class="token punctuation">;</span> <span class="token comment">// 对当前父元素进行赋值</span>
      template <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>gtIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 截取字符串</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 说明是结束标签</span>

      <span class="token keyword">const</span> gtIndex <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 出栈</span>
      currentParent <span class="token operator">=</span> stack<span class="token punctuation">[</span>stack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 对当前父元素进行赋值</span>
      template <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>gtIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 截取字符串</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> root<span class="token punctuation">;</span> <span class="token comment">// 返回根节点</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br></div></div><p>好了，上面是最基本的模板字符串的处理，接下来还要处理关键的<code>{{}}</code></p>
<p><code>思路：</code></p>
<p>就是判断<code>{{&quot;{&quot;}}{{&quot;{&quot;}}</code>和<code>{{&quot;}&quot;}}{{&quot;}&quot;}}</code>,然后取出中间的变量(值、表达式等)</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">parseText</span><span class="token punctuation">(</span><span class="token parameter">text</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> originText <span class="token operator">=</span> text<span class="token punctuation">;</span>
  <span class="token keyword">let</span> type <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token comment">// 2-带变量的文本节点 3-纯文本节点</span>
  <span class="token keyword">let</span> tokens <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>text<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> start <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'{{'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> end <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'}}'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 存在插值变量</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>start <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> end <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      type <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

      <span class="token comment">// start>0 说明前面还有纯文本;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>start <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        tokens<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>text<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> start<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">let</span> exp <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>start <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">,</span> end<span class="token punctuation">)</span><span class="token punctuation">;</span>
      tokens<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">_s(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>exp<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      text <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>end <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      tokens<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      text <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> element <span class="token operator">=</span> <span class="token punctuation">{</span>
    text<span class="token operator">:</span> originText<span class="token punctuation">,</span>
    type<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    element<span class="token punctuation">.</span>expression <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>tokens<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">'+'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> element<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p>结合起来</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> template <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;div>{{msg1}}&lt;p>{{msg2}}&lt;/p>&lt;/div></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">parseHTML</span><span class="token punctuation">(</span><span class="token parameter">template</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 定义栈</span>
  <span class="token keyword">let</span> root<span class="token punctuation">;</span> <span class="token comment">// 定义根节点</span>
  <span class="token keyword">let</span> currentParent<span class="token punctuation">;</span> <span class="token comment">// 当前父元素，维护层级关系</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> index <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'&lt;'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 说明是文本节点</span>
      <span class="token keyword">const</span> text <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 定义文本节点结构</span>
      <span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token function">parseText</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
      currentParent<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
      template <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">[</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token string">'/'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> gtIndex <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 说明是开始标签</span>
      <span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token punctuation">{</span>
        type<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        tag<span class="token operator">:</span> template<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> gtIndex<span class="token punctuation">)</span><span class="token punctuation">,</span>
        parent<span class="token operator">:</span> currentParent<span class="token punctuation">,</span>
        children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>

      <span class="token comment">// 判断根节点是否存在，如果根节点不存在，将当前元素设置为根节点，否则push到当前父元素的children中</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        root <span class="token operator">=</span> element<span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        currentParent<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 入栈</span>
      currentParent <span class="token operator">=</span> element<span class="token punctuation">;</span> <span class="token comment">// 对当前父元素进行赋值</span>
      template <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>gtIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 截取字符串</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 说明是结束标签</span>

      <span class="token keyword">const</span> gtIndex <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 出栈</span>
      currentParent <span class="token operator">=</span> stack<span class="token punctuation">[</span>stack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 对当前父元素进行赋值</span>
      template <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>gtIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 截取字符串</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> root<span class="token punctuation">;</span> <span class="token comment">// 返回根节点</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">parseText</span><span class="token punctuation">(</span><span class="token parameter">text</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> originText <span class="token operator">=</span> text<span class="token punctuation">;</span>
  <span class="token keyword">let</span> type <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token comment">// 2-带变量的文本节点 3-纯文本节点</span>
  <span class="token keyword">let</span> tokens <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>text<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> start <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'{{'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> end <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'}}'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 存在插值变量</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>start <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> end <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      type <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

      <span class="token comment">// start>0 说明前面还有纯文本;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>start <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        tokens<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>text<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> start<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">let</span> exp <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>start <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">,</span> end<span class="token punctuation">)</span><span class="token punctuation">;</span>
      tokens<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">_s(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>exp<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      text <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>end <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      tokens<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      text <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> element <span class="token operator">=</span> <span class="token punctuation">{</span>
    text<span class="token operator">:</span> originText<span class="token punctuation">,</span>
    type<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    element<span class="token punctuation">.</span>expression <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>tokens<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">'+'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> element<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">parseHTML</span><span class="token punctuation">(</span>template<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br></div></div><p><code>那么到这里，是不是对vue组件中template下只能有一个根元素的问题恍然大悟了 ？</code></p>
<h3 id="生成阶段" tabindex="-1"><a class="header-anchor" href="#生成阶段" aria-hidden="true">#</a> 生成阶段</h3>
<p>将 ast 转换成 render 函数</p>
<p>先看一下源码中的实现</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// vue-template-compiler/build.js</span>

<span class="token operator">...</span>

<span class="token keyword">function</span> <span class="token function">generate</span> <span class="token punctuation">(</span>
  <span class="token parameter">ast<span class="token punctuation">,</span>
  options</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> state <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CodegenState</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> code <span class="token operator">=</span> ast <span class="token operator">?</span> <span class="token punctuation">(</span>ast<span class="token punctuation">.</span>tag <span class="token operator">===</span> <span class="token string">'script'</span> <span class="token operator">?</span> <span class="token string">'null'</span> <span class="token operator">:</span> <span class="token function">genElement</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">'_c("div")'</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    render<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token string">"with(this){return "</span> <span class="token operator">+</span> code <span class="token operator">+</span> <span class="token string">"}"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    staticRenderFns<span class="token operator">:</span> state<span class="token punctuation">.</span>staticRenderFns
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token operator">...</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>源码的实现的思路大致为：</p>
<ol>
<li>递归 ast，遇到元素节点则生成 <code>_c(标签名，属性对象，后代数组)</code> 格式的字符串</li>
<li>遇到文本节点，若是纯文本，则生成 <code>_v(文本字符串)</code> 格式的字符串</li>
<li>若是带变量的文本节点，则生成 <code>_v(_s(变量名))</code> 格式的字符串</li>
<li>为了能让变量能正常取到， 生成最后将字符串包一层 <code>with(this)</code></li>
<li>最后直接把字符串作为函数体生成一个函数，挂载到<code>vm.$options</code>上，在 vue 中可以<code>vm.$options.render</code>查看 render 函数</li>
<li>执行 render 函数，便生成了 vnode</li>
</ol>
<h4 id="接下来看一下-vue-中一些语法事件等经过模板编译出来是什么样的" tabindex="-1"><a class="header-anchor" href="#接下来看一下-vue-中一些语法事件等经过模板编译出来是什么样的" aria-hidden="true">#</a> 接下来看一下 Vue 中一些语法事件等经过模板编译出来是什么样的</h4>
<ul>
<li>插值</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{ msg }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!--  `with(this){return _c('div',{attrs:{"id":"app"}},[_v(_s(msg))])}` --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li>插值表达式</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{msg ? '张三' : '李四'}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- `with(this){return _c('div',{attrs:{"id":"app"}},[_v(_s(msg))])}` --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>v-if 和 v-show</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>vshow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>我是v-show<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- `with(this){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(vshow),expression:"vshow"}]},[_v("我是v-show")])}` --></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>vIf<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>我是v-if<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- `with(this){return (vIf)?_c('div',[_v("我是v-if")]):_e()}` --></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>type===1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>张三<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-else</span><span class="token punctuation">></span></span>李四<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- `with(this){return _c('div',{attrs:{"id":"app"}},[(type===1)?_c('span',[_v("张三")]):_c('span',[_v("李四")])])}` --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><ul>
<li>v-for</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item,index) in 3<span class="token punctuation">"</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{item}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- `with(this){return _c('div',_l((3),function(item,index){return _c('span',{key:index},[_v(_s(item))])}),0)}` --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>v-bind</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>imgUrl<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>img</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name"><span class="token namespace">v-bind:</span>src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>imgUrl<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>img</span><span class="token punctuation">></span></span>

 <span class="token comment">&lt;!-- `with(this){return _c('img',{attrs:{"src":imgUrl}})}` --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul>
<li>v-model</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

<span class="token comment">&lt;!-- `with(this){return _c('input',{directives:[{name:"model",rawName:"v-model",value:(name),expression:"name"}],attrs:{"type":"text"},domProps:{"value":(name)},on:{"input":function($event){if($event.target.composing)return;name=$event.target.value}}})}` --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><code>vue模板编译v-model的时候其实就是监听oninput事件，并将输入的值赋值给绑定的变量</code></p>
<ul>
<li>click 事件</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleClick<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>点击<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name"><span class="token namespace">v-on:</span>click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleClick<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>点击<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- `with(this){return _c('div',{on:{"click":handleClick}},[_v("点击")])}` --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="虚拟-dom" tabindex="-1"><a class="header-anchor" href="#虚拟-dom" aria-hidden="true">#</a> 虚拟 dom</h2>
<p>简单来说就是一个 js 对象，用来描述当前 dom 长什么样</p>
<p>好处：</p>
<ol>
<li>提升性能
操作 js 对象很快，但操作 dom 元素很慢。直接操作 dom 会很耗性能
视图通过 vdom 来描述，当数据发生改变时，可以将新旧 vnode 进行对比，找到哪里发生了改变，再去对应的 dom 上改变相应元素，这样会大大的提升性能</li>
<li>跨平台（因为是用 js 描述的，那么能用 js 的都可以使用 vdom）</li>
</ol>
<p>vdom 机制中最核心的是 patch，patch 逻辑是基于<code>snabbdom</code>库，patch 的过程为：</p>
<ul>
<li>patch 函数接受两个参数：旧的 vdom 和新的 vdom</li>
<li>当第一次挂载时旧的 vdom 是一个真实 dom,则单独处理</li>
<li>后续更新时，分为如下三种情况
<ul>
<li>新节点不存在，则删除对应的 dom</li>
<li>新旧节点标签或文本不一样，则创建新 dom 并替换旧 dom</li>
<li>旧节点不存在，新节点存在，则创建新 dom,并在旧 dom 后添加新 dom</li>
<li>递归以上逻辑（同级比较，深度遍历）</li>
</ul>
</li>
</ul>
</template>
