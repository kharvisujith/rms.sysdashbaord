import { ChangeEvent, useState } from "react";
import { axiosClient, upLoadExcel } from "../../api/apiAgent";
import SubjectList from "../SubjectExpertDataList/SubjectList";

function FileUploadSingle() {
  const [file, setFile] = useState<File>();
  const [data, setData] = useState<any>({
    set: "",
    subject: "",
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("formFile", file);

    upLoadExcel(data.set, data.subject, formData)
      .then((res) => res.data)
      .catch((error: any) => console.log("error"));
  };

  const handleTextChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <div>
        <input type="number" name="set" onChange={handleTextChange} />
        <input type="text" name="subject" onChange={handleTextChange} />
        <input type="file" onChange={handleFileChange} accept=".xlsx,.xls" />
        <button type="submit" onClick={handleUploadClick}>
          File Upload
        </button>
      </div>
    </>
  );
}

export default FileUploadSingle;
