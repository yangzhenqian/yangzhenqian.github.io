import{d as n}from"./app.c3ff6c08.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},p=n(`<h1 id="\u4E8B\u4EF6\u5FAA\u73AF\u673A\u5236-event-loop" tabindex="-1"><a class="header-anchor" href="#\u4E8B\u4EF6\u5FAA\u73AF\u673A\u5236-event-loop" aria-hidden="true">#</a> \u4E8B\u4EF6\u5FAA\u73AF\u673A\u5236\uFF08event loop\uFF09</h1><h2 id="\u6D4F\u89C8\u5668\u5FAA\u73AF\u4E8B\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u6D4F\u89C8\u5668\u5FAA\u73AF\u4E8B\u4EF6" aria-hidden="true">#</a> \u6D4F\u89C8\u5668\u5FAA\u73AF\u4E8B\u4EF6</h2><p>JavaScript \u4EE3\u7801\u7684\u6267\u884C\u8FC7\u7A0B\u4E2D\uFF0C\u9664\u4E86\u4F9D\u9760\u51FD\u6570\u8C03\u7528\u6808\u6765\u641E\u5B9A\u51FD\u6570\u7684\u6267\u884C\u987A\u5E8F\u5916\uFF0C\u8FD8\u4F9D\u9760\u4EFB\u52A1\u961F\u5217(task queue)\u6765\u641E\u5B9A\u53E6\u5916\u4E00\u4E9B\u4EE3\u7801\u7684\u6267\u884C\u3002\u6574\u4E2A\u6267\u884C\u8FC7\u7A0B\uFF0C\u6211\u4EEC\u79F0\u4E3A\u4E8B\u4EF6\u5FAA\u73AF\u8FC7\u7A0B\u3002\u4E00\u4E2A\u7EBF\u7A0B\u4E2D\uFF0C\u4E8B\u4EF6\u5FAA\u73AF\u662F\u552F\u4E00\u7684\uFF0C\u4F46\u662F\u4EFB\u52A1\u961F\u5217\u53EF\u4EE5\u62E5\u6709\u591A\u4E2A\u3002\u4EFB\u52A1\u961F\u5217\u53C8\u5206\u4E3A macro-task\uFF08\u5B8F\u4EFB\u52A1\uFF09\u4E0E micro-task\uFF08\u5FAE\u4EFB\u52A1\uFF09\uFF0C\u5728\u6700\u65B0\u6807\u51C6\u4E2D\uFF0C\u5B83\u4EEC\u88AB\u5206\u522B\u79F0\u4E3A task \u4E0E jobs\u3002</p><h3 id="\u5B8F\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#\u5B8F\u4EFB\u52A1" aria-hidden="true">#</a> \u5B8F\u4EFB\u52A1</h3><p>\u5B8F\u4EFB\u52A1\u5927\u81F4\u5305\u62EC\uFF1A</p><ul><li>script\uFF08\u6574\u4F53\u4EE3\u7801\uFF09</li><li>setTimeout</li><li>setInterval</li><li>setImmediate</li><li>I/O</li><li>UI render</li></ul><h3 id="\u5FAE\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#\u5FAE\u4EFB\u52A1" aria-hidden="true">#</a> \u5FAE\u4EFB\u52A1</h3><p>\u5FAE\u4EFB\u52A1\u5927\u81F4\u5305\u62EC\uFF1A</p><ul><li>process.nextTick</li><li>Promise</li><li>Async/await\uFF08\u5B9E\u9645\u5C31\u662F promise\uFF09</li><li>MutationObserver(html5 \u65B0\u7279\u6027)</li></ul><p>\u6D41\u7A0B\u56FE\u5927\u81F4\u5982\u4E0B\uFF1A</p><img src="https://tva1.sinaimg.cn/large/00831rSTly1gcfr5av3d5j30zk0hc3zm.jpg" style="zoom:50%;"><p>\u603B\u7ED3\uFF1A\u6267\u884C\u5B8F\u4EFB\u52A1\uFF0C\u7136\u540E\u6267\u884C\u5B8F\u4EFB\u52A1\u4EA7\u751F\u7684\u5FAE\u4EFB\u52A1\uFF0C\u82E5\u5FAE\u4EFB\u52A1\u5728\u6267\u884C\u8FC7\u7A0B\u4E2D\u4EA7\u751F\u65B0\u7684\u5FAE\u4EFB\u52A1\uFF0C\u5219\u7EE7\u7EED\u6267\u884C\u65B0\u4EA7\u751F\u7684\u5FAE\u4EFB\u52A1\uFF0C\u6240\u6709\u7684\u5FAE\u4EFB\u52A1\u6267\u884C\u5B8C\u6BD5\u540E\uFF0C\u518D\u56DE\u5230\u5B8F\u4EFB\u52A1\u4E2D\u8FDB\u884C\u4E0B\u4E00\u8F6E\u5FAA\u73AF\u3002\u4F8B\u5982\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;script start&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;async1 end&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;async2 end&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;setTimeout&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Promise&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;promise1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;promise2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;script end&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>\u6267\u884C\u7ED3\u679C</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>script start
async2 end
Promise
script end
async1 end
promise1
promise2
setTimeout
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u6267\u884C\u8FC7\u7A0B:</p><ul><li>\u6267\u884C\u8FC7\u7A0B,\u8F93\u51FA&quot;script start&quot;;</li><li>\u6267\u884C async1(),\u8C03\u7528 async2(),\u8F93\u51FA&quot;async2 end&quot;,\u6B64\u65F6\u5C06\u4F1A\u4FDD\u7559 async1 \u51FD\u6570\u7684\u4E0A\u4E0B\u6587,\u7136\u540E\u8DF3\u51FA async1 \u51FD\u6570;</li><li>\u9047\u5230 setTimeout \u51FD\u6570,\u653E\u5165\u5230\u5B8F\u4EFB\u52A1\u4E2D;</li><li>\u6267\u884C Promise,\u8F93\u51FA&quot;Promise&quot;,\u9047\u5230.then,\u4EA7\u751F\u7B2C\u4E00\u4E2A\u5FAE\u4EFB\u52A1;</li><li>\u8F93\u51FA&quot;script end&quot;;</li><li>\u5F53\u524D\u5B8F\u4EFB\u52A1\u6267\u884C\u5B8C\u6BD5,\u5F00\u59CB\u6267\u884C\u5F53\u524D\u5B8F\u4EFB\u52A1\u4EA7\u751F\u7684\u5FAE\u4EFB\u52A1,\u8F93\u51FA&quot;promise1&quot;,\u9047\u5230.then,\u4EA7\u751F\u65B0\u7684\u5FAE\u4EFB\u52A1;</li><li>\u6267\u884C\u65B0\u4EA7\u751F\u7684\u5FAE\u4EFB\u52A1,\u8F93\u51FA&quot;promise2&quot;;\u5F53\u524D\u5FAE\u4EFB\u52A1\u961F\u5217\u6267\u884C\u5B8C\u6BD5,\u6267\u884C\u6743\u56DE\u5230 async1</li><li>\u8F93\u51FA&quot;async1 end&quot;;</li><li>\u6700\u540E\u6267\u884C\u4E0B\u4E00\u4E2A\u5B8F\u4EFB\u52A1,\u8F93\u51FA&quot;setTimeout&quot;</li></ul><p>Async/await \u6267\u884C\u987A\u5E8F:</p><ul><li><p>\u5982\u679C await \u540E\u9762\u76F4\u63A5\u8DDF\u7684\u4E00\u4E2A\u4E00\u4E2A\u53D8\u91CF,\u5982 await 1,\u8FD9\u79CD\u60C5\u51B5\u76F8\u5F53\u4E8E\u76F4\u63A5\u628A await \u540E\u9762\u7684\u4EE3\u7801\u6CE8\u518C\u4E3A\u4E00\u4E2A\u5FAE\u4EFB\u52A1;</p></li><li><p>\u5982\u679C await \u540E\u9762\u8DDF\u7684\u662F\u4E00\u4E2A\u5F02\u6B65\u51FD\u6570\u7684\u8C03\u7528,\u5982\u4E0B\u9762\u7684\u4F8B\u5B50:</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;script start&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;async1 end&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;async2 end&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;async2 end1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;setTimeout&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Promise&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;promise1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;promise2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;script end&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>\u90A3\u4E48\u6700\u540E\u6253\u5370\u7684\u503C\u4F9D\u6B21\u4E3A:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>script start
async2 end
Promise
script end
async2 end1
promise1
promise2
async1 end
setTimeout
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></li></ul><h2 id="node-\u4E8B\u4EF6\u5FAA\u73AF" tabindex="-1"><a class="header-anchor" href="#node-\u4E8B\u4EF6\u5FAA\u73AF" aria-hidden="true">#</a> node \u4E8B\u4EF6\u5FAA\u73AF</h2><p>node \u4E2D\u4E5F\u6709\u5B8F\u4EFB\u52A1\u548C\u5FAE\u4EFB\u52A1</p><h3 id="\u5B8F\u4EFB\u52A1-1" tabindex="-1"><a class="header-anchor" href="#\u5B8F\u4EFB\u52A1-1" aria-hidden="true">#</a> \u5B8F\u4EFB\u52A1</h3><ul><li>setTimeout</li><li>setInterval</li><li>setImmediate</li><li>script(\u6574\u4F53\u4EE3\u7801)</li><li>I/O \u64CD\u4F5C\u7B49</li></ul><h3 id="\u5FAE\u4EFB\u52A1-1" tabindex="-1"><a class="header-anchor" href="#\u5FAE\u4EFB\u52A1-1" aria-hidden="true">#</a> \u5FAE\u4EFB\u52A1</h3><ul><li>process.nextTick()</li><li>new Promise().then(\u56DE\u8C03)\u7B49</li></ul><h4 id="node-\u7684\u4E8B\u4EF6\u5FAA\u73AF\u7684\u9636\u6BB5\u987A\u5E8F\u4E3A" tabindex="-1"><a class="header-anchor" href="#node-\u7684\u4E8B\u4EF6\u5FAA\u73AF\u7684\u9636\u6BB5\u987A\u5E8F\u4E3A" aria-hidden="true">#</a> node \u7684\u4E8B\u4EF6\u5FAA\u73AF\u7684\u9636\u6BB5\u987A\u5E8F\u4E3A\uFF1A</h4><p>\u8F93\u5165\u6570\u636E\u9636\u6BB5(incoming data)-&gt;\u8F6E\u8BE2\u9636\u6BB5(poll)-&gt;\u68C0\u67E5\u9636\u6BB5(check)-&gt;\u5173\u95ED\u4E8B\u4EF6\u56DE\u8C03\u9636\u6BB5(close callback)-&gt;\u5B9A\u65F6\u5668\u68C0\u6D4B\u9636\u6BB5(timers)-&gt;I/O \u4E8B\u4EF6\u56DE\u8C03\u9636\u6BB5(I/O callbacks)-&gt;\u95F2\u7F6E\u9636\u6BB5(idle, prepare)-&gt;\u8F6E\u8BE2\u9636\u6BB5...</p><h4 id="timers-\u9636\u6BB5\u7684\u6267\u884C\u65F6\u673A\u53D8\u5316" tabindex="-1"><a class="header-anchor" href="#timers-\u9636\u6BB5\u7684\u6267\u884C\u65F6\u673A\u53D8\u5316" aria-hidden="true">#</a> timers \u9636\u6BB5\u7684\u6267\u884C\u65F6\u673A\u53D8\u5316</h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;timer1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;promise1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;timer2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;promise2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><ul><li><p>\u5982\u679C\u7248\u672C\u662F node11+,\u4E00\u65E6\u6267\u884C\u4E00\u4E2A\u9636\u6BB5\u91CC\u7684\u4E00\u4E2A\u5B8F\u4EFB\u52A1\u5C31\u7ACB\u523B\u6267\u884C\u5FAE\u4EFB\u52A1\u961F\u5217,\u8FD9\u5C31\u8DDF\u6D4F\u89C8\u5668\u7AEF\u8FD0\u884C\u4E00\u81F4,\u6700\u540E\u7684\u7ED3\u679C\u4E3A:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>timer1
promise1
timer2
promise2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li><li><p>\u5982\u679C\u7248\u672C\u662F node10 \u53CA\u4EE5\u524D,\u5F97\u770B\u7B2C\u4E00\u4E2A\u5B9A\u65F6\u5668\u6267\u884C\u5B8C,\u7B2C\u4E8C\u4E2A\u5B9A\u65F6\u5668\u662F\u5426\u5728\u5B8C\u6210\u961F\u5217\u4E2D</p><ul><li><p>\u5982\u679C\u7B2C\u4E8C\u4E2A\u5B9A\u65F6\u5668\u8FD8\u672A\u5728\u5B8C\u6210\u961F\u5217\u4E2D,\u6700\u540E\u7684\u7ED3\u679C\u4E3A:</p><p>timer1=&gt;promise1=&gt;timer2=&gt;promise2</p></li><li><p>\u5982\u679C\u7B2C\u4E8C\u4E2A\u5B9A\u65F6\u5668\u5DF2\u7ECF\u5728\u5B8C\u6210\u961F\u5217\u4E2D,\u6700\u540E\u7684\u7ED3\u679C\u4E3A:</p><p>timer1=&gt;timer2=&gt;promise1=&gt;promise2</p></li></ul></li></ul><p>\u603B\u7ED3: \u5982\u679C\u662F node11 \u7248\u672C\u4E00\u65E6\u6267\u884C\u4E00\u4E2A\u9636\u6BB5\u91CC\u7684\u4E00\u4E2A\u5B8F\u4EFB\u52A1(setTimeout,setInterval \u548C setImmediate)\u5C31\u7ACB\u523B\u6267\u884C\u5BF9\u5E94\u7684\u5FAE\u4EFB\u52A1\u961F\u5217\u3002</p><h2 id="node-\u548C\u6D4F\u89C8\u5668-eventloop-\u7684\u4E3B\u8981\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#node-\u548C\u6D4F\u89C8\u5668-eventloop-\u7684\u4E3B\u8981\u533A\u522B" aria-hidden="true">#</a> node \u548C\u6D4F\u89C8\u5668 EventLoop \u7684\u4E3B\u8981\u533A\u522B</h2><p>\u4E24\u8005\u6700\u4E3B\u8981\u7684\u533A\u522B\u5728\u4E8E\u6D4F\u89C8\u5668\u4E2D\u7684\u5FAE\u4EFB\u52A1\u662F\u5728\u6BCF\u4E2A\u76F8\u5E94\u7684\u5B8F\u4EFB\u52A1\u4E2D\u6267\u884C\u7684\uFF0C\u800C nodejs \u4E2D\u7684\u5FAE\u4EFB\u52A1\u662F\u5728\u4E0D\u540C\u9636\u6BB5\u4E4B\u95F4\u6267\u884C\u7684\u3002</p>`,33);function t(e,o){return p}var u=s(a,[["render",t]]);export{u as default};
