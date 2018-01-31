"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var BodyParser = require("koa-bodyparser");
var Router = require("koa-router");
var routes_1 = require("./config/routes");
var app = new Koa();
var router = new Router();
app.use(BodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
routes_1.createRoutes(router);
var host = 'localhost';
var port = 3000;
app.listen(port, host, function () {
    console.log("Available on http://" + host + ":" + port);
});
//# sourceMappingURL=index.js.map