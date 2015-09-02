window.Trello = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#content");
    var router = new Trello.Routers.BoardRouter({$rootEl: $rootEl});
    var nav = new Trello.Views.NavShow({router: router});
    $("#navbar").html(nav.render().$el);
    Backbone.history.start();
  }
};
