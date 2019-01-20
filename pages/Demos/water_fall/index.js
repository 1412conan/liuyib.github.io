window.onload = function () {
  var oWrapper = document.getElementById('imgs-wrapper');
  var aImgs = oWrapper.getElementsByTagName('img');

  waterFall(); // init

  function waterFall() {
    var nGap = 10; // 图片间隙
    var nImgWidth = aImgs[0].offsetWidth; // 图片宽度
    var nClientWidth = getClient().width; // 可视区宽度
    var nColumns = parseInt(nClientWidth / (nImgWidth + nGap)); // 列数
    var aImgHeights = []; // 储存每列图片的总高度
    
    for (var i = 0; i < aImgs.length; i++) {
      var _currHeight = aImgs[i].offsetHeight; // 当前图片的高度

      if (i < nColumns) { // 第一行图片
        aImgs[i].style.top = 0;
        aImgs[i].style.left = (nImgWidth + nGap) * i + 'px';
        aImgHeights.push(_currHeight);
      } else { // 其他行
        var minHeight = getMinNum(aImgHeights); // 获取数组中最小高度
        var minIndex = aImgHeights.indexOf(minHeight); // 最小高度的索引
        var _thisLeft = aImgs[minIndex].offsetLeft;
        var _thisTop = aImgHeights[minIndex] + nGap;

        startMove(aImgs[i], {
          left: _thisLeft,
          top: _thisTop
        });

        // 添加新的图片后，更新数组中的最小高度
        aImgHeights[minIndex] = minHeight + nGap + _currHeight;
      }
    }
  }

  window.onresize = function() {
    waterFall();
  }

  var flag = false;
  
  window.onscroll = function() {
    if (flag) { return; }
    
    if (getClient().height + getScrollTop() >= aImgs[aImgs.length - 1].offsetTop) {
      flag = true;

      newImgs.forEach(function(item) {
        var oImg = document.createElement('img');
        oImg.src = item;
        oImg.alt = "new_img";
        oImg.style.opacity = 0;
        oWrapper.appendChild(oImg);
      });
    }
    
    // 延迟加载，否则图片没加载出来时，获取不到图片的高度
    setTimeout(function() {
      waterFall();

      setTimeout(function() {
        for (var i = 0; i < aImgs.length; i++) {
          aImgs[i].style.opacity = 1;
        }
      }, 800);
    }, 1000);
  };

  // 模拟获取到的 Ajax 数据
  var newImgs = [
    './imgs/1.jpg',
    './imgs/2.jpg',
    './imgs/3.jpg',
    './imgs/4.jpg',
    './imgs/5.jpg',
    './imgs/6.jpg',
    './imgs/7.jpg',
    './imgs/8.jpg',
    './imgs/9.jpg',
    './imgs/10.jpg',
    './imgs/11.jpg',
    './imgs/12.jpg',
    './imgs/13.jpg',
    './imgs/14.jpg',
    './imgs/15.jpg',
    './imgs/16.jpg',
    './imgs/17.jpg',
    './imgs/18.jpg',
    './imgs/19.jpg',
    './imgs/20.jpg'
  ];

  /**
   * 获取数组中的最小数
   * @param {Array} arr 数字数组
   */
  function getMinNum(arr) {
    return Math.min.apply(Math, arr);
  }

  function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  }

  function getClient() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
  }
};