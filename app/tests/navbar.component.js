import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  async gotoProfilesPage(testController) {
    await testController.click('#profilesMenuItem');
  }

  async gotoInterestsPage(testController) {
    await testController.click('#interestsMenuItem');
  }

  async gotoProjectsPage(testController) {
    await testController.click('#projectsMenuItem');
  }

  async gotoAddProjectPage(testController) {
    await testController.click('#addProjectMenuItem');
  }

  async gotoFilterPage(testController) {
    await testController.click('#filterMenuItem');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    await testController.expect(Selector('#navbar-current-user').innerText).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }
}

export const navBar = new NavBar();
