
export type Status = "" | "to-do" | "pending" | "in-progress" | "completed"

export interface Task {
    id: number
    title: string
    description: string
    dueDate: Date,
    status: Status
    createdAt: Date
    updatedAt: Date
}

export interface TaskForm {
    id?: number
    title?: string
    description?: string
    dueDate?: string | Date,
    status?: Status
}

export interface SORT {
    order: "asc" | "des"
    orderBy: keyof Task
}
export type StepType = "animation" | "addTask" | "editTask" | "taskTable"
