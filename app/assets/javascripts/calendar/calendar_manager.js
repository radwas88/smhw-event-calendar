function CalendarManager(calendar, createEventFormSelector) {
	let $form = $(createEventFormSelector);
	
	this.createEvent = function(eventData) {
		console.log(eventData);
		$.post(
			'/events', 
			eventData
		).done(function(data) {
			$form.find('input').val('');
		}).fail(function(error) {
			alert(error.responseText);
		});
	};

	$form.on('submit', (event) => {
		this.createEvent($(event.target).serialize());
		return false;
	});
};