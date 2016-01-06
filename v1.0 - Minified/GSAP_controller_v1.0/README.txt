A Pen created at CodePen.io. You can find this one at http://codepen.io/Manoz/pen/hJCqd.

NEED TO ADD TO WORK:

Add to head -

    <!-- WIDGET STUFF -->
    <link rel="stylesheet" href="./GSAP_controller_v1.0/style.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link href='https://fonts.googleapis.com/css?family=Lato:300italic' rel='stylesheet' type='text/css'>


Add to body -

    <!-- THE CONTROLLER -->
    <div id="GSAPcontroller"></div>

    <!-- dependencies -->
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js'></script>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/utils/Draggable.min.js'></script>

    <script src="./GSAP_controller_v1.0/controller.js"></script>



Add to master timeline's TimelineMax options -

    onUpdate: updateDragger, onUpdateParams: ['{self}'], paused: true



Call at the end of your script and pass in the master timeline -

    timelineSetup(tl);
