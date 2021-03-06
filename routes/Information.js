var express = require('express');
var router = express.Router();
var ipware = require('ipware')();
var infoMationController = require('../controllers/Information');
var render = require('../common/render');
var error = require('../common/error');


// 企业资质
router.get('/Information/ability', function (req, res, next) {
    render('Information/ability', '', res, req);
});
// 公告
router.get('/Information/notice', function (req, res, next) {
    try {
        infoMationController.noticeRender(res, req,1);
    } catch (e) {
        error(req, res, next);
        return
    }
});
//公告详情
router.get('/:page/:type/:pid', function (req, res, next) {
    try {
        infoMationController.detailsRender(res, req, req.params.pid);
    } catch (e) {
        error(req, res, next);
        return
    }
});
// 政策法规
router.get('/about/policy', function (req, res, next) {
    try {
        infoMationController.noticeRender(res, req,4);
    } catch (e) {
        error(req, res, next);
        return
    }
});
module.exports = router;