const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SignUpPage extends Page {
  /**
   * define selectors using getter methods
   */
  get firstName() {
    return $('#firstname');
  }

  get firstNameError() {
    return $('#firstname-error');
  }

  get lastName() {
    return $('#lastname');
  }

  get lastNameError() {
    return $('#lastname-error');
  }

  get isSubscribedCheckbox() {
    return $('#is_subscribed');
  }

  get emailAddress() {
    return $('#email_address');
  }

  get emailAddressError() {
    return $('#email_address-error');
  }

  get password() {
    return $('#password');
  }

  get passwordError() {
    return $('#password-error');
  }

  get passwordStrengthMeterLabel() {
    return $('#password-strength-meter-label');
  }

  get passwordStrengthMeter() {
    return $('#password-strength-meter');
  }

  get passwordConfirmation() {
    return $('#password-confirmation');
  }

  get passwordConfirmationError() {
    return $('#password-confirmation-error');
  }

  get createAccountButton() {
    return $('.action.submit.primary');
  }

  get pageMessage() {
    return $('.page.messages');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */

  /**
   * overwrite specific options to adapt it to page object
   */
  async validatePassword(passwordEntered) {
    const wordsAndNumber = new RegExp(
      '^(?=.*d{1})(?=.*[a-z]{1})(?=.*[A-Z]{1})[a-zA-Z0-9]'
    );
    const wordsAndChars = new RegExp(
      '^(?=.*[!@#$%^&*{|}?~_=+.-]{1})(?=.*[a-z]{1})(?=.*[A-Z]{1})[a-zA-Z?=.*[!@#$%^&*{|}?~_=+.-]'
    );
    const lowercaseWithCharsAndNumber = new RegExp(
      '^(?=.*[a-z]{1})(?=.*[!@#$%^&*{|}?~_=+.-]{1})[a-z!@#$%^&*{|}?~_=+.-]'
    );
    const uppercaseWithCharsAndNumber = new RegExp(
      '^(?=.*[A-Z]{1})(?=.*[!@#$%^&*{|}?~_=+.-]{1})[A-Z!@#$%^&*{|}?~_=+.-]'
    );
    if (
      passwordEntered.match(wordsAndChars) ||
      passwordEntered.match(wordsAndNumber) ||
      passwordEntered.match(lowercaseWithCharsAndNumber) ||
      passwordEntered.match(uppercaseWithCharsAndNumber)
    ) {
      return true;
    }
    return false;
  }

  async register(firstName, lastName, email, password) {
    await this.firstName.setValue(firstName);
    await this.lastName.setValue(lastName);
    await this.emailAddress.setValue(email);
    await this.password.setValue(password);
    await this.passwordConfirmation.setValue(password);
    await this.isSubscribedCheckbox.click();
    await this.createAccountButton.click();
  }

  open() {
    return super.open('/customer/account/create/');
  }
}

module.exports = new SignUpPage();
