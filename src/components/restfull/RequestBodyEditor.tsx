import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import jsonlint from 'jsonlint-mod';
import { darkTheme } from './darkTheme';

interface RequestBodyEditorProps {
  body: string;
  setBody: (body: string) => void;
  jsonError: string | null;
  setJsonError: (error: string | null) => void;
  setOpenSnackbar: (open: boolean) => void;
}

export const RequestBodyEditor: React.FC<RequestBodyEditorProps> = ({
  body,
  setBody,
  jsonError,
  setJsonError,
  setOpenSnackbar,
}) => {
  const jsonLinter = linter((view) => {
    const text = view.state.doc.toString().trim();

    if (text === '') {
      setJsonError(null);
      return [];
    }

    try {
      jsonlint.parse(text);
    } catch (e: unknown) {
      if (e instanceof Error && 'location' in e && e.location) {
        const lintError = e as {
          location: {
            start: { offset: number };
            end: { offset: number };
          };
          message: string;
        };
        setJsonError(lintError.message);
        setOpenSnackbar(true);
        return [
          {
            from: lintError.location.start.offset,
            to: lintError.location.end.offset,
            message: lintError.message,
            severity: 'error',
          },
        ];
      } else {
        setJsonError((e as Error).message || 'Unknown error');
        setOpenSnackbar(true);
        return [
          {
            from: 0,
            to: view.state.doc.length,
            message: (e as Error).message || 'Unknown error',
            severity: 'error',
          },
        ];
      }
    }

    setJsonError(null);
    return [];
  });

  const handleFormatJson = (): void => {
    try {
      const formatted = JSON.stringify(JSON.parse(body), null, 2);
      setBody(formatted);
      setJsonError(null);
    } catch (e) {
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      mt={2}
      sx={{
        flexGrow: 1,
        overflow: 'hidden',
        paddingTop: '5px',
        position: 'relative',
      }}
    >
      <IconButton
        onClick={handleFormatJson}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 10,
          color: '#007ACC',
          '&:hover': {
            backgroundColor: 'transparent',
            color: '#005F9E',
          },
        }}
      >
        <CleaningServicesIcon />
      </IconButton>
      <Box
        sx={{
          height: '100%',
          overflow: 'auto',
        }}
      >
        <CodeMirror
          value={body}
          extensions={[javascript(), json(), jsonLinter, darkTheme]}
          onChange={(value) => setBody(value)}
          height="100%"
        />
      </Box>
      {jsonError && (
        <Typography
          variant="body2"
          color="error"
          data-testid="json-error"
          sx={{ mt: 1 }}
        >
          {jsonError}
        </Typography>
      )}
    </Box>
  );
};
