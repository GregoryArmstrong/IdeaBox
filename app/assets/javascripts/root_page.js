$(document).ready(function(){
  queryAllIdeas();
  $('#submit_button').on('click', submitNewIdea);
  $('#search_field').keyup(searchListElements);
});

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
  }).done(function(){
    setListeners();
  });
};
