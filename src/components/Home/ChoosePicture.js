import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const ChoosePicture = ({ setSelectedFile, selectedFile, srcImage }) => {
  const [preview, setPreview] = useState(undefined);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setSelectedFile(selectedFile);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
    } else {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSelectFile = (e) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div {...getRootProps()} style={{ width: "100%", height: "100%" }}>
        <input {...getInputProps()} onChange={onSelectFile} />
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
          <div style={{ height: "90%", marginBottom: 0 }}>
            <img
              src={
                srcImage ||
                "https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg"
              }
              alt="image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
        <div style={{ marginTop: 10 }}>
          <span>Click and choose a photo</span>
        </div>
      </div>
    </div>
  );
};

export default ChoosePicture;
