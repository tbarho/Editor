
(function($) {

	$.fn.textwidget = function() {

		var count = 1;

		console.log('loaded');

		if(document.designMode || document.contentEditable) {
			$(this).each(function() {
				var element = $(this);
				enableTextWidget(element);
				count++;
			});
		}

		function formatText(iframe, command, option) {
			
			iframe.contentWindow.focus();
			try{
				iframe.contentWindow.document.execCommand(command, false, option);
			} catch(e) {
				console.log(e);
			}
			iframe.contentWindow.focus();
		
		}

		function addKeyBinds(iframe) {
			
			// What keys to override? (e.g. ctrl+b = Bookmarks in Mozilla)
			// What keys to handle? (e.g. crtl+b = bold in text widget)

			$(iframe.contentWindow.document).bind('keydown', function(e) {
				// console.log(e.keyCode);
				if(e.metaKey || e.ctrlKey) {
					switch(e.keyCode)
					{
						case 66:
							e.preventDefault();
							formatText(iframe, 'bold', null);
							break;
						case 73:
							e.preventDefault();
							formatText(iframe, 'italic', null);
							break;
					}
				}
			});



		}


		// TODO:
		//
		// Leave a true implementation for another version
		// For now, this is here just to make the templates look ok while testing
		// Remove in favor of editing templates manually, and QA'ing them to make sure they work cross-browser
		//
		function copyElementStyles(element, iframe) {

			// Get a jquery object that represents the iframe's <body> tag
			var body = $('body', iframe.contentWindow.document);
			var eClass = $.trim(element.attr('class').replace("textwidget", ""));
			
			// If the element has a CSS class, set the <body> to that class
			if(eClass != "") {
				// console.log('I have a class');
				body.attr('class', eClass);
			} else {
				// console.log('I have NO class');
			}


			// How do we figure out if the new class set a background color?
			console.log(body.css('backgroundColor'));





			// Handle Floats
			if(element.css('float') != 'none') {
				$(iframe).css('float', element.css('float'));
			}
		}

		function getTrueBackgroundHex(element) {
			// How to handle backgrounds?
			return "#FFFFFF";
		}

		function tryEnableDesignMode(iframe, doc, callback) {
			try {
				iframe.contentWindow.document.open();
				iframe.contentWindow.document.write(doc);
				iframe.contentWindow.document.close();
			} catch(error) {
				console.log(error)
			}
			if (document.contentEditable) {
				iframe.contentWindow.document.designMode = "On";
				callback();
				return true;
			}
			else if (document.designMode != null) {
				try {
					iframe.contentWindow.document.designMode = "on";
					callback();
					return true;
				} catch (error) {
					console.log(error)
				}
			}
			setTimeout(function(){tryEnableDesignMode(iframe, doc, callback)}, 250);
			return false;
		}
		
		function enableTextWidget(element) {

			// Set up all the variables
			var eHeight = $(element).outerHeight(true); // Use outerHeight(true) to include margin
			var eWidth = $(element).outerWidth(true); // Use outerWidth(true) to include margin

			var eParent = $(element).parent();
			var eParents = $(element).parents();

			var eContent = $('<div>').append($(element).clone().removeAttr('class')).remove().html();
			var eStylesheets = '';

			var widgetId = 'textwidget-' + count;

			// Find all the <link>'s and add them to the iframe
			$('link').each(function() {
				eStylesheets += $('<div>').append($(this).clone()).remove().html();
			});

			// Mozilla need this to display caret
			if($.trim(eContent)=='')
				content = "<br />";

			// Create the iFrame
			var iframe = document.createElement("iframe");
			iframe.frameBorder = 0;
			iframe.frameMargin = 0;
			iframe.framePadding = 0;
			iframe.scrolling = "no";
			iframe.height = eHeight;
			iframe.width = eWidth;
			iframe.id = widgetId;

			// Add the iFrame
			element.after(iframe);

			// Create the content document from the existing variables
			var doc = "<html><head>" + eStylesheets + "</head><body>" + eContent + "</body></html>";

			tryEnableDesignMode(iframe, doc, function() {
				
				// Copy the element styles to the iFrame (background, float, etc.)
				copyElementStyles(element, iframe);	
				
				// Add the keybinds
				addKeyBinds(iframe);

				// Remove the original element
				element.remove();
			});	


		}

	}


})(jQuery);

