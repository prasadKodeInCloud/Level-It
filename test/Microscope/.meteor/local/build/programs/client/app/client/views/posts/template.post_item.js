(function(){
Template.__define__("postItem", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "post"
  }, "\n    ", HTML.A({
    href: "#",
    "class": [ "upvote btn ", function() {
      return Spacebars.mustache(self.lookup("upvotedClass"));
    } ]
  }, "⬆"), "\n    ", HTML.DIV({
    "class": "post-content"
  }, "\n      ", HTML.H3(HTML.A({
    href: function() {
      return Spacebars.mustache(self.lookup("url"));
    }
  }, function() {
    return Spacebars.mustache(self.lookup("title"));
  }), HTML.SPAN(function() {
    return Spacebars.mustache(self.lookup("domain"));
  })), "\n      ", HTML.P("\n        ", function() {
    return Spacebars.mustache(self.lookup("pluralize"), self.lookup("votes"), "Vote");
  }, ",\n        submitted by ", function() {
    return Spacebars.mustache(self.lookup("author"));
  }, ",\n        ", HTML.A({
    href: function() {
      return Spacebars.mustache(self.lookup("pathFor"), "postPage");
    }
  }, function() {
    return Spacebars.mustache(self.lookup("pluralize"), self.lookup("commentsCount"), "comment");
  }), "\n        ", UI.If(function() {
    return Spacebars.call(self.lookup("ownPost"));
  }, UI.block(function() {
    var self = this;
    return HTML.A({
      href: function() {
        return Spacebars.mustache(self.lookup("pathFor"), "postEdit");
      }
    }, "Edit");
  })), "\n      "), "\n    "), "\n    ", HTML.A({
    href: function() {
      return Spacebars.mustache(self.lookup("pathFor"), "postPage");
    },
    "class": "discuss btn"
  }, "Discuss"), "\n  ");
}));

})();
