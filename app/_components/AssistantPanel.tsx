import { Message } from "ai"
import Assistant from "./Assistant"
import AutoScrollDiv from "./base/AutoScrollDiv"
import Chip from "./base/Chip"

const AssistantPanel = ({messages, isOpen, onToggle, onSuggestionClick}: {messages: Message[], isOpen?: boolean, onToggle?: any, onSuggestionClick?: any}) => {

    const suggestions = [
        {
            title: 'Explain the question',
            prompt: 'Explain the question in simple terms without solving it.'
        },
        {
            title: 'Give me a hint',
            prompt: 'Give me a hint for solving the question without solving it.'
        },
        {
            title: 'How to start?',
            prompt: 'Show me how to start the solution of the following question'
        },
    ]

    const topbar = (
        <div className="flex justify-between mb-6">
            <div className="flex gap-3">
                <div>
                    <img src="/icons/robot.svg" className="w-[25px]"/>
                </div>
                <div>
                    <span>
                        Python Assistant
                    </span>
                </div>
            </div>
            <div>
                <div onClick={onToggle} className="cursor-pointer">
                    <img src='/icons/arrow-down.svg' className={`w-[20px] ${isOpen ? 'rotate-0' : 'rotate-180'} transition-all`}/>
                </div>
            </div>
        </div>
    )

    const suggestionsBar = (
        <div className="flex gap-x-2 gap-y-2 flex-wrap pb-6">
            {suggestions.map(suggestion => (
                <Chip key={suggestion.title} caption={suggestion.title} onClick={() => onSuggestionClick(suggestion)}/>
            ))}
        </div>
    )

    return (
        <div className="h-full flex flex-col p-6">
            <div>
                {topbar}
            </div>
            <div>
                {suggestionsBar}
            </div>
            <AutoScrollDiv>
                <Assistant messages={messages}/>
            </AutoScrollDiv>
      </div>
    )
}

export default AssistantPanel