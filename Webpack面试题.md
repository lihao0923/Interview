
# WEBPACK


# 一、谈谈你对Webpack的理解
* webpack是一个静态模块打包器，当webpack处理应用程序时，会递归构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个bundle。


# 二、Webpack的运行流程
* 命令行执行npx webpack打包命令开始：
    **1、初始化编译参数：** 从配置文件和shell命令中读取与合并参数；

    **2、开始编译：** 根据上一步得到的参数初始化Compiler对象，加载所有配置的Plugin，执行对象的 run 方法开始执行编译；

    **3、确定入口：** 根据配置中的entry找出所有的入口文件；

    **4、编译模块：** 从入口文件出发，调用所有配置的Loader对模块进行翻译，再找出该模块依赖的模块，然后递归本步骤直到所有入口依赖的文件都进行翻译；

    **5、完成模块编译：** 在经过第4步使用Loader翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；

    **6、输出资源：** 根据依赖关系，组装成一个个包含多个模块的Chunk，再把每个Chunk转化成一个单独的文件加入到输出列表，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

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


# ******************


# Webpack的基本功能？
**1、代码转换(Loader)：**
TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等等

**2、文件优化(Plugin)：**
压缩 JavaScript、CSS、html 代码，压缩合并图片等

**3、代码分割(代码分离)：**
提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载

**4、模块合并：**
在采用模块化的项目有很多模块和文件，需要构建功能把模块分类合并成一个文件

**5、自动刷新(HMR热更新)：**
监听本地源代码的变化，自动构建，刷新浏览器

**6、代码校验(ESLint和Stylelint)：**
在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过。

**7、自动发布：**
更新完代码后，自动构建出线上发布代码并传输给发布系统。



# Webpack和vite的区别？重点

#### 1、原理：
* Webpack是一个模块打包器，它会分析项目的结构，找出JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。

* Vite则采用了基于ES Module，利用浏览器的原生模块特性导入代码，利用浏览器去解析import，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。

#### 2、速度：
* Webpack在打包时会将整个项目进行全量构建，即使使用热模块替换（HMR）也需要一定时间。

* Vite则采用按需编译的方式，只对改动的模块进行编译，从而极大地提高了编译速度。

#### 3、插件兼容性：
* Webpack拥有丰富的插件生态，基本上大部分的前端工程化需求都可以通过插件实现。

* Vite虽然兼容Rollup插件，但其自身的插件生态相对较弱，可能在一些特殊需求上无法满足。

#### 4、开发模式：
* Webpack使用传统的开发模式，在开发阶段需要将所有的代码打包成一个或多个bundle，然后在浏览器中进行动态加载。

* Vite则采用ES模块原生的开发模式，在开发阶段不需要将所有代码打包成一个bundle，而是以原生ES模块的方式直接在浏览器中加载和运行文件。

#### 5、配置复杂度：
* Webpack的配置相对复杂，对新手不够友好。

* Vite在设计上更注重开箱即用，大部分场景下用户无需自己写配置文件。

#### 6、热更新机制：
* Webpack的热更新需要整个模块链重新打包和替换，对于大型项目可能会有延迟。

* Vite的热更新则只会针对改动的模块进行更新，提高了更新速度。



# Webpack的打包原理
* Webpack的打包原理主要是基于模块化的思想，将项目中的各个文件（包括JavaScript、CSS、图片等静态资源）视为模块，并根据这些模块之间的依赖关系进行静态分析。然后，Webpack会根据指定的规则将这些模块打包成一个或多个静态资源文件（bundle），以供浏览器加载和执行。


# Webpack的核心概念
**1、Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。告诉webpack要使用哪个模块作为构建项目的起点，默认为./src/index.js**

    // 单个入口写法
    module.exports = {
        entry: {
            main: './path/to/my/entry/file.js',
        },
    };
    // 多个入口写法，分离 app(应用程序) 和 vendor(第三方库) 入口
    module.exports = {
        entry: {
            main: './src/app.js',
            vendor: './src/vendor.js',
        },
    };
    // 在 webpack < 4 的版本中，通常将 vendor 作为一个单独的入口起点添加到 entry 选项中，以将其编译为一个单独的文件（与 CommonsChunkPlugin 结合使用）。而在 webpack 4 中不鼓励这样做。而是使用 optimization.splitChunks 选项，将 vendor 和 app(应用程序) 模块分开，并为其创建一个单独的文件。不要为 vendor 或其他不是执行起点创建 entry。


**2、output：出口，告诉webpack在哪里输出它打包好的代码以及如何命名，默认为./dist**

    const path = require('path');
    
    module.exports = {
    entry: './path/to/my/entry/file.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js',
    },
    };


**3、mode：模式，通过选择development, production或none之中的一个，来设置mode参数，你可以启用webpack内置在相应环境下的优化。其默认值为 production。**

    module.exports = {
        mode: 'production', // 'development', 'production'
    };


**4、loader：模块转换器，用于把模块原内容按照需求转换成新内容。**

    // loader在哪配置
    module.exports = {
        module: {
            rules: [
                { test: /\.css$/, use: 'css-loader' },
                { test: /\.ts$/, use: 'ts-loader' },
            ],
        },
    };

**5、plugin：扩展插件，loader用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。**

    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const webpack = require('webpack'); // 用于访问内置插件
    
    module.exports = {
        module: {
            rules: [{ test: /\.txt$/, use: 'raw-loader' }],
        },
        plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
    };

**6、浏览器兼容性：Webpack支持所有符合ES5标准 的浏览器（不支持 IE8 及以下版本）。webpack的import()和require.ensure()需要Promise。如果你想要支持旧版本浏览器，在使用这些表达式之前，还需要 提前加载polyfill。**

**7、环境(environment)：Webpack5运行于Node.js v10.13.0+ 的版本。**

**8、Module：模块，在Webpack里一切皆模块，一个模块对应着一个文件。Webpack会从配置的Entry开始递归找出所有依赖的模块。**

**9、Chunk：代码块，一个Chunk由多个模块组合而成，用于代码合并与分割。**



# 如何提高webpack构建速度?
* 1、多入口情况下，使用CommonsChunkPlugin来提取公共代码。

* 2、通过externals配置来提取常用库：

        module.exports = {
        // 告诉webpack哪些模块不需要被打包进bundle中,以某种方式（如CDN）在全局环境中可用。
            externals: {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'vuex': 'Vuex',
                'axios': 'axios',
                "CKEDITOR": "window.CKEDITOR"
            },
        }

* 3、利用DllPlugin和DllReferencePlugin预编译资源模块通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来。

        // DllPlugin的配置通常涉及在webpack配置文件中引入DllPlugin，并对其进行相应的设置。以下是一个基本的DllPlugin配置示例：
        const DllPlugin = require('webpack/lib/DllPlugin');

        module.exports = {  
            // ... 其他webpack配置 ...  
            plugins: [  
                new DllPlugin({  
                    name: '[name]', // 用于指定全局变量名，供其他模块访问该DLL  
                    path: '[path].json' // 用于指定JSON文件的输出路径，该JSON文件包含了该DLL的信息  
                })  
            ]  
        };
        
        // DllReferencePlugin的配置通常涉及到指定context和manifest。manifest是一个JSON文件，它包含了在DllPlugin构建过程中生成的依赖信息。以下是一个基本的DllReferencePlugin配置示例：
        
        const webpack = require('webpack');  
        
        module.exports = {  
            // ... 其他的webpack配置 ...  
            plugins: [  
                new webpack.DllReferencePlugin({  
                context: __dirname, // 这里的值应与DllPlugin中的context保持一致  
                manifest: require('./path/to/manifest.json') // 指向DllPlugin生成的manifest文件  
                })  
            ]  
        };

* 4、使用Happypack实现多线程加速编译。

* 5、使用webpack-uglify-paralle来提升uglifyPlugin的压缩速度。

* 6、原理上webpack-uglify-parallel采用了多核并行压缩来提升压缩速度。

* 7、使用Tree-shaking和Scope Hoisting来剔除多余代码。

        // 使用ES2015模块语法：确保你的代码使用import和export语法，而不是CommonJS的require和module.exports。
        // 在 package.json中设置 "sideEffects": false：这告诉Webpack忽略那些没有副作用的文件（如CSS文件）。如果你的项目中有副作用（比如某些文件仅用于设置全局变量），则需要显式列出这些文件。
        // 在Webpack配置中启用优化：确保你开启了optimization.usedExports和optimization.minimize。
        
        // package.json  
        {  
            "name": "your-project",  
            "sideEffects": false,  
            // ... 其他字段  
        }
        
        // webpack.config.js  
        module.exports = {  
            // ... 其他配置  
            optimization: {  
                minimize: true,  
                usedExports: true, // 开启Tree Shaking  
                sideEffects: true, // 允许Webpack根据package.json的sideEffects字段来剔除未使用的模块  
            },  
            module: {  
                rules: [  
                // ... 其他loader配置  
                ],  
            },  
        };
    
    
        // Scope Hoisting是一种减少函数声明数量并优化输出束大小的优化技术。默认情况下，Webpack会为每个模块创建一个新的作用域，这可能会导致输出文件包含大量的函数声明。Scope Hoisting通过将多个模块的代码合并到一个函数作用域中来减少输出大小。
        
        //启用 Scope Hoisting
        
        // 在Webpack 4+中，Scope Hoisting默认是启用的，当使用optimization.concatenateModules配置项时。你不需要显式地启用它，但你可以通过调整该配置项来影响其行为。
        // webpack.config.js  
        module.exports = {  
            // ... 其他配置  
            optimization: {  
                concatenateModules: true, // 启用Scope Hoisting  
                // ... 其他优化选项  
            },  
            module: {
                rules: [  
                // ... 其他loader配置  
                ],  
            },  
        };














https://blog.csdn.net/qq_38144981/article/details/136532779















