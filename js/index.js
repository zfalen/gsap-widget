/**
 * Simple timeline visualizer for GSAP
 * Made with Draggable.
 * Go check the external JS files.
 */
$(function() {

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
  }

  /** Create the dragger with the "Draggable" plugin.
    * The 'bounds' depends o
    */
  var s = Draggable.create(dr, {
    type: "x",
    bounds: {minX: 0, maxX: wi},
    onDrag: function(){
      tl.progress(this.x / tr).pause();
    }
  });

  $( "#play" ).click(function(){ tl.play(); });
  $( "#pause" ).click(function(){ tl.pause(); });
  // $( "#seek" ).click(function(){ tl.seek(1.5); });

});
