Trello.Views.NavShow = Backbone.CompositeView.extend({
  template: JST["nav"],

  initialize: function (options) {
    this.router = options.router;
  },

  events: {
    // "click .home-icon": "renderFeed",
  },



  renderIndex: function(e) {
    e.preventDefault();
    Backbone.history.navigate("#")
    this.router.postIndex();
  },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    return this;
  }
});
