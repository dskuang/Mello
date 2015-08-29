window.Trello = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#content");
    var router = new Trello.Routers.BoardRouter({$rootEl: $rootEl});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Trello.initialize();
});
