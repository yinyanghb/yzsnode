var async = require("async");
var querystring = require("querystring");
var appConfig = require("../config/app-config");
var Api = require("../api/api");
var server = require("../models/index");
var render = require("../common/render");
module.exports = {
    dynamicRender: function (res, req, id) {
        return async.parallel({

                // 动态
                dynamic: function (callback) {
                    server.getById(appConfig.apiBasePath + Api.NoticeList, callback, id, req);
                },
            },
            function (err, results) {
                //渲染页面
                render("about/dynamic", results, res, req);
            }
        );
    }


};