const callAlertMessagesDiv = () => (document.querySelector('.alert-messages-div'));

const callBody = () => (document.querySelector('body'));

const hideAlertMessagesDiv = (element, body) => {
  element.style.opacity = '0';
  element.style.visibility = 'hidden';
  body.style.pointerEvents = 'auto';
  element.style.pointerEvents = 'none';
};

const revealAlertMessagesDiv = (element, body) => {
  element.style.opacity = '1';
  element.style.visibility = 'visible';
  body.style.pointerEvents = 'none';
  element.style.pointerEvents = 'auto';
};

const myOkButtonPress = (myFunction = null) => {
  const alertMessagesDiv = callAlertMessagesDiv();
  const body = callBody();
  document.querySelector('.ok-button').addEventListener('click', () => {
    hideAlertMessagesDiv(alertMessagesDiv, body);
    if (myFunction !== null) {
      myFunction();
    }
  });
};

const myCancelButtonPress = () => {
  const alertMessagesDiv = callAlertMessagesDiv();
  const body = callBody();
  document.querySelector('.cancel-button').addEventListener('click', () => {
    hideAlertMessagesDiv(alertMessagesDiv, body);
  });
};

const myAlert = (message) => {
  const flashMessagesDiv = callAlertMessagesDiv();
  const body = callBody();

  const alertElement = `<p>${message}</p><div class="alert-buttons-div"><button class="alert-message-btn ok-button">OK</button></div>`;

  flashMessagesDiv.innerHTML = alertElement;
  revealAlertMessagesDiv(flashMessagesDiv, body);

  myOkButtonPress();
};

const myConfirm = (message, myFunc = null) => {
  const flashMessagesDiv = callAlertMessagesDiv();
  const body = callBody();
  const confirmElement = `<p>${message}</p><div class="alert-buttons-div"><button class="alert-message-btn cancel-button">Cancel</button><button class="alert-message-btn ok-button">OK</button></div>`;

  flashMessagesDiv.innerHTML = confirmElement;
  revealAlertMessagesDiv(flashMessagesDiv, body);

  myOkButtonPress(myFunc);
  myCancelButtonPress();
};

export { myAlert, myConfirm };