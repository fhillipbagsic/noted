import { Router, Request, Response } from "express"
import Controller from "../../utils/controller.interface"
import TaskService from "../../resources/task/task.service"
import validationMiddleware from "../../middleware/validation.middleware"
import { taskValidate, rangeValidate } from "./task.validation"
import TaskInterface from "./task.interface"
import { StatusCodes } from "http-status-codes"
import moment from "moment"

class TaskController implements Controller {
    public path = "/tasks"
    public router = Router()
    private TaskService = new TaskService()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router
            .route(`${this.path}`)
            .post(validationMiddleware(taskValidate), this.create)
            .get(validationMiddleware(rangeValidate), this.get)
            .patch(this.update)
        // .patch(validationMiddleware(updateValidate), this.update)
    }

    private create = async (req: Request, res: Response) => {
        const { isCompleted, task, date } = req.body as TaskInterface

        const response = await this.TaskService.create(isCompleted, task, date)

        res.status(StatusCodes.OK).json({ response })
    }

    private get = async (req: Request, res: Response) => {
        const range = req.query.range
        let start
        let end

        if (range === "weekly") {
            start = moment().startOf("isoWeek")
            end = moment().startOf("isoWeek").add(6, "day")
        } else {
            start = moment().startOf("isoWeek")
            end = moment().startOf("isoWeek").add(6, "day")
        }

        const response = await this.TaskService.get(start.unix(), end.unix())

        interface weeklySchedule {
            [key: string]: {
                label: string
                items: {
                    date: number
                    task: string
                    isCompleted: boolean
                    _id: string
                }[]
            }
        }
        let schedule
        if (range === "weekly") {
            const week: weeklySchedule = {
                [moment().startOf("isoWeek").unix()]: {
                    label: "monday",
                    items: [],
                },
                [moment().startOf("isoWeek").add(1, "day").unix()]: {
                    label: "tuesday",
                    items: [],
                },
                [moment().startOf("isoWeek").add(2, "day").unix()]: {
                    label: "wednesday",
                    items: [],
                },
                [moment().startOf("isoWeek").add(3, "day").unix()]: {
                    label: "thursday",
                    items: [],
                },
                [moment().startOf("isoWeek").add(4, "day").unix()]: {
                    label: "friday",
                    items: [],
                },
                [moment().startOf("isoWeek").add(5, "day").unix()]: {
                    label: "saturday",
                    items: [],
                },
                [moment().startOf("isoWeek").add(6, "day").unix()]: {
                    label: "sunday",
                    items: [],
                },
            }

            for (let i = 0; i < response.length; i++) {
                const task = {
                    date: response[i]["date"],
                    task: response[i]["task"],
                    isCompleted: response[i]["isCompleted"],
                    _id: response[i]["_id"],
                }
                week[String(task["date"])].items.push(task)
            }

            schedule = Object.values(week)
        } else {
        }

        res.status(StatusCodes.OK).json({ schedule })
    }

    private update = async (req: Request, res: Response) => {
        const { _id, status } = req.body

        const response = await this.TaskService.update(_id, status)
        res.status(StatusCodes.OK).json({ response })
    }
}

export default TaskController
