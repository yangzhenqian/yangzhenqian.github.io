<template><h1 id="浏览器缓存" tabindex="-1"><a class="header-anchor" href="#浏览器缓存" aria-hidden="true">#</a> 浏览器缓存</h1>
<p>浏览器缓存分为协商缓存和强缓存</p>
<h2 id="协商缓存" tabindex="-1"><a class="header-anchor" href="#协商缓存" aria-hidden="true">#</a> 协商缓存</h2>
<p>浏览器强缓存失效或者请求头中设置了不走强缓存，并且请求头中设置了<code>If-Modified-Since</code>或<code>If-None-Match</code>时，会将这两个值发送到服务器去验证是否命中协商缓存，如果命中，会返回<code>304</code>状态,加载浏览器缓存，并且响应头会设置<code>Last-Modified</code>或<code>Etag</code>属性</p>
<p><code>http 1.1 优先级高</code></p>
<h5 id="if-modified-since-last-modified-http-1-0" tabindex="-1"><a class="header-anchor" href="#if-modified-since-last-modified-http-1-0" aria-hidden="true">#</a> If-Modified-Since/Last-Modified （http 1.0 ）</h5>
<ul>
<li>值为时间</li>
<li>服务端根据文件最后一次修改时间和 If-Modified-Since 的值进行比较，若相等则命中协商缓存，返回 304 状态，加载浏览器缓存</li>
</ul>
<h5 id="if-none-match-etag-http-1-1" tabindex="-1"><a class="header-anchor" href="#if-none-match-etag-http-1-1" aria-hidden="true">#</a> If-None-Match/Etag （http 1.1）</h5>
<ul>
<li>值为一串 hash 码，当服务端的文件发生变化时，它的 hash 码也会随之改变</li>
<li>通过请求头中的 If-None-Match 和和当前文件的 hash 值进行比较，若相等则命中协商缓存，返回 304 状态，加载浏览器缓存</li>
</ul>
<h2 id="强缓存" tabindex="-1"><a class="header-anchor" href="#强缓存" aria-hidden="true">#</a> 强缓存</h2>
<ul>
<li>不需要发送请求到服务器，直接读取浏览器缓存</li>
<li>http 状态码为 200</li>
<li>强缓存分为 <code>disk cache</code> 和 <code>memory cache</code>，存放的位置由浏览器控制</li>
<li>是否强缓存由 <code>Expires</code>、<code>Cache-control</code> 和 <code>Program</code> 三个 header 属性来控制</li>
</ul>
<h5 id="expires" tabindex="-1"><a class="header-anchor" href="#expires" aria-hidden="true">#</a> Expires</h5>
<ul>
<li>值为 http 日期</li>
<li>在浏览器发起请求前，会根据系统时间和 Expires 的值进行比较
<ul>
<li>若系统时间超过了 Expires 的值，则缓存失效</li>
</ul>
</li>
<li>修改系统时间会导致缓存有效期不准，所有<code>优先级最低</code></li>
</ul>
<h5 id="cache-control" tabindex="-1"><a class="header-anchor" href="#cache-control" aria-hidden="true">#</a> Cache-Control</h5>
<p><code>http 1.1</code> 新增属性</p>
<ul>
<li>max-age</li>
</ul>
<p>单位为秒，是距离发起的时间的秒数，超出间隔秒数则缓存失效</p>
<ul>
<li>no-cache</li>
</ul>
<p>不使用强缓存，需要与服务器验证是否新鲜(即使用协商缓存)</p>
<ul>
<li>no-store</li>
</ul>
<p>禁止使用缓存（包括协商缓存），每次都向服务器请求最新的资源</p>
<ul>
<li>private</li>
</ul>
<p>专用于个人的缓存，中间代理、cdn 等不能缓存此相应</p>
<ul>
<li>public</li>
</ul>
<p>缓存可以被中间代理、cdn 等缓存</p>
<ul>
<li>must-revalidate</li>
</ul>
<p>在缓存过期前可以使用，过期后必须向服务器验证</p>
<h5 id="program" tabindex="-1"><a class="header-anchor" href="#program" aria-hidden="true">#</a> Program</h5>
<p>只有一个属性值：no-cache，效果和 Cache-Control 中 no-cache 效果一致,不使用强缓存，需要与服务器验证是否新鲜，在这 3 个中 header 中<code>优先级最高</code></p>
</template>
