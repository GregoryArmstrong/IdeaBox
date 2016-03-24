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
      console.log('delete fail', xhr);
    }
  }).done(function(){
    target_line.remove();
  })
};

function clearIdeas(){
  $('#list').children().remove();
};
