import TaskModel from "./task.model"

class TaskService {
    private Task = TaskModel

    public async create(isCompleted: boolean, task: string, date: number) {
        const response = await this.Task.create({ isCompleted, task, date })

        return response
    }

    public async get(from: number, to: number) {
        const response = await this.Task.find({
            date: {
                $gte: from,
                $lte: to,
            },
        }).lean()

        return response
    }

    public async update(_id: string, status: boolean) {
        const response = await this.Task.updateOne(
            { _id },
            { isCompleted: status }
        )

        return response
    }
}

export default TaskService
