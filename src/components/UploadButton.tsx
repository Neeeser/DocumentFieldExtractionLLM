// components/UploadButton.tsx
import React from 'react';
import { Button } from '@mui/material';

interface UploadButtonProps {
  onFileUpload: (file: File) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <Button variant="contained" component="label">
      Upload Document
      <input type="file" accept=".txt" hidden onChange={handleFileChange} />
    </Button>
  );
};

export default UploadButton;