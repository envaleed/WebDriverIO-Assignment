const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OrdersPage extends Page {
  /**
   * define selectors using getter methods
   */
  get ordersList() {
    return $('#my-orders-table');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */

  /**
   * overwrite specific options to adapt it to page object
   */

  open() {
    return super.open('/sales/order/history');
  }
}

module.exports = new OrdersPage();
