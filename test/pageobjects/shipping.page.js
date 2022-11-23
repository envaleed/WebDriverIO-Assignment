const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ShippingPage extends Page {
  /**
   * define selectors using getter methods
   */

  get note() {
    return $('.note');
  }

  get firstName() {
    return $('[name="firstname"]');
  }

  get lastName() {
    return $('[name="lastname"]');
  }

  get company() {
    return $('[name="company"]');
  }

  get streetAddress1() {
    return $('[name="street[0]"]');
  }

  get streetAddress2() {
    return $('[name="street[1]"]');
  }

  get streetAddress3() {
    return $('[name="street[2]"]');
  }

  get city() {
    return $('[name="city"]');
  }

  get state() {
    return $('[name="region_id"]');
  }

  get zipCode() {
    return $('[name="postcode"]');
  }

  get country() {
    return $('[name="country_id"]');
  }

  get phoneNumber() {
    return $('[name="telephone"]');
  }

  get errorMessages() {
    return $$('.field-error');
  }

  get fixedShipping() {
    return $('.radio:nth-of-type(1)');
  }

  get tableRateShipping() {
    return $('.radio:nth-of-type(2)');
  }

  get submitButton() {
    return $('.button.action.continue.primary');
  }

  get messageNotice() {
    return $('.message.notice');
  }

  get messageWarning() {
    return $('.message.warning');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */

  /**
   * overwrite specific options to adapt it to page object
   */

  async fillOutForm(form) {
    await this.company.setValue(form.compant);
    await this.streetAddress1.setValue(form.streetAddress1);
    await this.streetAddress2.setValue(form.streetAddress2);
    await this.streetAddress3.setValue(form.streetAddress3);
    await this.city.setValue(form.city);
    await this.state.selectByAttribute('data-title', 'Alabama');
    await this.zipCode.setValue(form.zipCode);
    await this.country.selectByAttribute('data-title', 'United States');
    await this.phoneNumber.setValue(form.phoneNumber);
    await this.fixedShipping.click();
    await this.submitButton.click();
  }

  open() {
    return super.open('/checkout/#shipping');
  }
}

module.exports = new ShippingPage();
