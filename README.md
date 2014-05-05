rap-node-plugin
===============

nodejs plugin for RAP

## 安装

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
    percent: 0.1,
    month_salary: 9,
    perf_total: '3.5B',
    year: 2034,
    perf: 3.5,
    season: '四',
    name: '思竹',
    values: 'B' 
}
```

## API

### getRapData([projectId, ]url, [businessFunction,] callback)

- `projectId` `可选` 项目ID，如果传入了4个参数，则认为第一个参数是项目ID，其他参数顺序往后推。

- `url` `必传` 请求的Action。此参数可以是object，可实时指定项目ID等信息，例如：

```js
rapnode.getRapData({
    url: '/perf/2014.json',         // action url
    projectId: '85',                // 项目ID，默认请参见config
    port: 80,                       // 端口，默认请参见config
    host: 'rap.alibaba-inc.com',    // 主机，默认请参见config
    rap: false                      // 本次调用关闭rap
}, function() {
    return {a: 1, b: 2}
}, function(err, r) {
    var data = r;
    console.log(data);
});
```

- `businessFunction` `可选` 真正获取业务数据的方法，目前暂不支持传参数

- `callback` `必传` 请求数据后的回调

### 调用示例
```js
rapnode.getRapData({
    url: '/perf/2014.json', 
    projectId: '85', 
    port: 80,
    host: 'rap.alibaba-inc.com', 
    rap: false
}, function() {
}, function(err, r) {
});
```

```
rapnode.getRapData(85, '/perf/2014.json', function() {}, function(err, data))
```

```
rapnode.getRapData(85, '/perf/2014.json', function(err, data))
```

```
rapnode.getRapData('/perf/2014.json', function(err, data)
```

### config(options)

可以通过 `rapnode.config(options)` 配置设置，目前的配置项如下：

    - `host` rap服务主机
    - `port` rap服务端口号（默认是 80）
    - `projectId` 项目ID（默认是85）
    - `mock` rap服务mockjs请求的路径前缀，默认是 `/mockjs/`
    - `wrapper` 返回数据的包装属性名，用于在php或vm中指定根属性名，默认为 `空`，如果设置为`空字符串` 或 `false`，则不包装

#### 配置示例

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

## 说明

- 默认是从 `rap.alibaba-inc.com` 获取RAP模拟数据，如果您不是在阿里内网，默认数据是不能使用的