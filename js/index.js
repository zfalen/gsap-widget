/**
 * Simple timeline visualizer for GSAP
 * Made with Draggable.
 * Go check the external JS files.
 */
$(function() {

  // Pause the timeline on load
  $("#pause").addClass('focused');


  // Load TimelineMax
  var tl = new TimelineMax( {onUpdate:updateDragger, paused:true} );

  // Stock the container width.
  var wi = $("#trackContainer").width();

  // Your timelines stuff here
  tl.to( ".box", 5, {x: wi - 60, rotation:720, ease:Elastic.easeInOut} );

  // Set some vars for the draggable stuff
  var ti = $( "#time" );
  var ratio = wi / tl.duration();
  var tr = tl.duration() * ratio;  // Time in seconds
  var dr = $( "#dragger" );

  // Update the dragger when the timeline is updated.
  function updateDragger() {
    TweenLite.set(dr, {x: wi * tl.progress()});
    ti.html(tl.time().toFixed( 2 ));
    endChecker();
  }

  /** Create the dragger with the "Draggable" plugin.
    * The 'bounds' depends o
    */
  var s = Draggable.create(dr, {
    type: "x",
    bounds: {minX: 0, maxX: wi},
    onDrag: function(){
      tl.progress(this.x / tr).pause();
      if (!$('#pause').hasClass('focused')){
          $('#pause').addClass('focused')
      }
      endChecker();
    }
  });
  // Hotkeys
  $('body').keyup(function(e){
   e.preventDefault();
   if(e.keyCode == 32){
       // user has pressed space
       toggleControls();

       // restart
       if (tl.progress() === 1){
         tl.play(0)
       }
   }
});

  // Handle the control buttons
  var toggleControls = function (){
    // playing -> pause
    if (!$('#pause').hasClass('focused')){
        $('#pause').removeClass('unfocused');
        $('#play').removeClass('focused');

        $('#pause').addClass('focused');
        $('#play').addClass('unfocused');
        tl.pause();
    }

    //paused -> playing
    else if ($('#pause').hasClass('focused')){
        $('#pause').removeClass('focused')
        $('#play').removeClass('unfocused')

        $('#play').addClass('focused')
        $('#pause').addClass('unfocused')
        tl.play();
    }
  }

  $( "#play" ).click(function(){
        tl.play();
        toggleControls();
   });

  $( "#pause" ).click(function(){
    tl.pause();
    toggleControls();
  });
  // $( "#seek" ).click(function(){ tl.seek(1.5); });

var endChecker = function(){
  if (tl.progress() === 1){
    tl.pause();
    $('#pause').removeClass('unfocused');
    $('#play').removeClass('focused');

    $('#pause').addClass('focused');
    $('#play').addClass('unfocused');
  }
}

});
