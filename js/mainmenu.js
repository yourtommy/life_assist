function selectMainMenuItem(item)
{
	if (item.attr("className") != "main_menu_item")
		return;
	$("li.main_menu_current_item").attr("className", "main_menu_item");
	item.attr("className", "main_menu_current_item");

	$("#side_menu").load(item.attr("side-menu"), function() {
			$("#side_menu a").click(function() {
				$("#main_content").load($(this).attr("href"));
				return false; // disable link
			});
			
			// $(".desktop").slideDown("slow");
	});

	$("#main_content").load(item.children("a").attr("href"));
}

$(document).ready(function(){
	$(".main_menu a").click(function() {
		selectMainMenuItem($(this).parent("li"));
		return false; // disable link
	});
	
	// Default page
	selectMainMenuItem($("li.main_menu_item:first"));
});
