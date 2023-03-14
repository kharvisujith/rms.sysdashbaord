import {
  Box,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  CircularProgress,
  TablePagination,
  Button,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Order } from "../../../Interface/QuizDetails";
import { getComparator } from "../../../utils/TableSortFunctions";
import { QuestionsModifyTableColumns } from "./QuestionsModifyTableColumns";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteQuestionSet,
  getSubjectwiseQuizAnswers,
} from "../../../api/apiAgent";
import ModifyQuestionsModal from "./ModifyQuestionsModal";
import Swal from "sweetalert2";

const QuestionsModifyTable = (props: any) => {
  const {
    QuestionsModifyTableData,
    subjectwiseQuizDetails,
    isQuizSetExists,
    searchText,
    subject,
  } = props;

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<any>("version");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loader, setLoader] = useState<boolean>(false);

  const [openModifyQuestionsModal, setOpenModifyQuestionsModal] =
    useState<Boolean>(false);
  const [modifyQuestionsData, setModifyQuestionsData] = useState<any>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const fetchSubjectwiseQuizQuestonAnswers = (questionDetails: any) => {
    getSubjectwiseQuizAnswers(
      questionDetails.version,
      questionDetails.subjectName
    )
      .then((response: any) => {
        setModifyQuestionsData(response.data);
        // setLoader(false);
      })
      .catch((error: any) => {
        // setLoader(false);
        console.log("error in subjwise answersapi");
      });
  };
  const handleModifyQuestionsModal = (questionDetails: any) => {
    setOpenModifyQuestionsModal(true);
    fetchSubjectwiseQuizQuestonAnswers(questionDetails);
  };
  console.log("value of modifyquestionData is", modifyQuestionsData);

  const deleteSelectedQuestionSet = (row: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      customClass: "swal-alert",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteQuestionSet(row.version, row.subjectName)
          .then((response: any) => {
            subjectwiseQuizDetails(subject);
            setLoader(false);
            Swal.fire({
              title: "Success",
              text: "Deleted Succesfully",
              timer: 3000,
              icon: "success",
              confirmButtonText: "Okay",
              customClass: "swal-alert",
            });
          })
          .catch((error: any) => {
            setLoader(false);
            Swal.fire({
              title: "error",
              text: "Failed to delete",
              timer: 3000,
              icon: "error",
              confirmButtonText: "Okay",
              customClass: "swal-alert",
            });
          });
      }
    });
  };

  const DeleteButton = (row: any) => {
    return (
      <IconButton
        size="small"
        className="delete-icon"
        onClick={() => deleteSelectedQuestionSet(row)}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  const viewButton = (row: any) => {
    return (
      <Button
        className="view-button"
        variant="contained"
        onClick={() => handleModifyQuestionsModal(row)}
      >
        View
      </Button>
    );
  };
  return (
    <>
      <Box>
        <Paper className="paper">
          <Typography variant="h5" className="table-title">
            Available Question Sets
          </Typography>
          <TableContainer className="table-container">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {QuestionsModifyTableColumns.map((column: any) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sortDirection={orderBy === column.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={createSortHandler(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {!loader ? (
                <TableBody>
                  {isQuizSetExists &&
                    QuestionsModifyTableData.slice()
                      .sort(getComparator(order, orderBy))
                      .filter(
                        (row: any) =>
                          !searchText.length ||
                          row.subjectName
                            .toLowerCase()
                            .includes(searchText.toLowerCase()) ||
                          row.version
                            .toString()
                            .toLowerCase()
                            .includes(searchText.toString().toLowerCase()) ||
                          row.tag
                            .toString()
                            .toLowerCase()
                            .includes(searchText.toString().toLowerCase()) ||
                          row.createdBy
                            ?.toLowerCase()
                            .includes(searchText.toLowerCase())
                      )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: any, index: number) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            {QuestionsModifyTableColumns.map(
                              (column: any, index: number) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={index} align={column.align}>
                                    {column.id === "view"
                                      ? viewButton(row)
                                      : column.id === "delete"
                                      ? DeleteButton(row)
                                      : value}
                                  </TableCell>
                                );
                              }
                            )}
                          </TableRow>
                        );
                      })}
                </TableBody>
              ) : null}
            </Table>
          </TableContainer>
          {loader ? (
            <Box className="table-loader">
              <CircularProgress />
            </Box>
          ) : null}
          {!isQuizSetExists && (
            <Box className="table-loader">
              <Typography>No Data Available</Typography>
            </Box>
          )}
          {isQuizSetExists && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={QuestionsModifyTableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </Box>
      <ModifyQuestionsModal
        openModifyQuestionsModal={openModifyQuestionsModal}
        setOpenModifyQuestionsModal={setOpenModifyQuestionsModal}
        modifyQuestionsData={modifyQuestionsData}
        fetchSubjectwiseQuizQuestonAnswers={fetchSubjectwiseQuizQuestonAnswers}
      />
    </>
  );
};
export default QuestionsModifyTable;
