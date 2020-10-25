import { Selector } from 'testcafe';

class InterestsPage {
  constructor() {
    this.pageId = '#interests-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least nine interests on it.  */
  async hasDefaultInterests(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(9);
  }
}

export const interestsPage = new InterestsPage();
