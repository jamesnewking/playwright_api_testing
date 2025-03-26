const { test, expect, request } = require('@playwright/test');
const PomManager = require('../chipotle/PomManager');
const chipotleURL = "https://chipotle.com/";
const {loginEmail, loginPassword} = require('../constants/config.js');
const testData = JSON.parse(JSON.stringify(require('../test-data/menu.json')));


test('Chipotle Top Menu', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(chipotleURL, {waitUntil:'domcontentloaded'});
    const pomManager = new PomManager(page);
    const homePage = pomManager.getHomePage();
    // await homePage.clickPrivacyCloseBanner()
    // await homePage.getTopLevelMenuItems();
    // await homePage.clickTopLevelMenuItem();

    //ugly Fluent design pattern
    const startOrder = 
    await (
        await (
            await homePage.clickPrivacyCloseBanner()
                ).getTopLevelMenuItems()
                ).clickTopLevelMenuItem();
    // await homePage.clickSignIn();
    // await homePage.signIn();
    await page.pause();
    
})

