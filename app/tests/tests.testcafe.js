import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { profilesPage } from './profiles.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

const username = 'johnson@hawaii.edu';
const password = 'foo';

fixture('Bowfolios test with default db')
    .page('http://localhost:3000');

test.skip('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test.skip('Test signin and signout', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, username, password);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test.skip('Test signup page, then logout', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser, password);
  // New user has successfully logged in, so now let's logout.
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test public profiles page', async (testController) => {
  await navBar.gotoProfilesPage(testController);
  await profilesPage.isDisplayed(testController);
  await profilesPage.hasDefaultProfiles(testController);
});
