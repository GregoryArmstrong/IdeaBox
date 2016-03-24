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
  }).done(function(){
      setListeners();
  });
};

function createListElements(ideas){
  var formatted_elements = ideas.map(function(idea){
    return formatElement(idea);
  });
  $('#list').append(formatted_elements.join(" "));
};

function createListElement(idea){
  $("#list").append(formatElement(idea));
};

function formatElement(idea){
  return (setListItem(idea.id) +
          setTitle() +
          truncateText(idea.title) +
          setBody() +
          truncateText(idea.body) +
          setQuality() +
          formatQuality(idea.quality) +
          createDeleteButton() +
          createThumbsUpButton() +
          createThumbsDownButton() +
          setEndTags());
};

function setEndTags(){
  return "</li><br>";
};

function setQuality(){
  return "</p> <p class='quality_paragraph'>Quality: ";
};

function setBody(){
  return "</p>  Body:<p class='body_paragraph' contenteditable='true'> ";
};

function setTitle(){
  return "Title: <p class='title_paragraph' contenteditable='true'> ";
};

function setListItem(id){
  return ("<li class='list_item' id=" + id + ">");
};

function ideaTitle(){
  return $('#idea_title').val()
};

function truncateText(body){
  return body.substring(0, 99);
};

function formatQuality(quality){
  switch (quality) {
    case 1: return "Swill </p>";
      break;
    case 2: return "Plausible </p>";
      break;
    case 3: return "Genius </p>";
      break;
  }
};

function ideaBody(){
  return $('#idea_body').val()
};

function clearForm(){
  $('#idea_title').val("");
  $('#idea_body').val("");
};

function createDeleteButton(){
  return " <a href='#' class='delete_button'>Delete</a>";
};

function createThumbsUpButton(){
  return " <a href='#' class='thumbs_up_button'>Thumbs Up</a>";
};

function createThumbsDownButton(){
  return " <a href='#' class='thumbs_down_button'>Thumbs Down</a>";
};
