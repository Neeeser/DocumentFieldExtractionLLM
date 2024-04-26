import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

interface DocumentViewerProps {
  file: File | null;
  text: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ file, text }) => {
  return (
    <Paper elevation={1} style={{ height: '70vh', overflow: 'auto' }}>
      <Box p={2}>
        {file && (
          <Box mb={2}>
            <Typography variant="h6">Uploaded Document:</Typography>
            <Typography>{file.name}</Typography>
          </Box>
        )}
        {text && (
          <Box>
            <Typography variant="h6">Document Content:</Typography>
            <Typography whiteSpace="pre-wrap">{text}</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default DocumentViewer;
