class Api::ListsController < ApplicationController
  def show
    # @list = List.find(params[:id])
    @cards = @list.cards

  end

  def create
    @list = List.new(list_params)
    if @list.save
      render :json => @list
    else
      render :json => @list.errors.full_messages, :status => 422
    end
  end

  def update
    @list = List.find(params[:id])
    if @list.update_attributes(list_params)
      render "show"
    else
      render :json => @list.errors.full_messages, :status => 422
    end
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy if @list
    render :json => {}
  end

  def list_params
    params.require(:list).permit(:board_id, :title, :ord)
  end
end
