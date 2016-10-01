'use strict';

var addCommentEvent = new Event('addComment');

var widget = {
	form: {},
	comments: {}
};

function Comment(username, text){
	if(this instanceof Comment){
		this.username = username;
		this.test = text;
		return this;
	}
	else {
		return new Comment(username, text);
	}
};

var attachHandlers = function(widgetRoot){
	widget.root.onsubmit = submitHandler.bind(this);
	widget.comments.root.addEventListener('addComment', addCommentHandler.bind(this));
};

var hasBrowserSupport = function(widgetRoot){
	// Check browser support
	if (typeof(Storage) !== "undefined") {
		return true;
	} else {
		widgetRoot.innerHTML = "Sorry, your browser does not support Web Storage...";
		return false;
	}
};

var findByAttributeValue = function (element, attribute, value)    {
  var All =  document.getElementsByTagName( element ||'*');
  for (var i = 0; i < All.length; i++)       {
    if (All[i].getAttribute(attribute) == value) { return All[i]; }
  }
}

var submitHandler = function(event){
	event.preventDefault();
	this.widget.comments.root.dispatchEvent(addCommentEvent);
};

var addCommentHandler = function(event){
	var newComment = new Comment(this.widget.form.username.value, this.widget.form.comment.value);
	this.storeComment.call(this, newComment);
	this.widget
};

var storeComment = function(comment){
	if(this.hasBrowserSupport){
		let comments = JSON.parse(localStorage.getItem('comments')) || [];
		comments.push(comment);
		localStorage.setItem('comments', JSON.stringify(comments));
		console.log(comments);
	}
};

widget.root = document.getElementById('comments-widget');	

widget.form.root = widget.root.getElementsByTagName('form');
widget.form.username = findByAttributeValue('input','name', 'username');
widget.form.comment = findByAttributeValue('input','name', 'comment');

widget.comments.root = document.getElementById('comments');
attachHandlers.call(this);






