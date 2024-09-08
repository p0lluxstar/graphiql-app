import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const useHandleBlur = (): { handleBlur: () => void } => {
  const router = useRouter();

  const querySectionCode = useSelector(
    (state: RootState) => state.querySectionReducer.querySectionCode
  );

  const variablesSectionCode = useSelector(
    (state: RootState) => state.variablesSectionReducer.variablesSectionCode
  );

  const handleBlur = (): void => {
    const temp = JSON.stringify({
      query: querySectionCode,
      variables: variablesSectionCode,
    });

    const encodedData = btoa(temp);
    const currentUrl = window.location.pathname;
    const segments = currentUrl.split('/');
    if (segments.length >= 4) {
      segments[4] = `${encodedData}`;
    }
    const newUrl = segments.join('/');
    router.replace(newUrl);
  };

  return { handleBlur };
};

export default useHandleBlur;
