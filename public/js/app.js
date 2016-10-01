'use strict';

var addCommentEvent = new Event('addComment');

var widget = {
	form: {},
	comments: {}
};

function Comment(username, text, when){
	if(this instanceof Comment){
		this.username = username;
		this.text = text;
		this.when = when || new Date();
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
	
	var domComment = this.createCommentDOM(newComment);
	this.widget.comments.root.appendChild(domComment);
};


var createCommentDOM = function(commentObject){
	let commentNode = document.createElement('DIV');
	commentNode.setAttribute('class', 'comment');

	let contentNode = document.createElement('DIV');
	contentNode.setAttribute('class', 'content');

	let imgDivNode = document.createElement('A');
	imgDivNode.setAttribute('class','avatar');
	let imgNode = document.createElement('IMG');
	imgNode.setAttribute('src','http://semantic-ui.com/images/avatar/small/jenny.jpg');
	imgDivNode.appendChild(imgNode);

	let authorNode = document.createElement('DIV');
	authorNode.setAttribute('class', 'author');
	authorNode.appendChild(document.createTextNode(commentObject.username));

	let metaNode = document.createElement('DIV');
	metaNode.setAttribute('class', 'metadata');
	let dateNode = document.createElement('SPAN');
	dateNode.appendChild(document.createTextNode(commentObject.when));	
	metaNode.appendChild(dateNode);

	let textNode = document.createElement('DIV');
	textNode.setAttribute('class', 'text');
	textNode.appendChild(document.createTextNode(commentObject.text));	


	contentNode.appendChild(metaNode);
	contentNode.appendChild(authorNode);
	contentNode.appendChild(textNode);
	commentNode.appendChild(imgDivNode);
	commentNode.appendChild(contentNode);
	return commentNode;
}


var storeComment = function(comment){
	if(this.hasBrowserSupport){
		let comments = JSON.parse(localStorage.getItem('comments')) || [];
		comments.push(comment);
		localStorage.setItem('comments', JSON.stringify(comments));
	}
};

var fetchAllComments = function(){
	if(this.hasBrowserSupport){
		let self = this;
		let comments = JSON.parse(localStorage.getItem('comments')) || [];
		self.widget.comments.root.innerHTML = '';
		comments.forEach(function(el){
			let commentDom = createCommentDOM(el);
			self.widget.comments.root.appendChild(commentDom);
		});
	}
}

widget.root = document.getElementById('comments-widget');	

widget.form.root = widget.root.getElementsByTagName('form');
widget.form.username = findByAttributeValue('input','name', 'username');
widget.form.comment = findByAttributeValue('input','name', 'comment');

widget.comments.root = document.getElementById('comments');
attachHandlers.call(this);
fetchAllComments.call(this);





