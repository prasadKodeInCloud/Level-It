//Adddin the Entity Types
if (ETypes.find().count() === 0) {
	ETypes.insert({ _id:"RECTANGLE", name:"rectangle", type:"RECTANGLE", isResizable:false, imageUrl:"", styles:{fill:'#E9F1FA', stroke:'#DBE2F0',strokeWidth: 2,opacity: 1,isDraggable:true,isLocked:true,xCells:2, yCells:1}});
	
	ETypes.insert({ _id:"RESIZABLE_RECTANGLE", name:"resizable rectangle", type:"RECTANGLE", isResizable:true, imageUrl:"", styles:{fill:'#E9F1FA', stroke:'#DBE2F0',strokeWidth: 2,opacity: 1,isDraggable:true,isLocked:true,xCells:2, yCells:1}});
	
	/*
	ETypes.insert({ _id:"CIRCLE", isResizable:false,  name:"circle", type:"CIRCLE", imageUrl:"", styles:{fill:'#E9F1FA', stroke:'#DBE2F0',strokeWidth: 2,opacity: 1,isDraggable:true,isLocked:true,xCells:2, yCells:1}});
		
	ETypes.insert({ _id:"RESIZABLE_CIRCLE", isResizable:true, name:"resizable circle", type:"CIRCLE", imageUrl:"", styles:{fill:'#E9F1FA', stroke:'#DBE2F0',strokeWidth: 2,opacity: 1,isDraggable:true,isLocked:true,xCells:2, yCells:1}});	
	*/
	
	ETypes.insert({_id:"LANTERN",type:"RECTANGLE", name:"lantern", isResizable:false, imageUrl:"../url", styles:{fill:'#D1E8FF', stroke:'#73ABFF',strokeWidth: 2,opacity: 1,isDraggable:true,isLocked:true,xCells:2, yCells:2}});
	
	ETypes.insert({_id:"BRICK",type:"RECTANGLE", name:"brick", isResizable:false, imageUrl:"../url", styles:{fill:'#FFE0D1', stroke:'#FF9966',strokeWidth: 2,opacity: 1,isDraggable:true,isLocked:true,xCells:3, yCells:1}});
	
	ETypes.insert({_id:"CHINESE_LANTERN",type:"RECTANGLE", name:"chinese lantern", isResizable:true, imageUrl:"../url", styles:{fill:'#FFCCFF', stroke:'#FF66FF',strokeWidth: 2,opacity: 1,isDraggable:true,isLocked:true,xCells:2, yCells:2}});
}

// Fixture data 
if (Posts.find().count() === 0) {
  var now = new Date().getTime();
  
  // create two users
  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
    profile: { name: 'Sacha Greif' }
  });
  var sacha = Meteor.users.findOne(sachaId);
  
  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    userId: sacha._id,
    author: sacha.profile.name,
    url: 'http://sachagreif.com/introducing-telescope/',
    submitted: now - 7 * 3600 * 1000,
    commentsCount: 2,
    upvoters: [], votes: 0
  });
  
  Comments.insert({
    postId: telescopeId,
    userId: tom._id,
    author: tom.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'Interesting project Sacha, can I get involved?'
  });
  
  Comments.insert({
    postId: telescopeId,
    userId: sacha._id,
    author: sacha.profile.name,
    submitted: now - 3 * 3600 * 1000,
    body: 'You sure can Tom!'
  });
  
  Posts.insert({
    title: 'Meteor',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://meteor.com',
    submitted: now - 10 * 3600 * 1000,
    commentsCount: 0,
    upvoters: [], votes: 0
  });
  
  Posts.insert({
    title: 'The Meteor Book',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://themeteorbook.com',
    submitted: now - 12 * 3600 * 1000,
    commentsCount: 0,
    upvoters: [], votes: 0
  });
  
  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title: 'Test post #' + i,
      author: sacha.profile.name,
      userId: sacha._id,
      url: 'http://google.com/?q=test-' + i,
      submitted: now - i * 3600 * 1000 + 1,
      commentsCount: 0,
      upvoters: [], votes: 0
    });
  }
}
