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
                 window.location.href='/'
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

function myFunction1() {
    document.getElementById("status").value = device.status;
}

function myFunction() {
    var checkBox = document.getElementById("myCheck");
    var text = document.getElementById("myDIV");
    if (checkBox.checked == true ){
      text.style.display = "block";
    } else {
       text.style.display = "none";
    }
}

  
