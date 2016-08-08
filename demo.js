(function($) {
  $(".drag-area")
    .dragEvents({
      onStart: function(draggable) {
        console.log('start');
      },
      onDrag: function(draggable) {
        console.log('drag');
      },
      onEnd: function(draggable) {
        console.log('end', draggable);
        // $(".drag-area").dragEvents('destroy');
      }
    });
})(jQuery);
