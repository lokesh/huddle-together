window.addEventListener('load', function (event) {
  positionHeader();
});

window.addEventListener('resize', function (event) {
  // Resize Processing canvas once user is finished resizing window
	if (this.resizeUI) {
		clearTimeout(this.resizeUI);
	}

  this.resizeUI = setTimeout(function() {
    positionHeader();
    Processing.getInstanceById('canvas').resize();
  }, 200);  
});

function positionHeader() {
  // Position logo and link in vertical center of viewport
  var header          = document.getElementById('header');
  var viewportHeight  = window.innerHeight;
  var headerTopMargin = ((viewportHeight / 2) - (header.offsetHeight / 2));
  header.style.margin = headerTopMargin + "px 0 0 0";
}