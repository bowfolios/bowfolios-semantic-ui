import { Selector } from 'testcafe';

class AddProjectPage {
  constructor() {
    this.pageId = '#add-project-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new project */
  async addProject(testController) {
    const name = `radgrad-${new Date().getTime()}`;
    const picture = 'https://www.radgrad.org/img/radgrad_logo.png';
    const homepage = 'https://radgrad.org';
    const description = 'Growing awesome computer scientists, one graduate at a time.';
    await this.isDisplayed(testController);
    // Define the new project
    await testController.typeText('#name', name);
    await testController.typeText('#picture', picture);
    await testController.typeText('#homepage', homepage);
    await testController.typeText('#description', description);

    // Select two interests.
    const interestsSelector = Selector('#interests');
    const hpcOption = interestsSelector.find('#HPC');
    const aiOption = interestsSelector.find('#AI');
    await testController.click(interestsSelector);
    await testController.click(hpcOption);
    await testController.click(aiOption);
    await testController.click(interestsSelector);

    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addProjectPage = new AddProjectPage();
