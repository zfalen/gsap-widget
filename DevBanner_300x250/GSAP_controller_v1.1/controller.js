/**

 * Simple timeline controller for GSAP *
 * Made by Zach Falen // PartnersCreative *

 **/


 // Append controller dependencies to the end of the body
 $('#GSAPcontrollerDependencies').after(" <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script> <script src='http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js'></script> <script src='http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/utils/Draggable.min.js'></script>");

 // Render the controller to the appropriate div
 $('#GSAPcontroller').append(
  '<div id="controller" class="controllerContainer controllerHolder"> <div class="row"> <div class="col-md-9"> <div id="trackContainer" class="controllerTimeline"> <p id="controllerTime">0.00</p> <div class="dragger-track"> <div id="controllerPlayhead"> <div></div> </div> </div> </div> </div> <div class="col-md-3"> <div class="controllerButtons"> <button id="play"><i class="fa fa-2x fa-play-circle-o"></i></button> <button id="pause"><i class="fa fa-2x fa-pause-circle-o"></i></button> </div> </div> </div> <div class="row"> <div class="center-block" style="margin-top: 5px; text-align: right; padding-right: 90px;"> <p class="controllerLogoText"> a widget by </p> <a href="http://www.partnerscreative.com"> <img src="./GSAP_controller_v1.1/par_logo.svg" class="img-responsive controllerLogo"> </a> </div> </div> </div><div class="row"> <div id="devToggles" class="center-block"> <div id="toggleGuides"> <div class="toggleContainer"> <div class="toggleBtn"></div><div class="clicker"></div></div><p>Enable Guides</p></div><div id="toggleLocking"> <div class="toggleContainer"> <div class="toggleBtn"></div><div class="clicker"></div></div><p>Lock Guides to Center</p></div></div></div><div id="verticalGuide"></div><div id="horizontalGuide"></div> <div id="colorSwapper"> <h5>Guide Color</h5> <p id="guideRed">Red</p><p id="guideGreen">Green</p><p id="guideBlue">Blue</p></div>'
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

// DEV TOGGLE BUTTONS

// SET DEFAULT STATES
var guidesActive = false;
var lockingActive = false;
var colorSwapperActive = false;
var colorSwapperGuide = false; // False = vertical guide (left)   True = horizontal guide (top)
var verticalGuideColor = "blue";
var horizontalGuideColor = "blue";

function toggler(parentId, state){
  $(parentId + " .toggleContainer").mousedown(function(){
    if (state === false){
      TweenMax.to($(parentId + " .toggleContainer .toggleBtn"), .26, {left: 25});
      TweenMax.to($(parentId + " .toggleContainer .clicker"), .26, {scale: 1.3, left: 20, backgroundColor: "rgba(255, 134, 85, 0.2)"});
      TweenMax.to($(parentId + " .toggleContainer .clicker"), .18, {opacity: .6, yoyo:true, repeat: 1, ease: Expo});
      TweenMax.to($(parentId + " .toggleContainer"), .26, {backgroundColor: "rgba(255, 134, 85, 0.6)"});
      state = true;

      updateCallback(parentId);

      // RESET THE CLICK INDICATOR
      TweenMax.to($(parentId + " .toggleContainer .clicker"), 0, {opacity: 0, scale: 0});
    } else {
      TweenMax.to($(parentId + " .toggleContainer .toggleBtn"), .26, {left:-4});
      TweenMax.to($(parentId + " .toggleContainer .clicker"), .26, {scale: 1.3, left: -9.5, backgroundColor: "rgba(32,32,32, 0.2)"});
      TweenMax.to($(parentId + " .toggleContainer .clicker"), .18, {opacity: .4, yoyo:true, repeat: 1, ease: Expo});
      TweenMax.to($(parentId + " .toggleContainer"), .26, {backgroundColor: "rgba(32,32,32, 0.6)"});
      state = false;

      updateCallback(parentId);

      // RESET THE CLICK INDICATOR
      TweenMax.to($(parentId + " .toggleContainer .clicker"), 0, {opacity: 0, scale: 0});
    }
  })
}

function updateCallback(parentId) {
  switch (parentId) {
    case "#toggleGuides":
      if (guidesActive === false){
        $("#verticalGuide").css("visibility", "visible");
        $("#horizontalGuide").css("visibility", "visible");
        guidesActive = true;
      }
      else {
        console.log('hello')
        $("#verticalGuide").css("visibility", "hidden");
        $("#horizontalGuide").css("visibility", "hidden");
        guidesActive = false;
      }
      break;

    case "#toggleLocking":
      if (lockingActive === false){
        lockingActive = true;
      } else {
        lockingActive = false;
      }

  }
}


var borderWidth = parseInt($("#ad").css("border-width"));

function verticalCenterTest() {
  if (lockingActive === true) {
    var verticalCenter = (Math.round(($("#ad").height()+borderWidth) / 2));

    if (this.y === verticalCenter) {
      this.endDrag();
      $("#horizontalGuide").css("border-color", "green")
    } else {
      $("#horizontalGuide").css("border-color", horizontalGuideColor)
    }
  } else {
    $("#horizontalGuide").css("border-color", horizontalGuideColor)
  }
}
function horizontalCenterTest() {
  if (lockingActive === true) {
    var horizontalCenter = (Math.round(($(window).width()+borderWidth) / 2));

    if (this.x === horizontalCenter) {
      this.endDrag();
      $("#verticalGuide").css("border-color", "green")
    } else {
      $("#verticalGuide").css("border-color", verticalGuideColor)
    }
  } else {
    $("#verticalGuide").css("border-color", verticalGuideColor)
  }
}

Draggable.create("#verticalGuide", {type: "left", onDrag: horizontalCenterTest});
Draggable.create("#horizontalGuide", {type: "y", onDrag: verticalCenterTest});

toggler("#toggleGuides", guidesActive)
toggler("#toggleLocking", lockingActive)


$("#verticalGuide").contextmenu(function(e) //Right click
   {
     e.preventDefault();
     colorSwapperActive = true;
     colorSwapperGuide = false;
     $("#colorSwapper").css("left", e.pageX);
     $("#colorSwapper").css("top", e.pageY);
     TweenMax.to("#colorSwapper", .26, {opacity: 1, visibility: "visible"})
   });

$("#horizontalGuide").contextmenu(function(e) //Right click
  {
    e.preventDefault();
    colorSwapperActive = true;
    colorSwapperGuide = true;
    $("#colorSwapper").css("left", e.pageX);
    $("#colorSwapper").css("top", e.pageY);
    TweenMax.to("#colorSwapper", .26, {opacity: 1, visibility: "visible"})
  });

$(window).mouseup(function(e){
  if (e.which === 1 && colorSwapperActive){
    TweenMax.to("#colorSwapper", .16, {opacity: 0});
    TweenMax.to("#colorSwapper", 0, {visibility: "hidden", delay: .16})
    colorSwapperActive = false;
  }
})

$("#colorSwapper p").hover(function(){
  TweenMax.to(this, .16, {color: "#FFB699"})
}, function(){
  TweenMax.to(this, .16, {color: "#000"})
})

$("#guideRed").mouseup(function(){
  switch (whichGuide = colorSwapperGuide){
    case false:
      $("#verticalGuide").css("border-color", "red");
      verticalGuideColor = "red";
      break;

    case true:
      $("#horizontalGuide").css("border-color", "red");
      horizontalGuideColor = "red";
      break;
  }
})

$("#guideGreen").mouseup(function(){
  switch (whichGuide = colorSwapperGuide){
    case false:
      $("#verticalGuide").css("border-color", "green");
      verticalGuideColor = "green";
      break;

    case true:
      $("#horizontalGuide").css("border-color", "green");
      horizontalGuideColor = "green";
      break;
  }
})

$("#guideBlue").mouseup(function(){
  switch (whichGuide = colorSwapperGuide){
    case false:
      $("#verticalGuide").css("border-color", "blue");
      verticalGuideColor = "blue";
      break;

    case true:
      $("#horizontalGuide").css("border-color", "blue");
      horizontalGuideColor = "blue";
      break;
  }
})




// PREP FOR DRAGGABLE FEATURE IMPLEMENTATION
// Draggable.create("#GSAPcontroller", {type:"x,y"});
// Draggable.get("#GSAPcontroller").disable();
