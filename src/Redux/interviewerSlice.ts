import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAgent } from "../api/apiAgent";
import {
  selectedQuestionsCreateQuizWithTag,
  subjectWiseQuizListResponse,
} from "../Interface/Interviewer/InterviewerInterface";

const initialState: any = {
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

// export const verifyCandidate = createAsyncThunk<
//   { data: verifyCandidateRequestBody; fromPage: string },
//   { data: verifyCandidateRequestBody; fromPage: string }
// >("candidate/verify", async ({ data, fromPage }, thunkAPI: any) => {
//   try {
//     console.log("inside thunk funtion");
//     const res = await apiAgent.candidate.verifyCandidate(data);
//     console.log("res of thunk is", res);

//     return { data, fromPage };

//     // return res;

//     //return { data, fromPage };
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(error.response);
//   }
// });

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
      // const { createQuizSetWiseInfoBody, subjectwiseQuestionSets } =
      //   thunkAPI.getState().interview.;
      // console.log("thunk api getstate value si ", createQuizSetWiseInfoBody);
      // const existingIndex = createQuizSetWiseInfoBody.findIndex(
      //   (obj: selectedQuestionsCreateQuizWithTag) =>
      //     obj.subjectName === subjectwiseQuestionSets.subjectName &&
      //     obj.version === subjectwiseQuestionSets.version
      // );

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
      state.isReviewModalOpen
        ? (state.isReviewModalOpen = false)
        : (state.isReviewModalOpen = true);
    },
    handleSelectQuestionsModal: (state: any) => {
      console.log("modal open reducer called");
      // if (state.isSelectQuestionModalOpen) {
      //   state.selectQuestions = [];
      // }
      state.isSelectQuestionModalOpen
        ? (state.isSelectQuestionModalOpen = false)
        : (state.isSelectQuestionModalOpen = true);
    },

    handleSearchInputChange: (state: any, action: any) => {
      console.log("valueeee   i ssss", action.payload.target.value);
      state.searchText = action.payload.target.value;
    },
    handleRemoveQuestionSetsCreateQuizBody: (state: any, action: any) => {
      console.log(
        "in reducer delte",
        action.payload
        // action.payload.subjecDetails.subjectName
      );
      const existingIndex = state.createQuizSetWiseInfoBody.findIndex(
        (obj: selectedQuestionsCreateQuizWithTag) =>
          obj.subjectName === action.payload.subjectName &&
          obj.version === action.payload.version
      );

      if (existingIndex !== -1) {
        const newCreatQuizArr = [...state.createQuizSetWiseInfoBody];
        newCreatQuizArr.splice(existingIndex, 1);

        state.createQuizSetWiseInfoBody = newCreatQuizArr;
      }
    },

    handleSelectQuestionsCheckBoxChange: (state: any, action: any) => {
      console.log("onchage reducer calleddd");
      const existingIndex = state.createQuizSetWiseInfoBody.findIndex(
        (obj: selectedQuestionsCreateQuizWithTag) =>
          obj.subjectName === action.payload.questionDeatils.subjectName &&
          obj.version === action.payload.questionDeatils.version
      );
      console.log("existng index is", existingIndex, action.payload.even);
      if (action.payload.event.target.checked) {
        if (existingIndex === -1) {
          state.createQuizSetWiseInfoBody = [
            ...state.createQuizSetWiseInfoBody,
            {
              version: action.payload.questionDeatils.version,
              subjectName: action.payload.questionDeatils.subjectName,
              tag: action.payload.questionDeatils.tag,
              questionIds: [action.payload.questionDeatils.questionId],
            },
          ];
          // setCreateQuizSetWiseInfo((prev: any) => [
          //   ...prev,
          //   {
          //     version: questionDeatils.version,
          //     subjectName: questionDeatils.subjectName,
          //     tag: questionDeatils.tag,
          //     questionIds: [questionDeatils.questionId],
          //   },
          // ]);
        } else {
          const newArray = [...state.createQuizSetWiseInfoBody];
          newArray[existingIndex].questionIds.push(
            action.payload.questionDeatils.questionId
          );
          //setCreateQuizSetWiseInfo(newArray);
          state.createQuizSetWiseInfoBody = newArray;
        }
      } else {
        console.log("inside else part of check false");
        if (existingIndex !== -1) {
          const newArray = [...state.createQuizSetWiseInfoBody];
          const indexOfQuestionId = newArray[existingIndex].questionIds.indexOf(
            action.payload.questionDeatils.questionId
          );

          newArray[existingIndex].questionIds.splice(indexOfQuestionId, 1);
          if (newArray[existingIndex].questionIds.length < 1) {
            newArray.splice(existingIndex, 1);
          }
          state.createQuizSetWiseInfoBody = newArray;
          // setCreateQuizSetWiseInfo(newArray);
        }
      }
    },

    handlePreviewModal: (state: any) => {
      state.previewModalStates.isPreviewModalOpen
        ? (state.previewModalStates.isPreviewModalOpen = false)
        : (state.previewModalStates.isPreviewModalOpen = true);
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      fetchPastEvaluations.fulfilled,
      (state: any, action: any) => {
        console.log(
          "IN fullfillleddd, past evaluaton table data isss",
          action.payload
        );
        state.pastEvaluationsTableData = action.payload;
        state.loadingStatus.tableLoader = false;
      }
    );
    builder.addCase(
      fetchPastEvaluations.rejected,
      (state: any, action: any) => {
        state.loadingStatus.tableLoader = false;
      }
    );
    builder.addCase(fetchPastEvaluations.pending, (state: any, action: any) => {
      state.loadingStatus.tableLoader = true;
    });

    builder.addCase(
      fetchPastEvaluationsIndividualSummary.fulfilled,
      (state: any, action: any) => {
        state.pastEvaluationIndividualSummaryData = action.payload;
        state.loadingStatus.moadlLoader = false;
      }
    );
    builder.addCase(
      fetchPastEvaluationsIndividualSummary.rejected,
      (state: any, action: any) => {
        state.loadingStatus.moadlLoader = false;
      }
    );
    builder.addCase(
      fetchPastEvaluationsIndividualSummary.pending,
      (state: any, action: any) => {
        state.loadingStatus.moadlLoader = true;
      }
    );
    builder.addCase(
      fetchPastEvaluationsIndividualAnswers.fulfilled,
      (state: any, action: any) => {
        state.pastEvaluationIndividualAnswersData = action.payload;
        state.loadingStatus.moadlLoader = false;
      }
    );
    builder.addCase(
      fetchPastEvaluationsIndividualAnswers.rejected,
      (state: any, action: any) => {
        state.loadingStatus.moadlLoader = false;
      }
    );
    builder.addCase(
      fetchPastEvaluationsIndividualAnswers.pending,
      (state: any, action: any) => {
        state.loadingStatus.moadlLoader = true;
      }
    );

    builder.addCase(
      fetchsubjectwiseQuestionSets.fulfilled,
      (state: any, action: any) => {
        console.log("inside fullfillllled card", action.payload);
        state.subjectwiseQuestionSets = action.payload;
        state.loadingStatus.cardLoader = false;
      }
    );
    builder.addCase(
      fetchsubjectwiseQuestionSets.rejected,
      (state: any, action: any) => {
        state.loadingStatus.cardLoader = false;
      }
    );
    builder.addCase(
      fetchsubjectwiseQuestionSets.pending,
      (state: any, action: any) => {
        state.loadingStatus.cardLoader = true;
      }
    );

    builder.addCase(
      handleAddQuestionSetsToCreteQuizBody.fulfilled,
      (state: any, action: any) => {
        if (action.payload.responseData.length > 0) {
          console.log("inside fullfilled respone is > 0 yes");
          var questionIdsArray = action.payload.responseData.map(
            (obj: any) => obj.questionId
          );

          const existingIndex = state.createQuizSetWiseInfoBody.findIndex(
            (obj: selectedQuestionsCreateQuizWithTag) =>
              obj.subjectName === state.subjectwiseQuestionSets.subjectName &&
              obj.version === state.subjectwiseQuestionSets.version
          );
          console.log("exindex is", existingIndex);
          console.log("subjectwiseQuesitonSets");

          if (existingIndex === -1) {
            state.createQuizSetWiseInfoBody = [
              ...state.createQuizSetWiseInfoBody,
              {
                version: action.payload.subjecDetails.version,
                subjectName: action.payload.subjecDetails.subjectName,
                tag: action.payload.subjecDetails.tag,
                questionIds: questionIdsArray,
              },
            ];
          }
        }
        console.log("keeeek", state.createQuizSetWiseInfoBody);
      }
    );
    builder.addCase(
      handleAddQuestionSetsToCreteQuizBody.rejected,
      (state: any, action: any) => {
        console.log("Error in Add Quesiton Sets", action.payload);
      }
    );
    builder.addCase(
      handleAddQuestionSetsToCreteQuizBody.pending,
      (state: any, action: any) => {}
    );

    builder.addCase(
      fetchFilteredQuestionSets.fulfilled,
      (state: any, action: any) => {
        state.subjectwiseQuestionSets = action.payload;
        state.loadingStatus.cardLoader = false;
      }
    );
    builder.addCase(
      fetchFilteredQuestionSets.rejected,
      (state: any, action: any) => {
        console.log("filter rejecteed");
        state.loadingStatus.cardLoader = false;
      }
    );
    builder.addCase(
      fetchFilteredQuestionSets.pending,
      (state: any, action: any) => {
        state.loadingStatus.cardLoader = true;
      }
    );

    builder.addCase(
      fetchQuestionForSetAndSubject.fulfilled,
      (state: any, action: any) => {
        state.selectQuestions = action.payload;
        state.loadingStatus.moadlLoader = false;
      }
    );
    builder.addCase(
      fetchQuestionForSetAndSubject.rejected,
      (state: any, action: any) => {
        state.loadingStatus.moadlLoader = false;
      }
    );
    builder.addCase(
      fetchQuestionForSetAndSubject.pending,
      (state: any, action: any) => {
        state.loadingStatus.moadlLoader = true;
      }
    );

    builder.addCase(
      fetchPreviewQuestionsForCreateQuiz.fulfilled,
      (state: any, action: any) => {
        state.previewModalStates.previewQuestions = action.payload;
        state.loadingStatus.moadlLoader = true;
      }
    );
    builder.addCase(
      fetchPreviewQuestionsForCreateQuiz.rejected,
      (state: any, action: any) => {
        state.loadingStatus.moadlLoader = true;
      }
    );
    builder.addCase(
      fetchPreviewQuestionsForCreateQuiz.pending,
      (state: any, action: any) => {
        state.loadingStatus.moadlLoader = true;
      }
    );

    builder.addCase(genrateQuizLink.fulfilled, (state: any, action: any) => {
      state.previewModalStates.quizLink = `${window.location.origin}/rms-aug/test/${action.payload?.quizId}/${action.payload?.quizLink}`;
      state.previewModalStates.isPreviewModalOpen = false;
      state.previewModalStates.previewQuestions = [];
      state.createQuizSetWiseInfoBody = [];
      state.loadingStatus.buttonLoader = false;
    });
    builder.addCase(genrateQuizLink.rejected, (state: any, action: any) => {
      state.loadingStatus.buttonLoader = false;
    });
    builder.addCase(genrateQuizLink.pending, (state: any, action: any) => {
      state.loadingStatus.buttonLoader = true;
    });
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
