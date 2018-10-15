function Event(title, $template) {
	this.render = function() {
		$template.find('.event').html('x');
		console.log($template);
		return $template.html();
	};
};