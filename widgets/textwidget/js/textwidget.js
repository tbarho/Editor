$(document).ready(function() {
	// GET CONTENT OF THE DIV INTO A CREATED IFRAME
    //var iFrame = $('<iframe id="frameDemo"><html><head></head><body><p>This is an iframe.</p></body></html></iframe>');

	//$('body').append(iFrame); 

	// Set a count variable to 0
	var count = 0;

	// Loop through all DOM elements with class="textwidget"
	$('.textwidget').each(function() {
	
		var height = $(this).height();
		var width = $(this).width();

		var parent = $(this).parent();
		var eParents = $(this).parents();

		var id = 'textwidget-' + count;

		// Create a new iFrame with Javascript (not jQuery)
		var iFrame = document.createElement('iframe');

		// Set the id to new textwidget-count
		iFrame.setAttribute('id', id);
		
		// Set scrolling to no (TODO: Make sure this needs to happen)
		iFrame.setAttribute('scrolling', 'no');

		// Append the iFrame to the DOM so Javascript / jQuery can find it later
		//document.body.appendChild(iFrame);
		this.parentNode.replaceChild(iFrame, this);

		// Get the document object of the iFrame, so we can write content to it
		var doc = iFrame.contentWindow.document;

		// Set the designMode to "On" so we can edit it inline
		doc.designMode = "On";

		// Start the string that will be the content for the iFrame
		var content = "<html><head>";

		// Find all <link> elements, and append their html to the <head> of the iFrame, so the iFrame knows about styles
		$('link').each(function() {
			content += $('<div>').append($(this).clone()).remove().html();
		});

		// Finish the content for the iFrame, including the element $(this)'s content 
		content += "</head><body>" + $('<div>').append($(this).clone()).remove().html() +  "</body></html>";

		// Write the content to the iFrame object
		doc.open();
		doc.write(content);
		doc.close();

		// Hide the natural iFrame border
		$(iFrame).css('border', 'none');

		// Create a border when the user clicks in the iFrame
		// TODO: Removed because it looked weird
		//$(doc).bind('focusin', function() {
		//	$(iFrame).css('borderWidth', '1px');
		//	$(iFrame).css('borderStyle', 'solid');
		//	$(iFrame).css('borderColor', '#ccc');
		//});

		// Remove the border when a user exits the iFrame
		// TODO: Removed because it looke weird
		//$(doc).bind('focusout', function() {
		//	$(iFrame).css('borderWidth', '0');
		//});

		// Remove the natural margin and padding from the iFrame <body>
		$('body', doc).attr('style', 'margin: 0; padding: 0;');


		// Handle floats: TODO Test this and see where it breaks
		if($(this).css('float') != 'none') {
			$(iFrame).css('float', $(this).css('float'));
		}

		// Handle Width: TODO Test this and see where it breaks
		$(iFrame).css('width', width + 10);

		// Handle Height: TODO Test this and see where it breaks
		$(iFrame).css('height', height);

		// Handle Background color (TODO: Doesn't work correctly, needs to be smarter)
		$(iFrame).css('backgroundColor', 'transparent');
		$('body', doc).css('backgroundColor', 'transparent');
		if(parent.css('backgroundColor') != 'transparent') {
			$('body', doc).css('backgroundColor', parent.css('backgroundColor'));
		}

		

		// Loop through all the parents, and find the first specified background color.  Make the body that.
		//eParents.each(function() {
		//	if($(this).css('backgroundColor') != 'transparent') {
		//		console.log($(this).css('backgroundColor'));
		//		$('body', doc).css('backgroundColor', $(this).css('backgroundColor'));
		//		return false;
		//	}
		//});

		// Cases for background images
		// 1.  Element has a background
		// 		- Handled with inline stylesheet
		// 2.  Parent element has a background
		// 		- Handled with transparent iFrame / .each on BG
		// 3.  <body> has a background
		// 		- Remove it
		
		$('body', doc).css('backgroundImage', 'none');

		
		


		// Right now, the body is taking on the properties of the css file, which is no good.
		//$('body', doc).css('backgroundColor', parent.css('backgroundColor'));

		// Hide the original element, so we only see the iFrame
		$(this).hide();



		// Prevent Firefox from opening bookmarks tab
		$(doc).bind('keydown', function(e) {
			if(e.metaKey || e.ctrlKey){
				e.preventDefault();
			}
		});		


		// Example of binding commands
		$(doc).bind('keyup', function(e) {
			var keycode = e.keyCode;
			console.log(e);
			if(keycode == 66 && (e.ctrlKey || e.metaKey)){

				iframe = document.getElementById(id);
				iframe.contentWindow.focus();
				try{
					iframe.contentWindow.document.execCommand('bold', false, null);
				}catch(e){
					console.log(e);
				}
				iframe.contentWindow.focus();

			}

		});

		
		//iframe.contentWindow.focus();
        //try{
        //    iframe.contentWindow.document.execCommand(command, false, option);
        //}catch(e){console.log(e)}
        //iframe.contentWindow.focus();

		// Add to the count
		count++;

		// TODO:
		// - Test floats
		// - Figure out what other attributes we need to handle (i.e. width, height, etc.)
		// 		- Backgrounds
		// 		- Margin
		// 		- Padding
		// 		- Height
		// - Test with real template

	});
});


function doRichEditCommand(iFrameDoc, aName, aArg) {
	iFrameDoc.execCommand(aName, false, aArg);
}


