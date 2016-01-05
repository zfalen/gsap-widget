var React = require('react');
var ReactDOM = require('react-dom');

var Controller = React.createClass({

  render: function(){
    return(
      <div class="container controllerHolder">
        <div class="row">

          <div class="col-md-9">
            <div id="trackContainer" class="timeline">
              <p id="time">0.00</p>

              <div class="dragger-track">
                <div id="playhead">
                  <div></div>
                </div>
              </div>

            </div>
          </div>

          <div class="col-md-3">
            <div class="buttons">
              <button id="play"><i class="fa fa-2x fa-play-circle-o"></i></button>
              <button id="pause"><i class="fa fa-2x fa-pause-circle-o"></i></button>
              <!-- <button id="seek">seek(1.5)</button> -->
            </div>
          </div>

        </div>

        <div class="row">

          <div class="center-block" style="margin-top: 5px; text-align: right; padding-right: 225px;">
            <p class='logoText'> a widget by </p>
            <a href="http://www.partnerscreative.com">
              <img src="./par_logo.svg" class="img-responsive logo">
            </a>
          </div>

        </div>
      </div>
    )
  }
})

ReactDOM.render(<Controller/>), document.getElementById('controller'));
