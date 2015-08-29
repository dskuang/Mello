json.extract!(
  board,
  :title,
  :user_id
)
json.lists do
  json.array! lists do |list|
      json.partial!("api/lists/list", list: list)
      json.cards do
        json.array! cards do |card|
          json.partial!("api/cards/card", card: card, list: list)
        end
      end
  end
end
