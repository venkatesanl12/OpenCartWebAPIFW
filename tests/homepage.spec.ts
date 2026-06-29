
// Home page tests
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';



let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('pwtestbatch@open.com', 'pw123');
    homePage = new HomePage(page);
});

test('@smoke home page title test', async ( {page} ) => {
    const pageTitle = await homePage.getPageTitle();
    console.log('home page title::', pageTitle);
    expect(pageTitle).toBe('My Account');
  
    
});


test('@smoke logout link exist test', async () => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});


test('@smoke home page headers exist test @junesprint', async () => {
    let allHeaders = await homePage.getHomePageHeaders();
    console.log('home page headers: ', allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);
});
