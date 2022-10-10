import { Document } from "mongoose"

interface TaskInterface extends Document {
    isCompleted: boolean
    task: string
    date: number
}

export default TaskInterface
