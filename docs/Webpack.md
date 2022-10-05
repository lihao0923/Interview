# 谈谈你对Webpack的理解
1.Webpack是什么？

webpack 是一个静态模块打包器，当 webpack 处理应用程序时，会递归构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 bundle。

webpack 就像一条生产线,要经过一系列处理流程(loader)后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的,多个流程之间有存在依赖关系,只有完成当前处理后才能交给下一个流程去处理。
插件就像是一个插入到生产线中的一个功能,在特定的时机对生产线上的资源做处理。 webpack 在运行过程中会广播事件,插件只需要监听它所关心的事件,就能加入到这条生产线中,去改变生产线的运作。



# Webpack 的运行流程是一个串行的过程，它的工作流程就是将各个插件串联起来。

命令行执行npx webpack打包命令开始
1.初始化编译参数:从配置文件和shell命令中读取与合并参数
2.开始编译:根据上一步得到的参数初始化Compiler对象，加载所有配置的Plugin，执行对象的 run 方法开始执行编译。
3.确定入口:根据配置中的 entry 找出所有的入口文件
4.编译模块:从入口文件触发，调用所有配置的Loader对模块进行翻译，再找出该模块依赖的模块，然后递归本步骤直到所有入口依赖的文件都进行翻译。
5.完成模块编译:在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系图。
6.输出资源：根据依赖关系图，组装成一个个包含多个模块的Chunk，再把每个Chunk转化成一个单独的文件加入到输出列表，根据配置确定输出的路径和文件名，输出。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑。



# Webpack中loader的作用/ loader是什么？
Loader本质就是一个函数，Loader是webpack中提供了一种处理多种文件格式的机制，因为webpack只认识JS和JSON，所以Loader相当于翻译官，将其他类型资源进行预处理。
用于对模块的"源代码"进行转换。
loader支持链式调用,链式调用的顺序是从右往左。链中的每个loader会处理之前已处理过的资源，最终变为js代码。
可以通过 loader 的预处理函数，为 JavaScript 生态系统提供更多能力。

# 常见的loader有哪些？
style-loader：将css添加到DOM的内联样式标签style里，然后通过 dom 操作去加载 css。
css-loader :允许将css文件通过require的方式引入，并返回css代码。
less-loader: 处理less，将less代码转换成css。
sass-loader: 处理sass，将scss/sass代码转换成css。
postcss-loader：用postcss来处理css。
autoprefixer-loader: 处理css3属性前缀，已被弃用，建议直接使用postcss。
file-loader: 分发文件到output目录并返回相对路径。
url-loader: 和file-loader类似，但是当文件小于设定的limit时可以返回一个Data Url。
babel-loader :用babel来转换ES6文件到ES。


# Plugin有什么作用？/Plugin是什么
Plugin功能更强大，主要目的就是解决loader 无法实现的事情，比如打包优化和代码压缩等。
Plugin加载后，在webpack构建的某个时间节点就会触发plugin定义的功能，帮助webpack做一些事情。实现对webpack的功能扩展。

# 常见的Plugin有哪些
define-plugin：定义环境变量 (Webpack4 之后指定 mode 会自动配置)
ignore-plugin：忽略部分文件
html-webpack-plugin：简化 HTML 文件创建 (依赖于 html-loader)
web-webpack-plugin：可方便地为单页应用输出 HTML，比 html-webpack-plugin 好用
uglifyjs-webpack-plugin：不支持 ES6 压缩 (Webpack4 以前)
terser-webpack-plugin: 支持压缩 ES6 (Webpack4)
webpack-parallel-uglify-plugin: 多进程执行代码压缩，提升构建速度
mini-css-extract-plugin: 分离样式文件，CSS 提取为独立文件，支持按需加载 (替代extract-text-webpack-plugin)
serviceworker-webpack-plugin：为网页应用增加离线缓存功能
clean-webpack-plugin: 目录清理
ModuleConcatenationPlugin: 开启 Scope Hoisting
speed-measure-webpack-plugin: 可以看到每个 Loader 和 Plugin 执行耗时 (整个打包耗时、每个 Plugin 和 Loader 耗时)
webpack-bundle-analyzer: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)






# Webpack Proxy工作原理
7.1 代理
在项目开发中不可避免会遇到跨越问题，Webpack中的Proxy就是解决前端跨域的方法之一。所谓代理，指的是在接收客户端发送的请求后转发给其他服务器的行为，webpack中提供服务器的工具为webpack-dev-server。

7.1.1 webpack-dev-server
webpack-dev-server是 webpack 官方推出的一款开发工具，将自动编译和自动刷新浏览器等一系列对开发友好的功能全部集成在了一起。同时，为了提高开发者日常的开发效率，只适用在开发阶段。在webpack配置对象属性中配置代理的代码如下：

// ./webpack.config.js
const path = require('path')

module.exports = {
    // ...
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        proxy: {
            '/api': {
                target: 'https://api.github.com'
            }
        }
        // ...
    }
}
其中，devServetr里面proxy则是关于代理的配置，该属性为对象的形式，对象中每一个属性就是一个代理的规则匹配。

属性的名称是需要被代理的请求路径前缀，一般为了辨别都会设置前缀为 /api，值为对应的代理匹配规则，对应如下：

target：表示的是代理到的目标地址。
pathRewrite：默认情况下，我们的 /api-hy 也会被写入到URL中，如果希望删除，可以使用pathRewrite。
secure：默认情况下不接收转发到https的服务器上，如果希望支持，可以设置为false。
changeOrigin：它表示是否更新代理后请求的 headers 中host地址。
7.2 原理
proxy工作原理实质上是利用http-proxy-middleware 这个http代理中间件，实现请求转发给其他服务器。比如下面的例子：

const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();

app.use('/api', proxy({target: 'http://www.xxx.com', changeOrigin: true}));
app.listen(3000);

// http://localhost:3000/api/foo/bar -> http://www.xxx.com/api/foo/bar
在上面的例子中，本地地址为http://localhost:3000，该浏览器发送一个前缀带有/api标识的请求到服务端获取数据，但响应这个请求的服务器只是将请求转发到另一台服务器中。

7.3 跨域
在开发阶段， webpack-dev-server 会启动一个本地开发服务器，所以我们的应用在开发阶段是独立运行在 localhost 的一个端口上，而后端服务又是运行在另外一个地址上。所以在开发阶段中，由于浏览器同源策略的原因，当本地访问后端就会出现跨域请求的问题。

解决这种问题时，只需要设置webpack proxy代理即可。当本地发送请求的时候，代理服务器响应该请求，并将请求转发到目标服务器，目标服务器响应数据后再将数据返回给代理服务器，最终再由代理服务器将数据响应给本地，原理图如下：

跨域请求的问题
在代理服务器传递数据给本地浏览器的过程中，两者同源，并不存在跨域行为，这时候浏览器就能正常接收数据。


# 如何借助Webpack来优化性能
作为一个项目的打包构建工具，在完成项目开发后经常需要利用Webpack对前端项目进行性能优化，常见的优化手段有如下几个方面：
JS代码压缩
CSS代码压缩
Html文件代码压缩
文件大小压缩
图片压缩
Tree Shaking
代码分离
内联chunk


































