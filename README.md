# zero-to-one
==========================================================================

### 技术栈

- koa2 [http://www.ruanyifeng.com/blog/2017/08/koa.html] [https://koa.bootcss.com/]
- koa-router [https://github.com/alexmingoia/koa-router]
- koa2-cors（解决跨域） [https://github.com/zadzbw/koa2-cors]
- log4js (日志中间件) [https://github.com/log4js-node/log4js-node] [https://log4js-node.github.io/log4js-node/index.html]
- koa-compose (合并中间件) [https://github.com/koajs/compose]
- sequelize（数据库操作） [http://docs.sequelizejs.com/]
- mysql
- REST API （接口规范）[http://www.ruanyifeng.com/blog/2014/05/restful_api.html] [http://www.restapitutorial.com/]

> 为什么选择这些技术，随着es6的流行为了使用我们习惯的async，所以选择了koa

===========================================================================

### 安装依赖

```
$ npm install
```
===========================================================================
## 跨域测试（可以选择自己喜欢的方式去实现跨域测试，以下仅供参考）
### 域名配置（本地模拟跨域，并在index.html中测试接口正确性）
- 本地安装nginx
- 设置测试页面访问域名 http://www.zerotoone.com （hosts绑定 127.0.0.1  www.zerotoone.com）
```
### nginx.config 添加项目index.html的server
server{
  listen 80;
  server_name www.zerotoone.com;
  root /Users/sunchengbin/workspace/zero-to-one; (这里添加自己的项目目录)
  location / {
  autoindex on;
  index index.html index.htm;
  }
}
```
- 设置后端服务访问域名 http://api.zerotoone.com (hosts绑定 127.0.0.1  api.zerotoone.com)
```
### nginx.config 后端server为2000端口 -- 为端口绑定域名
server {
  listen 2000;
  server_name   api.zerotoone.com;
}
```
===========================================================================

### 启动服务

```
$ npm run start
```
===========================================================================

### 测试

- 访问 http://www.zerotoone.com 页面
- 查看 network 中接口请求
