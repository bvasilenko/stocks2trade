var tickerRegExp = new RegExp(/SIZE="-1">([A-Z]{1,5})\s+/g);
var http = require('http');
var fs = require('fs');

function getAllTickers(urls, cb) {
    var allTickers = [];

    var processedUrlCount = 0;
    urls.forEach(function (url) {
        get(url, function (html) {

            processedUrlCount++;
            allTickers = allTickers.concat(getTickers(html));

            if (urls.length == processedUrlCount) {
                cb(allTickers.filter(distinct));
            }
        });
    });

}

function getTickers(html) {
    var tickers = [];
    var matches;
    while (matches = tickerRegExp.exec(html)) {
        tickers.push(matches[1]);
    }
    return tickers;
}

function get(url, cb) {
    var request = http.get(url, function (response) {
        streamToString(response, function (str) {
            cb(str);
        });
    });
}

function streamToString(stream, cb) {
    const chunks = [];
    stream.on('data', function (chunk) {
        chunks.push(chunk.toString());
    });
    stream.on('end', function () {
        cb(chunks.join(''));
    });
}

function distinct(value, index, self) {
    return self.indexOf(value) === index;
}

module.exports = { getAllTickers };