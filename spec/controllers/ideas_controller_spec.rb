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

  describe "can create ideas" do
    scenario "create idea" do
      post :create, format: :json, title: "testing titles", body: "testing bodies!"

      expect(response.status).to eq(201)
      expect(response.content_type).to eq "application/json"

      body = JSON.parse(response.body)

      expect(body["title"]).to eq "testing titles"
      expect(body["body"]).to eq "testing bodies!"
      expect(body["quality"]).to eq 1
    end
  end

  describe "can delete ideas" do
    scenario "delete idea" do
      idea = Idea.create(title: "test_title",
                         body: "test_body",
                         quality: 1)

      delete :destroy, format: :json, id: idea.id

      expect(response.status).to eq(204)
      expect(response.content_type).to eq "application/json"

      expect(Idea.count).to eq 0
    end
  end

  describe "can edit ideas" do
    scenario "update idea title/body" do
      idea = Idea.create(title: "test_title",
                         body: "test_body",
                         quality: 1)

      put :update, format: :json, id: idea.id, title: "new title", body: "new body"

      expect(response.status).to eq(204)
      expect(response.content_type).to eq "application/json"

      expect(Idea.first.title).to eq "new title"
      expect(Idea.first.body).to eq "new body"
    end

    scenario "doesnt update quality integer higher than 3 or lower than 1" do
      idea = Idea.create(title: "test_title",
                         body: "test_body",
                         quality: 3)

      put :update, format: :json, id: idea.id, quality: 1

      expect(response.status).to eq(204)
      expect(response.content_type).to eq "application/json"

      expect(Idea.first.quality).to eq 3

      idea.quality = 1
      idea.save

      put :update, format: :json, id: idea.id, quality: -1

      expect(response.status).to eq(204)
      expect(response.content_type).to eq "application/json"

      expect(Idea.first.quality).to eq 1
    end

    scenario "correctly updates quality integer with valid conditions" do
      idea = Idea.create(title: "test_title",
                         body: "test_body",
                         quality: 1)

      put :update, format: :json, id: idea.id, quality: 1

      expect(response.status).to eq(204)
      expect(response.content_type).to eq "application/json"

      expect(Idea.first.quality).to eq 2
    end
  end

end
