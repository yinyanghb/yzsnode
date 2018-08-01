var express = require('express');
var router = express.Router();
var ipware = require('ipware')();
var indexController = require('../controllers/index');
var render = require('../common/render');
var error = require('../common/error');

// 首页
router.get('/', function (req, res, next) {
    try {
        indexController.render(res, req)
    } catch (e) {
        error(req, res, next);
        return;
    }
})


module.exports = router;