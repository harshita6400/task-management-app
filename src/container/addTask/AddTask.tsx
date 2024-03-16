import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { Col, Row } from "../../components"
import { Button, FormControl, MenuItem, TextField } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import './addTask.scss';
import { TaskForm } from "../../interface/TaskInterface";
import { taskValidations } from "../../utils/validations";
import { addTaskReducer, editTaskDataReducer, updateTaskReducer } from "../../redux/reduxSlice/taskDataSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { taskStatus } from "../../utils/taskData";
import { StepContext } from "../landingPage/LandingPage";

interface IProps { }

const initialState: TaskForm = {
    title: "",
    description: "",
    dueDate: "",
    status: ""
}

export const AddTask: React.FC<IProps> = ({ }) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const editTask: TaskForm = useSelector((store: any) => store?.taskDataSlice?.editTaskData)
    const { handleStepChange } = useContext<any>(StepContext)

    const dispatch = useDispatch()

    const [task, setTask] = useState<TaskForm>(initialState)
    const [errorMessages, setErrorMessages] = useState(initialState)


    useEffect(() => {
        if (editTask?.id) {
            setTask(editTask)
            dispatch(editTaskDataReducer({}))
        }
    }, [editTask])

    const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        const newdata = { [name]: value }
        const { errorMsgs } = taskValidations(newdata)
        setTask({ ...task, ...newdata })
        setErrorMessages({ ...errorMessages, ...errorMsgs })
    }

    const handleChangeDate = (name: "dueDate", dateValue: { $d: Date } | Dayjs | null | any) => {
        const date = dateValue?.$d as Date || ""
        const newdata = { [name]: date }
        const { errorMsgs } = taskValidations(newdata)
        setTask({ ...task, ...newdata })
        setErrorMessages({ ...errorMessages, ...errorMsgs })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const { isValid, errorMsgs } = taskValidations(task)
            setErrorMessages({ ...errorMessages, ...errorMsgs })
            if (!isValid) return

            if (!task.id) {
                dispatch(addTaskReducer(task))
                setTask(initialState)
            } else dispatch(updateTaskReducer(task))
            Swal.fire({
                icon: 'success',
                text: `Task ${task.id ? "updated" : "added"} successfully`,
            })
            dispatch(editTaskDataReducer({}))
            setTimeout(() => {
                handleStepChange("animation")
            }, 1000)

        } catch (error) {
            console.log(error)
        }
    }

    const handleReset = () => {
        setTask(initialState)
        setErrorMessages(initialState)
    }

    return (
        <>
            <div className="task-container">
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <h2>{`${task?.id ? "Update" : " Add"} Task`}</h2>
                    <Row>
                        <Col sx={12}>
                            <FormControl>
                                <TextField
                                    label="Title Name"
                                    type="text"
                                    name="title"
                                    value={task.title}
                                    variant="standard"
                                    onChange={handleChange}
                                    error={Boolean(errorMessages?.title)}
                                    helperText={errorMessages?.title}
                                />
                            </FormControl>
                        </Col>
                    </Row>

                    <Row>
                        <Col sx={12}>
                            <FormControl>
                                <TextField
                                    label="Task Description"
                                    multiline
                                    rows={2}
                                    type="text"
                                    name="description"
                                    value={task.description}
                                    variant="standard"
                                    onChange={handleChange}
                                    error={Boolean(errorMessages?.description)}
                                    helperText={errorMessages?.description}
                                />
                            </FormControl>
                        </Col>
                    </Row>

                    <Row>
                        <Col sx={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <FormControl className={`${errorMessages?.dueDate ? "error" : "primary"}`}>
                                    <DatePicker
                                        label="Event Due Date"
                                        minDate={dayjs(tomorrow)}
                                        value={dayjs(task.dueDate)}
                                        onChange={(date) => handleChangeDate("dueDate", date)}
                                    />
                                    <span>{errorMessages?.dueDate as string}</span>
                                </FormControl>
                            </LocalizationProvider>
                        </Col>
                        <Col sx={6}>
                            <FormControl>
                                <TextField
                                    select
                                    label="Select an Task Status"
                                    name="status"
                                    value={task.status}
                                    variant="standard"
                                    onChange={handleChange}
                                    error={Boolean(errorMessages?.status)}
                                    helperText={errorMessages?.status}
                                >
                                    {taskStatus.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>

                        </Col>
                    </Row>

                    <Row>
                        <Col sx={6}>
                            <Button disabled={Boolean(task?.id)} type="reset" variant="outlined">Reset</Button>
                        </Col>
                        <Col sx={6}>
                            <Button type="submit" variant="contained">{task?.id ? "Update" : "Submit"}</Button>
                        </Col>
                    </Row>
                </form>
            </div>

        </>
    )
}