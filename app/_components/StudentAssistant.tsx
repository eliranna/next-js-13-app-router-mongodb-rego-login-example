import Chip, { ChipItem } from "./base/Chip"
import ChipBar from "./base/ChipBar"

type AssistantSuggestion = {
    id: string,
    title: string,
    prompt: string
}

const StudentAssistant = ({onAssistanceRequest}: {onAssistanceRequest: any}) => {

    const suggestions: AssistantSuggestion[] = [
        {
            id: '0',
            title: 'Explain the question',
            prompt: 'Explain the question in simple terms without solving it.'
        },
        {
            id: '1',
            title: 'Give me a hint',
            prompt: 'Give me a hint for solving the question without solving it.'
        },
        {
            id: '2',
            title: 'How to start?',
            prompt: 'Show me how to start the solution of the following question'
        },
    ]

    const handleChipClick = (chip: ChipItem) => {
        onAssistanceRequest(chip.info)
    }

    const suggestionsBar = <ChipBar chips={suggestions.map((suggestion, index) => ({id: `suggestion-${index}`, caption: suggestion.title, info: suggestion.prompt}))} onChipClick={handleChipClick}/>
    
    return (
        <div>
            {suggestionsBar}
        </div>
    )
}

export default StudentAssistant