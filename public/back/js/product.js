var currentPage=1;
var pageSize=5;
var picArr=[];
render();

function render(){
    $.ajax({
        datatype:'json',
        type:'get',
        url:'/product/queryProductDetailList',
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success:function(info){
            console.log(info);
            var productstr=template('producttpl',info);
            $('tbody').html(productstr);
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


// 这个是模态框里面的二级选项的模板
$('#addbtn').click(function() {
    $('#productModal').modal("show");
    $.ajax({
        dataType:'json',
        type:'get',
        data: {
            page:1,
            pageSize:100
        },
        url:'/category/querySecondCategoryPaging',
        success:function(info){
            console.log(info);
            var ulstr = template('motaili',info);
            $('.dropdown-menu').html(ulstr);

            
        }
    })
  
});


// 点击选项,将选项的值赋值给ul
$('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('#dropdownText').text(txt);

    var bid = $(this).data('id');
    $('[name="brandId"]').val(bid);

    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
})


// 上传文件
$('#fileupload').fileupload({
    dataType:'json',
    done: function( e, data ) {
        console.log(data.result);//后台返回的结果对象
      var picObj = data.result; // 后台返回的图片对象
      picArr.unshift(picObj);   //数组里面放着图片返回的对象,而且是放在前面的
      var picUrl=picObj.picAddr;//图片的的地址
      $('#imgBox').prepend('<img style="width:100px;" src="' + picUrl + '" alt="">');
      if(picArr.length>3){
          picArr.pop();
          $('#imgBox img:last-of-type').remove();
      }
      if ( picArr.length === 3 ) {
        // 将隐藏域校验状态, 改成成功
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }
    
})



// 输入的校验,是否符合规则
$('#form').bootstrapValidator({
    // 配置不校验的类型, 对 hidden 需要进行校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          // 商品库存格式, 必须是非零开头的数字
          // 需要添加正则校验
          // 正则校验
          // 1,  11,  111,  1111, .....
          /*
          *   \d 表示数字 0-9
          *   +     表示出现1次或多次
          *   ?     表示出现0次或1次
          *   *     表示出现0次或多次
          *   {n}   表示出现 n 次
          *   {n,m} 表示出现 n 到 m 次
          * */
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          // 要求: 必须是 xx-xx 的格式, xx为两位的数字
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '必须是 xx-xx 的格式, xx为两位的数字, 例如: 36-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      }
    }
  });







// var txt = $(this).text();
// // 发送ajax请求, 获取二级分类的全部数据, 进行下拉菜单的渲染
// $('#dropdownText').val(txt);

// 阻止发送
$('#form').on("success.form.bv", function( e ) {
    e.preventDefault();
    var sj = $('#form').serialize();
    // $('#form').seriaize();
    // paramsStr += "&key=value";
    var dz=JSON.stringify( picArr );
    console.log(dz);
    
    sj += '&picArr=' + dz;
    console.log(sj);
    

$.ajax({
    type:'post',
    url:'/product/addProduct',
    dataType:'json',
    data:sj,
    success:function(info){
        console.log(info);
        if(info.success){
            $('#productModal').modal("hide");
            currentPage=1;
            render();
            $('#form').data("bootstrapValidator").resetForm(true);
            $('#dropdownText').text('请选择二级分类');
            $('#imgBox img').remove();
        }
       
    }
})


})



