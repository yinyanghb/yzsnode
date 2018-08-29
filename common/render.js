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
    title:'亚租所-综合金融要素交易平台丨山东高速金融成员',
    keywords:'亚租所，深圳亚太租赁资产交易中心，资产流转，交易撮合，资产交易服务，投融资金融服务',
    description:'深圳亚太租赁资产交易中心有限公司是经深圳市人民政府批复, 由山东高速金融出资成立的资产交易服务平台，为各类资产交易及相关产品的登记、托管、交易、融资、结算等提供国际化、专业化的全程式服务。',
    evn: appConfig.evn,
    __userSession: req.cookies.__userSession ?
      JSON.parse(req.cookies.__userSession) : '',
  });

  return
};