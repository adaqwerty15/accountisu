$(document).ready(function(){
$("#change").change(function() {
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
});

$("#sub").change(function() {
	$( "#sub option:selected" ).each(function() {
      var d =  $( this ).text();
	  $.ajax({
		type: "POST",
		url: "/prod",
		data: {data:d},
		success: function(msg){
			str = "<option disabled selected>Choose product</option>"
			for (var i=0; i<msg.length; i++)
				str+="<option>"+msg[i].name+"</option>"
			$("#product").html(str);	
		}
		});
    });
});

});