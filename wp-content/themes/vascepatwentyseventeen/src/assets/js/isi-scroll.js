//handle ISI scrolling functionality
const _ = require("lodash");

class IsiScroll {
  constructor(container) {
    this.$win = $(window);
    this.container = container;
    this.scrollToggleContainer = $(".isi-scroll-toggle");
    this.init()
  }
  init() {
    this.events();
  }
  events() {
    this.$win.on("scroll", _.bind(_.debounce(this.scrollToggle, 50), this));
    this.$win.on("load", _.bind(this.onLoad, this));
  }
  onLoad() {
    let toggleContainerOffset = this.scrollToggleContainer.offset().top,
        windowHeight = this.$win.height(),
        scrollTop = this.$win.scrollTop();
        if (scrollTop > (toggleContainerOffset - windowHeight)) {
          this.container.addClass("hidden");
        }else{
          this.container.removeClass("hidden");
        }
  }
  scrollToggle(event) {
    let $win = $(event.currentTarget),
        windowHeight = $win.height(),
        toggleContainerOffset = this.scrollToggleContainer.offset().top,
        toggleContainerHeight = this.scrollToggleContainer.outerHeight(),
        scrollTop = $win.scrollTop();

    if (scrollTop > (toggleContainerOffset - windowHeight)) {
      this.container.addClass("hidden");
    }else{
      this.container.removeClass("hidden");
    }
  }

}

module.exports = IsiScroll
