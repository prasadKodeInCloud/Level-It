(function(){
Template.__define__("postItem", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "post"
  }, "\n       ", HTML.DIV({
    "class": "post-content"
  }, "\n      ", HTML.H3(HTML.A({
    href: function() {
      return Spacebars.mustache(self.lookup("pathFor"), "postPage");
    }
  }, function() {
    return Spacebars.mustache(self.lookup("title"));
  })), "\n    "), "\n    ", HTML.A({
    href: function() {
      return Spacebars.mustache(self.lookup("pathFor"), "postPage");
    },
    "class": "discuss btn"
  }, "Preview"), "\n  ");
}));

})();
