"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const StudentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    class: { type: Number, required: true },
    division: { type: String, required: true },
    gender: { type: String, required: true }
});
exports.default = mongoose_1.default.model('Students', StudentSchema);
//# sourceMappingURL=model.js.map