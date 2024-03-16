import React, { useEffect, useRef } from "react"
import { Col, Row } from "../../components"
import './task.scss';

interface IProps { }

export const Task: React.FC<IProps> = ({ }) => {
    const ref = useRef<HTMLUListElement>(null)

    useEffect(() => {
        const listItems = ref?.current && ref?.current?.children
        const totalItems = listItems?.length
        let currItem = 0
        const animationTimer = setInterval(() => {
            listItems?.item(currItem)?.classList?.add("show")
            currItem = currItem + 1
            if (currItem === totalItems) clearInterval(animationTimer)
        }, 2 * 1000)
        return () => clearInterval(animationTimer)
    }, [])


    return (
        <>
            <h1>Create your own task list</h1>
            <Row>
                <Col sx={2}></Col>
                <Col sx={10}>
                    <div className="main-banner">
                        <ul className="hide" ref={ref}>
                            <li>Create your own Task List</li>
                            <li>Manage your Task List</li>
                            <li>Check your Task status</li>
                            <li>Modify your Task</li>
                            <li>Update your Task status</li>
                            <li>Filter your task by due date</li>
                            <li>Easy filteration and sorting</li>
                            <li>Delete your task</li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </>
    )
}