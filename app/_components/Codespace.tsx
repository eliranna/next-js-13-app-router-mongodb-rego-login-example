'use client';

import { useEffect, useRef, useState } from 'react';
import { useChat } from 'ai/react';
import { ImperativePanelHandle, PanelGroup} from "react-resizable-panels";
import CodeEditor from './CodeEditor';
import SelectionTooltip from './SelectionTooltip';
import useCompile from '_helpers/client/useCompile'
import useSelectionTooltip from '_helpers/client/useSelectionTooltip'
import Instructions from './Instructions';
import AssistantPanel from "./AssistantPanel";
import ExecutionPanel from "./ExecutionPanel";
import ResizeHandle from "./base/ResizeHandle";
import Panel from "./base/Panel";
import { IModuleItem } from '_services';
import StudentAssistant from './StudentAssistant';

const python = {
  id: 71,
  name: "Python (2.7.17)",
  label: "Python (2.7.17)",
  value: "python",
}

const Codespace = ({task}: {task?: IModuleItem}) => {

  const [code, setCode] = useState<string>("");
  
  const [customInput, setCustomInput] = useState("")
  const [language, _ ] = useState(python)

  const [assistantPanelIsOpen, toggleAssistantPanel] = useState(false)

  const { compile, processing, outputDetails } = useCompile();
  const { selectedText, tooltipPosition, isTooltipVisible, closeTooltip } = useSelectionTooltip();

  const ref = useRef<ImperativePanelHandle>(null);

  const { append, messages, isLoading } = useChat({api: '/api/gpt'});

  useEffect(() => {
    task && setCode(task.initialCode || '')
  }, [task]);

  useEffect(() => {
    const panel = ref.current;
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

  const handleSuggestionClick = async (prompt: string) => {
    await append({
      content: `${prompt}: ${task?.description}`,
      role: 'user'
    })    
  }

  return (
      <div className='h-screen'>
        {isTooltipVisible && (
          <SelectionTooltip position={tooltipPosition} onSelectionQuery={handleSelectionQuery}/>
        )}
        <PanelGroup direction="horizontal">
          <Panel defaultSize={35} minSize={20}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={30} minSize={20} collapsible collapsedSize={5}>
                <div className='h-full flex flex-col overflow-y-scroll'>
                  <Instructions description={task?.description}/>
                </div>                
              </Panel>
              <ResizeHandle direction="vertical"/>
              <Panel defaultSize={30} minSize={0} ref={ref} style={{transition: 'all 0.3s ease'}}>
                <AssistantPanel 
                  messages={messages} 
                  isOpen={assistantPanelIsOpen} 
                  onToggle={() => toggleAssistantPanel(!assistantPanelIsOpen)}>
                    <StudentAssistant onAssistanceRequest={handleSuggestionClick}/>
                  </AssistantPanel>
              </Panel>
            </PanelGroup>
          </Panel>
          <ResizeHandle direction="horizontal"/>
          <Panel minSize={30}>
            <CodeEditor lineNumbers code={code} onChange={(code: string) => setCode(code)}/>
          </Panel>
          <ResizeHandle direction="horizontal"/>
            <Panel defaultSize={25} minSize={20}>
              <ExecutionPanel 
                onExecute={handleExecute}
                onCustomInputChange={setCustomInput} 
                outputDetails={outputDetails} 
                customInput={customInput} 
                processing={processing} 
                disableExecute={!code}/>
            </Panel>
        </PanelGroup> 
      </div>  
  )
}

export default Codespace