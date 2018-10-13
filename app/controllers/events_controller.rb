class EventsController < ApplicationController
	def index
	end

	def create
		event = Event.new(event_data)
		if event.valid?
			event.save
			return render :json => true
		else
			return render :json => event.errors.full_messages.join(', '), :status => 400
		end
	end

	def event_data
		params.require(:event).permit(:start_date, :end_date, :title)
	end
end