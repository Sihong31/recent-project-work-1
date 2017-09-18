const TweenMax = require("gsap");
const ScrollToPlugin = require("gsap/ScrollToPlugin");
const _ = require("lodash");

class MainHero {
  constructor(heroContainer) {
    this.heroContainer = heroContainer;
    this.downArrow = this.heroContainer.find(".down-arrow");
    this.$win = $(window);
    this.headerNav = $(".header-nav");
    this.twoColumnHome = $("#box-two-column-home");
    this.heroLeft = this.heroContainer.find(".hero-left");
    this.heroRight = this.heroContainer.find(".hero-right");
    this.heroLine = this.heroContainer.find(".hero-line");
    this.init();
  }

  init() {
    this.downArrow.on("click", _.bind(this.slideToContent, this));
    this.$win.on("load",  _.bind(this.calculateLineWidth, this));
    this.$win.on("resize",  _.bind(this.recalculateLineWidth, this));
  }

  //calculate the width of the red line for the hero on load and also on resizing
  calculateLineWidth() {
    this.winWidth = window.innerWidth;
    this.heroContainerWidth = this.heroContainer.width();
    this.heroLeftWidth = this.heroLeft.width();
    this.heroRightWidth = this.heroRight.width();
    this.adjustedWidth; //red line difference between left and right hero parts after removing the red line that were part of those images
    if (this.winWidth > 991) {
      this.adjustedWidth = 162;
    }
    else if (this.winWidth > 767 && this.winWidth < 992) {
      this.adjustedWidth = 125;
    }
    else {
      this.adjustedWidth = 79;
    }

    this.heroLineWidth = this.heroContainerWidth - (this.heroLeftWidth + this.heroRightWidth) + this.adjustedWidth;
    this.heroLine.width(this.heroLineWidth);
  }

  recalculateLineWidth() {
    this.calculateLineWidth();
  }

  slideToContent(event) {
    let scrollDistance = this.twoColumnHome.offset().top,
        headerHeight = this.headerNav.height();

    TweenMax.to(window, 1, {scrollTo: {y: scrollDistance - headerHeight, ease: Power2.easeOut}});
  }
}

module.exports = MainHero
