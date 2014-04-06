Entities = new Meteor.Collection('entities');

Entities.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});

Meteor.methods({
	addNewEntity: function(etypeID,styles){
		if(!etypeID){
			throw new Meteor.Error(401, "You need to specify a type ID");
		}
		if(!styles){
			throw new Meteor.Error(401, "Incorrect entity format");
		}		
		
		var entityID = Entities.insert({
					etypeID: etypeID,
					styles: styles
			       });
		return entityID;		
	}
});
