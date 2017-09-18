require("jquery-validation");

class ValidateEmailForm {
  constructor(emailForm) {
    this.emailForm = emailForm;
    this.init();
  }
  init() {
    this.emailForm.validate({
      rules:{
        downloadsemail: {
          required: true,
          email: true
        }
      },
      messages:{
        downloadsemail: "Enter a valid email",
      }
    });
  }

}

module.exports = ValidateEmailForm
