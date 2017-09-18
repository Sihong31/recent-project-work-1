const _ = require('lodash');

//jump to top of page
class TopJump {
  constructor(container) {
    this.container = container;
    this.$page = $('html,body');
    this.init();
  }
  init() {
    this.container.on("click", _.bind(this.jumpToTop, this));
  }
  jumpToTop() {
    this.$page.scrollTop(0);
  }
}

module.exports = TopJump
