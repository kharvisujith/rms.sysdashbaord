import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button, Typography } from "@mui/material";
import SideBar from "../../components/TopNavBar/TopNavBar";
import { useEffect, useState } from "react";

import { Container } from "@mui/material";

const RmsHome = (props: any) => {
  const navigate = useNavigate();
  const getData = () => {
    console.log("getDAta is calledd");
  };

  // useEffect(() => {
  //   const unloadCallback = (event: any) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //     console.log("unloda claback calleddd");
  //     localStorage.setItem("dummy", "true");
  //     return "";
  //   };
  //   window.addEventListener("beforeunload", unloadCallback);
  //   console.log(
  //     "value of locl stroage dummu is",
  //     localStorage.getItem("dummy")
  //   );
  //   // return () => window.removeEventListener("beforeunload", unloadCallback);
  // }, []);

  // const unloadCallback = (event: any) => {
  //   event.preventDefault();
  //   event.returnValue = "";
  //   console.log("unloda claback calleddd");
  //   localStorage.setItem("dummy", "true");
  //   return "";
  // };

  // window.addEventListener("beforeunload", unloadCallback);

  // useEffect(() => {
  //   console.log("useEffect in rms home is called");
  //   // const bu = localStorage.getItem("beforeunload");
  //   // const un = localStorage.getItem("unload");
  //   //  console.log("value of bu and un is", bu, un);
  // }, []);

  //   const unloadCallback = (event:any) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //     return "";
  //   };

  //   window.addEventListener("beforeunload", unloadCallback);
  //   return () => window.removeEventListener("beforeunload", unloadCallback);
  // };

  // window.addEventListener("beforeunload", (event) => {
  //   //  getData();
  //   localStorage.setItem("beforeunload", "true");
  //   console.log("API call before page reload");
  // });

  // window.addEventListener("unload", (event) => {
  //   //getData();
  //   localStorage.setItem("unload", "trueee");
  //   console.log("API call after page reload");
  // });

  // const [state, setState] = useState<any>("peeek");

  // useEffect(() => {
  //   console.log("useEffect 1");
  //   setState("keeek");
  //   console.log("heeyy");
  // }, []);
  // useEffect(() => {
  //   console.log("useEffect 2");
  //   console.log("value of state is", state);
  // }, [state]);

  return (
    <>
      <SideBar />

      <div>
        <p style={{ paddingLeft: "190px" }}>
          <li>
            {" "}
            <strong>Subject Expert</strong> is any authenticated user(every one){" "}
          </li>
          <li>
            {" "}
            <strong>Interviewer</strong> is any authenticated user{" "}
          </li>
          <li>
            {" "}
            <strong>Candidate</strong> will never be authenticated{" "}
          </li>
        </p>
        <p style={{ textAlign: "center" }}>
          <button onClick={() => navigate("/assignments")}>
            Subject Expert
          </button>{" "}
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => navigate("/reviewer")}>Interviewer</button>
          &nbsp;&nbsp;&nbsp;
        </p>
      </div>
    </>
  );
};
export default RmsHome;

// export default function App() {
//   useEffect(() => {
//     // const unloadCallback = (event: any) => {
//     //   event.preventDefault();
//     //   event.returnValue = "";
//     //   return "dsfjlkdsjflk";
//     // };
//     // window.addEventListener("beforeunload", unloadCallback);
//     // return () => window.removeEventListener("beforeunload", unloadCallback);
//   }, []);
//   window.onbeforeunload = function () {
//     return "Data will be lost if you leave the page, are you sure?";
//   };

//   return (
//     <div>
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//     </div>
//   );
// }

// const App = () => {
//   const [show, setShow] = useState(false);
//   useEffect(() => {
//     window.addEventListener("beforeunload", alertUser);
//     window.addEventListener("unload", handleEndConcert);
//     return () => {
//       window.removeEventListener("beforeunload", alertUser);
//       window.removeEventListener("unload", handleEndConcert);
//       handleEndConcert();
//     };
//   }, []);

//   const alertUser = (e: any) => {
//     e.preventDefault();
//     e.returnValue = "";
//   };

//   const handleEndConcert = async () => {
//     localStorage.setItem("timer", "true");
//     // await fetcher({
//     //   url: endConcert(concert.id),
//     //   method: 'PUT'
//     // })
//   };

//   return (
//     <Container>
//       {/* <Prompt
//         when={isPrompt()}
//         message={() => "Are you sure you want to leave this page?"}
//       /> */}
//       <h1>keeeek</h1>
//     </Container>
//   );
// };

// export default App;
