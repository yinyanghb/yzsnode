var express = require('express');
var router = express.Router();
var ipware = require('ipware')();
var aboutController = require('../controllers/about');
var render = require('../common/render');
var error = require('../common/error');
// 公司简介
router.get('/about', function (req, res, next) {
    render('about/index', '', res, req);
});
// 公司动态
router.get('/about/dynamic', function (req, res, next) {
    try {
        aboutController.dynamicRender(res, req, 3);
    } catch (e) {
        error(req, res, next);
        return
    }
});
//联系我们
router.get('/about/noticeUs', function (req, res, next) {
    render('about/noticeUs', '', res, req);
});
// notify
router.get('/about/notify', function (req, res, next) {
    render('about/notify', '', res, req);
});
module.exports = router;