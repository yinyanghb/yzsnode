var async = require("async");
var querystring = require("querystring");
var appConfig = require("../config/app-config");
var Api = require("../api/api");
var server = require("../models/index");
var render = require("../common/render");

module.exports = {
    noticeRender: function (res, req) {
        return async.parallel({

                // 公告
                notice: function (callback) {
                    server.getById(appConfig.apiBasePath + Api.NoticeList, callback, 1, req);
                },
            },
            function (err, results) {
                //渲染页面
                render("Information/index", results, res, req);
            }
        );
    },


};