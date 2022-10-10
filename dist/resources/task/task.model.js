"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    isCompleted: {
        type: Boolean,
        required: [true, "Is completed required"],
    },
    task: {
        type: String,
        required: [true, "Task required"],
    },
    date: {
        type: Number,
        required: [true, "Date required"],
    },
});
const TaskModel = (0, mongoose_1.model)("Task", TaskSchema);
exports.default = TaskModel;
