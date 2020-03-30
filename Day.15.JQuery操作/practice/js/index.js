// 作为入口函数，写头部引入的时候需要写，否则加载不到操作dom就是未定义
$(function(){
    $(".nav-warper li.menu").hover(function(){
        $(this).toggleClass("menus")
    })
    var $search_all = $(".searchall");
    $search_all.find(".searchtop li").click(function(){
        if($(this).hasClass("tmall")){
            $search_all.addClass("tianmao")
        }else{
            $search_all.removeClass("tianmao")
        }
        if($(this).hasClass("baobei")){
            $search_all.addClass("")
        }else{
            $search_all.removeClass("")
        }
        if($(this).hasClass("dianpu")){
            $search_all.addClass("dianpu")
        }else{
            $search_all.removeClass("dianpu")
        }
        $(this).addClass("on").siblings().removeClass("on")
    });

    // 吸顶的js
    // 点击更换标签,鼠标放上展示所有，鼠标一走隐藏
    $(".search-fixed .search-center ul").hover(
        function(){
            console.log("鼠标放上")
            console.log($(this).parent().css("overflow","none"))
            $(this).parent().css("overflow","none")
        }
    )
    var search_is_fixed = false;
    $(window).scroll(function(){
        // console.log($(window).scrollTop())
        if($(window).scrollTop() >= 114){
            // 添加一个可以固定定位的类
            // console.log("添加一个可以固定定位的类")
            $(".search-wrapper").addClass("search-fixed");
            search_is_fixed = true;
        }else{
            // 移除固定定位的类
            // console.log("移除固定定位的类")
            $(".search-wrapper").removeClass("search-fixed");
            search_is_fixed = false;
        }
    })
    var $searchall = $(".searchall")
    $searchall.find(".searchtop li").click(function(){
        if(true){
            // 处于固定定位的状态
            // console.log("1111")
            $(this).prependTo($(this).parent())
        }
    })
    $(".content .menuleft ul li").hover(function(){
        $(".content .market-submenu").css("display","block")
    })
});