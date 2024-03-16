import { StyledComponent } from "@emotion/styled"
import { TableCellProps, TableRowOwnProps } from "@mui/material"
import React from "react"
import { Task } from "../../interface/TaskInterface"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { splitWord } from "../../utils/tableUtils";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface IProps {
    StyledTableCell: StyledComponent<TableCellProps>
    StyledTableRow: StyledComponent<TableRowOwnProps>
    index: number
    row: Task
    handleEdit: (row: Task) => void
    handleDelete: (id: number) => void
}

export const TableData: React.FC<IProps> = ({ StyledTableCell, StyledTableRow, row, index, handleDelete, handleEdit }) => {
    return (
        <>
            <StyledTableRow>
                <StyledTableCell>{index + 1}</StyledTableCell>
                {
                    Object.keys(row).map((cell, i: number) => {
                        if (cell !== "id") {
                            const cellData = cell === "status" ? splitWord(row[cell as keyof Task] as string) : row[cell as keyof Task]
                            if (cell.includes("Date") || cell.includes("At")) {
                                const dueDate = new Date(cellData)
                                const date = dueDate?.getDate()
                                const month = months[dueDate.getMonth()].slice(0, 3)
                                return (
                                    <StyledTableCell sx={{ textAlign: "center" }}>{`${date} ${month}`}</StyledTableCell>
                                )
                            }
                            else {
                                return (
                                    <>
                                        <StyledTableCell key={Number(`${row.id}${i}`)}>{cellData as string}</StyledTableCell>
                                    </>
                                )
                            }
                        }
                    })
                }
                <StyledTableCell>
                    <EditIcon onClick={() => handleEdit(row)} />
                    <DeleteIcon onClick={() => handleDelete(row.id)} />
                </StyledTableCell>
            </StyledTableRow>

        </>
    )
}