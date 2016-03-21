require 'rails_helper'

RSpec.describe Api::V1::IdeasController, type: :controller do
  describe "can view ideas" do
    scenario "views idea index" do
      idea = Idea.create(title: "test_title",
                         body: "test_body",
                         quality: 1)
      idea_2 = Idea.create(title: "test_title_2",
                           body: "test_body_2",
                           quality: 2)

      get :index, format: :json

      expect(response.status).to eq(200)
      expect(response.content_type).to eq "application/json"

      body = JSON.parse(response.body)

      expect(body[0]["title"]).to eq "test_title"
      expect(body[0]["body"]).to eq "test_body"
      expect(body[0]["quality"]).to eq 1
      expect(body[1]["title"]).to eq "test_title_2"
      expect(body[1]["body"]).to eq "test_body_2"
      expect(body[1]["quality"]).to eq 2
    end
  end
end
