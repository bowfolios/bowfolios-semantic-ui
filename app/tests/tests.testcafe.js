import { landingPage } from './landing.page.js';
import { signoutPage } from './signout.page.js';
import { navBar } from './navbar.component.js';

/* global fixture:false, test:false */

fixture('Default Bowfolios Development Fixture')
    .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test login and logout', async (testController) => {
  await navBar.login(testController, 'johnson@hawaii.edu', 'foo');
  await navBar.isLoggedIn(testController, 'johnson@hawaii.edu');
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
