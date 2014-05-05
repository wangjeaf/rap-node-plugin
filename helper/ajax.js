var querystring = require('querystring');
var http = require('follow-redirects').http;
var mockjs = require('mockjs');

function clean(param) {
    if (!param) {
        return '';
    }
    param = param.replace(/^&+/, '');
    param = param.replace(/&{2,}/g, '');
    return param;
}

function appendToUrl(url, params) {
    if (!params) {
        return url;
    }
    url += (url.indexOf('?') != -1 ? '&' : '?') + clean(params);
    return url;
}

/*
    var DEFAULT_OPTIONS = {
        method: 'get',
        body: null,
        host: 'localhost',
        port: '80'
    };
*/

function ajax(options, callback) {
    options.method = options.method || 'get';
    options.host = options.host || 'localhost';
    options.port = options.port || 80;
    var dataType = options.dataType;
    if (dataType && dataType.toLowerCase() == 'json') {
        dataType = 'json';
    }
    var postData = options.body; 
    var method = options.method.toLowerCase();

    var content = null;
    if (method == 'post') {
        content = querystring.stringify(postData);
    }
    
    var reqOptions = {
        host: options.host,
        port: options.port,
        path: appendToUrl(options.path, options.params),
        method: method,
        agent: false
    };

    if (method == 'post') {
        reqOptions.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': content.length
        };
    } else {
        reqOptions.headers = {
            'Content-Type': 'application/json'
        };
    }

    var req = http.request(reqOptions, function(res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk){
            data += chunk;
        });
        res.on('end', function(){
            data = data.replace(/^\s*callback\(|\)$/g, '');
            if (dataType == 'json' && typeof data == 'string') {
                data = data.trim();
                try {
                    data = JSON.parse(data);
                    data = mockjs.mock(data);
                } catch (e) {
                    callback('not valid json: ' + data);
                }
            }
            callback(null, data)
        });
    });

    req.on('error', function (err) {
        callback(err);
    })

    if (method == 'post') {
        req.write(content);
    }
    req.end();
}

module.exports = ajax;