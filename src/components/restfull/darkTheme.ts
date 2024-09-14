import { EditorView } from '@codemirror/view';

export const darkTheme = EditorView.theme({
  '&': {},
  '.cm-content': {},
  '.cm-scroller': {
    backgroundColor: '#1E1E1E',
  },
  '.cm-gutters': {
    backgroundColor: '#252526',
    borderRight: '1px solid #333',
  },
  '.cm-activeLine': {
    backgroundColor: '#2D2D2D',
  },
  '.cm-gutterElement': {
    color: '#858585',
  },
  '.cm-gutterElement.cm-activeLineGutter': {
    backgroundColor: '#264F78',
    color: '#FFFFFF',
  },
  '.cm-cursor': {
    borderLeftColor: '#D4D4D4',
  },
  '.cm-selectionBackground, ::selection': {
    backgroundColor: '#264F78',
  },
  '.cm-tooltip': {
    backgroundColor: '#1E1E1E',
    color: '#D4D4D4',
    border: '1px solid #333',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
  },
});
