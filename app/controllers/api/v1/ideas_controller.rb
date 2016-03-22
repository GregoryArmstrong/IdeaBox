class Api::V1::IdeasController < Api::ApiController

  respond_to :json

  def index
    respond_with Idea.all
  end

  def create
    idea = Idea.create(title: params["title"],
                        body: params["body"]
                       )
    respond_with :api, :v1, idea
  end

  def update
    idea = Idea.find(params[:id])
    if ((idea.quality + params[:quality].to_i) > 3) || ((idea.quality + params[:quality].to_i) < 1 )
      respond_with nil
    else
      idea.quality += params[:quality].to_i
      idea.save

      respond_with :api, :v1, idea
    end
  end

  def destroy
    idea = Idea.find(params[:id])
    idea.destroy

    respond_with :api, :v1, idea
  end

end
