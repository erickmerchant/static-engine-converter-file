var pathMatch = require('path-match')();
var assign = require('object-assign');

module.exports = function(route, modifiers) {

    var matcher = pathMatch(route);

    return function (pages, done) {

        try
        {
            pages = pages.map(function(page){

                var params = matcher(page.file);
                var k;

                for(k in params) {

                    if(typeof modifiers[k] != 'undefined') {

                        params[k] = modifiers[k](params[k]);
                    }
                }

                return assign({}, page, params);
            });
        }
        catch(e)
        {
            done(e)
        }

        done(null, pages);
    };
}
