// 移动端推荐使用addEventListener 添加事件
/*这种事件可以添加多个
能够添加一些移动端新增的事件 滑动事件 过渡完成事件 动画完成事件*/
// 这种方式也比较符合框架里面添加事件的方式
window.addEventListener('load', function() {
    searchFade();
    countDown();
    slide();
});
/*搜索框渐变的特效*/
function searchFade() {
    //搜索框渐变的JS代码放到这个函数里面写
    // 1. 添加一个滚动条滚动的事件
    window.addEventListener('scroll', searchOpacity);
    searchOpacity();

    function searchOpacity() {
        // 2. 获取滚动条滚动的距离
        var scrollTop = getScrollTop();
        var slideHeight = document.querySelector('#slide').offsetHeight;
        if (scrollTop < slideHeight) {
            var opacity = (scrollTop / slideHeight) * 0.8;
            document.querySelector('#topbar').style.backgroundColor = 'rgba(255,0,0,' + opacity + ')';
        } else {
            document.querySelector('#topbar').style.backgroundColor = 'rgba(255,0,0,0.8)';
        }
    }
}

function getScrollTop() {
    var scrollPos;
    if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
    } else if (document.compatMode && document.compatMode != 'BackCompat') {
        scrollPos = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollPos = document.body.scrollTop;
    }
    return scrollPos;
}
// 倒计时JS函数
function countDown() {
    // 获取未来时间
    var weilai = new Date('2017-12-22 20:00:00').getTime()/1000;
    //获取当前时间
    var dangqian = new Date().getTime()/1000;
    // 倒计时秒杀时间
    var time = Math.floor(weilai-dangqian);
    //获取元素
    var spans = document.querySelectorAll(".seckill-count-down span");
    //设置计时器
    var timeId = setInterval(function(){
        time --;
        if(time<=0){
            time=0;
            //清除计时器
            clearInterval(timeId);
        }
        //求当前对应的时分秒
        var hour = Math.floor(time/3600);
        var min = Math.floor(time%3600/60);
        var secound = Math.floor(time%60);

        //添加到页面上
        spans[0].innerHTML = Math.floor(hour/10);
        spans[1].innerHTML = Math.floor(hour%10);
        spans[3].innerHTML = Math.floor(min/10);
        spans[4].innerHTML = Math.floor(min%10);
        spans[6].innerHTML = Math.floor(secound/10);
        spans[7].innerHTML = Math.floor(secound%10);

    },1000)

}
// 轮播图JS函数
function slide() {
   
   
    var index= 1;
    var slideUl = document.querySelector('#slide ul');
    var slideWidth = document.querySelector('#slide').offsetWidth;
    var timeId = null;
    startTime();
    function startTime(){
        timeId = setInterval(function(){
            index++;
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
            slideUl.style.transition = 'all 200ms ease';
        },1000);
    }
 
    var lis = document.querySelectorAll('#slide ol li');
    slideUl.addEventListener('transitionend',function(){
        // console.log(index + "过渡完成了");
        if (index >= 9){
            index=1;
            slideUl.style.transition = 'none';
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
        }


         // 4.8 在过渡完成事件里面判断如果是第1张往左切换到第8张切换完毕后要迅速调回第8张的真实位置
         if (index <= 0) {
            //4.9 回到第8张图的真实位置
            index = 8;
            //4.10. 清除过渡
            slideUl.style.transition = 'none';
            //4.11 .设置位移
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
        }

        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove('active');

        }
        lis[index-1].classList.add('active');
    });
    //3.1定义位置距离的变量 开始的X 滑动中的X  滑动的距离X
    var startX = moveX = distanceX =0;
    //3.2 添加滑动开始事件记录滑动开始的X
    slideUl.addEventListener('touchstart',function(e){
        //3.6滑动开始前清除计时器
        clearInterval(timeId);
        startX = e.touches[0].clientX;
    });
    //3.3添加滑动中事件,记录滑动中的X;
    slideUl.addEventListener('touchmove',function(e){
        moveX = e.touches[0].clientX
        //3.4计算滑动距离
        distanceX =moveX -startX ;
        slideUl.style.transform = 'translateX(' + (-index * slideWidth + distanceX) + 'px)';
        //3.7清除过渡
        slideUl.style.transition = 'none';

    });

    //4.1 滑动结束后的处理  需要判断当前滑动的距离如果不超过一张图的距离的1/3就会弹,如果超过了就切换图片
    slideUl.addEventListener('touchend',function(){
        //4.2判断当前的距离是不是超过一张图的1/3   注意要用绝对值 因为距离有可能是负值Math.abs(distanceX)
        if(Math.abs(distanceX)>(slideWidth/3)){
            //4.3判断当前的distanceX是正值还是负值
            if(distanceX>0){
                index--;
            }else {
                index++;
            }
            //4.6 要设置位移
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
            // 4.7 设置过渡
            slideUl.style.transition = 'all 200ms ease';
        }else {
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
            // 4.7 设置过渡
            slideUl.style.transition = 'all 200ms ease';
        }
        //4.12 滑动结束的时候重新启动计时器
        startTime();
    });
}
