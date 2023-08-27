import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const ChoosePicture = ({setSelectedFile, selectedFile}) => {
  
  const [preview, setPreview] = useState();

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setSelectedFile(selectedFile);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  //   useEffect(() => {
  //     const formData = new FormData();
  //     formData.append('_id', SignUp?.createAccount?.userId ? SignUp?.createAccount?.userId : SignUp?.createAccount?.adminId);

  //     if (selectedFile) {
  //       formData.append('profilePicture', selectedFile);
  //       dispatch(updateProfilePicture({data: formData, case: caseSignup}));
  //     }
  //     console.log(selectedFile)
  //   }, [selectedFile, SignUp?.createAccount?.userId, SignUp?.createAccount?.adminId, dispatch]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "100%" }}>
        <div {...getRootProps()} style={{ width: "100%", height: "100%" }}>
          <input {...getInputProps()} onChange={onSelectFile} />
          {/* <img
            src={
              preview
                ? preview
                : "https://img.icons8.com/cute-clipart/64/add-image.png"
            }
            alt="Uploaded"
            style={{
              width: "100%",
              height: "100%",
              objectFit: 'cover'
            }}
          /> */}
          {preview ? (
            <img
              src={preview}
              alt="Uploaded"
              style={{
                width: "100%",
                height: "90%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div style={{height: "90%", marginBottom: 0}}>
              <img src="https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg"  />
            </div>
          )}
          <div>
              <span style={{marginTop: 10}}>Click and choose photo</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChoosePicture;
