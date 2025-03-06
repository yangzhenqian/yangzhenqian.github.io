<template><h1 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h1>
<h2 id="类型判断" tabindex="-1"><a class="header-anchor" href="#类型判断" aria-hidden="true">#</a> 类型判断</h2>
<p>判断数据类型有以下三种方式:</p>
<ul>
<li>
<p>typeof</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">typeof</span> <span class="token string">'123'</span><span class="token punctuation">;</span> <span class="token comment">// 'string'</span>
<span class="token keyword">typeof</span> <span class="token number">100</span><span class="token punctuation">;</span> <span class="token comment">// 'number'</span>
<span class="token keyword">typeof</span> <span class="token number">NaN</span><span class="token punctuation">;</span> <span class="token comment">// 'number'</span>
<span class="token keyword">typeof</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 'boolean'</span>
<span class="token keyword">typeof</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'symbol'</span>
<span class="token keyword">typeof</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// 'object'</span>
<span class="token keyword">typeof</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// 'undefined'</span>
<span class="token keyword">typeof</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 'object'</span>
<span class="token keyword">typeof</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 'object'</span>
<span class="token keyword">typeof</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'function'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>从上面的输出结果可以看出:</p>
<ul>
<li>null 的判断有误差,输出为 object</li>
<li>操作符对对象类型及其子类型，例如函数（可调用对象）、数组（有序索引对象）等进行判定，则除了函数都会得到 <code>object</code> 的结果。</li>
</ul>
</li>
<li>
<p>instanceof</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">Array</span>  <span class="token comment">// true</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token keyword">instanceof</span> <span class="token class-name">Object</span> <span class="token comment">// true</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">Object</span> <span class="token comment">// true</span>
<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token keyword">instanceof</span> <span class="token class-name">Array</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><code>arr</code> 数组相当于 <code>new Array()</code> 出的一个实例，所以 <code>arr.__proto__ === Array.prototype</code>，又因为 <code>Array</code>属于 <code>Object</code> 子类型，即<code>Array.prototype.__proto__ === Object.prototype</code>，因此 <code>Object</code> 构造函数在 <code>arr</code> 的原型链上。所以 <code>instanceof</code> 仍然无法优雅的判断一个值到底属于数组还是普通对象。</p>
</li>
<li>
<p>(推荐) Object.prototype.toString.call()</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token comment">// "[object String]"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// "[object Number]"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment">// "[object Boolean]"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// "[object Null]"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token comment">// "[object undefined]"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "[object Symbol]"</span>

<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// "[object Array]"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// "[object Object]"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// "[object Function]"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "[object Function]"</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "[object Function]"</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>使用这种方法任何类型都能准确判断出来,需要理解下面三点:</p>
<ul>
<li>该方法本质就是依托<code>Object.prototype.toString()</code>方法得到对象内部属性 <code>[[Class]]</code></li>
<li>所有数据类型都是对象的一种类型，而Object.prototype.toString可以返回当前调用者的对象类型。</li>
<li>传入原始类型却能够判定出结果是因为对值进行了包装</li>
<li><code>null</code> 和 <code>undefined</code> 能够输出结果是内部实现有做处理</li>
<li><code>call()</code>是为了改变<code>Object.prototype.toString</code>这个函数都指向。让<code>Object.prototype.toString</code>这个方法指向我们所传入的数据。</li>
</ul>
<p>可以将上述方法,进行一个简单的封装:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">judgeType</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> toString <span class="token operator">=</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>toString<span class="token punctuation">;</span>
  <span class="token keyword">let</span> dataType <span class="token operator">=</span> <span class="token function">toString</span>
    <span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\[object\s(.+)\]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">'$1'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> dataType<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function">judgeType</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'string'</span>
<span class="token function">judgeType</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'number'</span>
<span class="token function">judgeType</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'true'</span>
<span class="token function">judgeType</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'null'</span>
<span class="token function">judgeType</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'undefined'</span>
<span class="token function">judgeType</span><span class="token punctuation">(</span><span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'symbol'</span>

<span class="token function">judgeType</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'array'</span>
<span class="token function">judgeType</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'object'</span>
<span class="token function">judgeType</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'function'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div></li>
</ul>
<h2 id="与" tabindex="-1"><a class="header-anchor" href="#与" aria-hidden="true">#</a> == 与 ===</h2>
<ol>
<li>全等 === : 不会类型转换,必须要数据类型和值完全一致</li>
</ol>
<ul>
<li>对于<code>基本数据类型</code>,两边的值要一致才相等,注意 NaN 不等于任何数,包括自己</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">null</span> <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token keyword">undefined</span> <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token number">NaN</span> <span class="token operator">===</span> <span class="token number">NaN</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>对于<code>复杂数据类型</code>,两边的引用地址要一致,才相等</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
arr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
arr3 <span class="token operator">=</span> arr1<span class="token punctuation">;</span>

arr1 <span class="token operator">===</span> arr2<span class="token punctuation">;</span> <span class="token comment">// false</span>
arr1 <span class="token operator">===</span> arr3<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ol start="2">
<li>相等 == : 非严格匹配,在一定条件下会进行<code>类型转换</code> (隐式转换), 分以下 5 种情况</li>
</ol>
<ul>
<li>x 和 y 都是 null 或 undefined , 不会类型转换 , 无条件返回 true</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">null</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token keyword">undefined</span> <span class="token operator">==</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token keyword">null</span> <span class="token operator">==</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>x 或 y 是 NaN , NaN 不等于任何数字 , 不会类型转换 , 无条件为返回 false</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token number">NaN</span> <span class="token operator">==</span> <span class="token number">NaN</span><span class="token punctuation">;</span> <span class="token comment">// false;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="3">
<li>x 和 y 都是 Number,String ,Boolean</li>
</ol>
<p><code>如果x和y类型不一样,会进行类型转换,会将不是Number类型的转换为Number类型</code>;</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
<span class="token number">1</span> <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">;</span>       <span class="token comment">// 1 == Number(true)  =>  1 == 1  => true</span>
<span class="token number">1</span> <span class="token operator">==</span> <span class="token string">'true'</span><span class="token punctuation">;</span>     <span class="token comment">// 1 == Number('true') => 1 == NaN => false</span>
<span class="token number">1</span> <span class="token operator">==</span> <span class="token string">'1'</span><span class="token punctuation">;</span>        <span class="token comment">// 1 == Number('1') => 1 == 1 => true</span>
<span class="token boolean">true</span> <span class="token operator">==</span> <span class="token string">'true'</span><span class="token punctuation">;</span>  <span class="token comment">// Number(true) == Number('true') => 1 == NaN => false</span>

<span class="token literal-property property">注意</span><span class="token operator">:</span> <span class="token function">逻辑非</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">)</span> 的优先级高于关系运算符 <span class="token punctuation">,</span> 会将值先转换为Boolean类型
<span class="token number">1</span> <span class="token operator">==</span> <span class="token operator">!</span><span class="token string">'true'</span><span class="token punctuation">;</span>     <span class="token comment">//  1 == !Boolean('true') => 1 == !true => 1 == false => 1 == Number(false) => 1 == 0 => false</span>
<span class="token number">0</span> <span class="token operator">==</span> <span class="token operator">!</span><span class="token string">'true'</span><span class="token punctuation">;</span>     <span class="token comment">//  0 == !Boolean('true') => 0 == !true => 0 == false => 0 == Number(false) => 0 == 0 => true</span>

<span class="token literal-property property">注意</span><span class="token operator">:</span> Boolean类型在<span class="token number">8</span>种假值情况下为<span class="token boolean">false</span>
<span class="token number">8</span><span class="token literal-property property">中假值分别为</span><span class="token operator">:</span> <span class="token operator">+</span><span class="token number">0</span> <span class="token operator">-</span><span class="token number">0</span> <span class="token number">0</span> <span class="token keyword">null</span> <span class="token keyword">undefined</span> <span class="token number">NaN</span> <span class="token boolean">false</span> <span class="token string">''</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token operator">+</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><ol start="4">
<li>x 和 y 有一个是引用数据类型 , 会先获取引用数据类型的原始值</li>
</ol>
<p>引用数据类型的原始值: 先调用 Symbol.toPrimitive，再调用 valueOf(),接着调用 toString();</p>
<p>valueOf(): 一般默认返回自身;</p>
<p>数组的 toSting() : 默认会调用 join() 方法拼接成字符串;</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// [].valueOf().toString() == 1 => [].join() == 1 => '' == 1 => Number('') == 1 => 0 ==1 => false</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// {}.valueOf() == 1 => {}.toString() == 1 => '[obejct Object]' == 1 => Number('[obejct Object]') == 1 => NaN == 1 => false</span>

<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">'1,2,3'</span> <span class="token comment">// [1,2,3].toString() == '1,2,3' => [1,2,3].join() == '1,2,3' => '1,2,3' == '1,2,3' => true</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">==</span> <span class="token string">'[object Object]'</span><span class="token punctuation">;</span> <span class="token comment">// {}.toString() == '[object Object]'  => '[object Object]' == '[object Object]' => true</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ol start="5">
<li>x 和 y 都为引用类型
<code>只比较引用地址,地址一致,则为true</code></li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
arr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
arr3 <span class="token operator">=</span> arr1<span class="token punctuation">;</span>
arr1 <span class="token operator">==</span> arr2 <span class="token comment">// false</span>
arr3 <span class="token operator">==</span> arr1 <span class="token comment">// true</span>

<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// false</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">==</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// false</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>扩展 如何使得 (a==1 &amp;&amp; a==2 &amp;&amp; a==3) 的值为 true ?</p>
<p><code>思路:1.利用隐式转换规则 2.Object.defineProperty</code>;</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token number">1.</span> 利用隐式转换规则
<span class="token comment">// a是一个对象</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
   <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
   <span class="token function-variable function">toString</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> a<span class="token punctuation">.</span>value<span class="token operator">++</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
或者
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
   <span class="token literal-property property">value</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
   <span class="token function-variable function">valueOf</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> a<span class="token punctuation">.</span>value<span class="token operator">++</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token operator">==</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> a<span class="token operator">==</span><span class="token number">2</span> <span class="token operator">&amp;&amp;</span> a<span class="token operator">==</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">// true</span>

<span class="token comment">// a是一个数组</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token operator">==</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> a<span class="token operator">==</span><span class="token number">2</span> <span class="token operator">&amp;&amp;</span> a<span class="token operator">==</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">// true</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><ol start="2">
<li>利用 Object.defineProperty()</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>window<span class="token punctuation">,</span> <span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> value<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> a <span class="token operator">==</span> <span class="token number">2</span> <span class="token operator">&amp;&amp;</span> a <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="indexof-和-includes-的区别" tabindex="-1"><a class="header-anchor" href="#indexof-和-includes-的区别" aria-hidden="true">#</a> indexOf() 和 includes() 的区别</h2>
<p>唯一区别 : includes 能区分出 NaN</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">NaN</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
arr<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// -1</span>
arr<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="jsonp-与-ajax" tabindex="-1"><a class="header-anchor" href="#jsonp-与-ajax" aria-hidden="true">#</a> jsonp 与 ajax</h2>
<p>首先我们应该知道 ajax 和 jsonp 可以与后台通信，获取数据和信息，但是又不用刷新整个页面，实现页面的局部刷新</p>
<h3 id="ajax" tabindex="-1"><a class="header-anchor" href="#ajax" aria-hidden="true">#</a> ajax</h3>
<ul>
<li>
<p>ajax 是一种发送 http 请求与后台进行异步通讯的技术。其原理是实例化 xmlhttp 对象，使用此对象与后台通信。 一个完整的 AJAX 请求一般包括以下步骤：</p>
<ul>
<li>实例化 XMLHttpRequest 对象</li>
<li>连接服务器</li>
<li>发送请求</li>
<li>接收响应数据</li>
</ul>
</li>
<li>
<p>ajax 支持 get 和 post 请求</p>
</li>
</ul>
<h3 id="jsonp" tabindex="-1"><a class="header-anchor" href="#jsonp" aria-hidden="true">#</a> jsonp</h3>
<ul>
<li>
<p>jsonp 是一种可以实现跨域发送 http 请求的数据通信格式，可以嵌在 ajax 中使用。其原理是利用 <code>script 标签可以跨域链接资源的特性</code>。</p>
</li>
<li>
<p>由两部分组成：回调函数和数据</p>
<ul>
<li>回调函数一般是在浏览器控制，作为参数发往服务器端（当然，你也可以固定回调函数的名字，但客户端和服务器端的名称一定要一致）。当服务器响应时，服务器端就会把该<code>函数和数据拼成字符串</code>返回。</li>
<li>JSONP 的请求过程如下：
<ul>
<li>请求阶段：浏览器创建一个 script 标签，并给其 src 赋值。</li>
<li>发送请求：当给 script 的 src 赋值时，浏览器就会发起一个请求。</li>
<li>数据响应：服务端将要返回的数据作为<code>参数和函数名称拼接在一起</code>(格式类似”jsonpCallback({name: 'abc'})”)返回。当浏览器接收到了响应数据，由于发起请求的是 script，所以相当于直接调用 jsonpCallback 方法，并且传入了一个参数</li>
</ul>
</li>
</ul>
</li>
<li>
<p>jsonp 只支持 get 请求</p>
</li>
</ul>
<h3 id="用-koa-模拟-jsonp-请求" tabindex="-1"><a class="header-anchor" href="#用-koa-模拟-jsonp-请求" aria-hidden="true">#</a> 用 koa 模拟 jsonp 请求</h3>
<p><img src="/images/js/jsonp.jpg" alt=""></p>
</template>
