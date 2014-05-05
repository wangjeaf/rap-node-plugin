var ajax = require('./helper/ajax.js');

var HOST = 'rap.alibaba-inc.com';
var PORT = 80;
var MOCK = '/mockjs/';
var PROJECT_ID = 85;
var WRAPPER = '';

function config(options) {
    HOST = options.host || HOST;
    PORT = options.port || PORT;
    PROJECT_ID = options.projectId || PROJECT_ID;
    MOCK = options.mock || MOCK;
    if ('wrapper' in options) {
        WRAPPER = options.wrapper;
    }
}

function empty() {

}

function getRapData(url, fn, callback) {
    var host = HOST, port = PORT, projectId = PROJECT_ID;
    
    if (arguments.length == 4) {
        projectId = url;
        url = fn;
        fn = callback;
        callback = arguments[3];
    } else if (arguments.length == 3 && typeof url == 'number') {
        projectId = url;
        url = fn;
        fn = null;
    } else if (arguments.length == 2 && typeof url == 'string') {
        callback = fn;
        fn = null;
    }
    
    fn = fn || empty;

    if (!global.RAP_FLAG // 全局开关关闭
        || typeof url == 'object' && 'rap' in url && !url.rap) { //局部开关强制关闭
        if (WRAPPER) {
            var result = {};
            result[WRAPPER] = fn();
            callback(null, result);
        } else {
            callback(null, fn());
        }
        return;
    }

    if (typeof url == 'object') {
        var options = url;
        host = options.host || host;
        url = options.url;
        if (!url) {
            throw 'url应该在options中';
        }
        port = options.port || port;
        projectId = options.projectId || projectId;
    }

    if (url.charAt(0) != '/') {
        url = '/' + url;
    }

    ajax({
        host: host,
        port: port,
        path: MOCK + projectId + url,
        dataType: 'json'
    }, function(err, data) {
        if (err) {
            callback(err);
            return
        }
        if (WRAPPER) {
            var result = {};
            result[WRAPPER] = data;
            callback(null, result);
        } else {
            callback(null, data);
        }
    });
}

exports.getRapData = getRapData;
exports.config = config;
