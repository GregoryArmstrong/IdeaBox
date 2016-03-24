require 'rails_helper'

RSpec.feature "IdeaIndices", type: :feature do
  scenario "guest can see ideas on index" do
    idea = Idea.create(title: "test 1 title",
                       body: "test 1 body",
                       quality: 1)
    idea_2 = Idea.create(title: "test_title_2",
                         body: "test_body_2",
                         quality: 2)

    visit root_path

    expect(page).to have_content("Ideas Index")
    expect(page).to have_content(idea.title)
    expect(page).to have_content(idea.body)
    expect(page).to have_content("Swill")
    expect(page).to have_content(idea_2.title)
    expect(page).to have_content(idea_2.body)
    expect(page).to have_content("Plausible")
  end
end
