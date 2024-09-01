"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var StudentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    class: { type: Number, required: true },
    division: { type: String, required: true },
    gender: { type: String, required: true }
});
exports.default = mongoose_1.default.model('Students', StudentSchema);
