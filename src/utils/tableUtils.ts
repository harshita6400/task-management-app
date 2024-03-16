import { SORT, Task, TaskForm } from "../interface/TaskInterface"

export function isEmpty(obj = {}) {
    return Object.keys(obj).length === 0
}

export function toLowerCase(value?: string | number | Date) {
    if (value !== undefined) {
        return value?.toLocaleString().toLowerCase()
    }
    return value || ""
}

export function filterRows(rows: Task[], filters: TaskForm) {
    if (!filters) return rows
    if (isEmpty(filters)) return rows
    return rows.filter((row) => {
        return Object.keys(filters).every((cell) => {
            const value = row[cell as keyof Task]
            const searchValue = filters[cell as keyof TaskForm]
            return toLowerCase(value).includes(toLowerCase(searchValue))
        })
    })
}

export function sortRows(rows: Task[], sort: SORT) {
    const { order, orderBy } = sort
    const newArr = [...rows]
    return newArr.sort((a, b) => {
        if (order === "des") return Number(new Date(b[orderBy])) - Number(new Date(a[orderBy]))
        else return Number(new Date(a[orderBy])) - Number(new Date(b[orderBy]))
    })
}

export function paginateRows(sortedRows: Task[], activePage: any, rowsPerPage: any) {
    return [...sortedRows].slice(activePage * rowsPerPage, (activePage + 1) * rowsPerPage)
}

export const splitWord = (text: string) => {
    return text.split("-").join(" ").split("").map(item => item.toUpperCase() === item ? ` ${item}` : item).join("")
}

