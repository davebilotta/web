$(document).ready(function() {

var fileNames = [];      // List of file names for images in portfolio (no path)
var imgNum;              // Image number 
var swapDelay = 10000;   // Number of seconds in between swapping images
var swapping = false;    // Used to disable swapping of images via keystroke/clicking while swapping in progress

$(window).resize(scaleImage);

$(window).keyup(function( event ) {
	if (event.which == 39) swapImages;
});

$("#body-image").click(swapImages);

init();

setInterval(swapImages,swapDelay);

function init() {
	/* Does initial setup - loads images and sets first one */

	loadImages();
	scaleImage();
	getNextImage();
}

function loadImages() {
	/* Initializes image file names */
	
	fileNames = [
	 	"IMG_8458.jpg",
		"IMG_8649.jpg",
		"IMG_8792.jpg",
		"IMG_8863.jpg",
		"IMG_9094.jpg",
     ];

	imgNum = fileNames.length - 1;
}

function scaleImage() {
	/* Scales image to appropriate width and height based on screen height/width */

	var w = $(window).innerWidth() * 0.5;
	var h = $(window).innerHeight() * 0.5;

	$("#body-image").attr( "width",w).attr("height","auto");
	$("#body-image2").attr( "width",w).attr("height","auto");
	console.log("setting width to " + w + " and height to " + h);

}

function getPrevImage() {
	/* Get previous image - decrements image number and sets image */

	prev();
	setImage();
}

function prev() { 
	/* Decrement image number by 1 or reset to end once we get to beginning */
	
	imgNum--;

	if (imgNum < 0) {
		imgNum = fileNames.length -1;
	}
}

function next() {
	/* Increment image number by 1 or reset to 0 once we get to end */

	imgNum++;

	if (imgNum >= fileNames.length) {
		imgNum = 0;
	}
}

function getNextImage() {
	/* Get next image - increments image number and sets image */

	next();	
	setImage();
}

function setImage() {
	/* Sets source of image */

	$("#body-image").attr("src","/portfolio/images/" + fileNames[imgNum]);
}

function swapImages() { 
	/* Used to swap images - fade out current image and fade in next image */

	if (!swapping) {
		var fadeDelay = 3000;   // How long images will take to fade in/out
		swapping = true;        // We're currently swapping images

		// Set opacity of current image
		$("#body-image").css("opacity",1.0);

		// Get next image 
		next();
		
		// Set bottom image opacity and source
		$("#body-image2").css("opacity",0.0);
		$("#body-image2").attr("src","/portfolio/images/" + fileNames[imgNum]);

		// Start to fade out top image
		$("#body-image").animate({opacity: 0.0}, fadeDelay, function() {
		});

		// Start to fade in bottom image
		$("#body-image2").animate({opacity: 1.0}, fadeDelay, function() {
			setImage();
			swapping = false;
		});
	}
}

});