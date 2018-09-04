var async = require("async");
var querystring = require("querystring");
var appConfig = require("../config/app-config");
var Api = require("../api/api");
var server = require("../models/index");
var render = require("../common/render");

module.exports = {
    render: function (res, req) {
        return async.parallel({



                notice: function (callback) {
                    // 公告
                    server.getById(appConfig.apiBasePath + Api.NoticeList, callback, 1, req);
                },
                plat: function (callback) {
                    // 公司动态
                    server.getById(appConfig.apiBasePath + Api.NoticeList, callback, '3&length=5', req);
                },

                news: function (callback) {
                    // 本所公告
                    server.getById(appConfig.apiBasePath + Api.NoticeList, callback, '1&length=5', req);
                },

                AssetInfo: function (callback) {
                    // 首页产品列表
                    server.get(appConfig.apiBasePath + Api.AssetInfo, callback, req);
                }
            },
            function (err, results) {
               
                //渲染页面
                if(!err){
                    render("index", results, res, req);
                }
                
            }
        );
    }
};