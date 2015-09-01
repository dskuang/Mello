json.array!(@cards.order(:ord)) do |card|
  json.(card, :id, :title, :list_id, :ord)
end
