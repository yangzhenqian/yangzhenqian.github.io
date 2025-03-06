<template><h1 id="为什么选-vite" tabindex="-1"><a class="header-anchor" href="#为什么选-vite" aria-hidden="true">#</a> 为什么选 vite</h1>
<h2 id="现实问题" tabindex="-1"><a class="header-anchor" href="#现实问题" aria-hidden="true">#</a> 现实问题</h2>
<ol>
<li>在浏览器支持 ES 模块之前,JavaScript 并没有提供原生机制让开发者以模块化的方式进行开发,所以各种打包工具应运而生(webpack rollup parcel)</li>
<li>当我们构建越来越大型的应用,需要处理的 JavaScript 代码量也呈指数级增长,需要很长时间才能启动开发服务器,
即使使用 hmr,文件修改几秒后才能在浏览器中反映出来</li>
</ol>
<p>Vite 旨在利用生态系统中的新进展解决上述问题: 浏览器开始原生支持 es 模块,且越来越多 JavaScript 工具使用编译型语言编写</p>
<h3 id="缓慢的服务器启动" tabindex="-1"><a class="header-anchor" href="#缓慢的服务器启动" aria-hidden="true">#</a> 缓慢的服务器启动</h3>
<p>当冷启动开发服务器时,基于打包器的方式启动必须优先抓取并构建你的整个应用,然后才能提供服务</p>
<p>vite 通过在一开始将应用中的模块区分为 依赖 和 源码 两类,改进了开服务器的时间</p>
<ul>
<li>
<p><strong>依赖</strong> 大多为在开发时的不会变动的纯 JavaScript.一些较大的依赖(例如有上百个模块的组件库)处理代价也很高.依赖通常会存在多种模块化格式(esm commonjs)</p>
<p>Vite 将会使用 <a href="https://esbuild.github.io/" target="_blank" rel="noopener noreferrer">esbuild<OutboundLink/></a> <a href="https://cn.vitejs.dev/guide/dep-pre-bundling.html" target="_blank" rel="noopener noreferrer">预构建依赖<OutboundLink/></a> 采用 go 编写,比 JavaScript 编写的打包器预购建依赖快 10-100 倍</p>
</li>
<li>
<p><strong>源码</strong> 通常包含一些并非直接是 JavaScript 的文件,需要转换(jsx,css 或者 vue 组件),时常会被编辑.同时并不是所有的源码都需要同时被加载,如基于路由拆分的代码模块</p>
<p>Vite 以原生 esm(浏览器兼容性) 方式提供源码,实际是让浏览器接管打包程序的部分工作,Vite 只需要在浏览器请求源码时进行转换并按需提供源码</p>
<p><img src="https://cn.vitejs.dev/assets/bundler.37740380.png" alt=""></p>
<p><img src="https://cn.vitejs.dev/assets/esm.3070012d.png" alt=""></p>
</li>
</ul>
<h3 id="缓慢的更新" tabindex="-1"><a class="header-anchor" href="#缓慢的更新" aria-hidden="true">#</a> 缓慢的更新</h3>
<p>基于打包器的更新速度会随着应用体积增大而直线下降</p>
<p>在 Vite 中,hmr 是在原生 esm 上执行的.当编辑一个文件时,vite 只需精确地使已编辑的模块与其最近的 hmr 边界之间的链失活,这样无论应用大小,hmr 始终能快速更新</p>
<p>vite 还利用 http 头进行了缓存.</p>
<ul>
<li>源码模块的请求会根据 304 Not Modified 进行协商缓存</li>
<li>依赖模块请求会通过 cache-control:max-age=31536000,immutable 进行强缓存</li>
</ul>
<h2 id="生产环境仍需打包" tabindex="-1"><a class="header-anchor" href="#生产环境仍需打包" aria-hidden="true">#</a> 生产环境仍需打包</h2>
<p>虽然原生 esm 现在得到了广泛支持,但由于嵌套导入会导致额外的网络往返,在生产环境发布未打包的 esm 任然效率低下.为了在生产环境获取最佳的加载性能,最好还是将代码进行 tree-shaking 懒加载 和 chunk 分割</p>
<p>vite 附带了一套开箱即用的构建优化的构建命令,开箱即用</p>
<h3 id="为什么不用-esbuild-打包" tabindex="-1"><a class="header-anchor" href="#为什么不用-esbuild-打包" aria-hidden="true">#</a> 为什么不用 esbuild 打包</h3>
<p>目前针对构建应用的重要功能(代码分割和 css 处理方面)还在持续开发中,所以 vite 选了 rollup 打包,当 esbuild 稳定后,不排除使用 esbuild 的可能</p>
</template>
