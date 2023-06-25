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

![](/images/three/camera.jpg)


### 渲染器 webglRenderer

将场景用webgl渲染出来

```js

// 创建render渲染器
let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// 将渲染器插入指定的div盒子中
document.body.appendChild( renderer.domElement );

```

- 常用属性
  - context 将渲染器加入已有的渲染环境中
  - antialias 抗锯齿 默认false， 开启抗锯齿放大后更平滑

- 常用方法
  - setSize() 更改canvas大小
  - getContext() 获取当前环境
#### CSS2DRenderer
  是CSS3D简化版，仅支持平移，主要用于将html元素跟三维元素进行绑定显示，各个DOM元素也被包含到一个CSS2DObject实例中，并被添加到场景图中。
#### CSS3DRenderer
  将3d变换通过dom方式显示出来，不支持材质，几何体等属性，也可以用作DOM跟三维模型结合显示；

### 几何体 bufferGeometry

用于描述点，线，面的基础对象，包含顶点坐标，顶点向量，颜色，uv值等;

r125版本之前支持两种基础创建方式 geometry && bufferGeometry, r125版本之后不再支持 geometry；

bufferGeometry对于geometry，渲染时少一层转化，所以相对于性能好，geometry写法相对于简单一点；

bufferGeometry相对于性能好，geometry相对于开发者较好

#### bufferGeometry 缓存几何体

```js
    let start = new THREE.Vector3(1,1,1);
    let end = new THREE.Vector3(2,2,2);
    let pointsArray = [start, end];
    let geometry = new THREE.BufferGeometry();
    // 第一种
    let lineGeometry1 = geometry.setFromPoints(pointsArray);
    // 第二种
    let pointArray = new THREE.Float32Array([1,1,1,2,2,2]);
    // 通过属性直接设置顶点坐标
    let lineGeometry2 = geometry.setAttribute( 'position', new THREE.BufferAttribute( pointsArray, 3 ) );// (坐标点数组，几个值为一个点)
    //设置名称
    lineGeometry2.name = 'test';
```
BufferAttribute 这个类是用于储存bufferGeometry相关的attribute（坐标，颜色，uv等），利用BufferAttribute可以高效的给cpu传递数据
- 常用属性
  - attributes 同js一样，用于存储当前几何体的属性
  - groups 将几何体分为组渲染，可以给每个单独组设置不同的属性
  - name 当前几何体名称，后续可以通过getObjectByName获取到改对象
- 常用方法
  - setAttribute(name, attributes) 设置attributes属性
  - getAttribute(name) 获取attributes属性
  - deleteAttribute(name) 删除指定属性
  - addGroup(group) 添加一个group组
  - clone() 克隆当前几何体
  - copy(bufferGeometry) 复制其他几何体属性
  - dispose() 从内存中销毁对象
  - scale(x,y,z) 缩放
  - setFromPoints(pointArray) 通过点队列设置几何体顶点
  - translate(x,y,z) 平移
  - rotateX(float) X轴旋转
  - lookAt(x,y,z) 几何体朝向的世界坐标

- threejs内部提供封装好的几何体，所有的封装几何体都继承于bufferGeometry类
  - BoxGeometry(长，宽， 高， 长分段数， 宽分段数， 高分段数) 正方形几何体，默认为1
  - CircleGeometry(半径，分段数值越高越圆，起始角度，需绘制角度) 圆形几何体
  - SphereGeometry(半径，经线分段数，纬线分段数，经线起始角度，经线绘制角度，纬线起始角度，纬线绘制角度) 球形几何体
  - PlaneGeometry(长，宽， 长分段数， 宽分段数) 平面几何体
  - CylinderGeometry(顶部半径，底部半径，高度，侧面分段数，高度分段数，是否封顶，起始角度，绘制角度) 圆柱几何体
  - EdgesGeometry(几何体，超过该角度才绘制) 边缘几何体，用于绘制几何体边线
  - textGeometry() 文本几何体
#### Geometry 普通几何体

```js
    let start = new THREE.Vector3(1,1,1);
    let end = new THREE.Vector3(2,2,2);
    let geometry = new THREE.Geometry();
    geometry.vertices.push(start);
    geometry.vertices.push(end);
```

### 材质



### 纹理贴图

### 光源

### 加载器

### 动画

### 字体

### status 状态检测器

### guis 外部操作按钮