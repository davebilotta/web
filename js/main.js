$(document).ready(function() {

var fileNames = [];
var counter;
var delay = 10000;
var swapping = false;

$(window).resize(scaleImage);

$(window).keyup(function( event ) {
	//if (event.which == 37) getPrevImage();
	if (event.which == 39) swapImages;
});

$("#body-image").click(swapImages);

/*
$("#body-image").hover(function() {
	$("#body-image").css("opacity",0.6);
}); */

main();

setInterval(swapImages,delay);

function main() {
	loadImages();
	getNextImage();
	scaleImage();
}

function loadImages() {
	fileNames = [
	 	"IMG_8458.jpg",
		"IMG_8649.jpg",
		"IMG_8792.jpg",
		"IMG_8863.jpg",
		"IMG_9094.jpg",
     ];

	counter = fileNames.length - 1;
}

function scaleImage() {
	var w = $(window).innerWidth() * 0.5;
	var h = $(window).innerHeight() * 0.5;

	//$("#body-image").attr( "width","100%").attr("height","auto");
	//$("#body-image2").attr( "width","100%").attr("height","auto");
	$("#body-image").attr( "width",w).attr("height","auto");
	$("#body-image2").attr( "width",w).attr("height","auto");
	console.log("setting width to " + w + " and height to " + h);

}

function getPrevImage() {
	console.log("Previous image");
	decrement();
	setImage();
}

function decrement() { 
counter--;

	if (counter < 0) {
		counter = fileNames.length -1;
	}
}

function increment(){
	counter++;

	if (counter >= fileNames.length) {
		counter = 0;
	}
}

function getNextImage() {
	console.log("Next image");
	increment();	
	setImage();
}

// This is only used to set the image originally
function setImage() {
	$("#body-image").attr("src","/portfolio/images/" + fileNames[counter]);
}

function swapImages() { 
	if (!swapping) {
	var fadeDelay = 3000;
	swapping = true;
	$("#body-image").css("opacity",1.0);

	//
	// Get next image 
	increment();
	// 
	// set bottom image opacity and source
	$("#body-image2").css("opacity",0.0);
	$("#body-image2").attr("src","/portfolio/images/" + fileNames[counter]);

	// Start to fade out top 
	$("#body-image").animate({opacity: 0.0}, fadeDelay, function() {
	});

	// Start to fade in bottom (body-image2) 
	$("#body-image2").animate({opacity: 1.0}, fadeDelay, function() {
		setImage();
		swapping = false;
	});
	}
}

});