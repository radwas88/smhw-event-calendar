class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
    	t.date :start_date, null: false
    	t.date :end_date, null: false
    	t.string :title
      t.timestamps null: false
    end
  end
end
