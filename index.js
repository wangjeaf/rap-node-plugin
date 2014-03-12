var ajax = require('./helper/ajax.js');

var HOST = 'rap.alibaba-inc.com';
var PORT = 80;
var MOCK = '/mockjs/';
var PROJECT_ID = 85;

function config(options) {
    HOST = options.host || HOST;
    PORT = options.port || PORT;
    PROJECT_ID = options.projectId || PROJECT_ID;
    MOCK = options.mock || MOCK;
}

function getRapData(url, fn, callback) {
    if (!global.RAP_FLAG) {
        callback(null, {
            crox_root: fn()
        });
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
            callback(null, {
                crox_root: data
            })
        }
    });
}

exports.getRapData = getRapData;
exports.config = config;
