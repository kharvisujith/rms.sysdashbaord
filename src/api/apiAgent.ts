import axios, { AxiosError, AxiosResponse } from "axios";

export const axiosClient = axios.create({
  baseURL: `https://localhost:5001/api/Rms/1/`,
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
    if (res.status == 401) {
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
  set: number,
  subject: string,
  formData: FormData
) => {
  return axiosClient.post(
    `/quiz/import?setNumber=${set}&SubjectName=${subject}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/formData",
      },
    }
  );
};

export const getQuizQuestions = (set: number, subject: string) => {
  return axiosClient.get(
    `quiz/candidate/questions?set=${set}&subject=${subject}`
  );
};

export const getSuBjectwiseQuiz = (subject: string) => {
  return axiosClient.get("/quiz/SubjectExpert/allquestions", {
    params: { subject: subject },
  });
};
