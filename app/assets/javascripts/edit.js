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
    clearIdeas();
    queryAllIdeas();
  })
};

function submitEditedContent(){
  $('.title_paragraph, .body_paragraph').keydown(function(event) {
    var target_idea = $(this).parent();
    if (event.which == 13) {
      event.preventDefault();
      sendAJAXPut(target_idea);
    } else {
    };
    $('#list').click(target_idea, sendAJAXPut);
  });
};

// start here on thursday morning
function sendAJAXPut(target_idea){
  if (target_idea['type'] == "click") {
    var target = target_idea['data'];
  } else {
    var target = target_idea;
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
      $('#list').unbind('click');
    },
    error: function(xhr){
      console.log('title / body edited fail', xhr);
    }
  });
};

function editedIdeaTitle(idea){
  return idea.children().first().text();
};

function editedIdeaBody(idea){
  return idea.children().first().siblings().first().text();
};
