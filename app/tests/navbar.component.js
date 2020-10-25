import { Selector } from 'testcafe';

class NavBar {
  /** Login with username and password, then asserts that the login has succeeded by checking navbar. */
  async login(testController, username, password) {
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
    await testController.typeText('#login-form-email', username);
    await testController.typeText('#login-form-password', password);
    await testController.click('#login-form-submit');
  }

  /** Assert that the user is currently logged in. */
  async isLoggedIn(testController, username) {
    await testController.expect(Selector('#navbar-current-user').innerText).eql(username);
  }

  /** First assert that someone is logged in, next click menu items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }
}

export const navBar = new NavBar();
