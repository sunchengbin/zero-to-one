# zero-to-one
==========================================================================

### 技术栈

- koa2 [http://www.ruanyifeng.com/blog/2017/08/koa.html] [https://koa.bootcss.com/]
- koa-router [https://github.com/alexmingoia/koa-router]
- koa2-cors（解决跨域） [https://github.com/zadzbw/koa2-cors]
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
### 本地测试域名配置（可选）
- 后端服务访问地址: localhost:2000
- 本地安装nginx
- 设置测试页面访问域名 http://www.zerotoone.com （hosts绑定 127.0.0.1  www.zerotoone.com）
```
### nginx.config 添加server
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
### nginx.config 添加server
server {
  listen 80;
  server_name   api.zerotoone.com;
  location / {
    proxy_pass    http://127.0.0.1:2000;
    proxy_redirect default;
  }
}
```
===========================================================================

### 启动服务

```
$ npm run start
```
===========================================================================

### 测试

访问 http://www.zerotoone.com 页面
查看 network 中接口请求
