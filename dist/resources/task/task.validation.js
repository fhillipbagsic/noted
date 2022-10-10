"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidate = exports.rangeValidate = exports.taskValidate = void 0;
const joi_1 = __importDefault(require("joi"));
const taskValidate = joi_1.default.object({
    isCompleted: joi_1.default.boolean().required(),
    task: joi_1.default.string().required(),
    date: joi_1.default.number().required(),
});
exports.taskValidate = taskValidate;
const rangeValidate = joi_1.default.object({
    range: joi_1.default.string(),
});
exports.rangeValidate = rangeValidate;
const updateValidate = joi_1.default.object({
    _id: joi_1.default.string().required(),
    status: joi_1.default.boolean().required(),
});
exports.updateValidate = updateValidate;
