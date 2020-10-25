import { Selector } from 'testcafe';

class ProjectsPage {
  constructor() {
    this.pageId = '#projects-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least nine interests on it.  */
  async hasDefaultProjects(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(4);
  }
}

export const projectsPage = new ProjectsPage();
