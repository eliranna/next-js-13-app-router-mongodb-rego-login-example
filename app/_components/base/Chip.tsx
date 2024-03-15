import { CaptionToken, useCaptions } from "_helpers/client/useCaptions"

export type ChipItem = {
    id: string,
    caption: string, 
    icon?: string, 
    selected?: boolean, 
    onClick?: any,
    className?: string,
    info?: string
}

const Chip = ({caption, icon, selected, className, onClick}: ChipItem) => {

    const { getCaption } = useCaptions()

    return (
        <div className={`flex gap-1 rounded-full border ${selected ? 'border-black' : 'border-[#dddddd]'} px-[14px] py-[4px] cursor-pointer`} onClick={onClick}>
            {icon && (
                <div className={`flex flex-col justify-center`}>
                    <img className='w-[18px]' src={icon}/>
                </div>
            )}
            <div className="flex flex-col justify-center">
                <span className={`text-sm text-black font-normal ${className}`}> { getCaption(caption as CaptionToken) } </span>
            </div>
        </div>
    )
}

export default Chip