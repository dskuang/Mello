json.partial! 'board', board: @board, lists: @lists, cards: @cards

#
# @lists.each do |list|
#   # debugger
#   json.partial!("api/lists/list", :list => list)
#   # json.list cards do |card|
#   #   json.partial!("api/cards/card", :card => card)
#   # end
# end
