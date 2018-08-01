Utils = {};
Utils.gotoPage = function (url, params, target) {

    if (params) {

        url = url + "?" + $.param(params);
    }
    window.location.target = "_ablank ";
    window.location.href = url;

};

Utils.getCaptcha = function (imgElem, url) {

    var timenow = new Date().getTime();
    $(imgElem).attr("src", url + "?__=" + timenow);

};

Utils.bindData = function (container, obj) {
    function replace(str) {
        var patten = "";
        for (var name in obj) {

            patten = new RegExp("\\$" + name + "(?!\\w+)", "g");

            if (obj[name] != null) {
                str = str.replace(patten, obj[name]);
            }

        }
        return str;

    };

    function handleUnmatch(str) {

        var patten = new RegExp("\\$\\w+", "g");
        str = str.replace(patten, "");

        return str;
    };

    function handleAttr(attr) {
        var val = container.attr("@" + attr);
        if (val) {
            val = replace(val);

            // container.removeAttr("@" + attr);

            container.attr(attr, val);

        }

    };

    var html, patten;

    html = container.html() + "";

    if (typeof obj == "object") {

        html = replace(html);

    } else {

        html = obj + "";
    }

    // @src @href 处理
    patten = /@((href)|(src))/gi;
    html = html.replace(patten, "$1");

    // dom属性中的@src @href处理
    handleAttr("src");
    handleAttr("href");
    handleAttr("id");
    handleAttr("value");
    handleAttr("name");
    handleAttr("data");
    handleAttr("text");
    handleAttr("title");

    html = handleUnmatch(html);

    container.html(html);
};
Utils.bindList = function (container, itemTmpl, list, actions, onBind) {
    // bind product items
    //debugger;

    var itemMod = $(itemTmpl).eq(0);

    var frame = document.createDocumentFragment();
    for (var i = 0; i < list.length; i++) {

        var item = itemMod.clone(true);

        item.removeAttr("id");

        Utils.bindData(item, list[i]);

        item.show();

        // action binding
        if (actions) {
            Utils.bindAction(item, actions);
        }

        if (onBind) {

            onBind(item, list[i]);
        }
        frame.appendChild(item[0]);
    }

    $(container).append(frame).find('.loading').remove();
};

Utils.bindAction = function (viewElem, actions) {

    var events = ["click", "changed"];

    var fn = function (evt) {

    }

    var attr = "";
    for (var i = 0; i < events.length; i++) {

        attr = "[" + events[i] + "]";

        switch (events[i]) {
            case 'click':
                $(viewElem).find(attr).click(function () {

                    var action = $(this).attr('click');
                    actions[action](this);
                });
                break;
            case 'changed':
                $(viewElem).find(attr).change(function () {

                    var action = $(this).attr('changed');
                    actions[action](this);
                });
                break;

        }

    }

};

Utils.bindProps = function (viewElem, props, direct) {

    function collect(props) {

        $(viewElem)
            .find("input")
            .each(
                function (index, elem) {

                    elem = $(elem);
                    if (!elem.attr("name") || !elem.val() ||
                        (elem.val() == "")) {
                        return;
                    }

                    switch (elem.attr("type")) {

                        case "checkbox":
                            if (elem.attr("checked")) {
                                if (elem.attr("group")) {
                                    var data = props[elem.attr("name")];
                                    if (!data) {
                                        data = props[elem.attr("name")] = [];
                                    }
                                    props[elem.attr("name")][data.length] = elem
                                        .val();
                                } else {

                                    props[elem.attr("name")] = elem.val();
                                }

                            }
                            break;
                        case "radio":
                            if (elem.attr("checked")) {
                                props[elem.attr("name")] = elem.val();
                            }
                            break;
                        case "text":
                        case "hidden":
                        case "password":
                        default:
                            if (!elem.attr("name") || (elem.val() == "")) {
                                break;
                            }
                            if (props[elem.attr("name")]) {

                                props[elem.attr("name")] = props[elem
                                        .attr("name")] +
                                    "," + elem.val();
                            } else {
                                props[elem.attr("name")] = elem.val();
                            }

                    }

                });

        $(viewElem).find("select").each(function (index, elem) {
            props[$(elem).attr("name")] = $(elem).val();
        });
        $(viewElem).find("textarea").each(function (index, elem) {
            props[$(elem).attr("name")] = $(elem).val();
        });
    }

    function fillElem(elem, data) {

        if (elem.attr("type") == "checkbox" || elem.attr("type") == "radio") {

            var val = $(elem).val() + "";

            if (val == (data + "")) {

                elem.attr("checked", true);
            }

        } else if (elem.is("input") || (elem.is("textarea")) ||
            (elem.is("select"))) {
            elem.val(data);

        } else {
            elem.html(data);
        }

    }

    function fill(props) {

        var elems = {};

        for (var p in props) {

            elems = $(viewElem).find("[name='" + p + "']");

            if (elems.lenght <= 0) {

                break;
            }

            // is array
            if ($.isArray(props[p])) {

                $.each(props[p], function (index, data) {

                    $(elems).each(function (index, elem) {

                        if ($(elem).val() == (data + "")) {
                            fillElem($(elem), data);
                        }
                    });

                });

            } else {

                elems.each(function (index, elem) {

                    fillElem($(elem), props[p]);
                });

            }

        }

    }

    if (direct) {
        fill(props);
    } else {
        collect(props);
    }

};

Utils.getUrlParam = function (name) {
    var reg = new RegExp("(^|[&\?])" + name + "=([^&]*)(&|$)");
    var searchString = ((location.hash) ? location.hash : window.location.search.substring(1)).replace(/\&amp;/g, '&').replace(/\&iexcl;/g, '?'); // 处理转义的情况
    //針對query是s
    if (name === "s") {
        searchString = (window.location.search) ? window.location.search.substring(1) : "";
    }
    var r = searchString.match(reg);
    if (r != null)
        return decodeURIComponent(r[2]);
};

Utils.getUrlParams = function getParameters() {

    //var searchString = (location.hash.slice(location.hash.indexOf("?")))?location.hash:window.location.search.substring(1);
    var searchString = "";

    if (location.hash.indexOf("?") > 0) {

        searchString = location.hash.slice(location.hash.indexOf("?") + 1);
    } else {

        searchString = window.location.search.substring(1);
    }

    var params = searchString.split("&"),
        hash = {};

    if (searchString === "")
        return {};
    for (var i = 0; i < params.length; i++) {
        var val = params[i].split("=");
        hash[unescape(val[0])] = decodeURIComponent(val[1]);
    }

    return hash;
};

Utils.getUserInfo = function () {
    // 获取用户信息
    var url = "queryIssuerInfo";
    var obj = {};
    request.ajax({
        url: url,
        type: 'get',
        async: false,
        token: true,
        success: function (data) {
            if (data.code === "1") {
                obj = data.data;
                user.create(data.data);
            }
        }
    });

    return obj;
}

Utils.repayAction = function (dom) {
    layer.load(2)
    var fk_borrow_id = $(dom).data('pid'),
        repay_no = $(dom).data('no'),
        amount = $(dom).data('sum'),
        available = user.data.available;
    if (amount > available) {
        layer.closeAll('loading')
        return layer.confirm('当前余额不足', {
                btn: ['去充值', '取消'] //按钮
            },
            function () { //充值
                location.hash = 'page=recharge';
                layer.closeAll()
            });
    } else {
        request.ajax({
            url: 'confirmRepay',
            type: 'post',
            token: true,
            data: JSON.stringify({
                fk_borrow_id: fk_borrow_id,
                repay_no: repay_no
            }),
            success: function (res) {
                layer.closeAll('loading')
                if (res.code === '1') {
                    layer.msg(res.msg, {
                        icon: 1,
                        time: 1500,
                        end: function () {
                            Utils.getUserInfo()
                            location.reload()
                        }
                    })
                } else {
                    layer.msg(res.msg, {
                        icon: 2,
                        time: 1500,
                    })
                }
            }
        })
    }
}

Utils.addRules = function (rules) {

    $.extend($.fn.validatebox.defaults.rules, rules);

};

Utils.debug = function (msg) {
    window.console &&
        ((window.console.debug && (console.debug(msg) || 1)) || (window.console.log && console
            .log(msg)));
}

Utils.error = function (msg) {
    window.console &&
        ((window.console.error && (console.error(msg) || 1)) || (window.console.log && console
            .log(msg)));
}

Utils.warn = function (msg) {
    window.console &&
        ((window.console.warn && (console.warn(msg) || 1)) || (window.console.log && console
            .log(msg)));
}

Utils.log = function (msg) {
    window.console && window.console.log && console.log(msg);
}

$.fn.extend({
    makeform: function (options) {

        var opt = {
            type: 'post',
            dataType: 'json'

        };

        this.each(function () {
            var $this = $(this);
            $.extend(opt, options, {
                // beforeSubmit : function() {
                //
                // var canSubmit = $this.form('validate');
                //
                // return canSubmit;
                // },

                success: function (data) {
                    if (options.onsuccess) {
                        options.onsuccess(data);
                    }
                }

            });

            $this.unbind("submit");
            $this.submit(function () {

                if (opt.submit) {

                    opt.submit();

                } else {
                    $(this).ajaxSubmit(opt);
                }

                return false;
            });

        });

    },
    cleanForm: function () {

        $(this).form("clear");
    },
    disableForm: function () {
        $(this).find(':input').each(function () {
            if (this.type != "button") {
                $(this).attr("disabled", "disabled");
            }
        });
    }

});

Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds()
        // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
                (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
PorletLoader = {

    loadPorlet: function (container, porlets, prefix) {

        //console.log("loadPorlet " + container + ":"+ JSON.stringify(porlets)  )

        if (!porlets) {
            return;
        }

        if ((typeof container === "string") && (!container.match(/^#.*/))) {

            container = "#" + container;
        }

        if (!$(container)[0]) {

            return;
        }

        if (!prefix) {

            prefix = ""
        }

        var pbox = $(container);

        try {
            pbox.empty();
        } catch (e) {
            pbox[0].innerHTML = "";
        }

        for (var i = 0; i < porlets.length; i++) {

            if (!porlets[i].link || porlets[i].link === "") {

                return;
            }


            (function (arg) {

                var tmpBox = {};
                if (porlets.length > 1) {

                    tmpBox = $(document.createElement("div"));
                    tmpBox.addClass("box");
                    pbox.append(tmpBox);
                } else {
                    tmpBox = pbox;
                    tmpBox.addClass("box");

                }


                var porlet = porlets[arg];

                var t = new Date().getTime() //为了防止页面缓存，lanqy添加

                tmpBox.load(prefix + porlet.link + '?v=' + t, function (response, status, xhr) {
                    if (porlet.datas) {
                        var fn = porlet.name + ".render(porlet.datas)";

                        eval(fn);
                    } else if (porlet.dataurl) {

                        var fn = porlet.name + ".init(porlet.dataurl)";
                        eval(fn);
                    }

                    if (porlet.callback) {
                        porlet.callback();
                    }

                });

            })(i);
        }
    },
    loadPageConfig: function (url) {

        $.getJSON(url, function (data) {

            for (var container in data) {

                PorletLoader.loadPorlet(container, data[container]);

            }

        });


    }

};


/**
 * 替换字符
 */
String.prototype.replaceAll = function (b, a) {
    return this.replace(new RegExp(b, "gm"), a);
};


/**
 * 替换字符:<p> </p>
 */
String.prototype.replaceAllLabelP = function () {
    return this.replaceAll("<p>", "").replaceAll("</p>", "");
};


Utils.toCommonDateStr = function (datestr) { //转为标准date的字符串形式，以便兼容IE，参数datestr的格式是yyyy-MM-dd HH:mm:ss或yyyy/MM/dd HH:mm:ss
    var __monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var year = datestr.substring(0, 4);
    var month = datestr.substring(5, 7);
    var day = datestr.substring(8, 10);
    var hour = datestr.substring(11, 13);
    var minu = datestr.substring(14, 16);
    var sec = datestr.substring(17, 19);
    return __monthArray[month - 1] + " " + day + "," + year + " " + hour + ":" + minu + ":" + sec;
}

Utils.ieVersion = function () { //获取IE版本，非IE浏览器返回false
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) { // IE10以下
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) { // IE11
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) { //IE12
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    // 其他浏览器
    return false;
}

Utils.getQueryParameter = function (a) { // 获取URL参数
    var c = window.location.search,
        b = "";
    c = c.replace("?", "?&").split("&");
    for (var i = 1; i < c.length; i++) {
        if (c[i].indexOf(a + "=") == 0) {
            b = c[i].replace(a + "=", "")
        }
    }
    return b
}

/**
 * 获取string长度，中文按2个字节长度计算
 */

Utils.getStrLength = function (a) {
    var b = 0;
    if ($.trim(a)) {
        b = $.trim(a).replace(/[^\x00-\xff]/g, "##").length
    }
    return b
}

/**
 * 按指定长度截取字符串
 * @param str 源字符串
 * @param len 要截取的字符长度
 */
Utils._substring = function (str, len) {
    var strlen = 0;
    var s = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 128) {
            strlen += 2;
        } else {
            strlen++;
        }
        s += str.charAt(i);
        if (strlen >= len) {
            return s;
        }
    }
    return s;
}

/**
 * 返回主页面
 */
Utils.exitToPage = function () {
    var reg = new RegExp("(^|[&\#])page=([^&]*)(&|$)"),
        hash, flog = false;
    var searchString = (location.hash) ? location.hash : window.location.search.substring(1);
    var r = searchString.match(reg);
    var pageUrl = ["index", "financing", "more", "userindex", "recharge", ""];

    if (r != null) {
        hash = decodeURIComponent(r[2]);
    } else {
        hash = "";
    }
    console.log(hash)
    for (var i = 0; i < pageUrl.length; i++) {
        if (hash == pageUrl[i]) {
            flog = true;
            break;
        }
    }

    androidExit.exit(flog)

}

Utils.getEchoMobile = function (_mobile) {
    return ("" + _mobile).replace(/^(.{3}).{4}(.*)/, "$1****$2");
}

Utils.getEchoEmail = function (_email) {
    _email = "" + _email;
    var pos = _email.indexOf("@");
    if (pos <= 0) {
        return _email;
    }
    var preName = _email.substring(0, pos);
    var suffixName = _email.substr(pos);
    var result = "";
    var _echo = "****";
    if (preName.length > 3) {
        result = preName.replace(/^(.{3}).{0,4}(.*)$/, "$1" + _echo + "$2") + suffixName;
    } else {
        result = preName.replace(/^(.).*/, "$1" + _echo) + suffixName;
    }
    return result;
}

var userData = JSON.parse(sessionStorage.getItem('__userSession')) || DataProvider.localStore.get('appUserSession');

Utils.get = function (url, callback) { // 用于H5某些get方法，方便统一传token
    $.ajax({
        url: url,
        type: "GET",
        beforeSend: function (xhr) {
            if (userData) {
                if (userData.token != '' && userData.token != null && userData.token != undefined) {
                    xhr.setRequestHeader('Token', userData.token);
                }
            }
        },
        success: function (data) {
            callback(data);
        },
        error: function (xhr, status, err) {
            factory.ajaxerror(xhr, status, err); //base.js
        }
    });
}



// Object.assign Polyfill

if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
        'use strict';
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}

var __PLATFORM = {
    _get: function () {
        var type = Utils.getUrlParam('s'); // 平台类型
        switch (type) {
            case 'hx':
                return 'ghbank';
                break;
            case 'hf':
                return 'chinapnrts';
                break;
            default:
                return 'chinapnrts'
        }
    }
}

$(window).unload(function () {
    Cookies.remove('hxUrl');
});