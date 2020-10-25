import { Selector } from 'testcafe';

class SignoutPage {
  constructor() {
    this.pageId = '#signout-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that the Landing page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const signoutPage = new SignoutPage();
