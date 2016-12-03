(function(){
	var menuIcon = document.querySelector("#menuIcon"),
		sidebar = document.querySelector(".sidebarWrapper");
		
	var openSidebar = function() {
		sidebar.classList.toggle("open");
		setTimeout(function() {sidebar.classList.toggle("visible");}, 200);
		menuIcon.classList.toggle("open");
	}
	
	var closeSidebar = function() {
		sidebar.classList.toggle("visible");
		setTimeout(function() {sidebar.classList.toggle("open");}, 200);
		menuIcon.classList.toggle("open");
	}
	
	menuIcon.addEventListener("click", function(e) {
		if (!e) var e = window.event
    		e.cancelBubble = true;
    	if (e.stopPropagation) 
    		e.stopPropagation()
    	openSidebar();
	});
	
	window.addEventListener("click", function(){
    	if (sidebar.classList.contains("open") && (window.innerWidth > 960)) {
    		closeSidebar();
    	}
	});
	
	function logout () {
        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', window.location.origin + "/logout");
        form.style.display = 'hidden';
        document.body.appendChild(form)
        form.submit();
    }
})();