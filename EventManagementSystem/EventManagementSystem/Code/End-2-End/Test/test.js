/*
 ============================================================================
 Name        : Event managment Website test.js
 Author      : Yazan Abd-Al-Majeed   
 Copyright   : EDGES
 Description : This file contains Selenium test cases to the Event managment Website's functionality.
 ============================================================================
 */

 import { expect } from 'chai';
 import { Browser, Builder, By, Key, until } from 'selenium-webdriver';
 
 let driver;
 const url = 'http://localhost:3000';
 
 before(async () => {
     driver = await new Builder().forBrowser('chrome').build();
 });
 
 describe("TCs for main page", () => {
     it("All Logos & buttons are Displayed and placed", async () => {
         await driver.get(`${url}/`);
         await driver.sleep(100); 
         let EM_Text = await driver.findElement(By.xpath("//div[text() = 'Event Management']")).getText();
         let Home_Text = await driver.findElement(By.xpath("//a[text() = 'Home']")).getText();
         let LOGIN_Text = await driver.findElement(By.linkText("LOGIN")).getText();
         let REGISTER_Text = await driver.findElement(By.linkText("REGISTER")).getText();
         let Login_Text = await driver.findElement(By.css('h5')).getText();
         let Email_Text = await driver.findElement(By.xpath("//label[text() = 'Email']")).getText();
         let Pass_Text = await driver.findElement(By.xpath("//label[text() = 'Password']")).getText();
         let Login_btn = await driver.findElement(By.xpath("//button[@type = 'submit']")).getText();
         expect(EM_Text).to.be.equal("Event Management");
         expect(Home_Text).to.be.equal("HOME");
         expect(LOGIN_Text).to.be.equal("LOGIN");
         expect(REGISTER_Text).to.be.equal("REGISTER");
         expect(Login_Text).to.equal("Login");
         expect(Email_Text).to.include("mail");
         expect(Pass_Text).to.include("Pass");
         expect(Login_btn).to.equal("LOGIN");
     })
 
     it("Ensuring that LOGIN btn moves us to the current page (main page)", async () => {
         let Main_Page_URL = await driver.executeScript('return window.location.href;');
         await driver.findElement(By.xpath("//a[text() = 'Login']")).click();
         let Current_Page_URL = await driver.executeScript('return window.location.href;');
         expect(Main_Page_URL).to.equal(Current_Page_URL);
     })
 })
 
 
 
 describe("TCs for REGISTER Page", () => {
 
     it("REGISTER Button moves us to REGISTER Page Successfully", async () => {
         await driver.findElement(By.linkText('REGISTER')).click();
         let REGISTER_Elem = await driver.wait(until.elementLocated(By.xpath("//h5[text() = 'Register']")), 5000);
         let REGISTER_Text = await REGISTER_Elem.getText();
         expect(REGISTER_Text).to.equal("Register");
     })
 
     it("Form Elements & REGISTER Button are visible", async () => {
         let User_Text = await driver.findElement(By.id('username-label')).getText();
         let Email_Text = await driver.findElement(By.id('email-label')).getText();
         let Pass_Text = await driver.findElement(By.id('password-label')).getText();
         let CPass_Text = await driver.findElement(By.id('confirmPassword-label')).getText();
         let REG_Btn = await driver.findElement(By.xpath("//button[text() = 'Register']")).getText();
         expect(User_Text).to.equal("Username");
         expect(Email_Text).to.equal("Email");
         expect(Pass_Text).to.equal("Password");
         expect(CPass_Text).to.include("Password");
         expect(REG_Btn).to.equal("REGISTER");
     })
 
 })
 
 describe("TCs for the Registeration form data", () => {
     it("usernames with < 3 characters are not allowed", async () => {
         await driver.findElement(By.id('username')).sendKeys("Y");
         await driver.findElement(By.xpath("//button[text() = 'Register']")).click();
         let Err_Elem = await driver.wait(until.elementLocated(By.xpath("//div[@class = 'error-banner']")), 5000);
         let Err_Text = await Err_Elem.getText();
         expect(Err_Text).to.be.include("3 characters");
     })
     it("Validate if User can Register without Email", async () => { 
         await driver.get(`${url}/`);
         await driver.sleep(100); 
         await driver.findElement(By.linkText('REGISTER')).click();
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//input[@id = 'username']")).sendKeys("Yazan");
         await driver.findElement(By.xpath("//input[@id = 'password']")).sendKeys("12345678");
         await driver.findElement(By.xpath("//input[@id = 'confirmPassword']")).sendKeys("12345678");
 
         await driver.findElement(By.xpath("//button[text() = 'Register']")).click();
         
         let Error_Elem = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class = 'error-banner']"))), 5000);
         let Error_Text = await Error_Elem.getText();
 
         expect(Error_Text).to.be.include("failed")
     })
 
     it("Trying to Register with already Existing Username", async () => {
         await driver.get(`${url}/`);
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//a[text() = 'Register']")).click();
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//input[@id = 'username']")).sendKeys("Yazan");
         await driver.findElement(By.xpath("//input[@id = 'email']")).sendKeys("yazan@edges.com");
         await driver.findElement(By.xpath("//input[@id = 'password']")).sendKeys("1234567888");
         await driver.findElement(By.xpath("//input[@id = 'confirmPassword']")).sendKeys("1234567888");
 
         await driver.findElement(By.xpath("//button[text() = 'Register']")).click();
         
         let Error_Elem = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class = 'error-banner']"))), 5000);
         let Error_Text = await Error_Elem.getText();
 
         expect(Error_Text).to.be.include("failed")
     })
     it("Try to Register without Password", async () => {
         await driver.get(`${url}/`);
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//a[text() = 'Register']")).click();
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//input[@id = 'username']")).sendKeys("Yazan");
         await driver.findElement(By.xpath("//input[@id = 'email']")).sendKeys("yazan@edges.com");
         await driver.findElement(By.xpath("//button[text() = 'Register']")).click();
         let Error_Elem = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class = 'error-banner']"))), 5000);
         let Error_Text = await Error_Elem.getText();
         expect(Error_Text).to.be.include("required");
     })
 
     it("Try to Register without Password Confirmation", async () => {
         await driver.get(`${url}/`);
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//a[text() = 'Register']")).click();
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//input[@id = 'username']")).sendKeys("Yazan");
         await driver.findElement(By.xpath("//input[@id = 'email']")).sendKeys("yazan@edges.com");
         await driver.findElement(By.xpath("//input[@id = 'password']")).sendKeys("0123456789");
         await driver.findElement(By.xpath("//button[text() = 'Register']")).click();
         let Error_Elem = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class = 'error-banner']"))), 5000);
         let Error_Text = await Error_Elem.getText();
         expect(Error_Text).to.be.include("match");
     })
     it("Try to Register with Password < 8 characters", async () => {
         await driver.get(`${url}/`);
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//a[text() = 'Register']")).click();
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//input[@id = 'username']")).sendKeys("Hasan");
         await driver.findElement(By.xpath("//input[@id = 'email']")).sendKeys("Hasan@edges.com");
         await driver.findElement(By.xpath("//input[@id = 'password']")).sendKeys("001122");
         await driver.findElement(By.xpath("//input[@id = 'confirmPassword']")).sendKeys("001122");
         await driver.findElement(By.xpath("//button[text() = 'Register']")).click();
         let Error_Elem = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class = 'error-banner']"))), 5000);
         let Error_Text = await Error_Elem.getText();
         expect(Error_Text).to.be.include("characters");
     })
     it("Try to Register with wrong Password Confirmation", async () => {
         await driver.get(`${url}/`);
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//a[text() = 'Register']")).click();
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//input[@id = 'username']")).sendKeys("Hasan");
         await driver.findElement(By.xpath("//input[@id = 'email']")).sendKeys("Hasan@edges.com");
         await driver.findElement(By.xpath("//input[@id = 'password']")).sendKeys("0011223344");
         await driver.findElement(By.xpath("//input[@id = 'confirmPassword']")).sendKeys("001122334");
         await driver.findElement(By.xpath("//button[text() = 'Register']")).click();
         let Error_Elem = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class = 'error-banner']"))), 5000);
         let Error_Text = await Error_Elem.getText();
         expect(Error_Text).to.be.include("match");
     })
     it("Try to Register with Invalid username like '@#$%'", async () => { 
         /* BUG, to test it enter unassigned credentials*/
         await driver.get(`${url}/`);
         await driver.sleep(500); 
         await driver.findElement(By.xpath("//a[text() = 'Register']")).click();
 
         await driver.findElement(By.xpath("//input[@id = 'username']")).sendKeys("@@##$$%%");
         await driver.findElement(By.xpath("//input[@id = 'email']")).sendKeys("3aLLLawwiiii@edges.com");
         await driver.findElement(By.xpath("//input[@id = 'password']")).sendKeys("HAHAHAH001122334");
         await driver.findElement(By.xpath("//input[@id = 'confirmPassword']")).sendKeys("HAHAHAH001122334");
         await driver.findElement(By.xpath("//button[text() = 'Register']")).click();
         let Error_Elem = await driver.wait(until.elementLocated(By.xpath("//h5[text() = 'Login']")), 5000);
         let Error_Text = await Error_Elem.getText();
         expect(Error_Text).to.be.eq("Login");
     })
     it("Moving Back from register page to Home page", async() => {
         await driver.get(`${url}/`);
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//a[text() = 'Register']")).click();
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//a[text() = 'Home']")).click();
         let Login_Elem = await driver.wait(until.elementLocated(By.xpath("//h5[text() = 'Login']")), 5000);
         let Login_Text = await Login_Elem.getText();
         expect(Login_Text).to.be.eq("Login");
     })
     it("Trying to Register without Username", async()=>{
         await driver.get(`${url}/`);
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//a[text() = 'Register']")).click();
         await driver.sleep(100); 
         await driver.findElement(By.xpath("//input[@id = 'email']")).sendKeys("Hasan@edges.com");
         await driver.findElement(By.xpath("//input[@id = 'password']")).sendKeys("ZoZ00112233");
         await driver.findElement(By.xpath("//input[@id = 'confirmPassword']")).sendKeys("ZoZ0011223");
         await driver.findElement(By.xpath("//button[text() = 'Register']")).click();
         let Error_Elem = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class = 'error-banner']"))), 5000);
         let Error_Text = await Error_Elem.getText();
         expect(Error_Text).to.be.include("required");
     })
 
 })
 
 describe("TCs as a User", () => {
     it("Validate if user can login & RSVP to the event", async () => {
         /* This TC is developed as it passes for both conditions:
            1 -> the User has not RSVP yet   
            2 -> the User has already RSVPed,
            so to control the result you can control the credentials for RSVPed User | Non-RSVPed User :)                                                */
         await driver.get(`${url}/`);
         let Email_Elem = await driver.wait(until.elementLocated(By.xpath("//input[@type='text']")), 5000);
         await Email_Elem.sendKeys("test@edges.com");
         await driver.findElement(By.xpath("//input[@type='password']")).sendKeys("test1234");
         await driver.findElement(By.xpath("//button[text()='Login']")).click();
     
         await driver.sleep(200);
         let RSVP_Button_Exists = await driver.findElements(By.xpath("//button[text()='RSVP']"));
         
         if (RSVP_Button_Exists.length > 0) {
             await RSVP_Button_Exists[0].click();
             
             let RSVP_Done_Eleme = await driver.wait(until.elementLocated(By.xpath("//p[text()='You have RSVPed to this event.']")), 5000);
             let RSVP_Done_Text  = await RSVP_Done_Eleme.getText();
             expect(RSVP_Done_Text).to.include("RSVPed");
         } else {
             let Already_RSVPed_Eleme = await driver.findElement(By.xpath("//p[text()='You have RSVPed to this event.']"));
             let Already_RSVPed_Text  = await Already_RSVPed_Eleme.getText();
             expect(Already_RSVPed_Text).to.include("RSVPed");
         }
     })
 
     it("After logging in, Home button will never move us to another page", async () => {
         let Home_Elem = await driver.wait(until.elementLocated(By.xpath("//a[text() = 'Home']")), 5000);
         await Home_Elem.click();
         let Logout_Elem = await driver.findElement(By.xpath("//button[text() = 'Logout']"));
         let Logout_Text = await Logout_Elem.getText();
         expect(Logout_Text).to.be.eq("LOGOUT");
 
     })
     it("User can logout", async () => {
         let LO_Elem = await driver.wait(until.elementLocated(By.xpath("//button[text() = 'Logout']")), 5000);
         await LO_Elem.click();
         let Login_Elem = await driver.wait(until.elementLocated(By.xpath("//h5[text() = 'Login']")), 5000);
         let Login_Text = await Login_Elem.getText();
         expect(Login_Text).to.be.eq("Login")
     })
     
 })
 
 describe("TCs as an admin", () => {
     it("Admin can create an event", async () => {
         await driver.get(`${url}/`)
         let Email_Elem = await driver.wait(until.elementLocated(By.xpath("//input[@type='text']")), 5000);
         await Email_Elem.sendKeys("yazan@edges.com");
         await driver.findElement(By.xpath("//input[@type='password']")).sendKeys("yazan123");
         await driver.findElement(By.xpath("//button[text()='Login']")).click();
     
         let Dash_Elem = await driver.wait(until.elementLocated(By.xpath("//a[text() = 'Dashboard']")), 5000);
         await Dash_Elem.click();
         let Name_Elem = await driver.wait(until.elementLocated(By.xpath("//input[@type = 'text']")), 5000);
         await Name_Elem.sendKeys("Test Event");
         await driver.findElement(By.xpath("//textarea[@name = 'description']")).sendKeys("Test Description");
         await driver.findElement(By.xpath("//input[@name = 'date']")).sendKeys("01032025");
         await driver.findElement(By.xpath("//input[@name = 'time']")).sendKeys("1200A");
         await driver.findElement(By.xpath("//input[@name = 'location']")).sendKeys("6th of October");
         await driver.findElement(By.xpath("//button[text() = 'Create Event']")).click();
         let Event_Elem = await driver.wait(until.elementLocated(By.xpath("//h6[text() = 'Test Event']")), 5000);
         let Event_Text = await Event_Elem.getText();
         expect(Event_Text).to.be.eq("Test Event");
     })
     // it("Admin can Delete the Event", async () => {
     //     /* The Delete button pressing cause the website to crash !! */
     //     let Delete_btn = await driver.wait(until.elementLocated(By.xpath("//button[text() = 'Delete']")), 5000)
     //     await Delete_btn.click();
     //     await driver.sleep(500);
     // })
     it("User can not create event with missing Event Name", async () => {
         let Dash_Elem = await driver.wait(until.elementLocated(By.xpath("//a[text() = 'Dashboard']")), 5000);
         await Dash_Elem.click();
         let Name_Elem = await driver.wait(until.elementLocated(By.xpath("//input[@type = 'text']")), 5000);
         await driver.findElement(By.xpath("//textarea[@name = 'description']")).sendKeys("Test Description");
         await driver.findElement(By.xpath("//input[@name = 'date']")).sendKeys("01032025");
         await driver.findElement(By.xpath("//input[@name = 'time']")).sendKeys("1200A");
         await driver.findElement(By.xpath("//input[@name = 'location']")).sendKeys("6th of October");
         await driver.findElement(By.xpath("//button[text() = 'Create Event']")).click();
         await driver.sleep(200);
         let Error_Message = await Name_Elem.getAttribute("validationMessage");
         expect(Error_Message).to.include("fill out");
     })
     it("User can not create event with missing Event Description", async () => {
         await driver.navigate().refresh();
         let Name_Elem = await driver.wait(until.elementLocated(By.xpath("//input[@type = 'text']")), 5000);
         await Name_Elem.sendKeys("Event Test");
         let Des_Elem = await driver.findElement(By.xpath("//textarea[@name = 'description']"));
         await driver.findElement(By.xpath("//input[@name = 'date']")).sendKeys("01032025");
         await driver.findElement(By.xpath("//input[@name = 'time']")).sendKeys("1200A");
         await driver.findElement(By.xpath("//input[@name = 'location']")).sendKeys("6th of October");
         await driver.findElement(By.xpath("//button[text() = 'Create Event']")).click();
         await driver.sleep(200);
         let Error_Message = await Des_Elem.getAttribute("validationMessage");
         expect(Error_Message).to.include("fill out");
     })
     it("User can not create event with missing Date", async () => {
         await driver.navigate().refresh();
         let Name_Elem = await driver.wait(until.elementLocated(By.xpath("//input[@type = 'text']")), 5000);
         await Name_Elem.sendKeys("Event Test");
         await driver.findElement(By.xpath("//textarea[@name = 'description']")).sendKeys("Event Test");
         let Date_Elem = await driver.findElement(By.xpath("//input[@name = 'date']"));
         await driver.findElement(By.xpath("//input[@name = 'time']")).sendKeys("1200A");
         await driver.findElement(By.xpath("//input[@name = 'location']")).sendKeys("6th of October");
         await driver.findElement(By.xpath("//button[text() = 'Create Event']")).click();
         await driver.sleep(200);
         let Error_Message = await Date_Elem.getAttribute("validationMessage");
         expect(Error_Message).to.include("fill out");
     })
     it("User can not create event with missing Time", async () => {
         await driver.navigate().refresh();
         let Name_Elem = await driver.wait(until.elementLocated(By.xpath("//input[@type = 'text']")), 5000);
         await Name_Elem.sendKeys("Event Test");
         await driver.findElement(By.xpath("//textarea[@name = 'description']")).sendKeys("Event Test");
         await driver.findElement(By.xpath("//input[@name = 'date']")).sendKeys("01032025");
         let Time_Elem = await driver.findElement(By.xpath("//input[@name = 'time']"));
         await driver.findElement(By.xpath("//input[@name = 'location']")).sendKeys("6th of October");
         await driver.findElement(By.xpath("//button[text() = 'Create Event']")).click();
         await driver.sleep(200);
         let Error_Message = await Time_Elem.getAttribute("validationMessage");
         expect(Error_Message).to.include("fill out");
     })
     it("User can not create event with missing Location", async () => {
         await driver.navigate().refresh();
         let Name_Elem = await driver.wait(until.elementLocated(By.xpath("//input[@type = 'text']")), 5000);
         await Name_Elem.sendKeys("Event Test");
         await driver.findElement(By.xpath("//textarea[@name = 'description']")).sendKeys("Event Test");
         await driver.findElement(By.xpath("//input[@name = 'date']")).sendKeys("01032025");;
         await driver.findElement(By.xpath("//input[@name = 'time']")).sendKeys("1200A");
         let Location_Elem = await driver.findElement(By.xpath("//input[@name = 'location']"));
         await driver.findElement(By.xpath("//button[text() = 'Create Event']")).click();
         await driver.sleep(200);
         let Error_Message = await Location_Elem.getAttribute("validationMessage");
         expect(Error_Message).to.include("fill out");
     })
     it("User can not create event with Invalid Date", async () => {
         await driver.navigate().refresh();
         let Name_Elem = await driver.wait(until.elementLocated(By.xpath("//input[@type = 'text']")), 5000);
         await Name_Elem.sendKeys("Event Test");
         await driver.findElement(By.xpath("//textarea[@name = 'description']")).sendKeys("Event Test");
         let Date_Elem = await driver.findElement(By.xpath("//input[@name = 'date']"));
         await Date_Elem.sendKeys("0103");
         await driver.findElement(By.xpath("//input[@name = 'time']")).sendKeys("1200A");
         await driver.findElement(By.xpath("//input[@name = 'location']")).sendKeys("6th of October");;
         await driver.findElement(By.xpath("//button[text() = 'Create Event']")).click();
         await driver.sleep(200);
         let Error_Message = await Date_Elem.getAttribute("validationMessage");
         expect(Error_Message).to.include("incomplete");
     })
     it("User can not create event with Invalid Time", async () => {
         await driver.navigate().refresh();
         let Name_Elem = await driver.wait(until.elementLocated(By.xpath("//input[@type = 'text']")), 5000);
         await Name_Elem.sendKeys("Event Test");
         await driver.findElement(By.xpath("//textarea[@name = 'description']")).sendKeys("Event Test");
         await driver.findElement(By.xpath("//input[@name = 'date']")).sendKeys("01032025");;
         let Time_Elem = await driver.findElement(By.xpath("//input[@name = 'time']"));
         await Time_Elem.sendKeys("1200");
         await driver.findElement(By.xpath("//input[@name = 'location']")).sendKeys("6th of October");;
         await driver.findElement(By.xpath("//button[text() = 'Create Event']")).click();
         await driver.sleep(200);
         let Error_Message = await Time_Elem.getAttribute("validationMessage");
         expect(Error_Message).to.include("incomplete");
     })
 
     
     after(async () => {
         await driver.quit();
     })
 })
 
 