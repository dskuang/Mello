Trello.Views.BoardIndex = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, "sync add remove ", this.render);
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.listCollection, "sync add", this.render);
    // this.listenTo(this.collection,'remove', this.removeBoardView);
    this.model = new Trello.Models.Board();
  },
  template: JST["boardIndex"],
  events: {
    "click .delete": "deleteBoard",
    "click .submit": "createBoard"
  },

  render: function(){
    this.$el.html(this.template({board: this.model, boards: this.collection}));
    return this;
  },

  deleteBoard: function(e) {
    e.preventDefault();
    var id = $(e.currentTarget).data("id");
    this.collection.get(id).destroy();
    Backbone.history.navigate("#", {trigger: true});
  },

  // removeBoardView: function(model) {
  //   this.removeModelSubview(".cards", model);
  // },

  createBoard: function(e) {
    e.preventDefault();
    var attr = $(".new-board-item").serializeJSON();
    this.model.save(attr,{
      success: function() {
        this.collection.add(this.model, { merge: true });
        this.model = new Trello.Models.Board();
        Backbone.history.navigate("#", {trigger: true});
      }.bind(this)
    });
  }

});
