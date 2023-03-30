import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAgent } from "../api/apiAgent";
import {
  candiDateSliceStates,
  submitCandidateInfoRequestBody,
  verifyCandidateRequestBody,
} from "../Interface/Candidate/CandidateInterface";
import { history } from "../utils/helper/_helper";
import Swal from "sweetalert2";

const initialState: candiDateSliceStates = {
  verifyCredentials: {
    id: "",
    key: "",
  },
  verifiedStatus: {
    candidateInfoPage: false,
    startQuizPage: false,
  },
  errorMessage: "",
  testQuestions: [],

  isTestStarted: Boolean(localStorage.getItem("testStarted")) || false,
  // selectedAnswers: [],

  loadingStatus: {
    buttonLoader: false,
    pageLoader: false,
  },
};

// export const submitQuiz = createAsyncThunk<any, any>(
//   "candidate/submitquiz",
//   async (data: any, thunkAPI: any) => {
//     try {
//       const res = await apiAgent.candidate.submitQuiz(data);
//       return res;
//     } catch (error: any) {
//       thunkAPI.rejectWithValue({ error: error.response.data });
//     }
//   }
// );

export const verifyCandidate = createAsyncThunk<
  { data: verifyCandidateRequestBody; fromPage: string },
  { data: verifyCandidateRequestBody; fromPage: string }
>("candidate/verify", async ({ data, fromPage }, thunkAPI: any) => {
  try {
    console.log("inside thunk funtion");
    const res = await apiAgent.candidate.verifyCandidate(data);
    console.log("res of thunk is", res);

    return { data, fromPage };

    // return res;

    //return { data, fromPage };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const submitCandidateInfo = createAsyncThunk<any, any>(
  "candidate/candidateinfo",
  async (data: submitCandidateInfoRequestBody, thunkAPI) => {
    try {
      const res = await apiAgent.candidate.submitCandidateInfo(data);
      // if (!res) {
      //   throw new Error("Invalid credentials");
      // }
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

export const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    dummyMethod: (state: candiDateSliceStates) => {
      console.log("dummy methodddddddd");
      // state.keek = "keek keeek";
    },

    setVerifyCredentials: (state: candiDateSliceStates, action: any) => {
      state.verifyCredentials.id = action.payload.id;
      state.verifyCredentials.key = action.payload.key;
    },
    startTest: (state: candiDateSliceStates) => {
      state.isTestStarted = true;
      localStorage.setItem("testStarted", "true");
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      submitCandidateInfo.fulfilled,
      (state: candiDateSliceStates, action: any) => {
        state.testQuestions = action.payload;
        state.loadingStatus.buttonLoader = false;
        history.navigate("/rms-aug/test/start", {
          state: {
            testQuestions: action.payload,
            verifyCredentials: {
              id: state.verifyCredentials.id,
              key: state.verifyCredentials.key,
            },
          },
        });
      }
    );
    builder.addCase(
      submitCandidateInfo.rejected,
      (state: candiDateSliceStates, action: any) => {
        state.loadingStatus.buttonLoader = false;
      }
    );
    builder.addCase(
      submitCandidateInfo.pending,
      (state: candiDateSliceStates, action: any) => {
        state.loadingStatus.buttonLoader = true;
      }
    );

    builder.addCase(
      verifyCandidate.fulfilled,
      (state: candiDateSliceStates, action: any) => {
        if (action.payload.fromPage === "candidateInfo") {
          state.verifiedStatus.candidateInfoPage = true;
        } else {
          state.verifiedStatus.startQuizPage = true;
          state.isTestStarted = localStorage.getItem("testStarted") === "true";
        }

        state.errorMessage = "";
        state.loadingStatus.pageLoader = false;
      }
    );
    builder.addCase(
      verifyCandidate.rejected,
      (state: candiDateSliceStates, action: any) => {
        if (action.payload.status === 400) {
          if (action.payload.data) {
            state.errorMessage = action.payload.data;
          } else {
            state.errorMessage = "Something Wrong ";
          }
        }
        state.loadingStatus.pageLoader = false;
      }
    );
    builder.addCase(
      verifyCandidate.pending,
      (state: candiDateSliceStates, action: any) => {
        state.loadingStatus.pageLoader = true;
      }
    );
  },
});

export const { setVerifyCredentials, dummyMethod, startTest } =
  candidateSlice.actions;
