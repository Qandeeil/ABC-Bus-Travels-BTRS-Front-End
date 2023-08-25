import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfilePicture } from '../../../../store/Registration/SignUp';
import '../../../../styles/Registration/SignUp/SectionRight/ChoosePicture.scss';

const ChoosePicture = ({caseSignup}) => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state);

  const [selectedFile, setSelectedFile] = useState();
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

  useEffect(() => {
    const formData = new FormData();
    formData.append('_id', users?.createAccount?.userId ? users?.createAccount?.userId : users?.createAccount?.adminId);

    if (selectedFile) {
      formData.append('profilePicture', selectedFile);
      dispatch(updateProfilePicture({data: formData, case: caseSignup}));
    }
    console.log(selectedFile)
  }, [selectedFile, users?.createAccount?.userId, users?.createAccount?.adminId, dispatch]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className='choosePictureSliderRight'>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '81%' }}>
        <div {...getRootProps()} style={{ width: 150, height: 150, border: '1px dashed #ccc', borderRadius: '8px' }} className='containerImage'>
          <input {...getInputProps()} onChange={onSelectFile} />
          {preview ? (
            <img src={preview} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
          ) : (
            <div className='chooseProfilePhoto'>
              <img src='https://freesvg.org/img/1389952697.png' style={{ borderRadius: '8px', width: '50px' }} />
              <span>Click and choose profile photo</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChoosePicture;
