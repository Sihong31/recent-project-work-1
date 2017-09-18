const _ = require("lodash");

//temporary fix for navigation issue;

class RepositionSubs {
  constructor(navContainer) {
      this.navContainer = navContainer;
      this.navSubMenus = this.navContainer.find(".mega-sub-menu");
      this.$win = $(window);

      let subMenuListWrapper = `<div class="sub-list-wrapper"></div>`;
      this.navSubMenus.each(function(index, value){
        $(value).children().wrapAll(subMenuListWrapper);
      });

      this.init();
  }
  init() {
    this.events();
  }

  events() {
    this.$win.on("load", _.bind(this.onPageLoad, this));
    this.$win.on("resize", _.bind(_.debounce(this.onResize, 50), this));
  }

  loopSubMenus() {
    this.navSubMenus.each(_.bind(this.setSubMenuPositions, this));
  }

  setSubMenuPositions(index, value) {
    let currentParentLink = $(this.navContainer.children()[index]),
        currentParentIndex = index,
        currentSubMenu = value,
        currentLeftOffset = currentParentLink.offset().left,
        parentHalfWidth = currentParentLink.width()/2,
        subMenuHalfWidth = ($(value).children(".sub-list-wrapper").width())/2,
        winWidth = window.innerWidth;
    if (winWidth > 767) {
      if (currentParentIndex == 0) {
        $(currentSubMenu).css({"padding-left": `${currentLeftOffset}px`});
      }
      else {
        $(currentSubMenu).css({"padding-left": `${currentLeftOffset - subMenuHalfWidth + parentHalfWidth}px`});
      }
    }else {
      $(currentSubMenu).css({"padding-left": "30px"}); //mobile styling
    }

  }

  onPageLoad() {
    this.loopSubMenus();
  }

  onResize(event) {
    this.loopSubMenus();
  }

}

module.exports = RepositionSubs
