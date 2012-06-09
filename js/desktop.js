function desktopLoaded() {
	try {
		console.log("Begin to init ajax form.");
		// jquery form ref: http://jquery.malsup.com/form/#ajaxForm
	   var options = { 
	     target: '#main_content', 
	     timeout: 3000 
	    }; 
	   
		$("form").ajaxForm(options);
		console.log("ajaxForm() called.");	
		
		$("form").submit(function(e) {
			$(this).ajaxSubmit();
			return false;
		});
		
		console.log("Ajax form initialized.");
	}
	catch(error) {
		console.log("Ajax form failed to init: " + error.discription + "."); 
		//console.log($("#main_content").html());
	}
}
