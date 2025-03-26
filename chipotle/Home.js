module.exports = class Home {   
    constructor(page) {
        this.page = page;
        this.privacyCloseBannerButtonLoc = `button[aria-label="close banner"]`;
        this.signInLoc = 'div.sign-in';
        this.emailInputLoc = 'input[aria-label="Enter email address"]';
        this.passwordInputLoc = 'input[aria-label="Enter password"]';
        this.signInButtonLoc = `div.sign-in-container`;
        //after login
        this.celebrateModalLoc = `div.celebrate-content`;
        this.topLevelMenuItemsLoc = `div.top-level-menu`;
        this.topLevelMeanuItemsChildTextLoc = `div.display-name`;
        this.topLevelMenuBurritoBowlLoc = `div[data-qa-group-name="Burrito Bowl"]`;
        
        this.topLevelMenuDrinksLoc = `div[data-qa-group-name="Drinks"]`
    }

    async clickPrivacyCloseBanner() {
        const privacyCloseBannerBUtton = await this.page.locator(this.privacyCloseBannerButtonLoc);
        await privacyCloseBannerBUtton.waitFor({timeout: 5000});
        await privacyCloseBannerBUtton.click();
        return this;
    }

    async clickSignIn() {
        const signInButton = await this.page.locator(this.signInLoc);
        await signInButton.waitFor({timeout: 5000});
        await signInButton.click();
        
    }

    async signIn(email=`blahblah@gamil.com`, password=`password`) {
        await this.page.locator(this.emailInputLoc).fill(email);
        await this.page.locator(this.passwordInputLoc).fill(password);
        await this.page.pause()
        await this.page.locator(this.signInButtonLoc).nth(1).click();
        const celebrateModalIsVisible = await this.page.locator(this.celebrateModalLoc).isVisible();
        console.log(`Celebrate modal is visible: ${celebrateModalIsVisible}`);
        await this.page.pause();
        await this.page.waitForTimeout(10000);
    }
    
    async getTopLevelMenuItems() {
        // const menuItems = {fromArribute: [], fromText: []};
        const menuItems = {};
        const topLevelMenuItemsArr = await this.page.locator(this.topLevelMenuItemsLoc).all();
        await topLevelMenuItemsArr[0].waitFor({timeout: 5000});
        const topLevelMenuItemsFromAttributeArr = await Promise.all(topLevelMenuItemsArr.map(async (item) => {
            return await item.getAttribute('data-qa-group-name');
        }));
        menuItems.fromArribute = await topLevelMenuItemsFromAttributeArr;
        const topLevelMenuItemsFromTextArr = await Promise.all(topLevelMenuItemsArr.map(async (item) => {
            return await item.locator(this.topLevelMeanuItemsChildTextLoc).textContent();
        }));
        menuItems.fromText = await topLevelMenuItemsFromTextArr;

        console.table(menuItems.fromArribute);
        // console.table(topLevelMenuItemsFromAttributeArr);

        // console.table(topLevelMenuItemsArr);
        // console.log(await this.page.locator(this.topLevelMenuItemsLoc).first().isVisible());
        // const itemName = await this.page.locator(this.topLevelMenuItemsLoc).last().locator(this.topLevelMeanuItemsChildTextLoc).textContent();
        // console.log(itemName);
        console.table(menuItems.fromText);
        // return menuItems;
        return this;
    }

    async clickTopLevelMenuItem(itemNumber=0){
        await this.page.locator(this.topLevelMenuItemsLoc).nth(itemNumber).click();
        return this;
    }
}