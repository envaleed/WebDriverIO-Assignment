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

  get xsButton() {
    return $('#option-label-size-143-item-166');
  }

  get smallButton() {
    return $('#option-label-size-143-item-167');
  }

  get mediumButton() {
    return $('#option-label-size-143-item-168');
  }

  get largeButton() {
    return $('#option-label-size-143-item-169');
  }

  get xlButton() {
    return $('#option-label-size-143-item-170');
  }

  get colorButton1() {
    return $('#option-label-color-93-item-57');
  }

  get colorButton2() {
    return $('#option-label-color-93-item-59');
  }

  get colorButton3() {
    return $('#option-label-color-93-item-60');
  }

  get itemQuanity() {
    return $('#qty');
  }

  get sizeFieldError() {
    return $('//*[@id="super_attribute[143]-error"]');
  }

  get colorFieldError() {
    return $('//*[@id="super_attribute[93]-error"]');
  }

  get quantityError() {
    return $('#qty-error');
  }

  get addToCartButton() {
    return $('#product-addtocart-button');
  }

  get cartQuantity() {
    return $('.counter.qty');
  }

  get itemsTotal() {
    return $('.items-total');
  }

  get showCartButton() {
    return $('.action.showcart');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */

  /**
   * overwrite specific options to adapt it to page object
   */

  open() {
    return super.open('/breathe-easy-tank.html');
  }
}

module.exports = new ProductPage();
