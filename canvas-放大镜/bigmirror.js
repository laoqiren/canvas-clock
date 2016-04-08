/**
 * Created by Administrator on 2016/3/18.
 */
var img = new Image();
var scale = 1;
var br = 80;
var px,py;
var isMouseDown = false;
window.onload = function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var offCanvas = document.getElementById("offCanvas");
    var offContext = offCanvas.getContext("2d");
    img.src = "bac.jpg";
    img.onload = function(){
        offCanvas.width = img.width;
        offCanvas.height = img.height;
        canvas.width = img.width*0.6;
        canvas.height = img.height*0.6;
        var scale = offCanvas.width/canvas.width;
        context.drawImage(img,0,0,canvas.width,canvas.height);
        offContext.drawImage(img,0,0);
    }
    canvas.onmousedown = function(e){
        e.preventDefault;
        isMouseDown = true;
        px = e.clientX - canvas.getBoundingClientRect().left;
        py = e.clientY - canvas.getBoundingClientRect().top;
        drawMirror(true);
    }
    canvas.onmouseout = function(e){
        e.preventDefault;
        isMouseDown = false;
        drawMirror(false);
    }
    canvas.onmouseup = function(e){
        e.preventDefault;
        isMouseDown = false;
        drawMirror(false);
    }
    canvas.onmousemove = function(e){
        e.preventDefault;
        if(isMouseDown==true){
            px = e.clientX - canvas.getBoundingClientRect().left;
            py = e.clientY - canvas.getBoundingClientRect().top;
            drawMirror(true);
        }else {
            drawMirror(false);
        }
    }
    function drawMirror(isMouseDown){
        context.clearRect(0,0,canvas.width,canvas.height);
        context.drawImage(img,0,0,canvas.width,canvas.height);
        if(isMouseDown==true){
            var imgX = px*scale-br;
            var imgY = py*scale-br;
            context.save();
            context.lineWidth = 6;
            context.beginPath();
            context.arc(px,py,br,0,2*Math.PI);
            context.strokeStyle = "yellow";
            context.stroke();
            context.clip();
            context.drawImage(offCanvas,imgX,imgY,br*2,br*2,px-br,py-br,br*2,br*2);
            context.restore();
        }
    }

}

/*function drawImageByScale(cxt,img,scale){
    var imageWidth = 620*scale;
    var imageHeight = 884*scale;
    cxt.drawImage(img,310,442,imageWidth,imageHeight);
}*/