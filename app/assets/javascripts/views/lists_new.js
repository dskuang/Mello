Trello.Views.ListNew = Backbone.View.extend({
  tagName: 'form',

  template: JST["listNew"],

  events: {
    'click button': 'submit'
  },

  initialize: function(options) {
    this.listModel = options.listModel;
    this.listCollection = options.listCollection;
    this.listenTo(this.listCollection, "sync", this.render);
    this.listCollection = new Trello.Collections.Lists({board: this.model});

  },

  render: function () {
    var renderedContent = this.template({
      board: this.model, list: this.listModel
    });
    this.$el.html(renderedContent);
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = this.$el.serializeJSON(),
      that = this;

    this.listModel.set(attrs);
    this.model.save({}, {
      success: function () {
        that.listCollection.add(that.listModel, { merge: true });
        Backbone.history.navigate("boards/" + this.model.id, { trigger: true });
      }
    });
  }
});
