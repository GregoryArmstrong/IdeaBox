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
    setDeleteListener();
    setThumbsUpListener();
    setThumbsDownListener();
  })
}
function changeQuality(event){
  var target_idea = $(this).parent();
  $.ajax({
    url: ("api/v1/ideas/" + target_idea.attr('id')),
    type: "PUT",
    dataType: "json",
    data: { quality: event.data.change },
    success: function(response){
      console.log('update success', response);
    },
    error: function(xhr){
      console.log('update fail', xhr);
      alert("Unable to change quality higher than Genius or lower than Swill");
    }
  }).done(function(){
    clearIdeas();
    queryAllIdeas();
  })
}

function clearIdeas(){
  $('#list').children().remove();
}

function setThumbsUpListener(){
  $('.thumbs_up_button').click({ change: 1 }, changeQuality);
}

function setThumbsDownListener(){
  $('.thumbs_down_button').click({ change: -1 }, changeQuality);
}

function setDeleteListener(){
  $('.delete_button').on('click', deleteListElement);
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

function createDeleteButton(){
  return " <a href='#' class='delete_button'>Delete</a>";
}

function createThumbsUpButton(){
  return " <a href='#' class='thumbs_up_button'>Thumbs Up</a>";
}

function createThumbsDownButton(){
  return " <a href='#' class='thumbs_down_button'>Thumbs Down</a>";
}

function createListElements(ideas){
  ideas.forEach(function(idea){
    $("#list").append( $("<li id=" + idea.id + ">" + "Title: " + idea.title + " Body: " + setBody(idea.body) + " Quality: " + setQuality(idea.quality) + createDeleteButton() + createThumbsUpButton() + createThumbsDownButton() + "</li>"));
  })
}

function createListElement(idea){
  $("#list").append( $("<li id=" + idea.id + ">" + "Title: " + idea.title + " Body: " + setBody(idea.body) + " Quality: " + setQuality(idea.quality) + createDeleteButton() + createThumbsUpButton() + createThumbsDownButton() + "</li>"));
  setDeleteListener();
  setThumbsUpListener();
  setThumbsDownListener();
}
