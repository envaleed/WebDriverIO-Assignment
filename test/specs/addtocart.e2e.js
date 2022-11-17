const ProductPage = require('../pageobjects/product.page');
const HomePage = require('../pageobjects/home.page');
const randomChars = require('../../test_data/randomChars');

describe('Adding item to cart from home', () => {
  beforeEach(async function () {
    await browser.url('https://magento.softwaretestingboard.com/');
  });

  it('Verify redirect to product page when Add to Cart is clicked', async () => {
    await HomePage.productItem.scrollIntoView();
    await HomePage.productItem.moveTo();
    await HomePage.addToCartButton.click();
    await expect(browser).toHaveUrlContaining('/radiant-tee.html');
    await expect(ProductPage.pageMessage).toHaveTextContaining(
      'You need to choose options for your item.'
    );
  });

  it('Verify redirect to product page when selecting a color then clicking the Add to Cart button', async () => {
    await HomePage.productItem.scrollIntoView();
    await HomePage.productItem.moveTo();
    await HomePage.colorButton.click();
    await HomePage.addToCartButton.click();
    await expect(browser).toHaveUrlContaining('/radiant-tee.html');
    await expect(ProductPage.pageMessage).toHaveTextContaining(
      'You need to choose options for your item.'
    );
  });

  it('Verify redirect to product page when selecting a size then clicking the Add to Cart button', async () => {
    await HomePage.productItem.scrollIntoView();
    await HomePage.productItem.moveTo();
    await HomePage.sizeButton.click();
    await HomePage.addToCartButton.click();
    await expect(browser).toHaveUrlContaining('/radiant-tee.html');
    await expect(ProductPage.pageMessage).toHaveTextContaining(
      'You need to choose options for your item.'
    );
  });

  it('Verify product added to cart when selecting both a size and color then clicking the Add to Cart button', async () => {
    await HomePage.productItem.scrollIntoView();
    await HomePage.productItem.moveTo();
    await HomePage.sizeButton.click();
    await HomePage.colorButton.click();
    await HomePage.addToCartButton.click();
    await expect(HomePage.pageMessage).toHaveTextContaining(
      'You added Radiant Tee to your shopping cart.'
    );
    await HomePage.itemQuantity.waitForDisplayed({ timeout: 10000 });
    await HomePage.showCartButton.click();
    await HomePage.itemsTotal.waitForDisplayed({ timeout: 10000 });
    await expect(HomePage.itemsTotal).toHaveTextContaining('1 Item in Cart');
  });
});

describe('Adding item to cart from product page', () => {
  beforeEach(async function () {
    await ProductPage.open();
  });

  it('Verify clicking Add to Cart with no selection displays error messages', async () => {
    await ProductPage.addToCartButton.click();
    await expect(ProductPage.sizeFieldError).toHaveTextContaining(
      'This is a required field.'
    );
    await expect(ProductPage.colorFieldError).toHaveTextContaining(
      'This is a required field.'
    );
  });

  it('Verify clicking Add to Cart when the quantity field is empty displays error message', async () => {
    await ProductPage.itemQuanity.clearValue();
    await ProductPage.addToCartButton.click();
    await expect(ProductPage.quantityError).toHaveTextContaining(
      'Please enter a valid number in this field.'
    );
  });

  it('Verify clicking Add to Cart when the quantity field has special characters or text displays error message', async () => {
    for (record of randomChars) {
      await ProductPage.itemQuanity.setValue(record);
      await ProductPage.addToCartButton.click();
      await ProductPage.quantityError.waitForDisplayed({ timeout: 10000 });
      await expect(ProductPage.quantityError).toHaveTextContaining(
        'Please enter a valid number in this field.'
      );
    }
  });

  it('Verify successful Add to Cart when each category is selected', async () => {
    await ProductPage.xsButton.click();
    await ProductPage.colorButton1.click();
    await ProductPage.itemQuanity.setValue('1');
    await ProductPage.addToCartButton.click();
    await expect(ProductPage.pageMessage).toHaveTextContaining(
      'You added Breathe-Easy Tank to your shopping cart.'
    );
    await ProductPage.itemQuanity.waitForDisplayed({ timeout: 10000 });
    await ProductPage.showCartButton.click();
    await ProductPage.itemsTotal.waitForDisplayed({ timeout: 10000 });
    await expect(ProductPage.itemsTotal).toHaveTextContaining(
      '2 Items in Cart'
    );
  });
});
