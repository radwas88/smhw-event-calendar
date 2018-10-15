function CalendarRenderer(calendar, calendarDomObject) {
	this.render = function() {
		calendar.clearContent();
		calendar.days.forEach((day) => calendarDomObject.append(day.render()));
	}
};

function Calendar(domElement, dayTemplate, eventTemplate) {
	this.startDate = moment();
	this.endDate = moment(this.startDate).add(7, 'days');
	this.days = [];
	this.renderer = new CalendarRenderer(this, domElement);

	this.generateCalendarDays = function() {
		let dateFromWhichStart = moment(this.startDate);
		this.days = [];
		for (let i=0; i<7; i++) {
			let day = new Day(moment(dateFromWhichStart), dayTemplate, eventTemplate);
			this.days.push(day);
			dateFromWhichStart.add(1, 'days');
		}
	};

	this.clear = function() {
		this.generateCalendarDays();
	};

	this.addEvent = function(date, eventObject) {
		this.days.forEach((calendarDay) => {
			if (calendarDay.date.isSame(date)) {				
				calendarDay.addEvent(eventObject.title);
			}
		});
	};

	this.render = function() {
		this.renderer.render();
	};

	this.clearContent = function() {
		domElement.html('');
	};
	
	this.generateCalendarDays();
};