(function($) { $.fn.running = function() {
    function n() { var t = $(".animateNum"); var n = { top: $(window).scrollTop(), bottom: $(window).scrollTop() + $(window).height() };
      t.each(function() { var t = $(this).attr("data-animateTarget");
        n.top <= $(this).offset().top + $(this).height() && n.bottom >= $(this).offset().top && !$(this).data("start") && ($(this).data("start", !0), new AnimateNum({ obj: $(this), target: t, totalTime: 1e3 })) }) };

    function b() { var t = $(".animateBar"); var n = { top: $(window).scrollTop(), bottom: $(window).scrollTop() + $(window).height() };
      t.each(function() { var t = $(this).attr("data-animateTarget");
        n.top <= $(this).offset().top + $(this).height() && n.bottom >= $(this).offset().top && !$(this).data("start") && ($(this).data("start", !0), new AnimateBar({ obj: $(this), target: t, totalTime: 1e3 })) }) };

    function p() { var t = $(".animatePie"); var n = { top: $(window).scrollTop(), bottom: $(window).scrollTop() + $(window).height() };
      t.each(function() { var t = $(this).attr("data-animateTarget");
        n.top <= $(this).offset().top + $(this).height() && n.bottom >= $(this).offset().top && !$(this).data("start") && ($(this).data("start", !0), new AnimatePie({ obj: $(this), target: t, totalTime: 1e3 })) }) };
    $(window).bind("scroll", function() { n();
      b();
      p() });

    function AnimateNum(t) { this.obj = t.obj, this.target = t.target.toString(), this.totalTime = t.totalTime || 1e3, this.init() };

    function AnimateBar(t) { this.obj = t.obj, this.target = t.target.toString(), this.totalTime = t.totalTime || 1e3, this.init() };

    function AnimatePie(t) { this.obj = t.obj, this.target = t.target.toString(), this.totalTime = t.totalTime || 1e3, this.init() };
    AnimateNum.prototype = { init: function() { return this.target ? (this.animation(), void 0) : !1 }, animation: function() { var t = this,
          i = this.target.indexOf("."),
          e = 0;
        i >= 0 && (e = this.target.length - i - 1); var n = this.target.replace(".", ""),
          s = this.totalTime / 30 | 0,
          a = n / s | 0,
          r = 0,
          h = 0;
        t.timer = setInterval(function() { r++, h += a, t.obj.html(h / Math.pow(10, e)), r >= s && (clearInterval(t.timer), t.obj.html(t.target)) }, 30) } };
    AnimateBar.prototype = { init: function() { return this.target ? (this.animation(), void 0) : !1 }, animation: function() { var t = this,
          i = this.target.indexOf("."),
          e = 0;
        i >= 0 && (e = this.target.length - i - 1); var n = this.target.replace(".", ""),
          s = this.totalTime / 30 | 0,
          a = n / s | 0,
          r = 0,
          h = 0;
        t.timer = setInterval(function() { r++, h += a, t.obj.css('width', h / Math.pow(10, e) + '%'), r >= s && (clearInterval(t.timer), t.obj.animate({ 'width': t.target + '%' })) }, 30) } };
    AnimatePie.prototype = { init: function() { return this.target ? (this.animation(), void 0) : !1 }, animation: function() { var t = this;
        s = this.totalTime / 60 | 0;
        r = 0;
        t.i = 0;
        t.count = 0;
        t.j = 0;
        num = t.target;

        function start1() { t.obj.find('.pieInner span').html(t.i + 1); if (num == 0) return false;
          t.i = t.i + 1; if (t.i == num) { clearInterval(t.t1) } if (t.i == 50) { clearInterval(t.t1);
            num2 = num - 50;
            t.t2 = setInterval(start2, 1) };
          t.obj.find(".pieLeftInner").css("-o-transform", "rotate(" + t.i * 3.6 + "deg)");
          t.obj.find(".pieLeftInner").css("-moz-transform", "rotate(" + t.i * 3.6 + "deg)");
          t.obj.find(".pieLeftInner").css("-webkit-transform", "rotate(" + t.i * 3.6 + "deg)") };

        function start2() { t.obj.find('.pieInner span').html(50 + t.j + 1); if (num2 == 0) return false;
          t.j = t.j + 1; if (t.j == num2) { clearInterval(t.t2) } if (t.j == 50) { clearInterval(t.t2) };
          t.obj.find(".pieRightInner").css("-o-transform", "rotate(" + t.j * 3.6 + "deg)");
          t.obj.find(".pieRightInner").css("-moz-transform", "rotate(" + t.j * 3.6 + "deg)");
          t.obj.find(".pieRightInner").css("-webkit-transform", "rotate(" + t.j * 3.6 + "deg)") };
        t.t1 = setInterval(function() { r++;
          r >= s && (clearInterval(t.timer), start1()) }, 30) } } } })(jQuery);
;jQuery.fn.pagination = function (maxentries, opts) {
	opts = jQuery.extend({
		items_per_page: 10,
		num_display_entries: 10,
		current_page: 0,
		num_edge_entries: 0,
		link_to: "javascript:;",
		prev_text: "上一页",
		next_text: "下一页",
		ellipse_text: "...",
		prev_show_always: true,
		next_show_always: true,
		scrollTop: true,
		callback: function () {
			return false;
		}
	}, opts || {});

	return this.each(function () {
		/**
		 * 计算最大分页显示数目
		 */
		
		function numPages() {
			return Math.ceil(maxentries / opts.items_per_page);
		}
		/**
		 * 极端分页的起始和结束点，这取决于current_page 和 num_display_entries.
		 * @返回 {数组(Array)}
		 */
		function getInterval() {
			var ne_half = Math.ceil(opts.num_display_entries / 2);
			var np = numPages();
			var upper_limit = np - opts.num_display_entries;
			var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
			var end = current_page > ne_half ? Math.min(current_page + ne_half, np) : Math.min(opts.num_display_entries, np);
			return [start, end];
		}

		/**
		 * 分页链接事件处理函数
		 * @参数 {int} page_id 为新页码
		 */
		function pageSelected(page_id, evt) {
			current_page = page_id;
			drawLinks();
			var continuePropagation = opts.callback(page_id, panel);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				} else {
					evt.cancelBubble = true;
				}
			}

			if (opts.scrollTop) { // add by lanqy
				$('body,html').animate({
					scrollTop: 0
				}, 200);
			}

			return continuePropagation;
		}

		/**
		 * 此函数将分页链接插入到容器元素中
		 */
		function drawLinks() {
			panel.empty();
			var interval = getInterval();
			var np = numPages();
			// 这个辅助函数返回一个处理函数调用有着正确page_id的pageSelected。
			var getClickHandler = function (page_id) {
				return function (evt) {
					return pageSelected(page_id, evt);
				}
			}
			//辅助函数用来产生一个单链接(如果不是当前页则产生span标签)
			var appendItem = function (page_id, appendopts) {
				page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1); // 规范page id值
				appendopts = jQuery.extend({
					text: page_id + 1,
					classes: ""
				}, appendopts || {});
				if (page_id == current_page) {
					var lnk = jQuery("<span class='current' >" + (appendopts.text) + "</span>");
				} else {
					var lnk = jQuery("<a>" + (appendopts.text) + "</a>")
						.bind("click", getClickHandler(page_id))
						.attr('href', opts.link_to.replace(/__id__/, page_id + 1));
				}
				if (appendopts.classes) {
					lnk.addClass(appendopts.classes);
				}
				panel.append(lnk);
			}
			// 产生"Previous"-链接
			if (opts.prev_text && (current_page > 0 || opts.prev_show_always)) {
				appendItem(current_page - 1, {
					text: opts.prev_text,
					classes: "prev pull-left"
				});
			}
			// 产生起始点
			// if (interval[0] > 0 && opts.num_edge_entries > 0) {
			// 	var end = Math.min(opts.num_edge_entries, interval[0]);
			// 	for (var i = 0; i < end; i++) {
			// 		appendItem(i);
			// 	}
			// 	if (opts.num_edge_entries < interval[0] && opts.ellipse_text) {
			// 		jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
			// 	}
			// }
			// 产生内部的些链接
			// for (var i = interval[0]; i < interval[1]; i++) {
			// 	appendItem(i);
			// }
			// 产生结束点
			// if (interval[1] < np && opts.num_edge_entries > 0) {
			// 	if (np - opts.num_edge_entries > interval[1] && opts.ellipse_text) {
			// 		jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
			// 	}
			// 	var begin = Math.max(np - opts.num_edge_entries, interval[1]);
			// 	for (var i = begin; i < np; i++) {
			// 		appendItem(i);
			// 	}

			// }
			// 产生 "Next"-链接
			if (opts.next_text && (current_page < np - 1 || opts.next_show_always)) {
				appendItem(current_page + 1, {
					text: opts.next_text,
					classes: "next pull-right"
				});
			}

			// 产生中间显示条目
			if(np>1){
				var sum  = current_page -0;
				var dom = jQuery('<div class="centerbox"><input type="text"  readonly="readonly" class="current_page text-center" value="'+(sum+1)+'"> <p>/'+np+'</p></div>');
				panel.append(dom);
			}
			
		
		
		}

		//从选项中提取current_page
		var current_page = opts.current_page;
		//创建一个显示条数和每页显示条数值
		maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;
		//存储DOM元素，以方便从所有的内部结构中获取
		var panel = jQuery(this);
		// 获得附加功能的元素
		this.selectPage = function (page_id) {
			pageSelected(page_id);
		}
		this.prevPage = function () {
			if (current_page > 0) {
				pageSelected(current_page - 1);
				return true;
			} else {
				return false;
			}
		}
		this.nextPage = function () {
			if (current_page < numPages() - 1) {
				pageSelected(current_page + 1);
				return true;
			} else {
				return false;
			}
		}
		// 所有初始化完成，绘制链接
		drawLinks();
		// 回调函数
		// opts.callback(current_page, this);
	});
};/*!
 * Viewer v0.5.0
 * https://github.com/fengyuanchen/viewer
 *
 * Copyright (c) 2015-2016 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2016-01-21T09:59:52.834Z
 */
!function(i){"function"==typeof define&&define.amd?define("viewer",["jquery"],i):i("object"==typeof exports?require("jquery"):jQuery)}(function(i){"use strict";function t(i){return"string"==typeof i}function e(i){return"number"==typeof i&&!isNaN(i)}function s(i){return"undefined"==typeof i}function n(i,t){var s=[];return e(t)&&s.push(t),s.slice.apply(i,s)}function o(i,t){var e=n(arguments,2);return function(){return i.apply(t,e.concat(n(arguments)))}}function a(i){var t=[],s=i.rotate,n=i.scaleX,o=i.scaleY;return e(s)&&t.push("rotate("+s+"deg)"),e(n)&&e(o)&&t.push("scale("+n+","+o+")"),t.length?t.join(" "):"none"}function h(i){return i.offsetWidth}function r(i){return t(i)?i.replace(/^.*\//,"").replace(/[\?&#].*$/,""):""}function l(i,t){var e;return i.naturalWidth?t(i.naturalWidth,i.naturalHeight):(e=document.createElement("img"),e.onload=function(){t(this.width,this.height)},void(e.src=i.src))}function d(t){var e=t.length,s=0,n=0;return e&&(i.each(t,function(i,t){s+=t.pageX,n+=t.pageY}),s/=e,n/=e),{pageX:s,pageY:n}}function c(i){switch(i){case 2:return x;case 3:return $;case 4:return C}}function u(t,e){this.$element=i(t),this.options=i.extend({},u.DEFAULTS,i.isPlainObject(e)&&e),this.isImg=!1,this.isBuilt=!1,this.isShown=!1,this.isViewed=!1,this.isFulled=!1,this.isPlayed=!1,this.wheeling=!1,this.playing=!1,this.fading=!1,this.tooltiping=!1,this.transitioning=!1,this.action=!1,this.target=!1,this.timeout=!1,this.index=0,this.length=0,this.init()}var m=i(window),v=i(document),f="viewer",g=document.createElement(f),w="viewer-fixed",p="viewer-open",b="viewer-show",y="viewer-hide",x="viewer-hide-xs-down",$="viewer-hide-sm-down",C="viewer-hide-md-down",z="viewer-fade",F="viewer-in",Y="viewer-move",k="viewer-active",I="viewer-invisible",X="viewer-transition",P="viewer-fullscreen",T="viewer-fullscreen-exit",V="viewer-close",E="img",S="mousedown touchstart pointerdown MSPointerDown",D="mousemove touchmove pointermove MSPointerMove",L="mouseup touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel",q="wheel mousewheel DOMMouseScroll",R="transitionend",M="load."+f,W="keydown."+f,_="click."+f,j="resize."+f,A="build."+f,B="built."+f,H="show."+f,U="shown."+f,N="hide."+f,O="hidden."+f,Z="view."+f,K="viewed."+f,Q="undefined"!=typeof g.style.transition,G=Math.round,J=Math.sqrt,ii=Math.abs,ti=Math.min,ei=Math.max,si=Number;u.prototype={constructor:u,init:function(){var t=this.options,e=this.$element,s=e.is(E),n=s?e:e.find(E),o=n.length,a=i.proxy(this.ready,this);o&&(i.isFunction(t.build)&&e.one(A,t.build),this.trigger(A).isDefaultPrevented()||(Q||(t.transition=!1),this.isImg=s,this.length=o,this.count=0,this.$images=n,this.$body=i("body"),t.inline?(e.one(B,i.proxy(function(){this.view()},this)),n.each(function(){this.complete?a():i(this).one(M,a)})):e.on(_,i.proxy(this.start,this))))},ready:function(){this.count++,this.count===this.length&&this.build()},build:function(){var t,e,s,n,o,a,h=this.options,r=this.$element;this.isBuilt||(this.$parent=t=r.parent(),this.$viewer=e=i(u.TEMPLATE),this.$canvas=e.find(".viewer-canvas"),this.$footer=e.find(".viewer-footer"),this.$title=s=e.find(".viewer-title"),this.$toolbar=n=e.find(".viewer-toolbar"),this.$navbar=o=e.find(".viewer-navbar"),this.$button=a=e.find(".viewer-button"),this.$tooltip=e.find(".viewer-tooltip"),this.$player=e.find(".viewer-player"),this.$list=e.find(".viewer-list"),s.addClass(h.title?c(h.title):y),n.addClass(h.toolbar?c(h.toolbar):y),n.find("li[class*=zoom]").toggleClass(I,!h.zoomable),n.find("li[class*=flip]").toggleClass(I,!h.scalable),h.rotatable||n.find("li[class*=rotate]").addClass(I).appendTo(n),o.addClass(h.navbar?c(h.navbar):y),h.inline?(a.addClass(P),e.css("z-index",h.zIndexInline),"static"===t.css("position")&&t.css("position","relative")):(a.addClass(V),e.css("z-index",h.zIndex).addClass([w,z,y].join(" "))),r.after(e),h.inline&&(this.render(),this.bind(),this.isShown=!0),this.isBuilt=!0,i.isFunction(h.built)&&r.one(B,h.built),this.trigger(B))},unbuild:function(){var i=this.options,t=this.$element;this.isBuilt&&(i.inline&&t.removeClass(y),this.$viewer.remove())},bind:function(){var t=this.options,e=this.$element;i.isFunction(t.view)&&e.on(Z,t.view),i.isFunction(t.viewed)&&e.on(K,t.viewed),this.$viewer.on(_,i.proxy(this.click,this)).on(q,i.proxy(this.wheel,this)),this.$canvas.on(S,i.proxy(this.mousedown,this)),v.on(D,this._mousemove=o(this.mousemove,this)).on(L,this._mouseup=o(this.mouseup,this)).on(W,this._keydown=o(this.keydown,this)),m.on(j,this._resize=o(this.resize,this))},unbind:function(){var t=this.options,e=this.$element;i.isFunction(t.view)&&e.off(Z,t.view),i.isFunction(t.viewed)&&e.off(K,t.viewed),this.$viewer.off(_,this.click).off(q,this.wheel),this.$canvas.off(S,this.mousedown),v.off(D,this._mousemove).off(L,this._mouseup).off(W,this._keydown),m.off(j,this._resize)},render:function(){this.initContainer(),this.initViewer(),this.initList(),this.renderViewer()},initContainer:function(){this.container={width:m.innerWidth(),height:m.innerHeight()}},initViewer:function(){var t,e=this.options,s=this.$parent;e.inline&&(this.parent=t={width:ei(s.width(),e.minWidth),height:ei(s.height(),e.minHeight)}),(this.isFulled||!t)&&(t=this.container),this.viewer=i.extend({},t)},renderViewer:function(){this.options.inline&&!this.isFulled&&this.$viewer.css(this.viewer)},initList:function(){var e=this.options,s=this.$element,n=this.$list,o=[];this.$images.each(function(s){var n=this.src,a=this.alt||r(n),h=e.url;n&&(t(h)?h=this.getAttribute(h):i.isFunction(h)&&(h=h.call(this,this)),o.push('<li><img src="'+n+'" data-action="view" data-index="'+s+'" data-original-url="'+(h||n)+'" alt="'+a+'"></li>'))}),n.html(o.join("")).find(E).one(M,{filled:!0},i.proxy(this.loadImage,this)),this.$items=n.children(),e.transition&&s.one(K,function(){n.addClass(X)})},renderList:function(i){var t=i||this.index,e=this.$items.eq(t).width(),s=e+1;this.$list.css({width:s*this.length,marginLeft:(this.viewer.width-e)/2-s*t})},resetList:function(){this.$list.empty().removeClass(X).css("margin-left",0)},initImage:function(t){var e=this.options,s=this.$image,n=this.viewer,o=this.$footer.height(),a=n.width,h=ei(n.height-o,o),r=this.image||{};l(s[0],i.proxy(function(s,n){var o,l,d=s/n,c=a,u=h;h*d>a?u=a/d:c=h*d,c=ti(.9*c,s),u=ti(.9*u,n),l={naturalWidth:s,naturalHeight:n,aspectRatio:d,ratio:c/s,width:c,height:u,left:(a-c)/2,top:(h-u)/2},o=i.extend({},l),e.rotatable&&(l.rotate=r.rotate||0,o.rotate=0),e.scalable&&(l.scaleX=r.scaleX||1,l.scaleY=r.scaleY||1,o.scaleX=1,o.scaleY=1),this.image=l,this.initialImage=o,i.isFunction(t)&&t()},this))},renderImage:function(t){var e=this.image,s=this.$image;s.css({width:e.width,height:e.height,marginLeft:e.left,marginTop:e.top,transform:a(e)}),i.isFunction(t)&&(this.transitioning?s.one(R,t):t())},resetImage:function(){this.$image.remove(),this.$image=null},start:function(t){var e=t.target;i(e).is("img")&&(this.target=e,this.show())},click:function(t){var e=i(t.target),s=e.data("action"),n=this.image;switch(s){case"mix":this.isPlayed?this.stop():this.options.inline?this.isFulled?this.exit():this.full():this.hide();break;case"view":this.view(e.data("index"));break;case"zoom-in":this.zoom(.1,!0);break;case"zoom-out":this.zoom(-.1,!0);break;case"one-to-one":this.toggle();break;case"reset":this.reset();break;case"prev":this.prev();break;case"play":this.play();break;case"next":this.next();break;case"rotate-left":this.rotate(-90);break;case"rotate-right":this.rotate(90);break;case"flip-horizontal":this.scaleX(-n.scaleX||-1);break;case"flip-vertical":this.scaleY(-n.scaleY||-1);break;default:this.isPlayed&&this.stop()}},load:function(){var t=this.options,e=this.viewer,s=this.$image;this.timeout&&(clearTimeout(this.timeout),this.timeout=!1),s.removeClass(I).css("cssText","width:0;height:0;margin-left:"+e.width/2+"px;margin-top:"+e.height/2+"px;max-width:none!important;visibility:visible;"),this.initImage(i.proxy(function(){s.toggleClass(X,t.transition).toggleClass(Y,t.movable),this.renderImage(i.proxy(function(){this.isViewed=!0,this.trigger(K)},this))},this))},loadImage:function(t){var e=t.target,s=i(e),n=s.parent(),o=n.width(),a=n.height(),h=t.data&&t.data.filled;l(e,function(i,t){var e=i/t,n=o,r=a;a*e>o?h?n=a*e:r=o/e:h?r=o/e:n=a*e,s.css({width:n,height:r,marginLeft:(o-n)/2,marginTop:(a-r)/2})})},resize:function(){this.initContainer(),this.initViewer(),this.renderViewer(),this.renderList(),this.initImage(i.proxy(function(){this.renderImage()},this)),this.isPlayed&&this.$player.find(E).one(M,i.proxy(this.loadImage,this)).trigger(M)},wheel:function(t){var e=t.originalEvent||t,s=si(this.options.zoomRatio)||.1,n=1;this.isViewed&&(t.preventDefault(),this.wheeling||(this.wheeling=!0,setTimeout(i.proxy(function(){this.wheeling=!1},this),50),e.deltaY?n=e.deltaY>0?1:-1:e.wheelDelta?n=-e.wheelDelta/120:e.detail&&(n=e.detail>0?1:-1),this.zoom(-n*s,!0,t)))},keydown:function(i){var t=this.options,e=i.which;if(this.isFulled&&t.keyboard)switch(e){case 27:this.isPlayed?this.stop():t.inline?this.isFulled&&this.exit():this.hide();break;case 32:this.isPlayed&&this.stop();break;case 37:this.prev();break;case 38:i.preventDefault(),this.zoom(t.zoomRatio,!0);break;case 39:this.next();break;case 40:i.preventDefault(),this.zoom(-t.zoomRatio,!0);break;case 48:case 49:(i.ctrlKey||i.shiftKey)&&(i.preventDefault(),this.toggle())}},mousedown:function(i){var t,e=this.options,s=i.originalEvent,n=s&&s.touches,o=i,a=e.movable?"move":!1;if(this.isViewed){if(n){if(t=n.length,t>1){if(!e.zoomable||2!==t)return;o=n[1],this.startX2=o.pageX,this.startY2=o.pageY,a="zoom"}else this.isSwitchable()&&(a="switch");o=n[0]}a&&(i.preventDefault(),this.action=a,this.startX=o.pageX||s&&s.pageX,this.startY=o.pageY||s&&s.pageY)}},mousemove:function(i){var t,e=this.options,s=this.action,n=this.$image,o=i.originalEvent,a=o&&o.touches,h=i;if(this.isViewed){if(a){if(t=a.length,t>1){if(!e.zoomable||2!==t)return;h=a[1],this.endX2=h.pageX,this.endY2=h.pageY}h=a[0]}s&&(i.preventDefault(),"move"===s&&e.transition&&n.hasClass(X)&&n.removeClass(X),this.endX=h.pageX||o&&o.pageX,this.endY=h.pageY||o&&o.pageY,this.change(i))}},mouseup:function(i){var t=this.action;t&&(i.preventDefault(),"move"===t&&this.options.transition&&this.$image.addClass(X),this.action=!1)},show:function(){var t,e=this.options;e.inline||this.transitioning||(this.isBuilt||this.build(),i.isFunction(e.show)&&this.$element.one(H,e.show),this.trigger(H).isDefaultPrevented()||(this.$body.addClass(p),t=this.$viewer.removeClass(y),this.$element.one(U,i.proxy(function(){this.view(this.target?this.$images.index(this.target):this.index),this.target=!1},this)),e.transition?(this.transitioning=!0,t.addClass(X),h(t[0]),t.one(R,i.proxy(this.shown,this)).addClass(F)):(t.addClass(F),this.shown())))},hide:function(){var t=this.options,e=this.$viewer;t.inline||this.transitioning||!this.isShown||(i.isFunction(t.hide)&&this.$element.one(N,t.hide),this.trigger(N).isDefaultPrevented()||(this.isViewed&&t.transition?(this.transitioning=!0,this.$image.one(R,i.proxy(function(){e.one(R,i.proxy(this.hidden,this)).removeClass(F)},this)),this.zoomTo(0,!1,!1,!0)):(e.removeClass(F),this.hidden())))},view:function(t){var e,s,n,o,a,h=this.$title;t=Number(t)||0,!this.isShown||this.isPlayed||0>t||t>=this.length||this.isViewed&&t===this.index||this.trigger(Z).isDefaultPrevented()||(s=this.$items.eq(t),n=s.find(E),o=n.data("originalUrl"),a=n.attr("alt"),this.$image=e=i('<img src="'+o+'" alt="'+a+'">'),this.isViewed&&this.$items.eq(this.index).removeClass(k),s.addClass(k),this.isViewed=!1,this.index=t,this.image=null,this.$canvas.html(e.addClass(I)),this.renderList(),h.empty(),this.$element.one(K,i.proxy(function(){var i=this.image,t=i.naturalWidth,e=i.naturalHeight;h.html(a+" ("+t+" &times; "+e+")")},this)),e[0].complete?this.load():(e.one(M,i.proxy(this.load,this)),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(i.proxy(function(){e.removeClass(I),this.timeout=!1},this),1e3)))},prev:function(){this.view(ei(this.index-1,0))},next:function(){this.view(ti(this.index+1,this.length-1))},move:function(i,t){var e=this.image;this.moveTo(s(i)?i:e.left+si(i),s(t)?t:e.top+si(t))},moveTo:function(i,t){var n=this.image,o=!1;s(t)&&(t=i),i=si(i),t=si(t),this.isViewed&&!this.isPlayed&&this.options.movable&&(e(i)&&(n.left=i,o=!0),e(t)&&(n.top=t,o=!0),o&&this.renderImage())},zoom:function(i,t,e){var s=this.image;i=si(i),i=0>i?1/(1-i):1+i,this.zoomTo(s.width*i/s.naturalWidth,t,e)},zoomTo:function(i,t,s,n){var o,a,h,r,l,c=this.options,u=.01,m=100,v=this.image,f=v.width,g=v.height;i=ei(0,i),e(i)&&this.isViewed&&!this.isPlayed&&(n||c.zoomable)&&(n||(u=ei(u,c.minZoomRatio),m=ti(m,c.maxZoomRatio),i=ti(ei(i,u),m)),i>.95&&1.05>i&&(i=1),a=v.naturalWidth*i,h=v.naturalHeight*i,s&&(o=s.originalEvent)?(r=this.$viewer.offset(),l=o.touches?d(o.touches):{pageX:s.pageX||o.pageX||0,pageY:s.pageY||o.pageY||0},v.left-=(a-f)*((l.pageX-r.left-v.left)/f),v.top-=(h-g)*((l.pageY-r.top-v.top)/g)):(v.left-=(a-f)/2,v.top-=(h-g)/2),v.width=a,v.height=h,v.ratio=i,this.renderImage(),t&&this.tooltip())},rotate:function(i){this.rotateTo((this.image.rotate||0)+si(i))},rotateTo:function(i){var t=this.image;i=si(i),e(i)&&this.isViewed&&!this.isPlayed&&this.options.rotatable&&(t.rotate=i,this.renderImage())},scale:function(i,t){var n=this.image,o=!1;s(t)&&(t=i),i=si(i),t=si(t),this.isViewed&&!this.isPlayed&&this.options.scalable&&(e(i)&&(n.scaleX=i,o=!0),e(t)&&(n.scaleY=t,o=!0),o&&this.renderImage())},scaleX:function(i){this.scale(i,this.image.scaleY)},scaleY:function(i){this.scale(this.image.scaleX,i)},play:function(){var t,s=this.options,n=this.$player,o=i.proxy(this.loadImage,this),a=[],h=0,r=0;this.isShown&&!this.isPlayed&&(s.fullscreen&&this.requestFullscreen(),this.isPlayed=!0,n.addClass(b),this.$items.each(function(t){var e=i(this),l=e.find(E),d=i('<img src="'+l.data("originalUrl")+'" alt="'+l.attr("alt")+'">');h++,d.addClass(z).toggleClass(X,s.transition),e.hasClass(k)&&(d.addClass(F),r=t),a.push(d),d.one(M,{filled:!1},o),n.append(d)}),e(s.interval)&&s.interval>0&&(t=i.proxy(function(){this.playing=setTimeout(function(){a[r].removeClass(F),r++,r=h>r?r:0,a[r].addClass(F),t()},s.interval)},this),h>1&&t()))},stop:function(){this.isPlayed&&(this.options.fullscreen&&this.exitFullscreen(),this.isPlayed=!1,clearTimeout(this.playing),this.$player.removeClass(b).empty())},full:function(){var t=this.options,e=this.$image,s=this.$list;this.isShown&&!this.isPlayed&&!this.isFulled&&t.inline&&(this.isFulled=!0,this.$body.addClass(p),this.$button.addClass(T),t.transition&&(e.removeClass(X),s.removeClass(X)),this.$viewer.addClass(w).removeAttr("style").css("z-index",t.zIndex),this.initContainer(),this.viewer=i.extend({},this.container),this.renderList(),this.initImage(i.proxy(function(){this.renderImage(function(){t.transition&&setTimeout(function(){e.addClass(X),s.addClass(X)},0)})},this)))},exit:function(){var t=this.options,e=this.$image,s=this.$list;this.isFulled&&(this.isFulled=!1,this.$body.removeClass(p),this.$button.removeClass(T),t.transition&&(e.removeClass(X),s.removeClass(X)),this.$viewer.removeClass(w).css("z-index",t.zIndexInline),this.viewer=i.extend({},this.parent),this.renderViewer(),this.renderList(),this.initImage(i.proxy(function(){this.renderImage(function(){t.transition&&setTimeout(function(){e.addClass(X),s.addClass(X)},0)})},this)))},tooltip:function(){var t=this.options,e=this.$tooltip,s=this.image,n=[b,z,X].join(" ");this.isViewed&&!this.isPlayed&&t.tooltip&&(e.text(G(100*s.ratio)+"%"),this.tooltiping?clearTimeout(this.tooltiping):t.transition?(this.fading&&e.trigger(R),e.addClass(n),h(e[0]),e.addClass(F)):e.addClass(b),this.tooltiping=setTimeout(i.proxy(function(){t.transition?(e.one(R,i.proxy(function(){e.removeClass(n),this.fading=!1},this)).removeClass(F),this.fading=!0):e.removeClass(b),this.tooltiping=!1},this),1e3))},toggle:function(){1===this.image.ratio?this.zoomTo(this.initialImage.ratio,!0):this.zoomTo(1,!0)},reset:function(){this.isViewed&&!this.isPlayed&&(this.image=i.extend({},this.initialImage),this.renderImage())},update:function(){var t,e=this.$element,s=this.$images,n=[];if(this.isImg){if(!e.parent().length)return this.destroy()}else this.$images=s=e.find(E),this.length=s.length;this.isBuilt&&(i.each(this.$items,function(t){var e=i(this).find("img")[0],o=s[t];o?o.src!==e.src&&n.push(t):n.push(t)}),this.$list.width("auto"),this.initList(),this.isShown&&(this.length?this.isViewed&&(t=i.inArray(this.index,n),t>=0?(this.isViewed=!1,this.view(ei(this.index-(t+1),0))):this.$items.eq(this.index).addClass(k)):(this.$image=null,this.isViewed=!1,this.index=0,this.image=null,this.$canvas.empty(),this.$title.empty())))},destroy:function(){var i=this.$element;this.options.inline?this.unbind():(this.isShown&&this.unbind(),i.off(_,this.start)),this.unbuild(),i.removeData(f)},trigger:function(t,e){var s=i.Event(t,e);return this.$element.trigger(s),s},shown:function(){var t=this.options;this.transitioning=!1,this.isFulled=!0,this.isShown=!0,this.isVisible=!0,this.render(),this.bind(),i.isFunction(t.shown)&&this.$element.one(U,t.shown),this.trigger(U)},hidden:function(){var t=this.options;this.transitioning=!1,this.isViewed=!1,this.isFulled=!1,this.isShown=!1,this.isVisible=!1,this.unbind(),this.$body.removeClass(p),this.$viewer.addClass(y),this.resetList(),this.resetImage(),i.isFunction(t.hidden)&&this.$element.one(O,t.hidden),this.trigger(O)},requestFullscreen:function(){var i=document.documentElement;!this.isFulled||document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement||(i.requestFullscreen?i.requestFullscreen():i.msRequestFullscreen?i.msRequestFullscreen():i.mozRequestFullScreen?i.mozRequestFullScreen():i.webkitRequestFullscreen&&i.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT))},exitFullscreen:function(){this.isFulled&&(document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen())},change:function(i){var t=this.endX-this.startX,e=this.endY-this.startY;switch(this.action){case"move":this.move(t,e);break;case"zoom":this.zoom(function(i,t,e,s){var n=J(i*i+t*t),o=J(e*e+s*s);return(o-n)/n}(ii(this.startX-this.startX2),ii(this.startY-this.startY2),ii(this.endX-this.endX2),ii(this.endY-this.endY2)),!1,i),this.startX2=this.endX2,this.startY2=this.endY2;break;case"switch":this.action="switched",ii(t)>ii(e)&&(t>1?this.prev():-1>t&&this.next())}this.startX=this.endX,this.startY=this.endY},isSwitchable:function(){var i=this.image,t=this.viewer;return i.left>=0&&i.top>=0&&i.width<=t.width&&i.height<=t.height}},u.DEFAULTS={inline:!1,button:!0,navbar:!0,title:!0,toolbar:!0,tooltip:!0,movable:!0,zoomable:!0,rotatable:!0,scalable:!0,transition:!0,fullscreen:!0,keyboard:!0,interval:5e3,minWidth:200,minHeight:100,zoomRatio:.1,minZoomRatio:.01,maxZoomRatio:100,zIndex:2015,zIndexInline:0,url:"src",build:null,built:null,show:null,shown:null,hide:null,hidden:null,view:null,viewed:null},u.TEMPLATE='<div class="viewer-container"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><ul class="viewer-toolbar"><li class="viewer-zoom-in" data-action="zoom-in"></li><li class="viewer-zoom-out" data-action="zoom-out"></li><li class="viewer-one-to-one" data-action="one-to-one"></li><li class="viewer-reset" data-action="reset"></li><li class="viewer-prev" data-action="prev"></li><li class="viewer-play" data-action="play"></li><li class="viewer-next" data-action="next"></li><li class="viewer-rotate-left" data-action="rotate-left"></li><li class="viewer-rotate-right" data-action="rotate-right"></li><li class="viewer-flip-horizontal" data-action="flip-horizontal"></li><li class="viewer-flip-vertical" data-action="flip-vertical"></li></ul><div class="viewer-navbar"><ul class="viewer-list"></ul></div></div><div class="viewer-tooltip"></div><div class="viewer-button" data-action="mix"></div><div class="viewer-player"></div></div>',u.other=i.fn.viewer,i.fn.viewer=function(e){var o,a=n(arguments,1);return this.each(function(){var s,n=i(this),h=n.data(f);if(!h){if(/destroy|hide|exit|stop|reset/.test(e))return;n.data(f,h=new u(this,e))}t(e)&&i.isFunction(s=h[e])&&(o=s.apply(h,a))}),s(o)?this:o},i.fn.viewer.Constructor=u,i.fn.viewer.setDefaults=u.setDefaults,i.fn.viewer.noConflict=function(){return i.fn.viewer=u.other,this}});;! function (e) {
    function t(e) {
        if ("string" == typeof e) {
            var t = e.indexOf("_"); - 1 != t && (e = e.substr(t + 1))
        }
        return e
    }

    function i(i, o) {
        i.preventDefault(), void 0 === o && (o = e(this));
        var r = t(o.attr("data-id")),
            s = n[r];
        s.next.off(), s.prev.off(), s.viewport.off("touchend"), "yes" === s.options.autoscroll && e.fn.als("stop", r), e.fn.als("next", r), "yes" === s.options.autoscroll && e.fn.als("start", r)
    }

    function o(i, o) {
        i.preventDefault(), void 0 === o && (o = e(this));
        var r = t(o.attr("data-id")),
            s = n[r];
        s.prev.off(), s.next.off(), s.viewport.off("touchend"), "yes" === s.options.autoscroll && e.fn.als("stop", r), e.fn.als("prev", r), "yes" === s.options.autoscroll && e.fn.als("start", r)
    }
    var n = [],
        s = 0,
        a = {
            init: function (t) {
                this.each(function () {
                    var a = {
                            visible_items: 3,
                            scrolling_items: 1,
                            orientation: "horizontal",
                            circular: "no",
                            autoscroll: "no",
                            interval: 4e3,
                            speed: 600,
                            easing: "swing",
                            direction: "left",
                            start_from: 0
                        },
                        l = e(this),
                        c = l.data("als"),
                        m = e(),
                        d = e(),
                        u = e(),
                        p = e(),
                        h = e(),
                        v = e(),
                        f = 0,
                        w = 0,
                        T = 0,
                        g = 0,
                        _ = 0,
                        y = 0,
                        x = 0,
                        k = 0,
                        b = 0,
                        E = 0,
                        q = 0,
                        H = 0,
                        W = {};
                    switch (W.swipeTreshold = 100, W.allowedTime = 300, m = e.extend(a, t), "no" == m.circular && "yes" == m.autoscroll && (m.circular = "yes"), ("linear" != m.easing || "swing" != m.easing) && (m.easing = "swing"), l.attr("id") && "" != l.attr("id") || l.attr("id", "als-container_" + s), l.attr("data-id", "als-container_" + s), p = l.find(".als-viewport").attr("data-id", "als-viewport_" + s), u = l.find(".als-wrapper").attr("data-id", "als-wrapper_" + s), d = l.find(".als-item"), f = d.size(), m.visible_items > f && (m.visible_items = f - 1), m.scrolling_items > m.visible_items && (m.visible_items > 1 ? m.scrolling_items = m.visible_items - 1 : 1 === m.visible_items && (m.scrolling_items = m.visible_items)), m.start_from > f - m.visible_items && (m.start_from = 0), h = l.find(".als-prev").attr("data-id", "als-prev_" + s), v = l.find(".als-next").attr("data-id", "als-next_" + s), m.orientation) {
                        case "horizontal":
                        default:
                            if (d.each(function (t) {
                                    e(this).attr("id", "als-item_" + s + "_" + t), T += e(this).outerWidth(!0), e(this).outerHeight(!0) > x && (x = e(this).outerHeight(!0)), b < m.visible_items && (0 == m.start_from ? (w += e(this).outerWidth(!0), b++) : t >= m.start_from && (w += e(this).outerWidth(!0), b++)), 0 != m.start_from && (E < m.start_from && (y += e(this).outerWidth(!0), E++), q = m.start_from)
                                }), u.css("width", T), d.css("left", -y), p.css("width", w), u.css("height", x), p.css("height", x), "yes" == m.circular && 0 != m.start_from)
                                for (r = 0; r < m.start_from; r++) {
                                    var z = d.last().position(),
                                        D = z.left + d.last().outerWidth(!0);
                                    d.eq(r).css("left", D)
                                }
                            break;
                        case "vertical":
                            if (d.each(function (t) {
                                    e(this).attr("id", "als-item_" + s + "_" + t), _ += e(this).outerHeight(!0), e(this).outerWidth(!0) > k && (k = e(this).outerWidth(!0)), b < m.visible_items && (0 == m.start_from ? (g += e(this).outerHeight(!0), b++) : t >= m.start_from && (g += e(this).outerHeight(!0), b++)), 0 != m.start_from && (E < m.start_from && (y += e(this).outerHeight(!0), E++), q = m.start_from)
                                }), u.css("height", _), d.css("top", -y), p.css("height", g), u.css("width", k), p.css("width", k), "yes" == m.circular && 0 != m.start_from)
                                for (r = 0; r < m.start_from; r++) {
                                    var z = d.last().position(),
                                        X = z.top + d.last().outerHeight(!0);
                                    d.eq(r).css("top", X)
                                }
                    }
                    return "no" == m.circular && (0 == m.start_from && h.css("display", "none"), m.visible_items + m.start_from == f && v.css("display", "none")), v.on("click touchstart touchend", i), h.on("click touchstart touchend", o), p.on("touchstart", function (e) {
                        if (void 0 == e.originalEvent.touches) var t = e;
                        else var t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                        W.ox = t.pageX, W.oy = t.pageY, W.startTime = (new Date).getTime()
                    }), p.on("touchmove", function () {}), p.on("touchend", function (e) {
                        if (void 0 == e.originalEvent.touches) var t = e;
                        else var t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                        W.dx = t.pageX - W.ox, W.dy = t.pageY - W.oy, W.endTime = (new Date).getTime() - W.startTime, "horizontal" == m.orientation ? W.dx < -W.swipeTreshold && W.endTime < W.allowedTime ? ("yes" == m.circular || m.visible_items + m.start_from < f) && i(e, p) : W.dx > W.swipeTreshold && W.endTime < W.allowedTime && ("yes" == m.circular || m.start_from > 0) && o(e, p) : W.dy < -W.swipeTreshold && W.endTime < W.allowedTime ? ("yes" == m.circular || m.visible_items + m.start_from < f) && i(e, p) : W.dy > W.swipeTreshold && W.endTime < W.allowedTime && ("yes" == m.circular || m.start_from > 0) && o(e, p)
                    }), l.data("als", {
                        container: l,
                        instance: s,
                        options: m,
                        viewport: p,
                        wrapper: u,
                        prev: h,
                        next: v,
                        item: d,
                        num_items: f,
                        wrapper_width: T,
                        viewport_width: w,
                        wrapper_height: _,
                        viewport_height: g,
                        current: q,
                        timer: H,
                        mm: W
                    }), c = l.data("als"), n[s] = c, "yes" == m.autoscroll ? (e.fn.als("start", s), u.hover(function () {
                        e.fn.als("stop", e(this).attr("data-id"))
                    }, function () {
                        e.fn.als("start", e(this).attr("data-id"))
                    })) : "no" == m.autoscroll && e.fn.als("stop", s), s++, n
                })
            },
            next: function (e) {
                e = t(e);
                var r = n[e],
                    s = r.mm,
                    a = 0,
                    l = 0;
                switch (r.options.orientation) {
                    case "horizontal":
                    default:
                        var c = 0,
                            m = 0;
                        switch (r.options.circular) {
                            case "no":
                            default:
                                for (a = r.current; a < r.current + r.options.scrolling_items; a++) c += r.item.eq(a).outerWidth(!0);
                                for (r.current += r.options.scrolling_items, l = r.current; l < r.current + r.options.visible_items; l++) m += r.item.eq(l).outerWidth(!0);
                                r.viewport.animate({
                                    width: m
                                }, r.options.speed, r.options.easing), r.item.animate({
                                    left: "-=" + c
                                }, r.options.speed, r.options.easing), r.item.promise().done(function () {
                                    r.next.on("click touchstart touchend", i), r.prev.on("click touchstart touchend", o), r.viewport.on("touchend", function (e) {
                                        if (void 0 == e.originalEvent.touches) var t = e;
                                        else var t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                                        s.dx = t.pageX - s.ox, s.dy = t.pageY - s.oy, s.endTime = (new Date).getTime() - s.startTime, "horizontal" == r.options.orientation ? s.dx < -s.swipeTreshold && s.endTime < s.allowedTime ? r.current + r.options.visible_items < r.num_items && i(e, r.viewport) : s.dx > s.swipeTreshold && s.endTime < s.allowedTime && r.current > 0 && o(e, r.viewport) : s.dy < -s.swipeTreshold && s.endTime < s.allowedTime ? r.current + r.options.visible_items < r.num_items && i(e, r.viewport) : s.dy > s.swipeTreshold && s.endTime < s.allowedTime && r.current > 0 && o(e, r.viewport)
                                    })
                                }), r.current > 0 && r.prev.show(), r.current + r.options.visible_items >= r.num_items && r.next.hide();
                                break;
                            case "yes":
                                var d = 0,
                                    u = [];
                                for (a = r.current; a < r.current + r.options.scrolling_items; a++) {
                                    var p = a;
                                    a >= r.num_items && (p = a - r.num_items), c += r.item.eq(p).outerWidth(!0), u[d] = p, d++
                                }
                                for (r.current += r.options.scrolling_items, r.current >= r.num_items && (r.current -= r.num_items), l = r.current; l < r.current + r.options.visible_items; l++) {
                                    var h = l;
                                    l >= r.num_items && (h = l - r.num_items), m += r.item.eq(h).outerWidth(!0)
                                }
                                r.viewport.animate({
                                    width: m
                                }, r.options.speed, r.options.easing), r.item.animate({
                                    left: "-=" + c
                                }, r.options.speed, r.options.easing), r.item.promise().done(function () {
                                    var e = r.item.last().position(),
                                        t = e.left + r.item.last().outerWidth(!0);
                                    for (k5 = 0; k5 < u.length; k5++) {
                                        if (0 == u[k5]) var e = r.item.last().position(),
                                            t = e.left + r.item.last().outerWidth(!0);
                                        r.item.eq(u[k5]).css("left", t)
                                    }
                                    r.next.on("click touchstart touchend", i), r.prev.on("click touchstart touchend", o), r.viewport.on("touchend", function (e) {
                                        if (void 0 == e.originalEvent.touches) var t = e;
                                        else var t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                                        s.dx = t.pageX - s.ox, s.dy = t.pageY - s.oy, s.endTime = (new Date).getTime() - s.startTime, "horizontal" == r.options.orientation ? s.dx < -s.swipeTreshold && s.endTime < s.allowedTime ? i(e, r.viewport) : s.dx > s.swipeTreshold && s.endTime < s.allowedTime && o(e, r.viewport) : s.dy < -s.swipeTreshold && s.endTime < s.allowedTime ? i(e, r.viewport) : s.dy > s.swipeTreshold && s.endTime < s.allowedTime && o(e, r.viewport)
                                    })
                                })
                        }
                        break;
                    case "vertical":
                        var v = 0,
                            f = 0;
                        switch (r.options.circular) {
                            case "no":
                            default:
                                for (a = r.current; a < r.current + r.options.scrolling_items; a++) v += r.item.eq(a).outerHeight(!0);
                                for (r.current += r.options.scrolling_items, l = r.current; l < r.current + r.options.visible_items; l++) f += r.item.eq(l).outerHeight(!0);
                                r.viewport.animate({
                                    height: f
                                }, r.options.speed, r.options.easing), r.item.animate({
                                    top: "-=" + v
                                }, r.options.speed, r.options.easing), r.item.promise().done(function () {
                                    r.next.on("click touchstart touchend", i), r.prev.on("click touchstart touchend", o), r.viewport.on("touchend", function (e) {
                                        if (void 0 == e.originalEvent.touches) var t = e;
                                        else var t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                                        s.dx = t.pageX - s.ox, s.dy = t.pageY - s.oy, s.endTime = (new Date).getTime() - s.startTime, "horizontal" == r.options.orientation ? s.dx < -s.swipeTreshold && s.endTime < s.allowedTime ? r.current + r.options.visible_items < r.num_items && i(e, r.viewport) : s.dx > s.swipeTreshold && s.endTime < s.allowedTime && r.current > 0 && o(e, r.viewport) : s.dy < -s.swipeTreshold && s.endTime < s.allowedTime ? r.current + r.options.visible_items < r.num_items && i(e, r.viewport) : s.dy > s.swipeTreshold && s.endTime < s.allowedTime && r.current > 0 && o(e, r.viewport)
                                    })
                                }), r.current > 0 && r.prev.show(), r.current + r.options.visible_items >= r.num_items && r.next.hide();
                                break;
                            case "yes":
                                var d = 0,
                                    u = [];
                                for (a = r.current; a < r.current + r.options.scrolling_items; a++) {
                                    var p = a;
                                    a >= r.num_items && (p = a - r.num_items), v += r.item.eq(p).outerHeight(!0), u[d] = p, d++
                                }
                                for (r.current += r.options.scrolling_items, r.current >= r.num_items && (r.current -= r.num_items), l = r.current; l < r.current + r.options.visible_items; l++) {
                                    var h = l;
                                    l >= r.num_items && (h = l - r.num_items), f += r.item.eq(h).outerHeight(!0)
                                }
                                r.viewport.animate({
                                    height: f
                                }), r.item.animate({
                                    top: "-=" + v
                                }), r.item.promise().done(function () {
                                    var e = r.item.last().position(),
                                        t = e.top + r.item.last().outerHeight(!0);
                                    for (k5 = 0; k5 < u.length; k5++) {
                                        if (0 == u[k5]) var e = r.item.last().position(),
                                            t = e.top + r.item.last().outerHeight(!0);
                                        r.item.eq(u[k5]).css("top", t)
                                    }
                                    r.next.on("click touchstart touchend", i), r.prev.on("click touchstart touchend", o), r.viewport.on("touchend", function (e) {
                                        if (void 0 == e.originalEvent.touches) var t = e;
                                        else var t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                                        s.dx = t.pageX - s.ox, s.dy = t.pageY - s.oy, s.endTime = (new Date).getTime() - s.startTime, "horizontal" == r.options.orientation ? s.dx < -s.swipeTreshold && s.endTime < s.allowedTime ? i(e, r.viewport) : s.dx > s.swipeTreshold && s.endTime < s.allowedTime && o(e, r.viewport) : s.dy < -s.swipeTreshold && s.endTime < s.allowedTime ? i(e, r.viewport) : s.dy > s.swipeTreshold && s.endTime < s.allowedTime && o(e, r.viewport)
                                    })
                                })
                        }
                }
                return n[e] = r, n
            },
            prev: function (e) {
                e = t(e);
                var r = n[e],
                    s = r.mm,
                    a = 0,
                    l = 0;
                switch (r.options.orientation) {
                    case "horizontal":
                    default:
                        var c = 0,
                            m = 0;
                        switch (r.options.circular) {
                            case "no":
                            default:
                                for (r.current -= r.options.scrolling_items, a = r.current; a < r.current + r.options.scrolling_items; a++) c += r.item.eq(a).outerWidth(!0);
                                for (l = r.current; l < r.current + r.options.visible_items; l++) m += r.item.eq(l).outerWidth(!0);
                                r.viewport.animate({
                                    width: m
                                }), r.item.animate({
                                    left: "+=" + c
                                }, r.options.speed, r.options.easing), r.item.promise().done(function () {
                                    r.next.on("click touchstart touchend", i), r.prev.on("click touchstart touchend", o), r.viewport.on("touchend", function (e) {
                                        if (void 0 == e.originalEvent.touches) var t = e;
                                        else var t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                                        s.dx = t.pageX - s.ox, s.dy = t.pageY - s.oy, s.endTime = (new Date).getTime() - s.startTime, "horizontal" == r.options.orientation ? s.dx < -s.swipeTreshold && s.endTime < s.allowedTime ? r.current + r.options.visible_items < r.num_items && i(e, r.viewport) : s.dx > s.swipeTreshold && s.endTime < s.allowedTime && r.current > 0 && o(e, r.viewport) : s.dy < -s.swipeTreshold && s.endTime < s.allowedTime ? r.current + r.options.visible_items < r.num_items && i(e, r.viewport) : s.dy > s.swipeTreshold && s.endTime < s.allowedTime && r.current > 0 && o(e, r.viewport)
                                    })
                                }), r.current <= 0 && r.prev.hide(), r.current + r.options.visible_items < r.num_items && r.next.show();
                                break;
                            case "yes":
                                var d = 0,
                                    u = [];
                                for (r.current -= r.options.scrolling_items, r.current < 0 && (r.current += r.num_items), a = r.current; a < r.current + r.options.scrolling_items; a++) {
                                    var p = a;
                                    a >= r.num_items && (p = a - r.num_items), c += r.item.eq(p).outerWidth(!0), u[d] = p, d++
                                }
                                for (l = r.current; l < r.current + r.options.visible_items; l++) {
                                    var h = l;
                                    l >= r.num_items && (h = l - r.num_items), m += r.item.eq(h).outerWidth(!0)
                                }
                                var v = r.item.first().position(),
                                    f = v.left - r.wrapper_width;
                                for (k5 = 0; k5 < u.length; k5++)
                                    if (r.item.eq(u[k5]).css("left", f), 0 == u[k5]) {
                                        var w = r.item.eq(0).position(),
                                            T = w.left - r.wrapper_width;
                                        for (k6 = 0; k5 > k6; k6++) r.item.eq(u[k6]).css("left", T)
                                    }
                                setTimeout(function () {
                                    r.viewport.animate({
                                        width: m
                                    }), r.item.animate({
                                        left: "+=" + c
                                    }, r.options.speed, r.options.easing), r.item.promise().done(function () {
                                        r.next.on("click touchstart touchend", i), r.prev.on("click touchstart touchend", o), r.viewport.on("touchend", function (e) {
                                            if (void 0 == e.originalEvent.touches) var t = e;
                                            else var t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                                            s.dx = t.pageX - s.ox, s.dy = t.pageY - s.oy, s.endTime = (new Date).getTime() - s.startTime, "horizontal" == r.options.orientation ? s.dx < -s.swipeTreshold && s.endTime < s.allowedTime ? i(e, r.viewport) : s.dx > s.swipeTreshold && s.endTime < s.allowedTime && o(e, r.viewport) : s.dy < -s.swipeTreshold && s.endTime < s.allowedTime ? i(e, r.viewport) : s.dy > s.swipeTreshold && s.endTime < s.allowedTime && o(e, r.viewport)
                                        })
                                    })
                                }, 200)
                        }
                        break;
                    case "vertical":
                        var g = 0,
                            _ = 0;
                        switch (r.options.circular) {
                            case "no":
                            default:
                                for (r.current -= r.options.scrolling_items, a = r.current; a < r.current + r.options.scrolling_items; a++) g += r.item.eq(a).outerHeight(!0);
                                for (l = r.current; l < r.current + r.options.visible_items; l++) _ += r.item.eq(l).outerHeight(!0);
                                r.viewport.animate({
                                    height: _
                                }), r.item.animate({
                                    top: "+=" + g
                                }, r.options.speed, r.options.easing), r.item.promise().done(function () {
                                    r.next.on("click touchstart touchend", i), r.prev.on("click touchstart touchend", o), r.viewport.on("touchend", function (e) {
                                        if (void 0 == e.originalEvent.touches) var t = e;
                                        else var t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                                        s.dx = t.pageX - s.ox, s.dy = t.pageY - s.oy, s.endTime = (new Date).getTime() - s.startTime, "horizontal" == r.options.orientation ? s.dx < -s.swipeTreshold && s.endTime < s.allowedTime ? r.current + r.options.visible_items < r.num_items && i(e, r.viewport) : s.dx > s.swipeTreshold && s.endTime < s.allowedTime && r.current > 0 && o(e, r.viewport) : s.dy < -s.swipeTreshold && s.endTime < s.allowedTime ? r.current + r.options.visible_items < r.num_items && i(e, r.viewport) : s.dy > s.swipeTreshold && s.endTime < s.allowedTime && r.current > 0 && o(e, r.viewport)
                                    })
                                }), r.current <= 0 && r.prev.hide(), r.current + r.options.visible_items < r.num_items && r.next.show();
                                break;
                            case "yes":
                                var d = 0,
                                    u = [];
                                for (r.current -= r.options.scrolling_items, r.current < 0 && (r.current += r.num_items), a = r.current; a < r.current + r.options.scrolling_items; a++) {
                                    var p = a;
                                    a >= r.num_items && (p = a - r.num_items), g += r.item.eq(p).outerHeight(!0), u[d] = p, d++
                                }
                                for (l = r.current; l < r.current + r.options.visible_items; l++) {
                                    var h = l;
                                    l >= r.num_items && (h = l - r.num_items), _ += r.item.eq(h).outerHeight(!0)
                                }
                                var v = r.item.first().position(),
                                    y = v.top - r.wrapper_height;
                                for (k5 = 0; k5 < u.length; k5++)
                                    if (r.item.eq(u[k5]).css("top", y), 0 == u[k5]) {
                                        var w = r.item.eq(0).position(),
                                            x = w.top - r.wrapper_height;
                                        for (k6 = 0; k5 > k6; k6++) r.item.eq(u[k6]).css("top", x)
                                    }
                                setTimeout(function () {
                                    r.viewport.animate({
                                        height: _
                                    }, r.options.speed, r.options.easing), r.item.animate({
                                        top: "+=" + g
                                    }, r.options.speed, r.options.easing), r.item.promise().done(function () {
                                        r.next.on("click touchstart touchend", i), r.prev.on("click touchstart touchend", o), r.viewport.on("touchend", function (e) {
                                            if (void 0 == e.originalEvent.touches) var t = e;
                                            else var t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                                            s.dx = t.pageX - s.ox, s.dy = t.pageY - s.oy, s.endTime = (new Date).getTime() - s.startTime, "horizontal" == r.options.orientation ? s.dx < -s.swipeTreshold && s.endTime < s.allowedTime ? i(e, r.viewport) : s.dx > s.swipeTreshold && s.endTime < s.allowedTime && o(e, r.viewport) : s.dy < -s.swipeTreshold && s.endTime < s.allowedTime ? i(e, r.viewport) : s.dy > s.swipeTreshold && s.endTime < s.allowedTime && o(e, r.viewport)
                                        })
                                    })
                                }, 200)
                        }
                }
                return n[e] = r, n
            },
            start: function (i) {
                i = t(i);
                var o = n[i];
                switch (0 != o.timer && clearInterval(o.timer), o.options.direction) {
                    case "left":
                    case "up":
                    default:
                        o.timer = setInterval(function () {
                            o.next.off(), o.prev.off(), o.viewport.off("touchend"), e.fn.als("next", i)
                        }, o.options.interval);
                        break;
                    case "right":
                    case "down":
                        o.timer = setInterval(function () {
                            o.prev.off(), o.next.off(), o.viewport.off("touchend"), e.fn.als("prev", i)
                        }, o.options.interval)
                }
                return n[i] = o, n
            },
            stop: function (e) {
                e = t(e);
                var i = n[e];
                return clearInterval(i.timer), n[e] = i, n
            },
            destroy: function () {
                id = t(e(this).attr("data-id"));
                var i = n[id];
                i.prev.off(), i.next.off(), i.viewport.off(), e.fn.als("stop", id), e.removeData(i, "als"), this.unbind(), this.element = null
            }
        };
    e.fn.als = function (t) {
        return a[t] ? a[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist on jQuery.als") : a.init.apply(this, arguments)
    }
}(jQuery);;var commontObj = {
    init: function () {
        this.header();
        this.nav();
        this.fixed();
        this.menu();
        this.indexpage()
    },
    // 顶部悬浮事件
    header: function () {
        $('.qrdown').hover(function () {
            $(this).find('.dropdown-con').toggleClass('qrshow')
        }, function () {
            $(this).find('.dropdown-con').toggleClass('qrshow')
        })
    },
    nav: function () {
        layui.use('element', function () {
            var element = layui.element;
        });
    },
    fixed: function () {
        $(".popoverBtn").popover({
            html: true
        });
        $('.servepopoverBtn').popover();
       
        //show and hide go-to-top Button
        $(window).scroll(function () {
            var r = $(this).scrollTop();
            if(r>=30){
              $('#navbar').addClass('navbar-fixed-top')
              $('.main-bg').addClass('mt30')
            }
            if(r<30){
                $('#navbar').removeClass('navbar-fixed-top');
                $('.main-bg').removeClass('mt30')
            }
            if (r >= 850) {
                $(".fixed-goTop").show()
            }
            if (r < 850) {
                $(".fixed-goTop").hide()
            }
        });
        // click go-to-top
        $('.fixed-goTop ').click(function () {
            $("html,body").animate({
                scrollTop: 0
            }, 500);
            return false;
        });
        $('.fixed-download').hover(function () {
            $(this).find('.popover').show()
        }, function () {
            $(this).find('.popover').hide()
        })
    },
    menu:function(){
        $('.info-menu').hover(function () {
            $('#infoMenu').toggleClass('menu-show')
        }, function () {
            $('#infoMenu').toggleClass('menu-show')
        })
        $('#infoMenu li').hover(function () {
            $('.menu-bar').css({
                'top': $(this).position().top,
                "opacity": 1
            })
        }, function () {
            $('.menu-bar').css({
                'top': $('.menu-this').position(),
                "opacity": 0
            })
        })
    },
    indexpage:function(){
        
        $('body').running();
        
        if ($(".notice ul li").length > 1) {
            // 轮播滑动
            $(".notice").als({
                visible_items: 1,
                scrolling_items: 1,
                orientation: "vertical",
                circular: "yes",
                autoscroll: "yes",
                direction: "up",
                start_from: 0
            });
        }
        
        $('.collapse').on('show.bs.collapse hide.bs.collapse', function () {
            $(this).parents('.dynamic-item').toggleClass('shown')
            $(this).siblings('.dynamic-h').find('.dy-h4').eq(0).toggleClass('bold')
      
          })
        //   $('.collapse').on('shown.bs.collapse ', function () {
        //     var $dom = $(this).find('.clemp')
        //     var lh = parseInt($dom.css('line-height'));
        //     var height = parseInt($dom.height());
        //     if ((height / lh) > 2) {
        //       $dom.addClass("p-after")
        //     } else {
        //       $(this).removeClass("p-after");
        //     }
        //   })
    }
}
$(function () {
    commontObj.init();
    $(window).trigger('scroll')
    $('span[href=#collapseExample1]').trigger('click')
})