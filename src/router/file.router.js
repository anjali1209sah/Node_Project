"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_controller_1 = require("../controller/file.controller");
var FileRouter = /** @class */ (function () {
    function FileRouter(ExpressRouter) {
        this.router = ExpressRouter;
        this.getRouter();
        this.postRouter();
        this.putRouter();
        this.deleteRouter();
    }
    FileRouter.prototype.postRouter = function () {
        this.router.post('/write', file_controller_1.default.updateFileContent);
    };
    FileRouter.prototype.getRouter = function () {
        this.router.get('/read', file_controller_1.default.displayFileContent);
    };
    FileRouter.prototype.putRouter = function () {
    };
    FileRouter.prototype.deleteRouter = function () {
    };
    return FileRouter;
}());
exports.default = FileRouter;
