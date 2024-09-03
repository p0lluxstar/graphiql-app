import React from 'react';
import { TextField } from '@mui/material';

interface UrlInputProps {
  url: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UrlInput: React.FC<UrlInputProps> = ({ url, onChange }) => {
  return (
    <TextField
      label="Endpoint URL"
      variant="outlined"
      fullWidth
      value={url}
      onChange={onChange}
      size="small"
      sx={{
        backgroundColor: '#3E3E3E',
        color: '#D4D4D4',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#3E3E3E',
          },
        },
        '& .MuiInputBase-input': {
          color: '#D4D4D4',
        },
      }}
    />
  );
};
