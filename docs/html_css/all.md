史上最全HTML5面试题目汇总 原创
wx5f5619df3fb272021-06-07 20:26:19
文章标签IT职场前端面试文章分类IT职场其它阅读数159

1.HTML5 为什么只需要写 <!DOCTYPE HTML>？
答案解析：
HTML5不基于SGML，因此不需要对DTD进行引用，但是需要DOCTYPE来规范浏览器的行为（让浏览器按照他们应该的方式来运行）而HTML4.01基于SGML，所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。

 
2、行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？
答案解析：
行内元素：a  b  span  img  input  select  strong
块级元素：div  ul  ol  li  dl  dt  dd  h1  h2  h3  h4  p  等
空元素：<br>  <hr>  <img>  <link> <meta>

3、页面导入样式时，使用link和@import有什么区别？
答案解析：
1）link属于XHTML标签，而@import是css提供的；
2）页面被加载时，link会同时被加载，而@import引用的css会等到页面被加载完再加载；
3）@import只在IE5以上才能识别，而link是XHTML标签，无兼容问题；
4）link方式的样式的权重高于@import的权重。

4、html5有哪些新特性、移除了那些元素？如何处理HTML5新标签的浏览器兼容问题？
答案解析：
新特性，新增元素：
1）内容元素：article、footer、header、nav、section
2）表单控件：calendar、date、time、email、url、search
3）控件元素：webworker，websockt，Geolocation
移除元素：
1）显现层元素：basefont，big，center，font，s，strike，tt，u
2）性能较差元素：frame，frameset，noframes
处理兼容问题有两种方式：
1）IE6/IE7/IE8支持通过document方法产生的标签，利用这一特性让这些浏览器支持HTML5新标签。
2）使用是html5shim框架
另外，DOCTYPE声明的方式是区分HTML和HTML5标志的一个重要因素，此外，还可以根据新增的结构，功能元素来加以区分。

5、如何区分 HTML 和 HTML5？
答案解析：
1）在文档类型声明上不同：
HTML是很长的一段代码，很难记住，而HTML5却只有简简单单的声明，方便记忆。
2）在结构语义上不同：
HTML：没有体现结构语义化的标签，通常都是这样来命名的<div id="header"></div>，这样表示网站的头部。
HTML5：在语义上却有很大的优势。提供了一些新的标签，比如：<header><article><footer>

6、简述一下你对HTML语义化的理解？
答案解析：
1）用正确的标签做正确的事情；
2）html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析；
3）即使在没有样式css情况下也以一种文档格式显示，并且是容易阅读的；
4）搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO；
5）使于都源代码的人对网站更容易将网站分块，便于阅读维护理解。

7、HTML5的离线储存怎么使用，工作原理能不能解释一下？
答案解析：
localStorage 长期存储数据，浏览器关闭后数据不丢失；
sessionStorage 数据在浏览器关闭后自动删除。

8、iframe有那些缺点？
答案解析：
1）在网页中使用框架结构最大的弊病是搜索引擎的“蜘蛛”程序无法解读这种页面；
2）框架结构有时会让人感到迷惑，页面很混乱；

9、Doctype作用? 严格模式与混杂模式如何区分？它们有何意义?
答案解析：
1）<!Doctype>声明位于文档中的最前面，处于<html>标签之前。告知浏览器的解析器，用什么文档类型规范来解析这个文档。
2）严格模式的排版和JS运作模式是以该浏览器支持的最高标准运行。
3）在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站点无法工作。
4）DOCTYPE不存在或格式不正确会导致文档以混杂模式呈现。

10、常见兼容性问题？
1）png24位的图片在IE6浏览器上出现背景；
解决方案是：做成PNG8；
2）浏览器默认的 margin 和 padding 不同。
解决方案是：加一个全局的*{margin:0;padding:0;}来统一。
3）IE6双边距bug：块属性标签float后，又有横行的 margin 情况下，在 IE6 显示 margin 比设置的大。浮动IE产生的双倍距离 #box{float:left;width:10px;margin:0 0 0 100px;} 这种情况下IE6会产生200px的距离。
解决方法：加上_display：inline，使浮动忽略
4）IE下，可以使用获取常规属性的方法来获取自定义属性，也可以使用getAttribute()获取自定义属性； Firefox下，只能使用getAttribute()获取自定义属性。
解决方法：统一通过getAttribute()获取自定义属性。
5）IE下，even对象有x，y属性，但是没有pageX，pageY属性，但是没有x，y属性；
解决方法：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。
6）Chrome中文界面下默认会将小于 12px 的文本强制按照 12px 显示
解决方法：可通过加入 CSS 属性 -webkt-text-size-adjust:none;解决
7）超链接访问过后 hover 样式就不出现了，被点击访问过的超链接样式不在具有 hover 和 active ；
解决方法：改变CSS属性的排列顺序：L-V-H-A: a:link{ }  a:visited{ } a:hover{ } a:active{ } 

11、如何实现浏览器内多个标签页之间的通信？
答案解析：
调用localstorge、cookies等本地存储方式

12、webSocket如何兼容低浏览器？
答案解析：
Adobe Flash Socket 、 ActiveX HTMLFile (IE) 、 基于 multipart 编码发送 XHR 、 基于长轮询的 XHR

13、支持HTML5新标签
答案解析：
1）IE8/IE7/IE6支持通过 document.createElement 方法产生的标签，可以利用这一特性让这些浏览器支持 HTML5 新标签，浏览器支持新标签后，还需要添加标签默认的样式；
2）当然最好的方式是直接使用成熟的框架、使用最多的是 html5shim 框架
<!--[if lt IE 9]> 
<script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script> 
<![endif]-->

14、如何区分：DOCTYPE 声明\新增的结构元素\功能元素，语义化的理解？
答案解析：
1）用正确的标签做正确的事情；
2）html语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；
3）在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的；
4）搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利用 SEO ；
5）使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

15、介绍一下 CSS 的盒子模型？
答案解析：
1）有两种，IE 盒子模型、标准 W3C 盒子模型； IE 的 content 部分包含了 border 和 padding；
2）盒模型：内容（content）、填充（padding）、边界（margin）、边框（border）。

16、CSS 选择符有哪些？哪些属性可以继承？优先级算法如何计算？ CSS3 新增伪类有哪些？
答案解析：
1）id 选择器（#myid）
2）类选择器（.myclassname）
3）标签选择器（div，h1，p）
4）相邻选择器（h1 + p）
5）子选择器（ul > li）
6）后代选择器（li a）
7）通配符选择器（* ）
8）属性选择器（ a[rel = "external"]）
9）伪类选择器（a: hover, li: nth - child）

17、可继承的样式： font-size font-family color, UL LI DL DD DT

18、不可继承的样式：border padding margin width height

19、优先级就近原则，同权重情况下样式定义最近者为准

20、载入样式以最后载入的定位为准;
解析答案：优先级为: !important >  id > class > tag  ；   important 比 内联优先级高 

21、CSS3新增伪类举例：
答案解析：
p:first-of-type   选择属于其父元素的首个 <p> 元素的每个 <p> 元素；
p:last-of-type   选择属于其父元素的最后 <p> 元素的每个 <p> 元素；
p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素；
p:only-child    选择属于其父元素的唯一子元素的每个 <p> 元素；
p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素；
:enabled  :disabled 控制表单控件的禁用状态；
:checked        单选框或复选框被选中。

22、如何居中div？ 如何居中一个浮动元素？
答案解析：
给div 设置一个宽度，然后添加 margin:0 auto 属性；div{width:200px; margin:0 auto; }

23、居中一个浮动元素
答案解析：
确定容器的宽高  宽500 高300的层，设置层的外边距
.div{width:500px;height:300px;margin:-150px 0 0 -250px;position:relative;background:green；left：50%；头：50%}

24、css3有哪些新特性？
答案解析：
CSS3 实现圆角（border-radius:8px;），阴影（box-shadow:10px）,对文字加特效（text-shadow）,线性渐变（gradient），旋转（transform）
transform:rotate(9deg) scale(0.85,0.90) translate(0px,-30px) skew(-9deg,0deg);//旋转，缩放，定位，倾斜
增加了更多的 css 选择器 多背景 rgba

25、为什么要初始化 CSS 样式
答案解析：
因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对 CSS 初始化往往会出现浏览器之间的页面显示差异。
当然，初始化样式会对 SEO 有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。
最简单的初始化方法是：*{padding:0;margin:0} (不建议)
淘宝的样式初始化：
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, 
        textarea, th, td { margin:0; padding:0; } 
        body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; } 
        h1, h2, h3, h4, h5, h6{ font-size:100%; } 
        address, cite, dfn, em, var { font-style:normal; } 
        code, kbd, pre, samp { font-family:couriernew, courier, monospace; } 
        small{ font-size:12px; } 
        ul, ol { list-style:none; } 
        a { text-decoration:none; } 
        a:hover { text-decoration:underline; } 
        sup { vertical-align:text-top; } 
        sub{ vertical-align:text-bottom; } 
        legend { color:#000; } 
        fieldset, img { border:0; } 
        button, input, select, textarea { font-size:100%; } table { border-collapse:collapse; border-spacing:0; } 

26、display:inline-block 什么时候会显示间隙？
答案解析：
移除空格，使用margin 负值、使用 font-size:0、letter-spacing 、word-spacing

27、使用 CSS 预处理器吗？喜欢哪个？
答案解析：SASS

 

28、什么是盒子模型？

答案解析：

在网页中，一个元素占有空间的大小由几个部分构成，其中包括元素的内容（content），元素的内边距（padding），元素的边框（border），元素的外边距（margin）四个部分。这四个部分占有的空间中，有的部分可以显示相应的内容，而有的部分只用来分隔相邻的区域或区域。4个部分一起构成了css中元素的盒模型。

 

29、CSS实现垂直水平居中

答案解析：

一道经典的问题，实现方法有很多种，以下是其中一种实现：

HTML结构：

 

<div class="wrapper">

    <div class="content"></div>

</div>

 

CSS：

 

.wrapper{position:relative;}

    .content{

        background-color:#6699FF;

        width:200px;

        height:200px;

        position: absolute;        //父元素需要相对定位

        top: 50%;

        left: 50%;

        margin-top:-100px ;   //二分之一的height，width

        margin-left: -100px;

    }

 

30、简述一下src与href的区别

答案解析：

href 是指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。

 

src是指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是头部。

 

31、简述同步和异步的区别

答案解析：

同步是阻塞模式，异步是非阻塞模式。

同步就是指一个进程在执行某个请求的时候，若该请求需要一段时间才能返回信息，那么这个进程将会一直等待下去，直到收到返回信息才继续执行下去；

异步是指进程不需要一直等下去，而是继续执行下面的操作，不管其他进程的状态。当有消息返回时系统会通知进程进行处理，这样可以提高执行的效率。

 

32、px和em的区别

答案解析：

px和em都是长度单位，区别是，px的值是固定的，指定是多少就是多少，计算比较容易。em得值不是固定的，并且em会继承父级元素的字体大小。

浏览器的默认字体高都是16px。所以未经调整的浏览器都符合: 1em=16px。那么12px=0.75em, 10px=0.625em

 

 

33、浏览器的内核分别是什么?

答案解析：

IE: trident内核

Firefox：gecko内核

Safari：webkit内核

Opera：以前是presto内核，Opera现已改用Google Chrome的Blink内核

Chrome：Blink(基于webkit，Google与Opera Software共同开发)