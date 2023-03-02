import axios, { AxiosError, AxiosResponse } from "axios";
import CandidateDetails from "../Interface/CandidateDetails";
//import QuizDetails from "../Interface/QuizDetails";
// import QuizDetails from "../Interface/QuizDetails";

export const axiosClient = axios.create({
  baseURL: `https://localhost:5001/api/Rms/1/`,
  // https://localhost:5001/api/Rms/1/quiz/interviewer/createquiz
  // https://localhost:5001/api/Rms/1/quiz/getCandidateQuestions?set=1&subject=javascript
  // headers: {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json'
  // }
});

// these two gets called everytime we send api request to that particular instance
// to intercept the api request
axios.interceptors.request.use((config) => {
  // const token = store.getState().account.user?.token
  //  if(token) config.headers!.Authorization = `Bearer ${token}`
  return config;
});

// to intercept the api response - can handle errors here
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    let res = error.response as any;
    switch (res.status) {
      case 401:
        console.log("unauthorized");
    }
    if (res.status === 401) {
      // window.location.href = “https://example.com/login”;
      console.log("unauthorized");
    }
    // can handle errors here
    console.log(`Looks like there was a problem. Status Code: ${res.status}`);
    return Promise.reject(error);
  }
);

export const downnLoadExcel = () => {
  return axiosClient.get("/quiz/exportTemplate", { responseType: "blob" });
};

export const upLoadExcel = (
  version: string,
  subject: string,
  tags: string,
  formData: FormData
) => {
  console.log("value of subject upload api is", subject);
  return axiosClient.post(
    `/quiz/import?version=${version}&SubjectName=${subject}&tag=${tags}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/formData",
      },
    }
  );
};

export const getQuizQuestions = (version: string, subject: string) => {
  return axiosClient.get(
    `quiz/candidate/questions?version=${version}&subject=${subject}`
  );
};

export const getSubjectwiseQuiz = (subject: string) => {
  return axiosClient.get("/quiz/SubjectExpert/allquestions", {
    params: { subject: subject },
  });
};
export const getSubjectwiseQuizAnswers = (version: any, subject: any) => {
  return axiosClient.get(
    `quiz/SubjectExpert/questions?version=${version}&subject=${subject}`
  );
};
export const submitQuiz = (quizAnswers: any) => {
  return axiosClient.post("/quiz/interviewer/submitquiz", quizAnswers, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const verifyCandidate = (qId: number, confirmcode: string) => {
  return axiosClient.get(
    `quiz/candidate/checkquizid?quizId=${qId}&confirmationCode=${confirmcode}`
  );
};

export const submitCandidateInfo = (
  qId: number,
  confirmcode: string,
  user: CandidateDetails
) => {
  return axiosClient.post(
    `/quiz/candidate/adduser?quizId=${qId}&confirmationCode=${confirmcode}`,
    user
  );
};

export const createQuiz = (values: any) => {
  return axiosClient.post(`/quiz/interviewer/createquiz`, values, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const getTotalQuizLinksInfo = () => {
  return axiosClient.get(`quiz/interviewer/quizdetails`);
};
export const getTotalSubmittedQuizInfo = () => {
  return axiosClient.get(`quiz/interviewer/submitquiz`);
};
export const getSubmittedQuizInfo = (qId: number) => {
  return axiosClient.get(`quiz/interviewer/submitquiz/${qId}`);
};
export const getSubmittedQuizDetailedInfo = (qId: number) => {
  return axiosClient.get(`quiz/interviewer/submitquizdetails/${qId}`);
};
