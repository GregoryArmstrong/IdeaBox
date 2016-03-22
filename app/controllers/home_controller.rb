class HomeController < ApplicationController

  def index
    @idea = Idea.new
  end

end
