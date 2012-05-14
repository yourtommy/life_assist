$(document).ready(function(){
	$(".topbar li").mouseover(function() {
		$(this).fadeTo("slow", 0.6);
	});
	
	$(".topbar li").mouseout(function() {
		$(this).fadeTo("slow", 1);
	});
});
