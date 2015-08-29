class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title
      t.integer :list_id
      t.integer :ord
      t.text :description
      t.timestamps null: false
    end
  end
end
