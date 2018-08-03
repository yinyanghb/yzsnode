var request = require("request");

module.exports = {
  get: function (url, callback, req) {
    var opt = this.getHeaders(req, url);
    request(opt, function (error, response, body) {

      if (body) {
        var data = JSON.parse(body);
        callback(null, data);
      } else {
        // 防止后端没有返回数据时node报错
        callback(null, null);
      }
    });
  },

  getById: function (url, callback, id, req) {
    // 通过id获取相关数据，公用方法
    var opt = this.getHeaders(req, url, id);

    request(opt, function (error, response, body) {
      if (body) {
        var data = JSON.parse(body);
        callback(null, data);
      } else {
        // 防止后端没有返回数据时node报错
        callback(null, null);
      }
    });
  },

  getHeaders: function (req, url, id) {
    var params = req.query;
    var str = ''
    for (var k in params) {
      str = k + '=' + params[k] + '&'
    };
    str = str.slice(0, -1);
    id ? url += '&' + str : url += '?' + str


    return {
      url: id ? url.replace(/\$id/, id) : url.replace(/\$id/, ''),
      headers: {
        "Content-Type": "application/json",
        "Service-Info": "Nodejs-request-brian.bai",
        "User-Agent": "request"
      }
    };
  }
};