<template><h1 id="debug-源码" tabindex="-1"><a class="header-anchor" href="#debug-源码" aria-hidden="true">#</a> debug 源码</h1>
<h2 id="vite-最初的-demo" tabindex="-1"><a class="header-anchor" href="#vite-最初的-demo" aria-hidden="true">#</a> Vite 最初的 demo</h2>
<p>尤雨溪三年的代码,仓库地址 <a href="https://github.com/vuejs/vue-dev-server/tree/master" target="_blank" rel="noopener noreferrer">vue-dev-server<OutboundLink/></a></p>
<h2 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/vuejs/vue-dev-server.git
<span class="token builtin class-name">cd</span> vue-dev-server
<span class="token function">yarn</span> run <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<h3 id="_1-1-vscode-调试代码" tabindex="-1"><a class="header-anchor" href="#_1-1-vscode-调试代码" aria-hidden="true">#</a> 1.1 vscode 调试代码</h3>
<p><img src="/images/vite/vscode-debugger.png" alt=""></p>
<h3 id="_1-2-源码剖析" tabindex="-1"><a class="header-anchor" href="#_1-2-源码剖析" aria-hidden="true">#</a> 1.2 源码剖析</h3>
<p>可以先注释掉红框部分,打开控制台看看 network 都请求了哪些资源</p>
<p><img src="/images/vite/entry.png" alt=""></p>
</template>
