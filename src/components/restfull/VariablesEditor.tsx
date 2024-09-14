import React from 'react';
import { Box, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslations } from 'next-intl';
interface Variable {
  key: string;
  value: string;
}

interface VariablesEditorProps {
  variables: Variable[];
  onVariableChange: (index: number, key: string, value: string) => void;
  onAddVariable: () => void;
  onRemoveVariable: (index: number) => void;
}

export const VariablesEditor: React.FC<VariablesEditorProps> = ({
  variables,
  onVariableChange,
  onAddVariable,
  onRemoveVariable,
}) => {
  const t = useTranslations();

  return (
    <Box mt={2} sx={{ flexGrow: 1, overflowY: 'auto', paddingTop: '5px' }}>
      {variables.map((variable, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          mb={2}
          sx={{ gap: 1 }}
        >
          <TextField
            label={t('restfull_placeholderVariableKey')}
            variant="outlined"
            value={variable.key}
            size="small"
            onChange={(e) =>
              onVariableChange(index, e.target.value, variable.value)
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
            label={t('restfull_placeholderVariableValue')}
            variant="outlined"
            value={variable.value}
            size="small"
            onChange={(e) =>
              onVariableChange(index, variable.key, e.target.value)
            }
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
            onClick={() => onRemoveVariable(index)}
            sx={{ padding: '4px' }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <Button
        variant="outlined"
        onClick={onAddVariable}
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
        {t('restfull_addVariable')}
      </Button>
    </Box>
  );
};
