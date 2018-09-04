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
      },
      function (err, results) {
        //渲染页面
        render("projects/index", results, res, req);
      }
    );
  },
  seek:function(req,res){
    var url = appConfig.apiBasePath +'/pc/queryAssetInfoList?';
    var obj = req.body;
    console.log(obj,'obj')
    var str = '';
    for(var k in obj){
       str += k + '=' + obj[k] + '&'
    }
    str = str.slice(0, -1);
    url = url +  str;
    console.log(url,'url')
    return async.parallel({
      data :function(callback){
        server.get( url, callback,  req);
      }
    },
    function (err, results) {
      //渲染页面
      console.log(results.data)
      res.json(results.data)
    }
  );
 },
 ByCode:function(req,res){
   var  url = appConfig.apiBasePath +'/pc/queryAssetInfoByCode?borrowType='+req.body.borrowType+'&queryCode='+req.body.queryCode+'&page='+req.body.page;
   console.log(url)
   return async.parallel({
    data :function(callback){
      server.get( url, callback,  req);
    }
  },
  function (err, results) {
    //渲染页面
    console.log(results.data)
    res.json(results.data)
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
      },
      function (err, results) {
        //渲染页面
        render("projects/detail", results, res, req);
      }
    );
  }
};