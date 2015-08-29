Trello.Collections.Boards = Backbone.Collection.extend({
  url: "api/boards",
  model: Trello.Models.Board,

  getOrFetch: function(id) {
    var collection = this;
    var model = this.get(id);
    if(model){
      model.fetch();
    } else {
      model = new Trello.Models.Board({id: id});
      model.fetch({
        success: function() {
          collection.add(model);
        }
      });
    }
    return model;
  }
});
