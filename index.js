var moment = require('moment');
var path = require('path');
var date_formats = ["YYYY-MM-DD", "YYYY-MM-DD-HHmmss"];

module.exports = function () {

    return function (file, page, next) {

        var ext = path.extname(file);

        var parts;

        page.slug = path.basename(file, ext);

        page.category = path.dirname(file);

        parts = path.basename(file, ext).split('.');

        if (parts.length >= 2) {

            page.date = moment(parts[0], date_formats);

            if (page.date && page.date.isValid()) {

                page.slug = parts.slice(1).join('.');
            }
        }

        if (!(page.date && page.date.isValid())) {

            page.date = moment();
        }

        return next(file, page);
    };
};
