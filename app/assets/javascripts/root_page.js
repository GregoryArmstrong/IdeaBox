$(document).ready(function(){
  queryAllIdeas();
})

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
