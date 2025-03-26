const Home = require(`./Home`);
module.exports = class PomManager {   
    constructor(page) {
        this.page = page;
        this.homePage = new Home(page);
    }

    getHomePage() {
        return this.homePage;
    }
    
}
