rap-node-plugin
===============

nodejs plugin for RAP

## 安装

安装 `rap-node-plugin` 

`npm install rap-node-plugin --save-dev`

## 使用

```js
var rapnode = require('../index.js');

global.RAP_FLAG = 1;  // 开启RAP

rapnode.getRapData('/perf/2014.json', function() {
    return {a: 1, b: 2}
}, function(err, r) {
    var data = r;
    console.log(data);
});
```


## 说明

- 默认是去 `rap.alibaba-inc.com` 获取模拟数据，如果您不是在阿里内网，默认数据是不能使用的

- 可以通过 `rapnode.config(options)` 配置设置，目前的配置项如下：

    - `host` rap服务主机
    - `port` rap服务端口号（默认是 80）
    - `projectId` 项目ID（默认是85）
    - `mock` rap服务mockjs请求的路径前缀，默认是 `/mockjs/`