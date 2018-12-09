$(document).ready(function(){

$("#fup").submit(function() {
	
	$(this).ajaxSubmit({

		error: function(xhr) {
        status('Error: ' + xhr.status);
            },
		success: function(spec){
				if (spec==0) alert("Выберите направление подготовки!")
				else {
		        var isAllowed = confirm("Вы уверены, что хотите добавить (перезаписать) "+
		        	"учебный план '"+spec+" года'?")
		        if (isAllowed) {
		        	$.ajax({
					type: "POST",
					url: "/load/sub",
					success: function(msg){
						alert(msg)	
					}
					});
		        }

		        }
		    }
		    
	});
	return false;
	});

$("#year_change").change(function() {
	ch()
});

$("#dis_change").change(function() {
	ch()
});

var ch = function() {
	var y =  $("#year_change option:selected").text();
	var d = $("#dis_change option:selected").text();
	if (d!="Выберите направление" && y!="Выберите год начала обучения")  
	  $.ajax({
		type: "POST",
		url: "/up/show",
		data: {
			year: y, 
			dir:d
		},
		success: function(rows){
			$("#table").html("")
			if (rows[0]==undefined) str="Hе найдено" 
			else {
				var str= "<table border='1'>";
				str+="<tr><th>Семестр</th><th>Дисциплина</th><th>Лекций/нед</th><th>Практик/нед</th><th>Лаб/нед</th><th>Тип контроля</th></tr>"
				for(var i = 0; i<rows.length; i++) {
					str+="<tr><td>"+rows[i].sem+"</td><td>"+rows[i].dis+"</td><td>"+rows[i].lek+"</td><td>"+rows[i].pr+"</td><td>"+rows[i].lab+"</td><td>"+rows[i].control+"</td></tr>"
				}
				str+="</table>"
			}
			$("#table").html(str)
		}
		});
}
});




	



