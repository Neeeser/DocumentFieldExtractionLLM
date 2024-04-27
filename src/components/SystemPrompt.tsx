// components/SystemPrompt.tsx

import React from 'react';
import { Accordion, AccordionProps, AccordionSummary, AccordionDetails, Box, Typography, LinearProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
interface StyledAccordionProps extends AccordionProps {
    isProcessing: boolean;
  }
  const PromptBox = styled(Accordion, {
    shouldForwardProp: (prop) => prop !== 'isProcessing',
  })<StyledAccordionProps>(({ theme, isProcessing }) => ({
    background: isProcessing
      ? 'linear-gradient(45deg, #f5f5f5, #e0f2f1, #f5f5f5)'
      : 'white',
    backgroundSize: '200% 200%',
    animation: isProcessing ? 'gradient 3s ease infinite' : 'none',
    '@keyframes gradient': {
      '0%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
      '100%': {
        backgroundPosition: '0% 50%',
      },
    },
  }));

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
