$(document).ready(function(){
    //Slider
    $('#camera_wrap_1').camera({
        height:'600px'
    });

    //lazaload
    $('.lazy').lazyload({
        effect:'fadeIn',
    });

    //头部滚轮事件
     var  ox=$('.head').height();
     $(window).scroll(function () {
         var  cx=$(document.body).scrollTop();
          if(cx>=ox){
              $('.float-head').addClass('active');
              $('.head').removeClass('active');
              $('.aside').stop().animate({
                  right:'40px'
              })
          }else{
              $('.head').addClass('active');
              $('.float-head').removeClass('active');
              $('.aside').stop().animate({
                  right:'-40px'
              })
          }

     })
    //回到顶部
     $('.aside').click(function () {
        $(document.body).animate({
            scrollTop:0
        },500)
     })



     //产品展示
    let  lis=$('.left-content ul.big  li');
    let  logo=$('.left-content ul li .left-log');
    let  imgs=$('ul.right>li');
    lis.hover(function (index,value) {
          var i=$(this).index();
          logo.removeClass('active').eq(i).addClass('active');
          imgs.removeClass('active').eq(i).addClass('active');
    })


    //个人相册
    var imgli=$('.column li');
    var now=0;
    var next=0;
    function lunbo(imgli,now,next) {
        function move1() {
            next=now+1;
            if(next>imgli.length-1){
                next=0;
            }
            imgli.removeClass('active').eq(next).addClass('active');
            now=next;
        }
        let t=setInterval(move1,2000);
    }
    lunbo(imgli,now,next);


    //楼层跳转
    let nav=document.querySelector('.nav');
    let floor=document.querySelectorAll('.floor>section');
    let navs=document.querySelectorAll('.nav>li');
    let flag=true;
    let flag1=false;
    let color=["#F04A08","#ffff00","green","yellow","#00cc00","#ff99ff","blue"];
    let num=0;
    window.onscroll=function () {
        let scrollTop=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
        floor.forEach(function (value,index) {
            if(scrollTop>=value.offsetTop-100){
                for(let i=0;i<navs.length;i++){
                    navs[i].style.background="#fff";
                    navs[i].classList.remove('active');
                }
                navs[index].style.background=color[index];
                navs[index].classList.add('active');
                num=index;
            }
        })
        if(scrollTop>=floor[0].offsetTop-300){
            if(flag){
                flag=false;
                // animate(search,{height:60},500,function () {
                //     flag1=true;
                // });
                animate(nav,{height:350,width:50},500,function () {
                    flag1=true;
                });
            }
        }else{
            if(flag1){
                flag1=false;
                // animate(search,{height:0},500,function () {
                //     flag=true;
                // });
                animate(nav,{height:0,width:0},500,function () {
                    flag=true;
                });
            }
        }
    }
    navs.forEach(function (value,index) {
        value.onclick=function () {
            animate(document.body,{scrollTop:floor[index].offsetTop-100},500);
            animate(document.documentElement,{scrollTop:floor[index].offsetTop-100},500);
            num=index;
        }
        value.onmouseover=function () {
            value.style.background=color[index];

        }
        value.onmouseout=function () {
            if(num!=index){
                value.style.background="#fff";
                value.style.color="#000";
            }
        }
    })


});