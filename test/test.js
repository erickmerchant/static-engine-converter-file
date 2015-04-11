var file = require('../index.js')
var assert = require('assert')
var describe = require('mocha').describe
var it = require('mocha').it
var moment = require('moment')

file = file(':categories+/:date.:slug.txt', {
  date: function (date) {
    return moment(date, 'YYYY-MM-DD')
  }
})

describe('plugin', function () {
  it('should add certain properties to the page object based on the file name', function (done) {
    file([{file: 'category-a/2015-01-01.slug-a.txt'}], function (err, pages) {
      if (err) {
        done(err)
      } else {
        pages[0].date = pages[0].date.format('YYYY-MM-DD')

        assert.deepEqual(pages[0], {
          categories: ['category-a'],

          file: 'category-a/2015-01-01.slug-a.txt',

          date: '2015-01-01',

          slug: 'slug-a'
        })

        done()
      }
    })
  })
})
