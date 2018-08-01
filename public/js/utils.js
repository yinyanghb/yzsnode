
    PorletLoader = {

        loadPorlet: function (container, porlets, prefix) {

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
                        // tmpBox.addClass("box");
                        pbox.append(tmpBox);
                    } else {
                        tmpBox = pbox;
                        // tmpBox.addClass("box");
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
        }
    };
