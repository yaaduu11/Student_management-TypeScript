"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.deleteStudent = exports.editStudent = exports.loadEditStudent = exports.addStudent = exports.signIn = exports.loadAddStudent = exports.loadHome = exports.loadSignIn = void 0;
const tslib_1 = require("tslib");
const asyncHandler_1 = tslib_1.__importDefault(require("../middlewares/asyncHandler"));
const model_1 = tslib_1.__importDefault(require("../models/model"));
const JWT_SECRET = 'your_jwt_secret_key';
exports.loadSignIn = (0, asyncHandler_1.default)(async (req, res) => {
    res.status(200).render('sign-in');
});
exports.loadHome = (0, asyncHandler_1.default)(async (req, res) => {
    const students = await model_1.default.find({});
    res.status(200).render('home', { students });
});
exports.loadAddStudent = (0, asyncHandler_1.default)(async (req, res) => {
    res.status(200).render('add-student', { error: null });
});
exports.signIn = (0, asyncHandler_1.default)(async (req, res) => {
    const { username, password } = req.body;
    if (username !== 'yadu@2005' || password !== '123asd') {
        return res.status(400).json({ error: 'Username or password is incorrect' });
    }
    res.redirect('/home');
});
exports.addStudent = (0, asyncHandler_1.default)(async (req, res) => {
    const { name, class: studentClass, division, gender } = req.body;
    if (!name || !studentClass || !division || !gender) {
        return res.status(400).render('add-student', { error: 'All fields are required.' });
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
        return res.status(400).render('add-student', { error: 'Name can only contain letters and spaces.' });
    }
    const newStudent = new model_1.default({
        name,
        class: studentClass,
        division,
        gender
    });
    try {
        await newStudent.save();
        res.redirect('/add-student?success=true');
    }
    catch (err) {
        console.error('Error saving student:', err);
        res.status(500).render('add-student', { error: 'An error occurred while adding the student.' });
    }
});
exports.loadEditStudent = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    try {
        const student = await model_1.default.findById(id);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.status(200).render('edit-student', { student });
    }
    catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).send('Internal Server Error');
    }
});
exports.editStudent = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { name, class: studentClass, division, gender } = req.body;
    if (!name || !studentClass || !division || !gender) {
        return res.status(400).render('edit-student', { error: 'All fields are required.', student: { _id: id, name, class: studentClass, division, gender } });
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
        return res.status(400).render('edit-student', { error: 'Name can only contain letters and spaces.', student: { _id: id, name, class: studentClass, division, gender } });
    }
    try {
        const student = await model_1.default.findByIdAndUpdate(id, {
            name,
            class: studentClass,
            division,
            gender
        }, { new: true });
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.redirect('/home');
    }
    catch (err) {
        console.error('Error updating student:', err);
        res.status(500).render('edit-student', { error: 'An error occurred while updating the student.', student: { _id: id, name, class: studentClass, division, gender } });
    }
});
exports.deleteStudent = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    try {
        const student = await model_1.default.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ success: 'Student deleted successfully' });
    }
    catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).json({ error: 'An error occurred while deleting the student' });
    }
});
exports.signOut = (0, asyncHandler_1.default)(async (req, res) => {
    res.redirect('/');
});
//# sourceMappingURL=controller.js.map