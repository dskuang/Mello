Trello.Collections.Cards = Backbone.Collection.extend({
  initialize: function(options) {
    this.list = options.list;
  },

  url: "/api/cards",
  model: Trello.Models.Card

});
