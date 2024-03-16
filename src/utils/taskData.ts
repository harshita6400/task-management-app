import { Status } from "../interface/TaskInterface"

interface TaskStatus {
    label: string
    value: Status
}

export const taskStatus: Array<TaskStatus> = [
    { label: "Select an task status", value: "" },
    { label: "To Do", value: "to-do" },
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" }
]