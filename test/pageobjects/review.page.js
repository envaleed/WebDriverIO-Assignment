const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ReviewPage extends Page {
  /**
   * define selectors using getter methods
   */
  get billingCheckbox() {
    return $('#billing-address-same-as-shipping-checkmo');
  }

  get billingAddressForm() {
    return $('[data-form="billing-new-address"]');
  }

  get note() {
    return $('.note');
  }

  get firstName() {
    return $('//*[@name="firstname"]');
  }

  get lastName() {
    return $('//*[@name="lastname"]');
  }

  get company() {
    return $('//*[@name="company"]');
  }

  get streetAddress1() {
    return $('//*[@name="street[0]"]');
  }

  get streetAddressError() {
    return $('.field-error:nth-of-type(1)');
  }

  get streetAddress2() {
    return $('//*[@name="street[1]"]');
  }

  get streetAddress3() {
    return $('//*[@name="street[2]"]');
  }

  get city() {
    return $('//*[@name="city"]');
  }

  get cityError() {
    return $('.field-error:nth-of-type(2)');
  }

  get state() {
    return $('//*[@name="region_id"]');
  }

  get stateError() {
    return $('.field-error:nth-of-type(3)');
  }

  get zipCode() {
    return $('//*[@name="postcode"]');
  }

  get zipCodeError() {
    return $('.field-error:nth-of-type(4)');
  }

  get country() {
    return $('//*[@name="country_id"]');
  }

  get phoneNumber() {
    return $('//*[@name="telephone"]');
  }

  get phoneNumberError() {
    return $('.field-error:nth-of-type(5)');
  }

  get submitButton() {
    return $('.action.primary.checkout');
  }

  get messageWarning() {
    return $('.message.warning');
  }

  get tooltipContent() {
    return $('.field-tooltip-content');
  }

  get tooltipButton() {
    return $('#tooltip');
  }

  get cancelButton() {
    return $('.action.action-cancel');
  }

  get updateButton() {
    return $('.action.action-update');
  }

  get billingAddressDetails() {
    return $('.billing-address-details');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */

  /**
   * overwrite specific options to adapt it to page object
   */
  async fillOutForm(form) {
    await this.company.addValue(form.company);
    await this.streetAddress1.addValue(form.streetAddress1);
    await this.streetAddress2.addValue(form.streetAddress2);
    await this.streetAddress3.addValue(form.streetAddress3);
    await this.city.addValue(form.city);
    await this.state.selectByAttribute('data-title', 'Alabama');
    await this.zipCode.addValue(form.zipCode);
    await this.country.selectByAttribute('data-title', 'United States');
    await this.phoneNumber.addValue(form.phoneNumber);
    await this.updateButton.click();
  }

  open() {
    return super.open('/breathe-easy-tank.html');
  }
}

module.exports = new ReviewPage();
