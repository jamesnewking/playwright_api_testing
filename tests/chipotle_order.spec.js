const { test, expect, request } = require('@playwright/test');
const HomePage = require('../chipotle/Home');
const PomManager = require('../chipotle/PomManager');
const chipotleURL = "https://chipotle.com/";
const loginEmail = "speeding.rocket@gmail.com";
const loginPassword  = "0WKQV8MgSGkWbrH@";
const testData = JSON.parse(JSON.stringify(require('../test-data/menu.json')));


test('Chipotle Top Menu', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(chipotleURL, {waitUntil:'domcontentloaded'});
    // const homePage = new HomePage(page);
    const pomManager = new PomManager(page);
    const homePage = pomManager.getHomePage();
    await homePage.clickPrivacyCloseBanner();
    await homePage.getTopLevelMenuItems();
    await homePage.clickTopLevelMenuItem();
    // await homePage.clickSignIn();
    // await homePage.signIn();
    await page.pause();
    
})

// test('@Chipotle Client App login', async ( ) => {
//     // const connectionURL = "wss://browser.zenrows.com?apikey=5aac2060be93cfc5655af4ed63c31bd9be89843c";
//     // const browser = await chromium.connectOverCDP(connectionURL);
//     chromium.use(stealth());
//     const browser = await chromium.launch();
//     const context = await browser.newContext({
//         userAgent: userAgentStrings[Math.floor(Math.random() * userAgentStrings.length)],
//         // userAgent: userAgentStrings[0],
//       });
//       //add init script
//     // await context.addInitScript("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
//     // define your connection URL
    

//     const page = await context.newPage();
//     await page.goto(chipotleURL);
//     // await page.waitForLoadState('networkidle');
//     const homePage = new HomePage(page);
//     await homePage.clickSignIn();
//     await homePage.signIn(loginEmail,loginPassword);
//     await context.storageState({path: `stateLogin.json`});
//     await page.pause();
    
// })

// test('@Chipotle Client App login', async ({ page }) => {
//     const loginURL = "https://services.chipotle.com/auth/v2/customer/login";
//     const contentType = "application/json";
//     const userName = "speeding.rocket@gmail.com";
//     const password = "0WKQV8MgSGkWbrH@";
//     const loginPayload = { 
//         "OriginRouter": "home",
//         "ShouldTimeout": "true",
//         "UserName": userName,
//         "Password": password,
//     };
//     const apiContext = await request.newContext();
//     const loginResponse = await apiContext.post(loginURL, {data: loginPayload});
//     console.log(loginResponse.status());
//     // expect(loginResponse.ok()).toBeTruthy();
//     console.log(await loginResponse);
//     // const loginResponseBody = await loginResponse.json(); 
//     // console.log(loginResponseBody);
// });

