// import SpiderOptions from "../interfaces/SpiderOptions";

const http = require("http");
const https = require("https");
const cheerio = require('cheerio');
const download = require('download');
interface SpiderOptions{
  url:string,
  method?:string,
  headers?:object,
  host?:string
}

module.exports = class Spider {
  m_options: SpiderOptions;

  constructor(options: SpiderOptions = {url: "", method: "get", host: 'http'}) {
    this.m_options = {...options};
    this.m_options.method = options?.method || 'get';
    this.m_options.host = options?.host || 'http';
  }

  startSpider(filterData: Function) {
    if (this.m_options.host === 'http') {
      http.get(this.m_options.url, {...this.m_options}, (res: any) => {
        let chunks: any[] = [];
        res.on('data', (chunk: any) => {
          chunks.push(chunk)
        })
        res.on('end', () => {
          filterData((Buffer.concat(chunks)).toString())
        })
      })
    } else if (this.m_options.host === 'https') {
      https.get(this.m_options.url, {...this.m_options}, (res: any) => {
        let chunks: any[] = [];
        res.on('data', (chunk: any) => {
          chunks.push(chunk)
        })
        res.on('end', () => {
          filterData((Buffer.concat(chunks)).toString())
        })
      })
    }
  }

  imgSpider(outPath: string, queryClassPath: string, callBackFn: Function) {
    this.startSpider((data: any) => {
      let $ = cheerio.load(data);
      let arr = $(queryClassPath);
      let imgs = arr.map((index: number, item: any) => {
          const imgPath = encodeURI($(item).attr('src'));
          if (imgPath.indexOf("http")!==-1 || imgPath.indexOf("https")!==-1) {
            console.log(encodeURI($(item).attr('src')));
            return encodeURI($(item).attr('src'))
          } else {
            console.log(this.m_options.host + ":" + encodeURI($(item).attr('src')))
            return this.m_options.host + ":" + encodeURI($(item).attr('src'))
          }
        }
      )
      Promise.all(imgs.map((index: number, item: string) => download(item, outPath))).then(() => {
        console.log("请求完成")
      })
    })
    callBackFn();
  }
}
