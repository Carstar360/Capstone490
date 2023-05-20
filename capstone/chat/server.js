//https://www.w3schools.com/nodejs/nodejs_http.asp
var http = require("http");
//https://www.w3schools.com/nodejs/nodejs_filesystem.asp
var fs = require("fs");
//https://www.w3schools.com/nodejs/ref_path.asp
var path = require("path");
//https://www.tabnine.com/code/javascript/functions/process/ProcessEnv/APP_PORT
//This is where we assign 3002 localhost as the app port we want the server to run on
const APP_PORT = process.env.APP_PORT || 3002;
//https://www.w3schools.com/nodejs/met_http_createserver.asp
const app = http.createServer(requestHandler);

//https://www.geeksforgeeks.org/express-js-app-listen-function/
//Tell the app to listen on localhost 3002
app.listen(APP_PORT);

// Handler for all of the http requests at the server
function requestHandler(request, response) {
  // File path becomes ./client appended by the url
  var filePath = "./client" + request.url;
  //If file path is just client
  if (filePath == "./client/") {
    // serve index page on request /
    filePath = "./client/index.html";
  }
  //Adjust the filepath to lowercase
  var extname = String(path.extname(filePath)).toLowerCase();
  //https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  var mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };
  //https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  var contentType = mimeTypes[extname] || "application/octet-stream";
  //https://nodejs.org/dist/latest-v6.x/docs/api/fs.html
  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == "ENOENT") {
        fs.readFile("./client/404.html", function (error, content) {
          //https://www.geeksforgeeks.org/node-js-response-writehead-method/
          response.writeHead(404, { "Content-Type": contentType });
          //https://nodejs.org/api/http.html#responseenddata-encoding-callback
          response.end(content, "utf-8");
        });
      } else {
        //https://www.geeksforgeeks.org/node-js-response-writehead-method/
        response.writeHead(500);
        //https://nodejs.org/api/http.html#responseenddata-encoding-callback
        response.end("Sorry, there was an error: " + error.code + " ..\n");
      }
    } else {
      //https://www.geeksforgeeks.org/node-js-response-writehead-method/
      response.writeHead(200, { "Content-Type": contentType });
      //https://nodejs.org/api/http.html#responseenddata-encoding-callback
      response.end(content, "utf-8");
    }
  });
}

// https://socket.io/get-started/chat
//https://socket.io/docs/v3/server-initialization/
const io = require("socket.io")(app, {
  path: "/socket.io",
});

//https://socket.io/docs/v4/server-api/
//Attaches the app to an http server
io.attach(app, {
  // includes local domain to avoid CORS error locally
  // configure it accordingly for production
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket", "polling"],
  },
  allowEIO3: true,
});

//Users array that holds the names of the people that join
var users = {};

//https://sailsjs.com/documentation/reference/web-sockets/socket-client/io-socket-on
io.on("connection", (socket) => {
  //Message to the log that tells us another user has connected
  console.log("👾 New socket connected! >>", socket.id);

  // New connection handler 
  //https://sailsjs.com/documentation/reference/web-sockets/socket-client/io-socket-on
  socket.on("new-connection", (data) => {
    //Message to the log that tells us another user has connected
    console.log(`new-connection event received`, data);
    // grab username attribute and add all of the users to a list of users
    users[socket.id] = data.username;
    // Display the current list of users in the log
    console.log("users :>> ", users);
    // emit welcome message event
    //https://socket.io/docs/v3/emitting-events/
    socket.emit("welcome-message", {
      user: "server",
      //DIsplay the welcome message
      message: `Welcome to SNKRS Support chat, ${data.username}. We will be with you shortly.
      There are ${
        //Display the number of users in the chat
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
        Object.keys(users).length
      } users connected...`,
    });
  });

  // handles message posted by client
  //https://socket.io/docs/v3/emitting-events/
  socket.on("new-message", (data) => {
    //Write message to console when a new message is typed
    console.log(`👾 new-message from ${data.user}`);
    // Broadcast a message to everyone except the user
    //https://socket.io/docs/v3/emitting-events/
    socket.broadcast.emit("broadcast-message", {
      //Display the users in the users list
      user: users[data.user],
      //Display the message in the data
      message: data.message,
    });
  });
});