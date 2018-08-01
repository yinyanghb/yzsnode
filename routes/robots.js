var express = require('express');
var router = express.Router();
var ipware = require('ipware')();
var appConfig = require('../config/app-config');

// 爬虫路由，开发环境不允许爬虫
if (appConfig.evn === 'development') {
	router.get('/robots.txt', function(req, res) {
	    res.render('robots.txt', {
	        title: ''
	    })
	});
}

module.exports = router;
