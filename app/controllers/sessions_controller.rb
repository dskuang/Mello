class SessionsController < ApplicationController
  def new

  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    if @user
      login(@user)
      redirect_to user_url(@user)
    else
      flash[:errors] = ["Invalid Login"]
      render :new
    end
  end

  def destroy

    current_user.reset_session_token
    logout
    redirect_to new_session_url
  end
end
