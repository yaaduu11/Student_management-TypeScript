"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var route_1 = require("./routes/route");
var express_session_1 = require("express-session");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.use((0, express_session_1.default)({
    secret: 'your_session_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('views', path_1.default.join(__dirname, '../src/public/views'));
app.set('view engine', 'ejs');
app.use('/', route_1.default);
mongoose_1.default.connect("mongodb://localhost:27017/student_management")
    .then(function () { return console.log('Connected to MongoDB'); })
    .catch(function (error) { return console.error('Connection failed', error); });
app.listen(PORT, function () {
    console.log("Running on http://localhost:".concat(PORT));
});
