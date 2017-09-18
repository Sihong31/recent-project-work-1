const _ = require('lodash');

class ModalHome {
  constructor(modal) {
    this.$win = $(window);
    this.modal = modal;
    this.init();
  }
  init() {
    this.events();
  }
  events() {
    this.$win.on('load', _.bind(this.showModal, this));
  }
  showModal() {
    if(sessionStorage.getItem('modalState') != 'shown'){
      this.modal.modal('show');
      sessionStorage.setItem('modalState','shown');
    }
  }

}

module.exports = ModalHome
