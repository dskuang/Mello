if list.id == card.list_id
  json.extract!(card, :id, :title, :list_id, :ord)
end
