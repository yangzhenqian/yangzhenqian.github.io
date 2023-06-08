# threejs

## WebGL是什么？

WebGL是一种三维绘图标准，该绘图标准允许把js和openGl结合在一起，这样Web开发人员就可以借助硬件在浏览器中更流畅的展示三维模型和模型， 以创建复杂的导航和数据视觉化；

## threejs是什么？

threejs是一款基于原生WebGL的三维引擎框架（库）, 该框架在WebGL的API基础上以简单，直观的方式封装了三维图形的常用对象，因此大大减少了程序员在Web前端开发三维图形应用的工作量，threejs还使用了很多图形引擎的高级技巧，极大的提高了应用性能；

## 本地运行threejs官网项目
本地运行可访问官网实例 & 文档，避免每次查询问题需访问官网，官网处于外网，访问过慢的问题
- github地址  https://github.com/mrdoob/three.js
- git克隆仓库地址  https://github.com/mrdoob/three.js.git
- 文件目录
  - examples 官网实例文件
  - docs 官网文档文件
下载项目
- 下载npm包 http-server 作用：在某文件下面生成可访问的链接（默认端口8080）；
- 运行
  - 进入某文件夹下运行http-server，输入127.0.0.1:8080/访问文件夹下内容
## 三维模型基础组成

### 第一个场景
```js
// 创建第一个场景
import * as THREE from 'three';
// 创建场景
let scene = new THREE.Scene();
// 设置场景背景颜色
scene.background = new THREE.Color('#1C1C28');
// 创建透视相机
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); //视角范围，相机长宽比 ，最近距离， 最远距离
camera.position.set(0,0,0); //设置相机位置
camera.lookAt(0,0,0); //设置相机看向位置
// 创建render渲染器
let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// 将渲染器插入指定的div盒子中
document.body.appendChild( renderer.domElement );
```
### 场景 Scene

场景作为three集合体，所有需要显示的几何体都需要添加到场景中

```js
// 创建场景
let scene = new THREE.Scene();
// 设置场景背景颜色
scene.background = new THREE.Color('#1C1C28');
// 线性雾 fog  雾的密度是随着距离线性增大的
scene.fog = new THREE.Fog('#ffffff', 1, 1000); // (雾化颜色， 雾化影响起始距离， 雾化影响最远距离)
// 指数雾 FogExp2  可以在相机附近提供清晰的视野，且距离相机越远，雾的浓度随着指数增长越快
scene.fog = new THREE.FogExp2('#ffffff', 0.025); // (雾化颜色， 雾化指数：默认0.025)
```
- 常用属性
  - children 用于储存场景中所有几何体
  - fog 雾化
  - background 背景色
  - environment: Texture 若该值不为null，则该纹理贴图将会被设为场景中所有物理材质的环境贴图，不会覆盖已单独赋值的提如图
  - overrideMaterial: Material  若不为空，则强制场景中所有几何体材质设置为该值

- 常用方法
  - add() 增加几何体
  - remove() 删除几何体
  - getObjectByName() 获取指定名称的几何体
  - tranverse() 传入一个函数，遍历所有几何体对象

### 相机 Camera

#### 正交相机 （OrthographicCamera）

无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。

```js
//(左侧面，右侧面， 上侧面， 下侧面， 近端， 远端)
const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
scene.add( camera );
```

#### 透视相机 （PerspectiveCamera）

这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。距离越远物体越小。

```js
//(视角，视锥体长宽比，近端， 远端)
const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
scene.add( camera );
```

![](/images/three/camera.png)



