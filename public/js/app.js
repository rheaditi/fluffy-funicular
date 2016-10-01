'use strict';

var widget = {
	form: {},
	comments: {}
};

var attachHandlers = function(widgetRoot){
	widget.root.onsubmit = submitHandler;
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
	this.
} 

widget.root = document.getElementById('comments-widget');

widget.form.root = widget.root.getElementsByTagName('form');
widget.form.username = findByAttributeValue('input','name', 'username');
widget.form.comment = findByAttributeValue('input','name', 'comment');

widget.comments.root = widget.root.getElementById('comments');
attachHandlers.call(this);






