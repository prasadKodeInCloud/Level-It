Test = new Meteor.Collection('tests');

if(Meteor.isClient){
	Deps.autorun(function(){
		Meteor.subscribe('gtest',function(){
			Test.find().observe({
				added: function(item){
						console.log(item.name);
						//alert(item.name);
					},
				changed: function(nitem,oitem){
						console.log(nitem.name + " from " + oitem.name);
					}
			});
		});
	});
}

if(Meteor.isServer){
	Meteor.publish('gtest',function(){
		return Test.find();
	});
}
