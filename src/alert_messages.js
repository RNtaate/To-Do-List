let callAlertMessagesDiv = () => {
  return (document.querySelector('.alert-messages-div'));
}

let callBody = () => {
  return (document.querySelector('body'));  
}

let hideAlertMessagesDiv = (element, body) => {
  element.style.opacity = '0';
  element.style.visibility = 'hidden';
  body.style.pointerEvents = 'auto';
  element.style.pointerEvents = 'none';
}

let revealAlertMessagesDiv = (element, body) => {
  element.style.opacity = '1';
  element.style.visibility = 'visible';
  body.style.pointerEvents = 'none';
  element.style.pointerEvents = 'auto';
}

let myOkButtonPress = (myFunction = null) => {
  let alertMessagesDiv = callAlertMessagesDiv();
  let body = callBody();
  document.querySelector('.ok-button').addEventListener('click', function(e) {
    hideAlertMessagesDiv(alertMessagesDiv, body);
    if(myFunction !== null) {
      myFunction();
    }
  });
}

let myCancelButtonPress = () => {
  let alertMessagesDiv = callAlertMessagesDiv();
  let body = callBody();
  document.querySelector('.cancel-button').addEventListener('click', function(e) {
    hideAlertMessagesDiv(alertMessagesDiv, body);
  });
}

let myAlert = (message) => {
  let flashMessagesDiv = callAlertMessagesDiv();
  let body = callBody();

  let alertElement = '<p>'+ message + '</p><div class="alert-buttons-div"><button class="alert-message-btn ok-button">OK</button></div>'

  flashMessagesDiv.innerHTML = alertElement;
  revealAlertMessagesDiv(flashMessagesDiv, body);

  myOkButtonPress();
}

let myConfirm = (message, myFunc = null) => {
  let flashMessagesDiv = callAlertMessagesDiv();
  let body = callBody();
  let confirmElement = '<p>' + message + '</p><div class="alert-buttons-div"><button class="alert-message-btn cancel-button">Cancel</button><button class="alert-message-btn ok-button">OK</button></div>'

  flashMessagesDiv.innerHTML = confirmElement;
  revealAlertMessagesDiv(flashMessagesDiv, body);

  myOkButtonPress(myFunc);
  myCancelButtonPress();
}

export {myAlert, myConfirm};