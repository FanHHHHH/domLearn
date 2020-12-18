function showPic(whichPic) {
  if (!document.getElementById("placeholder")) return false; //增加健壮性
  const source = whichPic.getAttribute("href");
  const placeholder = document.getElementById("placeholder");
  if (!placeholder.nodeName === "IMG") return false;
  placeholder.setAttribute("src", source);
  if (document.getElementById("description")) {
    //增加健壮性
    const text = whichPic.getAttribute("title") ? whichPic.getAttribute("title") : "";
    const description = document.getElementById("description");
    if (description.childNodes[0].nodeType === 3) {
      description.childNodes[0].nodeValue = text;
    }
  }
  return true;
}

//childNodes和nodeType 使用
//nodeType 1 节点 2 属性 3 文本
function countBodyChildren() {
  const body_element = document.getElementsByTagName("body")[0];
  alert(body_element.nodeType);
}

function prepareGallary() {
  if (!document.getElementById || !document.getElementsByTagName || !document.getElementById("imagegallary")) return false; //增加健壮性
  const gallary = document.getElementById("imagegallary");
  const link = gallary.getElementsByTagName("a");
  for (let i = 0; i < link.length; i++) {
    // 实现html 和js 分离 不用写onclick="..."
    link[i].onclick = function () {
      return !showPic(this); // 优化：由showPic函数决定是否加载原本的src，如果showPic执行成功，则不需要跳转到src
    };
  }
}

//优化不能给winodw.onload添加多个函数
function addLoadEvent(func) {
  const oldonload = window.onload;
  if (typeof window.onload !== "function") {
    window.onload = func;
  } else {
    window.onload = function () {
      oldonload();
      func();
    };
  }
}
//实现加载完dom后再绑定事件
addLoadEvent(prepareGallary());
