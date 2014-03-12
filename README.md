rap-node-plugin
===============

nodejs plugin for RAP

## 安装

安装 `rap-node-plugin` 

`npm install rap-node-plugin --save-dev`

## 使用

```js
var rapnode = require('rap-node-plugin');

global.RAP_FLAG = 1;  // 开启RAP

// 默认是获取85项目下的 `/perf/2014.json` 
rapnode.getRapData('/perf/2014.json', function() {
    return {a: 1, b: 2}
}, function(err, r) {
    var data = r;
    console.log(data);
});
```

由于已经在`rap.alibaba-inc.com`中配置了 `85` 项目，而且配置了`/perf/2014.json`相关的接口，因此RAP返回的数据结合 `Mockjs` 以后，数据示例如下：

```js
{ 
    crox_root: { 
        percent: 0.1,
        month_salary: 9,
        perf_total: '3.5B',
        year: 2034,
        perf: 3.5,
        season: '四',
        name: '思竹',
        values: 'B' 
    } 
}
```

## 说明

- 默认是去 `rap.alibaba-inc.com` 获取模拟数据，如果您不是在阿里内网，默认数据是不能使用的

- 可以通过 `rapnode.config(options)` 配置设置，目前的配置项如下：

    - `host` rap服务主机
    - `port` rap服务端口号（默认是 80）
    - `projectId` 项目ID（默认是85）
    - `mock` rap服务mockjs请求的路径前缀，默认是 `/mockjs/`
    - `wrapper` 返回数据的包装属性名，用于在php或vm中指定根属性名，默认为 `crox_root`，如果设置为`空字符串` 或 `false`，则不包装

配置示例

```js
var rapnode = require('rap-node-plugin');

rapnode.config({
    host: '10.33.12.32',    //启动的服务主机
    port: '7000',           //端口号
    projectId: 67,          //RAP配置的项目ID
    mock: '/mymockjsurl/',  //RAP前缀
    wrapper: ''             //不需要包装
})
```