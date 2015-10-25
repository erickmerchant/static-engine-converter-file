var plugin = require('./index.js')
var tap = require('tap')
var file

file = plugin(':categories+/:date.:slug.txt', {
  date: function (date) {
    return date.split('-')
  }
})

tap.test('should add certain properties to the page object based on the file name', function (t) {
  file([{file: 'category-a/2015-01-01.slug-a.txt'}], function (err, pages) {
    t.equal(null, err)
    t.deepEqual(pages[0], {
      categories: ['category-a'],

      file: 'category-a/2015-01-01.slug-a.txt',

      date: ['2015', '01', '01'],

      slug: 'slug-a'
    })

    t.end()
  })
})

tap.test('non-matching files should be handled without error', function (t) {
  file([{file: 'non-matching/file.txt'}], function (err, pages) {
    t.equal(null, err)
    t.deepEqual(pages[0], {
      file: 'non-matching/file.txt'
    })

    t.end()
  })
})
