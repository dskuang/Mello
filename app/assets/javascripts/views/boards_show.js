Trello.Views.BoardShow = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), 'add', this.addListView);
    this.model.lists().each(this.addListView.bind(this));
    this.listenTo(this.model.lists(), 'remove', this.removeListView );
  },

  events: {
    "submit .new-list-item": "submit",
  },

  template: JST["boardShow"],

  onRender: function () {
    this.$(".lists").sortable({
      start: function (event, ui){
        ui.item.toggleClass('dragged');
      },
      stop: function(event, ui) {
        ui.item.toggleClass('dragged');
        this.saveOrder();
      }.bind(this)
    });
    Backbone.CompositeView.prototype.onRender.call(this);
  },

  removeListView: function(model) {
    this.removeModelSubview(".lists", model);
  },

  saveOrder: function() {

    var lists = $(".list");

    for(var i = 0 ; i < lists.length; i++) {
      var id = $(lists[i]).data("id");
      this.listModel = this.model.lists().get(id);
      this.listModel.set({ord: i});
      this.listModel.save({}, {success: function() {

      }.bind(this)
      });
    }
  },

  render: function(){
    var toRender = this.template({board: this.model, list: this.listModel});
    this.$el.html(toRender);
    this.attachSubviews();
    this.onRender();
    return this;
  },

  addListView: function(list) {
    var subView = new Trello.Views.ListShow({model: list, boardModel: this.model});
    this.addSubview(".lists", subView);
  },

  submit: function (e) {
    e.preventDefault();
    this.listModel = new Trello.Models.List();
    var attrs = $(e.currentTarget).serializeJSON();
    var that = this;
    attrs.list.ord = this.model.lists().length;
    this.listModel.set(attrs);
    this.listModel.save({}, {
      success: function () {
        that.model.lists().add(that.listModel, { merge: true });
        // that.listModel = new Trello.Models.List();
        // Backbone.history.navigate("#/boards/" + that.model.id, {trigger: true})
        // that.render();
      }
    });
  }


});
