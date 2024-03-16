import React, { createContext, useState } from "react"
import { Animation } from "./Animation"
import { TaskList } from "../taskListing/TaskList"
import { AddTask } from "../addTask/AddTask"
import { Task } from "../task/Task"
import "./landingPage.scss";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { StepType } from "../../interface/TaskInterface"


const handleStep = (step: StepType) => {
    switch (step) {
        case "animation":
            return <Task />

        case "addTask":
            return <AddTask />

        case "taskTable":
            return <TaskList />
        default:
            return (<></>);
    }
};

export const StepContext = createContext<any>(null)


export const LandingPage: React.FC = () => {
    const [step, setStep] = useState<StepType>("animation")

    const handleStepChange = (newStep: StepType) => setStep(newStep)

    const actions = [
        { icon: <HomeOutlinedIcon />, name: 'Main Page', action: "animation" },
        { icon: <AddTaskIcon />, name: 'Add Task', action: "addTask" },
        { icon: <ViewListOutlinedIcon />, name: 'Task Table', action: "taskTable" },
    ];

    return (
        <>
            <div className="container">
                <div className="inner-container">
                    <StepContext.Provider value={{ handleStepChange }}>
                        {handleStep(step)}
                    </StepContext.Provider>
                </div>
                <SpeedDial
                    ariaLabel="Stepper"
                    sx={{ position: 'absolute', bottom: 70, right: 100 }}
                    icon={<SpeedDialIcon />}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            FabProps={{ disabled: (step === action.action) }}
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={() => handleStepChange(action.action as StepType)}
                        />
                    ))}
                </SpeedDial>
            </div>
            <Animation />
        </>
    )
}