module.exports = function(req, res, next) {
  // 异常统一处理
  res.send({
    rsp_code: 'fail',
    error_code: 'system_error',
    error_msg: '系统错误',
  });
};
