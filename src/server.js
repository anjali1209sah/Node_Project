"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var file_router_1 = require("./router/file.router");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.port = 4000;
        this.router = express.Router();
        this.setConfigurations();
        this.setCors();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    Server.prototype.setConfigurations = function () {
        this.configureBodyParser();
    };
    Server.prototype.configureBodyParser = function () {
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
    };
    Server.prototype.setCors = function () {
        var corsOptions = {
            origin: "*",
            methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
        };
        this.app.use(cors(corsOptions));
    };
    Server.prototype.setRoutes = function () {
        this.app.use('/file', new file_router_1.default(this.router).router);
    };
    Server.prototype.error404Handler = function () {
        this.app.use(function (req, res) {
            console.log("route not found ==> ", req.body);
            res.status(404).json({ message: 'Not Found', status_code: 404 });
        });
    };
    Server.prototype.handleErrors = function () {
        this.app.use(function (error, req, res, next) {
            var errorStatus = error.code;
            console.log("in handle errors - ", error);
            var errResonse = {
                status: error.status, code: errorStatus,
                error: [{ type: error.type, message: error.message }]
            };
            console.log("in handle errors return - ", errResonse);
            res.status(errorStatus).json(errResonse);
        });
    };
    return Server;
}());
exports.Server = Server;
