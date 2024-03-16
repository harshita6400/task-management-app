import { MenuItem, TableCellProps, TableRowOwnProps, TextField } from "@mui/material"
import { SORT, Task, TaskForm } from "../../interface/TaskInterface"
import { StyledComponent } from "@emotion/styled"
import { taskStatus } from "../../utils/taskData"


interface IProps {
    StyledTableCell: StyledComponent<TableCellProps>
    StyledTableRow: StyledComponent<TableRowOwnProps>
    data: Task
    sort: SORT
    handleSort: (cell: keyof Task) => void
    handleSearch: (value: string, accessor: keyof TaskForm) => void
}

export const TableFilters: React.FC<IProps> = ({ StyledTableRow, StyledTableCell, data, sort, handleSort, handleSearch }) => {

    return (
        <>
            <StyledTableRow>
                <StyledTableCell> </StyledTableCell>
                {
                    Object.keys(data).map((cell, i: number) => {
                        if (cell !== "id") {
                            return (
                                <StyledTableCell key={i} >
                                    {
                                        cell.includes("Date") || cell.includes("At")
                                            ? <SortIcon
                                                cell={cell as keyof Task}
                                                sort={sort}
                                                handleSort={handleSort}
                                            />
                                            : cell === "status"
                                                ? <TextField
                                                    select
                                                    label="Select an Task Status"
                                                    onChange={(event) => handleSearch(event.target.value, cell as keyof TaskForm)}
                                                >
                                                    {taskStatus.map((option, index) => (
                                                        <MenuItem key={index} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                                : <TextField
                                                    label="Search"
                                                    type="search"
                                                    onChange={(event) => handleSearch(event.target.value, cell as keyof TaskForm)}
                                                />
                                    }
                                </StyledTableCell>
                            )
                        }
                    })
                }
                <StyledTableCell> </StyledTableCell>

            </StyledTableRow>
        </>
    )

}


interface SortProps {
    cell: keyof Task
    sort: SORT
    handleSort: (cell: keyof Task) => void
}

const SortIcon: React.FC<SortProps> = ({ cell, sort, handleSort }) => {
    return (
        <span onClick={() => handleSort(cell as keyof Task)}>
            Sort &nbsp;
            {
                cell === sort.orderBy
                    ? sort.order === 'asc'
                        ? <>⬆️</>
                        : <>⬇️</>
                    : <>↕️</>
            }
        </span>
    )
}


