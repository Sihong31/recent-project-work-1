const _ = require("lodash");

class GraphJumper {
  constructor(container) {
    this.$win = $(window);
    this.navHeight = $(".header-nav").outerHeight();
    this.mainContainer = container;
    this.mainContainerOffset = this.mainContainer.offset().top;
    this.linksContainer = this.mainContainer.find(".graph-slider-links");
    this.graphContainers = this.mainContainer.find(".graph-containers");
    this.jumpLinks = this.linksContainer.find("ul li");
    this.linkedGraphContainers = this.mainContainer.find('.graph-container[id], .standard-disclosure-container[id]');
    this.atTop = true;
    this.atBottom = false;
    this.isMobile;
    this.$page = $("html, body");

    this.init();
  }
  init() {
    this.events();
  }
  events() {
    this.jumpLinks.on("click", _.bind(this.jumpToSection, this));
    this.$win.on("scroll", _.bind(this.determineLinkContainerPosition, this));
    this.$win.on("scroll", _.bind(_.debounce(this.loopScrollContainers, 50), this));
    this.$win.on("resize", _.bind(_.debounce(this.removePositionTriggers, 50), this));
  }
  //remove position triggers when resized below 768
  removePositionTriggers() {
    let winWidth = window.innerWidth;
    if (window.innerWidth < 768) {
      this.linksContainer.removeClass("trigger-top-position trigger-bottom-position");
    }
  }
  jumpToSection(event) {
    let $this = $(event.currentTarget),
        currentID = $this.index(),
        fixedNavHeight = this.$page.find(".navbar").outerHeight(),
        fixedSubMenuHeight = this.$page.find(".sub-menu-active-state").outerHeight();

    //for cases when the fixed sub menu is not loaded on the page
    if (typeof fixedSubMenuHeight === "undefined") {
      fixedSubMenuHeight = 0;
    }

    $this.addClass("active");
    $this.siblings().removeClass("active");
    this.$page.scrollTop( $(`#${currentID}`).offset().top - fixedNavHeight - fixedSubMenuHeight);
  }
  loopScrollContainers() {
    this.linkedGraphContainers.each(this.determineScrollActiveState.bind(this));
  }
  determineScrollActiveState(index, value) {
    let winScrollTop = this.$win.scrollTop(),
        containerID = $(value).attr('id'),
        jumpLinkContainer = $(this.jumpLinks[containerID]),
        winWidth = window.innerWidth;

    winWidth > 767 ? this.isMobile = false : this.isMobile = true;

    if (!this.isMobile) {
      if (winScrollTop + this.navHeight + 50 >= $(value).offset().top) {
        jumpLinkContainer.addClass("active");
        jumpLinkContainer.siblings().removeClass("active");
      }else {
        jumpLinkContainer.removeClass("active");
      }
    }
  }
  determineLinkContainerPosition(event) {
    let $this = $(event.currentTarget),
        winScrollTop = $this.scrollTop(),
        winWidth = window.innerWidth,
        bottomScrollLimit = this.mainContainer.scrollTop() + this.mainContainer.innerHeight();

    winWidth > 767 ? this.isMobile = false : this.isMobile = true;

    //when window scroll passes top of the main container
    if (!this.isMobile) {
      if (winScrollTop + this.navHeight >= this.mainContainerOffset && this.atTop)  {
        this.linksContainer.addClass("trigger-top-position");
        this.graphContainers.addClass("col-sm-offset-4 col-lg-offset-3");
        this.atTop = false;
      }
      else if (winScrollTop + this.navHeight < this.mainContainerOffset) {
        this.linksContainer.removeClass("trigger-top-position");
        this.graphContainers.removeClass("col-sm-offset-4 col-lg-offset-3");
        this.atTop = true;
      }
      //when window scroll reaches the cta near bottom of page
      if (winScrollTop >= bottomScrollLimit) {
        this.linksContainer.addClass("trigger-bottom-position");
        this.linksContainer.removeClass("trigger-top-position");
        this.atBottom = true;
      }
      else if (winScrollTop < bottomScrollLimit && this.atBottom) {
        this.linksContainer.removeClass("trigger-bottom-position");
        this.linksContainer.addClass("trigger-top-position");
        this.atBottom = false;
      }
    }
  }
}

module.exports = GraphJumper
