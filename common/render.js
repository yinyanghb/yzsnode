// var redirect = require('../mobile/redirect');
var appConfig = require('../config/app-config');
module.exports = function (path, results, res, req) {
  // render统一处理，方便统一处理一些全局数据（登录信息,参数等等）

  // if (req.useragent.isMobile) {
  //   // 跳转手机端对应的页面
  //   return redirect(path, res, req);
  // }

  res.render(path, {
    data: results,
    hxUrl: req.hxUrl,
    params: req.params,
    query: req.query,
    path: req.url,
    timeStamp: +new Date(),
    evn: appConfig.evn,
    __userSession: req.cookies.__userSession ?
      JSON.parse(req.cookies.__userSession) : '',
  });

  return
};