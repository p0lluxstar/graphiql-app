import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { grahpiqlErrorMessageActions } from '@/redux/slices/graphiqlErrorMessageSlice';

const useHandleBlur = (): { handleBlur: () => void } => {
  const dispatch = useDispatch();
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

    try {
      const encodedData = btoa(temp);
      const currentUrl = window.location.pathname;
      const segments = currentUrl.split('/');
      if (segments.length >= 4) {
        segments[4] = `${encodedData}`;
      }
      const newUrl = segments.join('/');
      router.replace(newUrl);
    } catch (error) {
      dispatch(
        grahpiqlErrorMessageActions.setError(
          'Invalid characters in query or variables or headers'
        )
      );
    }
  };

  return { handleBlur };
};

export default useHandleBlur;
