(function(){
Template.__define__("postPage", (function() {
  var self = this;
  var template = this;
  return [ Spacebars.include(self.lookupTemplate("postItem")), "\n  \n  ", HTML.UL({
    "class": "comments"
  }, "\n    ", UI.Each(function() {
    return Spacebars.call(self.lookup("comments"));
  }, UI.block(function() {
    var self = this;
    return [ "\n      ", Spacebars.include(self.lookupTemplate("comment")), "\n    " ];
  })), "\n  "), "\n  \n  ", UI.If(function() {
    return Spacebars.call(self.lookup("currentUser"));
  }, UI.block(function() {
    var self = this;
    return [ "\n    ", Spacebars.include(self.lookupTemplate("commentSubmit")), "\n  " ];
  }), UI.block(function() {
    var self = this;
    return [ "\n    ", HTML.P("Please log in to leave a comment."), "\n  " ];
  })) ];
}));

})();
