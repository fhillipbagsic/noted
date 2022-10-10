"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("express-async-errors");
const app_1 = __importDefault(require("./app"));
const task_controller_1 = __importDefault(require("./resources/task/task.controller"));
const app = new app_1.default([new task_controller_1.default()], Number(process.env.PORT));
app.listen();
