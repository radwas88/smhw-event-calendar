function Event(title, bgColor) {
	this.render = function() {
		return '<div class="event" style="background: ' + bgColor + '">' + title + '</div>';
	};
};