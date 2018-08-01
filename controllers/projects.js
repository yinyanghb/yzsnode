var async = require("async");
var querystring = require("querystring");
var appConfig = require("../config/app-config");
var Api = require("../api/api");
var server = require("../models/index");
var render = require("../common/render");

module.exports = {
  render: function (res, req, id) {
    return async.parallel({

        // 项目列表
        projects: function (callback) {
          server.getById(appConfig.apiBasePath + Api.AssetInfoList, callback, id, req);
        },
        // goodCategory: function (callback) {
        //   server.get(appConfig.apiBasePath + Api.goodCategory, callback, req);
        // }
      },
      function (err, results) {
        //渲染页面
        render("projects/index", results, res, req);
      }
    );
  },

  detailRender: function (res, req, projectId) {
    return async.parallel({
        // 标的详情
        detail: function (callback) {
          server.getById(
            appConfig.apiBasePath + Api.AssetInfoDetail,
            callback,
            projectId,
            req
          );
        },


        // customerSureinfo: function (callback) {
        //   server.getById(
        //     appConfig.apiBasePath + Api.customerSureinfo,
        //     callback,
        //     projectId,
        //     req
        //   );
        // }
      },
      function (err, results) {
        //渲染页面
        render("projects/detail", results, res, req);
      }
    );
  }
};