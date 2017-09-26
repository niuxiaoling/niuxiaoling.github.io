/**
 * Created by dell on 2017/7/8.
 */
window.onload=function () {
    //设置画布的高度和宽度
    var width = document.documentElement.clientWidth*0.8;
    var height = document.documentElement.clientHeight;
    //获取画布
    let canvas = document.querySelector('canvas');
    canvas.width = width;
    canvas.height = height;
    //初始化类
    var obj = new Canvas(canvas);
    var point = obj.point;
    //创建空数组
    var arr=[];
    //初始化绘图信息
    obj.type = 'line';
    var imgData = point.getImageData(0,0,canvas.width,canvas.height);

    document.querySelector('#poly').onclick = function () {
        obj.n = prompt('你要输入几边形？');
    }
    //画布按下事件
    canvas.onmousedown = function (e) {
        //鼠标按下距离事件源的距离
        var x = e.offsetX;
        var y = e.offsetY;
        //画布移动事件
        canvas.onmousemove = function (e) {
            //鼠标移动距离窗口左上角的距离
            var endx = e.clientX;
            var endy = e.clientY;
            //如果类型是删除
            if (obj.type == 'delete') {
                //调用删除方法
                obj.delete(x,y,endx,endy);
            }else{
                //调用清除画布方法
                obj.clear();
                if (arr.length > 0) {
                    point.putImageData(arr[arr.length - 1], 0, 0);
                }
            }
            switch (obj.type) {
                case"line":
                    obj.line(x, y, endx, endy);
                    break;
                case"rect":
                    obj.rect(x, y, endx, endy);
                    break;
                case"circle":
                    obj.circle(x, y, endx, endy);
                    break;
                case"poly":
                    obj.poly(x, y, endx, endy);
                    break;
                case"linearrect":
                    obj.linearrect(x,y,endx,endy);
                    break;
                case"linearcircle":
                    obj.linearcircle(x,y,endx,endy);
                    break;
            }
        }
        //画布抬起事件
        canvas.onmouseup = function () {
            //清除移动事件
            canvas.onmousemove = null;
            //文字按钮
            if(obj.type=='text'){
                obj.fontsize = prompt('请输入字体大小');
                obj.content = prompt('请输入文本内容');
                obj.text(x,y);
            }
            imgData = point.getImageData(0,0,canvas.width,canvas.height);
            arr.push(imgData);
        }
    }

    document.onkeydown = function (e) {
        var code = e.keyCode;
        console.log(code);
    }
    //获取撤销按钮
    var flag=true;
    let remove = document.querySelector("button[type='remove']");
    remove.onclick = function () {
        if(flag){
            flag=false;
            remove.className = 'active1';
        }else{
            flag=true;
            remove.className = '';
        }
        obj.clear();
        arr.pop();
        if(arr.length<1){
            alert('已经没有内容了');
        }else{
            point.putImageData(arr[arr.length-1],0,0);
            imgData = arr[arr.length - 1];
        }
    }
    //获取清空按钮
    let clear = document.querySelector("button[type='clear']");
    clear.onclick = function () {
        if(flag){
            flag=false;
            clear.className = 'active1';
        }else{
            flag=true;
            clear.className = '';
        }
        point.clearRect(0,0,canvas.width,canvas.height);
        arr=[];
    }

    //事件委派，按钮事件
    let fun = document.querySelector('.fun');
    fun.onclick = function (e) {
        var dom = e.target || e.srcElement;
        if (dom.nodeName == 'BUTTON') {
            obj.type = dom.id;
            console.log(obj.type);
            [...fun.children].forEach((value)=> {
                value.className = '';
            })
            dom.className ='active';
            if(dom.id=='fill'||dom.id == 'stroke'){
                 obj.style = dom.id;
            }
        }

    }


    //颜色值的变化
    var color = '#FF8C00';
    let change =document.querySelector("input[type='color']");
    change.value = '#FF8C00';
    change.onchange=function () {
        obj.color = this.value;
    }



}
