import Chip, { ChipItem } from "./base/Chip"
import ChipBar from "./base/ChipBar"

const StudentAssistant = ({suggestions, onAssistanceRequest}: {suggestions: string[], onAssistanceRequest: any}) => {

    const handleChipClick = (chip: ChipItem) => {
        onAssistanceRequest(chip.caption)
    }

    const suggestionsBar = <ChipBar chips={suggestions.map((suggestion, index) => ({id: `suggestion-${index}`, caption: suggestion}))} onChipClick={handleChipClick}/>
    
    return (
        <div>
            {suggestionsBar}
        </div>
    )
}

export default StudentAssistant