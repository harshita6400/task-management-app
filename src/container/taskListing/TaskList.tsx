import { Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, styled, tableCellClasses } from "@mui/material"
import { SORT, Task, TaskForm } from "../../interface/TaskInterface";
import { filterRows, paginateRows, sortRows } from "../../utils/tableUtils";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useMemo, useState } from "react";
import { TableFilters } from "./TableFilters";
import { deleteTaskReducer, editTaskDataReducer } from "../../redux/reduxSlice/taskDataSlice";
import { StepContext } from "../landingPage/LandingPage";
import Swal from "sweetalert2";
import { TableHeader } from "./TableHeader";
import { TableData } from "./TableData";
import "./table.scss";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    [`&.${tableCellClasses.footer}`]: {
        backgroundColor: "#bdbdbd",
        color: theme.palette.common.black,
        fontSize: 14,
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    }
}));


interface IProps { }

export const TaskList: React.FC<IProps> = () => {
    const allTasks: Array<Task> = useSelector((store: any) => store?.taskDataSlice?.tasksData)
    const dispatch = useDispatch()
    const { handleStepChange } = useContext<any>(StepContext)

    const [filters, setFilters] = useState<TaskForm>({})
    const [sort, setSort] = useState<SORT>({ order: 'asc', orderBy: 'id' })
    const [activePage, setActivePage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const filteredRows: Task[] = useMemo(() => filterRows(allTasks, filters), [allTasks, filters])
    const sortedRows: Task[] = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
    const paginatedRows: Task[] = paginateRows(sortedRows, activePage, rowsPerPage)

    const handleChangePage = (event: unknown, newPage: number) => setActivePage(newPage);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setActivePage(0);
    };

    const handleSearch = (value: string, accessor: keyof TaskForm) => {
        setActivePage(0)
        if (value) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [accessor]: value,
            }))
        } else {
            setFilters((prevFilters) => {
                const updatedFilters = { ...prevFilters }
                delete updatedFilters[accessor]
                return updatedFilters
            })
        }
    }

    const handleSort = (cell: keyof Task) => {
        setActivePage(0)
        setSort((prevSort) => {
            const updatedSort: SORT = {
                order: prevSort.order === 'asc' && prevSort.orderBy === cell ? 'des' : 'asc',
                orderBy: cell,
            }
            return updatedSort
        })
    }


    const handleDelete = (id: number) => {
        dispatch(deleteTaskReducer(id))
        Swal.fire({
            icon: 'success',
            text: `Task deleted successfully`,
        })
    }

    const handleEdit = (row: Task) => {
        dispatch(editTaskDataReducer(row))
        handleStepChange("addTask")
    }

    return (
        <>
            <div className="table-container">
                {
                    allTasks.length
                        ? <div className="table-container-inner">
                            <TableContainer sx={{ opacity: 0.8 }} component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHeader
                                        StyledTableCell={StyledTableCell}
                                        data={allTasks[0]}
                                    />
                                    <TableBody>
                                        <TableFilters
                                            StyledTableRow={StyledTableRow}
                                            StyledTableCell={StyledTableCell}
                                            data={allTasks[0]}
                                            sort={sort}
                                            handleSort={handleSort}
                                            handleSearch={handleSearch}
                                        />
                                        {
                                            paginatedRows?.map((row, index) => {
                                                return (
                                                    <TableData
                                                        StyledTableCell={StyledTableCell}
                                                        StyledTableRow={StyledTableRow}
                                                        row={row}
                                                        index={index}
                                                        handleDelete={handleDelete}
                                                        handleEdit={handleEdit}
                                                        key={row.id}
                                                    />
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </div>
                        : <></>
                }

                {
                    sortedRows?.length
                        ? <>
                            <TablePagination
                                sx={{ borderLeft: "2px solid #ffffff8a" }}
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                count={sortedRows.length}
                                rowsPerPage={rowsPerPage}
                                page={activePage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                        : <>No Orders</>
                }
            </div>
        </>
    )
}
