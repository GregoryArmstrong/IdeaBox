$(document).ready(function(){
  queryAllIdeas();
  $('#submit_button').on('click', submitNewIdea)
})

function submitNewIdea(){
  $.ajax({
    url: "api/v1/ideas",
    type: "POST",
    data: { title: ideaTitle(),
            body: ideaBody()
          },
    success: function(response){
      console.log('success', response);
      createListElement(response);
      clearForm();
    },
    error: function(xhr){
      console.log('fail', xhr);
    }
  })
};

function clearForm(){
  $('#idea_title').val("")
  $('#idea_body').val("")
}

function ideaTitle(){
  return $('#idea_title').val()
}

function ideaBody(){
  return $('#idea_body').val()
}

function queryAllIdeas(){
  $.ajax({
    url: "api/v1/ideas",
    type: "GET",
    dataType: "json",
    success: function(response){
      console.log('success', response);
      createListElements(response);
    },
    error: function(xhr){
      console.log('fail', xhr);
    }
  })
}

function createListElements(ideas){
  ideas.forEach(function(idea){
      $("#list").append( $("<li>" + "Title: " + idea.title + " Body: " + idea.body + " Quality: " + idea.quality + "</li>"));
  })
}

function createListElement(idea){
  $("#list").append( $("<li>" + "Title: " + idea.title + " Body: " + idea.body + " Quality: " + idea.quality + "</li>"));
}
