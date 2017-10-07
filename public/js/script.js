$(document).ready(function(){
                  
  $('.politicians-button').on('click', function() {
        
        
		var id = $(this).data('id-politician');
		window.location.href = "/politicians/" + (id);
		
	});
             
}); 