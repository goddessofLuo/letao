// 有自己的api,路径是/employee/checkRootLogin
// $.ajax({
//     type:'get',
//     dataType:'json',
//     url:'/employee/checkRootLogin',
//     success:function(info){
//         console.log(info);
//         if(info.error===400){
//             location.href='login.html';
//         }
        
//     }
// })
$.ajax({
    type:'get',
    dataType:'json',
    url:'/employee/checkRootLogin',
    success:function(info){
        console.log(info);
        
        if(info.error===400){
            location.href='login.html'
        }
    }   
})



