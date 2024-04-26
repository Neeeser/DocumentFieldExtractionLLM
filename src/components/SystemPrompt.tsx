// components/SystemPrompt.tsx


import React from 'react';
import { Box, Typography, LinearProgress, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PromptBox = styled(Accordion)<{ isProcessing: boolean }>`
  background: ${({ isProcessing }) =>
    isProcessing
      ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #ffe66d, #ff6b6b)'
      : 'white'};
  background-size: 400% 400%;
  animation: ${({ isProcessing }) =>
    isProcessing ? 'gradient 5s ease infinite' : 'none'};

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

interface SystemPromptProps {
  isProcessing: boolean;
  filename?: string;
}
  
  const SystemPrompt: React.FC<SystemPromptProps> = ({ isProcessing, filename = 'sys_prompt_instruct.txt' }) => {
    const [sysPromptFile, setSysPromptFile] = React.useState<string>('');
  
    React.useEffect(() => {
      const fetchSysPromptFile = async () => {
        try {
          const response = await fetch(`/api/prompts?filename=${filename}`);
          const data = await response.json();
          setSysPromptFile(data.sysPromptFile);
        } catch (error) {
          console.error('Failed to fetch sys prompt file', error);
        }
      };
  
      fetchSysPromptFile();
    }, [filename]);
  

    return (
        <PromptBox isProcessing={isProcessing}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">System Prompt</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box p={2}>
              <Typography whiteSpace="pre-wrap">{sysPromptFile}</Typography>
              {isProcessing && <LinearProgress />}
            </Box>
          </AccordionDetails>
        </PromptBox>
      );
    };

export default SystemPrompt;
