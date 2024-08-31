'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';
import { useRouter } from 'next/navigation';

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

  const handleBodyChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setBody(e.target.value);
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
    <>
      <h1>{t('restfull')}</h1>
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
        </div>
        <div>
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
        </div>
        <div>
          <h2>Тело запроса</h2>
          <textarea
            value={body}
            onChange={handleBodyChange}
            placeholder="Тело запроса (JSON/Текст)"
          />
        </div>
        <button onClick={handleSendRequest}>Отправить запрос</button>
        <div>
          <h2>Ответ</h2>
          <div>Статус: {response.status}</div>
          <pre>{response.body}</pre>
        </div>
        <div>
          <h2>Сгенерированный URL:</h2>
          <pre>{getEncodedUrl()}</pre>
        </div>
      </div>
    </>
  );
}
