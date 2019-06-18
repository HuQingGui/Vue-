/* 
  使用js来规定rem    px -> rem

  750/viewport的宽度 = 设计稿的字体大小(100px)/ 模拟器中的字体大小

  模拟器中字体大小（rem ） = viewport*设计稿/750

  看参考的东西,
*/

function font () {
    document.documentElement.style.fontSize = document.documentElement.clientWidth/3.75  + 'px'
  }
  
  font()
  
  // 就可以检测到不同的设备
  window.onresize = font 