Trello.Views.BoardNew = Backbone.View.extend({
  tagName: 'form',

  template: JST["boardNew"],

  events: {
    'click button': 'submit'
  },

  render: function () {
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = this.$el.serializeJSON(),
      that = this;

    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("boards/" + this.model.id, { trigger: true });
      }
    });
  }
});
