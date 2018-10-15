function CalendarManager(calendar, createEventFormSelector) {
	let $form = $(createEventFormSelector);
	
	function splitEventToCalendarEvents(eventObject) {
		let startDate = moment(calendar.startDate);
		let events = [];
		for (let i=0; i<7; i++) {
			if (moment(startDate) >= moment(eventObject.start_date)
				&& moment(startDate) <= moment(eventObject.end_date)) {
				events.push({date: moment(startDate), title: eventObject.title});
			}
			startDate.add(1, 'days');
		}
		return events;
	};

	this.createEvent = function(eventData) {
		$.post(
			'/events', 
			eventData
		).done(function(data) {
			$form.find('input').val('');
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
					calendar.addEvent(calEvent.date, calEvent.title);
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