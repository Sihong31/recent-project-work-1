const _ = require("lodash");

class CollectFormData {
  constructor() {
    this.$body = $("body");
    this.infoForm = this.$body.find("#infoForm");
    this.shippingForm = this.$body.find("#shippingForm");
    this.emailForm = this.$body.find("#downloads-email-form");
    this.init();
  }
  init() {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-east-1:612d0649-cc30-43ee-b0a3-bf2a7e400f1d",
      RoleArn: "arn:aws:iam::862632847959:role/Cognito_DynamoPoolUnauth"
    });

    AWS.config.update({
      region: "us-east-1",
    });
    this.docClient = new AWS.DynamoDB.DocumentClient();
    this.formatDates();
    this.events();
  }

  events() {
    this.infoForm.on("submit", _.bind(this.infoFormData, this));
    this.shippingForm.on("submit", _.bind(this.shippingFormData, this));
    this.emailForm.on("submit", _.bind(this.emailFormData, this));
  }

  formatDates() {
      this.newDate = new Date();
      this.timeStampDate = this.newDate.getDate();
      this.timeStampMonth = this.newDate.getMonth() + 1;
      this.timeStampYear = this.newDate.getFullYear().toString();

      if (this.timeStampDate < 10) {
        this.timeStampDate = "0"+this.timeStampDate.toString();
      }else {
        this.timeStampDate.toString();
      }

      if (this.timeStampMonth < 10) {
        this.timeStampMonth = "0"+this.timeStampMonth.toString();
      }else {
        this.timeStampMonth.toString();
      }

      this.fullDate = `${this.timeStampMonth}-${this.timeStampDate}-${this.timeStampYear}`;
  }

  infoFormData(event) {
    let data = $(event.currentTarget).serializeArray();
    const params = {
      TableName :"NewVascepaInfoForm",
      Item:{
        "RegID" : new Date().getTime(),
        "addtimestamp" : this.fullDate 
      }
    };

    for(let i = 0; i<data.length; i++) {
      if (data[i].name === "firstname") {
        params.Item.firstname = data[i].value;
      }
      else if (data[i].name === "lastname") {
        params.Item.lastname = data[i].value;
      }
      else if (data[i].name === "specialty") {
        params.Item.specialty = data[i].value;
      }
      else if (data[i].name === "email") {
        params.Item.email = data[i].value;
      }
      else if (data[i].name === "phonenumber") {
        params.Item.phonenumber = data[i].value;
      }
      else if (data[i].name === "info-form-cb-1") {
        params.Item.checkbox1 = data[i].value;
      }
      else if (data[i].name === "info-form-cb-2") {
        params.Item.checkbox2 = data[i].value;
      }
      else if (data[i].name === "info-form-cb-3") {
        params.Item.checkbox3 = data[i].value;
      }
    }

    this.docClient.put(params, function(err, data) {
      if (err) {
        console.log("not saved");
      } else {
        console.log("saved");
      }
    });

  }
  shippingFormData(event) {
    let data = $(event.currentTarget).serializeArray();
    const params = {
      TableName :"NewVascepaShippingForm",
      Item:{
        "RegID" : new Date().getTime(),
        "addtimestamp" : this.fullDate 
      }
    };

    for(let i = 0; i<data.length; i++) {
      if (data[i].name === "sFirstName") {
        params.Item.firstname = data[i].value;
      }
      else if (data[i].name === "sLastName") {
        params.Item.lastname = data[i].value;
      }
      else if (data[i].name === "sSpecialty") {
        params.Item.specialty = data[i].value;
      }
      else if (data[i].name === "sLicenseState") {
        params.Item.stateoflicense = data[i].value;
      }
      else if (data[i].name === "sLicenseNumber") {
        params.Item.licensenumber = data[i].value;
      }
      else if (data[i].name === "sEmail") {
        params.Item.email = data[i].value;
      }
      else if (data[i].name === "sPhone") {
        params.Item.phonenumber = data[i].value;
      }
      else if (data[i].name === "sAddress") {
        params.Item.address = data[i].value;
      }
      else if (data[i].name === "sApt") {
        params.Item.apt = data[i].value;
      }
      else if (data[i].name === "sCity") {
        params.Item.city = data[i].value;
      }
      else if (data[i].name === "sState") {
        params.Item.state = data[i].value;
      }
      else if (data[i].name === "sZip") {
        params.Item.zip = data[i].value;
      }
    }

    this.docClient.put(params, function(err, data) {
      if (err) {
        console.log("not saved");
      } else {
        console.log("saved");
      }
    });
  }

  emailFormData(event) {
    let data = $(event.currentTarget).serializeArray();

    const params = {
      TableName :"NewVascepaEmailForm",
      Item:{
        "RegID" : new Date().getTime(),
        "addtimestamp" : this.fullDate 
      }
    };
    for(let i = 0; i<data.length; i++) {
      if (data[i].name === "downloadsemail") {
        params.Item.email = data[i].value;
      }
    }

    this.docClient.put(params, function(err, data) {
      if (err) {
        console.log("not saved");
      } else {
        console.log("saved");
      }
    });
  }
}

module.exports = CollectFormData
