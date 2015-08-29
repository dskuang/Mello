class Api::BoardsController < ApplicationController
  def index
    @boards = Board.all
    render :json => @boards
  end

  def show

    @board = Board.includes(:lists, :cards).find(params[:id]);
    @lists = @board.lists.order(:ord)
    @cards = @board.cards.order(:ord)
    render "show"
  end

  def create
    @board = Board.new(board_params)
    if @board.save
      render :json => @board
    else
      render :json => @board.errors.full_messages, :status => 422
    end
  end


  def update
   @board = Board.find(params[:id])
   if @board.update_attributes(board_params)
     render :json => @board
   else
     render :json => @board.errors.full_messages, :status => 422
   end
 end

 def destroy
   @board = Board.find(params[:id])
   @board.destroy if @board
   render :json => {}
 end

  def board_params
    params.require(:board).permit(:title)
  end
end
