Meteor.subscribe('projects');
Meteor.subscribe('comments');

Template.projectsList.helpers({
	listAllProjects: function(){
		var user = Meteor.user();
		
		if(!user){
			//handling error
		}
		return Projects.find({ 
				userID: user._id
			 });
	}
});

Template.projectsNew.events({
   'submit form': function(e) {
    e.preventDefault();
    
    var name = $(e.target).find('[name=name]').val();
    var desc = $(e.target).find('[name=desc]').val();
    
    Meteor.call('addNewProject', name,desc, function(error, id) {
      if (error) {
         Router.go('projectsList')
      } else {
        Router.go('projectsList');
      }
    });
  }
	
});

Template.projectView.helpers({
	getProjectDetails: function(){
		return Projects.find({
				_id: this.pid
			});
	},
	comments: function() {
	    return Comments.find({postId: this._id});
	}
});
