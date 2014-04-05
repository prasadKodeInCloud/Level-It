(function(){
Template.__define__("postsList", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "posts"
  }, "\n    ", UI.Each(function() {
    return Spacebars.call(self.lookup("postsWithRank"));
  }, UI.block(function() {
    var self = this;
    return [ "\n      ", Spacebars.include(self.lookupTemplate("postItem")), "\n    " ];
  })), "\n    \n    ", UI.If(function() {
    return Spacebars.call(self.lookup("nextPath"));
  }, UI.block(function() {
    var self = this;
    return [ "\n      ", HTML.A({
      "class": "load-more",
      href: function() {
        return Spacebars.mustache(self.lookup("nextPath"));
      }
    }, "More Projects"), "\n    " ];
  })), "\n  ");
}));

})();
