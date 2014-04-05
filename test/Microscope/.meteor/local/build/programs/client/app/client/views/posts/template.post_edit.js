(function(){
Template.__define__("postEdit", (function() {
  var self = this;
  var template = this;
  return HTML.FORM({
    "class": "main"
  }, "\n    ", HTML.DIV({
    "class": "control-group"
  }, HTML.Raw('\n        <label class="control-label" for="url">URL</label>\n        '), HTML.DIV({
    "class": "controls"
  }, "\n            ", HTML.INPUT({
    name: "url",
    type: "text",
    value: function() {
      return Spacebars.mustache(self.lookup("url"));
    },
    placeholder: "Your URL"
  }), "\n        "), "\n    "), "\n\n    ", HTML.DIV({
    "class": "control-group"
  }, HTML.Raw('\n        <label class="control-label" for="title">Title</label>\n        '), HTML.DIV({
    "class": "controls"
  }, "\n            ", HTML.INPUT({
    name: "title",
    type: "text",
    value: function() {
      return Spacebars.mustache(self.lookup("title"));
    },
    placeholder: "Name your post"
  }), "\n        "), "\n    "), HTML.Raw('\n\n    <div class="control-group">\n        <div class="controls">\n            <input type="submit" value="Submit" class="btn btn-primary submit">\n        </div>\n    </div>\n    <hr>\n    <div class="control-group">\n        <div class="controls">\n            <a class="btn btn-danger delete" href="#">Delete post</a>\n        </div>\n    </div>\n  '));
}));

})();
