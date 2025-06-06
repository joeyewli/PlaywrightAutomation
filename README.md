Playwright automation project based on the udemy course: Playwright JS/TS Automation Testing from Scratch & Framework 
Course: 90% completed - just Azure Cloud and some cucumber lecture left

**Folders**
.github
  /workflows
    playwright.yml - Able to run tests on push. Requires future setup . Currently runs all tests in main branch
allure-report - A customise report - has better UI. Will need to expand more on instructions on how to use. This project currently has it installed
  Commands
    1. Run tests and gather results for allure: npx playwright test --reporter="line,allure-playwright"
    2. Uses the results to generate report: allure generate ./allure-results --clean
    3. View report: allure open
page_objects - Page elements to decouple the web element from the logic.
tests - suite of all my tests
  setup - 
    loginSetup.spec.js - currently a setup test that runs first to login then saved the state. Will be removed and replaced with APi
  utils
logged-in-state.json - created by setup file to saved login state then use "test.use" functionality to save time logging on other tests
playwright.config.js - Test runner config file. Will need to be updated to save various test scripts

**Skills demonstrated**
Javascript
POM - keep only web elements here and all testing to spec files. 
    - linked all pages to the POM manager
    - created nav bar (not linked to POM manager but gets used by 3 specific pages) - potenitally more so can be updated
API - some basics
basic debugging
using CSS selectors and inbuilt playwright selectors
Understanding how to use traces and html reports



**Skills to demonstrate**
Data driven parameterization - used to done it with textfile, now should try JSON
API - fully incorporate to my tests
        - Mocking a response with fulfill
        - blocking request with abort
        - modifying request with continue
    - replace the logged-in-state.json with API calls and saved variables
Using different test runners
Create and save various Test Scripts
    -including set devices, workers and Tags
    -run multiple tests (especially flakey tests)
    -run parellel tests that doesn't contradicts each other
Typescript - convert all JS to TS files
use listeners for new tabs
Fully make use of before and after
Visual testing for UI elements (got lots of examples due to my previous role)
Cucumber 
Interacting with excel sheets 
Azure cloud

**Future Tasks:**
Javascript exercises
learn all functions of github
regex expressions
learn AI tools and incorporate 
re-learn xpath


**Potential future project:**
Build database system - to store my collection of TCG 
build an convertor to extract product info from tables on wiki pages 
Design the Database schema - Create ER diagrams, Normalize data and define tables, columns keys and constraints
potentially link to Card Market and ebay. Or at least create an ETL to store to my personal DB.
Potentially to expand to more card games so design need to have this in mind