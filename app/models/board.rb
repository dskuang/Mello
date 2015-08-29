class Board < ActiveRecord::Base
  has_many :lists
  belongs_to :user
  has_many :cards, through: :lists, source: :cards
end
