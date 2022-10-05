# 一、盒子水平垂直居中的方案

### 1、定位：3种
#### (1) absolute + margin // 需要知道宽高

    body { position: relative; }
    .box {
        width: 100px;
        height: 100px;
    
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -50px 0 0 -50px;
    }

#### (2) top, left, right, bottom + margin: auto // 需要有宽高，不用知道具体宽高是多少

    body { position: relative; }
    .box {
        width: 100px;
        height: 100px;
    
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }

#### (3) absolute + transform // 不需要宽高，有兼容性问题

    body { position: relative; }
    .box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }


### 2、display:flex // 有兼容性问题，移动端常用此方式
    body {
        display: flex;
        justify-content: center;
        align-items: center;
    }

### 3、Javascript
    let HTML = document.documentElement,
        winW = HTML.clientWidth, // 
        winH = HTML.clientHeight, // 
        box = document.getElementById('box'),
        boxW = box.offsetWidth, // 
        boxH = box.offsetHeight; // 

    // 需要设置符合子body的position为relative
    box.style.position = 'absolute';
    box.style.left = (winW - boxW) / 2 + 'px';
    box.style.top = (winH - boxH) / 2 + 'px';
    
![Alt](../images/clientWidth.png)

### 4、display: table-cell

    body {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        // => 宽高不能是百分比,必须是固定宽高
    }
    
    .box { display: inline-block; }


# 二、CSS盒子模型

#### 1、标准盒子模型，box-sizing：content-box，盒子大小会随着padding, margin, border改变而改变

#### 2、IE盒子模型，box-sizing: border-box，盒子大小固定，缩放内容

#### 3、flex盒模型
* flex container: 弹性盒子父容器
* flex item: 弹性盒子内容项
* main axis: 主轴，横轴
* cross axis: 交叉轴，纵轴

    * display: 开启弹性盒子模型
    * flex-direction: 属性决定主轴的方向（即项目的排列方向）
    * flex-wrap: 决定布局项目是否可以换行
    * flex-flow: flex-direction和flex-wrap
    * justify-content: 定义项目在主轴上的对齐方式
    * align-items: 定义项目在交叉轴上如何对齐
    * align-content: 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

* 以下属性定义在内容项上：
    * order: 定义项目的排列顺序。数值越小，排列越靠前，默认为0
    * flex-grow: 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
    * flex-shrink: 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
    * flex-basis: 定义了在分配多余空间之前，项目占据的主轴空间
    * flex: 是flex-grow, flex-shrink和flex-basis的简写，默认值为0 1 auto。后两个属性可选
    * align-self: 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性

#### 4、多列布局盒模型


# 三、移动端响应式布局的三大方案

*  @media: 通过媒体查询，写不同的样式（大众化）
*  rem: 等比缩放（大众化）
*  flex: 适用于部分内容的布局
*  vh／vw: 视口分为100分，百分比布局


# 四、简述一下你对HTML语义化的理解？
* 1、用正确的标签做正确的事情
* 2、html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析
* 3、即使在没有样式css情况下也以一种文档格式显示，并且是容易阅读的
* 4、搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO
* 5、使于都源代码的人对网站更容易将网站分块，便于阅读维护理解


# 五、常见兼容性问题有哪些？
* 1、png24位的图片在IE6浏览器上出现背景；
  * 解决方案是：做成PNG8；

* 2、浏览器默认的margin和padding不同。
  * 解决方案是：加一个全局的*{margin:0;padding:0;}来统一。

* 3、IE6双边距bug：块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大。浮动IE产生的双倍距离#box{float:left;width:10px;margin:0 0 0 100px;} 这种情况下IE6会产生200px的距离。
  * 解决方法：加上_display：inline，使浮动忽略

* 4、IE下，可以使用获取常规属性的方法来获取自定义属性，也可以使用getAttribute()获取自定义属性；Firefox下，只能使用getAttribute()获取自定义属性。
  * 解决方法：统一通过getAttribute()获取自定义属性。

* 5、Chrome中文界面下默认会将小于12px的文本强制按照12px显示
  * 解决方法：可通过加入CSS属性-webkt-text-size-adjust:none;解决

* 6、超链接访问过后hover样式就不出现了，被点击访问过的超链接样式不在具有hover和 active；
  * 解决方法：改变CSS属性的排列顺序：L-V-H-A: a:link{}  a:visited{} a:hover{} a:active{}


# 六、简述同步和异步的区别

* 1、同步是阻塞模式，异步是非阻塞模式
* 2、同步就是指一个进程在执行某个请求的时候，若该请求需要一段时间才能返回信息，那么这个进程将会一直等待下去，直到收到返回信息才继续执行下去
* 3、异步是指进程不需要一直等下去，而是继续执行下面的操作，不管其他进程的状态。当有消息返回时系统会通知进程进行处理，这样可以提高执行的效率


# 七、浏览器的内核分别是什么?

* 1、IE浏览器：Trident内核，也是俗称的IE内核；
* 2、Chrome浏览器：统称为Chromium内核或Chrome内核，以前是Webkit内核，现在是Blink内核；
* 3、Firefox浏览器：Gecko内核，俗称Firefox内核；
* 4、Safari浏览器：Webkit内核；
* 5、Opera浏览器：最初是自己的Presto内核，后来是Webkit，现在是Blink内核；


# 八、display:none; 和visibility:hidden;的区别是什么？

* 1、display: none; 彻底消失，释放空间。能引发页面的reflow回流（重排）。
* 2、visibility: hidden; 就是隐藏，但是位置没释放，好比opacity: 0; 不引发页面回流。


# 九、px、em、rem、vh、vw分别是什么？

* 1、px物理像素，绝对单位
* 2、em相对于自身字体大小，如果自身没有大小则相对于父级字体大小，如果父级也没有则一层一层向上查找，直到找到html为止，相对单位
* 3、rem相对于html的字体大小，相对单位
* 4、vh相对于屏幕高度的大小，相对单位
* 5、vw相对于屏幕宽度的大小，相对单位


# 十、CSS清除浮动的方法
* 1、直接设置父元素高度
* 2、额外标签法：在父元素内容的最后添加一个块级元素，给添加的块级元素设置clear: both
* 3、伪元素清除法：给高度塌陷的父元素添加一个:after伪元素，并给这个伪元素设置一定的样式，来清除浮动


        (1)基本写法
        .clearfix:after {
            content: '.';           /*设置内容为空*/
            display: block;         /*将文本转为块级元素*/
            clear: both;            /*清除浮动*/
            /* 补充代码：在网页中看不到伪元素 */
            height: 0;              /*高度为0*/
            visibility: hidden;     /*将元素隐藏*/
        }       
        .clearfix {
            *zoom:1;	/*为了兼容IE*/
        }

        (2)Bootstrap写法：
        .clearfix:before,
        .clearfix:after { /* 清除浮动 */
            content: '';
            display: table;
        }        
        .clearfix:after { /* 真正清除浮动的标签 */
            clear: both;
        } 


# 十一、HTML5新增加了哪些新特性？
* 1、拖放（drag and drop）API
* 2、语义化更好的内容标签（header, nav, footer, aside, article, section）
* 3、音频，视频（audio,  video）API
* 4、画布（Canvas）API
* 5、地理（Geolocation）API
* 6、本地离线存储（localStorage），即长期存储数据，浏览器关闭后数据不丢失
* 7、会话存储（sessionStorage），即数据在浏览器关闭后自动删除
* 8、表单控件包括 calendar, date, time,  email, url,  search
* 9、新的技术包括 webwork,  websocket


# 十二、HTML5中如何实现应用缓存？
* 1、需要指定"manifest"文件，创建一个缓存manifest文件后，在HTML页面中提供manifest链接：

        <html manifest="demo.appcache">
        
        manifest 文件可分为三个部分：
        CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存
        NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
        FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）

* 2、manifest文件的建议的文件扩展名是：".appcache"
* 3、manifest文件的内容类型应是："text/cache-manifest"
* 4、所有manifest文件都以"CACHE MANIFEST"语句开始：

        CACHE MANTEEST
        # version 1.0
        /demo.css
        /demo.js
        /demo.png

* 第一次运行以上文件时，它会添加到浏览器应用缓存中，在服务器宕机时，页面从应用缓存中获取数据。


# 十三、说说你对WebWorker和WebSocket的理解

#### 1、WebWorker：
* WebWorker的作用，就是为JavaScript创造多线程环境，允许主线程创建 Worker线程，将一些任务分配给后者运行
* WebWorker线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。
* WebWorker的最简单用法是执行计算量大的任务，而不会中断用户界面。

#### 2、WebSocket：
* WebSocket是一种在单个TCP连接上进行全双工通信的协议。
* WebSocket使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。
* 在WebSocket API中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。


# 十四、cookie sessionStorage localStorage的区别
#### 1、相同点：
* 都是存储在浏览器端，且同源的

#### 2、不同点：
* 1、cookie数据会在同源的http请求中作为请求头携带，服务端可以通过set-Cookies响应头设置同源cookie的数据，localStorage、sessionStorage不会主动把数据发给服务端，尽在本地保存
* 2、cookie可以通过设置domain和path来设置作用范围，localstorage、sessionstorage不可以
* 3、存储大小限制不同，cookie数据不能超过4k，因为http请求每次都会携带cookie信息，所以cookie只适合存储很小的数据，节省网络资源。sessionStorage、localStorage存储大小限制为5M或更大
* 4、数据有效期：sessionStorage进在当前浏览器窗口关闭之前有效。localStorage始终有效，主要用作持久数据。cookie可设置过期时间，过期之前一直有效，如果不设置过期时间则浏览器关闭就无效


# 十五、script标签的async和defer属性有什么区别？
* 1、script没有defer或async，浏览器会立即加载并执行指定的脚本，也就是说不等待后续载入的文档元素，读到就加载并执行。
* 2、defer属性表示延迟执行引入的JavaScript，即这段JavaScript加载时，HTML并未停止解析，这两个过程是并行的。当整个document解析完毕后再执行脚本文件，在DOMContentLoaded事件触发之前完成。多个脚本按顺序执行。
* 3、async属性表示异步执行引入的JavaScript，与defer的区别在于，如果已经加载好，就会开始执行，也就是说它的执行仍然会阻塞文档的解析，只是它的加载过程不会阻塞。多个脚本的执行顺序无法保证。


