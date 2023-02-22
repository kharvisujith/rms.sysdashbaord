import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  SvgIcon,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TablePagination,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { AxiosResponse } from "axios";
import { any } from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ImportsNotUsedAsValues } from "typescript";
import { setEnvironmentData } from "worker_threads";
import { createQuiz, getSubjectwiseQuiz } from "../../api/apiAgent";
import { makeStyles } from '@material-ui/core/styles';
import {
  createQuizRequest,
  createQuizResponse,
  subjectWiseQuizListResponse,
} from "../../Interface/QuizDetails";
import "./CreateQuiz.style.scss";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import NavBarInterviewer from "../../components/NavBar/NavBarInterviewer";
import SearchIcon from "@mui/icons-material/Search";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import SearchBar, { SearchBarProps } from "material-ui-search-bar";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

interface Column {
  id:
    | "setNumber"
    | "subjectName"
    | "totalQuestionsCount"
    | "select";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  {
    id: "setNumber",
    label: "set Number",
    minWidth: 100,
     //align: 'right',
  },
  { id: "subjectName", label: "Subject Name", minWidth: 100 },
  { id: "totalQuestionsCount", label: "Total Questions", minWidth: 100 },
  {
    id: "select",
    label: "Select",
    minWidth: 100,
    //align: 'right',
    //format: (value: number) => value.toLocaleString('en-US'),
  },
];


const CreateQuiz = () => {
  const classes = useStyles();
  const [subjectList, setSubjectList] = useState<subjectWiseQuizListResponse[]>(
    []
  );
  // const [checked, setChecked] = useState<boolean>(false);
  const [values, setValues] = useState<createQuizRequest[]>([]);
  const [newquiz, setNewQuiz] = useState<createQuizResponse | {}>({});
  const [quizLink, setQuizLink] = useState<string>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [name, setName] = useState<string>("");
  const [rows, setRows] = useState(subjectList);
  

  // const dataSearch = columns.filter((search: any) => {
  //   return search.subjectName.toLowerCase().includes(name.toLowerCase());
  // });
  const keys = ["setNumber", "subjectName", "totalQuestionsCount"]
  console.log(subjectList, 'value of column');

  const handleSearch = (searchedVal: string) => {
    const filteredRows = subjectList.filter((row) => {
      return (
         row.subjectName.toLowerCase().includes(searchedVal.toLowerCase()) || row.setNumber.toString().toLowerCase().includes(searchedVal.toString().toLowerCase()) || row.totalQuestionsCount.toString().toLowerCase().includes(searchedVal.toString().toLowerCase()));
    });
      setRows(filteredRows);
    console.log(filteredRows, 'row value');
  };

  // const cancelSearch = () => {
  //   setName("");
  //   handleSearch(name);
  // };
  // const handleSearch = (e: any) => {
  //   setName(e.target.value);
  //   const dataSearch = columns.filter((search: any) => {
  //     return search.subjectName.toLowerCase().includes(name.toLowerCase());
  //   });
  // }
  


  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    quiz: subjectWiseQuizListResponse
  ) => {
    console.log("value of quiz is", quiz);
    const existindex = values.findIndex((ele: createQuizRequest) => {
      return (
        ele.subjectName === quiz.subjectName && ele.setNumber === quiz.setNumber
      );
    });
    if (existindex !== -1 && !e.target.checked) {
      setValues((prev: createQuizRequest[]) => [
        ...prev.slice(0, existindex),
        ...prev.slice(existindex + 1),
      ]);
    } else {
      setValues([
        ...values,
        {
          setNumber: quiz.setNumber,
          subjectName: quiz.subjectName,
          totalQuestionsCount: quiz.totalQuestionsCount,
        },
      ]);
    }
  };

  const handleSubmit = () => {
    createQuiz(values)
      .then((res: AxiosResponse) => {
        setNewQuiz(res.data);
        Swal.fire({
          title: "Success",
          text: "Quiz created Succesfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
        setQuizLink(
          `http://localhost:3000/rms-aug/test/${res.data?.quizId}/${res.data?.quizLink}`
        );
        return res.data;
      })
      .catch((error: any) => {
        Swal.fire({
          title: "error",
          text: "Failed to create quiz! please retry",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  const subjectwiseQuizDetails = async () => {
    getSubjectwiseQuiz("")
      .then((response: AxiosResponse) => {
        setSubjectList(response.data);
        
      })
      .catch((error: any) => console.log("error in subjwiseapi"));
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

  useEffect(() => {
    subjectwiseQuizDetails();
  }, []);

  return (subjectList.length>0? 
    <>
      <NavBarInterviewer />
      
      <Box className="subjectlist-box">

      {/* <SearchBar
          value={name}
          onChange={(searchVal : any) => handleSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        /> */}
        <Box className="table-header">
         <OutlinedInput className="search-input"
        sx={{
           
          borderRadius: "0.3rem",
          height: 30,
          minWidth: 10,
          border: "0.1px solid #000",
        }}
        id="outlined-adornment-weight"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        placeholder="Search"
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        aria-describedby="outlined-weight-helper-text"
      />
      </Box>
        
         <Paper className="paper">
        <Typography variant="h5" className="table-title" >
          Available Question Sets
        </Typography>
      {/* </Box> */}
     
          <TableContainer className="table-container">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {subjectList &&
                  subjectList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) &&
                    subjectList.filter((row) => !name.length || row.subjectName.toLowerCase().includes(name.toLowerCase()) || 
                    row.setNumber.toString().toLowerCase().includes(name.toString().toLowerCase()) || 
                     row.totalQuestionsCount.toString().toLowerCase().includes(name.toString().toLowerCase()))
                    
                    .map((row: any, index: number) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {columns.map((column, index) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={index} align={column.align} size="small" >
                                {column.id === "select"
                                  ? <Checkbox
                                  name="checkbox-1"
                                  onChange={(e: any) => handleCheckboxChange(e, row)}
                                />
                                  : value
                                  
                                  }
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
     
      {/* <TableContainer className="table-container">
        <Table 
          aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left">Set Number</TableCell>
              <TableCell align="left">Subject Name</TableCell>
              <TableCell align="left">Total Questions</TableCell>
              <TableCell align="left">Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) &&
              subjectList.map((row: any) => (
                <TableRow  hover role="checkbox" tabIndex={-1} 
                  key={row.code} 
                  
                  
                >
                  <TableCell size="small" align="left">{row.setNumber}</TableCell>
                  <TableCell  size="small" align="left">{row.subjectName}</TableCell>
                  <TableCell size="small" align="left">
                    {row.totalQuestionsCount}
                  </TableCell>
                  <TableCell  size="small" align="left">
                    <Checkbox
                      name="checkbox-1"
                      onChange={(e: any) => handleCheckboxChange(e, row)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={subjectList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
      </Box>

      <Button   className="button-create"
        variant="contained"
        type="submit"
        sx={{
          marginTop: 1,
          marginLeft: 83,
          // display: "flex",
          // flexDirection: "column",
          alignItems: "center",
        }}
        onClick={handleSubmit}
      >
        Create
      </Button>

      {quizLink && (
        <Box className="box-link"
        sx={{ marginTop: 4}}
        >
          <Typography > 
           {`Test Link :`} 
           </Typography>
          <Box className="test-link">
            <Typography > 
              {quizLink}
              {/* {`http://localhost:3000/rms-aug/test/${newquiz?.quizId}/${newquiz?.quizLink}`} */}
            </Typography>
            <Button className="copy"
              variant="outlined"
              onClick={() => copyToClipboard(quizLink)}
            >
              <SvgIcon className="icon"
                // sx={{ marginLeft: -1 }}
                component={ContentCopyIcon}
                inheritViewBox
              />
              Copy
            </Button>
          </Box>
        </Box>
      )}
    </>
     :<>
     <NavBarInterviewer />
     <span><h5>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;No  results</h5></span>
     </>
  );
};

export default CreateQuiz;
