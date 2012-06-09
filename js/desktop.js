function desktopLoaded() {
	try {
		log("Begin to init ajax form.");
		// jquery form ref: http://jquery.malsup.com/form/#ajaxForm
	   var options = { 
	     target: '#main_content', 
	     timeout: 3000 
	    }; 
	   
		$("form").ajaxForm(options);
		log("ajaxForm() called.");	
		
		$("form").submit(function(e) {
			$(this).ajaxSubmit();
			return false;
		});
		
		log("Ajax form initialized.");
	}
	catch(error) {
		log("Ajax form failed to init: " + error.discription + "."); 
		//log($("#main_content").html());
	}
}
