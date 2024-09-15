import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { grahpiqlErrorMessageActions } from '@/redux/slices/graphiqlErrorMessageSlice';

export default function GraphiqlErrorMessage(): JSX.Element {
  const dispatch = useDispatch();
  const graphiqlError = useSelector(
    (state: RootState) => state.grahpiqlErrorMessageReducer
  );

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(grahpiqlErrorMessageActions.setError(''));
  };

  return (
    <>
      <Snackbar
        open={graphiqlError.errorMessage.length > 0}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        data-testid="snackbar"
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          {graphiqlError.errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
