'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
import { VariablesEditor } from './VariablesEditor';
import { base64Decode, base64Encode } from '../../utils/base64';
import useAuth from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';

interface Variable {
  key: string;
  value: string;
}

interface Header {
  key: string;
  value: string;
}

export default function Restfull(): JSX.Element {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations();

  const methodParam = pathname.split('/')[3];
  const encodedUrl = pathname.split('/')[4];
  const queryBody = searchParams.get('body');
  const queryHeaders = searchParams.get('headers');
  const queryVariables = searchParams.get('variables');

  const [method, setMethod] = useState<string>(methodParam || 'GET');
  const [url, setUrl] = useState<string>(
    encodedUrl ? base64Decode(encodedUrl) : ''
  );
  const [body, setBody] = useState<string>(
    queryBody ? base64Decode(queryBody) : ''
  );
  const [headers, setHeaders] = useState<Header[]>(
    queryHeaders
      ? JSON.parse(base64Decode(queryHeaders))
      : [{ key: '', value: '' }]
  );
  const [variables, setVariables] = useState<Variable[]>(
    queryVariables
      ? JSON.parse(base64Decode(queryVariables))
      : [{ key: '', value: '' }]
  );
  const [response, setResponse] = useState<{ status: string; body: string }>({
    status: '',
    body: '',
  });
  const [activeTab, setActiveTab] = useState<string>('body');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  useEffect((): void => {
    if (!loading && !user) {
      router.replace(`/`);
    } else {
      if (url) {
        handleSendRequest();
      }
    }
  }, [user, loading, router]);

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

  const handleVariableChange = (
    index: number,
    key: string,
    value: string
  ): void => {
    const newVariables = [...variables];
    newVariables[index] = { key, value };
    setVariables(newVariables);
  };

  const addHeader = (): void => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const addVariable = (): void => {
    setVariables([...variables, { key: '', value: '' }]);
  };

  const removeHeader = (index: number): void => {
    const newHeaders = headers.filter((_, i: number) => i !== index);
    setHeaders(newHeaders);
  };

  const removeVariable = (index: number): void => {
    const newVariables = variables.filter((_, i: number) => i !== index);
    setVariables(newVariables);
  };

  const createUrlWithParams = (): string => {
    const encodedUrl = base64Encode(url);
    const encodedBody = method !== 'GET' && body ? base64Encode(body) : '';
    const encodedHeaders = base64Encode(JSON.stringify(headers));
    const encodedVariables = base64Encode(JSON.stringify(variables));

    const locale = pathname.split('/')[1];

    return `/${locale}/restfull/${method}/${encodedUrl}?body=${encodedBody}&headers=${encodedHeaders}&variables=${encodedVariables}`;
  };

  const handleSendRequest = async (): Promise<void> => {
    if (!url) {
      setJsonError(t('urlRequiredError'));
      setOpenSnackbar(true);
      return;
    }

    try {
      const requestOptions: RequestInit = {
        method,
        headers: headers.reduce<Record<string, string>>(
          (acc: Record<string, string>, { key, value }: Header) => {
            if (key && value) acc[key] = value;
            return acc;
          },
          {}
        ),
        body: method !== 'GET' ? body : undefined,
      };

      const res = await fetch(url, requestOptions);
      const responseBody = await res.text();
      let formattedResponse = responseBody;
      try {
        formattedResponse = JSON.stringify(JSON.parse(responseBody), null, 2);
      } catch (e) {
        setJsonError(t('jsonParseError'));
        setOpenSnackbar(true);
      }
      setResponse({
        status: `${res.status} ${res.statusText}`,
        body: formattedResponse,
      });

      const newUrl = createUrlWithParams();
      window.history.replaceState(null, '', newUrl);
    } catch (error) {
      if (error instanceof Error) {
        setResponse({ status: 'Error', body: error.message });
      } else {
        setResponse({ status: 'Error', body: t('unknownError') });
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
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1E1E1E',
        color: '#D4D4D4',
        marginTop: '10px',
        marginBottom: '10px',
      }}
    >
      <PanelGroup direction="horizontal" style={{ height: '100%' }}>
        <Panel
          defaultSize={50}
          minSize={35}
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
                {t('restfull_send')}
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
                label={t('restfull_requestBody')}
                value="body"
                sx={{ minHeight: '32px', fontSize: '12px' }}
              />
              <Tab
                label={t('restfull_headers')}
                value="headers"
                sx={{ minHeight: '32px', fontSize: '12px' }}
              />
              <Tab
                label={t('restfull_variables')}
                value="variables"
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

            {activeTab === 'variables' && (
              <VariablesEditor
                variables={variables}
                onVariableChange={handleVariableChange}
                onAddVariable={addVariable}
                onRemoveVariable={removeVariable}
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
          minSize={35}
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
