function vIdCard(id) {
    // 验证身份证是否合法
    var Validator = new IDValidator();
    return Validator.isValid(id);
}

function vMobile(m) {
    // 验证手机号
    return /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/i.test(m);
}

function vEmail(email) {
    // 验证邮箱合法性
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}