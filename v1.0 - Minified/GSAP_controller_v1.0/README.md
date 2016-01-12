
NEED TO ADD TO WORK:

Add to TOP OF head (to prevent Bootstrap’s native styles from overriding yours) -

    <!-- CONTROLLER STYLES -->
    <link rel="stylesheet" href="./GSAP_controller_v1.0/controllerStyle.css">
    <!-- END CONTROLLER STYLES -->


Add to BOTTOM OF body, OUTSIDE of the animation's outermost div and ABOVE your animation script (to position the timeline correctly) -

    <!-- THE CONTROLLER RENDERS HERE -->
    <div id="GSAPcontroller"></div>

    <!-- CONTROLLER DEPENDENCIES -->
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js'></script>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/utils/Draggable.min.js'></script>

    <script src="./GSAP_controller_v1.0/controller.js"></script>
    <!-- END CONTROLLER DEPENDENCIES -->



Add to any existing master timeline's TimelineMax options -

    onUpdate: updateDragger, onUpdateParams: ['{self}'], paused: true

    ex.
    // CREATE A MASTER TIMELINE AND ADD THE CONTROLLER PARAMS
    var tl = new TimelineMax({onUpdate: updateDragger, onUpdateParams: ['{self}'], paused: true});



Call at the end of your script and pass in the master timeline -

    // RENDER CONTROLLER AND PASS IN THE MASTER TIMELINE
    timelineSetup(tl);
