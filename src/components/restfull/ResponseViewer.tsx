import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { darkTheme } from './darkTheme';

interface ResponseViewerProps {
  response: { status: string; body: string };
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({ response }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 0,
      }}
    >
      <Typography variant="body1" sx={{ fontSize: '32px', color: '#D4D4D4' }}>
        Status: {response.status}
      </Typography>
      <Box
        mt={2}
        sx={{
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        <CodeMirror
          value={response.body}
          extensions={[javascript(), darkTheme]}
          editable={false}
          height="100%"
        />
      </Box>
    </Container>
  );
};
