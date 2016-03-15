/**

 * Simple timeline controller for GSAP *
 * Made by Zach Falen // PartnersCreative *

 **/


 // Append controller dependencies to the end of the body
 $('#GSAPcontrollerDependencies').after(" <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script> <script src='http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js'></script> <script src='http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/utils/Draggable.min.js'></script>");

 // Render the controller to the appropriate div
 $('#GSAPcontroller').append(
  '<div id="controller" class="controllerContainer controllerHolder"> <div class="row"> <div class="col-md-9"> <div id="trackContainer" class="controllerTimeline"> <p id="controllerTime">0.00</p> <div class="dragger-track"> <div id="controllerPlayhead"> <div></div> </div> </div> </div> </div> <div class="col-md-3"> <div class="controllerButtons"> <button id="play"><i class="fa fa-2x fa-play-circle-o"></i></button> <button id="pause"><i class="fa fa-2x fa-pause-circle-o"></i></button> </div> </div> </div> <div class="row"> <div class="center-block" style="margin-top: 5px; text-align: right; padding-right: 90px;"> <p class="controllerLogoText"> a widget by </p> <a href="http://www.partnerscreative.com"> <img src="./GSAP_controller_v1.0/par_logo.svg" class="img-responsive controllerLogo"> </a> </div> </div> </div>'
   )

 // Pause the timeline on load
 $("#pause").addClass('focused');

 // Stock the container width.
 var timelineWidth = $("#trackContainer").width();

 // Make updateDragger function accessible outside of this file (for master timeline onUpdate)
 function updateDragger(tl) {
           TweenMax.set($( "#controllerPlayhead" ), {x: timelineWidth * tl.progress()});
           $('#controllerTime').html(tl.time().toFixed( 2 ));
           if (tl.progress() === 1){
             tl.pause();
             $('#pause').removeClass('unfocused');
             $('#play').removeClass('focused');

             $('#pause').addClass('focused');
             $('#play').addClass('unfocused');
           }
         }

  // Pass master timeline into our controller
  var timelineSetup = function (masterTimeline){

        // Load Master Timeline from the animation document
        var tl = masterTimeline;

        // Set some vars for the draggable stuff
        var currentTime = $( "#controllerTime" );
        var ratio = timelineWidth / tl.totalDuration();
        var relativePosition = tl.totalDuration() * ratio;  // Time in seconds


        // Update the dragger when the timeline is updated.
        function updateDragger() {
          TweenLite.set($( "#controllerPlayhead" ), {x: timelineWidth * tl.progress()});
          console.log('tl.progress()')
          $('#controllerTime').html(tl.time().toFixed( 2 ));
          endChecker();
        }

        // Check if the playhead is at the last frame
        function endChecker (){
          if (tl.progress() === 1){
            tl.pause();
            $('#pause').removeClass('unfocused');
            $('#play').removeClass('focused');

            $('#pause').addClass('focused');
            $('#play').addClass('unfocused');
          }
        }

        // Create the dragger with the "Draggable" plugin
        var playhead = Draggable.create($( "#controllerPlayhead" ), {
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

      $('.controllerLogo').hover(
        function(){
          TweenMax.to($(this), .26, {scale: '1.1', x: '5px', force3D: true});
        },
        function(){
          TweenMax.to($(this), .26, {scale: 1, x: 0, force3D: true})
        }
      )
  }
