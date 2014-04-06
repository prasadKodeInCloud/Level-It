Projects = new Meteor.Collection('projects');

Projects.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});

Meteor.methods({
	addNewProject: function(name,desc){
		var user = Meteor.user();
		
		if(!user){
			throw new Meteor.Error(401, "You need to login to add new projects");
		}
		if(!name){
			throw new Meteor.Error(401, "You need to put a name for the project");
		}
		
		
		var projectID = Projects.insert({
					name: name,
					desc: desc,
					userID: user._id
				});
		return projectID;
	},
	getProjects: function(){
		var user = Meteor.user();
		return Projects.find({
				userID: user._id
			});
	}
});

