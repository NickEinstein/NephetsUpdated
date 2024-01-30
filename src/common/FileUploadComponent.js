import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { post } from "services/fetch";
import {
  Upload,
  UploadFile,
  UploadFileOutlined,
  UploadFileSharp,
} from "@mui/icons-material";

const FileUploadComponent = ({ onFileChange }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const handleFileChange = async (e) => {
    const formData = new FormData();

    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file);

    // Callback to parent component with the selected file

    formData.append("file", file);

    setisLoading(true);

    const res = await post({
      endpoint: "services/api/documents/requisition-manager",
      body: formData,
      // auth: false,
    });

    if (res && res.status == 200) {
      setisLoading(false);
      if (onFileChange) {
        onFileChange(res.data, file.name);
      }
    }

    // https://edogoverp.com/services/api/documents/admin-stores
  };

  return (
    <div className="flex items-center w-full">
      <label className="cursor-pointer w-1/4 bg-primary-main text-white py-2 px-4 rounded-full flex justify-between items-center">
        {isLoading ? "Uploading..." : "Choose File"}
        <input type="file" className="hidden" onChange={handleFileChange} />
        <Upload />
      </label>
      {/* {selectedFile && <span className="ml-3">{selectedFile.name}</span>} */}
    </div>
  );
};

export default FileUploadComponent;
