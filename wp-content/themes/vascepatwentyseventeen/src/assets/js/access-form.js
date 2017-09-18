function validateAccessForm(accessForm) {
  this.accessForm = accessForm;
  this.locationPath = location.protocol + "//" + location.host;

  this.accessForm.validate({
    rules:{
      question1: "required",
      question2: "required",
      question3: "required",
      question4: "required",
      question5: "required",
      question6: "required",
    },
    messages:{
      question1: "This question is required",
      question2: "This question is required",
      question3: "This question is required",
      question4: "This question is required",
      question5: "This question is required",
      question6: "This question is required",
    }
  });

  this.accessForm.on("submit", determineFormUrl.bind(this));

  function determineFormUrl(event) {
    let $this = $(event.currentTarget),
        formData = $this.serializeArray();

    if (this.accessForm.valid()) { //make sure form is valid
      if (formData[1].value === "no" ||
      formData[2].value === "yes" ||
      formData[3].value === "yes" ||
      formData[5].value === "yes") {
        event.preventDefault();
        window.location = `${this.locationPath}/register-access-request-incomplete`;
      }else {
        return;
      }
    }
  }

}

module.exports = validateAccessForm
