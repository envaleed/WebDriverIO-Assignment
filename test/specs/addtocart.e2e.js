const ProductPage = require('../pageobjects/product.page');
const HomePage = require('../pageobjects/home.page');

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
