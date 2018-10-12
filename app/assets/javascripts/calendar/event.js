function Event(title, $template) {
	this.render = function() {
		return $template.html();
	};
};