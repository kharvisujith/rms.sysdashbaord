import {
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  SvgIcon,
  Paper,
  Chip,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import "./SearchQuestionSets.style.scss";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SelectQuestionsModal from "../SelectQuestions/SelectQuestionsModal";
import PreviewQuestionsModal from "../PreviewQuestions/PreviewQuestionsModal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { PaginationProps } from "@mui/material/Pagination";
import {
  selectedQuestionsCreateQuizWithTag,
  subjectwiseQuizAnswersResponse,
  subjectWiseQuizListResponse,
} from "../../../../Interface/Interviewer/InterviewerInterface";
import { getComparator } from "../../../../utils/TableSortFunctions";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Store/ConfigureStrore";
import {
  fetchFilteredQuestionSets,
  fetchPreviewQuestionsForCreateQuiz,
  fetchQuestionForSetAndSubject,
  fetchsubjectwiseQuestionSets,
  handleAddQuestionSetsToCreteQuizBody,
  handlePreviewModal,
  handleSelectQuestionsModal,
} from "../../../../Redux/interviewerSlice";

const SearchQuestionSets = () => {
  const dispatch = useAppDispatch();
  const {
    subjectwiseQuestionSets,
    createQuizSetWiseInfoBody,
    loadingStatus,
    previewModalStates,
  } = useAppSelector((state: any) => state.interviewer);

  const handleSearchInputChange = (event: any) => {
    dispatch({ type: "interviewer/handleSearchInputChange", payload: event });
  };

  const handleSearchQuestionSet = async () => {
    try {
      await dispatch(fetchFilteredQuestionSets());
    } catch (error: any) {
      console.log("Error in filter", error);
    }
  };

  const getIndexFromNewCreateQuizBody = (
    subjectDetails: subjectWiseQuizListResponse
  ) => {
    const findIndex = createQuizSetWiseInfoBody.findIndex(
      (obj: selectedQuestionsCreateQuizWithTag) =>
        obj.subjectName === subjectDetails.subjectName &&
        obj.version === subjectDetails.version
    );
    if (findIndex !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const checkForSubjectAndVersion = (subjectName: string, version: string) => {
    const filterdArr = createQuizSetWiseInfoBody.filter(
      (obj: selectedQuestionsCreateQuizWithTag) =>
        obj.subjectName === subjectName && obj.version === version
    );
    if (filterdArr.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddQuestionSet = async (
    subjectDetails: subjectWiseQuizListResponse
  ) => {
    try {
      await dispatch(handleAddQuestionSetsToCreteQuizBody(subjectDetails));
    } catch (error: any) {
      console.log("Error in Add Quesiton Sets", error);
    }
  };

  const handleRemovetQuestionSet = (
    subjectDetails: subjectWiseQuizListResponse
  ) => {
    console.log("rmove all method onckick called");
    try {
      dispatch({
        type: "interviewer/handleRemoveQuestionSetsCreateQuizBody",
        payload: subjectDetails,
      });
    } catch (error: any) {
      console.log("Error in delte qestion set ", error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      function () {
        // setCopied(true);
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleSelectQuestionsModalOpen = async (
    subjectDetails: subjectWiseQuizListResponse
  ) => {
    try {
      dispatch(handleSelectQuestionsModal());

      await dispatch(fetchQuestionForSetAndSubject(subjectDetails));
    } catch (error: any) {
      console.log("Error in Select Questions modal", error);
    }
  };

  const handlePreviewQuestionModalOpen = async () => {
    dispatch(handlePreviewModal());

    try {
      await dispatch(fetchPreviewQuestionsForCreateQuiz());
    } catch (error: any) {
      console.log("Error in preview quesiton modal", error);
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = useState<any>("createdDate");
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchSubjectwiseQuestionSets = async () => {
      try {
        await dispatch(fetchsubjectwiseQuestionSets(""));
      } catch (error: any) {
        console.log("Error in fetching subject wise questionsets", error);
      }
    };
    fetchSubjectwiseQuestionSets();
  }, []);

  return (
    <>
      <Box className="search-main-container">
        <Box>
          <FormControl className="search-input" variant="standard">
            <InputLabel htmlFor="search">Search Question Set For</InputLabel>
            <Input
              id="search"
              type="text"
              onChange={handleSearchInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchQuestionSet}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        {!loadingStatus.cardLoader ? (
          <Box>
            <Box className="search-result-container">
              {subjectwiseQuestionSets?.length > 0 &&
                subjectwiseQuestionSets
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map(
                    (
                      subjectDetails: subjectWiseQuizListResponse,
                      index: number
                    ) => (
                      <Paper key={index}>
                        <Box className="search-result">
                          <Box className="search-text">
                            <Typography>
                              {`${subjectDetails.subjectName} contains ${
                                subjectDetails.totalQuestionsCount
                              } Questions, Created by ${"Test User"}, Tag - ${
                                subjectDetails.tag
                              } `}
                            </Typography>
                          </Box>

                          <Box className="selected-icon">
                            {checkForSubjectAndVersion(
                              subjectDetails.subjectName,
                              subjectDetails.version
                            ) && (
                              <IconButton size="small">
                                <CheckCircleIcon
                                  className="icon"
                                  fontSize="small"
                                />
                              </IconButton>
                            )}
                          </Box>

                          <Box className="search-buttons">
                            <Button
                              variant="outlined"
                              onClick={() =>
                                handleSelectQuestionsModalOpen(subjectDetails)
                              }
                            >
                              Select Questions
                            </Button>
                            {getIndexFromNewCreateQuizBody(subjectDetails) ? (
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  handleRemovetQuestionSet(subjectDetails)
                                }
                              >
                                Remove ALL
                              </Button>
                            ) : (
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  handleAddQuestionSet(subjectDetails)
                                }
                              >
                                Add ALL
                              </Button>
                            )}
                          </Box>
                        </Box>
                      </Paper>
                    )
                  )}
              {/* <Paper> */}
            </Box>
            <TablePagination
              component="div"
              count={subjectwiseQuestionSets?.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        ) : (
          <Box className="table-loader ">
            <CircularProgress />
          </Box>
        )}

        {createQuizSetWiseInfoBody.length > 0 && (
          <Box>
            <Box className="selected-sets-box">
              <Typography variant="h6">Selected Question Sets</Typography>
              <Box className="selected-sets">
                <Paper className="selected-tags-container">
                  {createQuizSetWiseInfoBody.map(
                    (
                      obj: selectedQuestionsCreateQuizWithTag,
                      index: number
                    ) => (
                      <Chip
                        label={`${obj.tag} - ${obj.questionIds.length} Questions`}
                        key={index}
                        size="small"
                        className="tagname"
                        // onClick={() => handleTagsClick("react")}
                      />
                    )
                  )}
                </Paper>
              </Box>
            </Box>
          </Box>
        )}

        {createQuizSetWiseInfoBody?.length > 0 && (
          <Box className="preview-button-contaner">
            <Button
              variant="contained"
              onClick={() => handlePreviewQuestionModalOpen()}
              disabled={createQuizSetWiseInfoBody.length > 0 ? false : true}
              className="preview-button"
            >
              Preview
            </Button>
          </Box>
        )}

        {previewModalStates.quizLink && (
          <Box className="box-link">
            <Typography>{`Test Link :`}</Typography>
            <Box className="test-link">
              <Typography>{previewModalStates.quizLink}</Typography>
              <Button
                className="copy"
                variant="outlined"
                onClick={() => copyToClipboard(previewModalStates.quizLink)}
              >
                <SvgIcon
                  className="icon"
                  component={ContentCopyIcon}
                  inheritViewBox
                />
                Copy
              </Button>
            </Box>
          </Box>
        )}
        <SelectQuestionsModal />
        <PreviewQuestionsModal />
      </Box>
    </>
  );
};
export default SearchQuestionSets;
