$(function () {

    islogin();

    if (user.islogin()) { // 这里判断登录
        user.load();
        $('#user_info').show().find('.user_hone').text(user.data.userPhone)
        Router.init(MAPPINGS);
        Router.routeTo(_getBlock());
    }

    function _getBlock() {
        var arr = location.href.split('#'),
            hash = arr[1];
        if (hash) {
            var hashArr = hash.replace('page=', '').split('?'),
                key = hashArr[0];
            return key;
        }
        return "accout";
    };

    function islogin() {
        var userislogin = $.cookie('__userSession');
        if (!userislogin) { // 未登录跳转登录页
            var url = window.location.href;
            Utils.gotoPage('/?&urlReturn=' + url);
        }
    }
})