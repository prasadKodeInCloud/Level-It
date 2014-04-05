//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var _ = Package.underscore._;
var RouteController = Package['iron-router'].RouteController;
var Route = Package['iron-router'].Route;
var Router = Package['iron-router'].Router;
var IronLocation = Package['iron-router'].IronLocation;

/* Package-scope variables */
var IronRouterProgress, __coffeescriptShare;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/iron-router-progress/progress.coffee.js                                                                //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                       

IronRouterProgress = (function() {
  function IronRouterProgress() {}

  IronRouterProgress.percent = 0;

  IronRouterProgress.isReady = false;

  IronRouterProgress.isDone = false;

  IronRouterProgress.element = false;

  IronRouterProgress.options = {};

  IronRouterProgress.currentOptions = {};

  IronRouterProgress.configure = function(options) {
    if (options == null) {
      options = {};
    }
    if (_.isObject(options)) {
      _.extend(this.options, options);
      this.currentOptions = _.clone(this.options);
    }
    return this;
  };

  IronRouterProgress.prepare = function() {
    if (this.isReady) {
      return;
    }
    this.element = $(_.isFunction(this.options.element) ? this.options.element.call(this) : this.options.element);
    this.element.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', (function(_this) {
      return function(e) {
        if (e.originalEvent.pseudoElement === '' && e.originalEvent.propertyName === _.last(_this.element.css('transition-property').split(', '))) {
          return _this.reset();
        }
      };
    })(this));
    this.isReady = true;
    $('body').append(this.element);
    return this;
  };

  IronRouterProgress.reset = function() {
    if (this.isReady) {
      clearTimeout(this.ticker);
      this.percent = 0;
      this.isDone = false;
      this.currentOptions.reset.call(this);
    }
    return this;
  };

  IronRouterProgress.start = function(options) {
    if (options == null) {
      options = {};
    }
    if (_.isObject(options)) {
      this.currentOptions = _.extend({}, this.options, options);
    }
    if (this.isReady) {
      this.reset();
      if (this.currentOptions.enabled) {
        this.progress();
        if (this.currentOptions.tick) {
          this.tick();
        }
      }
    }
    return this;
  };

  IronRouterProgress.tick = function() {
    this.ticker = setTimeout((function(_this) {
      return function() {
        _this.progress();
        return _this.tick();
      };
    })(this), Math.random() * 750 + 750);
    return this;
  };

  IronRouterProgress.progress = function(progress) {
    if (progress == null) {
      progress = false;
    }
    this.percent += progress ? progress : (100 - this.percent) * (Math.random() * 0.45 + 0.05) | 0;
    if (this.percent >= 100) {
      return this.done();
    }
    this.currentOptions.progress.call(this);
    return this;
  };

  IronRouterProgress.done = function() {
    if (this.isReady && !this.isDone) {
      clearTimeout(this.ticker);
      this.percent = 100;
      this.isDone = true;
      this.currentOptions.done.call(this);
    }
    return this;
  };

  return IronRouterProgress;

})();

IronRouterProgress.configure({
  element: "<div id=\"iron-router-progress\"></div>",
  spinner: true,
  tick: true,
  enabled: true,
  reset: function() {
    this.element.removeClass('loading done');
    this.element.css('width', '0%');
    this.element.toggleClass('spinner', this.currentOptions.spinner);
    this.element[0].offsetWidth = this.element[0].offsetWidth;
    return this;
  },
  progress: function() {
    this.element.addClass('loading');
    this.element.removeClass('done');
    if (this.element) {
      this.element.css('width', "" + this.percent + "%");
    }
    return this;
  },
  done: function() {
    this.element.addClass('done');
    this.element.css('width', '100%');
    return this;
  }
});

Router.onRun(function() {
  var _ref;
  IronRouterProgress.start(((_ref = this.route.options) != null ? _ref.progress : void 0) || {});
  return this;
});

Router.onBeforeAction(function(pause) {
  if (this.ready()) {
    IronRouterProgress.done();
  } else {
    IronRouterProgress.progress();
    if (_.isFunction(pause)) {
      pause();
    } else {
      this.stop();
    }
  }
  return this;
});

Router.onAfterAction(function() {
  IronRouterProgress.done();
  return this;
});

Router.onStop(function() {
  IronRouterProgress.reset();
  return this;
});

$(function() {
  return IronRouterProgress.prepare();
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['iron-router-progress'] = {
  IronRouterProgress: IronRouterProgress
};

})();

//# sourceMappingURL=f56d6e7c6ece793f04f45013a6324e98b3c06242.map
