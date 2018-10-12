function CalendarRenderer(calendar, calendarDomObject) {
	this.render = function() {
		calendar.clearContent();
		calendar.days.forEach((day) => calendarDomObject.append(day.render()));
	}
};

function Calendar(domElement, dayTemplate, eventTemplate) {
	this.startDate = moment();
	this.days = [];
	this.renderer = new CalendarRenderer(this, domElement);

	this.generateCalendarDays = function() {
		let dateFromWhichStart = moment(this.startDate);
		this.days = [];
		for (let i=0; i<7; i++) {
			let date = dateFromWhichStart.add(1, 'days');
			let day = new Day(date, dayTemplate, eventTemplate);
			day.addEvent('x');
			this.days.push(day);
		}
	};

	this.render = function() {
		this.renderer.render();
	};

	this.clearContent = function() {
		domElement.html('');
	};
	
	this.generateCalendarDays();
};