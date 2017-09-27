var WINDOW_WIDTH = 400;
var WINDOW_HEIGHT = 400;
var pythonLeg=18;
var foodX=18;
var foodY=18;
var pythonX=18;
var pythonY=54;
var pythonSpeed=18;
var curShowTimeSeconds = 0;
var buttonTypes="lefts";
var pythonStr=[];
var colorsPython= ["#33B5E5","#0099CC","#AA66CC","##9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC000C"];

    
window.onload=function(){
    bg();
    WINDOW_WIDTH=document.body.clientWidth-200;
    WINDOW_HEIGHT = document.body.clientHeight-100;
    var canvas=document.getElementById('canvasPython');
    var context=canvas.getContext('2d');
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    //获取当前时间
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    var pythonAttributes={
            x:pythonX,
            y:pythonY,
            color:colorsPython[0]
        }
    pythonStr.push(pythonAttributes);
    setInterval(function (){
        pythonUpdate(context);

    },500);
  
}


//画出食物的位置
function food(cxt,x,y){
      cxt.beginPath(); 
      cxt.fillStyle='#FF6A6A';
      cxt.arc(x,y,pythonLeg,0,2*Math.PI,true);
      cxt.closePath();
      cxt.fill();     
}
//更新食物位置
function foodUpdat(cxt){
   foodX+=2*pythonSpeed;
   foodY+=2*pythonSpeed;
   
   if(foodY>= WINDOW_HEIGHT-pythonLeg){
           foodY=18;     
   }
   if(foodY+54<=0){
           foodY=342;     
   }
   if(foodX>= WINDOW_WIDTH-pythonLeg || foodX<=pythonLeg){
           foodX=36;      
   }
    if(foodX+54<=0){
           foodX=36;      
   }
   food(cxt,foodX,foodY);
  
}
function renderPython(cxt){
       
      for(var i=0;i<pythonStr.length;i++){
        //对蛇头进行处理
         if(i==0){
              cxt.beginPath();
              cxt.fillStyle=colorsPython[2];
              cxt.arc(pythonStr[i].x,pythonStr[i].y,pythonLeg,0,2*Math.PI,true);
              cxt.closePath();
              cxt.fill();
              cxt.beginPath();
              cxt.fillStyle="#000";
              cxt.arc(pythonStr[i].x+3.5,pythonStr[i].y-6,2,0,2*Math.PI,true);
              cxt.closePath();
              cxt.fill(); 
              cxt.beginPath();
              cxt.fillStyle="#000";
              cxt.arc(pythonStr[i].x+3.5,pythonStr[i].y+6,2,0,2*Math.PI,true);
              cxt.closePath();
              cxt.fill();

         }else{
              cxt.beginPath();
              cxt.fillStyle=colorsPython[Math.floor(Math.random()*colorsPython.length)];
              cxt.arc(pythonStr[i].x,pythonStr[i].y,pythonLeg-4,0,2*Math.PI,true);
              cxt.closePath();
              cxt.fill();
         }   
        
    
      }
      //食物改变位置重新出现
      var nextShowTimeSeconds = getCurrentShowTimeSeconds();
      var nextSeconds = nextShowTimeSeconds % 60;
      if(nextSeconds%15==0){
         foodUpdat(cxt);         
         curShowTimeSeconds = nextShowTimeSeconds;
      }else{
          food(cxt,foodX,foodY); 
      }
      //updateBalls();
      pythonGrow(cxt); 
         
}
function pythonGrow(cxt){
    var pythonOtherX=pythonStr[pythonStr.length-1].x;
    var pythonOtherY=pythonStr[pythonStr.length-1].y;

    if(foodX==pythonStr[0].x && foodY==pythonStr[0].y){
        var pythonAttribute={
            x:pythonOtherX,
            y:pythonOtherY,
            color:colorsPython[Math.floor(Math.random()*colorsPython.length)]
        }
        pythonStr.push(pythonAttribute);
        foodUpdat(cxt);
    }
}
//蛇根据方向自动计算蛇的坐标
function pythonDirection(){
   switch(buttonTypes){
       case 'rights':
           var leg=pythonStr.length;
           pythonAttributes={
              x:pythonStr[0].x-2*pythonSpeed,
              y:pythonStr[0].y,
              color:colorsPython[0]
           }
           pythonStr.unshift(pythonAttributes);
           pythonStr.length=leg;
  
           if(pythonStr[0].x+54<=0){
               pythonStr[0].x=342;
           }   
           break;
       case 'lefts':
           var leg=pythonStr.length;
           pythonAttributes={
               x:pythonStr[0].x+2*pythonSpeed,
               y:pythonStr[0].y,
               color:colorsPython[0]
           }
           pythonStr.unshift(pythonAttributes);
           pythonStr.length=leg;
           if(pythonStr[0].x>=WINDOW_WIDTH){
                pythonStr[0].x=18;
           }
            break;
        case 'up':
            var leg=pythonStr.length;
            pythonAttributes={
               x:pythonStr[0].x,
               y:pythonStr[0].y-2*pythonSpeed,
               color:colorsPython[0]
            }
            pythonStr.unshift(pythonAttributes);
            pythonStr.length=leg;
            if(pythonStr[0].y+54<=0){
                    pythonStr[0].y=342;
            }
            
            break;
        case 'down':
            var leg=pythonStr.length;
            pythonAttributes={
               x:pythonStr[0].x,
               y:pythonStr[0].y+2*pythonSpeed,
               color:colorsPython[0]
            }
            pythonStr.unshift(pythonAttributes);
            pythonStr.length=leg;
            if(pythonStr[0].y>=WINDOW_HEIGHT){
                    pythonStr[0].y=18;
            }
            break;   
           
   }
   
}
//更新蛇的位置：重画蛇
function pythonUpdate(cxt){
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT); 
    pythonDirection();
    renderPython(cxt);
}
function getCurrentShowTimeSeconds(){
    var curTime = new Date();
    var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
    return ret >=0?ret : 0;
}
//点击方向按钮事件：
function buttonType(types){
    buttonTypes=$(types).attr('id');
}
document.onkeydown=function(e){
  e=window.event||e;
  switch(e.keyCode){
    case 37: //右键
      buttonTypes="rights";
      break;
    case 38: //向上键
      buttonTypes="up";
      break;
    case 39: //左键
      buttonTypes="lefts";
      break;
    case 40: //向下键
     buttonTypes="down";
      break;
    default:
      break;
  }
}

function getRandomColor() {
    return '#' + (Math.random() * 0xffffff << 0).toString(16);
};
    