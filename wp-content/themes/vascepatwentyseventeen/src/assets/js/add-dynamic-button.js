//shows mobile only, hidden-sm hidden-md hidden-lg in buttonTemplate;
class AddDynamicButton {
  constructor(navRow) {
    this.navRow = navRow;
    this.dynamicLink = this.navRow.find(".secondary-nav #menu-secondary-menu li:last-child a").attr("href");
    this.buttonTemplate =
    `
    <div class="btn-register-container hidden-sm hidden-md hidden-lg">
    <a class="btn btn-default btn-register" href="${this.dynamicLink}" target="_blank" role="button">
    <strong>REGISTER</strong>
    </a>
    </div>
    `;
    this.init();
  }
  init() {
    this.navRow.append(this.buttonTemplate);
  }
}

module.exports = AddDynamicButton
