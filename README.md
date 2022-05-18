# JavaScript analysis of html tags and content extraction

### Demo 

```typescript
const LOQuery = require("../utils/loquery.js");

Page({
  data: {},
  
  onLoad: function (options) {

    let html = `<html>
    <body>
      <div class="cards video-list">
        <div class="col-md-2 col-xs-4">
          <div class="card">
            <div class="media-wrapper"><a href="/tv/56356.html"><img class="lazy"
                  data-original="https://pic.wujinimg.com/upload/vod/20211123-1/5a765b1f00f1fe163021d91c7d01c5f8.jpg"
                  src="https://pic.wujinimg.com/upload/vod/20211123-1/5a765b1f00f1fe163021d91c7d01c5f8.jpg"
                  alt="中国机长" style="display: block; height: 152.6px;" /></a></div>
            <div class="caption">
              <p><b>导演：</b><a href="/vodsearch/-----%E5%88%98%E4%BC%9F%E5%BC%BA--------.html"
                  target="_blank">刘伟强</a>&nbsp;</p>
              <p><b>主演：</b><a href="/vodsearch/-%E5%BC%A0%E6%B6%B5%E4%BA%88------------.html"
                  target="_blank">张涵予</a>&nbsp;<a href="/vodsearch/-%E6%AC%A7%E8%B1%AA------------.html"
                  target="_blank">欧豪</a>&nbsp;<a href="/vodsearch/-%E6%9D%9C%E6%B1%9F------------.html"
                  target="_blank">杜江</a>&nbsp;<a href="/vodsearch/-%E8%A2%81%E6%B3%89------------.html"
                  target="_blank">袁泉</a>&nbsp;<a
                  href="/vodsearch/-%E5%BC%A0%E5%A4%A9%E7%88%B1------------.html"
                  target="_blank">张天爱</a>&nbsp;</p>
            </div>
            <div class="card-heading text-ellipsis"><strong><a href="/tv/56356.html"
                  title="中国机长">中国机长</a></strong></div><span class="label label-success">HD</span>
            <div class="card-content text-ellipsis text-muted"><a href="/vodtype/juqingpian.html"
                title="剧情片">剧情片</a>/<a
                href="/vodsearch/--%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99%86-----------.html"
                target="_blank">中国大陆</a>&nbsp;/<a href="/vodsearch/-------------2019.html"
                target="_blank">2019</a>&nbsp;</div>
          </div>
        </div>
        <div class="col-md-2 col-xs-4">
          <div class="card">
            <div class="media-wrapper"><a href="/tv/150549.html"><img class="lazy"
                  data-original="https://pic.wujinimg.com/upload/vod/20210927-1/912923505b4b01f7939c5455edcdfe30.jpg"
                  src="https://pic.wujinimg.com/upload/vod/20210927-1/912923505b4b01f7939c5455edcdfe30.jpg"
                  alt="雪鹰领主第一季" style="display: block; height: 152.6px;" /></a></div>
            <div class="caption">
              <p><b>导演：</b><a href="/vodsearch/-----%E5%88%98%E7%82%9C--------.html"
                  target="_blank">刘炜</a>&nbsp;</p>
              <p><b>主演：</b><a href="/vodsearch/-%E9%83%9D%E7%A5%A5%E6%B5%B7------------.html"
                  target="_blank">郝祥海</a>&nbsp;<a href="/vodsearch/-%E6%9D%A8%E5%87%9D------------.html"
                  target="_blank">杨凝</a>&nbsp;<a
                  href="/vodsearch/-%E6%B6%82%E5%B0%8F%E9%B8%A6------------.html"
                  target="_blank">涂小鸦</a>&nbsp;<a href="/vodsearch/-------------.html"
                  target="_blank" /></a>&nbsp;<a href="/vodsearch/-%E8%97%A4%E6%96%B0------------.html"
                  target="_blank">藤新</a>&nbsp;<a href="/vodsearch/-%E6%9E%97%E5%BC%BA------------.html"
                  target="_blank">林强</a>&nbsp;<a
                  href="/vodsearch/-%E6%9D%8E%E8%BD%BB%E6%89%AC------------.html"
                  target="_blank">李轻扬</a>&nbsp;<a href="/vodsearch/-%E7%9E%B3%E9%9F%B3------------.html"
                  target="_blank">瞳音</a>&nbsp;<a
                  href="/vodsearch/-%E6%9E%97%E5%B8%BD%E5%B8%BD------------.html"
                  target="_blank">林帽帽</a>&nbsp;<a
                  href="/vodsearch/-%E5%BC%A0%E6%81%A9%E6%B3%BD------------.html"
                  target="_blank">张恩泽</a>&nbsp;</p>
            </div>
            <div class="card-heading text-ellipsis"><strong><a href="/tv/150549.html"
                  title="雪鹰领主第一季">雪鹰领主第一季</a></strong></div><span
              class="label label-success">更新至74集</span>
            <div class="card-content text-ellipsis text-muted"><a href="/vodtype/dongman.html"
                title="动漫">动漫</a>/<a
                href="/vodsearch/--%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99%86-----------.html"
                target="_blank">中国大陆</a>&nbsp;/<a href="/vodsearch/-------------2018.html"
                target="_blank">2018</a>&nbsp;</div>
          </div>
        </div>
        <div class="col-md-2 col-xs-4">
          <div class="card">
            <div class="media-wrapper"><a href="/tv/82721.html"><img class="lazy"
                  data-original="https://pic.monidai.com/img/202012111724382416672s.jpg"
                  src="https://pic.monidai.com/img/202012111724382416672s.jpg" alt="斗罗大陆"
                  style="display: block; height: 152.6px;" /></a></div>
            <div class="caption">
              <p><b>导演：</b><a href="/vodsearch/-----%E6%B2%88%E4%B9%90%E5%B9%B3--------.html"
                  target="_blank">沈乐平</a>&nbsp;</p>
              <p><b>主演：</b><a href="/vodsearch/-%E6%B2%88%E7%A3%8A------------.html"
                  target="_blank">沈磊</a>&nbsp;<a
                  href="/vodsearch/-%E7%A8%8B%E7%8E%89%E7%8F%A0------------.html"
                  target="_blank">程玉珠</a>&nbsp;<a
                  href="/vodsearch/-%E9%BB%84%E7%BF%94%E5%AE%87------------.html"
                  target="_blank">黄翔宇</a>&nbsp;<a
                  href="/vodsearch/-%E7%8E%8B%E8%82%96%E5%85%B5------------.html"
                  target="_blank">王肖兵</a>&nbsp;<a href="/vodsearch/-%E5%80%AA%E5%BA%B7------------.html"
                  target="_blank">倪康</a>&nbsp;<a
                  href="/vodsearch/-%E8%B5%B5%E4%B9%BE%E6%99%AF------------.html"
                  target="_blank">赵乾景</a>&nbsp;<a href="/vodsearch/-%E5%90%B4%E7%A3%8A------------.html"
                  target="_blank">吴磊</a>&nbsp;<a href="/vodsearch/-%E5%BC%A0%E7%90%A6------------.html"
                  target="_blank">张琦</a>&nbsp;<a
                  href="/vodsearch/-%E7%A7%A6%E7%B4%AB%E7%BF%BC------------.html"
                  target="_blank">秦紫翼</a>&nbsp;</p>
            </div>
            <div class="card-heading text-ellipsis"><strong><a href="/tv/82721.html"
                  title="斗罗大陆">斗罗大陆</a></strong></div><span class="label label-success">更新至208集</span>
            <div class="card-content text-ellipsis text-muted"><a href="/vodtype/dongman.html"
                title="动漫">动漫</a>/<a href="/vodsearch/--%E5%A4%A7%E9%99%86-----------.html"
                target="_blank">大陆</a>&nbsp;/<a href="/vodsearch/-------------2018.html"
                target="_blank">2018</a>&nbsp;</div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `

    let rules = {
      title: [".card>.card-heading", "text"],
      href: [".card>.media-wrapper>a", "href"],
      img: ["img", "data-original"],
      director: [".card>.caption>p[0]", "text"],
      starring: [".card>.caption>p[1]", "text"]
    };

    let res = LOQuery.find(html, rules)
    console.log(res);
  },
})
```

### Log
```typescript
let res = {
      title: ["中国机长", "雪鹰领主第一季", "斗罗大陆"],
      href: ["/tv/56356.html", "/tv/150549.html", "/tv/82721.html"],
      img: ["https://pic.wujinimg.com/upload/vod/20211123-1/5a765b1f00f1fe163021d91c7d01c5f8.jpg","https://pic.wujinimg.com/upload/vod/20210927-1/912923505b4b01f7939c5455edcdfe30.jpg", "https://pic.monidai.com/img/202012111724382416672s.jpg"],
      director: ["导演：刘伟强", "导演：刘炜", "导演：沈乐平"],
      starring: ["主演：张涵予欧豪杜江袁泉张天爱","主演：郝祥海杨凝涂小鸦藤新林强李轻扬瞳音林帽帽张恩泽", "主演：沈磊程玉珠黄翔宇王肖兵倪康赵乾景吴磊张琦秦紫翼"]
    }
```
