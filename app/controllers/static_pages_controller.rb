class StaticPagesController < ApplicationController
  before_action :check_login
  def root
  end
end
