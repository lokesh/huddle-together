window.onload = function () {
	var hiddenElements = document.querySelectorAll(".hidden");
	for (var i = 0, len = hiddenElements.length; i < len; i++) {
		hiddenElements[i].className = hiddenElements[i].className.replace(' hidden', '');
	}
};
