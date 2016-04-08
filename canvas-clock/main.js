/**
 * Created by Administrator on 2016/3/16.
 */
var RADIUS =8;//小球半径
var WIDTH ;
var HEIGHT ;
var MARGIN_TOP;
var MARGIN_LEFT;
var time;//当前系统时间
var hour = 0,minute = 0,second = 0;//当前小时，分钟，秒数
var balls = [];//小球数组
//小球的颜色，随机取出
var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
window.onload = function(){
    var canvas = document.getElementById("canvas");
    WIDTH = document.documentElement.clientWidth;
    HEIGHT = document.documentElement.clientHeight;
    MARGIN_LEFT = WIDTH *0.1;
    MARGIN_TOP = HEIGHT*0.1;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    time = new Date();
    if(canvas.getContext("2d")){
        var context = canvas.getContext("2d");
        setInterval(function(){
            render(context);
            update();
        },50);
    }
}
//绘制各个数字和滚动的小球
function render(cxt){
    cxt.clearRect(0,0,WIDTH,HEIGHT);
    hour = time.getHours();
    minute = time.getMinutes();
    second = time.getSeconds();
    draw(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),cxt);
    draw(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hour%10),cxt);
    draw(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
    draw(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minute/10),cxt);
    draw(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minute%10),cxt);
    draw(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,parseInt(10),cxt);
    draw(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(second/10),cxt);
    draw(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(second%10),cxt);
    for( var i = 0 ; i < balls.length ; i ++ ){
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();
        cxt.fill();
    }
}
//绘制时钟各个数字
function draw(x,y,num,cxt){
    cxt.fillStyle = "blue";
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI );
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}
function update(){
    var nextTime = new Date();
    var nextHours = nextTime.getHours();
    var nextMinutes = nextTime.getMinutes();
    var nextSeconds = nextTime.getSeconds();
    //判断下一秒是否与当前秒相同，若不同，判断时钟各个数字是否变化，若变化则生成小球
    if( nextSeconds != second ) {
        if (parseInt(hour / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(nextHours / 10));
        }
        if (parseInt(hour % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(nextHours / 10));
        }

        if (parseInt(minute / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes / 10));
        }
        if (parseInt(minute % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes % 10));
        }

        if (parseInt(second / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds / 10));
        }
        if (parseInt(second % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
        }
        time = nextTime;
    }
    updateBalls();//更新当前时间
    console.log(balls.length)
}
//更新每个小球的状态
function updateBalls(x,y,num){
    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= HEIGHT-RADIUS ){
            balls[i].y = HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }
//从球数组中移除已经滚出canvas画布区域的小球对象
    var cnt = 0
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WIDTH )
            balls[cnt++] = balls[i]
    while( balls.length > cnt ){
        balls.pop();
    }
}
//添加彩色球到球数组
function  addBalls(x,y,num){
    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push( aBall );
            }

}
