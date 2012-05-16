function openToMainContent(src)
{
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function()
  {
    //if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		$("#main_content").get(0).innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET", src, false);
  xmlhttp.send();
}

function selectMainMenuItem(item)
{
	openToMainContent(item.children("a").attr("href"));
	$("li.main_menu_current_item").attr("className", "main_menu_item");
	item.attr("className", "main_menu_current_item");
}

$(document).ready(function(){
	$("li.main_menu_item").click(function() {
		selectMainMenuItem($(this));
	});
	
	$("li.main_menu_item a").click(function() {
		selectMainMenuItem($(this).parent("li"));
		return false; // disable link
	});
	
	// Default page
	selectMainMenuItem($("li.main_menu_item:first"));
});
