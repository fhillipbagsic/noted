import { Schema, model } from "mongoose"
import Task from "./task.interface"

const TaskSchema = new Schema({
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
})

const TaskModel = model<Task>("Task", TaskSchema)

export default TaskModel
