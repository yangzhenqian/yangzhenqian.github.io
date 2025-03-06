"use strict";(self["webpackChunkgame"]=self["webpackChunkgame"]||[]).push([[580],{3580:function(e,i,t){t.r(i),t.d(i,{default:function(){return I}});var s=t(3396),a=t(7139),o=t(9242);const l=e=>((0,s.dD)("data-v-b3b40568"),e=e(),(0,s.Cn)(),e),r={class:"snake-game"},n={class:"game-header"},h={class:"score-board"},d={class:"score"},c={class:"high-score"},g={class:"controls"},m=["disabled"],y=l((()=>(0,s._)("option",{value:"easy"},"简单",-1))),u=l((()=>(0,s._)("option",{value:"medium"},"中等",-1))),p=l((()=>(0,s._)("option",{value:"hard"},"困难",-1))),S=[y,u,p],f=["disabled"],v={key:0,class:"overlay start"},b=l((()=>(0,s._)("div",{class:"message"},"按空格键开始游戏",-1))),k=l((()=>(0,s._)("div",{class:"tip"},"使用方向键或WASD控制方向",-1))),w=[b,k],x={key:1,class:"overlay game-over"},z=l((()=>(0,s._)("div",{class:"message"},"游戏结束",-1))),_={class:"final-score"};function D(e,i,t,l,y,u){return(0,s.wg)(),(0,s.iD)("div",r,[(0,s._)("div",n,[(0,s._)("div",h,[(0,s._)("div",d,"得分: "+(0,a.zw)(y.score),1),(0,s._)("div",c,"最高分: "+(0,a.zw)(y.highScore),1)]),(0,s._)("div",g,[(0,s.wy)((0,s._)("select",{"onUpdate:modelValue":i[0]||(i[0]=e=>y.difficulty=e),onChange:i[1]||(i[1]=(...e)=>u.changeDifficulty&&u.changeDifficulty(...e)),disabled:y.isPlaying},S,40,m),[[o.bM,y.difficulty]]),(0,s._)("button",{onClick:i[2]||(i[2]=(...e)=>u.toggleGame&&u.toggleGame(...e)),class:(0,a.C_)({playing:y.isPlaying})},(0,a.zw)(y.isPlaying?"暂停":"开始"),3),(0,s._)("button",{onClick:i[3]||(i[3]=(...e)=>u.resetGame&&u.resetGame(...e)),disabled:y.isPlaying},"重新开始",8,f)])]),(0,s._)("div",{class:"game-container",ref:"gameBoard",onKeydown:i[5]||(i[5]=(0,o.iM)(((...e)=>u.handleKeyPress&&u.handleKeyPress(...e)),["prevent"])),tabindex:"0"},[y.isPlaying||y.gameOver?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("div",v,w)),y.gameOver?((0,s.wg)(),(0,s.iD)("div",x,[z,(0,s._)("div",_,"最终得分: "+(0,a.zw)(y.score),1),(0,s._)("button",{onClick:i[4]||(i[4]=(...e)=>u.resetGame&&u.resetGame(...e))},"再玩一次")])):(0,s.kq)("",!0),(0,s._)("div",{class:"game-board",style:(0,a.j5)(u.boardStyle)},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(y.boardSize,(e=>((0,s.wg)(),(0,s.iD)("div",{key:e,class:"grid-row",style:{display:"flex"}},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(y.boardSize,(e=>((0,s.wg)(),(0,s.iD)("div",{key:e,class:"grid-cell",style:(0,a.j5)(u.cellStyle)},null,4)))),128))])))),128)),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(y.snake,((e,i)=>((0,s.wg)(),(0,s.iD)("div",{key:i,class:"snake-segment",style:(0,a.j5)(u.getSegmentStyle(e))},null,4)))),128)),y.food?((0,s.wg)(),(0,s.iD)("div",{key:0,class:(0,a.C_)(["food",{special:y.food.isSpecial}]),style:(0,a.j5)(u.getFoodStyle(y.food))},null,6)):(0,s.kq)("",!0)],4)],544)])}t(541);var G={name:"SnakeGame",data(){return{boardSize:30,cellSize:20,snake:[],food:null,direction:"right",nextDirection:"right",isPlaying:!1,gameOver:!1,score:0,highScore:0,gameLoop:null,difficulty:"medium",speeds:{easy:200,medium:150,hard:100}}},computed:{boardStyle(){return{width:this.boardSize*this.cellSize+"px",height:this.boardSize*this.cellSize+"px",gridTemplateColumns:`repeat(${this.boardSize}, 1fr)`}},cellStyle(){return{width:`${this.cellSize}px`,height:`${this.cellSize}px`}}},mounted(){this.loadHighScore(),this.initGame(),this.$refs.gameBoard.focus()},methods:{initGame(){this.snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}],this.direction="right",this.nextDirection="right",this.score=0,this.gameOver=!1,this.generateFood()},generateFood(){let e,i;do{e=Math.floor(Math.random()*this.boardSize),i=Math.floor(Math.random()*this.boardSize)}while(this.snake.some((t=>t.x===e&&t.y===i)));this.food={x:e,y:i,isSpecial:Math.random()<.2}},getSegmentStyle(e){return{left:e.x*this.cellSize+"px",top:e.y*this.cellSize+"px",borderRadius:"50%",boxShadow:"0 0 5px rgba(0, 0, 0, 0.5)",transition:"all 0.2s ease"}},getFoodStyle(e){return{left:e.x*this.cellSize+"px",top:e.y*this.cellSize+"px",width:`${this.cellSize}px`,height:`${this.cellSize}px`,backgroundColor:e.isSpecial?"#f1c40f":"#e74c3c",borderRadius:"50%",transition:"all 0.2s ease"}},handleKeyPress(e){const i=e.key.toLowerCase(),t={arrowup:"up",arrowdown:"down",arrowleft:"left",arrowright:"right",w:"up",s:"down",a:"left",d:"right"," ":"space"};if(" "===i)return void this.toggleGame();const s=t[i];if(!s)return;const a={up:"down",down:"up",left:"right",right:"left"};a[s]!==this.direction&&(this.nextDirection=s)},moveSnake(){const e={...this.snake[0]};switch(this.direction=this.nextDirection,this.direction){case"up":e.y--;break;case"down":e.y++;break;case"left":e.x--;break;case"right":e.x++;break}e.x<0||e.x>=this.boardSize||e.y<0||e.y>=this.boardSize||this.snake.some((i=>i.x===e.x&&i.y===e.y))?this.endGame():(this.snake.unshift(e),e.x===this.food.x&&e.y===this.food.y?(this.score+=this.food.isSpecial?20:10,this.updateHighScore(),this.generateFood()):this.snake.pop())},toggleGame(){this.gameOver?this.resetGame():(this.isPlaying=!this.isPlaying,this.isPlaying?this.gameLoop=setInterval((()=>{this.moveSnake()}),this.speeds[this.difficulty]):clearInterval(this.gameLoop))},resetGame(){clearInterval(this.gameLoop),this.isPlaying=!1,this.gameOver=!1,this.initGame()},endGame(){this.isPlaying=!1,this.gameOver=!0,clearInterval(this.gameLoop),this.updateHighScore()},changeDifficulty(){this.isPlaying&&(clearInterval(this.gameLoop),this.gameLoop=setInterval((()=>{this.moveSnake()}),this.speeds[this.difficulty]))},loadHighScore(){const e=localStorage.getItem("snakeHighScore");this.highScore=e?parseInt(e):0},updateHighScore(){this.score>this.highScore&&(this.highScore=this.score,localStorage.setItem("snakeHighScore",this.score.toString()))}},beforeUnmount(){clearInterval(this.gameLoop)}},P=t(89);const C=(0,P.Z)(G,[["render",D],["__scopeId","data-v-b3b40568"]]);var I=C}}]);