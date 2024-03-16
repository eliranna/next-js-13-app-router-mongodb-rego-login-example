import { useEffect } from "react"
import Chip, { ChipItem } from "./Chip"
import { CaptionToken, useCaptions } from "_helpers/client/useCaptions"

const SoftButton = ({caption, icon, selected, onClick}: {caption: string, icon?: string, selected?: boolean, onClick?: any}) => {

    const { getCaption } = useCaptions()

    return (
        <div className={`flex flex-col gap-2 w-[85px] h-[85px] border ${selected ? 'border-black' : 'border-[#dddddd]' } rounded-xl justify-center cursor-pointer`} onClick={onClick}>
            <div className="flex justify-center">
                <img src={icon} className="w-[25px]"/>
            </div>
            <div className="flex justify-center text-sm">
                {getCaption(caption as CaptionToken)}
            </div>
        </div>
    )
}

const LevelBar = ({chips, onChipClick}: {chips: ChipItem[], onChipClick?: any}) => {
    return (
        <div className="flex gap-4 flex-wrap pb-6">
            {chips.map((chip: ChipItem, index: number) => (
                <SoftButton icon={chip.icon} key={chip.caption} selected={chip.selected} caption={chip.caption} onClick={() => onChipClick(chip)}/>
            ))}
        </div>       
    )    
}

export default LevelBar