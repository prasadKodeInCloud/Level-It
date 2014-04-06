Levels = new Meteor.Collection('levels');

Levels.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});

Meteor.methods({
	addNewLevel: function(name,projectID,style){
		var user = Meteor.user();
				
		if(!user){
			throw new Meteor.Error(401, "You need to login to add new projects");
		}
		if(!name){
			throw new Meteor.Error(401, "You need to put a name for the project");
		}
		
		var projectExist = Projects.findOne({
					_id: projectID
				   });
		if(!projectExist){
			throw new Meteor.Error(401, "No such project yo!");
		}		 
		
		
		var levelID = Levels.insert({
					name: name,
					projectID: projectID,
					style: style
				});
		return levelID;
	}
});
