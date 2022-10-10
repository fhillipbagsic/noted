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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_service_1 = __importDefault(require("../../resources/task/task.service"));
const validation_middleware_1 = __importDefault(require("../../middleware/validation.middleware"));
const task_validation_1 = require("./task.validation");
const http_status_codes_1 = require("http-status-codes");
const moment_1 = __importDefault(require("moment"));
class TaskController {
    constructor() {
        this.path = "/tasks";
        this.router = (0, express_1.Router)();
        this.TaskService = new task_service_1.default();
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { isCompleted, task, date } = req.body;
            const response = yield this.TaskService.create(isCompleted, task, date);
            res.status(http_status_codes_1.StatusCodes.OK).json({ response });
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const range = req.query.range;
            let start;
            let end;
            if (range === "weekly") {
                start = (0, moment_1.default)().startOf("isoWeek");
                end = (0, moment_1.default)().startOf("isoWeek").add(6, "day");
            }
            else {
                start = (0, moment_1.default)().startOf("isoWeek");
                end = (0, moment_1.default)().startOf("isoWeek").add(6, "day");
            }
            const response = yield this.TaskService.get(start.unix(), end.unix());
            let schedule;
            if (range === "weekly") {
                const week = {
                    [(0, moment_1.default)().startOf("isoWeek").unix()]: {
                        label: "monday",
                        items: [],
                    },
                    [(0, moment_1.default)().startOf("isoWeek").add(1, "day").unix()]: {
                        label: "tuesday",
                        items: [],
                    },
                    [(0, moment_1.default)().startOf("isoWeek").add(2, "day").unix()]: {
                        label: "wednesday",
                        items: [],
                    },
                    [(0, moment_1.default)().startOf("isoWeek").add(3, "day").unix()]: {
                        label: "thursday",
                        items: [],
                    },
                    [(0, moment_1.default)().startOf("isoWeek").add(4, "day").unix()]: {
                        label: "friday",
                        items: [],
                    },
                    [(0, moment_1.default)().startOf("isoWeek").add(5, "day").unix()]: {
                        label: "saturday",
                        items: [],
                    },
                    [(0, moment_1.default)().startOf("isoWeek").add(6, "day").unix()]: {
                        label: "sunday",
                        items: [],
                    },
                };
                for (let i = 0; i < response.length; i++) {
                    const task = {
                        date: response[i]["date"],
                        task: response[i]["task"],
                        isCompleted: response[i]["isCompleted"],
                        _id: response[i]["_id"],
                    };
                    week[String(task["date"])].items.push(task);
                }
                schedule = Object.values(week);
            }
            else {
            }
            res.status(http_status_codes_1.StatusCodes.OK).json({ schedule });
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _id, status } = req.body;
            const response = yield this.TaskService.update(_id, status);
            res.status(http_status_codes_1.StatusCodes.OK).json({ response });
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route(`${this.path}`)
            .post((0, validation_middleware_1.default)(task_validation_1.taskValidate), this.create)
            .get((0, validation_middleware_1.default)(task_validation_1.rangeValidate), this.get)
            .patch(this.update);
        // .patch(validationMiddleware(updateValidate), this.update)
    }
}
exports.default = TaskController;
