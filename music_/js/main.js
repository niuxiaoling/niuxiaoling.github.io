/**
 * Created by dell on 2017/7/5.
 */
$(function () {

    // 音乐按钮开始
    let audio=$('audio');
    let database=[
        {id:0,name:"小幸运",author:"谭咏仪",album:'幸运区',src:'music/小幸运.mp3'},
        {id:1,name:"意外",author:"薛之谦",album:'意外',src:"music/意外.mp3"},
        {id:2,name:"飘洋过海来看你",author:"周杰伦",album:'看你',src:"music/漂洋过海来看你.mp3"}
        ];

    let current=0;

    // 循环将内容加载到页面中
    let ul = $('.middle-content>ul');
    let music_name=$('.music-name');
    database.forEach((value)=>{
        let li = $('<li>');
        li.setAttribute('src',value.src);
        li.setAttribute('id',value.id);
        li.innerHTML = `
            <input type="checkbox" class="check">
            <div class="onplay"></div>
            <div class="item-1">${value.name}</div>
            <div class="item-2">${value.author}</div>
            <div class="item-3">${value.album}</div>
            <div class="love icon-heilongjiangtubiao12"></div>
        `;
        ul.appendChild(li);
    })

    //播放和停止
    let btn = $('.bottom-left');//获得按钮
    btn.children[1].onclick = function () {
        if(audio.paused){ //如果是暂停的，就打开
            audio.play();
            this.style.background = 'url("img/1.png") no-repeat 0 -30px';
        }else{
            audio.pause();//暂停方法
            this.style.background = 'url("img/1.png") no-repeat 0  0px';
        }
    }

    //时间变化  时间变化=当前时间/总时间
    let time = $('.player-progress'); //时间父节点
    audio.ontimeupdate = function () {
        time.children[0].innerHTML = format(audio.currentTime); //获得当前的时间
        time.children[2].innerHTML = format(audio.duration) //获得总的时间长度
        time.children[1].children[0].style.left=audio.currentTime/audio.duration*time.children[1].offsetWidth+'px';
        time.children[1].children[1].style.width=audio.currentTime/audio.duration*100+"%";
    }
    //时间格式的变化
    function format(time) {
        var time=Math.round(time);
        var s=Math.trunc(time/60)>10?Math.trunc(time/60):"0"+Math.trunc(time/60);//获得分钟
        var m=Math.trunc(time%60)>10?Math.trunc(time%60):"0"+Math.trunc(time%60);//获得秒数
        return s+":"+m; //时间格式为00:00
    }

    //音量的变化
    let volume = $('.volume');
    let volumetiao = volume.children[1];
    let currentvolume = 1;
    // audio.volumn的值再0-1之间，音量
    volume.children[0].onclick = function () {
        if(audio.volume == 0){
            audio.volume = currentvolume;
            volume.children[0].style.background = 'url("img/1.png") no-repeat 0 -295px';
            volumetiao.firstElementChild.style.width = 100+"px";
            volumetiao.lastElementChild.style.left = volumetiao.offsetWidth-2+'px';
        }else{
            audio.volume = 0;
            volume.children[0].style.background = 'url("img/1.png") no-repeat 0 -313px';
            volumetiao.firstElementChild.style.width = 0;
            volumetiao.lastElementChild.style.left = -2+"px";
        }
    }
    //设置音量进度条的变化
    volumetiao.onclick = function (e) {
        if(e.target.nodeName == 'A'){
            return;
        }
        volumetiao.children[0].style.width=e.offsetX+'px';
        volumetiao.children[1].style.left=e.offsetX/volumetiao.offsetWidth*100+'px';
        audio.volume = e.offsetX/volumetiao.offsetWidth;
        currentvolume = audio.volume;
    }

    //左右音乐变化
    function move(type){
        //左击时下标减减
        if(type == 'l'){
            current--;
            if(current < 0){
               current=database.length-1;
            }
        //右击时下标加加
        }else if(type == 'r'){
            current++;
            if(current>database.length-1){
                current = 0;
            }
        }
        //在数据库找出与当前下标相同的下标
        let result = database.findIndex((value)=>{
            return  value.id == current;
        });
        //将数据库里当前的地址赋给音频
        audio.src = database[result].src;
        music_name.innerHTML=database[result].name;
        //遍历列表删除背景色和显示的音乐幅度
        [...ul.children].forEach((value,index) => {
            value.style.background='';
            value.children[1].style.display='none';
            imgbox.children[index].style.display='none';
            box.children[index].style.display='none';

        })
        //为当前增加显示
        ul.children[current].style.background='rgba(0,0,0,.18)';
        ul.children[current].children[1].style.display='block';
        //右侧图片的显示
        imgbox.children[current].style.display='block';
        //大背景图的显示
        box.children[current].style.display='block';

        // 开启播放，并将按钮改为播放状态
        audio.play();//播放
        btn.children[1].style.background = 'url("img/1.png") no-repeat 0 -30px';

    }
    btn.children[0].onclick=function(){
        move('l');
    }
    btn.children[2].onclick=function () {
        move('r');
    };

    //双击播放歌曲列表
    ul.ondblclick=function (e) {
        //获取真正触发的事件
        var obj=e.srcElement||e.target;
        //判断是否是li(包括子元素也在 li上面所以要再判断下)
        if(obj.nodeName=='LI'||obj.parentNode.nodeName =='LI'){
            //将所有触发的事件都定为li
            obj=obj.nodeName == 'LI'? obj:obj.parentNode;
            //1.在数据库中筛选出你要播放的下一曲或者是上一曲
            let result = database.findIndex((value)=>{
                return value.id == obj.id;
            })
            //将筛选出的地址给音频
            audio.src = database[result].src;
            //遍历删除li的显示类
            [...ul.children].forEach((value,index)=>{
                value.style.background='';
                value.children[1].style.display='none';
                imgbox.children[index].style.display='none';
                box.children[index].style.display='none';
            })
            console.log(result);
            //播放条歌曲内容的显示
            music_name.innerHTML=database[result].name;
            //为当前增加显示类
            ul.children[result].style.background='rgba(0,0,0,.18)';
            ul.children[result].children[1].style.display='block';
            //右侧图片当前内容的显示
            imgbox.children[result].style.display='block';
            //大背景图的显示
            box.children[result].style.display='block';
            audio.play();//播放
            btn.children[1].style.background = 'url("img/1.png") no-repeat 0 -30px';

        }
    };

    //收藏的变化
       [...ul.children].forEach((value,index) => {
           value.lastElementChild.onclick=function () {
               this.classList.toggle('icon-xin');
           }
       })

    //右侧图片的变化
    let imgbox=$('.middle-top-img');
    let database1=[
        {id:0,src:"img/1.jpg"},
        {id:1,src:"img/2.png"},
        {id:2,src:"img/4.jpg"},
        ];
    database1.forEach(function (value) {
        let div=$('<div>');
        div.className="middle-img";
        div.setAttribute('id',value.id);
        div.innerHTML=`
            <img src=${value.src} >
        `;
        imgbox.appendChild(div);
    });

    //大背景图片的变化
    let box = $('.box');
    database1.forEach(function (value) {
        let img = $('<img>');
        img.src = value.src;
        img.setAttribute('id',value.id);
        box.appendChild(img);
    })


})