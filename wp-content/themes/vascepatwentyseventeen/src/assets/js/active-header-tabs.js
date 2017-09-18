const _ = require("lodash");

class ActiveHeaderTabs {
  constructor() {
    this.$body = $("body");
    this.menuPrimary = this.$body.find("#mega-menu-primary");
    this.megaMenuItems = this.menuPrimary.children(".mega-menu-item-has-children");
    this.isInteriorPages = this.$body.is("#growing-cv-risk, #vascepa-efficacy, #pure-epa-difference, #safety-and-dosing");
    this.isDesktop = window.innerWidth > 767;
    this.init();
    // this.megaMenuItems.off();
  }
  //turn off default mega menu event listeners;
  //TODO: refactor this when/if there is time
  init() {
    if (this.isInteriorPages && this.isDesktop) {
      setTimeout(_.bind(this.headerLoadState, this) ,250);
      this.events();
    }
  }
  events() {
      this.megaMenuItems.on("mouseover", _.bind(this.onMouseOver, this));
      this.megaMenuItems.on("mouseout", _.bind(this.onMenuItemsMouseOut, this));
      this.menuPrimary.on("mouseout", _.bind(this.onMenuPrimaryMouseOut, this));
  }
  headerLoadState() {
    if (this.$body.is("#growing-cv-risk")) {
      $(this.megaMenuItems[0]).addClass("menu-item-active-state");
      $(this.megaMenuItems[0]).find(".mega-sub-menu").addClass("sub-menu-active-state menu-item-visible");
    }
    else if (this.$body.is("#vascepa-efficacy")) {
      $(this.megaMenuItems[1]).addClass("menu-item-active-state");
      $(this.megaMenuItems[1]).find(".mega-sub-menu").addClass("sub-menu-active-state menu-item-visible");
    }
    else if (this.$body.is("#pure-epa-difference")) {
      $(this.megaMenuItems[2]).addClass("menu-item-active-state");
      $(this.megaMenuItems[2]).find(".mega-sub-menu").addClass("sub-menu-active-state menu-item-visible");
    }
    else if (this.$body.is("#safety-and-dosing")) {
      $(this.megaMenuItems[3]).addClass("menu-item-active-state");
      $(this.megaMenuItems[3]).find(".mega-sub-menu").addClass("sub-menu-active-state menu-item-visible");
    }
  }
  onMouseOver(event) {
    let $this = $(event.currentTarget);
    $this.find(".mega-sub-menu").addClass("menu-item-visible");
    $this.siblings().find(".mega-sub-menu").removeClass("menu-item-visible");
  }
  onMenuItemsMouseOut(event) {
    let $this = $(event.currentTarget);
    $this.removeClass("mega-toggle-on menu-item-visible");
  }
  onMenuPrimaryMouseOut(event) {
    let $this = $(event.currentTarget);
    $this.find(".mega-menu-item-has-children .mega-sub-menu").removeClass("menu-item-visible");
    $this.find(".sub-menu-active-state").addClass("menu-item-visible");
  }
}

module.exports = ActiveHeaderTabs
