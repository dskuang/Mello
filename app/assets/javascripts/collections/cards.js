Trello.Collections.Cards = Backbone.Collection.extend({
  initialize: function(options) {
    this.list = options.list;
  },

  comparator: function (card) {
    return card.get('ord');
  },

  getOrFetch: function (id) {
    var card = this.get(id);
    if (card) {
      card.fetch();
    } else {
      card = new this.model({ id:id });
      // this.add(card);
      card.fetch({
        error: function () { this.remove(card); }.bind(this)
      });
    }
  return card;
  },


  url: "/api/cards",
  model: Trello.Models.Card

});
