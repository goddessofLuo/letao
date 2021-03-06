$(function(){

 /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */


    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // excluded: [':disabled', ':hidden', ':not(:visible)'],
      
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
      
        //3. 指定校验字段
        fields: {
          //校验用户名，对应name表单的name属性
          username: {
            validators: {
              //不能为空
              notEmpty: {
                message: '用户名不能为空'
              },
              //长度校验
              stringLength: {
                min: 2,
                max: 6,
                message: '用户名长度必须在2到6之间'
              },
              callback:{
                  message:'用户名不存在'
              }
              //正则校验
            //   regexp: {
            //     regexp: /^[a-zA-Z0-9_\.]+$/,
            //     message: '用户名由数字字母下划线和.组成'
            //   }
            }
          },
          password: {
            validators: {
              //不能为空
              notEmpty: {
                message: '密码不能为空'
              },
              //长度校验
              stringLength: {
                min: 6,
                max: 12,
                message: '密码长度必须在6到12之间'
              },
              callback:{
                  message:'密码错误'
              }
              //正则校验
            //   regexp: {
            //     regexp: /^[a-zA-Z0-9_\.]+$/,
            //     message: '用户名由数字字母下划线和.组成'
            //   }
            }
          }
        },       
        }
   
      );
})

$('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        type:"post",
        url:"/employee/employeeLogin",
        dataType:'json',
        data:$('#form').serialize(),
        success:function(info){
            console.log(info);
            if (info.success){
                location.href='index.html';  s
            }
            if(info.error===1000){
                var validator = $("#form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
            }
            if ( info.error === 1001 ) {
                // alert( "密码错误" );
                $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                return;
              }   
        }
    })
});

$('[type=reset]').on('click',function(){
    $("#form").data('bootstrapValidator').resetForm();
})
