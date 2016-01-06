/**
 * Simple timeline visualizer for GSAP
 * Made with Draggable.
 */

$(function() {

  $('#render-here').append(
 '<div id="controller" class="container controllerHolder"> <div class="row"> <div class="col-md-9"> <div id="trackContainer" class="timeline"> <p id="time">0.00</p> <div class="dragger-track"> <div id="playhead"> <div></div> </div> </div> </div> </div> <div class="col-md-3"> <div class="buttons"> <button id="play"><i class="fa fa-2x fa-play-circle-o"></i></button> <button id="pause"><i class="fa fa-2x fa-pause-circle-o"></i></button> <!-- <button id="seek">seek(1.5)</button> --> </div> </div> </div> <div class="row"> <div class="center-block" style="margin-top: 5px; text-align: right; padding-right: 225px;"> <p class="logoText"> a widget by </p> <a href="http://www.partnerscreative.com"> <img src="./par_logo.svg" class="img-responsive logo"> </a> </div> </div> </div>'
  )

  // Pause the timeline on load
  $("#pause").addClass('focused');


  // Load TimelineMax
  var tl = new TimelineMax( {onUpdate:updateDragger, paused:true} );

  // Stock the container width.
  var timelineWidth = $("#trackContainer").width();

  // Your timelines stuff here
  tl.to( ".box", 5, {x: timelineWidth - 60, rotation:720, ease:Elastic.easeInOut} );

  // Set some vars for the draggable stuff
  var currentTime = $( "#time" );
  var ratio = timelineWidth / tl.totalDuration();
  var relativePosition = tl.totalDuration() * ratio;  // Time in seconds

  // Update the dragger when the timeline is updated.
  function updateDragger() {
    TweenLite.set($( "#playhead" ), {x: timelineWidth * tl.progress()});
    currentTime.html(tl.time().toFixed( 2 ));
    endChecker();
  }

  /** Create the dragger with the "Draggable" plugin.**/
  var playhead = Draggable.create($( "#playhead" ), {
    type: "x",
    bounds: {minX: 0, maxX: timelineWidth},
    onDrag: function(){
      tl.progress(this.x / relativePosition).pause();
      if (!$('#pause').hasClass('focused')){
          $('#pause').addClass('focused')
      }
      endChecker();
    }
  });


  // Hotkey control
  var pressedKeys = [];

  $('body').keydown(function(e){
    pressedKeys.push(e.keyCode);
  });

  $('body').keyup(function(e){
       e.preventDefault();
       switch (e.keyCode){
         case 32:
           // user has pressed space
           toggleControls();

           // restart
           if (tl.progress() === 1){
             tl.play(0)
           }

           break;


         case 39:
          // shift + arrow right
           if (pressedKeys.indexOf(16) > -1){
             if (tl.progress() === 1){
               tl.seek(0.1);
             } else {
               tl.seek(tl.time() + .1);
             }
             updateDragger();
             break;
           } else {
             // arrow right
             if (tl.progress() === 1){
               tl.seek(0);
             } else {
               tl.seek(tl.time() + .01);
             }
             updateDragger();
             break;
           }

         case 37:
           // shift + arrow left
           if (pressedKeys.indexOf(16) > -1){
             tl.seek(tl.time() - .1);
             updateDragger();
             break;
           } else {
             // arrow left
             tl.seek(tl.time() - .01);
             updateDragger();
             break;
           }

       }
       pressedKeys.splice(pressedKeys.indexOf(e.keyCode), 1);
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

$('.logo').hover(
  function(){
    TweenMax.to($(this), .26, {scale: '1.1', x: '5px', force3D: true});
  },
  function(){
    TweenMax.to($(this), .26, {scale: 1, x: 0, force3D: true})
  }
)

});
