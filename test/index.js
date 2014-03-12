var rapnode = require('../index.js');

global.RAP_FLAG = 1;


rapnode.getRapData('/perf/2014.json', function() {
    return {a: 1, b: 2}
}, function(err, r) {
    var data = r;
    console.log(data);
});
