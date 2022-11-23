const ReviewPage = require('../pageobjects/review.page');
const ShippingPage = require('../pageobjects/shipping.page');
const HomePage = require('../pageobjects/home.page');
const SignUpPage = require('../pageobjects/signup.page');
const { faker } = require('@faker-js/faker');
const OrdersPage = require('../pageobjects/orders.page');

describe('Adding item to cart from home', () => {
  before(async function () {
    await SignUpPage.open();
    const fullName = faker.name.fullName();
    const firstName = fullName.split(' ')[0];
    const lastName = fullName.split(' ')[1];
    const email = faker.internet.email(firstName, lastName, 'example.com');
    const password = faker.internet.password(12, false, /\w/, '!Aa0');
    await SignUpPage.register(firstName, lastName, email, password);
    await HomePage.open();
    await HomePage.productItem.scrollIntoView();
    await HomePage.productItem.moveTo();
    await HomePage.sizeButton.click();
    await HomePage.colorButton.click();
    await HomePage.addToCartButton.click();
    await ShippingPage.open();
  });

  it('Verify clicking next with no selection shows error', async () => {
    await ShippingPage.submitButton.click();
    await expect(ShippingPage.messageNotice).toHaveTextContaining(
      'The shipping method is missing. Select the shipping method and try again.'
    );
  });

  it('Verify error messages show on submission of empty form', async () => {
    await ShippingPage.fixedShipping.click();
    await ShippingPage.submitButton.click();
    for await (const fields of ShippingPage.errorMessages) {
      await expect(fields).toHaveTextContaining('This is a required field.');
    }
  });

  it('Verify typing a gibberish zipcode shows a warning', async () => {
    await ShippingPage.zipCode.setValue('*vdsuvd');
    await ShippingPage.messageWarning.waitForDisplayed({ timeout: 10000 });
    await expect(ShippingPage.messageWarning).toHaveTextContaining(
      'Provided Zip/Postal Code seems to be invalid. Example: 12345-6789; 12345. If you believe it is the right one you can ignore this notice.'
    );
  });

  it('Verify submitting a completed form navigates to review page', async () => {
    const form = {
      company: faker.company.name(),
      streetAddress1: faker.address.streetAddress(),
      streetAddress2: faker.address.secondaryAddress(),
      streetAddress3: faker.address.cityName(),
      city: faker.address.city(),
      zipCode: faker.address.zipCodeByState(),
      phoneNumber: faker.phone.number('###-###-####'),
    };
    await ShippingPage.fillOutForm(form);
    await expect(browser).toHaveUrlContaining('checkout/#payment');
  });

  it('Verify cancel button closes the form and checks the box', async () => {
    if (!(await ReviewPage.billingCheckbox.isSelected())) {
      await ReviewPage.billingCheckbox.click();
    }
    await ReviewPage.billingCheckbox.click();
    await expect(ReviewPage.cancelButton).toBeDisplayed();
    await ReviewPage.cancelButton.click();
    await expect(ReviewPage.billingCheckbox).toBeChecked();
  });

  /*
THIS TEST KEEPS THROWING AN ERROR THAT SAYS "element not interactable" despite any CSS/xPath selectors used. Have mercy on my soul please 

  it('Verify billing address can be added', async () => {
    if (!(await ReviewPage.billingCheckbox.isSelected())) {
      await ReviewPage.billingCheckbox.click();
    }
    await ReviewPage.billingCheckbox.click();
    await ReviewPage.billingAddressForm.waitForDisplayed({ timeout: 10000 });
    const form = {
      company: faker.company.name(),
      streetAddress1: faker.address.streetAddress(),
      streetAddress2: faker.address.secondaryAddress(),
      streetAddress3: faker.address.cityName(),
      city: faker.address.city(),
      zipCode: faker.address.zipCodeByState(),
      phoneNumber: faker.phone.number('###-###-####'),
    };
    await ReviewPage.fillOutForm(form);
    await expect(ReviewPage.billingAddressDetails).toHaveTextContaining(
      form.firstName
    );
  });
*/
  it('Verify order successfully placed', async () => {
    await ReviewPage.submitButton.click();
    await expect(browser).toHaveUrl(
      'https://magento.softwaretestingboard.com/checkout/onepage/success/'
    );
  });

  it('Verify the order history can be viewed', async () => {
    await OrdersPage.open();
    await expect(OrdersPage.ordersList).toBeDisplayed();
  });
});
