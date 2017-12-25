/*
 * @Author: zhengwei
 * @Date:   2017-12-23 09:41:05
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-12-24 17:35:48
 */
window.addEventListener('load', function() {
    // getCategoryHeight();
    //调用 左侧滑动
    leftSwipe();
    //调用右侧滑动
    rightSwipe();
});

function getCategoryHeight() {
    // 1. 先获取屏幕的高度
    var windowHeight = document.documentElement.clientHeight;
    console.log(windowHeight);
    // 2. 获取顶部通栏的高度
    var topbarHeight = document.querySelector('#topbar').offsetHeight;
    // 3. 用屏幕高度减去顶部高度 设置给左右分类的父容器
    var categoryHeight = windowHeight - topbarHeight;
    // 4. 设置给左右分类的父容器
    document.querySelector('.category-left').style.height = categoryHeight + 'px';
    document.querySelector('.category-right').style.height = categoryHeight + 'px';
}   
// 左侧滑动JS
function leftSwipe() {
    // 1.1 获取要滑动的ul
    var slideUl = document.querySelector('.category-left ul');
    // 1.2 定义滑动的变量 startY  moveY  distanceY  currentY
    var startY = moveY = distanceY = currentY = 0;
    // 1.3 添加滑动开始事件记录开始的Y位置
    slideUl.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });
    // 1.4 添加滑动中事件 记录滑动中的Y位置
    slideUl.addEventListener('touchmove', function(e) {
        moveY = e.touches[0].clientY;
        // 1.5 记录滑动的距离 moveY - startY;
        distanceY = moveY - startY;
        // 1.6 设置slideUl的位移
        // slideUl.style.transform = 'translateY('+distanceY+'px)';
        // 1.8 设置slideUl的位移 要加上currentY
        // slideUl.style.transform = 'translateY('+(currentY + distanceY)+'px)';
        // 2.3 在滑动的时候判断 当前滑动的距离(currentY + distanceY) 如果小于最大或者大于最小滑动距离才允许滑动
        if ((currentY + distanceY) < maxSlide && (currentY + distanceY) > minSlide) {
            slideUl.style.transform = 'translateY(' + (currentY + distanceY) + 'px)';
            // 3.9 滑动的时候要清除过渡
            slideUl.style.transition = 'none';
        }
    });
    // 1.7 添加滑动结束事件 记录之前滑动的位置
    slideUl.addEventListener('touchend', function(e) {
        currentY += distanceY;
        // 3.3 在松开手的时候判断当前滑动的值 是否超过了松开手最大值
        if (currentY > maxPosition) {
            //3.4设置位移回到maxPosition的位置 注意不管是回到最大还是最小都要更新currentY 作为下一次滑动的起点
            currentY = maxPosition;
        } else if (currentY < minPosition) { //3.5  在松开手的时候判断当前滑动的值 是否超过了松开手最小值
            //3.6设置位移回到minPosition的位置
            currentY = minPosition
        }
        // 3.7 不管回到最大还是最小都要设置位置
        slideUl.style.transform = 'translateY(' + (currentY) + 'px)';
        // 3.8 设置过渡效果
        slideUl.style.transition = 'all 0.2s';
    });

    // 2.1 定义最大允许滑动值 
    var maxSlide = 0 + 200;
    // 2.2 定义最小允许滑动值 
    var parentHeight = document.querySelector('.category-left').offsetHeight;
    var childHeight = document.querySelector('.category-left ul').offsetHeight;
    // 用父容器600 - 子容器1200 - 200  == -800px
    var minSlide = parentHeight - childHeight - 200;
    // 3.1 定义松开手的最大值
    var maxPosition = 0;
    // 3.2 定义松开手的最小值
    var minPosition = parentHeight - childHeight;
    // 4.4 获取所有li
    var lis = document.querySelectorAll('.category-left ul li');
    // 4.1 给slideUl添加点击事件
    slideUl.addEventListener('click', function(e) {
        // 4.2 通过e.target获取真正触发事件的子元素 获取父元素li
        var li = e.target.parentNode;
        // 4.3 先清空所有li的active类名
        for (var i = 0; i < lis.length; i++) { 
            lis[i].classList.remove('active');
            // 4.7 给所有li添加一个索引的属性
            lis[i].dataset.index = i;
        }
        // 4.5给当前的li添加active类名
        li.classList.add('active');
        // 4.6 计算当前li需要位移的距离 当前-li索引*li的高度 例如0*50 = 0  -1*50   
        var slideHeight = -li.dataset['index'] * li.offsetHeight;
        // 4.8 判断当前位移距离如果超过了最小定位值 就设置为最小的定位 如果不超过就设置计算值 
        if (slideHeight < minPosition) {
            // 更新currentY 作为下一次滑动的起点
            currentY = minPosition;
        } else {
            currentY = slideHeight;
        }
        //1-
    });
}
// 右侧滑动JS
function rightSwipe() {
    // 传参传入的父容器选择器
    var myScroll = new IScroll('.category-right', {
        // 支持鼠标滚轮
        'mouseWheel': true,
        // 支持滚动条 注意给父容器加一个相对定位
        'scrollbars': true,
        'interactiveScrollbars': true
    });
}
