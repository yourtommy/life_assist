$(document).ready(function(){
	$(".topbar li").mouseover(function() {
		$(this).fadeTo("normal", 0.5);
	});
	
	$(".topbar li").mouseout(function() {
		$(this).fadeTo("normal", 1);
	});
});
