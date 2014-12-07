var file = require('../index.js');
var assert = require('chai').assert;
var moment = require('moment');

describe('plugin', function(){

    it('should add certain properties to the page object based on the file name', function(done){

        file({file: 'category-a/2015-01-01.slug-a.txt'}).then(function(page){

            assert.deepEqual(page.category, 'category-a');

            assert.deepEqual(page.date.format("YYYY-MM-DD"), '2015-01-01');

            assert.deepEqual(page.slug, 'slug-a');

            done();
        });
    });
});
