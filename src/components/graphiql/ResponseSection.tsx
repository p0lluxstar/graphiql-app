import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function ResponseSection(): JSX.Element {
  const responseSectionCode = useSelector(
    (state: RootState) => state.responseSectionReducer.responseSectionCode
  );
  return (
    <>
      <pre>{JSON.stringify(responseSectionCode, null, 2)}</pre>
    </>
  );
}
