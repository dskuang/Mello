Trello.Views.ListShow = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.model.cards(),'remove', this.removeCardView);
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), 'add', this.addCardView);
    this.model.cards().each(this.addCardView.bind(this));
    this.cardModel = new Trello.Models.Card();
    this.boardModel = options.boardModel;


  },

  events: {
    "submit .new-card-item": "submit",
        "click .deleteList": "deleteList"
  },

  tagName: "li",
  className: "list-class draggable",
  template: JST['listShow'],

  onRender: function () {
    this.$(".cards").sortable({connectWith: $(".cards"),

      stop: function(event, ui) {
        this.saveCards(event, ui);
      }.bind(this)
    });
    Backbone.CompositeView.prototype.onRender.call(this);
  },

  removeCardView: function(model) {
    this.removeModelSubview(".cards", model);
  },

  saveCards: function(event, ui) {
    var card = ui.item;
    var cardId = ui.item.find(".card").data("id");
    var newList = ui.item.parent().parent();
    var newId = newList.data("id");
    var cardModel = this.model.cards().get(cardId);
    cardModel.save({"list_id": newId})

    this.model.cards().remove(cardModel);

    for(var i = 0; i < this.model.cards().length; i++) {
      var currCard = this.model.cards().at(i);
      currCard.set({"ord": i});
      currCard.save();
    }

    var newListModel = this.model.collection.get({id: newId})
    newListModel.cards().add(cardModel);
    var newListCards = newList.find(".card");

    for( var j = 0; j < newListCards.length; j++) {
      var id = $(newListCards[j]).data("id");
      var mod = newListModel.cards().get(id);
      mod.set({"ord": j});
      mod.save();
    }

  },

  render: function () {
    var content = this.template({list: this.model, card: this.cardModel});
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },

  addCardView: function(card) {
    var subView = new Trello.Views.CardShow({board: this.boardModel, list: this.model.cards(), model: card});
    this.addSubview(".cards", subView);
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = $(e.currentTarget).serializeJSON();
    var that = this;
    attrs.card.ord = this.model.cards().length;
    this.cardModel.set(attrs);
    this.cardModel.save([], {
      success: function () {
        that.model.cards().add(that.cardModel, { merge: true });
        Backbone.history.navigate("#/boards/" + that.boardModel.id, {trigger: true})
        that.render();
      }, wait: true
    });
  },
  deleteList: function(e) {
    e.preventDefault();
    var id = $(e.currentTarget).data("id");
    this.boardModel.lists().get(id).destroy();
    // Backbone.history.navigate("#", {trigger: true});
  }


});
