# 盒子水平垂直居中的方案

### 1.定位：3种
#### (1).absolute + margin // 需要知道宽高
<pre>
<code>
body {
    position: relative;
}

.box {
    width: 100px;
    height: 100px;

    position: absolute;
    top: 50%;
    left: 50%;
    margin: -50px 0 0 -50px;
}
</code>
</pre>

#### (2).top, left, right, bottom + margin: auto // 需要有宽高，不用知道具体宽高是多少
<pre>
<code>
body {
    position: relative;
}

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
</code>
</pre>

#### (3).absolute + transform // 不需要宽高，有兼容性问题
<pre>
<code>
body {
    position: relative;
}

.box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</code>
</pre>


## 2.display:flex // 有兼容性问题，移动端常用此方式
<pre>
<code>
body {
    display: flex;
    justify-content: center;
    align-items: center;
}
</code>
</pre>

## 3.Javascript
<pre>
<code>
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
</code>
</pre>

## 4.display: table-cell
<pre>
body {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    // => 宽高不能是百分比,必须是固定宽高
}

.box {
    display: inline-block;
}
</pre>

# …………………………

# css盒子模型

1.标准盒子模型
box-sizing：content-box
盒子大小不固定，会随着padding, margin, border改变而改变


2.IE盒子模型
box-sizing: border-box
盒子大小固定，缩放内容

3.flex盒模型
flex container: 弹性盒子父容器
flex item: 弹性盒子内容项

main axis: 主轴， 横轴
cross axis: 交叉轴，纵轴

* display: 开启弹性盒子模型
* flex-direction: 属性决定主轴的方向（即项目的排列方向）
* flex-wrap: 决定布局项目是否可以换行
* flex-flow: flex-direction和flex-wrap
* justify-content: 定义项目在主轴上的对齐方式
* align-items: 定义项目在交叉轴上如何对齐
* align-content: 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

以下属性定义在内容项上：
* order: 定义项目的排列顺序。数值越小，排列越靠前，默认为0
* flex-grow: 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
* flex-shrink: 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
* flex-basis: 定义了在分配多余空间之前，项目占据的主轴空间
* flex: 是flex-grow, flex-shrink和flex-basis的简写，默认值为0 1 auto。后两个属性可选
* align-self: 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性



4.多列布局盒模型

# …………………………

# 移动端响应式布局的三大方案

### @media: 通过媒体查询，写不同的样式（大众化）
### rem: 等比缩放（大众化）
### flex: 适用于部分内容的布局
### vh／vw: 视口分为100分，百分比布局


# …………………………


# …………………………


# …………………………


# …………………………


# …………………………


# …………………………


# …………………………


# …………………………


# …………………………


# …………………………


# …………………………














