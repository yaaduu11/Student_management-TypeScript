"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectIfAuthenticated = exports.isAuthenticated = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const JWT_SECRET = 'your_jwt_secret_key';
// Middleware to ensure the user is authenticated
const isAuthenticated = (req, res, next) => {
    const token = req.cookies.jwtToken; // Ensure consistency with the cookie name in the controller
    if (!token) {
        return res.redirect('/'); // Redirect to sign-in page if not authenticated
    }
    try {
        jsonwebtoken_1.default.verify(token, JWT_SECRET);
        next();
    }
    catch (err) {
        // Token is invalid or expired, redirect to sign-in page
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
};
exports.isAuthenticated = isAuthenticated;
// Middleware to redirect if the user is already authenticated
const redirectIfAuthenticated = (req, res, next) => {
    const token = req.cookies.jwtToken; // Ensure consistency with the cookie name in the controller
    if (token) {
        try {
            jsonwebtoken_1.default.verify(token, JWT_SECRET);
            return res.redirect('/home'); // Redirect to homepage if already authenticated
        }
        catch (err) {
            next(); // If the token is invalid, proceed to the requested route
        }
    }
    else {
        next(); // No token, proceed to the requested route
    }
};
exports.redirectIfAuthenticated = redirectIfAuthenticated;
//# sourceMappingURL=authMiddleware.js.map