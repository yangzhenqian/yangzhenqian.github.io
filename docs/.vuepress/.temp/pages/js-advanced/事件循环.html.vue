<template><h1 id="事件循环机制-event-loop" tabindex="-1"><a class="header-anchor" href="#事件循环机制-event-loop" aria-hidden="true">#</a> 事件循环机制（event loop）</h1>
<p>要理解事件循环机制,先熟悉 js 内存机制</p>
<h2 id="js-内存机制" tabindex="-1"><a class="header-anchor" href="#js-内存机制" aria-hidden="true">#</a> js 内存机制</h2>
<p>js 具有自动垃圾回收机制,所以对于前端开发来说,内存空间并不是一个经常被提及的概念</p>
<p>在 js 中,每一个数据都需要一个存储空间.内存空间又分为两种: <strong>栈内存(stack)与堆内存(heap)</strong></p>
<h2 id="栈与堆" tabindex="-1"><a class="header-anchor" href="#栈与堆" aria-hidden="true">#</a> 栈与堆</h2>
<h3 id="栈" tabindex="-1"><a class="header-anchor" href="#栈" aria-hidden="true">#</a> 栈</h3>
<p><strong>栈内存一般存储基础数据类型</strong></p>
<ul>
<li>Number</li>
<li>String</li>
<li>Boolean</li>
<li>Symbol</li>
<li>null</li>
<li>undefined</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>定义一个变量 a,系统自动为我们分配存储空间.我们可以直接操作保存在栈内存空间的值,因此技术数据类型都是<code>按值访问</code></p>
<h3 id="堆" tabindex="-1"><a class="header-anchor" href="#堆" aria-hidden="true">#</a> 堆</h3>
<p><strong>堆内存一般存储引用数据类型</strong></p>
<ul>
<li>Object</li>
<li>Array</li>
<li>Function(<strong>函数的主体内容存在于堆中,但函数的引用地址是存在栈中的,函数执行的时候在栈里执行</strong>)</li>
<li>Date</li>
<li>...</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 变量a存在于栈中,{ name: 'xuhairui' }作为对象存在于堆内存中</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'xuhairui'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 变量b存在于栈中,[1, 2, 3]作为对象存在于堆内存中</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>所以当要访问堆内存中的引用数据类型时,实际上是<code>先从栈中获取了该对象的地址引用(或者地址指针)</code>,然后<code>再从堆内存中取得我们所要的数据</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> m <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">20</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> n <span class="token operator">=</span> m<span class="token punctuation">;</span>
n<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 15</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><img src="/images/js/heap.jpg" alt=""></p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>栈:</p>
<ul>
<li>存储基本数据类型</li>
<li>按值访问</li>
<li>存储的大小固定</li>
<li>由系统自动分配内存空间</li>
<li>空间小,运行效率高</li>
<li><strong>先进后出,后进先出</strong>(队列是先进先出)</li>
<li>栈中的 DOM，ajax，setTimeout 会依次进入到队列中,当栈中代码执行完毕后，再将队列中的事件放到执行栈中依次执行</li>
<li>微任务与宏任务</li>
</ul>
<p>堆:</p>
<ul>
<li>存储引用数据类型</li>
<li>按引用访问</li>
<li>存储的值大小不定,可动态调整</li>
<li>主要用来存放对象</li>
<li>空间大,但是运行效率相对较低</li>
<li>无需存储,可根据引用直接获取</li>
</ul>
<h2 id="浏览器循环事件" tabindex="-1"><a class="header-anchor" href="#浏览器循环事件" aria-hidden="true">#</a> 浏览器循环事件</h2>
<p>JavaScript 代码的执行过程中，除了依靠函数调用<code>栈</code>来搞定函数的执行顺序外，还依靠任务队列(task queue)来搞定另外一些代码的执行。整个执行过程，我们称为事件循环过程。一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。任务队列又分为 macro-task（宏任务）与 micro-task（微任务），在最新标准中，它们被分别称为 task 与 jobs。</p>
<h3 id="宏任务" tabindex="-1"><a class="header-anchor" href="#宏任务" aria-hidden="true">#</a> 宏任务</h3>
<p>宏任务大致包括：</p>
<ul>
<li>script（整体代码）</li>
<li>setTimeout</li>
<li>setInterval</li>
<li>setImmediate</li>
<li>I/O</li>
<li>UI render</li>
</ul>
<h3 id="微任务" tabindex="-1"><a class="header-anchor" href="#微任务" aria-hidden="true">#</a> 微任务</h3>
<p>微任务大致包括：</p>
<ul>
<li>process.nextTick</li>
<li>Promise</li>
<li>Async/await（实际就是 promise）</li>
<li>MutationObserver(html5 新特性)</li>
</ul>
<p>流程图大致如下：</p>
<img src="https://tva1.sinaimg.cn/large/00831rSTly1gcfr5av3d5j30zk0hc3zm.jpg" style="zoom:50%;" />
<p>总结：执行宏任务，然后执行宏任务产生的微任务，若微任务在执行过程中产生新的微任务，则继续执行新产生的微任务，所有的微任务执行完毕后，再回到宏任务中进行下一轮循环。例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script start'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async1 end'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async2 end'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Promise'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script end'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>执行结果</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>script start
async2 end
Promise
script end
async1 end
promise1
promise2
setTimeout
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>执行过程:</p>
<ul>
<li>执行过程,输出&quot;script start&quot;;</li>
<li>执行 async1(),调用 async2(),输出&quot;async2 end&quot;,此时将会保留 async1 函数的上下文,然后跳出 async1 函数;</li>
<li>遇到 setTimeout 函数,放入到宏任务中;</li>
<li>执行 Promise,输出&quot;Promise&quot;,遇到.then,产生第一个微任务;</li>
<li>输出&quot;script end&quot;;</li>
<li>当前宏任务执行完毕,开始执行当前宏任务产生的微任务,输出&quot;promise1&quot;,遇到.then,产生新的微任务;</li>
<li>执行新产生的微任务,输出&quot;promise2&quot;;当前微任务队列执行完毕,执行权回到 async1</li>
<li>输出&quot;async1 end&quot;;</li>
<li>最后执行下一个宏任务,输出&quot;setTimeout&quot;</li>
</ul>
<p>Async/await 执行顺序:</p>
<ul>
<li>
<p>如果 await 后面直接跟的一个一个变量,如 await 1,这种情况相当于直接把 await 后面的代码注册为一个微任务;</p>
</li>
<li>
<p>如果 await 后面跟的是一个异步函数的调用,如下面的例子:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script start'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async1 end'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async2 end'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async2 end1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Promise'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script end'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>那么最后打印的值依次为:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>script start
async2 end
Promise
script end
async2 end1
promise1
promise2
async1 end
setTimeout
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></li>
</ul>
<h2 id="node-事件循环" tabindex="-1"><a class="header-anchor" href="#node-事件循环" aria-hidden="true">#</a> node 事件循环</h2>
<p>node 中也有宏任务和微任务</p>
<h3 id="宏任务-1" tabindex="-1"><a class="header-anchor" href="#宏任务-1" aria-hidden="true">#</a> 宏任务</h3>
<ul>
<li>setTimeout</li>
<li>setInterval</li>
<li>setImmediate</li>
<li>script(整体代码)</li>
<li>I/O 操作等</li>
</ul>
<h3 id="微任务-1" tabindex="-1"><a class="header-anchor" href="#微任务-1" aria-hidden="true">#</a> 微任务</h3>
<ul>
<li>process.nextTick()</li>
<li>new Promise().then(回调)等</li>
</ul>
<h4 id="node-的事件循环的阶段顺序为" tabindex="-1"><a class="header-anchor" href="#node-的事件循环的阶段顺序为" aria-hidden="true">#</a> node 的事件循环的阶段顺序为：</h4>
<p>输入数据阶段(incoming data)-&gt;轮询阶段(poll)-&gt;检查阶段(check)-&gt;关闭事件回调阶段(close callback)-&gt;定时器检测阶段(timers)-&gt;I/O 事件回调阶段(I/O callbacks)-&gt;闲置阶段(idle, prepare)-&gt;轮询阶段...</p>
<h4 id="timers-阶段的执行时机变化" tabindex="-1"><a class="header-anchor" href="#timers-阶段的执行时机变化" aria-hidden="true">#</a> timers 阶段的执行时机变化</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'timer1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'timer2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><ul>
<li>
<p>如果版本是 node11+,一旦执行一个阶段里的一个宏任务就立刻执行微任务队列,这就跟浏览器端运行一致,最后的结果为:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>timer1
promise1
timer2
promise2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li>
<li>
<p>如果版本是 node10 及以前,得看第一个定时器执行完,第二个定时器是否在完成队列中</p>
<ul>
<li>
<p>如果第二个定时器还未在完成队列中,最后的结果为:</p>
<p>timer1=&gt;promise1=&gt;timer2=&gt;promise2</p>
</li>
<li>
<p>如果第二个定时器已经在完成队列中,最后的结果为:</p>
<p>timer1=&gt;timer2=&gt;promise1=&gt;promise2</p>
</li>
</ul>
</li>
</ul>
<p>总结: 如果是 node11 版本一旦执行一个阶段里的一个宏任务(setTimeout,setInterval 和 setImmediate)就立刻执行对应的微任务队列。</p>
<h2 id="node-和浏览器-eventloop-的主要区别" tabindex="-1"><a class="header-anchor" href="#node-和浏览器-eventloop-的主要区别" aria-hidden="true">#</a> node 和浏览器 EventLoop 的主要区别</h2>
<p>两者最主要的区别在于浏览器中的微任务是在每个相应的宏任务中执行的，而 nodejs 中的微任务是在不同阶段之间执行的。</p>
</template>
