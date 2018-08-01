var express = require('express');
var router = express.Router();
var ipware = require('ipware')();
// var aboutController = require('../controllers/about');
var render = require('../common/render');
var error = require('../common/error');
// 公司简介
router.get('/about', function (req, res, next) {
    render('about/index', '', res, req);
});
// 公司动态
router.get('/about/dynamic', function (req, res, next) {
    render('about/dynamic', '', res, req);
});
//管理团队
router.get('/about/team', function (req, res, next) {
    render('about/team', '', res, req);
});
module.exports = router;