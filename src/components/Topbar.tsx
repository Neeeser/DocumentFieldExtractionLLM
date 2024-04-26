// components/Topbar.tsx

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Topbar: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'rgb(123, 40, 65)', boxShadow: 'none' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#ffffff' }}>
                    LLM Demos
                </Typography>
                <Button color="inherit" component={Link} href="/" sx={{ color: '#ffffff' }}>
                    Field Extraction
                </Button>
                <Button color="inherit" component={Link} href="/ContractAssist" sx={{ color: '#ffffff' }}>
                    Contract Assist
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
