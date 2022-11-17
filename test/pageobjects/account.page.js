const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AccountPage extends Page {
  /**
   * define selectors using getter methods
   */
  get accountDropDown() {
    return $('.action.switch');
  }

  get signOutButton() {
    return $('.authorization-link');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */

  /**
   * overwrite specific options to adapt it to page object
   */
  async logOut() {
    await this.accountDropDown.click();
    await this.signOutButton.click();
  }

  open() {
    return super.open('/customer/account/');
  }
}

module.exports = new AccountPage();
