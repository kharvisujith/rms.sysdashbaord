import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAgent } from "../api/apiAgent";
import Swal from "sweetalert2";
import { UpdateQuestionsSet } from "../Interface/SubjectExpert/SubjectExpert";

const initialState: any = {
  searchText: {
    home: "",
    newUpload: "",
    modifyModal: "",
  },
  subject: "",
  questionsModifyTableData: [],
  isModifyQuestionsModalOpen: false,
  modifyModalQuestions: [],
  editQuestionStates: {
    anchorElEdit: null,
    editQuestionDetails: {},
    editedQuestions: null,
    tempQuestionData: [],
    editedQuestionNumbers: [],
    //  validationError: [],
  },
  viewQuestionModalState: {
    isViewQuestionModalOpen: false,
    viewQuestions: [],
  },

  loadingStatus: {
    tableLoader: false,
  },
};

export const fetchSubjectwiseQuestionSets = createAsyncThunk<any>(
  "subjectExpert/subjectwiseQuestionSets",
  async (_, thunkAPI: any) => {
    try {
      console.log("fetch subject wise thunk for home table called  called");
      const subject = thunkAPI.getState().subjectExpert.subject;
      console.log(thunkAPI.getState());
      console.log("subjct is ", subject);
      const response = await apiAgent.subjectExpert.getSubjectwiseQuestionSets(
        subject === "ALL" || subject === "" ? "" : subject
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.respone });
    }
  }
);

export const deleteSelectedQuesitonSet = createAsyncThunk<any, any>(
  "subjectExpert/deleteQuestionSet",
  async (setInfo: any, thunkAPI: any) => {
    try {
      const response = await apiAgent.subjectExpert.deleteQuestionSet(
        setInfo.version,
        setInfo.subjectName
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response });
    }
  }
);

// export const deleteQuestionById = createAsyncThunk<any, any>(
//   "subjectExpert/deleteQuestion",
//   async (questionDetails: any, thunkAPI: any) => {
//     try {
//       console.log("state in delete thunk functonis", thunkAPI.getState());

//       const response = await apiAgent.subjectExpert.deleteQuestionsById(
//         questionDetails
//       );
//       //return { questionDetails, response };
//       console.log("responsein delete thunk is", response);
//       return response;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue({ error: error.respone });
//     }
//   }
// );
export const deleteQuestion = createAsyncThunk<any, any>(
  "subjectExpert/deleteQuestion",
  async (questionDetails: any, thunkAPI: any) => {
    try {
      const response = await apiAgent.subjectExpert.deleteQuestionsById(
        questionDetails
      );
      console.log(response);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.respone });
    }
  }
);

// export const fetcQuestionsForSet = createAsyncThunk<any, any>(
//   "subjectExpert/modifyMdalQuesitons",
//   async (questionDetails: any, thunkAPI: any) => {
//     try {
//       console.log("yessss its called form add case");
//       const response =
//         await apiAgent.subjectExpert.getQuestionAnswersForQuestionSet(
//           questionDetails.version,
//           questionDetails.subjectName
//         );
//       console.log("response is", response.data);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue({ error: error.response });
//     }
//   }
// );
export const fetcQuestionsForSet = createAsyncThunk<
  any,
  { questionDetails: any; from: any }
>(
  "subjectExpert/modifyMdalQuesitons",
  async ({ questionDetails, from }, thunkAPI: any) => {
    try {
      console.log("yessss its called form add case");
      const response =
        await apiAgent.subjectExpert.getQuestionAnswersForQuestionSet(
          questionDetails.version,
          questionDetails.subjectName
        );
      console.log("response is", response.data);
      return { data: response.data, from: from };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response });
    }
  }
);

export const updateEditedQuestion = createAsyncThunk<any, UpdateQuestionsSet>(
  "subjectExpert/updateQuestion",
  async (data: UpdateQuestionsSet, thunkAPI: any) => {
    try {
      const respone = await apiAgent.subjectExpert.updateQuestion(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.respone });
    }
  }
);

export const subjectExpertSlice = createSlice({
  name: "subjectExpert",
  initialState,
  reducers: {
    handleSearchText: (state: any, action: any) => {
      console.log("action.payload issss", action.payload, action.payload.from);

      switch (action.payload.from) {
        case "home":
          return {
            ...state,
            searchText: {
              ...state.searchText,
              home: action.payload.value,
            },
          };

        case "newUpload":
          return {
            ...state,
            searchText: {
              ...state.searchText,
              newUpload: action.payload.value,
            },
          };

        case "modifyModal":
          return {
            ...state,
            searchText: {
              ...state.searchText,
              modifyModal: action.payload.value,
            },
          };

        default:
          return;
      }
    },

    setModalQuestions: (state: any, action: any) => {
      console.log(
        "action payloadddd is",
        action,
        action.payload.value
        // action.paylaod.value
      );
      return {
        ...state,
        modifyModalQuestions: action.payload.value,
      };
    },

    setSearchTextToEmpty: (state: any, action: any) => {
      console.log("action is", action.payload.from);
      return {
        ...state,
        searchText: {
          ...state.searchText,
          [action.payload.from]: "",
        },
      };
    },
    handleSubject: (state: any, action: any) => {
      console.log("state in subject is", state);
      console.log("action.payload is", action.payload.value);
      // state.subject = action.payload.event.target.value;
      return {
        ...state,
        subject: action.payload.value,
      };
    },
    closeModifyQuestionModal: (state: any) => {
      console.log("closee callled");
      const kk = {
        ...state,
        isModifyQuestionsModalOpen: false,
      };
      console.log("kk is", kk);
      return kk;
    },
    handleModifyQuesitonModal: (state: any) => {
      if (state.isModifyQuestionsModalOpen) {
        return {
          ...state,
          isModifyQuestionsModalOpen: false,
        };
      } else {
        return {
          ...state,
          isModifyQuestionsModalOpen: true,
        };
      }
    },
    setTempQuestionData: (state: any, action: any) => {
      console.log(
        "setTemplate Questoin DAta is clledd and payload is",
        action.payload.data
      );
      return {
        ...state,
        editQuestionStates: {
          ...state.editQuestionStates,
          tempQuestionData: action.payload.data,
        },
      };
    },

    openEditPopover: (state: any, action: any) => {
      console.log(
        "open edit popver called and payload is",
        action.payload.event.currentTarget
      );
      return {
        ...state,
        editQuestionStates: {
          ...state.editQuestionStates,
          anchorElEdit: action.payload.event.currentTarget,
          editQuestionDetails: action.payload.questionDetails,
        },
      };
    },
    closeEditPopover: (state: any) => {
      return {
        ...state,
        editQuestionStates: {
          ...state.editQuestionStates,
          anchorElEdit: null,
        },
      };
    },
    setEditedQuestions: (state: any, action: any) => {
      console.log("set edited quesiton payload is", action.payload.data);

      return {
        ...state,
        editQuestionStates: {
          ...state.editQuestionStates,
          editedQuestions: action.payload.data,
        },
      };
    },
    setEditedQuestionNumbers: (state: any, action: any) => {
      console.log(
        "set edited question numbers called and payloadis",
        action.payload.data
      );
      return {
        ...state,
        editQuestionStates: {
          ...state.editQuestionStates,
          editedQuestionNumbers: action.payload.data,
        },
      };
    },
    clearEditData: (state: any) => {
      console.log("inside clear data reducer");

      return {
        ...state,
        editQuestionStates: {
          ...state.editQuestionStates,
          editedQuestions: null,
          tempQuestionData: [],
          editedQuestionNumbers: [],
        },
      };
    },

    handleViewQuestionModal: (state: any) => {
      return state.viewQuestionModalState.isViewQuestionModalOpen
        ? {
            ...state,
            viewQuestionModalState: {
              ...state.viewQuestionModalState,
              isViewQuestionModalOpen: false,
            },
          }
        : {
            ...state,
            viewQuestionModalState: {
              ...state.viewQuestionModalState,
              isViewQuestionModalOpen: true,
            },
          };
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      fetchSubjectwiseQuestionSets.fulfilled,
      (state: any, action: any) => {
        return {
          ...state,
          questionsModifyTableData: action.payload,
          loadingStatus: {
            ...state.loadingStatus,
            tableLoader: false,
          },
        };
      }
    );
    builder.addCase(
      fetchSubjectwiseQuestionSets.rejected,
      (state: any, action: any) => {
        return {
          ...state,
          loadingStatus: {
            ...state.loadingStatus,
            tableLoader: false,
          },
        };
        // state.loadingStatus.tableLoader = false;
      }
    );
    builder.addCase(
      fetchSubjectwiseQuestionSets.pending,
      (state: any, action: any) => {
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
      fetcQuestionsForSet.fulfilled,
      (state: any, action: any) => {
        console.log("fullfilleddd paylaod is", action.payload);
        if (action.payload.from === "home") {
          return {
            ...state,
            modifyModalQuestions: action.payload.data,
          };
        } else {
          return {
            ...state,
            viewQuestionModalState: {
              ...state.viewQuestionModalState,
              viewQuestions: action.payload.data,
            },
          };
        }
      }
    );
    builder.addCase(
      fetcQuestionsForSet.rejected,
      (state: any, action: any) => {}
    );
    builder.addCase(
      fetcQuestionsForSet.pending,
      (state: any, action: any) => {}
    );

    builder.addCase(
      deleteSelectedQuesitonSet.fulfilled,
      (state: any, action: any) => {
        console.log("fullfilledd in delete question set");
      }
    );
    builder.addCase(
      deleteSelectedQuesitonSet.rejected,
      (state: any, action: any) => {}
    );
    builder.addCase(
      deleteSelectedQuesitonSet.pending,
      (state: any, action: any) => {}
    );

    builder.addCase(
      updateEditedQuestion.fulfilled,
      (state: any, action: any) => {
        Swal.fire({
          title: "Success",
          text: "Updated Succesfully",
          icon: "success",
          confirmButtonText: "Okay",
          customClass: "swal-alert",
        });
        return {
          ...state,
          isModifyQuestionsModalOpen: false,
          editQuestionStates: {
            ...state.editQuestionStates,
            editedQuestions: null,
            tempQuestionData: [],
            editedQuestionNumbers: [],
          },
        };
        // state = {
        //   ...state,
        //   editQuestionStates: {
        //     ...state.editQuestionStates,
        //     anchorElEdit: null,
        //     editedQuestions: null,
        //     tempQuestionData: [],
        //     editedQuestionNumbers: [],
        //   },
        // };
      }
    );

    builder.addCase(
      updateEditedQuestion.rejected,
      (state: any, action: any) => {
        Swal.fire({
          title: "error",
          text: "Failed to delete",
          icon: "error",
          confirmButtonText: "Okay",
          customClass: "swal-alert",
        });
      }
    );
    builder.addCase(
      updateEditedQuestion.pending,
      (state: any, action: any) => {}
    );
  },
});

export const {
  handleSearchText,
  handleSubject,
  handleModifyQuesitonModal,
  setSearchTextToEmpty,
  closeModifyQuestionModal,
  setTempQuestionData,
  openEditPopover,
  closeEditPopover,
  setEditedQuestions,
  setEditedQuestionNumbers,
  clearEditData,
  handleViewQuestionModal,
} = subjectExpertSlice.actions;
