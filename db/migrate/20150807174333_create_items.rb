class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :card_id
      t.string :title
      t.boolean :done?
      t.timestamps null: false
    end
  end
end
