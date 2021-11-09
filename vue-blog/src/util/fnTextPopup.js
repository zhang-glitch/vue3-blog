export default function fnTextPopup () {
  var click_cnt = 0;
  var $html = document.getElementsByTagName("html")[0];
  var $body = document.getElementsByTagName("body")[0];
  $html.onclick = function (e) {
    // 特殊处理 md代码的e复制图标点击不要弹出文字
    if (e.target.tagName === "svg") {
      return
    }
    var $elem = document.createElement("b");
    $elem.style.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    $elem.style.zIndex = 9999;
    $elem.style.position = "absolute";
    $elem.style.select = "none";
    var x = e.pageX;
    var y = e.pageY;
    $elem.style.left = (x - 10) + "px";
    $elem.style.top = (y - 20) + "px";
    clearInterval(anim);
    let arr = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'];
    click_cnt = parseInt(Math.random() * 12) + 1// 0 - 1 总共11
    switch (click_cnt) {
      case 12:
        $elem.innerText = "❤";
        break;
      default:
        $elem.innerText = arr[click_cnt];
        break;
    }
    $elem.style.fontSize = Math.random() * 10 + 8 + "px";
    var increase = 0;
    var anim;
    setTimeout(function () {
      anim = setInterval(function () {
        if (++increase == 150) {
          clearInterval(anim);
          $body.removeChild($elem);
        }
        $elem.style.top = y - 20 - increase + "px";
        $elem.style.opacity = (150 - increase) / 120;
      }, 8);
    }, 70);
    $body.appendChild($elem);
  };
}


