"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const path_1 = tslib_1.__importDefault(require("path"));
const route_1 = tslib_1.__importDefault(require("./routes/route"));
const method_override_1 = tslib_1.__importDefault(require("method-override"));
// import session from 'express-session';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3002;
// app.use(session({
//     secret: 'your_session_secret_key',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false }
// }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, method_override_1.default)('_method'));
// app.use(cookieParser());
// app.use(bodyParser.json());
app.set('views', path_1.default.join(__dirname, '../src/public/views'));
app.set('view engine', 'ejs');
app.use('/', route_1.default);
mongoose_1.default.connect("mongodb://localhost:27017/student_management")
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Connection failed', error));
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map