var ajax = require('./helper/ajax.js');

var HOST = 'rap.alibaba-inc.com';
var PORT = 80;
var MOCK = '/mockjs/';
var PROJECT_ID = 85;
var WRAPPER = 'crox_root';

function config(options) {
    HOST = options.host || HOST;
    PORT = options.port || PORT;
    PROJECT_ID = options.projectId || PROJECT_ID;
    MOCK = options.mock || MOCK;
    if ('wrapper' in options) {
        WRAPPER = options.wrapper;
    }
}

function getRapData(url, fn, callback) {
    if (!global.RAP_FLAG) {
        if (WRAPPER) {
            var result = {};
            result[WRAPPER] = fn();
            callback(null, result);
        } else {
            callback(null, fn());
        }
        
        return;
    }
    if (url.charAt(0) != '/') {
        url = '/' + url;
    }

    ajax({
        host: HOST,
        port: PORT,
        path: MOCK + PROJECT_ID + url,
        dataType: 'json'
    }, function(err, data) {
        if (err) {
            callback(err);
        } else {
            if (WRAPPER) {
                var result = {};
                result[WRAPPER] = data;
                callback(null, result);
            } else {
                callback(null, data);
            }
        }
    });
}

exports.getRapData = getRapData;
exports.config = config;
