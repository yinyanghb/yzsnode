var express = require('express');
var router = express.Router();
var ipware = require('ipware')();
var projectController = require('../controllers/projects');
var render = require('../common/render');
var error = require('../common/error');

// 
router.post('/seek',function(req,res,next){
    try{
        projectController.seek(req,res,next)
    } catch(e){
        error(req,res,next)
    }
})
router.post('/ByCode',function(req,res,next){
    try{
        projectController.ByCode(req,res,next)
    } catch(e){
        error(req,res,next)
    }
})
// 机构专区
router.get('/projects/:type', function (req, res, next) {
    try {
        projectController.render(res, req, req.params.type);
    } catch (e) {
        error(req, res, next);
        return;
    }
});
// 资产登记业务详情
router.get('/projects/:type/detail/:projectId', function (
    req,
    res,
    next
) {
    try {
        projectController.detailRender(res, req, req.params.projectId);
    } catch (e) {
        error(req, res, next);
        return;
    }
});


module.exports = router;