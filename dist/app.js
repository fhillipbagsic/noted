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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_middleware_1 = __importDefault(require("./utils/errorHandler.middleware"));
const http_status_codes_1 = require("http-status-codes");
class App {
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initializeConnection();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    initializeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield mongoose_1.default.connect("mongodb+srv://fhillipbgsc:may202000@cluster0.n5ci2.mongodb.net/Noted?retryWrites=true&w=majority", {});
            console.log(connection.connection.host);
        });
    }
    initializeMiddlewares() {
        this.express.use((0, cors_1.default)());
        this.express.use((0, morgan_1.default)("dev"));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, compression_1.default)());
    }
    initializeControllers(controllers) {
        this.express.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(http_status_codes_1.StatusCodes.OK).send("Noted API");
        }));
        controllers.forEach((controller) => {
            this.express.use("/api", controller.router);
        });
    }
    initializeErrorHandling() {
        this.express.use(errorHandler_middleware_1.default);
    }
    listen() {
        this.express.listen(this.port, () => console.log(`App listening on port ${this.port}`));
    }
}
exports.default = App;
