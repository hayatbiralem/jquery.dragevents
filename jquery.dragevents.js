(function($) {

  $.fn.dragEvents = function(options) {
    var settings = $.extend({
      onStart: function() {},
      onDrag: function() {},
      onEnd: function() {},
      onInit: function() {}
    }, (options || {}));

    return this.each(function() {
      // cache
      var $this = $(this);
      var draggable = $this.data('dragevents');
      var $doc = $(document);

      // destroy?
      if (options === 'destroy') {
        $this.off('.dragevents');
        $doc.off('.dragevents');
        $this.data('dragevents', null);
        return true;
      }

      // already init
      if (draggable) {
        return true;
      }

      // collective object
      var dragging = {
        status: false,
        startEvent: null,
        dragEvent: null,
        endEvent: null,
        settings: settings
      };

      // plugin actions
      $this
        .on('mousedown.dragevents touchstart.dragevents touchmove.dragevents touchend.dragevents mousemove.dragevents click.dragevents', function (event) {

          event.preventDefault();

          if ((event.type === 'mousedown' && event.which === 1) || event.type === 'touchstart') {
            dragging.status = true;
            dragging.startEvent = event;
            $.isFunction(settings.onStart) && settings.onStart(dragging);
          } else if (event.type === 'touchmove') {
            dragging.dragEvent = event;
            $.isFunction(settings.onDrag) && settings.onDrag(dragging);
          } else if (event.type === 'touchend') {
            if(dragging.status){
              dragging.status = false;
              dragging.endEvent = event;
              $.isFunction(settings.onEnd) && settings.onEnd(dragging);
            }
          }
        });
      
      $doc.on('mouseup.dragevents', function (event) {
        //event.preventDefault();
        if(dragging.status){
          dragging.status = false;
          dragging.endEvent = event;
          $.isFunction(settings.onEnd) && settings.onEnd(dragging);
        }
      });
      
      $doc.on('mousemove.dragevents', function (event) {
        if(dragging.status){
          dragging.dragEvent = event;
          $.isFunction(settings.onDrag) && settings.onDrag(dragging);
        }
      });
      
      $this
        .data('dragevents', dragging);

      // custom init function
      $.isFunction(settings.onInit) && settings.onInit($this, dragging);
    });
  }

}(jQuery));