import {
  Box,
  Typography,
  Checkbox,
  Button,
  CircularProgress,
} from "@mui/material";
import ReactModal from "react-modal";
import { subjectwiseQuizAnswersResponse } from "../../../../Interface/Interviewer/InterviewerInterface";
import "./SelectQuestionsModal.style.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Store/ConfigureStrore";
import { handleSelectQuestionsModal } from "../../../../Redux/interviewerSlice";
import { customStylesModal } from "../../../../utils/Utils";

const SelectQuestionsModal = () => {
  const {
    isSelectQuestionModalOpen,
    selectQuestions,
    createQuizSetWiseInfoBody,
    loadingStatus,
  } = useAppSelector((state: any) => state.interviewer);
  const dispatch = useAppDispatch();

  const checkIdInCreateQuizBody = (
    questionDeatils: subjectwiseQuizAnswersResponse
  ) => {
    const findIndex = createQuizSetWiseInfoBody?.findIndex(
      (obj: any) =>
        obj.subjectName === questionDeatils.subjectName &&
        obj.version === questionDeatils.version
    );
    if (findIndex !== -1) {
      const newArr = [...createQuizSetWiseInfoBody];
      const isIdPresent = newArr[findIndex].questionIds.includes(
        questionDeatils.questionId
      );
      if (isIdPresent) return true;
      else return false;
    } else {
      return false;
    }
  };

  return (
    <>
      <ReactModal
        isOpen={isSelectQuestionModalOpen}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={customStylesModal}
      >
        {!loadingStatus.modalLoader ? (
          <>
            <Box className="modal-content-container">
              {selectQuestions?.map(
                (
                  questionData: subjectwiseQuizAnswersResponse,
                  index: number
                ) => (
                  <Box key={index} className="questions">
                    <Typography className="text">{`${index + 1}.  ${
                      questionData.question
                    }`}</Typography>
                    <Checkbox
                      checked={checkIdInCreateQuizBody(questionData)}
                      onChange={(event: any) =>
                        dispatch({
                          type: "interviewer/handleSelectQuestionsCheckBoxChange",
                          payload: {
                            event: event,
                            questionDeatils: questionData,
                          },
                        })
                      }
                      inputProps={{ "aria-label": "controlled" }}
                      className="select-check-box"
                    />
                  </Box>
                )
              )}
            </Box>

            <Box className="close-button-container">
              <Button
                variant="contained"
                onClick={() => dispatch(handleSelectQuestionsModal())}
              >
                Save
              </Button>
            </Box>
          </>
        ) : (
          <Box className="modal-loader">
            <CircularProgress />
          </Box>
        )}
      </ReactModal>
    </>
  );
};
export default SelectQuestionsModal;
