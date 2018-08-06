var appConfig = require("../config/app-config");
var express = require("express");
module.exports = function (env) {
  env
    .addGlobal("toThousand", function (a, b) {
      //数字转成万等等
      if (a) {
        var s = a / b + "";
        if (s.indexOf(".") > -1) {
          return s.substring(0, s.indexOf(".") + 3);
        } else {
          return s;
        }
      }
      return "";
    })
    .addGlobal("subStringFn", function (str, len) {
      // 截取文本

      if (!str) {
        return "";
      }

      var str = str
        .replace(/&nbsp;/g, "")
        .replace(/&rdquo;/g, "”")
        .replace(/&ldquo;/g, "“")
        .replace(/&mdash;/g, "—");
      var s = str.replace(/<(?:.|\n)*?>/gm, "").trim();
      if (s.length > len) {
        return s.substring(0, len) + "...";
      }
      return s;
    })
    .addGlobal("splitDate", function (a) {
      // 时间截取
      return a.split(" ")[0];
    })
    .addGlobal("fixedFloat", function (item) {
      //修复js计算问题（类似7.4-0.8 = 6.6000000000000005）
      return (
        (item.rate.toFixed(3) * 1000 - item.operationRate.toFixed(3) * 1000) /
        1000
      );
    })
    .addGlobal("formatCurrency", function (num) {
      // 格式化金额
      if (!num) {
        return "0";
      }

      if (num) {
        num = num.toString().replace(/\$|\,/g, "");
      }

      if (isNaN(num)) num = "0";
      sign = num == (num = Math.abs(num));
      num = Math.floor(num * 100 + 0.50000000001);
      cents = num % 100;
      num = Math.floor(num / 100).toString();
      if (cents < 10) cents = "0" + cents;
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num =
        num.substring(0, num.length - (4 * i + 3)) +
        "," +
        num.substring(num.length - (4 * i + 3));
      return (sign ? "" : "-") + num + "." + cents;
    })
    .addGlobal("apiBasePath", appConfig.apiBasePath)
    .addGlobal("getPath", function (path) {
      var paths = "";
      if (path.indexOf("?") !== -1) {
        paths = path.substring(0, path.indexOf("?")).split("/");
      } else {
        paths = path.split("/");
      }
      return paths;
    })
    .addGlobal("projectState", function (a) {
      var state = a;
      if (state === 1) {
        return "挂牌中";
      } else if (state === 2) {

        return "已成交";
      } else if (state === 3) {
        // 已还清
        return "已兑付";
      } else {
        // 默认已结束
        return "已结束";
      }
    })
    .addGlobal("timeOverAt", function (a) {
      var match = a.match(/^(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\:(\d+)$/);
      return (+new Date() -
        new Date(
          match[1],
          match[2] - 1,
          match[3],
          match[4],
          match[5],
          match[6]
        ).getTime() >
        0
      );
    })
    .addGlobal("pathArray", function (path) {
      return path
        .replace(/\?s=hf/g, "")
        .replace(/\?s=hx/g, "")
        .substring(1)
        .split("/")[0];
    })

    .addGlobal("confusedMobile", function (m) {
      if (!m) {
        return "";
      }
      return m.substring(0, 3) + "****" + m.substring(7, m.length);
    })
    .addGlobal("currentTime", function () {
      return +new Date().getTime();
    })
    .addGlobal("setHref", function (params, arg) {
      var p = Object.assign({}, params, arg);
      var str = "?";
      for (var key in p) {
        str += key + "=" + p[key] + "&";
      }
      return str.substring(0, str.lastIndexOf("&"));
    })
    .addGlobal("subStr", function (str, num) {
      if (!str) {
        // 检查非空
        return "";
      }
      if (str.length < num) {
        return str;
      } else {
        return str.substr(0, num) + "...";
      }
    });
};