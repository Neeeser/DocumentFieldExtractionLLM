'use client';

import React from 'react';
import { Container, Box, Grid } from '@mui/material';
import UploadButton from '../components/UploadButton';
import DocumentViewer from '../components/DocumentViewer';
import ContractFieldsTable from '../components/ContractFieldsTable';
import ProcessButton from '../components/ProcessButton';
import SystemPrompt from '../components/SystemPrompt';

const UploadPage = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [text, setText] = React.useState<string>('');
  const [response, setResponse] = React.useState<Record<string, string | null> | null>(null);
  const [contractFields, setContractFields] = React.useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
 


  const handleFileUpload = async (file: File) => {
    setFile(file);
    const extractedText = await file.text();
    setText(extractedText);
  };

  const handleProcessClick = async () => {
    if (text) {
      setIsProcessing(true);
      try {
        const response = await fetch('/api/LLM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: text }),
        });

        if (response.ok) {
          const data = await response.json();
          setResponse(data);
        } else {
          console.error('Failed to process document');
        }
      } catch (error) {
        console.error('Failed to process document', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };


  const handleFieldChange = (field: string, value: string) => {
    setContractFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  React.useEffect(() => {
    if (response) {
      const initialFields: Record<string, string> = {};
      Object.keys(response).forEach((field) => {
        initialFields[field] = '';
      });
      setContractFields(initialFields);
    }
  }, [response]);


  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="center" mt={4} mb={2}>
        <UploadButton onFileUpload={handleFileUpload} />
        <Box ml={2}>
          <ProcessButton
            onClick={handleProcessClick}
            disabled={!file || isProcessing}
            loading={isProcessing}
          />
        </Box>
      </Box>
      <SystemPrompt isProcessing={isProcessing} />
      <Grid container spacing={4} alignItems="flex-start" style={{ marginTop: 16, marginBottom: 16 }}>
        <Grid item xs={12} md={8} style={{ paddingRight: 32 }}> {/* Adjusted right padding */}
          <DocumentViewer file={file} text={text} />
        </Grid>
        {response && (
          <Grid item xs={12} md={4} style={{ paddingLeft: 32 }}> {/* Adjusted left padding */}
            <ContractFieldsTable fields={contractFields} onFieldChange={handleFieldChange} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
  
  
  
};

export default UploadPage;