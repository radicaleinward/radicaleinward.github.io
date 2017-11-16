// Check off specific to-dos by clicking

$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

// Click on "X" to delete To-Do

$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});

// The "event" argument takes the code of the key that was pressed.
$("input[type='text']").keypress(function(event){
	// Code 13 is for the enter key.
	if(event.which === 13){
	// toDoText grabs the text that was typed.
		var toDoText = $(this).val();
		$(this).val("");
	// Create a new li and add to ul using append.
		$("ul").append("<li><span>" + "<i class='fa fa-trash-o' aria-hidden='true'></i> </span>" + toDoText + "</li>");
	}
});

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
})