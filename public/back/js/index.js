
$('.sou').click(function() {
    // 切换 下一个兄弟元素 显示隐藏
    $('.child').stop().slideToggle();
  })

  $('.icon_menu').click(function() {
    $('.left-gongneng').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
  })


  $('.icon_logout').click(function() {
    // 让模态框显示show 隐藏 hide
    $('#logoutModal').modal("show");
  });

  // (2) 点击退出按钮, 发送退出请求, 实现退出
  $('#logoutBtn').click(function() {
    // 发送 ajax 请求
    // $.ajax({
    //   type: "get",
    //   url: "/employee/employeeLogout",
    //   dataType: "json",
    //   success: function( info ) {
    //     console.log( info );
    //     if ( info.success ) {
    //       // 退出成功, 跳到登陆页
    //       location.href = "login.html";
    //     }
    //   }
    // })

$.ajax({
  type:'get',
  url:'/employee/employeeLogout',
  dataType:'json',
  success:function(info){
    if(info.success){
      //成功推出
      location.href='login.html';
    }
  }
})


  })

