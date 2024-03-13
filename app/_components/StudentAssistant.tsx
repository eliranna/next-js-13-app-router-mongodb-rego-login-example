import Chip from "./base/Chip"
import ChipBar from "./base/ChipBar"

type AssistantSuggestion = {
    title: string,
    prompt: string
}

const StudentAssistant = ({onAssistanceRequest}: {onAssistanceRequest: any}) => {

    const suggestions: AssistantSuggestion[] = [
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

    const suggestionsBar = <ChipBar chips={suggestions.map((suggestion, index) => ({
        id: `suggestion-${index}`,
        caption: suggestion.title
    }))} onChipClick={(suggestion: AssistantSuggestion) => onAssistanceRequest(suggestion.prompt)}/>
    
    return (
        <div>
            {suggestionsBar}
        </div>
    )
}

export default StudentAssistant