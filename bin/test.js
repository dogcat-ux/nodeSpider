"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Spider_1 = __importDefault(require("./ts/Spider"));
var spider = new Spider_1.default({
    url: "http://book.dangdang.com/?_utm_brand_id=11106&_ddclickunion=460-5-biaoti|ad_type=0|sys_id=1",
    method: 'get',
    host: 'http'
});
spider.startSpider(function () {
});
//# sourceMappingURL=test.js.map