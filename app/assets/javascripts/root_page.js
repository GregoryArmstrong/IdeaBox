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
  clearIdeas();
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
    setEditIdeaListener();
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
    }
  }).done(function(){
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

function createEditButton(){
  return " <a href='#' class='edit_button'>Edit</a>";
}

function setEditIdeaListener(){
  $('.title_paragraph').click(submitEditedContent);
  $('.body_paragraph').click(submitEditedContent);
}

function submitEditedContent(){
  $('.title_paragraph, .body_paragraph').keydown(function(event) {
    var target_idea = $(this).parent();
    $('body').click(target_idea, sendAJAXPut);
    if (event.which == 13) {
      event.preventDefault();
      sendAJAXPut(target_idea);
    } else {
    }
  })
}

function sendAJAXPut(target_idea){
  $('body').unbind();
  if (target_idea['type'] == 'click') {
    var target = target_idea['data']
  } else {
    var target = target_idea
  };
  $.ajax({
    url: ("api/v1/ideas/" + target.attr('id')),
    type: "PUT",
    dataType: "json",
    data: { title: editedIdeaTitle(target),
            body: editedIdeaBody(target)
          },
    success: function(response){
      console.log('title / body edited success', response);
      queryAllIdeas();
    },
    error: function(xhr){
      console.log('title / body edited fail', xhr);
    }
  })
}

function editedIdeaTitle(idea){
  return idea.children().first().text();
}

function editedIdeaBody(idea){
  return idea.children().first().siblings().first().text();
}

function createListElements(ideas){
  ideas.forEach(function(idea){
    $("#list").append( $("<li id=" + idea.id + ">" + "Title: <p class='title_paragraph' contenteditable='true'> " + idea.title + "</p>  Body:<p class='body_paragraph' contenteditable='true'> " + setBody(idea.body) + "</p> <p class='quality_paragraph'>Quality: " + setQuality(idea.quality) + "</p>" + createEditButton() + createDeleteButton() + createThumbsUpButton() + createThumbsDownButton() + "</li>"));
  })
}

function createListElement(idea){
  $("#list").append( $("<li id=" + idea.id + ">" + "Title: <p class='title_paragraph' contenteditable='true'> " + idea.title + "</p> Body:<p class='body_paragraph' contenteditable='true'> " + setBody(idea.body) + "</p> <p class='quality_paragraph'>Quality: " + setQuality(idea.quality) + "</p>" + createEditButton() + createDeleteButton() + createThumbsUpButton() + createThumbsDownButton() + "</li>"));
  setDeleteListener();
  setThumbsUpListener();
  setThumbsDownListener();
}
