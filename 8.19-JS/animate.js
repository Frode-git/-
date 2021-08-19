function animate(obj, target, callback) {
    clearInterval(obj.timer); // 每次调用动画函数时，先将对象中的定时器删掉，这样就能保证只有一个定时器
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10; // 每次都要计算步长  
        // 发现，停止时，所在位置，并不是目标位置  这是因为，含有小数时，会出现偏差问题，因此需要转化为整数
        // 转化为整数，又有一个问题，整数应该往大了取整，负数应该往小了取整，8.1，取9，理应在8.1，取8则往回跑了，-8.1取-9即往小取
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if (callback) { // 有该实参传递，则自动调用
                callback(); // 回调函数一定要在盒子停止时再调用  
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
};
