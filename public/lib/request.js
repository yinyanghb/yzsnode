var user = {
  data: {},
  islogin: function () {
    user.load();
    return user.data;
  },
  create: function (obj, keepdays) {
    var key = Object.keys(obj);

    for (var i = 0; i < key.length; i++) {
      user.data[key[i]] = obj[key[i]];
    }

    user.save(keepdays);
  },
  save: function (keepdays) {
    DataProvider.localStore.save("__userSession", user.data, keepdays);
  },
  load: function () {
    // 取出cookie中的json对象
    user.data = DataProvider.localStore.get("__userSession") || {};
  },
  del: function () {
    DataProvider.localStore.remove("__userSession");
    user.data = {};
  }
};

if (window["context"] == undefined) {
  if (!window.location.origin) {
    window.location.origin =
      window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "");
  }
  window["context"] = location.origin + "/V6.0";
}

var request = {
  site: location.origin,
  host: apiBasePath,
  __Routes: {},
  ajax: function (opt) {
    // lanqy添加,以支持同步异步参数配置等

    var fullpath = request.host + opt.url + "?_" + new Date().getTime();
    if (opt.url.indexOf("?") != -1) {
      fullpath = request.host + opt.url + "&_" + new Date().getTime();
    }

    var key = "_" + encodeURIComponent(opt.url).replace(/[\/\.%!?&=]/g, ""),
      route = request.__Routes[key];

    //避免重复发送请求
    if (route && opt.url === route.url && route.request) {
      return;
    }

    request.__Routes[key] = {
      url: opt.url,
      request: true
    };

    $.ajax({
      type: opt.type || "get",
      url: fullpath,
      timeout: 3000,
      contentType: 'application/json',
      data: opt.data || {},
      dataType: opt.dataType || "json",
      async: opt.async === undefined ? true : opt.async === true,
      cache: opt.cache === undefined ? false : opt.cache === true,
      beforeSend: function (xhr) {
        request.ajaxbeforeSend(xhr, opt.token);
      },
      success: function (data) {

        var url = "";
        if (location.pathname != '/login') {
          url = '?urlReturn=' + window.location.href;
        }
        if (data.code === "-1") {
          // 登陆超时或者在别处登陆
          layer.closeAll();
          layer.alert("登录超时", {
            end: function () {
              window.location.href = "/login" + url;
            }
          });
          return;
        } else if (data.code === '2') {
          layer.alert("未绑定银行卡", {
            end: function () {
              location.hash = 'page=bindCard' //跳转到绑卡页面
              layer.closeAll();
            }
          });
          return;
        } else if (data.code === '3') {
          layer.alert("未设置支付密码", {
            end: function () {
              location.hash = 'page=setPayPsw' //跳转到设置密码
              layer.closeAll();
            }
          });
          return;
        }
        if ($.isFunction(opt.success)) {
          opt.success(data);
        }
      },
      error: function (xhr, status, err) {
        if ($.isFunction(opt.error)) {
          opt.error(xhr, status, err);
        }
        request.ajaxerror(xhr, status, err);
      },
      complete: function (b, c) {
        request.__Routes && delete request.__Routes[key],
          $.isFunction(opt.complete) && opt.complete.call(this, b, c);

        if (c == 'timeout') { //超时
          b.abort();
          layer.alert(' 链接超时请稍后重试', function () {
            if (location.pathname === '/login') {
              window.location.href = "/login"
            } else {
              window.location.href = "/login" + '?urlReturn=' + window.location.href
            }

          });
        }
      }
    });
  },

  ajaxbeforeSend: function (xhr, token) {
    if (user != "" && typeof user.data.token != "undefined") {
      if (token) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + user.data.token);
      }
    } else {
      if (typeof window._user != "undefined") {
        user = window._user;
      }

      if (token) {
        xhr.setRequestHeader("token", user.data.token);
      }
    }
  },

  ajaxerror: function (xhr, textStatus, errorThrown) {
    layer.closeAll('loading')
    var self = this;
    var state = xhr.status;
    var reg = /[\u3400-\u9FBF]/; // 中文|日文
    if (state == 401) {
      //Token过期
      user.del();
      Utils.gotoPage("/login");
    } else if (state == 403) {
      //没有相应权限
      //   jAlert.warn("没有权限");
      self.msgDialog(errDate.msg);
    } else if (xhr.status == 400 || xhr.status == 500) {
      var errDate = JSON.parse(xhr.responseText);
      if (reg.test(errDate.msg)) {
        // 检查是否包含中文，如包含中文直接显示，否则显示服务器繁忙 add by lanqy
        // jAlert.warn(errDate.msg);
        self.msgDialog(errDate.msg);
      } else {
        self.msgDialog("服务器繁忙，请稍后再试");
        // jAlert.warn("服务器繁忙，请稍后再试");
      }
    }
  },

  msgDialog: function (msg) {
    // 弹窗提示
    var contontTpl =
      '<div style="padding:10px;margin:0 5px;text-align:center;">' +
      msg +
      "</div>";
    layer.alert(contontTpl);
  },

  //加时间戳前要对URL加个判断，如果有?号就加&_=new Date().getTime()，否则?_=new Date().getTime()
  get: function (url, params, callback) {
    if (url.indexOf("?") != -1) {
      var fullpath = request.host + url + "&_" + new Date().getTime();
    } else {
      var fullpath = request.host + url + "?_" + new Date().getTime();
    }
    $.getJSON(fullpath, params, function (data) {
      callback(data);
    });
  }
};