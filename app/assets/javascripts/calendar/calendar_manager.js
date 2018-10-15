function CalendarManager(calendar, createEventFormSelector) {
	let $form = $(createEventFormSelector);
	function randBackgroundColor() {
		return '#' + Math.floor(Math.random()*16777215).toString(16);
	}

	function splitEventToCalendarEvents(eventObject) {
		let startDate = moment(calendar.startDate);
		let events = [];
		let backgroundColor = randBackgroundColor();
		for (let i=0; i<7; i++) {
			if (moment(startDate).isSameOrAfter(moment(eventObject.start_date), 'day')
				&& moment(startDate).isSameOrBefore(moment(eventObject.end_date), 'day')) {
				events.push({date: moment(startDate), bgColor: backgroundColor, title: eventObject.title});
			}
			startDate.add(1, 'days');
		}
		return events;
	};

	this.createEvent = function(eventData) {
		let self = this;
		$.post(
			'/events', 
			eventData
		).done(function(data) {
			$form.find('input').val('');
			self.loadEvents();
		}).fail(function(error) {
			alert(error.responseText);
		});
	};

	this.loadEvents = function() {		
		$.post('/events/list', {
			start_date: calendar.startDate.format(DATE_FORMAT),
			end_date: calendar.endDate.format(DATE_FORMAT)
		}).done(function(events) {
			calendar.clear();
			events.forEach((event) => {
				let splittedEvents = splitEventToCalendarEvents(event);
				splittedEvents.forEach((calEvent) => {					
					calendar.addEvent(calEvent.date, calEvent.title, calEvent.bgColor);
				});
			});
			calendar.render();
		}).fail(function(error) {
			alert(error.responseText);
		});
	};

	$form.on('submit', (event) => {
		this.createEvent($(event.target).serialize());
		return false;
	});
};