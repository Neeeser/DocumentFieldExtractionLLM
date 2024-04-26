import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from '@mui/material';
interface ContractFieldsTableProps {
  fields: Record<string, string | null>;
  onFieldChange: (field: string, value: string) => void;
}

const ContractFieldsTable: React.FC<ContractFieldsTableProps> = ({ fields, onFieldChange }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(fields).map(([field, value]) => (
            <TableRow key={field}>
              <TableCell>{field.replace(/_/g, ' ')}</TableCell>
              <TableCell>
                <TextField
                  value={value || ''}
                  onChange={(e) => onFieldChange(field, e.target.value)}
                  fullWidth
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContractFieldsTable;