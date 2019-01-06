
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
})



  $('#fileupload').fileupload({
    dataType: "json",
    // 文件上传完成的回调函数
    done: function( e, data ) {
      console.log( data );
      var picUrl = data.result.picAddr; // 获取地址
      $('#imgBox img').attr("src", picUrl);
    }
  })
