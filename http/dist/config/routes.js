"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("../controllers/UserController");
var User = new UserController_1.UserController();
exports.createRoutes = function (router) {
    router.get('/api/user', User.index);
    router.get('/api/user/:id', User.show);
    router.post('/api/user', User.create);
    router.put('/api/user/:id', User.update);
    router.delete('/api/user', User.delete);
};
//# sourceMappingURL=routes.js.map