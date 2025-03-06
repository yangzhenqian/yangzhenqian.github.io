"use strict";(self["webpackChunkgame"]=self["webpackChunkgame"]||[]).push([[777],{4535:function(e,i,t){t.r(i),t.d(i,{default:function(){return H}});var s=t(3396),a=t(7139),l=t(9242);const n=e=>((0,s.dD)("data-v-41c26058"),e=e(),(0,s.Cn)(),e),o={class:"puzzle-game"},r={class:"game-header"},h={class:"game-info"},m={class:"moves"},d={class:"timer"},c={class:"controls"},g=["disabled"],u=n((()=>(0,s._)("option",{value:"easy"},"简单 (3x3)",-1))),p=n((()=>(0,s._)("option",{value:"medium"},"中等 (4x4)",-1))),f=n((()=>(0,s._)("option",{value:"hard"},"困难 (5x5)",-1))),v=[u,p,f],w=["disabled"],y=["disabled"],b={class:"board-container"},S=["onClick"],T={key:0,class:"tile-number"},I={class:"game-footer"},k={class:"options"},P={key:0,class:"best-scores"},z=n((()=>(0,s._)("h3",null,"最佳记录",-1))),_={class:"preview-content"},x=["src"];function M(e,i,t,n,u,p){return(0,s.wg)(),(0,s.iD)("div",o,[(0,s._)("div",r,[(0,s._)("div",h,[(0,s._)("div",m,"步数: "+(0,a.zw)(u.moves),1),(0,s._)("div",d,"⏱️ "+(0,a.zw)(p.formatTime(u.time)),1)]),(0,s._)("div",c,[(0,s.wy)((0,s._)("select",{"onUpdate:modelValue":i[0]||(i[0]=e=>u.difficulty=e),onChange:i[1]||(i[1]=(...e)=>p.newGame&&p.newGame(...e)),disabled:u.isPlaying},v,40,g),[[l.bM,u.difficulty]]),(0,s._)("button",{onClick:i[2]||(i[2]=(...e)=>p.newGame&&p.newGame(...e)),class:"new-game-btn"},"新游戏"),(0,s._)("button",{onClick:i[3]||(i[3]=(...e)=>p.stopGame&&p.stopGame(...e)),class:"stop-game-btn",disabled:!u.isPlaying}," 终止游戏 ",8,w),(0,s._)("button",{onClick:i[4]||(i[4]=(...e)=>p.showPreview&&p.showPreview(...e)),class:"preview-btn",disabled:!u.isPlaying}," 查看原图 ",8,y)])]),(0,s._)("div",b,[(0,s._)("div",{class:"board",style:(0,a.j5)(p.boardStyle)},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(u.tiles,((e,i)=>((0,s.wg)(),(0,s.iD)("div",{key:i,class:(0,a.C_)(["tile",{empty:0===e.value}]),style:(0,a.j5)(p.getTileStyle(e)),onClick:e=>p.moveTile(i)},[u.showNumbers?((0,s.wg)(),(0,s.iD)("div",T,(0,a.zw)(e.value),1)):(0,s.kq)("",!0)],14,S)))),128))],4)]),(0,s._)("div",I,[(0,s._)("div",k,[(0,s._)("label",null,[(0,s.wy)((0,s._)("input",{type:"checkbox","onUpdate:modelValue":i[5]||(i[5]=e=>u.showNumbers=e)},null,512),[[l.e8,u.showNumbers]]),(0,s.Uk)(" 显示数字 ")])]),u.bestScores[u.difficulty]?((0,s.wg)(),(0,s.iD)("div",P,[z,(0,s._)("p",null,"步数: "+(0,a.zw)(u.bestScores[u.difficulty].moves),1),(0,s._)("p",null,"时间: "+(0,a.zw)(p.formatTime(u.bestScores[u.difficulty].time)),1)])):(0,s.kq)("",!0)]),u.showingPreview?((0,s.wg)(),(0,s.iD)("div",{key:0,class:"preview-modal",onClick:i[6]||(i[6]=(...e)=>p.hidePreview&&p.hidePreview(...e))},[(0,s._)("div",_,[(0,s._)("img",{src:u.currentImage,alt:"完整图片"},null,8,x)])])):(0,s.kq)("",!0)])}t(7658);var C=t.p+"img/default.0cc37fb2.jpeg",D=t.p+"img/1.c9de2262.png",G=t.p+"img/2.2368cb29.png",A=t.p+"img/3.10a9b63f.png",L=t.p+"img/4.5311d858.png",N=t.p+"img/5.760fb862.png",U=t.p+"img/6.aadb36f7.png",$=t.p+"img/7.2b28a6a3.png",R=t.p+"img/8.ca7dbd4d.png",W=t.p+"img/9.fffc57c0.png",B=t.p+"img/10.a390ea3c.png",E=t.p+"img/11.d58d4306.png",K=t.p+"img/12.45e40c38.png",j=t.p+"img/13.3bb115d7.png",q=t.p+"img/14.71c1ec29.png",O={name:"PuzzleGame",data(){return{difficulty:"easy",difficultySettings:{easy:{size:3},medium:{size:4},hard:{size:5}},tiles:[],emptyTileIndex:0,moves:0,time:0,timer:null,isPlaying:!1,showNumbers:!0,showingPreview:!1,currentImage:C,bestScores:{easy:null,medium:null,hard:null},imageLoaded:!1,tileSize:0,imagePieces:[],allImages:[C,D,G,A,L,N,U,$,R,W,B,E,K,j,q]}},computed:{boardStyle(){const e=this.difficultySettings[this.difficulty].size;return{gridTemplateColumns:`repeat(${e}, 1fr)`,aspectRatio:"1"}},boardSize(){return this.difficultySettings[this.difficulty].size}},mounted(){this.loadBestScores(),this.newGame(),window.addEventListener("keydown",this.handleKeyPress)},beforeUnmount(){this.stopTimer(),window.removeEventListener("keydown",this.handleKeyPress)},methods:{newGame(){this.stopTimer(),this.moves=0,this.time=0,this.currentImage=this.getRandomImage(),this.initializeTiles(),this.startTimer(),this.isPlaying=!0},getRandomImage(){const e=Math.floor(Math.random()*this.allImages.length);return this.allImages[e]},async loadAndSliceImage(){return new Promise((e=>{const i=new Image;i.onload=()=>{const t=this.boardSize;this.tileSize=Math.min(600,window.innerWidth-40)/t;const s=document.createElement("canvas"),a=s.getContext("2d");s.width=i.width,s.height=i.height,a.drawImage(i,0,0),this.imagePieces=[];const l=i.width/t,n=i.height/t;for(let e=0;e<t;e++)for(let s=0;s<t;s++){const t=document.createElement("canvas"),a=t.getContext("2d");t.width=l,t.height=n,a.drawImage(i,s*l,e*n,l,n,0,0,l,n),this.imagePieces.push({url:t.toDataURL(),x:s,y:e})}this.imageLoaded=!0,e()},i.src=this.currentImage}))},async initializeTiles(){await this.loadAndSliceImage();const e=this.boardSize,i=e*e,t=[];for(let s=0;s<i-1;s++)t.push({value:s+1,originalPosition:s,imageData:this.imagePieces[s]});t.push({value:0,originalPosition:i-1,imageData:null});do{this.shuffle(t)}while(!this.isSolvable(t));this.tiles=t,this.emptyTileIndex=t.findIndex((e=>0===e.value))},shuffle(e){for(let i=e.length-1;i>0;i--){const t=Math.floor(Math.random()*(i+1));[e[i],e[t]]=[e[t],e[i]]}},isSolvable(e){let i=0;const t=this.boardSize,s=e.map((e=>e.value)).filter((e=>0!==e));for(let l=0;l<s.length-1;l++)for(let e=l+1;e<s.length;e++)s[l]>s[e]&&i++;if(t%2===1)return i%2===0;const a=t-Math.floor(this.emptyTileIndex/t);return(i+a)%2===0},getTileStyle(e){return 0===e.value?{}:{cursor:this.canMoveTile(this.tiles.indexOf(e))?"pointer":"default",background:e.imageData?`url(${e.imageData.url})`:"#fff",backgroundSize:"cover",backgroundPosition:"center"}},moveTile(e){if(!this.isPlaying||!this.canMoveTile(e))return;const i=this.tiles[e];this.tiles[e]=this.tiles[this.emptyTileIndex],this.tiles[this.emptyTileIndex]=i,this.emptyTileIndex=e,this.moves++,this.checkWin()&&this.gameWon()},canMoveTile(e){const i=this.boardSize,t=Math.floor(e/i),s=e%i,a=Math.floor(this.emptyTileIndex/i),l=this.emptyTileIndex%i;return 1===Math.abs(t-a)&&s===l||1===Math.abs(s-l)&&t===a},handleKeyPress(e){if(!this.isPlaying)return;const i=this.boardSize;let t=this.emptyTileIndex;switch(e.key){case"ArrowUp":this.emptyTileIndex<i*(i-1)&&(t+=i);break;case"ArrowDown":this.emptyTileIndex>=i&&(t-=i);break;case"ArrowLeft":this.emptyTileIndex%i<i-1&&(t+=1);break;case"ArrowRight":this.emptyTileIndex%i>0&&(t-=1);break;default:return}t!==this.emptyTileIndex&&this.moveTile(t)},checkWin(){return this.tiles.every(((e,i)=>0===e.value?i===this.tiles.length-1:e.value===i+1))},gameWon(){this.stopTimer(),this.isPlaying=!1,(!this.bestScores[this.difficulty]||this.moves<this.bestScores[this.difficulty].moves||this.moves===this.bestScores[this.difficulty].moves&&this.time<this.bestScores[this.difficulty].time)&&(this.bestScores[this.difficulty]={moves:this.moves,time:this.time},this.saveBestScores()),setTimeout((()=>{alert(`恭喜你完成拼图！\n步数：${this.moves}\n用时：${this.formatTime(this.time)}`)}),100)},stopGame(){confirm("确定要终止当前游戏吗？")&&(this.stopTimer(),this.isPlaying=!1,this.tiles.sort(((e,i)=>e.value-i.value)),this.emptyTileIndex=this.tiles.length-1)},showPreview(){this.showingPreview=!0},hidePreview(){this.showingPreview=!1},startTimer(){this.timer=setInterval((()=>{this.time++}),1e3)},stopTimer(){this.timer&&(clearInterval(this.timer),this.timer=null)},formatTime(e){const i=Math.floor(e/60),t=e%60;return`${i}:${t.toString().padStart(2,"0")}`},loadBestScores(){const e=localStorage.getItem("puzzle-best-scores");e&&(this.bestScores=JSON.parse(e))},saveBestScores(){localStorage.setItem("puzzle-best-scores",JSON.stringify(this.bestScores))}}},J=t(89);const V=(0,J.Z)(O,[["render",M],["__scopeId","data-v-41c26058"]]);var H=V}}]);