"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[747],{3119:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-9436601c",path:"/http/eventSource.html",title:"EventSource",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"简介",slug:"简介",children:[]},{level:2,title:"使用场景",slug:"使用场景",children:[{level:3,title:"EventSource 优势",slug:"eventsource-优势",children:[]},{level:3,title:"EventSource 劣势",slug:"eventsource-劣势",children:[]},{level:3,title:"普通HTTP请求与EventSource请求对比",slug:"普通http请求与eventsource请求对比",children:[]}]},{level:2,title:"EventSource 使用",slug:"eventsource-使用",children:[{level:3,title:"服务端配置",slug:"服务端配置",children:[]},{level:3,title:"客户端配置",slug:"客户端配置",children:[]},{level:3,title:"chatgpt为什么选择eventSource",slug:"chatgpt为什么选择eventsource",children:[]},{level:3,title:"总结",slug:"总结",children:[]}]}],filePathRelative:"http/eventSource.md",git:{updatedTime:1702025006e3,contributors:[{name:"yangzhenqian",email:"zhenqian.yang@i-tage.com",commits:1}]}}},1252:(n,s,a)=>{a.r(s),a.d(s,{default:()=>l});var e=a(6252);const t=a.p+"assets/img/image.c338152c.png",p=a.p+"assets/img/image-1.693433aa.png",c=(0,e.uE)('<h1 id="eventsource" tabindex="-1"><a class="header-anchor" href="#eventsource" aria-hidden="true">#</a> EventSource</h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>server-sent events（缩写SSE）。EventSource 基于http协议的单向通信。IE兼容解决的办法: npm install event-source-polyfill。可以自动重连接；</p><h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h2><ul><li>数据监控</li><li>IM及时聊天</li><li>消息推送</li><li>chatgpt使用EventSource来进行消息实时通信的</li></ul><h3 id="eventsource-优势" tabindex="-1"><a class="header-anchor" href="#eventsource-优势" aria-hidden="true">#</a> EventSource 优势</h3><ul><li>简单易用：EventSource API非常简单，易于使用和理解。</li><li>服务器推送：EventSource适用于服务器主动向客户端推送数据，客户端只能接收服务器发送的事件。</li><li>自动重连：EventSource会自动处理连接断开和重新连接的情况，适用于长期保持连接并接收事件流的场景。</li><li>兼容性：EventSource在大多数现代浏览器中得到支持。</li></ul><h3 id="eventsource-劣势" tabindex="-1"><a class="header-anchor" href="#eventsource-劣势" aria-hidden="true">#</a> EventSource 劣势</h3><ul><li>单向通信: 只支持服务端到客户端的推送</li><li>数据限制: 不支持二进制数据，只支持普通的文本数据</li></ul><h3 id="普通http请求与eventsource请求对比" tabindex="-1"><a class="header-anchor" href="#普通http请求与eventsource请求对比" aria-hidden="true">#</a> 普通HTTP请求与EventSource请求对比</h3><ol><li>EventSource请求返回结果不在Response选项，取而代之的是EventStream；</li><li>EventSource请求头 Content-Type设置为 text/event-stream；</li></ol><ul><li>普通请求图 <img src="'+t+'" alt=""></li><li>EventSource请求图 <img src="'+p+'" alt=""></li></ul><h2 id="eventsource-使用" tabindex="-1"><a class="header-anchor" href="#eventsource-使用" aria-hidden="true">#</a> EventSource 使用</h2><ul><li>关闭链接 <ol><li>客户端监听error事件关闭链接</li><li>服务端发送特定的event事件关闭链接</li><li>客户端不触发close关闭，服务端触发关闭会造成重连</li></ol></li></ul><h3 id="服务端配置" tabindex="-1"><a class="header-anchor" href="#服务端配置" aria-hidden="true">#</a> 服务端配置</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;http&#39;</span><span class="token punctuation">)</span>\nhttp<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    res<span class="token punctuation">.</span><span class="token function">writeHead</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        <span class="token string-property property">&#39;Content-Type&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;text/event-stream&#39;</span><span class="token punctuation">,</span> <span class="token comment">//设置header头</span>\n        <span class="token string-property property">&#39;Access-Control-Allow-Origin&#39;</span><span class="token operator">:</span><span class="token string">&#39;*&#39;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token keyword">const</span> timer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>\n        <span class="token keyword">const</span> date <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">date</span><span class="token operator">:</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>\n        <span class="token keyword">var</span> content <span class="token operator">=</span> <span class="token string">&#39;event: data\\n&#39;</span><span class="token operator">+</span><span class="token string">&quot;data:&quot;</span><span class="token operator">+</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;\\n\\n&quot;</span><span class="token punctuation">;</span>\n        res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//正常发送信息</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">)</span>\n    res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//主动关闭链接</span>\n    <span class="token comment">// 监听客户端关闭</span>\n    res<span class="token punctuation">.</span>connection<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&quot;close&quot;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">clearInterval</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Client closed connection. Aborting.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n \n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span>\n\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="客户端配置" tabindex="-1"><a class="header-anchor" href="#客户端配置" aria-hidden="true">#</a> 客户端配置</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// 建立EventSource链接</span>\n<span class="token keyword">let</span> server <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EventSource</span><span class="token punctuation">(</span><span class="token string">&quot;http://localhost:3000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// 监听对应的消息</span>\nserver<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">ev</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ev<span class="token punctuation">,</span> <span class="token string">&#39;add&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  server<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// 无法监听服务端/客户端关闭</span>\n<span class="token comment">// server.addEventListener(&#39;close&#39;, () =&gt; {</span>\n<span class="token comment">//   console.log(1234);</span>\n<span class="token comment">// })</span>\n<span class="token comment">// server.onclose = () =&gt; {</span>\n<span class="token comment">//   console.log(123);</span>\n<span class="token comment">// }</span>\n<span class="token comment">// setTimeout(() =&gt;{server.close()},5000)</span>\n\n<span class="token comment">// 使用error事件监听服务端关闭</span>\nserver<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">ev</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ev<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  server<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token comment">// 监听消息开启</span>\nserver<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;open&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">ev</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ev<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="chatgpt为什么选择eventsource" tabindex="-1"><a class="header-anchor" href="#chatgpt为什么选择eventsource" aria-hidden="true">#</a> chatgpt为什么选择eventSource</h3><ul><li>服务器推送：EventSource专注于服务器向客户端主动推送事件的模型，ChatGPT作为一个长期运行的服务，当有新的回复时，服务器可以主动推送给客户端，而不需要客户端频繁发送请求。</li><li>自动重连和错误处理：EventSource具有内置的自动重连机制，它会自动处理连接断开和重新连接的情况。这对于ChatGPT对话而言很重要，因为对话可能需要持续一段时间，连接的稳定性很重要。</li><li>简单性和易用性：相对于WebSocket，EventSource的API更加简单易用，只需实例化一个EventSource对象，并处理服务器发送的事件即可。这使得开发者可以更快速地实现对话功能;</li><li>广泛的浏览器支持：EventSource在大多数现代浏览器中得到广泛支持，包括移动端浏览器。相比之下，WebSocket在某些旧版本的浏览器中可能不被完全支持，需要考虑兼容性问题。</li></ul><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>EventSource 是 HTML5 中一个强大的 API，提供了简单可靠的服务器推送机制，用于实现实时通信。</p><p>与 WebSocket 相比，EventSource 的优势在于其简单易用、自动重连、轻量级和跨域支持。然而，它也有一些限制，如单向通信和较低的浏览器支持。相比之下，WebSocket 适用于双向通信、大规模应用和实时性要求较高的场景，但其复杂性和穿越防火墙的挑战也需要考虑。</p><p>总的来说，EventSource 是一种非常有用的 API，适用于许多实时应用场景，如实时股票报价、即时聊天、实时通知等。它提供了一种简单而可靠的方式来建立服务器推送连接，并实现实时更新和通知。如果应用程序只需要服务器向客户端单向推送数据，EventSource 是一个不错的选择。然而，如果需要双向通信或更高级的实时功能，WebSocket 可能更适合。</p>',24),o={},l=(0,a(3744).Z)(o,[["render",function(n,s){return c}]])},3744:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,e]of s)a[n]=e;return a}}}]);