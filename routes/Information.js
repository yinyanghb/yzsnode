var express = require('express');
var router = express.Router();
var ipware = require('ipware')();
var infoMationController = require('../controllers/Information');
var render = require('../common/render');
var error = require('../common/error');

// 首页
// router.get('/Information', function (req, res, next) {
//     try {
//         infoMationController.render(res, req)
//     } catch (e) {
//         error(req, res, next);
//         return;
//     }

// })
// 企业资质
router.get('/Information/ability', function (req, res, next) {
    render('Information/index', '', res, req);
});
// 公告
router.get('/Information/notice', function (req, res, next) {
    try {
        infoMationController.noticeRender(res, req);
    } catch (e) {
        error(req, res, next);
        return
    }

});
module.exports = router;