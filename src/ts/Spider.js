"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var http = require("http");
var https = require("https");
var cheerio = require('cheerio');
var download = require('download');
module.exports = /** @class */ (function () {
    function Spider(options) {
        if (options === void 0) { options = { url: "", method: "get", host: 'http' }; }
        this.m_options = __assign({}, options);
        this.m_options.method = (options === null || options === void 0 ? void 0 : options.method) || 'get';
        this.m_options.host = (options === null || options === void 0 ? void 0 : options.host) || 'http';
    }
    Spider.prototype.startSpider = function (filterData) {
        if (this.m_options.host === 'http') {
            http.get(this.m_options.url, __assign({}, this.m_options), function (res) {
                var chunks = [];
                res.on('data', function (chunk) {
                    chunks.push(chunk);
                });
                res.on('end', function () {
                    filterData((Buffer.concat(chunks)).toString());
                });
            });
        }
        else if (this.m_options.host === 'https') {
            https.get(this.m_options.url, __assign({}, this.m_options), function (res) {
                var chunks = [];
                res.on('data', function (chunk) {
                    chunks.push(chunk);
                });
                res.on('end', function () {
                    filterData((Buffer.concat(chunks)).toString());
                });
            });
        }
    };
    Spider.prototype.imgSpider = function (outPath, queryClassPath, callBackFn) {
        var _this = this;
        this.startSpider(function (data) {
            var $ = cheerio.load(data);
            var arr = $(queryClassPath);
            var imgs = arr.map(function (index, item) {
                var imgPath = encodeURI($(item).attr('src'));
                if (imgPath.indexOf("http") !== -1 || imgPath.indexOf("https") !== -1) {
                    console.log(encodeURI($(item).attr('src')));
                    return encodeURI($(item).attr('src'));
                }
                else {
                    console.log(_this.m_options.host + ":" + encodeURI($(item).attr('src')));
                    return _this.m_options.host + ":" + encodeURI($(item).attr('src'));
                }
            });
            Promise.all(imgs.map(function (index, item) { return download(item, outPath); })).then(function () {
                console.log("请求完成");
            });
        });
        callBackFn();
    };
    return Spider;
}());
