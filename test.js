var plugin = require('./index.js')
var assert = require('assert')
var describe = require('mocha').describe
var it = require('mocha').it
var file

file = plugin(':categories+/:date.:slug.txt', {
  date: function (date) {
    return date.split('-')
  }
})

describe('plugin', function () {
  it('should add certain properties to the page object based on the file name', function (done) {
    file([{file: 'category-a/2015-01-01.slug-a.txt'}], function (err, pages) {
      assert.equal(null, err)
      assert.deepEqual(pages[0], {
        categories: ['category-a'],

        file: 'category-a/2015-01-01.slug-a.txt',

        date: ['2015', '01', '01'],

        slug: 'slug-a'
      })

      done()
    })
  })

  it('non-matching files should be handled without error', function (done) {
    file([{file: 'non-matching/file.txt'}], function (err, pages) {
      assert.equal(null, err)
      assert.deepEqual(pages[0], {
        file: 'non-matching/file.txt'
      })

      done()
    })
  })
})
