//handle ISI sliding functionality

const _ = require("lodash");
const TweenMax = require("gsap");

class IsiSlider {
  constructor(container) {
    //isi-main-container
    this.$win = $(window);
    this.container = container;
    this.toggler = this.container.find(".isi-toggler");
    this.mobileToggler = this.container.find(".mobile-toggler");
    this.toggleTextContainer = this.toggler.find("span");
    this.collapsed = true;
    this.winWidth = window.innerWidth;
    this.isMobile = this.winWidth < 768;
    this.originalTabHeight = this.container.height();

    // if (!this.isMobile) {
    //   this.originalTabHeight = this.container.find(".isi-tab-container").outerHeight() + this.container.find(".indication-container").outerHeight();
    // }else{
    //   this.originalTabHeight = this.container.height();
    // }

    this.init();
  }
  init() {
    this.events();
  }

  events() {
    this.togglerOnClick();
    this.togglerOnResize();
  }

  togglerOnResize() {
    this.$win.on("resize", _.bind(_.debounce(this.adjustTabHeight, 100), this));
  }
  //TODO: note to self refactor this when there is time.
  adjustTabHeight() {
    let winWidth = window.innerWidth;

    if(winWidth > 767) {
      //this.collapsed changes states within stateToggle()
      if (this.collapsed) {
        this.container.css("height", "166");
      }
      this.originalTabHeight = 166;
    }else{
      if (this.collapsed) {
        this.container.css("height", "150");
      }
      this.originalTabHeight = 150;
    }
  }

  togglerOnClick() {
    this.toggler.add(this.mobileToggler).on("click", _.bind(this.slideToggle, this));
    this.toggler.add(this.mobileToggler).on("click", _.bind(this.stateToggle, this));
  }

  slideToggle(event) {
    let $this = $(event.currentTarget),
        winWidth = window.innerWidth,
        winHeight = window.innerHeight,
        element = "#isi-main-container",
        tabHeight;

    //tabHeight is height of sliding ISI that is visible in collapsed state;
    //this.containerScrollHeight is the scrollable height of the sliding ISI;

    if (winWidth > 767) {
      if (this.collapsed) {
        tabHeight = $this.parent(".isi-tab-container").outerHeight(); //on click if collapsed use collapsed state height;
      }else {
        tabHeight = this.originalTabHeight; //on click if the isi slider is expanded, use the original collapsed state height;
      }
      this.containerScrollHeight = this.container.prop('scrollHeight');
    }else {
      if (this.collapsed) {
        tabHeight = $this.parents(".isi-main-container").height();
      }else {
        tabHeight = this.originalTabHeight;
      }
      this.containerScrollHeight = this.container.prop('scrollHeight') - ((this.container.prop('scrollHeight')- winHeight) + 40);
    }

    if (this.collapsed) {
      const tween = TweenMax.to(element, 1, {ease: Power2.easeInOut, height: this.containerScrollHeight, zIndex: 9999});
      tween.play();
    }else{
      const tween = TweenMax.to(element, 1, {ease: Power2.easeInOut, height: tabHeight, zIndex: 9999});
      tween.play();
    }
  }

  stateToggle(event) {
    let $this = $(event.currentTarget),
        winWidth = window.innerWidth,
        secondaryToggler;

    //check which isi toggler is secondary depending on mobile or desktop views so that "collapsed" and "expanded" classes are removed or added appropriately to both on window resizing
    if (winWidth > 767) {
      secondaryToggler = this.mobileToggler;
    }else {
      secondaryToggler = this.toggler;
    }

     if(this.collapsed) {
        $this.add(secondaryToggler).removeClass("collapsed");
        $this.add(secondaryToggler).addClass("expanded");
        this.toggleTextContainer.text("COLLAPSE");
        this.collapsed = false;
      }else {
        $this.add(secondaryToggler).removeClass("expanded");
        $this.add(secondaryToggler).addClass("collapsed");
        this.toggleTextContainer.text("EXPAND");
        this.collapsed = true;
      }

  }

}

module.exports = IsiSlider;
