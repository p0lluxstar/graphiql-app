import React from 'react';
import { useTranslations } from 'next-intl';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface MethodSelectorProps {
  method: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

export const MethodSelector: React.FC<MethodSelectorProps> = ({
  method,
  onChange,
}) => {
  const t = useTranslations();

  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 100 }}>
      <InputLabel id="method-select-label" sx={{ color: '#D4D4D4' }}>
        {t('restfull_method')}
      </InputLabel>
      <Select
        labelId="method-select-label"
        value={method}
        onChange={onChange}
        label={t('restfull_method')}
        sx={{
          color: '#D4D4D4',
          backgroundColor: '#3E3E3E',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3E3E3E',
          },
        }}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: '#1E1E1E',
              color: '#D4D4D4',
            },
          },
        }}
      >
        <MenuItem value="GET">GET</MenuItem>
        <MenuItem value="POST">POST</MenuItem>
        <MenuItem value="PUT">PUT</MenuItem>
        <MenuItem value="DELETE">DELETE</MenuItem>
      </Select>
    </FormControl>
  );
};
