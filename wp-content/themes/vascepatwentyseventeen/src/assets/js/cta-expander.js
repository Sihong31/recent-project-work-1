const _ = require('lodash');
const TweenMax = require("gsap");

class CtaExpander {

  constructor(container) {
    this.container = container;
    this.$win = $(window);
    this.isDesktop = window.innerWidth > 767;
    this.hoverTarget = this.container.find(".column-content-2");
    this.targetID1 = "#v2-column-content-1";
    this.targetID2 = "#v2-column-content-2";
    this.$targetID1 = $(this.targetID1);
    this.t1 = TweenMax.to(this.targetID1, .5, {width:"45%", ease:Power2.easeInOut, paused: true});
    this.t2 = TweenMax.to(this.targetID2, .5, {width:"55%", ease:Power2.easeInOut, paused: true});
    this.init();
  }

  init() {
    if(!/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
      if (this.isDesktop) {
        this.hoverEvents();
      }
      this.resizeEvents();
    }
  }
  hoverEvents() {
      this.hoverTarget.on("mouseenter", _.bind(this.expandWidth, this));
      this.hoverTarget.on("mouseleave", _.bind(this.collapseWidth, this));
  }
  resizeEvents() {
    this.$win.on("resize", _.bind(_.debounce(this.checkWidth, 250), this));
  }
  checkWidth(event) {
    let winWidth = window.innerWidth;
    if (winWidth < 767) {
      this.hoverTarget.unbind("mouseenter").unbind("mouseleave");
      this.$targetID1.add(this.targetID2).attr('style', "");
    }
    else {
      this.hoverEvents();
    }

  }
  expandWidth(event) {
    this.t1.play();
    this.t2.play();
  }
  collapseWidth(event) {
    this.t1.reverse();
    this.t2.reverse();
  }

}

module.exports = CtaExpander
