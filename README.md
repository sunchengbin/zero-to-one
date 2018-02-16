# koa_demo
==========================================================================

### 技术栈（为什么选择koa: 随着es6的流行为了使用我们习惯的async -- 避免回调地狱,尤其是同一个接口中需要多次查询数据库）

- koa2 [http://www.ruanyifeng.com/blog/2017/08/koa.html] [https://koa.bootcss.com/]
- koa-router [https://github.com/alexmingoia/koa-router]
- koa2-cors（解决跨域） [https://github.com/zadzbw/koa2-cors]
- log4js (日志中间件) [https://github.com/log4js-node/log4js-node] [https://log4js-node.github.io/log4js-node/index.html]
- sequelize（数据库操作,注意防止sql注入问题） [http://docs.sequelizejs.com/] [https://itbilu.com/nodejs/npm/VkYIaRPz-.html]
- mysql
- REST API （接口规范）[http://www.ruanyifeng.com/blog/2014/05/restful_api.html] [http://www.restapitutorial.com/]
- koa-compose (合并中间件,如果出现多个中间件的时候可以尝试使用) [https://github.com/koajs/compose]
- koa-bodyparser (处理post请求data参数读取不到问题,通过ctx.request.body获取即可) [https://github.com/koajs/bodyparser]
- koa-static (静态资源router配置)[https://github.com/koajs/static/]
- koa-helmet（安全加固）[https://cnodejs.org/topic/5a502debafa0a121784a89c3] [https://www.npmjs.com/package/koa-helmet]

===========================================================================

### sql注入防御

- SELECT防御方法 [https://itbilu.com/nodejs/npm/VkYIaRPz-.html#api-instance-query]

```
参考 ctx.sequelizeQueryFn 方法 -- (实质sequelize.query()) js目录 dbpool/query
参考 ctx.getDbTableModels -- （实质model.findAll()）
```
- 增删改防御 [https://itbilu.com/nodejs/npm/V1PExztfb.html#definition-validations]

```
参考 ctx.getDbTableModels -- （实质model形式的Validations验证数据库字段的）js目录 dbpool/db-table-models
```
===========================================================================

### 安装依赖

```
$ npm install
```
===========================================================================

## 跨域测试（可以选择自己喜欢的方式去实现跨域测试，以下仅供参考）
### 域名配置（本地模拟跨域，并在index.html中测试接口正确性）
- 本地安装nginx

```
$ brew install nginx
```

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
### nginx.config 后端server为8080端口 -- 为端口绑定域名
server {
   listen 80;
   server_name   api.zerotoone.com;
   location / {
     proxy_pass    http://127.0.0.1:8080;
     proxy_redirect default;
   }
}
```
- 8080 端口是为了配合线上服务器绑定域名（运维绑定域名默认分发到服务器8080端口）

===========================================================================

### 启动服务

```
$ npm run start (本地测试环境)
$ npm run start preview (预上线环境)
$ npm run start online （线上环境）
```
===========================================================================

### 跨域测试

- 访问 http://www.zerotoone.com 页面
- 查看 network 中接口请求

===========================================================================

### 同域筛选器页面测试

- 访问 http://api.zerotoone.com/sizer/rice/index.html 或者 http://127.0.0.1:8080/sizer/rice/index.html

===========================================================================

### 项目结构

```
.
├── router        路由文件夹
|   ├── api       存放所有接口文件
|   ├── page      存放页面级的静态文件(html、js、css、images等，配合koa-static创建的静态文件路由)
|   ├── index.js  路由动态整合    
├── log       日志存储目录（自动生成）每日会更新一次日志文件
├── dbpool    数据库相关文件目录
│   ├── config.js   不同环境数据库配置
│   ├── connect.js  数据库连接池
│   └── query.js    数据库query操作的统一方法
└── controller      项目应用层控制目录
    ├── libs        工具库
    ├── app         接口数据控制
    └── middleware  中间件(存放app使用的中间件)

```

===========================================================================

### 配置https--针对本地https的绑定 （在server.js中引入）

```
由于服务器端通过负载均衡来重写到我们服务器，https的配置在负载均衡服务器通过nginx来配置，这段代码可以忽略
const options = {
    key: fs.readFileSync('./ssl/server.key'),  //ssl文件路径
    cert: fs.readFileSync('./ssl/server.pem')  //ssl文件路径
}
http.createServer(App.callback()).listen(80)
https.createServer(options, App.callback()).listen(443)
```
