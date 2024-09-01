"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const router = express_1.default.Router();
router.get('/', controller_1.loadSignIn);
router.post('/sign-in', controller_1.signIn);
router.get('/home', controller_1.loadHome);
router.get('/add-student', controller_1.loadAddStudent);
router.get('/edit-student/:id', controller_1.loadEditStudent);
router.post('/add-student', controller_1.addStudent);
router.post('/sign-out', controller_1.signOut);
router.patch('/edit-student/:id', controller_1.editStudent);
router.delete('/delete-student/:id', controller_1.deleteStudent);
exports.default = router;
//# sourceMappingURL=route.js.map