/**
 * Created by dell on 2017/7/9.
 */
class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.point = this.canvas.getContext('2d');
        this.lineWidth = 1;
        this.color ='#FF8C00';
        this.style = 'fill';
        this.colorarr = ['red','blue','#FF8C00','yellow'];
        this.n = 5;
        this.fontsize = 20;
        this.content = '';
        this.gradient='linear';
        this.type ='line';
    }

    rect(x, y, endx, endy) {
        var width = endx - x;
        var height = endy - y;
        if (this.style == 'stroke') {
            this.point.fillStyle = this.color;
            this.point.strokeRect(x, y, width, height);
        } else if (this.style == 'fill') {
            this.point.fillStyle = this.color;
            this.point.fillRect(x, y, width, height);
        }
    }
    text(x,y){
        this.point.font=`${this.fontsize}px "Arial"`
        if(this.style == 'stroke'){
            this.point.strokeStyle = this.color;
            this.point.strokeText(this.content,x,y);

        }else if(this.style == 'fill'){

            this.point.fillStyle = this.color;
            this.point.fillText(this.content,x,y);
        }
    }
    line(x, y, endx, endy) {
        this.point.beginPath();
        this.point.moveTo(x, y);
        this.point.lineTo(endx, endy);
        this.point.closePath();
        this.point.lineWidth = this.lineWidth;
        this.point.strokeStyle = this.color;
        this.point.stroke();
    }
    circle(x, y, endx, endy) {
        var r = Math.sqrt(Math.pow(endx - x, 2) + Math.pow(endy - y, 2)); //半径
        this.point.beginPath();
        this.point.arc(x, y, r, 0, Math.PI * 2, true);
        this.point.closePath();
        if (this.style == 'fill') {
            this.point.fillStyle = this.color;
            this.point.fill();
        } else if (this.style == 'stroke') {
            this.point.strokeStyle = this.color;
            this.point.stroke();
        }
    }
    poly(x,y,endx,endy){
        var ran=360/this.n;
        var r = Math.sqrt(Math.pow(endx - x, 2) + Math.pow(endy - y, 2)); //半径
        this.point.beginPath();
        for(var i=0;i<this.n;i++){
            this.point.lineTo(x+Math.sin((i*ran+45)*Math.PI/180)*r,y+Math.cos((i*ran+45)*Math.PI/180)*r)
        }
        this.point.closePath();
        if(this.style == 'fill'){
            this.point.fillStyle=this.color;
            this.point.fill();
        }else if(this.style == 'stroke'){
            this.point.strokeStyle=this.color;
            this.point.stroke();
        }
    }
    delete(x,y,endx,endy){
        this.point.clearRect(endx,endy,10,10);
    }
    linearrect(x,y,endx,endy) {
        var linear = this.point.createLinearGradient(x,0,endx,0);
        var every =1/this.colorarr.length;
        for(var i=0;i<this.colorarr.length;i++){
            linear.addColorStop(every*i,this.colorarr[i]);
        }
        this.point.fillStyle = linear;
        this.point.fillRect(x,y,endx-x,endy-y);
    }
    linearcircle(x,y,endx,endy) {
        //画圆的路径
        this.point.beginPath();
        var r=Math.sqrt(Math.pow(endx-x,2)+Math.pow(endy-y,2));
        this.point.arc(x,y,r,0,Math.PI*2,true);
        this.point.closePath();
        var linear = this.point.createRadialGradient(x,y,5,x,y,r);
        var every = 1/this.colorarr.length; //平均渐变
        for(var i=0;i<this.colorarr.length;i++){
            linear.addColorStop(i*every,this.colorarr[i]);

        }
        this.point.fillStyle =linear;
        this.point.fill();
    }
    clear(){
        this.point.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


}