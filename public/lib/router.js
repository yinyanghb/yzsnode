Router = {
    mappings: {},
    current: {},
    listener: {},
    scrollTop: true, // 用于hash改变时滚动到顶部，add by lanqy
    addListener: function (key, fn) {
        Router.listener[key] = fn;
    },
    init: function (mappings) {
        var _this = this;
        Router.mappings = mappings;
        // var url=window.location.href;
        // var arr = url.split('#'),
        //     hash = arr[1];
        //     if(hash){
        //         var hashArr = hash.replace('page=', '').split('?'),
        //             key = hashArr[0];
        //     }
        //
        // if(!mappings[key] && arr.length > 1){
        //     Utils.gotoPage("error404.html#page=err404");
        // }

        $(window).bind("hashchange", Router.onHashChange);
        //window.addEventListener('hashchange', function(e) {
        //
        //    Router.onHashChange(e.newURL);
        //}, false);
    },
    goto: function (page, defaultkey) {

        var blocks = Router.mappings[page];
        if ($.isArray(blocks)) {

            var curBlock = blocks.slice();
            var curkey = Router.getblock(location.href);

            if (!curkey) {
                curkey = defaultkey;
            }

            var inarray = false;
            for (var i = 0; i < curBlock.length; i++) {

                if (curkey === curBlock[i]) {
                    inarray = true;
                    break;
                }
            }
            if (!inarray) {
                curBlock.push(curkey);
            }

            for (var i = 0; i < curBlock.length; i++) {
                var ablock = Router.mappings[curBlock[i]];
                if (ablock) {
                    PorletLoader.loadPorlet(ablock.box, ablock.porlets);
                }
            }
        }
    },
    routeTo: function (key, args) {
        var blocks = Router.mappings[key];
        //found porlets
        if (blocks) {
            if ($.isArray(blocks)) {

                for (var i = 0; i < blocks.length; i++) {
                    var ablock = Router.mappings[blocks[i]];
                    if (ablock) {
                        PorletLoader.loadPorlet(ablock.box, ablock.porlets);
                    }

                }
            } else {
                PorletLoader.loadPorlet(blocks.box, blocks.porlets);
            }

        } else {
            window.location.href = window.location.href;
        }
    },
    getblock: function (url) {

        var arr = url.split('#'),
            hash = arr[1];
        if (hash) {
            var hashArr = hash.replace('page=', '').split('?'),
                key = hashArr[0];
            return key;
        }

        return null;
    },
    onHashChange: function () {
        var url = window.location.href;
        var arr = url.split('#'),
            hash = arr[1];
        if (hash) { // 判断没有hash的情况
            var args = Router.getHashArgs(hash);
            var hashArr = hash.replace('page=', '').split('?'),
                key = hashArr[0];
        } else {
            key = null;
        }

        Router.routeTo(key, args);
        if (Router.listener) {
            for (var name in Router.listener) {
                if (name) {
                    Router.listener[name](url, key);
                }
            }
        }

        if (Router.scrollTop) {
            $('body,html').animate({
                scrollTop: 0
            }, 200);
        }

    },
    getHashArgs: function (hash) {
        var arr1 = hash.replace('#', '').replace('page=', '').split('?'), // 起码不强求必须有#
            arr2 = arr1[1],
            args = [];
        if (typeof arr2 !== 'undefined') {
            arr2 = arr1[1].split('&');
            for (var i = 0, len = arr2.length; i < len; i++) {
                var tempArr = arr2[i].split('=');

                args.push(tempArr[1]);

            }
        }
        return args;
    }


};