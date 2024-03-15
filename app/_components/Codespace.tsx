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
import { useAssistant } from '_services/useAssistant';
import { Language } from '_helpers/client/useLocality';
import { boolean } from 'joi';

type assistantSugggestions = 
  'Explain the question' 
| 'Give me a hint' 
| 'How to start?' 
| 'How to continue?' 
| 'Am I on the right track?'
| "Estimate student's progress"
| "Where does the student shows difficulties?"

const studentAssistantSugggestions: assistantSugggestions[] = ['Explain the question', 'Give me a hint', 'How to start?', 'How to continue?', 'Am I on the right track?']
const teacherAssistantSugggestions: assistantSugggestions[] = ["Estimate student's progress", "Where does the student shows difficulties?"]

const computePrompt = (caption: assistantSugggestions, task: IModuleItem, code: string) => {

  switch (caption) {

    case 'Explain the question':
      return `Explain the question in simple terms without solving it: ${task.description}`

    case 'Give me a hint':
      return `Give me a hint for solving the question without solving it: ${task.description}`   

    case 'How to start?':
      return `Show me how to start the solution of the following question: ${task.description}`

    case 'How to continue?':
      return `Show me how to continue the solution of the following question: ${task.description} from this point: ${code}`    

    case 'Am I on the right track?':
      return `I have been given the following python programming question: ${task.description}. I have reached the following code: ${code}. Am I on the right track? how far is this from solution? estimate me but dont solve the question.` 

    case "Estimate student's progress":
      return `Given the following python programming question: ${task.description}. The student has replayed with the following code: ${code}. is the given code is a good solution? if not, explain what is missing and how much it is far from solution. Grade this solution between 0 to 100 and tell us if the student is in the right direction or that it is not the right way.` 
      
    case "Where does the student shows difficulties?":
      return `Given the following python programming question: ${task.description}. The student has replayed with the following code: ${code}. According to this, list the main topics the student might be straggeling with and suggest ways to help him. However, if you think that that student shows no difficulties in the topic of the question, then tell this and offer some ways to take the student to the next level.`       

    default:
      return null
  }
}

const Codespace = ({task, isTeacher}: {task?: IModuleItem, isTeacher: boolean}) => {

  const [code, setCode] = useState<string>("");
  
  const [customInput, setCustomInput] = useState("")
  const [currentCaption, setCurrentCaption] = useState<assistantSugggestions | null>(null)

  const [assistantPanelIsOpen, toggleAssistantPanel] = useState(false)
  const [isAssistantLoading, setIsAssistantLoading] = useState(false)

  const { compile, processing, outputDetails } = useCompile();
  const { selectedText, tooltipPosition, isTooltipVisible, closeTooltip } = useSelectionTooltip();

  const ref = useRef<ImperativePanelHandle>(null);

  const { append, message, messageStream, resetMessageStream } = useAssistant();

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
    if (messageStream) {
      toggleAssistantPanel(true);
      setIsAssistantLoading(false)
    }
  }, [messageStream])

  const handleExecute = () => {
    compile(71, code, customInput);
  };

  const handleSelectionQuery = async () => {
    closeTooltip()
    await append({
      id: 'some-id',
      content: `explain this: ${selectedText}`,
      role: 'user'
    })
  }

  const handleSuggestionClick = async (caption: assistantSugggestions) => {
    setCurrentCaption(caption)   
  }

  useEffect(() => {
    currentCaption && setIsAssistantLoading(true)
  }, [currentCaption])

  useEffect(() => {
    if (isAssistantLoading === true) {
      resetMessageStream()
      if (!currentCaption || !task) return 
      const prompt: string | null = computePrompt(currentCaption, task, code)
      prompt && append({
        id: 'some-id',
        content: prompt,
        role: 'user'
      })  
    }
  }, [isAssistantLoading])

  return (
      <div style={{height: 'calc(100vh - 82px'}} dir='ltr' lang='en'>
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
                  message={messageStream} 
                  isOpen={assistantPanelIsOpen} 
                  isLoading={isAssistantLoading}
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