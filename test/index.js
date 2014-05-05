var rapnode = require('../index.js');

global.RAP_FLAG = 1;

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


rapnode.getRapData(85, '/perf/2014.json', function(err, r) {
    var data = r;
    console.log(data);
});
