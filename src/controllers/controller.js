"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.deleteStudent = exports.editStudent = exports.loadEditStudent = exports.addStudent = exports.signIn = exports.loadAddStudent = exports.loadHome = exports.loadSignIn = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var asyncHandler_1 = require("../middlewares/asyncHandler");
var model_1 = require("../models/model");
var JWT_SECRET = 'your_jwt_secret_key';
exports.loadSignIn = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).render('sign-in');
        return [2 /*return*/];
    });
}); });
exports.loadHome = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var students, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, model_1.default.find({})];
            case 1:
                students = _a.sent();
                res.status(200).render('home', { students: students });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error('Error fetching students:', err_1);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.loadAddStudent = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).render('add-student', { error: null });
        return [2 /*return*/];
    });
}); });
exports.signIn = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, token;
    return __generator(this, function (_b) {
        _a = req.body, username = _a.username, password = _a.password;
        if (username !== "yadu@2005" || password !== "123asd") {
            return [2 /*return*/, res.status(400).json({ error: 'Username or password is incorrect' })];
        }
        token = jsonwebtoken_1.default.sign({ username: username }, JWT_SECRET, { expiresIn: '1h' });
        req.session.jwt = token;
        return [2 /*return*/, res.status(200).json({ success: "Welcome Admin" })];
    });
}); });
exports.addStudent = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, studentClass, division, gender, newStudent, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, studentClass = _a.class, division = _a.division, gender = _a.gender;
                if (!name || !studentClass || !division || !gender) {
                    return [2 /*return*/, res.status(400).render('add-student', { error: 'All fields are required.' })];
                }
                if (!/^[A-Za-z\s]+$/.test(name)) {
                    return [2 /*return*/, res.status(400).render('add-student', { error: 'Name can only contain letters and spaces.' })];
                }
                newStudent = new model_1.default({
                    name: name,
                    class: studentClass,
                    division: division,
                    gender: gender
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, newStudent.save()];
            case 2:
                _b.sent();
                res.redirect('/add-student?success=true');
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                console.error('Error saving student:', err_2);
                res.status(500).render('add-student', { error: 'An error occurred while adding the student.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.loadEditStudent = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, student, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, model_1.default.findById(id)];
            case 2:
                student = _a.sent();
                if (!student) {
                    return [2 /*return*/, res.status(404).send('Student not found')];
                }
                res.status(200).render('edit-student', { student: student });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.error('Error fetching student:', err_3);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.editStudent = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, studentClass, division, gender, student, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, studentClass = _a.class, division = _a.division, gender = _a.gender;
                if (!name || !studentClass || !division || !gender) {
                    return [2 /*return*/, res.status(400).render('edit-student', { error: 'All fields are required.', student: { _id: id, name: name, class: studentClass, division: division, gender: gender } })];
                }
                if (!/^[A-Za-z\s]+$/.test(name)) {
                    return [2 /*return*/, res.status(400).render('edit-student', { error: 'Name can only contain letters and spaces.', student: { _id: id, name: name, class: studentClass, division: division, gender: gender } })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, model_1.default.findByIdAndUpdate(id, {
                        name: name,
                        class: studentClass,
                        division: division,
                        gender: gender
                    }, { new: true })];
            case 2:
                student = _b.sent();
                if (!student) {
                    return [2 /*return*/, res.status(404).send('Student not found')];
                }
                res.redirect('/home');
                return [3 /*break*/, 4];
            case 3:
                err_4 = _b.sent();
                console.error('Error updating student:', err_4);
                res.status(500).render('edit-student', { error: 'An error occurred while updating the student.', student: { _id: id, name: name, class: studentClass, division: division, gender: gender } });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.deleteStudent = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, student, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, model_1.default.findByIdAndDelete(id)];
            case 2:
                student = _a.sent();
                if (!student) {
                    return [2 /*return*/, res.status(404).json({ error: 'Student not found' })];
                }
                res.status(200).json({ success: 'Student deleted successfully' });
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                console.error('Error deleting student:', err_5);
                res.status(500).json({ error: 'An error occurred while deleting the student' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.signOut = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        req.session.destroy(function (err) {
            if (err) {
                return res.status(500).json({ error: 'Could not log out, please try again.' });
            }
            res.status(200).json({ success: 'Logged out successfully' });
        });
        return [2 /*return*/];
    });
}); });
