$(function(){
    var currentid;   
    var isDelete; 
// 渲染,用render
var currentPage = 1;
var pageSize = 5;
render();

function render(){
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        datatype:'json',
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success:function(info){
            console.log(info);
            var tbodystr= template('tpl',info);  
            $('tbody').html(tbodystr);

            // 还有下面的数组
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

// 我点击按钮,会得到该用户的相关信息,包括id和当前状态
$('tbody').on('click','.btn',function(){
    $('#statuschange').modal("show");
     currentid = $(this).parent().data('id');
     isDelete = $(this).hasClass('btn-danger')?0:1;
})

$('#statuschangeyes').on('click',function(){
    $.ajax({
        url:'/user/updateUser',
        type:'post',
        datatype:'json',
        data:{
            id:currentid,
            isDelete:isDelete
        },
        success:function(info){
        console.log(info);
        if(info.success){
            render();
            $('#statuschange').modal("hide");
        }
        
        }

    })
})




})