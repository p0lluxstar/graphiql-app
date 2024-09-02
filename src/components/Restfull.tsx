'use client';
import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';
import { useRouter } from 'next/navigation';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import jsonlint from 'jsonlint-mod';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import styles from '../styles/components/restfull.module.css';

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

  useEffect((): void => {
    if (!loading && !user) {
      router.replace(`/`);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <Loader />;
  }

  const handleMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setMethod(e.target.value);
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
  };

  const formatJson = (): void => {
    try {
      const formatted = JSON.stringify(JSON.parse(body), null, 2);
      setBody(formatted);
      setJsonError(null);
    } catch (e) {
      setJsonError('Invalid JSON. Please fix the errors and try again.');
    }
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
        return [
          {
            from: lintError.location.start.offset,
            to: lintError.location.end.offset,
            message: lintError.message,
            severity: 'error',
          },
        ];
      } else {
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
        // Ошибка парсинга JSON
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
    <div className={styles.container}>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={50}>
          <div>
            <div>
              <select value={method} onChange={handleMethodChange}>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder="Endpoint URL"
              />
              <button onClick={handleSendRequest}>Отправить запрос</button>
            </div>
            <div className={styles.header}>
              <button
                onClick={() => setActiveTab('body')}
                className={`${styles.headerButtons} ${activeTab === 'body' ? 'active' : ''}`}
              >
                Тело запроса
              </button>
              <button
                onClick={() => setActiveTab('headers')}
                className={`${styles.headerButtons} ${activeTab === 'headers' ? 'active' : ''}`}
              >
                Заголовки
              </button>
            </div>

            {activeTab === 'headers' && (
              <div>
                {headers.map((header, index) => (
                  <div key={index} className={styles.inputContainer}>
                    <input
                      type="text"
                      placeholder="Ключ заголовка"
                      value={header.key}
                      onChange={(e) =>
                        handleHeaderChange(index, e.target.value, header.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Значение заголовка"
                      value={header.value}
                      onChange={(e) =>
                        handleHeaderChange(index, header.key, e.target.value)
                      }
                    />
                    <button onClick={() => removeHeader(index)}>Удалить</button>
                  </div>
                ))}
                <button onClick={addHeader}>Добавить заголовок</button>
              </div>
            )}

            {activeTab === 'body' && (
              <div className={styles.codemirrorContainer}>
                <div className={styles.formatButtonContainer}>
                  <button onClick={formatJson}>Форматировать JSON</button>
                  {jsonError && <div className={styles.error}>{jsonError}</div>}
                </div>
                <CodeMirror
                  value={body}
                  theme={oneDark}
                  extensions={[javascript(), json(), jsonLinter]}
                  onChange={(value) => handleBodyChange(value)}
                />
              </div>
            )}
          </div>
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={50}>
          <div>
            <h2>Ответ</h2>
            <div>Статус: {response.status}</div>
            <div>
              <h2>Сгенерированный URL:</h2>
              <pre>{getEncodedUrl()}</pre>
            </div>
            <div className={styles.codemirrorContainerFull}>
              <CodeMirror
                value={response.body}
                theme={oneDark}
                extensions={[javascript()]}
                editable={false}
              />
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
