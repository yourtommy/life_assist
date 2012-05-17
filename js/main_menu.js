var before_show_main_content = null; // it's a must, otherwise compile error 
var after_show_main_content = null; // as above

function loadPage(src) {
	var container = $("#main_content");
	
	// hide main_content	
	container.css({display:"none"});
	
	container.load(src, function(response,status,xhr) {				
		if (before_show_main_content != null) {
			before_show_main_content();
			before_show_main_content = null; // only call it once
		}
	
		// show main_content	
		container.css({display:"block"});
		
		if (after_show_main_content != null) {
			after_show_main_content();
			after_show_main_content = null; // only call it once
		}
	});
}

function selectMainMenuItem(item)
{
	if (item.attr("className") != "main_menu_item")
		return;
	$("li.main_menu_current_item").attr("className", "main_menu_item");
	item.attr("className", "main_menu_current_item");

	$("#side_menu").load(item.attr("side-menu"), function() {
			$("#side_menu a").click(function() {
				loadPage($(this).attr("href"));
				return false; // disable link
			});
			
			// Default page from side menu 
			loadPage($("#side_menu a:first").attr("href"));
		
			// $(".desktop").slideDown("slow");
	});
}

$(document).ready(function(){
	$(".main_menu a").click(function() {
		selectMainMenuItem($(this).parent("li"));
		return false; // disable link
	});
	
	// Default main menu item
	selectMainMenuItem($("li.main_menu_item:first"));
});
