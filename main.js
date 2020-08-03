var headerHeight = 140;
var mainMenuSel = null;

window.onload = function () {
	mainMenuSel = document.getElementById('main-menu');
	headerHeight = document.getElementsByTagName('header')[0].clientHeight;
	
	mainMenuSel.innerHTML = menuCode;
	
	var activeLink = mainMenuSel.querySelector("a[href$='" + location.pathname.substring(location.pathname.lastIndexOf('/') + 1) + "']");
	if (activeLink != undefined) {
		activeLink.setAttribute("active", "");
		activeLink.removeAttribute("href");
	}
};

window.onscroll = function () {
	if (window.pageYOffset >= headerHeight) {
		mainMenuSel.setAttribute('style', 'position: fixed; margin-top: -' + headerHeight + 'px; width: calc(20% - 61px); min-width: 99px;');
	} else {
		mainMenuSel.removeAttribute('style');
	}
};