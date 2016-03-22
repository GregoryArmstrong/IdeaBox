class Api::V1::IdeasController < Api::ApiController

  respond_to :json

  def index
    respond_with Idea.all
  end

  def create
    @idea = Idea.create(title: params["title"],
                        body: params["body"]
                       )

    respond_with(@idea, :status => :created, :location => api_v1_ideas_path)
  end

  def update
    @idea = Idea.find(params[:id])
    @idea.quality += params[:quality].to_i
    @idea.save
    respond_with(@idea, :status => :success)
  end

  def destroy
    @idea = Idea.find(params[:id])
    @idea.destroy
    respond_with @idea do |format|
      format.js { head :ok }
    end
  end

end
