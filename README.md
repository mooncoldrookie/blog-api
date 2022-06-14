# My-Blog
- 后台项目地址 https://github.com/mooncoldrookie/blog-admin
- 博客地址 https://github.com/mooncoldrookie/blog-web

## 简介
博客服务端，使用Node.js并基于Nestjs框架构建。
使用postgresql作为数据库，redis提供缓存服务。

## 运行
web项目单独运行，而admin项目将运行在后端地址上。
- 将admin项目打包构建后，把打包后dist目录内的文件拷贝到此项目的public文件夹内
- public目录是后端的静态资源目录，上传的图片也在此目录下的upload文件夹内
- 也可以将admin单独分离运行，只需要修改admin项目运行环境的请求地址



