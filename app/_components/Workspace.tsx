'use client';

import { useEffect, useRef, useState } from 'react';
import { useChat } from 'ai/react';
import { ImperativePanelHandle, PanelGroup} from "react-resizable-panels";
import CodeEditor from './CodeEditor';
import { Task } from '_types/exercise';
import SelectionTooltip from './SelectionTooltip';
import useCompile from '_helpers/client/useCompile'
import useSelectionTooltip from '_helpers/client/useSelectionTooltip'
import Instructions from './Instructions';
import AssistantPanel from "./AssistantPanel";
import { Suggestion } from "_types/assistant";
import ExecutionPanel from "./ExecutionPanel";
import ResizeHandle from "./base/ResizeHandle";
import Panel from "./base/Panel";

const python = {
  id: 71,
  name: "Python (2.7.17)",
  label: "Python (2.7.17)",
  value: "python",
}

const Workspace = ({task}: {task?: Task}) => {

  const [code, setCode] = useState<string>("");
  
  const [customInput, setCustomInput] = useState("")
  const [language, _ ] = useState(python)

  const [assistantPanelIsOpen, toggleAssistantPanel] = useState(false)

  const { compile, processing, outputDetails } = useCompile();
  const { selectedText, tooltipPosition, isTooltipVisible, closeTooltip } = useSelectionTooltip();

  const ref = useRef<ImperativePanelHandle>(null);

  const { append, messages } = useChat();

  useEffect(() => {
    task && setCode(task.initialCode || '')
  }, [task]);

  useEffect(() => {
    const panel = ref.current;
    console.log(panel)
    if (panel) {
      panel.resize(assistantPanelIsOpen ? 60 : 10);
    }
  }, [assistantPanelIsOpen])

  useEffect(() => {
    messages && messages.length > 0 && toggleAssistantPanel(true)
  }, [messages])

  const handleExecute = () => {
    compile(language.id, code, customInput);
  };

  const handleSelectionQuery = async () => {
    closeTooltip()
    await append({
      content: `explain this: ${selectedText}`,
      role: 'user'
    })
  }

  const handleSuggestionClick = async (suggestion: Suggestion) => {
    await append({
      content: `${suggestion.prompt}: ${task?.description}`,
      role: 'user'
    })    
  }

  return (
    <>
      {isTooltipVisible && (
        <SelectionTooltip position={tooltipPosition} onSelectionQuery={handleSelectionQuery}/>
      )}
      <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={20}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={30} minSize={20} collapsible collapsedSize={5}>
              <div className='h-full flex flex-col overflow-y-scroll'>
                <Instructions task={task}/>
              </div>                
            </Panel>
            <ResizeHandle direction="vertical"/>
            <Panel defaultSize={30} minSize={0} ref={ref} style={{transition: 'all 0.3s ease'}}>
              <AssistantPanel 
                messages={messages} 
                isOpen={assistantPanelIsOpen} 
                onToggle={() => toggleAssistantPanel(!assistantPanelIsOpen)}
                onSuggestionClick={handleSuggestionClick}
                />
            </Panel>
          </PanelGroup>
        </Panel>
        <ResizeHandle direction="horizontal"/>
        <Panel minSize={30}>
          <CodeEditor lineNumbers code={code} onChange={(code: string) => setCode(code)}/>
        </Panel>
        <ResizeHandle direction="horizontal"/>
        <Panel defaultSize={30} minSize={20}>
          <ExecutionPanel 
            onExecute={handleExecute}
            onCustomInputChange={setCustomInput} 
            outputDetails={outputDetails} 
            customInput={customInput} 
            processing={processing} 
            disableExecute={!code}/>
        </Panel>
      </PanelGroup> 
    </>   
  )
}

export default Workspace