const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  /**
   * define selectors using getter methods
   */
  get pageMessage() {
    return $('.page.messages');
  }

  get productItem() {
    return $('.product-item:nth-of-type(1)');
  }

  get addToCartButton() {
    return $('.action.tocart.primary:nth-of-type(1)');
  }

  get sizeButton() {
    return $('#option-label-size-143-item-166');
  }

  get colorButton() {
    return $('#option-label-color-93-item-50');
  }

  get showCartButton() {
    return $('.action.showcart');
  }

  get itemsTotal() {
    return $('.items-total');
  }

  get itemQuantity() {
    return $('.counter.qty');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */

  /**
   * overwrite specific options to adapt it to page object
   */

  open() {
    return super.open('/');
  }
}

module.exports = new HomePage();
