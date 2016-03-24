function setListeners(){
  setDeleteListener();
  setThumbsUpListener();
  setThumbsDownListener();
  setEditIdeaListener();
};

function setDeleteListener(){
  $('.delete_button').on('click', deleteListElement);
};

function setThumbsUpListener(){
  $('.thumbs_up_button').click({ change: 1 }, changeQuality);
};

function setThumbsDownListener(){
  $('.thumbs_down_button').click({ change: -1 }, changeQuality);
};

function setEditIdeaListener(){
  $('.title_paragraph').click(submitEditedContent);
  $('.body_paragraph').click(submitEditedContent);
};
