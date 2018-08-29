var commontObj = {
    init: function () {
        this.header();
        this.nav();
        this.fixed();
        this.menu();
        this.risk();
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
    risk:function(){
        $('#risk-collapse').on('show.bs.collapse hide.bs.collapse', function () {
            $(this).siblings('.risk-h').find('.risk-down>.glyphicon').toggleClass(
                ' glyphicon-chevron-up glyphicon-chevron-down')
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
            $(this).parents('.dynamic-item').find('.dy-btn').toggleClass(
              'icon-minus icon-plus')
          })
          $('.collapse').on('shown.bs.collapse ', function () {
            var $dom = $(this).find('.clemp')
            var lh = parseInt($dom.css('line-height'));
            var height = parseInt($dom.height());
            if ((height / lh) > 2) {
              $dom.addClass("p-after")
            } else {
              $(this).removeClass("p-after");
            }
          })
    }
}
$(function () {
    commontObj.init();
    $(window).trigger('scroll')
    $('#collapseExample1').collapse('show')
})