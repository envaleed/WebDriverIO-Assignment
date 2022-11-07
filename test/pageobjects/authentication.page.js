const Page = require('./page');

class AuthenticationPage extends Page {
  get emailCreateAccount() {
    return $('#email_create');
  }

  get createAccountButton() {
    return $('#SubmitCreate');
  }

  get emailErrorMsg() {
    return $('.alert.alert-danger ol li');
  }

  open() {
    return super.open('?controller=authentication&back=my-account');
  }
}

module.exports = new AuthenticationPage();
