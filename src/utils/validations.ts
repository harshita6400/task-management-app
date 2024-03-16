import { TaskForm } from "../interface/TaskInterface"

const checkRequired = (data: Object) => {
    let errors = {}
    let valid = true
    Object.keys(data).forEach(key => {
        const value = data[key as keyof Object]
        if (!(value || value === 0)) {
            errors = { ...errors, [key]: `Please enter ${key}` }
            valid = false
        } else errors = { ...errors, [key]: "" }
    })
    return { valid, errors }
}

export const taskValidations = (data: TaskForm) => {
    let isValid = true
    let errorMsgs = {}
    const { valid, errors } = checkRequired(data)
    isValid = valid
    errorMsgs = { ...errors }
    return { isValid, errorMsgs }
}
