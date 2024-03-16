import { StyledComponent } from "@emotion/styled"
import { TableCellProps, TableHead, TableRow, TableRowOwnProps } from "@mui/material"
import React from "react"
import { Task } from "../../interface/TaskInterface"
import { splitWord } from "../../utils/tableUtils"

interface IProps {
    StyledTableCell: StyledComponent<TableCellProps>
    data: Task
}

export const TableHeader: React.FC<IProps> = ({ StyledTableCell, data }) => {
    return (
        <>
            <TableHead>
                <TableRow>
                    <StyledTableCell>Index</StyledTableCell>
                    {
                        Object.keys(data).map((cell, i: number) => {
                            if (cell !== "id") {
                                return (
                                    <StyledTableCell key={i} >
                                        <p>{splitWord(cell)}</p>
                                    </StyledTableCell>
                                )
                            }
                        })
                    }
                    <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
            </TableHead>
        </>
    )
}