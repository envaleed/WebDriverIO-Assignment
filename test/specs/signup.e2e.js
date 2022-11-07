const AuthenticationPage = require('../pageobjects/authentication.page');
const SignUpPage = require('../pageobjects/signup.page');

describe('Signing up on the E-commerce app', () => {
  beforeEach(async function () {
    await AuthenticationPage.open();
  });

  it('Verify that the email button is present', async () => {
    await expect(AuthenticationPage.emailCreateAccount).toBeExisting();
    await expect(AuthenticationPage.createAccountButton).toBeExisting();
  });

  it('Verify that submitting the email field empty shows a error message', async () => {
    await AuthenticationPage.createAccountButton.click();
    await expect(AuthenticationPage.emailErrorMsg).toBeExisting();
    await expect(AuthenticationPage.emailErrorMsg).toHaveTextContaining(
      'Invalid email address.'
    );
  });
});
