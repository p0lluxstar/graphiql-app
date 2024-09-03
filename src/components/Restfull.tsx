'use client';
import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';
import { useRouter } from 'next/navigation';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import jsonlint from 'jsonlint-mod';
import { EditorView } from '@codemirror/view';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import {
  Container,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

const darkTheme = EditorView.theme({
  '&': {},
  '.cm-content': {},
  '.cm-scroller': {
    backgroundColor: '#1E1E1E',
  },
  '.cm-gutters': {
    backgroundColor: '#252526',
    borderRight: '1px solid #333',
  },
  '.cm-activeLine': {
    backgroundColor: '#2D2D2D',
  },
  '.cm-gutterElement': {
    color: '#858585',
  },
  '.cm-gutterElement.cm-activeLineGutter': {
    backgroundColor: '#264F78',
    color: '#FFFFFF',
  },
  '.cm-cursor': {
    borderLeftColor: '#D4D4D4',
  },
  '.cm-selectionBackground, ::selection': {
    backgroundColor: '#264F78',
  },
  '.cm-tooltip': {
    backgroundColor: '#1E1E1E',
    color: '#D4D4D4',
    border: '1px solid #333',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
  },
});

export default function Restfull(): JSX.Element {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState({ status: '', body: '' });
  const [activeTab, setActiveTab] = useState('body');
  const [setJsonError] = useState<string | null>(null); /*jsonError*/

  useEffect((): void => {
    if (!loading && !user) {
      router.replace(`/`);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <Loader />;
  }

  const handleMethodChange = (e: SelectChangeEvent<string>): void => {
    setMethod(e.target.value as string);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(e.target.value);
  };

  const handleHeaderChange = (
    index: number,
    key: string,
    value: string
  ): void => {
    const newHeaders = [...headers];
    newHeaders[index] = { key, value };
    setHeaders(newHeaders);
  };

  const addHeader = (): void => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index: number): void => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
  };

  const handleBodyChange = (value: string): void => {
    setBody(value);
    setJsonError(null);
    //console.log(jsonError);
  };

  const jsonLinter = linter((view) => {
    try {
      jsonlint.parse(view.state.doc.toString());
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
        //console.log(jsonError);
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
        //console.log(jsonError);
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
    return [];
  });

  const handleSendRequest = async (): Promise<void> => {
    try {
      const requestOptions: RequestInit = {
        method,
        headers: headers.reduce(
          (acc, { key, value }) => {
            if (key && value) acc[key] = value;
            return acc;
          },
          {} as Record<string, string>
        ),
        body: method !== 'GET' ? body : undefined,
      };

      const res = await fetch(url, requestOptions);
      const responseBody = await res.text();
      let formattedResponse = responseBody;
      try {
        formattedResponse = JSON.stringify(JSON.parse(responseBody), null, 2);
      } catch (e) {
        // Ошибка парсинга
      }
      setResponse({
        status: `${res.status} ${res.statusText}`,
        body: formattedResponse,
      });
    } catch (error) {
      if (error instanceof Error) {
        setResponse({ status: 'Error', body: error.message });
      } else {
        setResponse({ status: 'Error', body: 'An unknown error occurred' });
      }
    }
  };

  const getEncodedUrl = (): string => {
    const encodedUrl = btoa(url);
    const encodedBody = method !== 'GET' ? `/${btoa(body)}` : '';
    const encodedHeaders = headers
      .filter((header) => header.key && header.value)
      .map(
        (header) =>
          `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`
      )
      .join('&');

    return `http://localhost:5137/${method}/${encodedUrl}${encodedBody ? encodedBody : ''}${encodedHeaders ? `?${encodedHeaders}` : ''}`;
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1E1E1E',
        color: '#D4D4D4',
        marginTop: '10px',
        padding: 0,
      }}
    >
      <PanelGroup direction="horizontal" style={{ height: '100%' }}>
        <Panel
          defaultSize={50}
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#1E1E1E',
            color: '#D4D4D4',
            padding: 0,
          }}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              padding: 0,
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              mb={2}
              sx={{ gap: 2, paddingTop: '5px' }}
            >
              <FormControl
                variant="outlined"
                size="small"
                sx={{ minWidth: 100 }}
              >
                <InputLabel id="method-select-label" sx={{ color: '#D4D4D4' }}>
                  Method
                </InputLabel>
                <Select
                  labelId="method-select-label"
                  value={method}
                  onChange={handleMethodChange}
                  label="Method"
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
              <TextField
                label="Endpoint URL"
                variant="outlined"
                fullWidth
                value={url}
                onChange={handleUrlChange}
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendRequest}
                size="small"
                sx={{
                  backgroundColor: '#007ACC',
                  '&:hover': {
                    backgroundColor: '#005F9E',
                  },
                }}
              >
                Send
              </Button>
            </Box>

            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              aria-label="basic tabs example"
              sx={{
                minHeight: '32px',
                '& .MuiTab-root': {
                  color: '#D4D4D4',
                },
                '& .Mui-selected': {
                  color: '#D4D4D4',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#007ACC',
                },
              }}
            >
              <Tab
                label="Request Body"
                value="body"
                sx={{ minHeight: '32px', fontSize: '12px' }}
              />
              <Tab
                label="Headers"
                value="headers"
                sx={{ minHeight: '32px', fontSize: '12px' }}
              />
            </Tabs>

            {activeTab === 'headers' && (
              <Box
                mt={2}
                sx={{ flexGrow: 1, overflowY: 'auto', paddingTop: '5px' }}
              >
                {headers.map((header, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    mb={2}
                    sx={{ gap: 1 }}
                  >
                    <TextField
                      label="Header Key"
                      variant="outlined"
                      value={header.key}
                      size="small"
                      onChange={(e) =>
                        handleHeaderChange(index, e.target.value, header.value)
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
                      label="Header Value"
                      variant="outlined"
                      value={header.value}
                      size="small"
                      onChange={(e) =>
                        handleHeaderChange(index, header.key, e.target.value)
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
                      onClick={() => removeHeader(index)}
                      sx={{ padding: '4px' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  onClick={addHeader}
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
                  Add Header
                </Button>
              </Box>
            )}

            {activeTab === 'body' && (
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
                  onClick={() => {
                    try {
                      const formatted = JSON.stringify(
                        JSON.parse(body),
                        null,
                        2
                      );
                      setBody(formatted);
                      setJsonError(null);
                    } catch (e) {
                      setJsonError(
                        'Invalid JSON. Please fix the errors and try again.'
                      );
                    }
                  }}
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
                    onChange={(value) => handleBodyChange(value)}
                    height="100%"
                  />
                </Box>
              </Box>
            )}
          </Container>
        </Panel>

        <PanelResizeHandle
          style={{
            width: '2px',
            backgroundColor: '#333',
          }}
        />
        <Panel
          defaultSize={50}
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#1E1E1E',
            color: '#D4D4D4',
            padding: 0,
          }}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              padding: 0,
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontSize: '32px', color: '#D4D4D4' }}
            >
              Status: {response.status}
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ fontSize: '25px', color: '#D4D4D4' }}
            >
              Generated URL:
            </Typography>
            <pre style={{ fontSize: '10px', color: '#D4D4D4' }}>
              {getEncodedUrl()}
            </pre>
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
        </Panel>
      </PanelGroup>
    </Container>
  );
}
