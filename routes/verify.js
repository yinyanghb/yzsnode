var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

// 百度统计，搜狗统计，微信验证等路由
var filesPath = path.resolve(__dirname, '../views/verify')
var stats = fs.statSync(filesPath);
if (stats.isDirectory()) {
    fs.readdirSync(filesPath).forEach(filename => {
      router.get('/' + filename, function(req, res) {
        if ('/robots.txt' == req.url) {
          res.type('text/plain');
          res.send("User-agent: *\nDisallow: /*?*\nDisallow: /members");
        }else if('/sitemap.xml' == req.url){
          res.header('Content-Type', 'text/xml');
          res.render('verify/' + filename, {
            title: ''
          })
        }else{
          res.render('verify/' + filename, {
            title: ''
          })
        }
      });
    })
}

module.exports = router;
