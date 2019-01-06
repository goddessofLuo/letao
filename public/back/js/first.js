// 进来先渲染，照例render先搞起
var currentPage=1;
var pageSize=5;
render();



//刷新页面结束
function render (){
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        dataType:'json',
        data:{
            page: currentPage,
            pageSize:pageSize
        },
        success:function(info){
            console.log(info);
            var firststr=template('firstlevel' , info)
            $('tbody').html(firststr);

            // 页码
            $('#paginator').bootstrapPaginator({
                bootstrapMajorVersion: 3,
                currentPage: info.page,
                totalPages: Math.ceil( info.total / info.size ),
                onPageClicked: function( a, b, c, page ){
                    currentPage = page;
                    render();
                }

            })
        }

    })
}



// 校验表单
$('#form').bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',    // 校验成功
        invalid: 'glyphicon glyphicon-remove',   // 校验失败
        validating: 'glyphicon glyphicon-refresh'  // 校验中
      },
      fields: {
        categoryName: {
          validators: {
            notEmpty: {
              message: "请输入一级分类名称"
            }
          }
        }
      }
})

// 添加一级分类

$('#addbtn').click(function() {
    // 让模态框显示show 隐藏 hide
    $('#addModal').modal("show");
  });


  $('#form').on("success.form.bv", function( e ) {
    e.preventDefault();
    $.ajax({
        type:'post',
        dataType:'json',
        data:$('#form').serialize(),
        url:'/category/addTopCategory',
        success:function(info){
            console.log(info);
            if(info.success){
                $('#addModal').modal("hide");
            }
            currentPage=1;
            render();
            $('#form').data("bootstrapValidator").resetForm(true);
        }
    })

})
