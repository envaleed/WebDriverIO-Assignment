const SignUpPage = require('../pageobjects/signup.page');
const passwordList = require('../../test_data/passwords');
const emailList = require('../../test_data/emails');
const { faker } = require('@faker-js/faker');
const AccountPage = require('../pageobjects/account.page');

describe('Signing up on the E-commerce app', () => {
  beforeEach(async function () {
    await SignUpPage.open();
  });

  it('Verify that submitting the form with no data returns errors', async () => {
    await SignUpPage.createAccountButton.click();
    await expect(SignUpPage.firstNameError).toHaveTextContaining(
      'This is a required field.'
    );
    await expect(SignUpPage.lastNameError).toHaveTextContaining(
      'This is a required field.'
    );
    await expect(SignUpPage.emailAddressError).toHaveTextContaining(
      'This is a required field.'
    );
    await expect(SignUpPage.passwordError).toHaveTextContaining(
      'This is a required field.'
    );
    await expect(SignUpPage.passwordConfirmationError).toHaveTextContaining(
      'This is a required field.'
    );
  });

  it('Verify invalid and valid password entries', async () => {
    for (const record of passwordList) {
      await SignUpPage.password.setValue(record);
      if (record.length >= 8 && SignUpPage.validatePassword(record)) {
        continue;
      } else if (record.length >= 8 && SignUpPage.validatePassword(record)) {
        await expect(SignUpPage.passwordError).toHaveTextContaining(
          'Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.'
        );
      } else {
        await expect(SignUpPage.passwordError).toHaveTextContaining(
          'Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.'
        );
      }
    }
  });

  it('Verify valid and invalid emails', async () => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    for (const record of emailList) {
      await SignUpPage.emailAddress.setValue(record);
      if (!record.match(regex)) {
        await expect(
          SignUpPage.emailAddressError.toHaveTextContaining(
            'Please enter a valid email address (Ex: johndoe@domain.com).'
          )
        );
      }
    }
  });

  it("Verify error message when passwords don't match", async () => {
    await SignUpPage.password.setValue('abc-123-xyz');
    await SignUpPage.passwordConfirmation.setValue('someG1bb3r1sh');
    await SignUpPage.createAccountButton.click();
    await expect(SignUpPage.passwordConfirmationError).toHaveTextContaining(
      'Please enter the same value again.'
    );
  });

  it('Verify that a user can register with valid credentials', async () => {
    const regex = new RegExp('[a-zA-Z0-9]');
    const fullName = faker.name.fullName();
    const firstName = fullName.split(' ')[0];
    const lastName = fullName.split(' ')[1];
    const email = faker.internet.email(firstName, lastName, 'example.com');
    const password = faker.internet.password(12, false, regex);
    await SignUpPage.register(firstName, lastName, email, password);
    await expect(browser).toHaveUrl(
      'https://magento.softwaretestingboard.com/customer/account/'
    );
    await AccountPage.logOut();
  });

  it('Verify that a user cannot register with the same credentials twice', async () => {
    const regex = new RegExp('[a-zA-Z0-9]');
    const fullName = faker.name.fullName();
    const firstName = fullName.split(' ')[0];
    const lastName = fullName.split(' ')[1];
    const email = faker.internet.email(firstName, lastName, 'example.com');
    const password = faker.internet.password(12, false, regex);
    await SignUpPage.register(firstName, lastName, email, password);
    await expect(browser).toHaveUrl(
      'https://magento.softwaretestingboard.com/customer/account/'
    );
    await AccountPage.logOut();
    await SignUpPage.open();
    await SignUpPage.register(firstName, lastName, email, password);
    await expect(SignUpPage.pageMessage).toHaveTextContaining(
      'There is already an account with this email address'
    );
  });
});
