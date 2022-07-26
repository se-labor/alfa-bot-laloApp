const {element, by, browser} = require("protractor");
describe('Chat', function() {
  let inputField;
  let sendButton;

  beforeEach(function() {
    browser.get('http://localhost:4200');

    inputField = element.all(by.css("form input"));
    sendButton = element.all(by.buttonText("send"));
  });

  it('should have found the inputField', function() {
    expect(inputField).toBeTruthy();
  });

  it('should have found the sendButton', function() {
    expect(sendButton).toBeTruthy();
  });

  it('should send a message', async function () {
    let messages = element.all(by.css(".chat li"));
    let messageCount = await messages.count();
    inputField.sendKeys("Wen soll ich wählen?");
    sendButton.click();
    expect(messages.count()).toBeGreaterThan(messageCount + 1);
  });

  it('should send a message using a message button', async function () {
    let messages = element.all(by.css(".chat li"));
    let messageCount = await messages.count();
    let messageButton = element.all(by.partialButtonText("?")).get(0); //Maybe find common button that can be tested
    messageButton.click();
    expect(messages.count()).toBeGreaterThan( messageCount + 1);
  });
});
