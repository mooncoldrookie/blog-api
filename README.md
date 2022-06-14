# My-Blog
- 后台项目地址 https://github.com/mooncoldrookie/blog-admin
- 博客地址 https://github.com/mooncoldrookie/blog-web

## 简介
博客服务端，使用Node.js并基于Nestjs框架构建

使用postgresql作为数据库，redis提供缓存服务

## 运行
想要拷贝项目并在本地运行，你需要一些准备工作

web项目单独运行，而admin项目将运行在后端地址上

- 在项目内新建public文件夹
- 将admin项目打包构建后，把打包后dist目录内的文件拷贝到此项目的public文件夹内
- public目录是后端的静态资源目录，上传的图片也在此目录下的upload文件夹内
- 还需要创建在根目录创建.env文件并添加两条环境变量 
```
JWT_SECRET=your jwt secret
SERVER_PORT=3000
```
- postgresql和redis使用docker构建，你需要事先安装docker和docker-compose，如果你已有postgresql和redis的测试环境，
修改config目录下的配置文件即可
- 一切都准备好后，运行package.json中的命令
```
# install
npm install
# dev
npm run start:dev
# build
npm run build
# prodocution
npm run start
```
- 也可以将admin单独分离运行，只需要修改admin项目运行环境的请求地址

### 注意
#### 如何创建第一个管理员用户
虽然admin可以添加用户，但登录页面并没有注册功能，因为后台管理并不需要显式的注册

在user模块中有添加用户的接口，你可以手动调用这个接口，以便创建一个管理员用户

或者使用/common/util/index中的encrypt函数创建一个密码，
然后在数据库的user表中手动插入一条数据

#### 上传文件
file模块中上传文件后，是直接拼接当前环境地址作为返回前端的url，在服务器部署时，可能要修改为你实际的ip地址
```javascript
 uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    // 更换地址可以将 http://localhost 改为其他地址
    const path = 'http://localhost:' + process.env.SERVER_PORT + '/upload/' + file.filename
    return {
      filename: file.filename,
      path,
      size: file.size,
    }
  }
```
这不是一个聪明的方法，最好是使用一个固定的静态资源服务器



