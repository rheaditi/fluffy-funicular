'use strict';

var addComment = new Event('addComment');

var widget = {
	form: {},
	comments: {}
};

var attachHandlers = function(){
	this.widget.root.onsubmit = submitHandler;
	this.widget.comment.root.addEventListener('addComment', this.addCommentHandler);
};

var checkBrowserSupport = function(widgetRoot){
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
	// Event {isTrusted: true, type: "submit", target: form, currentTarget: div#comments-widget, eventPhase: 3…}
	this.widget.comments.root.dispatchEvent(addComment);
};

var addCommentHandler = function(event){
	console.log(event);
	cosole.log('trying to add a comment');
};

widget.root = document.getElementById('comments-widget');

widget.form.root = widget.root.getElementsByTagName('form');
widget.comments.root = document.getElementById('comments');
console.log(widget.comments.root)
widget.form.username = findByAttributeValue('input','name', 'username');
widget.form.comment = findByAttributeValue('input','name', 'comment');


attachHandlers.call(this);






