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

	def list
		start_date = params[:start_date]
		end_date = params[:end_date]
		where = [
			'(DATE(start_date) >= ? AND ? <= DATE(end_date))',
			'(DATE(start_date) >= ? AND ? <= DATE(end_date))',
			'(DATE(start_date) >= ? AND ? >= DATE(end_date))'
		]
		events = Event.where(where.join(' OR '), start_date, start_date, end_date, end_date, start_date, end_date)
		return render :json => events
	end

	def event_data
		params.require(:event).permit(:start_date, :end_date, :title)
	end
end