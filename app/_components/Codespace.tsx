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

type assistantSugggestions = 
  'Explain the question' 
| 'Give me a hint' 
| 'How to start?' 
| `Estimate student's progress`
| `Where does the student shows difficulties?`

const studentAssistantSugggestions: assistantSugggestions[] = ['Explain the question', 'Give me a hint', 'How to start?']
const teacherAssistantSugggestions: assistantSugggestions[] = ["Estimate student's progress", "Where does the student shows difficulties?"]

const computePrompt = (caption: assistantSugggestions, task: IModuleItem, code: string) => {

  switch (caption) {

    case 'Explain the question':
      return `Explain the question in simple terms without solving it: ${task.description}`

    case 'Give me a hint':
      return `Give me a hint for solving the question without solving it: ${task.description}`   

    case 'How to start?':
      return `Show me how to start the solution of the following question: ${task.description}`  
      
    case `Estimate student's progress`:
      return `Given the following python programming question: ${task.description}. The student has replayed with the following code: ${code}. is the given code is a good solution? if not, explain what is missing and how much it is far from solution. Grade this solution between 0 to 100 and tell us if the student is in the right direction or that it is not the right way.` 
      
    case `Where does the student shows difficulties?`:
      return `Given the following python programming question: ${task.description}. The student has replayed with the following code: ${code}. According to this, list the main topics the student might be straggeling with and suggest ways to help him. However, if you think that that student shows no difficulties in the topic of the question, then tell this and offer some ways to take the student to the next level.`       

    default:
      return null
  }
}

const Codespace = ({task, isTeacher}: {task?: IModuleItem, isTeacher: boolean}) => {

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

  const handleSuggestionClick = async (caption: assistantSugggestions) => {
    if (!task) {return}
    const prompt: string | null = computePrompt(caption, task, code)
    console.log(prompt)
    prompt && await append({
      content: prompt,
      role: 'user'
    })    
  }

  return (
      <div style={{height: 'calc(100vh - 82px'}}>
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
                    <StudentAssistant 
                      suggestions={isTeacher ? teacherAssistantSugggestions : studentAssistantSugggestions} 
                      onAssistanceRequest={handleSuggestionClick}/>
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