const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductPage extends Page {
  /**
   * define selectors using getter methods
   */
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
  async validatePassword(passwordEntered) {}

  open() {
    return super.open('/customer/account/create/');
  }
}

module.exports = new ProductPage();
