require('dotenv').config();
const { Builder, By, until, Browser } = require('selenium-webdriver');

(async function loginTest() {
    const email = process.env.INVALID_EMAIL; // Change to VALID_EMAIL or INVALID_EMAIL
    const password = process.env.PASSWORD;
    const driver = await new Builder().forBrowser(Browser.CHROME).build();

    try {
        console.log("Opening login page...");
        await driver.get('https://clooney-admin.clooney-conferencing.com/login/sign-in');

        // Email input
        console.log("Entering sample email...");
        emailInput = await driver.wait(until.elementLocated(By.id('email')), 5000);
        await emailInput.sendKeys(email); // input email

        // Click Next button
        console.log("Clicking the Next button...");
        nextButton = await driver.wait(until.elementLocated(By.className('button--primary button--block')), 5000);
        await nextButton.click();

        await driver.sleep(5000); // wait

        console.log("Finding error message...");
        let errorMsg = '';
        try {
            errorMsg = await driver.findElement(By.className('alert--error')).getText();
        }
        catch (e) {}

        if (errorMsg) {
            console.log("Found error message.");
            console.log(errorMsg); // output error message if any
        }
        // Successful Next
        else {
            console.log("No error message found.")

            console.log("Entering password...");
            passwordInput = await driver.wait(until.elementLocated(By.id('password')), 5000);
            await passwordInput.sendKeys(password); // input password

            console.log("Clicking the Login button...");
            loginButton = await driver.wait(until.elementLocated(By.className('button--primary button--block')), 5000);
            await loginButton.click();

            await driver.sleep(5000); // wait

            try {
                errorMsg = await driver.findElement(By.className('alert--error')).getText();
            }
            catch (e) {}

            if (errorMsg) {
                console.log("Found login error message.");
                console.log(errorMsg); // output error message if any
            }
            else {
                console.log("No login error message found.");
            }
        }
    }
    finally {
        console.log("Closing browser...");
        await driver.quit();
    }
}) ();
