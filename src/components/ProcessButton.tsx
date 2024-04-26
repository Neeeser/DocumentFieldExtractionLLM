// components/ProcessButton.tsx

import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface ProcessButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

const ProcessButton: React.FC<ProcessButtonProps> = ({ onClick, disabled, loading }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick} disabled={disabled}>
      {loading ? <CircularProgress size={24} /> : 'Process'}
    </Button>
  );
};

export default ProcessButton;