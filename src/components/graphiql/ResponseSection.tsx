import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

export default function ResponseSection(): JSX.Element {
  const responseSectionCode = useSelector(
    (state: RootState) => state.responseSectionReducer.responseSectionCode
  );

  if (responseSectionCode.length === 0) {
    return <></>;
  }
  return (
    <>
      {/*  <pre>{JSON.stringify(responseSectionCode, null, 2)}</pre> */}

      <CodeMirror
        value={responseSectionCode}
        extensions={[json()]}
        theme={oneDark}
        height="100%"
        readOnly={true}
      />
    </>
  );
}
