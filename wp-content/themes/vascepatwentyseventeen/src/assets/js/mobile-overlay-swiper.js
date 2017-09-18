const Hammer = require('hammerjs');
const _ = require("lodash");

class MobileOverlaySwiper {
  constructor(container) {
    this.container = container;
    this.overlayContainer = this.container.find(".mobile-overlay-container");
    //enable horizontal scrolling with hammerjs events:
    //http://stackoverflow.com/questions/24874665/hammer-js-events-prevent-scrolling-of-horizontal-website
    this.swipeContainer = new Hammer(this.container[0], {
      touchAction: 'pan-x'
    });
    this.init();
  }
  init() {
    this.events();
  }
  events() {
    this.swipeContainer.on('pan', _.bind(_.debounce(this.toggleOverlay, 100), this));
  }
  toggleOverlay(event) {
    this.overlayContainer.addClass("swiped");
  }
}

module.exports = MobileOverlaySwiper
