import styles from '../../styles/components/graphiql/querySection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { querySectionActions } from '@/redux/slices/graphiqlQuerySectionSlice';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { RootState } from '@/redux/store';
import useHandleBlur from '@/hooks/useHandleBlur';
import { useVisibility } from '@/context/VisibilityContext';

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

  return (
    <div className={styles.querySectionWrapper}>
      <h2 className={styles.title}>Query</h2>
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
