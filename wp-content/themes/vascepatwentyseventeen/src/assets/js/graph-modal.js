const _ = require("lodash");

class GraphModal {
  constructor(container) {
    this.$win = $(window);
    this.$body = $("body");
    this.graphModalContainer = container;
    this.modalTemplate = `
                         <div class="modal graph-modal fade">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content graph-modal-content">
                              <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body graph-modal-body">
                              </div>
                            </div>
                          </div>
                        </div>
                        `;
    this.init();
  }
  init() {
    this.events();
  }
  events() {
    this.$win.on("load", _.bind(this.createModal, this));
    this.graphModalContainer.on("click", _.bind(this.initModal, this));
  }
  createModal() {
    this.$body.append(this.modalTemplate);
  }
  initModal (event) {
    let $this = $(event.currentTarget),
        modalContainerContent = $this.html(),
        graphModal = $(".graph-modal"),
        graphModalBody = graphModal.find(".graph-modal-body");

    graphModalBody.empty().append(modalContainerContent);
    graphModal.modal('show');
  }

}

module.exports = GraphModal
