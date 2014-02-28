window.addEventListener('load', function (event) {
  positionHeader();

	// Unhide logo and link
  // Delay by 100ms. If the JS positioning and the JS CSS class removal happen in sequence without a
  // delay the CSS transition does not always get applied.
  setTimeout(function() {
    var hiddenElements = document.querySelectorAll('.hidden');
    for (var i = 0, len = hiddenElements.length; i < len; i++) {
      hiddenElements[i].className = hiddenElements[i].className.replace(' hidden', '');
    }
  }, 100);
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