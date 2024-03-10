import { useEffect, useRef, FC } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { Extension } from '@codemirror/state';

interface CodeEditorProps {
  code: string;
  mode?: 'light' | 'dark';
  readonly?: boolean;
  lineNumbers?: boolean;
  onChange?: (code: string) => void;
}

const CodeEditor: FC<CodeEditorProps> = ({ code, mode = 'light', readonly = false, lineNumbers = false, onChange }) => {
  // Use useRef for the container to avoid the error and manage the DOM element reference
  const containerRef = useRef<HTMLDivElement | null>(null);

  useCodeMirror({
    container: containerRef.current,
    editable: !readonly,
    value: code,
    theme: mode === 'light' ? githubLight : githubDark,
    extensions: [python() as Extension],
    basicSetup: {
        lineNumbers
    },
    onChange: (value) => {
        onChange && onChange(value);
    },
    className: 'code-mirror'
  });

  // No need to use useEffect for setting the container

  return <div ref={containerRef} style={{ height: '100%' }} />; // Set a fixed height or manage via props
};

export default CodeEditor;
