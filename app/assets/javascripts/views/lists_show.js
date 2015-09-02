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
  className: "list-class",
  template: JST['listShow'],

  onRender: function () {
    this.$(".cards").sortable({connectWith: ".cards",
      start: function (event, ui){
        ui.item.toggleClass('dragged');
      },
      stop: function (event, ui){
        ui.item.toggleClass('dragged');
        if (!ui.sender) {
          this.saveOrder(ui);
        }
      }.bind(this),
      receive: function (event, ui) {
          this.saveNewList(ui);
      }.bind(this),
      remove: function (event, ui) {

        var cardId = ui.item.find(".card").data('id');
        var currentCard = this.model.cards().get(cardId);
        this.removeModelSubviewNoRender('.cards',currentCard);
        this.model.cards().remove(currentCard, { silent: true });
      }.bind(this)
    });
    Backbone.CompositeView.prototype.onRender.call(this);
  },

  removeCardView: function(model) {
    this.removeModelSubview(".cards", model);
  },

  saveOrder: function() {
    var cardItems = this.$(".card");

    for(var i = 0; i < cardItems.length; i++) {
      var cardId = $(cardItems[i]).data("id");
      var currentCard = this.model.cards().getOrFetch(cardId);
      currentCard.save({"card" : {"ord": i}});
    }
  },


  render: function () {
    var content = this.template({list: this.model, card: this.cardModel});
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },

  saveNewList: function (ui) {
    var cardId = ui.item.find(".card").data('id')
    var currentCard = new Trello.Models.Card({ id: cardId });
    this.subviews(".cards")._wrapped.splice(
      ui.item.parent().children().index(ui.item),
      0,
      new Trello.Views.CardShow({ model: currentCard })
    );
    this.model.cards().add(currentCard, { silent: true });

    var newListId = this.model.id;
    currentCard.fetch({
      success: function (model) {
        model.save({"card": {'list_id': newListId}});
        this.saveOrder();
      }.bind(this)
    });
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
        debugger
        this.$('.card-title').val("");

        this.cardModel = new Trello.Models.Card();
        // Backbone.history.navigate("#/boards/" + that.boardModel.id, {trigger: true})
        // that.render();
      }.bind(this)
    });
  },

  deleteList: function(e) {
    e.preventDefault();
    var id = $(e.currentTarget).data("id");
    this.boardModel.lists().get(id).destroy();
    // Backbone.history.navigate("#", {trigger: true});
  }


});
