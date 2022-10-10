import "dotenv/config"
import "express-async-errors"
import App from "./app"
import TaskController from "./resources/task/task.controller"

const app = new App([new TaskController()], Number(process.env.PORT))

app.listen()
