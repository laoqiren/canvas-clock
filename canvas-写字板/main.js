/**
 * Created by Administrator on 2016/3/19.
 */
var width = Math.min(600,document.documentElement.clientWidth-20);
var height = width;
var strokeColor = "black";
var isMouseDown = false;
var lastPoint,curPoint;
var lastTime,curTime;
var lastLineWidth = -1;
var maxWidth = 30,minWidth = 1;
var maxV = 10,minV = 0.1;
window.onload = function(){
    var canvas = document.getElementById("canvas");
    var clear = document.getElementById("clear");
    var wrapper =document.getElementById("wrapper");
    var range = document.getElementById("range");
    var showRange = document.getElementById("showRange");
    canvas.width = width;
    canvas.height = height;
    wrapper.style.width = canvas.width +"px";
    //wrapper.style.height = canvas.height*1.2 +"px";
    if(canvas.getContext("2d")){
        var context = canvas.getContext("2d");
        drawBg(context);
    }
    clear.onclick = function(){
        context.clearRect(0,0,canvas.width,canvas.height);
        drawBg(context);
    }
    $(".color").click(function(){
        $(".color").removeClass("selected");
        $(this).addClass("selected");
        strokeColor = $(this).css("background-color");
    });
    range.onmousemove = function(e){
        maxWidth = this.value;
        showRange.innerText = maxWidth;
    };
    range.addEventListener('touchmove',function(e){
        maxWidth = this.value;
        showRange.innerText = maxWidth;
    });
    /*range.ontouchmove = function(e){
        console.log("hello");
        maxWidth = this.value;
        showRange.innerText = maxWidth;
    }*/
    function windowToCanvas(x,y){
        return {
            sx:x - canvas.getBoundingClientRect().left,
            sy:y-canvas.getBoundingClientRect().top
        }
    }
    function beginDraw(point){
        lastPoint = windowToCanvas(point.x,point.y);
        lastTime = new Date().getTime();
        isMouseDown = true;
    }
    function moveDraw(point){
        curPoint = windowToCanvas(point.x,point.y);
        curTime = new Date().getTime();
        var t = curTime - lastTime;
        var s = Math.sqrt((curPoint.sx-lastPoint.sx)*(curPoint.sx-lastPoint.sx)+(curPoint.sy-lastPoint.sy)*(curPoint.sy-lastPoint.sy))
        var lineWidth = calWidth(t,s);
        context.save();
        context.beginPath();
        context.moveTo(lastPoint.sx,lastPoint.sy);
        context.lineTo(curPoint.sx,curPoint.sy);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = strokeColor;
        context.lineWidth = lineWidth;
        context.stroke();
        context.restore();
        lastPoint = curPoint;
        lastTime = curTime;
        lastLineWidth = lineWidth;
    }
    function endDraw(){
        isMouseDown = false;
    }
    canvas.onmousedown = function(e){
        e.preventDefault();
        beginDraw({x: e.clientX,y: e.clientY});
    }
    canvas.onmousemove = function(e){
        e.preventDefault();
        if(isMouseDown){
            moveDraw({x: e.clientX,y: e.clientY});
        }
    }
    canvas.onmouseout = function(e){
        e.preventDefault();
        endDraw();
    }
    canvas.onmouseup = function(e){
        e.preventDefault();
        endDraw();
    }
    canvas.addEventListener('touchstart',function(e){
        e.preventDefault();
        touch = e.touches[0];
        beginDraw( {x: touch.pageX , y: touch.pageY});
    });
    canvas.addEventListener('touchmove',function(e){
        e.preventDefault();
        if( isMouseDown ){
            touch = e.touches[0];
            moveDraw({x: touch.pageX , y: touch.pageY});
        }
    });
    canvas.addEventListener('touchend',function(e){
        e.preventDefault();
        endDraw();
    });
    function calWidth(t,s){
        var v = s/t;
        var olineWidth;
        if(v<=minV){
            olineWidth = maxWidth;
        }else if(v>=maxV){
            olineWidth = minWidth;
        }else{
            olineWidth = maxWidth - (v-minWidth)/(maxV-minV)*(maxWidth-minWidth);
        }
        if(lastLineWidth == -1){
            return olineWidth;
        }
        return olineWidth/3+lastLineWidth*2/3;
    }
    function drawBg(cxt){
        cxt.save();
        cxt.strokeStyle = "red";
        cxt.beginPath();
        cxt.moveTo(0,0);
        cxt.lineTo(canvas.width,0);
        cxt.lineTo(canvas.width,canvas.height);
        cxt.lineTo(0,canvas.height);
        cxt.closePath();
        cxt.lineWidth = 5;
        cxt.stroke();

        cxt.beginPath();
        cxt.moveTo(0,0);
        cxt.lineTo(canvas.width,canvas.height);
        cxt.moveTo(canvas.width,0);
        cxt.lineTo(0,canvas.height);
        cxt.moveTo(canvas.width/2,0);
        cxt.lineTo(canvas.width/2,canvas.height);
        cxt.moveTo(0,canvas.height/2);
        cxt.lineTo(canvas.width,canvas.height/2);
        cxt.lineWidth = 1;
        cxt.stroke();
        cxt.restore();

    }
}