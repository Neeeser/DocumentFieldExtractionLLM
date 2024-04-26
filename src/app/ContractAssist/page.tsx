'use client';
import React from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SystemPrompt from '../../components/SystemPrompt';

const ContractAssistantDemo = () => {
  const contractTypes = [
    {
      value: 'professionalServices',
      label: 'Professional Services Agreement',
      description: 'An agreement for hiring a professional to provide services.',
    },
    {
      value: 'nda',
      label: 'Non-Disclosure Agreement',
      description: 'An agreement to protect confidential information.',
    },
    {
      value: 'msa',
      label: 'Master Services Agreement',
      description: 'A comprehensive agreement for ongoing services.',
    },
  ];

  const clauses = [
    {
      id: 'clause1',
      label: 'Confidentiality',
      content: 'The parties agree to keep all information confidential.',
    },
    {
      id: 'clause2',
      label: 'Intellectual Property',
      content: 'The client retains ownership of all intellectual property.',
    },
    {
      id: 'clause3',
      label: 'Termination',
      content: 'Either party may terminate the agreement with 30 days notice.',
    },
  ];

  const [contractType, setContractType] = React.useState('');
  const [clientName, setClientName] = React.useState('');
  const [contractorName, setContractorName] = React.useState('');
  const [projectDescription, setProjectDescription] = React.useState('');
  const [paymentTerms, setPaymentTerms] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [selectedClauses, setSelectedClauses] = React.useState<string[]>([]);
  const [previewContent, setPreviewContent] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handlePreview = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/GenerateContract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contractType,
          clientName,
          contractorName,
          projectDescription,
          paymentTerms,
          startDate,
          endDate,
          clauses: clauses.filter((clause) => selectedClauses.includes(clause.id)),
        }),
      });

      if (response.ok) {
        const content = await response.text();
        setPreviewContent(content);
      } else {
        console.error('Error generating contract preview:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating contract preview:', error);
    }
    setIsProcessing(false);
  };


  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Contract Assistant Demo
      </Typography>
      <Typography variant="body1" gutterBottom>
        This tool demonstrates how an LLM can assist in creating and customizing contracts.
      </Typography>

      <Box display="flex" mt={4}>
        <Box flex={1} mr={2}>
          <FormControl fullWidth>
            <InputLabel>Contract Type</InputLabel>
            <Select value={contractType} onChange={(e) => setContractType(e.target.value as string)}>
              {contractTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="body2" mt={1}>
            {contractTypes.find((type) => type.value === contractType)?.description}
          </Typography>
        </Box>

        <Box flex={2} mr={2}>
          <TextField
            label="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contractor Name"
            value={contractorName}
            onChange={(e) => setContractorName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Payment Terms"
            value={paymentTerms}
            onChange={(e) => setPaymentTerms(e.target.value)}
            fullWidth
            margin="normal"
          />
<TextField
  label="Start Date"
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
  fullWidth
  margin="normal"
  type="date"
  InputLabelProps={{
    shrink: true,
  }}
/>

<TextField
  label="End Date"
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
  fullWidth
  margin="normal"
  type="date"
  InputLabelProps={{
    shrink: true,
  }}
/>

        </Box>

        <Box flex={1}>
          {clauses.map((clause) => (
            <Accordion key={clause.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedClauses.includes(clause.id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setSelectedClauses((prevSelected) =>
                          checked ? [...prevSelected, clause.id] : prevSelected.filter((id) => id !== clause.id)
                        );
                      }}
                    />
                  }
                  label={clause.label}
                />
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">{clause.content}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handlePreview} disabled={isProcessing}>
          {isProcessing ? 'Generating Preview...' : 'Preview Contract'}
        </Button>
      </Box>
      <Box mt={2}>
        <SystemPrompt isProcessing={isProcessing} filename="Generate_contract_sys_prompt_instruct.txt" />
      </Box>
      {previewContent && (
        <Box mt={4} p={2} border={1} borderColor="grey.300" borderRadius={4}>
          <Typography variant="h6" gutterBottom>
            Contract Preview
          </Typography>
          <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
            {previewContent}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ContractAssistantDemo;
