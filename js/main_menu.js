var before_show_main_content = null; // it's a must, otherwise compile error 
var after_show_main_content = null; // as above

function loadPage(src) {
	var container = $("#main_content");
	var progress_bar = $("#progress_bar");
	
	// hide main_content	
	container.css({display:"none"});
	progress_bar.css({display:"block"});
	
	container.load(src, function(response,status,xhr) {
		if (status != "success") {
			container.html("<p>十分抱歉，系统繁忙，请稍候再试。</p>");
		}
			
		if (before_show_main_content != null) {
			before_show_main_content();
			before_show_main_content = null; // only call it once
		}
		
		// show main_content	
		progress_bar.css({display:"none"});
		container.css({display:"block"});
		
		if (after_show_main_content != null) { 
			after_show_main_content();
			after_show_main_content = null; // only call it once
		}
		
		// defined in desktop.js
		desktopLoaded();
	});
}

function selectMainMenuItem(item)
{
	log("Begin to select main menu item: " + item.children("a").children("span").html() + ".");
	
	if (item.attr("class") != "main_menu_item") {
		log("Invalid className: " + item.attr("class") + ".");		
		return;
	}
	$("li.main_menu_current_item").attr("class", "main_menu_item");
	item.attr("class", "main_menu_current_item");

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
	log("Page loaded.");
	$(".main_menu a").click(function() {
		selectMainMenuItem($(this).parent("li"));
		return false; // disable link
	});
	
	// Default main menu item
	selectMainMenuItem($("li.main_menu_item:first"));
});
