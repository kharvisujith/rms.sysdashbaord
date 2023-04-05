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
import { useEffect, useState } from "react";
import { Order } from "../../../Interface/Interviewer/InterviewerInterface";
import { getComparator } from "../../../utils/TableSortFunctions";
import { QuestionsModifyTableColumns } from "./QuestionsModifyTableColumns";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteQuestionSet,
  getSubjectwiseQuestionSets,
  getSubjectwiseQuiz,
} from "../../../api/apiAgent";
import ModifyQuestionsModal from "./ModifyQuestionsModal";
import Swal from "sweetalert2";
import { questionsForSetWithAnswers } from "../../../Interface/SubjectExpert/SubjectExpert";
import { useAppDispatch, useAppSelector } from "../../../Store/ConfigureStrore";
import {
  deleteSelectedQuesitonSet,
  fetcQuestionsForSet,
  fetchSubjectwiseQuestionSets,
  handleModifyQuesitonModal,
  setSearchTextToEmpty,
} from "../../../Redux/subjectexpertSlice";

const QuestionsModifyTable = () => {
  // const {
  //  QuestionsModifyTableData,
  //  subjectwiseQuizDetails,
  // isQuizSetExists,
  // searchText,
  //  subject,
  //} = props;

  const dispatch = useAppDispatch();
  const {
    searchText,
    questionsModifyTableData,
    loadingStatus: { tableLoader },
    subject,
  } = useAppSelector((state: any) => state.subjectExpert);

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("version");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loader, setLoader] = useState<boolean>(false);

  const [openModifyQuestionsModal, setOpenModifyQuestionsModal] =
    useState<Boolean>(false);
  const [modifyQuestionsData, setModifyQuestionsData] = useState<
    questionsForSetWithAnswers[] | []
  >([]);

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

  const fetchSubjectwiseQuizQuestonAnswers = (
    questionDetails: questionsForSetWithAnswers
  ) => {
    // getSubjectwiseQuizAnswers(
    //   questionDetails.version,
    //   questionDetails.subjectName
    // )
    //   .then((response: any) => {
    //     setModifyQuestionsData(response.data);
    //   })
    //   .catch((error: any) => {
    //     // setLoader(false);
    //     console.log("error in subjwise answersapi");
    //   });
  };
  const handleModifyQuestionsModal = async (questionDetails: any) => {
    try {
      console.log("quesiotn detailsss is", questionDetails);
      dispatch(handleModifyQuesitonModal());
      await dispatch(fetcQuestionsForSet({ questionDetails, from: "home" }));
    } catch (error: any) {
      console.log("Error in fetching data in modify modal");
    }
    //fetchSubjectwiseQuizQuestonAnswers(questionDetails);
    // setOpenModifyQuestionsModal(true);
  };

  const deleteSelectedQuestionSet = async (row: any) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await dispatch(deleteSelectedQuesitonSet(row));
          console.log("response of delte is", response);

          Swal.fire({
            title: "Success",
            text: "Deleted Succesfully",
            timer: 3000,
            icon: "success",
            confirmButtonText: "Okay",
            customClass: "swal-alert",
          });
          if (response.meta.requestStatus === "fulfilled") {
            await dispatch(fetchSubjectwiseQuestionSets());
          }
        } catch (error: any) {
          Swal.fire({
            title: "error",
            text: "Failed to delete",
            timer: 3000,
            icon: "error",
            confirmButtonText: "Okay",
            customClass: "swal-alert",
          });
          console.log("Error in delete question set", error);
        }

        // deleteQuestionSet(row.version, row.subjectName)
        //   .then((response: any) => {
        //     getSubjectwiseQuiz(subject);
        //     setLoader(false);
        // Swal.fire({
        //   title: "Success",
        //   text: "Deleted Succesfully",
        //   timer: 3000,
        //   icon: "success",
        //   confirmButtonText: "Okay",
        //   customClass: "swal-alert",
        // });
        // }
        // )
        //   .catch((error: any) => {
        //     setLoader(false);
        // Swal.fire({
        //   title: "error",
        //   text: "Failed to delete",
        //   timer: 3000,
        //   icon: "error",
        //   confirmButtonText: "Okay",
        //   customClass: "swal-alert",
        // });
        //   });
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
        className="table-button"
        variant="contained"
        onClick={() => handleModifyQuestionsModal(row)}
      >
        View
      </Button>
    );
  };

  // this has to be  added here and removed form select subject comp
  const subjectwiseQuizDetails = async () => {
    try {
      console.log("inside select subject Becase subject chnageddd");
      await dispatch(fetchSubjectwiseQuestionSets());
    } catch (error: any) {
      console.log("Error in fetching quiz data", error);
    }
  };

  useEffect(() => {
    subjectwiseQuizDetails();
  }, [subject]);

  useEffect(() => {
    dispatch({
      type: "subjectExpert/setSearchTextToEmpty",
      payload: { from: "home" },
    });
  }, []);
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
              {!tableLoader ? (
                <TableBody>
                  {questionsModifyTableData?.length > 0 &&
                    questionsModifyTableData
                      .slice()
                      .sort(getComparator(order, orderBy))
                      .filter(
                        (row: any) =>
                          !searchText?.home?.length ||
                          row.subjectName
                            .toLowerCase()
                            .includes(searchText.home.toLowerCase()) ||
                          row.version
                            .toString()
                            .toLowerCase()
                            .includes(
                              searchText.home.toString().toLowerCase()
                            ) ||
                          row.tag
                            .toString()
                            .toLowerCase()
                            .includes(
                              searchText.home.toString().toLowerCase()
                            ) ||
                          row.createdBy
                            ?.toLowerCase()
                            .includes(searchText.home.toLowerCase())
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
          {tableLoader ? (
            <Box className="table-loader">
              <CircularProgress />
            </Box>
          ) : null}
          {questionsModifyTableData?.length < 1 && (
            <Box className="table-loader">
              <Typography>No Data Available</Typography>
            </Box>
          )}
          {questionsModifyTableData?.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={questionsModifyTableData?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </Box>
      <ModifyQuestionsModal
      //   openModifyQuestionsModal={openModifyQuestionsModal}
      //  setOpenModifyQuestionsModal={setOpenModifyQuestionsModal}
      //    modifyQuestionsData={modifyQuestionsData}
      //  setModifyQuestionsData={setModifyQuestionsData}
      // fetchSubjectwiseQuizQuestonAnswers={fetchSubjectwiseQuizQuestonAnswers}
      // subjectwiseQuizDetails={subjectwiseQuizDetails}
      //   subject={subject}
      //  currentTableRowDetails={currentTableRowDetails}
      />
    </>
  );
};
export default QuestionsModifyTable;
