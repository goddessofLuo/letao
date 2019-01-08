
var currentPage=1;
var pageSize=5;
render();

function render(){
    $.ajax({
        datatype:'json',
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success:function(info){
            console.log(info);
            var secondstr=template('secondlevel',info);
            $('tbody').html(secondstr);
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

$('#addbtn').click(function() {
    // 让模态框显示show 隐藏 hide
    $('#secondModal').modal("show");
    $.ajax({
        dataType:'json',
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page:1,
            pageSize:100
        },
        success:function(info){
            console.log(info);
            // categoryName
            var motaistr = template('motaili' ,info);
            $('.dropdown-menu').html(motaistr); 
           
        }
    })
  });

$('.dropdown-menu').on('click' ,'a' , function(){
    var text = $(this).text();
    $('#dropdownText').text(text );
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);
    $('#from').data("bootstrapValidator").updateStatus( "categoryId", "VALID" )
})



  $('#fileupload').fileupload({
    dataType: "json",
    // 文件上传完成的回调函数
    done: function( e, data ) {
      console.log( data );
      var picUrl = data.result.picAddr; // 获取地址
      $('#imgBox img').attr("src", picUrl);
      $('[name="brandLogo"]').val( picUrl );
      $('#form').data("bootstrapValidator").updateStatus( "brandLogo", "VALID" )

    }
  })




//   校验
  $('#form').bootstrapValidator({
    // 配置不校验的类型, 对 hidden 需要进行校验
    // excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });

  $('#form').on("success.form.bv", function( e ) {
    e.preventDefault();
    $.ajax({
        type:'post',
        dataType:'json',
        url:'/category/addSecondCategory',
        data: $('#form').serialize(),
        success:function(){
            console.log(info);
            if(info.success){
                $('#addModal').modal("hide");
                currentPage = 1;
                render();

          
                // 重置内容和状态
                $('#form').data("bootstrapValidator").resetForm(true);

                // 由于下拉菜单 和 图片不是表单元素, 需要手动重置
                $('#dropdownText').text("请选择一级分类");
                $('#imgBox img').attr("src", "./images/none.png");
            }
            
        }
    })
  })