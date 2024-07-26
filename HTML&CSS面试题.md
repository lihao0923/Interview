# HTML5&CSS3


# 一、盒子水平垂直居中的方案

### 1、定位：3种

    .wrapper { position: relative; }
    .box {
        width: 100px;
        height: 100px;
    
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -50px 0 0 -50px;
    }
    // (1)absolute + margin 需要知道宽高

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
    // (2) top, left, right, bottom + margin: auto // 需要有宽高，不用知道具体宽高是多少

    .box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    // (3) absolute + transform // 不需要宽高，有兼容性问题


### 2、display: flex // 有兼容性问题，移动端常用此方式
    body {
        display: flex;
        justify-content: center;
        align-items: center;
    }

### 3、display: table-cell

    .wrapper {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        // => 宽高不能是百分比,必须是固定宽高
    }
    
    .box { display: inline-block; }


# 二、CSS盒子模型

#### 1、标准盒模型，box-sizing：content-box，盒子大小会随着padding, margin, border改变而改变；

#### 2、IE盒模型(怪异盒模型)，box-sizing: border-box，盒子大小固定，缩放内容；

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

#### 4、多列布局盒模型 columns


# 三、移动端响应式布局的方案

* 1、@media: 通过媒体查询，写不同的样式
* 2、rem: 等比缩放，以html标签的font-size为参考
* 3、flex: 适用于部分内容的布局
* 4、vh/vw: 视口分为100分，百分比布局



# 四、简述一下你对HTML语义化的理解？
* 1、用正确的标签做正确的事情；
* 2、HTML语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析；
* 3、即使在没有样式css情况下也以一种文档格式显示，并且是容易阅读的；
* 4、搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO；
* 5、使维护源代码的人更容易将网站分块，便于阅读维护理解；


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

* 1、同步是阻塞模式，异步是非阻塞模式；
* 2、同步就是指一个进程在执行某个请求的时候，若该请求需要一段时间才能返回信息，那么这个进程将会一直等待下去，直到收到返回信息才继续执行下去；
* 3、异步是指进程不需要一直等下去，而是继续执行下面的操作，不管其他进程的状态。当有消息返回时系统会通知进程进行处理，这样可以提高执行的效率。


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


        （1）基本写法
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

        （2）Bootstrap写法：
        .clearfix:before,
        .clearfix:after { /* 清除浮动 */
            content: '';
            display: table;
        }        
        .clearfix:after { /* 真正清除浮动的标签 */
            clear: both;
        } 



# 十一、css如何画一个三角形
#### 通过border+transparent设置

    .triangle {
        width: 0;
        height: 0;
        border: 100px solid transparent;
        border-bottom-color: red;
    }


    .triangle {
        width: 160px;
        height: 200px;
        // outline: 2px solid skyblue;
        background-repeat: no-repeat;
        background-image: linear-gradient(32deg, orangered 50%, rgba(255, 255, 255, 0) 50%), linear-gradient(148deg, orangered 50%, rgba(255, 255, 255, 0) 50%);
        background-size: 100% 50%;
        background-position: top left, bottom left;
    }

    // linear-gradient
    // 两个div遮挡
    // font字体库


# 十二、css3新特性

#### 1、CSS3选择器
    （1）属性选择器 img[alt='新能源车']
    （2）伪类选择器 :before :after :focus (清除浮动就用伪类选择器)

#### 2、CSS3边框与圆角
    （1）CSS3圆角 border-radius
    （2）盒阴影  box-shadow
    （3）边框图像 border-image

#### 3、CSS3背景与渐变
    （1）CSS3背景
        background-image;
        background-size;
        background-origin;
        background-clip;
    （2）CSS3渐变
        background-image: linear-gradient(#e66465, #9198e5); 
        radial-gradient(red, yellow, green);

#### 4.CSS3过渡
    （1）transition：设置元素当过渡效果，四个简写属性为：   
    （2）transition-property：过渡属性名  
    （3）transition-duration：规定完成过渡效果需要花费的时间  
    （4）transition-timing-function：指定切换效果的速度  
    （5）transition-delay：指定何时将开始切换效果  
    （6）cubic-bezier(x1,y1,x2,y2)：贝塞尔曲线，是控制变化的速度曲线  

#### 5、CSS变换
    （1）transform：应用于元素的2D或3D转换。这个属性允许你将元素旋转，缩放，移动，倾斜等。
    （2）transform-origin：允许更换元素的位置。2D转换元素可以改变元素的X和Y轴。3D还可以更改元素的Z轴。
    （3）transform-style：指定嵌套元素是怎样在三维中呈现。

#### 6、CSS3动画
    （1）animation-name：为@keyframe动画名称
    （2）animation-duration：动画指定需要多少秒或多少毫秒完成
    （3）animation-timing-function：设置动画将如何完成一个周期
    （4）animation-delay：设置动画在启动前的延迟
    （5）animation-iteration-count：定义动画的播放次数
    （6）animation-direction：指定是否应该反向播放动画


# 十三、谈谈你对BFC的理解？
#### 1、什么是BFC

    （1）BFC(Block formatting context)直译为“块级格式化上下文”。BFC它是一个独立的渲染区域，只有*Block-level box（块元素）参与，它规定了内部的Block-level box如何布局，并且与这个区域外部毫不相关；
    （2）可以理解成：创建了BFC的元素就是一个独立的盒子，里面的子元素不会在布局上影响外面的元素（里面怎么布局都不会影响外部），BFC仍属于文档中的普通流；
    （3）不是所有的元素，模式都能产生BFC。



#### 2、BFC的布局规则
    （1）内部的Box会在垂直方向，一个接一个地放置。
    （2）Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
    （3）每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
    （4）BFC的区域不会与float box重叠。
    （5）BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
    （6）计算BFC的高度时，浮动元素也参与计算。

#### 3、如何创建BFC
    （1）float的值不是none。
    （2）position的值不是static或者relative
    （3）display的值是inline-block、table-cell、flex、table-caption或者inline-flex
    （4）overflow的值不是visible
#### 4、BFC的作用
    （1）利用BFC避免margin重叠
    （2）清除浮动的影响
    （3）防止文字环绕



# 十四、HTML5新增加了哪些新特性？
    1、拖放（drag and drop）API
    2、语义化更好的内容标签（header, nav, footer, aside, article, section）
    3、音频，视频（audio,  video）API
    4、画布（Canvas）API
    5、地理（Geolocation）API
    6、本地离线存储（localStorage），即长期存储数据，浏览器关闭后数据不丢失
    7、会话存储（sessionStorage），即数据在浏览器关闭后自动删除
    8、表单控件包括 calendar, date, time,  email, url,  search
    9、新的技术包括 webwork,  websocket


# 十五、HTML5中如何实现应用缓存？
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


# 十六、说说你对WebWorker和WebSocket的理解

### 1、WebWorker：
* WebWorker的作用，就是为JavaScript创造多线程环境，允许主线程创建 Worker线程，将一些任务分配给后者运行
* WebWorker线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。
* WebWorker的最简单用法是执行计算量大的任务，而不会中断用户界面。

### 2、WebSocket：
* WebSocket是一种在单个TCP连接上进行全双工通信的协议。
* WebSocket使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。
* 在WebSocket API中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。


# 十七、cookie、sessionStorage、localStorage的区别
### 1、相同点：
* 都是存储在浏览器端，且同源的

### 2、不同点：
* 1、cookie数据会在同源的http请求中作为请求头携带，服务端可以通过set-Cookies响应头设置同源cookie的数据，localStorage、sessionStorage不会主动把数据发给服务端，尽在本地保存
* 2、cookie可以通过设置domain和path来设置作用范围，localstorage、sessionstorage不可以
* 3、存储大小限制不同，cookie数据不能超过4k，因为http请求每次都会携带cookie信息，所以cookie只适合存储很小的数据，节省网络资源。sessionStorage、localStorage存储大小限制为5M或更大
* 4、数据有效期：sessionStorage进在当前浏览器窗口关闭之前有效。localStorage始终有效，主要用作持久数据。cookie可设置过期时间，过期之前一直有效，如果不设置过期时间则浏览器关闭就无效


# 十八、script标签的async和defer属性有什么区别？
* 1、script没有defer或async，浏览器会立即加载并执行指定的脚本，也就是说不等待后续载入的文档元素，读到就加载并执行。
* 2、defer属性表示延迟执行引入的JavaScript，即这段JavaScript加载时，HTML并未停止解析，这两个过程是并行的。当整个document解析完毕后再执行脚本文件，在DOMContentLoaded事件触发之前完成。多个脚本按顺序执行。
* 3、async属性表示异步执行引入的JavaScript，与defer的区别在于，如果已经加载好，就会开始执行，也就是说它的执行仍然会阻塞文档的解析，只是它的加载过程不会阻塞。多个脚本的执行顺序无法保证。


# 十九、为什么超链接访问过后hover样式就不出现了？如何解决？
* 被点击访问过的超链接样式不在具有hover和active了
* 解决方法是改变CSS属性的排列顺序: L-V-H-A（link, visited, hover, active）


# 二十、什么是Css Hack？ie6,7,8的hack分别是什么？
答案：针对不同的浏览器写不同的CSS code的过程，就是CSS hack。

    #test {  
        width:300px;  
        height:300px;  
        background-color:blue;   /*firefox*/
        background-color:red\9;  /*all ie*/
        background-color:yellow; /*ie8*/
        +background-color:pink;  /*ie7*/
        _background-color:orange; /*ie6*/ 
    } 
    :root #test { background-color:purple\9; } /*ie9*/
    @media all and (min-width:0px){ #test {background-color:black;} } /*opera*/
    @media screen and (-webkit-min-device-pixel-ratio:0){ #test {background-color:gray;} } /*chrome and safari*/


# 二十一、什么是外边距重叠？重叠的结果是什么？

**外边距重叠就是margin-collapse**。在CSS当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距。

折叠结果遵循下列计算规则：

* 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
* 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
* 两个外边距一正一负时，折叠结果是两者的相加的和。



# 二十二、Sass、Less是什么？为什么要使用他们？
Sass、Less都是CSS预处理器。他是CSS上的一种抽象层。他们是一种特殊的语法/语言编译成CSS。

例如Less是一种动态样式语言. 将CSS赋予了动态语言的特性，如变量，继承，运算， 函数. Less 既可以在客户端上运行 (支持IE 6+, Webkit, Firefox)，也可一在服务端运行 (借助 Node.js)。

为什么要使用它们？

* 结构清晰，便于扩展。
* 可以方便地屏蔽浏览器私有语法差异。
* 可以轻松实现多重继承。
* 完全兼容CSS代码，可以方便地应用到老项目中。




# 二十三、IE的双边距BUG
**IE的双边距BUG：块级元素float后设置横向margin，IE6显示的margin比设置的较大。解决：加入display：inline。**



# 二十四、html常见兼容性问题？
**1、** 双边距BUG float引起的  使用display
**2、** 3像素问题 使用float引起的 使用dislpay:inline -3px
**3、** 超链接hover 点击后失效  使用正确的书写顺序 link visited hover active
**4、** Ie z-index问题 给父级添加position:relative
**5、** Png 透明 使用js代码 改
**6、** Min-height 最小高度 ！Important 解决’
**7、** select 在ie6下遮盖 使用iframe嵌套
**8、** 为什么没有办法定义1px左右的宽度容器（IE6默认的行高造成的，使用over:hidden,zoom:0.08 line-height:1px）
**9、** IE5-8不支持opacity，解决办法：

    .opacity {
        opacity: 0.4
        filter: alpha(opacity=60); /* for IE5-7 */
        -ms-filter: “progid:DXImageTransform.Microsoft.Alpha(Opacity=60)”; /* for IE 8*/
    }

**10、** IE6不支持PNG透明背景，解决办法: IE6下使用gif图片





# 二十五、Doctype作用? 严格模式与混杂模式区分它们有何意义?
1、`<!DOCTYPE html>` 声明位于文档中的最前面，处于html标签之前。告知浏览器的解析器，用什么文档类型规范来解析这个文档。
2、严格模式的排版和JS运作模式是以该浏览器支持的最高标准运行。
3、在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站点无法工作。
4、DOCTYPE不存在或格式不正确会导致文档以混杂模式呈现。


# 二十六、浏览器渲染页面的步骤

1、解析html，生成DOM树；解析CSS，生成CSSOM树；

2、将DOM树和CSSOM树结合，生成渲染树(Render Tree)；

3、Layout(回流)：根据生成的渲染树，计算它们在设备视口(viewport)内的确切位置和大小，这个阶段是回流；

4、Painting(重绘)：根据渲染树以及回流得到的几个信息，得到节点的绝对像素；

5、Display：将像素发送给GPU，展示在页面上。

![browser_render](/images/browser_render.png)



# 二十七、DOM的重绘(Repaint)和重排(回流)(Reflow)
#### 1、重绘
重绘： 元素样式的改变(但宽高、大小、位置等不变)
    
    比如我只是把当前元素的背景颜色变了，visibility、color、background-color等

#### 2、重排
重排：元素的大小或者位置发生变化(当页面布局和几何信息发生变化的时候)，触发了重新布局，导致渲染树重新计算布局和渲染。

    如添加或者删除可见的DOM元素
    元素的位置发生变化
    元素的尺寸发生变化
    回流就是结构得重新算这就是回流

**注意：** 重排一定会触发重绘，重绘不一定触发重排。



# 二十八、CSS选择器和优先级

选择器权重
|id选择器 | #id |100|
|---|--|--|
类选择器| .classname| 10
属性选择器| div[class="foo"] | 10
伪类选择器| div::last-child | 10
标签选择器| div| 1
伪元素选择器| div:after| 1
兄弟选择器| div+span| 0
子选择器| ui>li| 0
后代选择器| div span| 0
通配符选择器| |0

**优先级**
!important > 内联样式 > ID选择器 > 类选择器/伪类选择器/属性选择器 > 标签选择器/伪元素选择器 > 关系选择器/通配符选择器


# 二十九、伪元素和伪类的区别

伪元素创建了一个新元素，用::表示，比如::before或者::after(目前一部分浏览器为了达到一个更好的兼容性效果，双冒号可以写成单冒号，但是一些低版本浏览器还是不支持的)
伪类是一个已经存在的元素但是不能被我们看到, 用:表示，比如：:hover

* 常见的伪元素有哪些：

        ::before、::after表示元素内容区域的前面、后面
        ::first-letter 表示第一个字
        ::first-line 表示第一行
        ::section 表示选中部分
        ::placeholder 表示占位文本

* 常见的伪类：

        :link 未点击的时候
        :visited 点击时
        :hover 悬停时
        :active 被激活时
        :focus 聚焦时
        :not(x) 不是x
        :first-child 第一个
        :last-child 最后一个
        :nth-child(x) 第x个
        :nth-last-child(x) 倒数第x个
        :checked 选中
        :disabled 禁用





# 三十、两栏布局
两栏布局非常常见，通常是一个宽度固定和一个宽度自适应的布局排列展示，如下形式展示:
![two_columns.png](/images/two_columns.png)


#### 1、方法1：float+margin实现

    <div class="box">
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
    .left {
        width: 200px;
        float: left;
    }
    .right {
        width: auto;
        margin-left: 200px;
    }



#### 2、方法2：左float，右overflow:hidden触发BFC
    
    .left{
        width: 200px;
        float: left;
    }
    .right{
        overflow: hidden;
    }


#### 3、方法3：左绝对定位，右margin负值

将父级元素设置为相对定位。左边元素设置为absolute定位，并且宽度设置为200px。将右边元素的margin-left的值设置为200px

    .box {
        position: relative;
    }
    .left {
        width: 200px;
        position: absolute;
    }
    .right {
        margin-left: 200px;
    }


#### 4、方法4：Flex布局
将左边元素设置为固定宽度200px，将右边的元素设置为flex:1

    .box {
        display: flex;
    }
    .left {
        width: 200px;
    }
    .right {
        flex: 1;
    }



# 三十一、圣杯布局
利用浮动、负边距、相对定位实现。三列均设置左浮动，左右定宽，中间宽度100%，中间一列放在最前面，然后通过负边距进行调整，这时中间栏还是占据100%宽度，所以我们操作父元素给出和左右两栏相等的内边距，但是我们发现整体盒子被压缩了，所以我们再利用相对定位定到两边即可。

    <div class="box">
        <div class="mid">middle</div>
        <div class="left">left</div>
        <div class="right">right</div>
    </div>

    .box {
        padding-left: 200px;  /** 中间的元素宽度占满100%，所以文字被挡住了，我们操作父元素给出和左右两栏相等的内边距*/
        padding-right: 300px;
    }
    .left {
        width: 200px;
        float: left;
        margin-left: -100%; /** 先让三栏位于一行，左栏设置margin-left: -100%，此时左栏位于第一行首部*/
        position: relative;
        left: -200px;
    }
    .right {
        width: 300px;
        float: left;
        margin-left: -300px;
        position: relative;
        right: -300px;
    }
    .mid {
        width: 100%;
        float: left;
    }

# 三十二、双飞翼布局
双飞翼布局可以说是圣杯布局的改进版，他们达到的效果相同，都是侧边两栏宽度固定，中间栏宽度自适应。主要的区别在于解决中间部分被挡住的问题时，圣杯是在父元素上设置了左右内边距，再给左右设置相对定位，通过左移和右移即可。而双飞翼是在中间栏再加个div来放置内容，再给这个新的div设置margin值来避开遮挡即可。

    <div class="box">
        <div class="mid">
            <div class="midContent">middle</div>
        </div>
        <div class="left">left</div>
        <div class="right">right</div>
    </div>

    .left {
        width: 200px;
        height: 200px;
        background-color: rgb(172, 254, 224);
        float: left;
        margin-left: -100%; /** 先让三栏位于一行，左栏设置margin-left: -100%，此时左栏位于第一行首部*/
    }
    .mid {
        float: left;
        width: 100%;
    }
    .midContent {
        height: 200px;
        background-color: yellow;
        margin-left: 200px;
        margin-right: 300px;
    }
    .right {
        width: 300px;
        height: 200px;
        background-color: rgb(228, 135, 249);
        float: left;
        margin-left: -300px;
    }


# 三十三、 src和href的区别
src和href都可以用来引入外部的资源。两者区别如下：

* **src**常用于img、video、audio、script元素，当浏览器解析到该元素时，会暂停其它资源下载，直到将该资源加载、编译、执行完毕。这也是为什么将js脚本放在底部而不是头部的原因。它会将资源内容嵌入到当前标签所在的位置。

* **href**常用于a、link元素，指向外部资源所在的位置，和当前元素位置建立链接，当浏览器解识别到它指向的位置，将其下载的时候不会阻止其他资源的加载解析。


# 三十四、iframe的作用以及优缺点
嵌入式框架，可以把一个网页的框架和内容嵌入到现有的网页中。

**优点：**
* 可以将网页原封不动的加载进来 
* 增加代码的可用性  
* 用来加载显示较慢的内容，如广告、视频等

**缺点：**
* 加载的内容无法被浏览器引擎识别，对SEO不友好
* 会阻塞onload事件加载
* 会产生很多页面，不利于管理


# 三十五、script标签中defer和async的区别

在HTML中，script 标签可以使用defer和async属性来控制外部JavaScript脚本加载和执行的方式。defer和async都可以提高页面的加载性能，主要区别如下：

区别点|	defer |	async |
| --- | --- | ---- |
加载顺序 | 按顺序加载 | 异步加载，不保证加载顺序 |
执行顺序 | 按文档中出现的顺序执行 | 加载完立即执行，不保证执行顺序 |
执行时机 | HTML文档完全解析后执行，但在DOMContentLoaded事件之前|	可能在HTML文档解析完成之前执行 |
阻塞行为 | 不会阻塞HTML的解析，浏览器解析HTML文档，脚本在后台异步加载。 |	不会阻塞HTML的解析，浏览器解析HTML文档，脚本在后台异步加载。 |
适用场景 | 需要保证执行顺序，并在文档解析完成后再执行的脚本。如依赖于DOM的脚本。 | 不依赖其他脚本、不依赖 DOM 的独立脚本。如分析工具或广告脚本。|

**注意：**
    如果不使用defer或async属性，浏览器在遇到 `<script>` 标签时会阻塞 HTML 解析，直到脚本加载和执行完毕后才继续解析。使用defer或async后，脚本的记载是异步的，由网络进程实现，不会阻HTML解析；脚本的执行是同步的，会占用渲染进程，defer脚本的执行不会阻塞解析，但async脚本可能会阻塞HTML解析。



# 三十六、 盒模型
CSS3 中的盒模型有以下两种：标准盒模型、IE盒模型。两种盒子模型都是由content+padding+border+margin构成，其大小都是由content+padding+border决定的，但是盒子内容宽/高度（即 width/height）的计算范围根据盒模型的不同会有所不同：

#### 1、标准盒模型：

盒子总宽度 = width + padding + border + margin;
盒子总高度 = height + padding + border + margin

也就是，width/height 只是内容高度，不包含padding和border值。

#### 2、IE盒模型：

盒子总宽度 = width + margin;
盒子总高度 = height + margin;

也就是，width/height 包含了padding和border值。


#### 3、可以通过 box-sizing 来改变元素的盒模型：
box-sizing: content-box ：标准盒模型（默认值）。
box-sizing: border-box ：IE（替代）盒模型。


# 三十七、可继承属性和不可继承属性
继承是指的是给父元素设置一些属性，后代元素会自动拥有这些属性。

**可继承：**
font-weight      字体系列属性
caption-side     表格布局属性
list-style            列表属性
line-height        文本系列属性
cursor               光标属性
visibility            元素可见性
...

**不可继承：**
margin、padding、border
display
background
overflow
width、height
position
...


# 三十八、grid网格布局
Grid 布局即网格布局，是一个二维的布局方式，由纵横相交的两组网格线形成的框架性布局结构，能够同时处理行与列。擅长将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层次等关系容器属性：

**display：创建一个块级行内网格容器**
* grid-template-columns 属性设置列宽，grid-template-rows 属性设置行高
* grid-row-gap 属性、grid-column-gap 属性分别设置行间距列间距。grid-gap 属性是两者的简写形式
* grid-template-areas：用于定义区域，一个区域由一个或者多个单元格组成
* grid-auto-flow：排列方式，默认为行
* justify-items 属性设置单元格内容的水平位置（左中右），align-items 属性设置单元格的垂直位置（上中下，place-items属性是align-items属性和justify-items属性的合并简写形式
* justify-content属性是整个内容区域在容器里面的水平位置（左中右），align-content属性是整个内容区域的垂直位置（上中下）
* grid-auto-rows与grid-auto-columns就是专门用于指定隐式网格的宽高

**项目属性：**
* grid-column-start 属性：左边框所在的垂直网格线
* grid-column-end 属性：右边框所在的垂直网格线
* grid-row-start 属性：上边框所在的水平网格线
* grid-row-end 属性：下边框所在的水平网格线
* grid-area 属性指定项目放在哪一个区域



# 三十九、隐藏元素方法

**1、display：none;** 元素在文档中不存在，不会占据位置。
**2、visibility：hidden;** 元素在文档中的位置还保留，仍然占据空间。
**3、opacity：0;** 将透明度设置为0。
**4、z-index：负值;** 直接将元素放置在最下层，利用其他元素来遮盖。
**5、position：absolute;** 将元素定位到可视区域以外。
**6、设置height、width模型属性为0**


# 四十、 CSS3动画有哪些

#### 1、transition实现渐变动画属性如下：
property:填写需要变化的css属性
duration:完成过渡效果需要的时间单位(s或者ms)
timing-function:完成效果的速度曲线
delay: 动画效果的延迟触发时间

#### 2、transform 转变动画包含四个常用的功能：
translate：位移
scale：缩放
rotate：旋转
skew：倾斜

#### 3、animation 实现自定义动画


# 四十一、响应式设计
响应式网站设计是一种网络页面设计布局，页面的设计与开发应当根据用户行为以及设备环境(系统平台、屏幕尺寸、屏幕定向等)进行相应的响应和调整响应式设计的基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理，为了处理移动端，页面头部必须有meta声明viewport。


    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no”>


**属性对应如下：**

    width=device-width: 是自适应手机屏幕的尺寸宽度
    maximum-scale: 是缩放比例的最大值
    inital-scale: 是缩放的初始化
    user-scalable: 是用户的可以缩放的操作

**实现响应式布局的方式有如下：**

    媒体查询media query
    百分比
    vw/vh
    rem


# 四十二、CSS提高性能的方法
css实现性能的方式可以从选择器嵌套、属性特性、减少http这三面考虑，同时还要注意css代码的加载顺序。

    1、内联首屏关键CSS：内联css关键代码能够使浏览器在下载完html后就能立刻渲染；
    2、异步加载CSS；
    3、资源压缩：利用webpack、gulp/grunt、rollup等模块化工具，将css代码进行压缩；
    4、合理使用选择器：不要嵌套使用过多复杂选择器，使用id选择器就没必要再进行嵌套；
    5、减少使用昂贵的属性：发生重绘的时候，昂贵属性如box-shadow会降低浏览器的渲染性能；
    6、不要使用@import：@import会影响浏览器的并行下载，使得页面在加载时增加额外的延迟。


# 四十三、介绍对浏览器内核的理解
* 浏览器内核分或两部分：渲染引擎和JS引擎。
* 渲染染引擎：将代码转换成页面输出到浏览器界面。
* JS引擎：解析和执行javascript来实现网页的动态效果。
* 最开始渲染引擎和Js引擎并没有区分得很明确，后来Js引擎越来越独，内核就倾向于只指渲染引擎。


# 四十四、描述下渐进增强和优雅降级设计思想
**渐进增强（从上往下）**：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能，达到更好的用户体验。

**优雅降级（从下往上）：** 一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容。




# 四十五、前端中的优雅降级和渐进增强

优雅降级和渐进增强是两种在 Web 开发中常用的设计哲学，旨在确保网站在不同浏览器和设备上的兼容性，提供更好的用户体验。

优雅降级是指首先开发一个功能完整的网站，并确保其在现代浏览器中正常运行。然后，为较老的浏览器提供降级方案，使其能够以某种方式工作，而不是完全崩溃。这种方法的目标是确保网站在各种环境中都能正常运行，同时保留一些现代浏览器的高级功能。

相反，渐进增强是指先考虑较老的浏览器和设备，确保网站在这些环境中能够良好运行。然后，为现代浏览器提供额外的功能和优化，以提供更好的用户体验。这种方法的目标是确保网站在任何情况下都可以工作，并为一些现代浏览器提供额外的优化和功能。

#### 1、优雅降级
**优点：**
* 优雅降级的方法适用于那些想要充分利用现代浏览器功能的开发人员。
* 这种方法重点关注现代浏览器的性能和功能，因此可以更好地利用这些浏览器的功能，提供更好的用户体验。
* 在现代浏览器中使用较新的技术和功能，可以为用户提供更好的体验，并为网站的成功贡献了很大一部分。

**缺点：**
* 优雅降级可能会导致在旧版浏览器或设备上出现问题。如果没有提供降级方案，网站可能会出现错误或根本无法使用。
* 如果在项目中使用了太多现代技术和功能，那么在较老的浏览器上使用降级方案可能会很复杂，导致开发人员需要编写大量的代码和测试用例。

#### 2、渐进增强
**优点：**
* 渐进增强方法适用于那些想要确保他们的网站在各种浏览器和设备上都能够良好运行的开发人员。
* 这种方法更注重网站的基础功能，并确保这些功能在任何浏览器或设备上都能够正常使用。
* 在提供了基础功能后，可以为现代浏览器提供额外的优化和功能，以提供更好的用户体验。

**缺点：**
* 渐进增强方法可能导致在现代浏览器上无法充分利用浏览器的性能和功能。
* 开发人员可能需要为旧版浏览器和现代浏览器分别编写大量的代码和测试用例，以确保网站在各种浏览器和设备上都能够良好运行。

#### 3、两者区别：
* 优雅降级和渐进增强都是确保网站在不同浏览器和设备上的兼容性和提供更好的用户体验的设计哲学。
* 优雅降级更注重现代浏览器的性能和功能，并在必要时提供降级方案。渐进增强更注重网站的基础功能，并为现代浏览器提供额外的优化和功能。
* 在优雅降级中，先开发功能完整的网站，然后为较老的浏览器提供降级方案。在渐进增强中，先考虑较老的浏览器和设备，确保网站在这些环境中能够良好运行，然后为现代浏览器提供额外的优化和功能。
* 优雅降级可能会导致在旧版浏览器或设备上出现问题，如果没有提供降级方案，网站可能会出现错误或根本无法使用。渐进增强可以确保网站在各种浏览器和设备上都能够良好运行，但是在现代浏览器上无法充分利用浏览器的性能和功能。
* 在实践中，开发人员通常会结合两种方法，以确保网站在任何环境下都能够良好运行，并尽可能提供更好的用户体验。例如，先开发基本功能并确保其在所有浏览器和设备上都能正常运行，然后为现代浏览器提供额外的优化和功能，同时为较老的浏览器提供降级方案。




































































































