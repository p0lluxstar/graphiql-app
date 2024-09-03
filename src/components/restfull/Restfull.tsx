'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Tabs,
  Tab,
  Snackbar,
  Button,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { MethodSelector } from './MethodSelector';
import { UrlInput } from './UrlInput';
import { HeadersEditor } from './HeadersEditor';
import { RequestBodyEditor } from './RequestBodyEditor';
import { ResponseViewer } from './ResponseViewer';
import useAuth from '@/hooks/useAuth';
import Loader from '../Loader';

export default function Restfull(): JSX.Element {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState({ status: '', body: '' });
  const [activeTab, setActiveTab] = useState('body');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect((): void => {
    if (!loading && !user) {
      router.replace(`/`);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <Loader />;
  }

  const handleMethodChange = (event: SelectChangeEvent<string>): void => {
    setMethod(event.target.value as string);
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
        setJsonError('Failed to parse response JSON');
        setOpenSnackbar(true);
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

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
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
              <MethodSelector method={method} onChange={handleMethodChange} />
              <UrlInput url={url} onChange={handleUrlChange} />
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
              <HeadersEditor
                headers={headers}
                onHeaderChange={handleHeaderChange}
                onAddHeader={addHeader}
                onRemoveHeader={removeHeader}
              />
            )}

            {activeTab === 'body' && (
              <RequestBodyEditor
                body={body}
                setBody={setBody}
                jsonError={jsonError}
                setJsonError={setJsonError}
                setOpenSnackbar={setOpenSnackbar}
              />
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
          <ResponseViewer response={response} />
        </Panel>
      </PanelGroup>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          {jsonError}
        </Alert>
      </Snackbar>
    </Container>
  );
}
