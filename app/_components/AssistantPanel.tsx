import Assistant from "./Assistant"
import AutoScrollDiv from "./base/AutoScrollDiv"
import { useLocality } from "_helpers/client/useLocality"
import { useCaptions } from "_helpers/client/useCaptions"

const AssistantPanel = ({message, isOpen, onToggle, isLoading, children}: {message: string | null, isOpen?: boolean, onToggle?: any, isLoading?: boolean, children?: any}) => {

    const { language, direction } = useLocality()
    const { getCaption } = useCaptions()

    const topbar = (
        <div className="flex justify-between mb-6">
            <div className="flex gap-3">
                <div className="flex flex-col justify-center">
                    <img src="https://res.cloudinary.com/dfdk4g2pj/image/upload/v1710677607/image_31_dkwgzy.png" className={`w-[35px]`}/>
                </div>
                <div className="flex flex-col justify-center">
                    <span>
                        {getCaption('Python Assistant')}
                    </span>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <div onClick={onToggle} className="cursor-pointer">
                    <img src='/icons/down-arrow.svg' className={`w-[20px] ${isOpen ? 'rotate-0' : 'rotate-180'} transition-all`}/>
                </div>
            </div>
        </div>
    )

    return (
        <div className="h-full flex flex-col overflow-y-scroll" dir={direction} lang={language}>
            <div>
                {topbar}
            </div>
            <div>
                {children}
            </div>
            <AutoScrollDiv>
                <Assistant isLoading={isLoading} message={message}/>
            </AutoScrollDiv>
      </div>
    )
}

export default AssistantPanel