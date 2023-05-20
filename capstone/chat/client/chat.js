// FILE /client/chat.js

// Socket.io() connects to the localhost 
//https://socket.io/docs/v4/
var socket = io.connect();

//Give a prompt to ask for the username
//https://www.w3schools.com/jsref/met_win_prompt.asp
const username = prompt("Welcome! Please enter your name:");

// Send event to server with the username typed into the box
//https://socket.io/docs/v3/emitting-events/
socket.emit("new-connection", { username });

// captures welcome-message event from the server and stores it in welcome-message
//https://sailsjs.com/documentation/reference/web-sockets/socket-client/io-socket-on
socket.on("welcome-message", (data) => {
  // adds message to server
  ////https://pro.arcgis.com/en/pro-app/latest/arcpy/functions/addmessage.htm
  addMessage(data, false);
});

// receives two params, the message and if it was sent by yourself
// so we can style them differently
function addMessage(data, isSelf = false) {
  //https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
  //messageElement var assigned a div element that's created
  const messageElement = document.createElement("div");
  //https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
  //Add the class message to messageElement
  messageElement.classList.add("message");

  //If the message is one that the user sends itself
  if (isSelf) {
    //https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
    ////Add the class self message to messageElement
    messageElement.classList.add("self-message");
    ////The users message becomes the innertext for messageElement
    messageElement.innerText = `${data.message}`;
  } else {
    //If the message is from the server
    if (data.user === "server") {
      // message is from the server, like a notification of new user connected
      messageElement.innerText = `${data.message}`;
    } else {
      // Or if the message is from another user in the chat
      ////Add the class others message to messageElement
      messageElement.classList.add("others-message");
      //The other users name and message becomes the innertext for messageElement
      messageElement.innerText = `${data.user}: ${data.message}`;
    }
  }
  // Grab the chatContainer element from the page and assign it to chatContainer var
  //https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
  const chatContainer = document.getElementById("chatContainer");

  // Append the first div to the new message container div
  //https://www.w3schools.com/python/ref_list_append.asp
  chatContainer.append(messageElement);
}

//  //https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
//// Grab the messageFOrm element from the page and assign it to messageForm var
const messageForm = document.getElementById("messageForm");

//https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
messageForm.addEventListener("submit", (e) => {
  // avoids submit the form and refresh the page
  e.preventDefault();
  // Grab the messageINput element from the page and assign it to messageInput var
  const messageInput = document.getElementById("messageInput");

  // check if there is a message in the input
  //https://getstream.io/chat/docs/sdk/reactnative/ui-components/message-input/
  if (messageInput.value !== "") {
    let newMessage = messageInput.value;
    //emit the  message and  id to the server for the socket
    //https://socket.io/docs/v3/emitting-events/
    socket.emit("new-message", { user: socket.id, message: newMessage });
    // appends message in chat container, with isSelf flag true
    //https://pro.arcgis.com/en/pro-app/latest/arcpy/functions/addmessage.htm
    addMessage({ message: newMessage }, true);
    //Message becomes empty after finished
    messageInput.value = "";
  } else {
    // Add error css to messageInput class
    messageInput.classList.add("error");
  }
});

//https://sailsjs.com/documentation/reference/web-sockets/socket-client/io-socket-on
socket.on("broadcast-message", (data) => {
  // appends message in chat container, with isSelf flag false
  //https://pro.arcgis.com/en/pro-app/latest/arcpy/functions/addmessage.htm
  addMessage(data, false);
});