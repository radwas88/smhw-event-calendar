function DayRenderer(day, templateDomElement) {
	let $template = $(templateDomElement.html()).clone();
	let $eventsContainer = $template.find('.day-events-container');

	this.render = function() {
		$template.find('.name').text(day.dayName);
		$template.find('.date').text(day.shortDate);
		day.events.forEach((event) => {
			$eventsContainer.append(event.render());
		});
		return $template;
	};
};

function Day(date, templateDomElement, eventTemplateElement) {
	this.date = date;
	this.dayName = this.date.format("dddd");
	this.shortDate = this.date.format("Do MMM");
	this.events = [];
	this.renderer = new DayRenderer(this, templateDomElement);

	this.render = function() {		
		return this.renderer.render();
	};
	this.addEvent = function(title) {
		let event = new Event(title, $(eventTemplateElement));
		this.events.push(event);
	};
};