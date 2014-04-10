ETypes = new Meteor.Collection('etypes');

ETypes.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});

Meteor.methods({
	addNewEntityType: function(entityTypeID,entityName,entityType,projectID,params){
		var etypeExists = ETypes.findOne({
				  	_id: entityTypeID
				  });
		if(etypeExists){
			throw new Meteor.Error(401, "That ID already exists");
		}
		
		return ETypes.insert({
			_id: entityTypeID,
			name: entityName,
			type: entityType,
			projectID:projectID,
			isResizable: params.isResizable,
			imageUrl: params.imageUrl,
			styles: params.styles
		});		
		
	}
});
