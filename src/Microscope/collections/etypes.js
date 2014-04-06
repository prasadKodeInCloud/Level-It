ETypes = new Meteor.Collection('etypes');

ETypes.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});

