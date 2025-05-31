const LoginPage = require('./LoginPage');

class POManager {
  constructor(page) {
    this.loginPage = new LoginPage(page);
    // this.homePage = require('./HomePage');
    // this.profilePage = require('./ProfilePage');
    // this.settingsPage = require('./SettingsPage');
    // this.dashboardPage = require('./DashboardPage');
  }

  getLoginPage() {
    return this.loginPage;
  }

//   getHomePage() {
//     return this.homePage;
//   }

//   getProfilePage() {
//     return this.profilePage;
//   }

//   getSettingsPage() {
//     return this.settingsPage;
//   }

//   getDashboardPage() {
//     return this.dashboardPage;
//   }
} 
module.exports = POManager;