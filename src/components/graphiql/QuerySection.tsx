import styles from '../../styles/components/graphiql/querySection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { querySectionActions } from '@/redux/slices/graphiqlQuerySectionSlice';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { RootState } from '@/redux/store';
import useHandleBlur from '@/hooks/useHandleBlur';
import { useVisibility } from '@/context/VisibilityContext';
import { format } from 'graphql-formatter';

export default function QuerySection(): JSX.Element {
  const dispatch = useDispatch();
  const { handleBlur } = useHandleBlur();

  const { isShowUrlApiApplyBtn } = useVisibility();

  const querySectionCode = useSelector(
    (state: RootState) => state.querySectionReducer.querySectionCode
  );

  const handleChange = (value: string): void => {
    dispatch(querySectionActions.setQuerySectionCode(value));
  };

  const formatCode = (): void => {
    try {
      const formattedCode = format(querySectionCode); // Форматируйте код
      dispatch(querySectionActions.setQuerySectionCode(formattedCode)); // Обновите код в Redux
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Ошибка форматирования:', error);
    }
  };

  return (
    <div className={styles.querySectionWrapper}>
      <div className={styles.title}>
        <h2>Query</h2>
        <button onClick={formatCode}>Button</button>
      </div>
      <CodeMirror
        extensions={[javascript()]}
        onBlur={handleBlur}
        theme={oneDark}
        height="100%"
        onChange={(value) => handleChange(value)}
        className={styles.querySectionCode}
        value={querySectionCode}
        readOnly={!isShowUrlApiApplyBtn}
      />
    </div>
  );
}
