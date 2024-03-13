import { useEffect } from "react"
import Chip, { ChipItem } from "./Chip"

const ChipBar = ({chips, onChipClick}: {chips: ChipItem[], onChipClick?: any}) => {

    useEffect(() => {
        console.log(chips)
    }, [chips])

    return (
        <div className="flex gap-x-2 gap-y-2 flex-wrap pb-6">
            {chips.map((chip: ChipItem, index: number) => (
                <Chip id={`chip-${index}`} key={chip.caption} selected={chip.selected} caption={chip.caption} onClick={() => onChipClick(chip)}/>
            ))}
        </div>       
    )    
}

export default ChipBar