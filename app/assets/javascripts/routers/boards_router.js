Trello.Routers.BoardRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.collection = new Trello.Collections.Boards();
  },

  routes: {
    "": "boardIndex",
    "boards/new": "boardNew",
    "boards/:id": "boardShow"

  },

  boardIndex: function() {
    this.collection.fetch();
    var view = new Trello.Views.BoardIndex({collection: this.collection});
    this.swap(view);
  },

  boardShow: function(id) {
    var board = this.collection.getOrFetch(id);
    var view = new Trello.Views.BoardShow({model: board, collection: this.collection});
    this.swap(view);
  },


  swap: function(view){
    if(this.currentView){
      this.currentView.remove();
    }
    this.currentView = view;
    this.$rootEl.html(this.currentView.$el);
    this.currentView.render();
  }
});
