import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAgent } from "../api/apiAgent";
import {
  interviewerSliceStates,
  selectedQuestionsCreateQuizWithTag,
} from "../Interface/Interviewer/InterviewerInterface";

const initialState: interviewerSliceStates = {
  pastEvaluationsTableData: [],
  pastEvaluationIndividualSummaryData: [],
  pastEvaluationIndividualAnswersData: [],
  subjectwiseQuestionSets: [],
  createQuizSetWiseInfoBody: [],
  searchText: "",
  selectQuestions: [],
  isReviewModalOpen: false,
  isSelectQuestionModalOpen: false,
  previewModalStates: {
    isPreviewModalOpen: false,
    previewQuestions: [],
    quizLink: "",
  },
  loadingStatus: {
    tableLoader: false,
    moadlLoader: false,
    cardLoader: false,
    buttonLoader: false,
  },
};

export const fetchPastEvaluations = createAsyncThunk<any>(
  "interviwer/pastEvalutionsSummary",
  async (thunkAPI: any) => {
    try {
      const response = await apiAgent.interviewer.getTotalSubmittedQuizInfo();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response });
    }
  }
);

export const fetchPastEvaluationsIndividualSummary = createAsyncThunk<any, any>(
  "interviewer/pastEvaluations/indivualSummary",
  async (testId: any, thunkAPI: any) => {
    try {
      const response =
        await apiAgent.interviewer.getPastEvaluationsIndividualSummary(testId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response });
    }
  }
);

export const fetchPastEvaluationsIndividualAnswers = createAsyncThunk<any, any>(
  "interviewer/pastEvaluatons/individualAnswers",
  async (testId: any, thunkAPI: any) => {
    try {
      const response =
        await apiAgent.interviewer.getPastEvaluationsIndivualAnswers(testId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response });
    }
  }
);

export const fetchsubjectwiseQuestionSets = createAsyncThunk<any, any>(
  "interviewer/questionSets",
  async (subject: string, thunkAPI) => {
    try {
      const response = await apiAgent.interviewer.getSubjectwiseQuestionSets(
        subject
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.respone });
    }
  }
);

export const handleAddQuestionSetsToCreteQuizBody = createAsyncThunk<any, any>(
  "interviewer/addQuestionSet",
  async (subjecDetails: any, thunkAPI: any) => {
    try {
      const response =
        await apiAgent.interviewer.getQuestionAnswersForSetAndSubject(
          subjecDetails.version,
          subjecDetails.subjectName
        );

      return {
        subjecDetails: subjecDetails,
        responseData: response.data,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response });
    }
  }
);

export const fetchFilteredQuestionSets = createAsyncThunk<any>(
  "interview/removeQuesitonSet",
  async (_, thunkAPI: any) => {
    try {
      const searchText = thunkAPI.getState().interviewer.searchText;
      const response = await apiAgent.interviewer.filterQuestionsSets(
        searchText.split(" ")
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.respone });
    }
  }
);

export const fetchQuestionForSetAndSubject = createAsyncThunk<any, any>(
  "interviewer/questionsForSetAndSubject",
  async (subjectDetails: any, thunkAPI: any) => {
    try {
      const response =
        await apiAgent.interviewer.getQuestionAnswersForSetAndSubject(
          subjectDetails.version,
          subjectDetails.subjectName
        );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.respone });
    }
  }
);

export const fetchPreviewQuestionsForCreateQuiz = createAsyncThunk<any>(
  "interviewer/previewQuestions",
  async (_, thunkAPI: any) => {
    try {
      const createQuizBody =
        thunkAPI.getState().interviewer.createQuizSetWiseInfoBody;
      const response =
        await apiAgent.interviewer.getPreviewQuestionsForCreateQuiz(
          createQuizBody
        );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.respone });
    }
  }
);

export const genrateQuizLink = createAsyncThunk(
  "interviewer/genrateQuizLink",
  async (createQuizBody: any, thunkAPI: any) => {
    try {
      const response = await apiAgent.interviewer.createQuiz(createQuizBody);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response });
    }
  }
);

export const interviewerSlice = createSlice({
  name: "interviewer",
  initialState,
  reducers: {
    handleReviewAnswersModal: (state: any) => {
      // state.isReviewModalOpen
      //   ? (state.isReviewModalOpen = false)
      //   : (state.isReviewModalOpen = true);
      if (state.isReviewModalOpen) {
        return {
          ...state,
          isReviewModalOpen: false,
        };
      } else {
        return {
          ...state,
          isReviewModalOpen: true,
        };
      }

      // return state.isReviewModalOpen
      //   ? {
      //       ...state,
      //       isReviewModalOpen: false,
      //     }
      //   : {
      // ...state,
      // isReviewModalOpen: true,
      //     };
    },
    handleSelectQuestionsModal: (state: interviewerSliceStates) => {
      // state.isSelectQuestionModalOpen
      //   ? (state.isSelectQuestionModalOpen = false)
      //   : (state.isSelectQuestionModalOpen = true);
      return state.isSelectQuestionModalOpen
        ? {
            ...state,
            isSelectQuestionModalOpen: false,
          }
        : {
            ...state,
            isSelectQuestionModalOpen: true,
          };
    },

    handleSearchInputChange: (state: interviewerSliceStates, action: any) => {
      // state.searchText = action.payload.target.value;
      return {
        ...state,
        searchText: action.payload.target.value,
      };
    },
    handleRemoveQuestionSetsCreateQuizBody: (
      state: interviewerSliceStates,
      action: any
    ) => {
      const existingIndex = state.createQuizSetWiseInfoBody.findIndex(
        (obj: selectedQuestionsCreateQuizWithTag) =>
          obj.subjectName === action.payload.subjectName &&
          obj.version === action.payload.version
      );

      if (existingIndex !== -1) {
        const newCreatQuizArr = [...state.createQuizSetWiseInfoBody];
        newCreatQuizArr.splice(existingIndex, 1);

        // state.createQuizSetWiseInfoBody = newCreatQuizArr;
        return {
          ...state,
          createQuizSetWiseInfoBody: newCreatQuizArr,
        };
      }
    },

    handleSelectQuestionsCheckBoxChange: (
      state: interviewerSliceStates,
      action: any
    ) => {
      const existingIndex = state.createQuizSetWiseInfoBody.findIndex(
        (obj: selectedQuestionsCreateQuizWithTag) =>
          obj.subjectName === action.payload.questionDeatils.subjectName &&
          obj.version === action.payload.questionDeatils.version
      );
      if (action.payload.event.target.checked) {
        if (existingIndex === -1) {
          // state.createQuizSetWiseInfoBody = [
          //   ...state.createQuizSetWiseInfoBody,
          //   {
          //     version: action.payload.questionDeatils.version,
          //     subjectName: action.payload.questionDeatils.subjectName,
          //     tag: action.payload.questionDeatils.tag,
          //     questionIds: [action.payload.questionDeatils.questionId],
          //   },
          // ];
          return {
            ...state,
            createQuizSetWiseInfoBody: {
              ...state.createQuizSetWiseInfoBody,
              version: action.payload.questionDeatils.version,
              subjectName: action.payload.questionDeatils.subjectName,
              tag: action.payload.questionDeatils.tag,
              questionIds: [action.payload.questionDeatils.questionId],
            },
          };
        } else {
          const newArray = [...state.createQuizSetWiseInfoBody];
          newArray[existingIndex].questionIds.push(
            action.payload.questionDeatils.questionId
          );
          // state.createQuizSetWiseInfoBody = newArray;
          return { ...state, createQuizSetWiseInfoBody: newArray };
        }
      } else {
        if (existingIndex !== -1) {
          const newArray = [...state.createQuizSetWiseInfoBody];
          const indexOfQuestionId = newArray[existingIndex].questionIds.indexOf(
            action.payload.questionDeatils.questionId
          );

          newArray[existingIndex].questionIds.splice(indexOfQuestionId, 1);
          if (newArray[existingIndex].questionIds.length < 1) {
            newArray.splice(existingIndex, 1);
          }
          //  state.createQuizSetWiseInfoBody = newArray;
          return { ...state, createQuizSetWiseInfoBody: newArray };
        }
      }
    },

    handlePreviewModal: (state: interviewerSliceStates) => {
      // state.previewModalStates.isPreviewModalOpen
      //   ? (state.previewModalStates.isPreviewModalOpen = false)
      //   : (state.previewModalStates.isPreviewModalOpen = true);

      return state.previewModalStates.isPreviewModalOpen
        ? {
            ...state,
            previewModalStates: {
              ...state.previewModalStates,
              isPreviewModalOpen: false,
            },
          }
        : {
            ...state,
            previewModalStates: {
              ...state.previewModalStates,
              isPreviewModalOpen: true,
            },
          };
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      fetchPastEvaluations.fulfilled,
      (state: interviewerSliceStates, action: any) => {
        // state.pastEvaluationsTableData = action.payload;
        // state.loadingStatus.tableLoader = false;
        return {
          ...state,
          pastEvaluationsTableData: action.payload,
          loadingStatus: {
            ...state.loadingStatus,
            tableLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchPastEvaluations.rejected,
      (state: interviewerSliceStates, action: any) => {
        // state.loadingStatus.tableLoader = false;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            tableLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchPastEvaluations.pending,
      (state: interviewerSliceStates, action: any) => {
        // state.loadingStatus.tableLoader = true;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            tableLoader: true,
          },
        };
      }
    );

    builder.addCase(
      fetchPastEvaluationsIndividualSummary.fulfilled,
      (state: interviewerSliceStates, action: any) => {
        // state.pastEvaluationIndividualSummaryData = action.payload;
        // state.loadingStatus.moadlLoader = false;
        return {
          ...state,
          pastEvaluationIndividualSummaryData: action.payload,
          loadingStatus: {
            ...state.loadingStatus,
            moadlLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchPastEvaluationsIndividualSummary.rejected,
      (state: interviewerSliceStates, action: any) => {
        // state.loadingStatus.moadlLoader = false;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            moadlLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchPastEvaluationsIndividualSummary.pending,
      (state: interviewerSliceStates, action: any) => {
        // state.loadingStatus.moadlLoader = true;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            moadlLoader: true,
          },
        };
      }
    );
    builder.addCase(
      fetchPastEvaluationsIndividualAnswers.fulfilled,
      (state: interviewerSliceStates, action: any) => {
        // state.pastEvaluationIndividualAnswersData = action.payload;
        // state.loadingStatus.moadlLoader = false;
        return {
          ...state,
          pastEvaluationIndividualAnswersData: action.payload,
          loadingStatus: {
            ...state.loadingStatus,
            moadlLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchPastEvaluationsIndividualAnswers.rejected,
      (state: interviewerSliceStates, action: any) => {
        // state.loadingStatus.moadlLoader = false;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            moadlLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchPastEvaluationsIndividualAnswers.pending,
      (state: interviewerSliceStates, action: any) => {
        // state.loadingStatus.moadlLoader = true;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            moadlLoader: true,
          },
        };
      }
    );

    builder.addCase(
      fetchsubjectwiseQuestionSets.fulfilled,
      (state: interviewerSliceStates, action: any) => {
        // state.subjectwiseQuestionSets = action.payload;
        // state.loadingStatus.cardLoader = false;
        return {
          ...state,
          subjectwiseQuestionSets: action.payload,
          loadingStatus: {
            ...state.loadingStatus,
            cardLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchsubjectwiseQuestionSets.rejected,
      (state: interviewerSliceStates, action: any) => {
        // state.loadingStatus.cardLoader = false;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            cardLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchsubjectwiseQuestionSets.pending,
      (state: interviewerSliceStates, action: any) => {
        // state.loadingStatus.cardLoader = true;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            cardLoader: true,
          },
        };
      }
    );

    builder.addCase(
      handleAddQuestionSetsToCreteQuizBody.fulfilled,
      (state: interviewerSliceStates, action: any) => {
        if (action.payload.responseData.length > 0) {
          var questionIdsArray = action.payload.responseData.map(
            (obj: any) => obj.questionId
          );

          const existingIndex = state.createQuizSetWiseInfoBody?.findIndex(
            (obj: selectedQuestionsCreateQuizWithTag) =>
              obj.subjectName === action.payload.subjecDetails.subjectName &&
              obj.version === action.payload.subjecDetails.version
          );

          if (existingIndex === -1) {
            // state.createQuizSetWiseInfoBody = [
            //   ...state.createQuizSetWiseInfoBody,
            //   {
            // version: action.payload.subjecDetails.version,
            // subjectName: action.payload.subjecDetails.subjectName,
            // tag: action.payload.subjecDetails.tag,
            // questionIds: questionIdsArray,
            //   },
            // ];
            return {
              ...state,
              createQuizSetWiseInfoBody: [
                ...state.createQuizSetWiseInfoBody,
                {
                  version: action.payload.subjecDetails.version,
                  subjectName: action.payload.subjecDetails.subjectName,
                  tag: action.payload.subjecDetails.tag,
                  questionIds: questionIdsArray,
                },
              ],
            };
          }
        }
      }
    );
    // builder.addCase(
    //   handleAddQuestionSetsToCreteQuizBody.rejected,
    //   (state: interviewerSliceStates, action: any) => {}
    // );
    // builder.addCase(
    //   handleAddQuestionSetsToCreteQuizBody.pending,
    //   (state: interviewerSliceStates, action: any) => {}
    // );

    builder.addCase(
      fetchFilteredQuestionSets.fulfilled,
      (state: interviewerSliceStates, action: any) => {
        //  state.subjectwiseQuestionSets = action.payload;
        // state.loadingStatus.cardLoader = false;
        return {
          ...state,
          subjectwiseQuestionSets: action.payload,
          loadingStatus: {
            ...state.loadingStatus,
            cardLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchFilteredQuestionSets.rejected,
      (state: interviewerSliceStates, action: any) => {
        // state.loadingStatus.cardLoader = false;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            cardLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchFilteredQuestionSets.pending,
      (state: interviewerSliceStates, action: any) => {
        // state.loadingStatus.cardLoader = true;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            cardLoader: true,
          },
        };
      }
    );

    builder.addCase(
      fetchQuestionForSetAndSubject.fulfilled,
      (state: interviewerSliceStates, action: any) => {
        //  state.selectQuestions = action.payload;
        //   state.loadingStatus.moadlLoader = false;
        return {
          ...state,
          selectQuestions: action.payload,
          loadingStatus: {
            ...state.loadingStatus,
            moadlLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchQuestionForSetAndSubject.rejected,
      (state: interviewerSliceStates, action: any) => {
        //state.loadingStatus.moadlLoader = false;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            moadlLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchQuestionForSetAndSubject.pending,
      (state: interviewerSliceStates, action: any) => {
        // state.loadingStatus.moadlLoader = true;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            moadlLoader: true,
          },
        };
      }
    );

    builder.addCase(
      fetchPreviewQuestionsForCreateQuiz.fulfilled,
      (state: interviewerSliceStates, action: any) => {
        //  state.previewModalStates.previewQuestions = action.payload;
        //  state.loadingStatus.moadlLoader = true;
        return {
          ...state,
          previewModalStates: {
            ...state.previewModalStates,
            previewQuestions: action.payload,
          },
          loadingStatus: {
            ...state.loadingStatus,
            moadlLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchPreviewQuestionsForCreateQuiz.rejected,
      (state: interviewerSliceStates, action: any) => {
        // state.loadingStatus.moadlLoader = false;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            moadlLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchPreviewQuestionsForCreateQuiz.pending,
      (state: interviewerSliceStates, action: any) => {
        // state.loadingStatus.moadlLoader = true;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            moadlLoader: true,
          },
        };
      }
    );

    builder.addCase(
      genrateQuizLink.fulfilled,
      (state: interviewerSliceStates, action: any) => {
        // state.previewModalStates.quizLink = `${window.location.origin}/rms-aug/test/${action.payload?.quizId}/${action.payload?.quizLink}`;
        // state.previewModalStates.isPreviewModalOpen = false;
        // state.previewModalStates.previewQuestions = [];
        // state.createQuizSetWiseInfoBody = [];
        // state.loadingStatus.buttonLoader = false;
        return {
          ...state,
          previewModalStates: {
            isPreviewModalOpen: false,
            quizLink: `${window.location.origin}/rms-aug/test/${action.payload?.quizId}/${action.payload?.quizLink}`,
            previewQuestions: [],
          },
          createQuizSetWiseInfoBody: [],
          loadingStatus: {
            ...state.loadingStatus,
            buttonLoader: false,
          },
        };
      }
    );
    builder.addCase(
      genrateQuizLink.rejected,
      (state: interviewerSliceStates, action: any) => {
        //state.loadingStatus.buttonLoader = false;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            buttonLoader: false,
          },
        };
      }
    );
    builder.addCase(
      genrateQuizLink.pending,
      (state: interviewerSliceStates, action: any) => {
        // state.loadingStatus.buttonLoader = true;
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            buttonLoader: true,
          },
        };
      }
    );
  },
});

export const {
  handleReviewAnswersModal,
  handleSelectQuestionsModal,
  handleRemoveQuestionSetsCreateQuizBody,
  handleSearchInputChange,
  handleSelectQuestionsCheckBoxChange,
  handlePreviewModal,
} = interviewerSlice.actions;
