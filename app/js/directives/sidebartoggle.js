angular.module('sidebarDirectives',[])

.directive('sidebarbutton',function() {
  return {
    restrict:"AE",
    template:"<button class='sidebar-button'><</button>",
    replace:true,
    link: function(scope,element,attrs) {
      var showing = false;
      element.on('click',function() {
        $('#sidebar').toggle();

        if(showing)
          element.text("<");
        else
          element.text(">");

        showing = !showing;
      });
    }
  };
});
