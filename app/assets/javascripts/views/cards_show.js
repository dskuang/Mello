Trello.Views.CardShow = Backbone.View.extend({
  initialize: function (options) {
    this.list = options.list;
    this.board = options.board;
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click .card-delete": "deleteCard"
  },

  tagName: "li",
  className: "card-item",
  template: JST['cardShow'],

  render: function () {
    var content = this.template({card: this.model});
    this.$el.html(content);
    return this;
  },

  deleteCard: function(e) {
    e.preventDefault();
    var id = $(e.currentTarget).data("id");
    this.list.get(id).destroy();
  }
});
