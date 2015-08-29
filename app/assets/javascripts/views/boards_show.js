Trello.Views.BoardShow = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.model.lists(),'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addListView);
    this.model.lists().each(this.addListView.bind(this));
    this.listenTo(this.model.lists(), 'remove', this.removeListView );
    this.colCount = 0;
    this.margin = 20;
    this.colWidth = 0;
    $(window).on("resize", this.render.bind(this));

  },

  events: {
    "submit .new-list-item": "submit",

  },

  template: JST["boardShow"],

  setupBlocks: function() {
    this.windowWidth = $(window).width();
    this.colWidth = $('.list-class').outerWidth();
    this.colCount = Math.floor(this.windowWidth/(this.colWidth+this.margin)) - 1;
    this.blocks = [];
    if(this.colCount === 3) {
      $('.lists').css({'width': 600 +'px' });
    }
    for(var i = 0; i < this.colCount; i++) {
        this.blocks.push(this.margin);
    }
  },

  positionBlocks: function(parent) {
    var view = this;
      $('.list-class').each(function(idx, block){
          var min = view.min(view.blocks);
          var index = $.inArray(min, view.blocks);
          var leftPos = view.margin+(index*(view.colWidth+view.margin));
          $(block).css({
              'left':leftPos+'px',
              'top':min+'px'
          });
          view.blocks[index] = min+$(block).outerHeight()+view.margin;
      });
  },

  min: function(array) {
   return Math.min.apply(Math, array);
  },

  onRender: function () {
    this.$(".lists").sortable({
      stop: function() {
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
      // var cards = $(lists[i]).find($(".card"));
      this.listModel = this.model.lists().get(id);
      this.listModel.set({ord: i});
      this.listModel.save({}, {success: function() {
        // if (cards.length > 0) {
        //   for(var j = 0; j < cards.length; j++) {
        //     var id = $(cards[j]).data("id");
        //     debugger
        //     var cardModel = this.listModel.cards().get(id);
        //
        //   }
        // }
      }.bind(this)
      });
    }
  },

  render: function(){
    var toRender = this.template({board: this.model, list: this.listModel});
    this.$el.html(toRender);
    this.attachSubviews();
    this.setupBlocks();
    this.positionBlocks();
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
        Backbone.history.navigate("#/boards/" + that.model.id, {trigger: true})
        that.render();
      }, wait: true
    });
  }


});
