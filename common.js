/**
 * Created by J-LIN on 2017/9/14.
 */

/**
 * 取到双标签之间的文本
 * @param ele 就代表你传入什么元素，我就帮你取这个元素标签里的内容
 * @returns {string} 取到的文本
 */
function getTextContent(ele){

    //能力检测
    if(ele.textContent){ //0,'',undefined,null能转换为成false

        //如果支持这个属性，就直接用这个取到文本再返回
        return ele.textContent;

    }else{//证明是IE8以前

        //就用innerText返回
        return ele.innerText;
    }
}

/**
 * 找到某个元素的下一个兄弟元素
 * @param ele  找谁的下一个兄弟
 * @returns {*}  下一个兄弟元素
 */
function getNextElementSibling(ele) {

    //能力检测
    if (ele.nextElementSibling) {

        return ele.nextElementSibling;
    } else {
        //证明是IE8以前版本

        //只要type不是1，我就一直找下一个
        var node = ele.nextSibling;

        if(node == null || node == undefined){

            return;
        }

        while(node.nodeType != 1){

            node = node.nextSibling;
            if(node == null || node == undefined){

                return;
            }
        }

        return node;
    }
}


/**
 * 找到上一个兄弟元素
 * @param ele
 * @returns {*}
 */
function getPreviousElement(ele){

    if(ele.previousElementSibling){

        return ele.previousElementSibling;
    }else{

        //证明是IE8以前
        var node =  ele.previousSibling;
        if(node == null || node == undefined){

            return;
        }

        while(node.nodeType != 1){

            node = node.previousSibling;
            if(node == null || node == undefined){

                return;
            }
        }

        return node;
    }
}


/**
 * 获得某个元素的属性的当前值
 * @param obj  哪个元素
 * @param property 获取什么属性
 * @returns {*}   属性的值
 */
function getStyle(obj, property) {

    //能力检测
    if (window.getComputedStyle) {

        return window.getComputedStyle(obj, null)[property];
    } else {
        //能来到这肯定是IE
        return obj.currentStyle[property];

    }
}


/**
 * 获取页面滚出高度和滚出宽度
 * @returns {{scrollTop: number, scrollLeft: number}} 返回纯数字
 */
function getPageScroll() {

    return {

        scrollTop: window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop
        || 0,

        scrollLeft: window.pageXOffset
        || document.documentElement.scrollLeft
        || document.body.scrollLeft
        || 0
    }
}

/**
 * 获取可视区域的的宽度和高度,以便做响应式
 * @returns {{clientWidth: number, clientHeight: number}}
 */
function getClientSize() {

    return {

        clientWidth: window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth
        || 0,

        clientHeight: window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight
        || 0
    }
}

/**
 * 获取对象在页面中的位置
 * @param e  事件对象
 * @returns {{pageX: (number|Number|*), pageY: (number|Number|*)}}
 */
function getPagePosition(e) {

    return {

        pageX: e.pageX || getPageScroll().scrollLeft + e.clientX,
        pageY: e.pageY || getPageScroll().scrollTop + e.clientY
    }
}

/**
 * 阻止事件冒泡
 * @param e  事件对象
 * 在IE/Opera中，是window.event，而在Firefox中，是event
 * 而事件的触发对象，在IE中是window.event.srcElement，在Firefox中是event.target，而在Opera中则两者都支持。
 */
function stopPropagation(e){

    e = e || window.event;

    if(e.stopPropagation){

        e.stopPropagation();

    }else{
        //来到这证明是IE8
        e.cancelBubble = true;
    }
}

/**
 * 阻止事件对象的默认行为
 * @param e  事件对象
 */
function stopDefault(e){

    e = e || window.event;

    if(e.preventDefault){

        e.preventDefault();
    }else{

        e.returnValue = false
    }
}

////////////////////////////////////////////////////////////

作者：不落誓言
链接：https://www.jianshu.com/p/5faa5aceeaef
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
// 把所有方法封装到一个对象里面，充分考虑兼容写法
var EventUtil = {
  // 添加DOM事件
  addEvent: function(element, type, handler) {
    if(element.addEventListener) { //DOM2级
      element.addEventListener(type, handler, false);//false表示该元素在事件的“冒泡阶段”（由内向外传递时）响应事件。
    }else if(element.attachEvent) {  //IE
      element.attachEvent("on"+ type, handler);
    }else {
      element["on" + type] = handler;
    }
  },
  // 移除DOM事件
  removeEvent: function(element, type, handler) {
    if(element.removeEventListener) { //DOM2级
      element.removeEventListener(type, handler, false);
    }else if(element.detachEvent) {  //IE
      element.detachEvent("on"+ type, handler);
    }else {
      element["on" + type] = null;
    }
  },
  // 阻止事件冒泡
  stopPropagation: function(ev) {
    if(ev.stopPropagation) {
      ev.stopPropagation();
    }else { //IE
      ev.cancelBubble = true;
    }
  },
  // 阻止默认事件
  preventDefault: function(ev) {
    if(ev.preventDefault) {
      ev.preventDefaule();
    }else {//IE
      ev.returnValue = false;
    }
  },
  // 获取事件源对象
  getTarget: function(ev) {
    return event.target || event.srcElement; //target--FF,srcElement--IE,chrome两者都有
  },
  // 获取事件对象
  getEvent: function(e) {
    var ev = e || window.event; //window.event--IE
    if(!ev) {
      var c = this.getEvent.caller;
      while(c) {
        ev = c.arguments[0];
        if(ev && Event == ev.constructor) {
          break;
        }
        c = c.caller;
      }
    }
    return ev;
  }
};

作者：不落誓言
链接：https://www.jianshu.com/p/5faa5aceeaef
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
