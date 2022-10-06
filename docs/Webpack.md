# 一、谈谈你对Webpack的理解
* webpack是一个静态模块打包器，当webpack处理应用程序时，会递归构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个bundle。


# 二、Webpack的运行流程
* 命令行执行npx webpack打包命令开始：
    * 1、初始化编译参数：从配置文件和shell命令中读取与合并参数
    * 2、开始编译：根据上一步得到的参数初始化Compiler对象，加载所有配置的Plugin，执行对象的 run 方法开始执行编译
    * 3、确定入口：根据配置中的entry找出所有的入口文件
    * 4、编译模块：从入口文件触发，调用所有配置的Loader对模块进行翻译，再找出该模块依赖的模块，然后递归本步骤直到所有入口依赖的文件都进行翻译
    * 5、完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系图
    * 6、输出资源：根据依赖关系图，组装成一个个包含多个模块的Chunk，再把每个Chunk转化成一个单独的文件加入到输出列表，根据配置确定输出的路径和文件名，输出

* 在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑。


# 三、Webpack中loader是什么？
* loader本质就是一个函数，loader是webpack中提供了一种处理多种文件格式的机制，因为webpack只认识JS和JSON，所以Loader相当于翻译官，将其他类型资源进行预处理，用于对模块的"源代码"进行转换。


# 四、常见的loader有哪些？
* style-loader：将css添加到DOM的内联样式标签style里，然后通过 dom 操作去加载 css。
* css-loader：允许将css文件通过require的方式引入，并返回css代码。
* less-loader：处理less，将less代码转换成css。
* sass-loader：处理sass，将scss/sass代码转换成css。
* postcss-loader：用postcss来处理css。
* autoprefixer-loader：处理css3属性前缀，已被弃用，建议直接使用postcss。
* file-loader：分发文件到output目录并返回相对路径。
* url-loader：和file-loader类似，但是当文件小于设定的limit时可以返回一个Data Url。
* babel-loader：用babel来转换ES6文件到ES。


# 五、plugin有什么作用？
* Plugin功能更强大，主要目的就是解决loader无法实现的事情，比如打包优化和代码压缩等。
* Plugin加载后，在webpack构建的某个时间节点就会触发plugin定义的功能，帮助webpack做一些事情。实现对webpack的功能扩展。


# 六、常见的Plugin有哪些
* html-webpack-plugin：简化 HTML 文件创建 (依赖于 html-loader)
* uglifyjs-webpack-plugin：不支持 ES6 压缩 (Webpack4 以前)
* webpack-parallel-uglify-plugin：多进程执行代码压缩，提升构建速度
* mini-css-extract-plugin：分离样式文件，CSS 提取为独立文件，支持按需加载 (替代extract-text-webpack-plugin)
* optimize-css-assets-webpack-plugin：主要是用来压缩css文件
* clean-webpack-plugin：目录清理
* copy-webpack-plugin：复制文件到出口文件夹
* webpack-bundle-analyzer：打包结果分析工具， 执行打包命令后会弹出当前项目所有的依赖，及其详细信息


# 七、Webpack Proxy代理
在项目开发中不可避免会遇到跨越问题，Webpack中的Proxy就是解决前端跨域的方法之一。所谓代理，指的是在接收客户端发送的请求后转发给其他服务器的行为，webpack中提供服务器的工具为webpack-dev-server。

    module.exports = {
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000,
            https: true, // 开启https模式
            proxy: {
                '/api': { // 匹配访问路径中含有 '/api' 的路径
                    target: 'https://api.github.com',
                    changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
                    ws: true, // 是否开启websocket代理
                    pathRewrite: {
                      '^/api': '' // 将开头的 '/api' 替换成空字符串
                    }
                }
            }
        }
    }


# 八、如何借助Webpack来优化性能
作为一个项目的打包构建工具，常见的优化手段有如下几个方面：
* JS代码压缩
* CSS代码压缩
* Html文件代码压缩
* 文件大小压缩
* 图片压缩
* Tree Shaking
* 代码分离
* 内联chunk

