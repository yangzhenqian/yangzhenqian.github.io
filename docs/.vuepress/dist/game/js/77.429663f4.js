"use strict";(self["webpackChunkgame"]=self["webpackChunkgame"]||[]).push([[77],{8680:function(e,a,n){n.r(a),n.d(a,{default:function(){return b}});var d=n(3396),s=n(7139);const i=e=>((0,d.dD)("data-v-0bad94da"),e=e(),(0,d.Cn)(),e),c={class:"home-page"},t=i((()=>(0,d._)("div",{class:"header"},[(0,d._)("h1",null,"游戏中心"),(0,d._)("p",{class:"subtitle"},"选择你喜欢的游戏开始玩吧")],-1))),o={class:"game-list"},m=["onClick","onMouseenter"],r={class:"game-icon"},l=["src","alt"],h={class:"game-info"},u={class:"game-name"},p={class:"game-desc"};function g(e,a,n,i,g,v){return(0,d.wg)(),(0,d.iD)("div",c,[t,(0,d._)("div",o,[((0,d.wg)(!0),(0,d.iD)(d.HY,null,(0,d.Ko)(g.games,(e=>((0,d.wg)(),(0,d.iD)("div",{key:e.id,class:(0,s.C_)(["game-card",{"game-card-hover":g.hoveredGame===e.id}]),onClick:a=>v.enterGame(e.path),onMouseenter:a=>g.hoveredGame=e.id,onMouseleave:a[0]||(a[0]=e=>g.hoveredGame=null)},[(0,d._)("div",r,[(0,d._)("img",{src:e.icon,alt:e.name},null,8,l)]),(0,d._)("div",h,[(0,d._)("div",u,(0,s.zw)(e.name),1),(0,d._)("div",p,(0,s.zw)(e.desc),1)])],42,m)))),128))])])}n(7658);var v=n.p+"img/tetris.4ac16d1d.jpg",_=n.p+"img/lottery.8789ac1e.jpg",k={name:"HomePage",data(){return{hoveredGame:null,games:[{id:1,name:"俄罗斯方块",icon:v,path:"/tetris",desc:"经典俄罗斯方块游戏"},{id:2,name:"测测运气",icon:_,path:"/lottery",desc:"测试你的运气"},{id:3,name:"2048",icon:"2048图标路径",path:"/2048",desc:"经典数字益智游戏"},{id:4,name:"贪吃蛇",icon:"贪吃蛇图标路径",path:"/snake",desc:"童年回忆"},{id:5,name:"扫雷",icon:"扫雷图标路径",path:"/minesweeper",desc:"考验逻辑思维"},{id:6,name:"连连看",icon:"连连看图标路径",path:"/lianliankan",desc:"考验眼力和记忆力"},{id:7,name:"五子棋",icon:"五子棋图标路径",path:"/gobang",desc:"经典棋类游戏"},{id:8,name:"记忆翻牌",icon:"翻牌图标路径",path:"/memory-card",desc:"考验记忆力"},{id:9,name:"数独",icon:"数独图标路径",path:"/sudoku",desc:"数字推理游戏"},{id:10,name:"拼图",icon:"拼图图标路径",path:"/puzzle",desc:"图片智力拼图"}]}},methods:{enterGame(e){this.$router.push(e)}}},w=n(89);const f=(0,w.Z)(k,[["render",g],["__scopeId","data-v-0bad94da"]]);var b=f}}]);