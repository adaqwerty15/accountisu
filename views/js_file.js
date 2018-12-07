$(document).ready(function(){

$("#fup").submit(function() {
	
	$(this).ajaxSubmit({

		error: function(xhr) {
        status('Error: ' + xhr.status);
            },
		success: function(spec){
		        var isAllowed = confirm("Вы уверены, что хотите добавить (перезаписать) "+
		        	"учебный план '"+spec+" года'?")
		        if (isAllowed) {
		        	$.ajax({
					type: "POST",
					url: "/sub",
					success: function(msg){
						alert(msg)	
					}
					});
		        }

		        }
		    
	});
	return false;
	});
});

/*$("#change").change(function() {
	$("#product").html("<option disabled selected>Choose product</option>");
	$( "#change option:selected" ).each(function() {
      var d =  $( this ).text();
	  $.ajax({
		type: "POST",
		url: "/sub",
		data: {data:d},
		success: function(msg){
			str = "<option disabled selected>Choose subcategory</option>"
			for (var i=0; i<msg.length; i++)
				str+="<option>"+msg[i].name+"</option>"
			$("#sub").html(str);	
		}
		});
    });
});*/


	



