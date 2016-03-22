$(document).ready(function(){
  queryAllIdeas();
  $('#submit_button').on('click', submitNewIdea);
});

function deleteListElement(){
  var target_line = $(this).parent()
  $.ajax({
    url: ("api/v1/ideas/" + target_line.attr('id')),
    type: "DELETE",
    dataType: 'json',
    success: function(response){
      console.log('delete success', response);
    },
    error: function(xhr){
      console.log('fail', xhr);
    }
  }).done(function(){
    target_line.remove();
  })
};

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
  }).done(function() {
    $('.delete_button').on('click', deleteListElement)
  })
}

function setQuality(quality){
  switch (quality) {
    case 1: return "Swill";
      break;
    case 2: return "Plausible";
      break;
    case 3: return "Genius";
      break;
  }
}

function setBody(body){
  return body.substring(0, 99);
}

function createListElements(ideas){
  ideas.forEach(function(idea){
    $("#list").append( $("<li id=" + idea.id + ">" + "Title: " + idea.title + " Body: " + setBody(idea.body) + " Quality: " + setQuality(idea.quality) + "<a href='#' class='delete_button'>Delete</a></li>"));
  })
}

function createListElement(idea){
  $("#list").append( $("<li id=" + idea.id + ">" + "Title: " + idea.title + " Body: " + setBody(idea.body) + " Quality: " + setQuality(idea.quality) + "<a href='#' class='delete_button'>Delete</a></li>"));
  $('.delete_button').on('click', deleteListElement);
}
