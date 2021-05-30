const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
var cors = require('cors');
const usersController = require("./server/controller/user-controller");
const vacationsController = require("./server/controller/vacation-controller");
const errorHandler = require("./server/errors/error-handler");
const subscribers = require("./realtime")
const server = express();
server.use(cors({ origin: "http://localhost:3000" }));
server.use(express.json());
server.use(express.static(`${__dirname}\\server\\static`));
const httpServer = http.Server(server);
const io = socketIO(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
server.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId
    console.log('new connection from ', userId)
    subscribers[userId] = socket;

    socket.on("disconnect", () => {
        delete subscribers[userId]
        console.log('debug disconnect for ', userId);
    })
})

server.use("/users", usersController);
server.use("/vacations", vacationsController)
server.use(errorHandler);
httpServer.listen(3001, '127.0.0.1')





