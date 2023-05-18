<template><h1 id="multi-repo-mono-repo" tabindex="-1"><a class="header-anchor" href="#multi-repo-mono-repo" aria-hidden="true">#</a> multi-repo &amp; mono-repo</h1>
<p>两种代码风格仓库的管理风格</p>
<ul>
<li>multi-repo：把每个项目都分别用 git 托管</li>
<li>mono-repo： 统一用一个 git 仓库管理所有的项目</li>
</ul>
<h2 id="multi-repo" tabindex="-1"><a class="header-anchor" href="#multi-repo" aria-hidden="true">#</a> multi-repo</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// multi-repo</span>
root
<span class="token operator">|</span>── project<span class="token operator">-</span>a
<span class="token operator">|</span>   ├── <span class="token operator">...</span>
<span class="token operator">|</span>   └── <span class="token punctuation">.</span>git
├── project<span class="token operator">-</span>b
<span class="token operator">|</span>   ├── <span class="token operator">...</span>
<span class="token operator">|</span>   └── git
├── project<span class="token operator">-</span>c
<span class="token operator">|</span>   ├── <span class="token operator">...</span>
<span class="token operator">|</span>   └── <span class="token punctuation">.</span>git
├── project<span class="token operator">-</span>d
<span class="token operator">|</span>   ├── <span class="token operator">...</span>
<span class="token operator">|</span>   └── <span class="token punctuation">.</span>git
<span class="token operator">...</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>从上面可以看出多个项目对应多个仓库，大多数工程，其实都是以 multi-repo 方式管理的</p>
<ul>
<li>
<p>优势</p>
<p>可以让各项目团队根据需要定制更适合自己的 workflow</p>
</li>
<li>
<p>不足</p>
<ul>
<li>难以对所有项目统一进行操作（git checkout / npm publish / npm run build）</li>
<li>难以追踪依赖关系（a-&gt;b-&gt;c</li>
</ul>
</li>
</ul>
<h2 id="mono-repo" tabindex="-1"><a class="header-anchor" href="#mono-repo" aria-hidden="true">#</a> mono-repo</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// multi-repo</span>

├── <span class="token punctuation">.</span>git
├── lerna<span class="token punctuation">.</span>json
├── <span class="token keyword">package</span><span class="token punctuation">.</span>json
├── packages
    ├── project<span class="token operator">-</span>a
    <span class="token operator">|</span>    ├── <span class="token constant">README</span><span class="token punctuation">.</span>md
    <span class="token operator">|</span>    ├── __tests__
    <span class="token operator">|</span>    ├── lib
    <span class="token operator">|</span>    └── <span class="token keyword">package</span><span class="token punctuation">.</span>json
    ├── project<span class="token operator">-</span>b
    <span class="token operator">|</span>    ├── <span class="token constant">README</span><span class="token punctuation">.</span>md
    <span class="token operator">|</span>    ├── __tests__
    <span class="token operator">|</span>    ├── lib
    <span class="token operator">|</span>    └── <span class="token keyword">package</span><span class="token punctuation">.</span>json
    ├── project<span class="token operator">-</span>c
        ├── <span class="token constant">README</span><span class="token punctuation">.</span>md
        ├── __tests__
        ├── lib
        └── <span class="token keyword">package</span><span class="token punctuation">.</span>json
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>从上面可以看出一个仓库管理多个项目</p>
<ul>
<li>
<p>优势</p>
<ul>
<li>方便统一的操作各个项目</li>
<li>利用工具，可以方便的追踪项目间的依赖关系</li>
</ul>
</li>
<li>
<p>不足</p>
<ul>
<li>代码库随着业务发展会非常巨大</li>
<li>失去部分的灵活性（workflow 必须统一）</li>
<li>强依赖于 monorepo 的管理工具</li>
</ul>
</li>
</ul>
<h2 id="mono-repo-的管理-lerna" tabindex="-1"><a class="header-anchor" href="#mono-repo-的管理-lerna" aria-hidden="true">#</a> mono-repo 的管理-lerna</h2>
<p>为 js 生态下的 mono-repo 管理提供一站式的解决方案</p>
<h3 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h3>
<ul>
<li>整体作为一个 Git 仓库，也是个 npm 包（私有）</li>
<li>lerna.json 是整个 mmono-repo 的配置文件</li>
<li>每个真正的项目，平铺在 packages/中</li>
<li>整个项目可以统一管理所有依赖（也可以分别管理）</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// lerna</span>
├── <span class="token punctuation">.</span>git
├── lerna<span class="token punctuation">.</span>json
├── <span class="token keyword">package</span><span class="token punctuation">.</span>json
├── packages
    ├── project<span class="token operator">-</span>a
    <span class="token operator">|</span>    ├── <span class="token constant">README</span><span class="token punctuation">.</span>md
    <span class="token operator">|</span>    ├── __tests__
    <span class="token operator">|</span>    ├── lib
    <span class="token operator">|</span>    └── <span class="token keyword">package</span><span class="token punctuation">.</span>json
    ├── project<span class="token operator">-</span>b
    <span class="token operator">|</span>    ├── <span class="token constant">README</span><span class="token punctuation">.</span>md
    <span class="token operator">|</span>    ├── __tests__
    <span class="token operator">|</span>    ├── lib
    <span class="token operator">|</span>    └── <span class="token keyword">package</span><span class="token punctuation">.</span>json
    ├── project<span class="token operator">-</span>c
        ├── <span class="token constant">README</span><span class="token punctuation">.</span>md
        ├── __tests__
        ├── lib
        └── <span class="token keyword">package</span><span class="token punctuation">.</span>json
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="用-lerna-管理项目的相关" tabindex="-1"><a class="header-anchor" href="#用-lerna-管理项目的相关" aria-hidden="true">#</a> 用 lerna 管理项目的相关</h3>
<ol>
<li>安装 lerna</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 全局安装lerna</span>
<span class="token function">npm</span> i lerna <span class="token parameter variable">-g</span>
<span class="token comment"># 用lerna初始化一个项目</span>
lerna init
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>初始化的目录结构</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>- packages
  - lerna.json
  - package.json
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>lerna.json 文件中都有什么配置</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token comment">// 配置$schema可以在vscode中，鼠标滑倒每个配置项时候，可以看每个配置项的介绍</span>
  <span class="token comment">// 可以在https://www.schemastore.org/json/中网站查看知名项目的描述文件</span>
  <span class="token property">"$schema"</span><span class="token operator">:</span> <span class="token string">"http://json.schemastore.org/lerna"</span><span class="token punctuation">,</span>
  <span class="token property">"packages"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"packages/*"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"independent"</span> <span class="token comment">// 可以给各个项目发不同的版本</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ol start="2">
<li>添加项目依赖</li>
</ol>
<p>我们为 pac-1、 pac-2、pac-3 添加依赖关系，我们制造这样一种依赖，pac-1 模块被 pac-2 依赖；pac-2 模块被 pac-3 模块依赖， 这时候就形成了 pac-1、 pac-2、pac-3 间接依赖关系。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 制造依赖关系，对于内部项目的依赖，lerna会以软连接的形式，给它们相互软链接起来</span>
lerna <span class="token function">add</span> pac-1 packages/pac-2
lerna <span class="token function">add</span> pac-2 packages/pac-3
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>如果我们给项目添加外部依赖，可能需要给每个项目 node_moudles 都添加，同一个依赖会安装很多次，这显然不合理，为了解决这个问题，leran 可以把依赖添加到项目根目录；<code>lerna clean</code>去清除每个项目中 node_modules 相同的依赖;用 <code>lerna bootstrap --hoist</code>重新安装依赖，</p>
<ol start="3">
<li>发版</li>
</ol>
<p>需要注意是的 lerna.json 配置为&quot;version&quot;: &quot;independent&quot;时可以为每个包独立发不同的版本，如果&quot;version&quot;:'0.0.0'是发同样的版本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>lerna publish
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="4">
<li>其他</li>
</ol>
<p>可以用 lerna -h 查看全部指令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>lerna  <span class="token builtin class-name">exec</span> <span class="token punctuation">[</span>cmd<span class="token punctuation">]</span> <span class="token punctuation">[</span>args<span class="token punctuation">..</span>.<span class="token punctuation">]</span> <span class="token comment"># 执行每一个package.json你想指行的命令</span>
lerna run <span class="token operator">&lt;</span>script<span class="token operator">></span> <span class="token comment"># 执行package.josn 中script配置的命令</span>
lerna <span class="token function">diff</span> <span class="token punctuation">[</span>pkgName<span class="token punctuation">]</span> <span class="token comment"># 对比 文件变化</span>
lerna changed <span class="token comment"># 查看文件变化</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="mono-repo-的管理-pnpm" tabindex="-1"><a class="header-anchor" href="#mono-repo-的管理-pnpm" aria-hidden="true">#</a> mono-repo 的管理-pnpm</h2>
<p>速度快、节省磁盘空间的软件包管理器</p>
<h3 id="目录结构-1" tabindex="-1"><a class="header-anchor" href="#目录结构-1" aria-hidden="true">#</a> 目录结构</h3>
<p><img src="/images/engineering/pnpm.jpg" alt=""></p>
<h3 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h3>
<p>pnpm 的指令跟 yarn 类似</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 初始化monorepo</span>
<span class="token function">pnpm</span> init
<span class="token comment"># 安装所有依赖</span>
<span class="token function">pnpm</span> <span class="token function">install</span>
<span class="token comment"># 添加某个依赖</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token operator">&lt;</span>pkg<span class="token operator">></span>
<span class="token comment"># 相关命令的执行</span>
<span class="token function">pnpm</span> <span class="token operator">&lt;</span>cmd<span class="token operator">></span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="workspace" tabindex="-1"><a class="header-anchor" href="#workspace" aria-hidden="true">#</a> workspace</h3>
<p>在根目录下新建 <code>pnpm-workspace.yaml</code> 文件</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">packages</span><span class="token punctuation">:</span>
  <span class="token comment"># all packages in subdirs of packages/ and components/</span>
  <span class="token punctuation">-</span> <span class="token string">'packages/**'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>建议去除每个子项目的共同依赖，比如 react ，lodash 等，然后统一放入顶层的 package.json 内</p>
<p>在顶层安装全局依赖 -w</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>	<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-w</span> lodash
	<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> <span class="token parameter variable">-w</span> typescript
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>默认情况下，为了节省时间和空间，pnpm 会默认不在子项目中软链接顶层安装的全局依赖，如需关闭这一行为（不推荐），可以在项目根目录的 .npmrc 配置：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>shared-workspace-lockfile<span class="token operator">=</span>false
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="过滤" tabindex="-1"><a class="header-anchor" href="#过滤" aria-hidden="true">#</a> 过滤</h3>
<p>--filter</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token parameter variable">--filter</span> <span class="token operator">&lt;</span>package_selector<span class="token operator">></span> <span class="token operator">&lt;</span>command<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 将 ui-vite-ray 安装到 docs-vite 中</span>
<span class="token comment"># -r 表示只安装到子 package 中</span>
<span class="token comment"># 这里的 ui-vite-ray docs-vite 都是package.json 中的name</span>

<span class="token function">pnpm</span> i  ui-vite-ray <span class="token parameter variable">-r</span> <span class="token parameter variable">--filter</span> docs-vite
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>在安装后， docs-vite 中 ui-vite-ray 的位置会指向到 workspace ，这也是 monorepo 的精髓所在</p>
<p><img src="/images/engineering/workspace.jpg" alt=""></p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>pnpm 支持 workspace 协议 workspace: 当使用此协议时，pnpm 将拒绝解析除本地 workspace 包含的 package 之外的任何内容。 因此，如果您设置为 &quot;foo&quot;: &quot;workspace:2.0.0&quot; 时，安装将会失败，因为 &quot;foo@2.0.0&quot; 不存在于此 workspace 中</p>
</div>
</template>
