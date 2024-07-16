"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var server = new server_1.Server();
var port = server.port;
var app = server.app;
app.get('/', function (req, res) {
    res.send('Hello, World!');
});
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port, "/"));
});
