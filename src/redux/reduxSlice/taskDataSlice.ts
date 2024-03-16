import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task, TaskForm } from "../../interface/TaskInterface";

interface TaskSlice {
    tasksData: Array<Task>
    editTaskData: TaskForm
    totalTasksAdded: number
    status: "loading" | "idel" | "error"

}

const initialState: TaskSlice = {
    tasksData: [],
    editTaskData: {},
    totalTasksAdded: 0,
    status: "idel",
}

const tasksDataSlice: any = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTaskReducer: (state, action: PayloadAction<Task>) => {
            const id = state.totalTasksAdded + 1
            state.totalTasksAdded = state.totalTasksAdded + 1
            state.tasksData.unshift({ ...action?.payload, ["id"]: id, ["createdAt"]: new Date(), ["updatedAt"]: new Date() })
        },
        updateTaskReducer: (state, action: PayloadAction<Task>) => {
            const index = state.tasksData.findIndex(item => item.id === action?.payload?.id)
            if (index !== -1) state.tasksData.splice(index, 1, { ...action?.payload, ["updatedAt"]: new Date() })
        },
        editTaskDataReducer: (state, action: PayloadAction<Task>) => {
            state.editTaskData = action.payload
        },
        deleteTaskReducer: (state, action: PayloadAction<number>) => {
            state.tasksData = state.tasksData.filter(item=>item.id!==action.payload)
        }
    },
})

export const { addTaskReducer, updateTaskReducer, editTaskDataReducer, deleteTaskReducer } = tasksDataSlice.actions;

export default tasksDataSlice.reducer