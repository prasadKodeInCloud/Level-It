(function(){
Template.__define__("commentSubmit", (function() {
  var self = this;
  var template = this;
  return HTML.FORM({
    name: "comment",
    "class": "comment-form"
  }, "\n    ", HTML.DIV({
    "class": "control-group"
  }, "\n        ", HTML.DIV({
    "class": "controls"
  }, HTML.Raw('\n            <label for="body">Comment on this post</label>\n            '), HTML.TEXTAREA({
    name: "body"
  }), "\n        "), "\n    "), HTML.Raw('\n    <div class="control-group">\n        <div class="controls">\n            <button type="submit" class="btn">Add Comment</button>\n        </div>\n    </div>\n  '));
}));

})();
