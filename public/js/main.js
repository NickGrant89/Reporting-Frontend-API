$(document).ready(function(){
    $('.delete-device').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        var delDevice =  confirm('Are you sure you want to delete this device?');
        if(delDevice == true){
            $.ajax({
                type:'DELETE',
                url: '/devices/'+id,
                success: function(response){
                 alert('Device Deleted');
                 window.location.href='/devices'
                },
                error: function(err){
                       console.log(err); 
                }
            });
        }
        else{
           
        }

    });
});
;

$(document).ready(function(){
    $('.delete-user').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id1');
        var delUser =  confirm('Are you sure you want to delete this device?');
        if(delUser == true){
            $.ajax({
                type:'DELETE',
                url: '/users/'+id,
                success: function(response){
                 alert('User Deleted');
                 window.location.href='/users'
                },
                error: function(err){
                       console.log(err); 
                }
            });
        }
        else{
           
        }

    });
});
;

