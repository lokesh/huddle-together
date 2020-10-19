window.addEventListener('resize', function (event) {
  // Resize Processing canvas once user is finished resizing window
	if (this.resizeUI) {
		clearTimeout(this.resizeUI);
	}

  this.resizeUI = setTimeout(function() {
    Processing.getInstanceById('canvas').resize();
  }, 200);  
});
