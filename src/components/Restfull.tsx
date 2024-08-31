'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';
import { useRouter } from 'next/navigation';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export default function Restfull(): JSX.Element {
  const t = useTranslations();
  const { user, loading } = useAuth();
  const router = useRouter();

  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState({ status: '', body: '' });

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

  const handleBodyChange = (value: string): void => {
    setBody(value);
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
      setResponse({
        status: `${res.status} ${res.statusText}`,
        body: responseBody,
      });
    } catch (error) {
      if (error instanceof Error) {
        setResponse({ status: 'Error', body: error.message });
      } else {
        setResponse({ status: 'Error', body: 'An unknown error occurred' });
      }
    }
  };

  // Функция для генерации закодированного URL
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
    <div style={{ height: '100vh' }}>
      <h1>{t('restfull')}</h1>
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
            <h2>Заголовки</h2>
            {headers.map((header, index) => (
              <div key={index}>
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
              </div>
            ))}
            <button onClick={addHeader}>Добавить заголовок</button>
            <div>
              <h2>Тело запроса</h2>
              <CodeMirror
                value={body}
                theme={oneDark}
                extensions={[javascript()]}
                onChange={(value) => handleBodyChange(value)}
              />
            </div>
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
          </div>
          <CodeMirror
            value={response.body}
            theme={oneDark}
            extensions={[javascript()]}
            editable={false}
          />
        </Panel>
      </PanelGroup>
    </div>
  );
}
