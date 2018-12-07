$(document).ready(function(){
// $("#change").change(function() {
// 	$("#product").html("<option disabled selected>Choose product</option>");
// 	$( "#change option:selected" ).each(function() {
//       var d =  $( this ).text();
// 	  $.ajax({
// 		type: "POST",
// 		url: "/sub",
// 		data: {data:d},
// 		success: function(msg){
// 			str = "<option disabled selected>Choose subcategory</option>"
// 			for (var i=0; i<msg.length; i++)
// 				str+="<option>"+msg[i].name+"</option>"
// 			$("#sub").html(str);	
// 		}
// 		});
//     });
// });

// $("#sub").change(function() {
// 	$( "#sub option:selected" ).each(function() {
//       var d =  $( this ).text();
// 	  $.ajax({
// 		type: "POST",
// 		url: "/prod",
// 		data: {data:d},
// 		success: function(msg){
// 			str = "<option disabled selected>Choose product</option>"
// 			for (var i=0; i<msg.length; i++)
// 				str+="<option>"+msg[i].name+"</option>"
// 			$("#product").html(str);	
// 		}
// 		});
//     });
// });

var data = new FormData();
$.each(jQuery('#file')[0].files, function(i, file) {
    data.append('file-'+i, file);
});

$.ajax({
    url: '/load',
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    method: 'POST',
    type: 'POST', 
    success: function(data){
        console.log(data);
    }
});

});