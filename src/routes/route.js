"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("../controllers/controller");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = express_1.default.Router();
router.get('/', authMiddleware_1.isAuthenticated, controller_1.loadSignIn);
router.get('/home', authMiddleware_1.isAuthenticated, controller_1.loadHome);
router.post('/sign-in', controller_1.signIn);
router.get('/add-student', controller_1.loadAddStudent);
router.get('/edit-student/:id', authMiddleware_1.isAuthenticated, controller_1.loadEditStudent);
router.patch('/edit-student/:id', controller_1.editStudent);
router.post('/add-student', controller_1.addStudent);
router.post('/sign-out', controller_1.signOut);
router.delete('/delete-student/:id', controller_1.deleteStudent);
exports.default = router;
