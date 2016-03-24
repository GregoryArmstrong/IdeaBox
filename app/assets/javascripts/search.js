function searchListElements(){
  var search_term = $('#search_field').val();
  searchMatch(search_term);
};

function searchMatch(search_term){
  var list_items = $('.list_item').toArray();
  list_items.forEach(function(item){
    var title = $(item).children().first().text();
    var body = $(item).children().first().siblings().first().text();
    hideCriteria(search_term, item, title, body);
    showCriteria(search_term, item, title, body);
  });
};

function hideCriteria(search_term, item, title, body){
  if (title.indexOf(search_term) == -1) {
    item.style.display="none";
  } else if (body.indexOf(search_term) == -1) {
    item.style.display="none";
  }
}

function showCriteria(search_term, item, title, body){
  if (title.indexOf(search_term) !== -1) {
    item.style.display="inline";
  } else if (body.indexOf(search_term) !== -1) {
    item.style.display="inline";
  }
}
