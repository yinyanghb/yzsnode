var MAPPINGS = {
  /*
   * 个人中心--我的账户
   * 注意 我的账户 accout div 片段加载多个模块
   * */
  //我的账户

  members: [""],
  accout: {
    box: "accout_contentBox",
    porlets: [{
      link: "/templates/home/home_main.html"
    }]
  },

  // 企业信息
  companyInfo: {
    box: "accout_contentBox",
    porlets: [{
      link: "/templates/companyInfo/companyInfo.html"
    }]
  },
  //资金管理
  //充值(托管)
  recharge: {
    box: "accout_contentBox",
    porlets: [{
      link: "/templates/money/recharge.html"
    }]
  },
  //提现(托管)
  cash: {
    box: "accout_contentBox",
    porlets: [{
      link: "/templates/money/cash.html"
    }]
  },
  //资金记录
  frecord: {
    box: "accout_contentBox",
    porlets: [{
      link: "/templates/money/frecord.html"
    }]
  },
  //挂牌管理
  listing: {
    box: "accout_contentBox",
    porlets: [{
      link: "/templates/listing/listing.html"
    }]
  },
  //还款计划
  plan: {
    box: "accout_contentBox",
    porlets: [{
      link: "/templates/listing/plan.html"
    }]
  },
  // 还款详情
  repayment: {
    box: 'accout_contentBox',
    porlets: [{
      link: "/templates/listing/repayment.html"
    }]
  },
  // 绑卡
  bindCard: {
    box: 'accout_contentBox',
    porlets: [{
      link: "/templates/basic/bankcard_add.html"
    }]
  },
  // 设置支付密码
  setPayPsw: {
    box: 'accout_contentBox',
    porlets: [{
      link: "/templates/basic/setPayPsw.html"
    }]
  },
  // 修改支付密码
  changePayPsw: {
    box: 'accout_contentBox',
    porlets: [{
      link: "/templates/basic/changePayPsw.html"
    }]
  },
  // 银行卡列表
  bankcardmanage: {
    box: 'accout_contentBox',
    porlets: [{
      link: "/templates/basic/bankcard_manage.html"
    }]
  }
}