var moment = require('moment');
var path = require('path');
var date_formats = ["YYYY-MM-DD", "YYYY-MM-DD-HHmmss"];

module.exports = function (pages, done) {

    pages.forEach(function(page){

        var ext = path.extname(page.file);

        var parts;

        page.slug = path.basename(page.file, ext);

        page.category = path.dirname(page.file);

        parts = path.basename(page.file, ext).split('.');

        if (parts.length >= 2) {

            page.date = moment(parts[0], date_formats);

            if (page.date && page.date.isValid()) {

                page.slug = parts.slice(1).join('.');
            }
        }

        if (!(page.date && page.date.isValid())) {

            page.date = moment();
        }
    });

    done(null, pages);
};
