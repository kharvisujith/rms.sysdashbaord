import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAgent } from "../api/apiAgent";

const initialState: any = {
  keek: "",
  pastEvaluationsTableData: [],
  pastEvaluationIndividualSummaryData: [],
  pastEvaluationIndividualAnswersData: [],
  isReviewModalOpen: false,
  loadingStatus: {
    tableLoader: false,
    moadlLoader: false,
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

// export const fetchsubjectwiseQuestionSets = createAsyncThunk<any, any>(
//   "interviewer/questionSets",
//   async (data: any, thunkAPI) => {

//     await apiAgent.interviewer
//     try {
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue({ error: error.respone });
//     }
//   }
// );

export const interviewerSlice = createSlice({
  name: "interviewer",
  initialState,
  reducers: {
    handleReviewAnswersModal: (state: any) => {
      state.isReviewModalOpen
        ? (state.isReviewModalOpen = false)
        : (state.isReviewModalOpen = true);
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
  },
});

export const { handleReviewAnswersModal } = interviewerSlice.actions;
