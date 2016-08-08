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

      // destroy?
      if (options === 'destroy') {
        $this.off('.dragevents');
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
        .on('mousedown.dragevents', function(e) {
          switch (e.which) {
            // prevent right or middle buttons
            case 2:
            case 3:
              break;
            // add ability to left button
            default:
              dragging.status = true;
              dragging.startEvent = e;
              $.isFunction(settings.onStart) && settings.onStart(dragging);
              break;
          }
        })
        .on('mouseup.dragevents', function(e) {
          dragging.status = false;
          dragging.endEvent = e;
          $.isFunction(settings.onEnd) && settings.onEnd(dragging);
        })
        .on('mousemove.dragevents', function(e) {
          if (dragging.status) {
            dragging.dragEvent = e;
            $.isFunction(settings.onDrag) && settings.onDrag(dragging);
          }
        })
        .data('dragevents', dragging);

      // custom init function
      $.isFunction(settings.onInit) && settings.onInit();
    });
  }

}(jQuery));
