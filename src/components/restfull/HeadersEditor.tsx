import React from 'react';
import { Box, TextField, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslations } from 'next-intl';
interface Header {
  key: string;
  value: string;
}

interface HeadersEditorProps {
  headers: Header[];
  onHeaderChange: (index: number, key: string, value: string) => void;
  onAddHeader: () => void;
  onRemoveHeader: (index: number) => void;
}

export const HeadersEditor: React.FC<HeadersEditorProps> = ({
  headers,
  onHeaderChange,
  onAddHeader,
  onRemoveHeader,
}) => {
  const t = useTranslations();

  return (
    <Box mt={2} sx={{ flexGrow: 1, overflowY: 'auto', paddingTop: '5px' }}>
      {headers.map((header, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          mb={2}
          sx={{ gap: 1 }}
        >
          <TextField
            label={t('restfull_placeholderHeaderKey')}
            variant="outlined"
            value={header.key}
            size="small"
            onChange={(e) =>
              onHeaderChange(index, e.target.value, header.value)
            }
            sx={{
              flexGrow: 1,
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
          <TextField
            label={t('restfull_placeholderHeaderValue')}
            variant="outlined"
            value={header.value}
            size="small"
            onChange={(e) => onHeaderChange(index, header.key, e.target.value)}
            sx={{
              flexGrow: 2,
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
          <IconButton
            color="primary"
            onClick={() => onRemoveHeader(index)}
            sx={{ padding: '4px' }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <Button
        variant="outlined"
        onClick={onAddHeader}
        sx={{
          fontSize: '12px',
          padding: '6px 12px',
          backgroundColor: '#007ACC',
          color: '#D4D4D4',
          '&:hover': {
            backgroundColor: '#005F9E',
          },
        }}
      >
        {t('restfull_addHeader')}
      </Button>
    </Box>
  );
};
