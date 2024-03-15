import { Message } from "ai"
import Assistant from "./Assistant"
import AutoScrollDiv from "./base/AutoScrollDiv"
import { useLocality } from "_helpers/client/useLocality"
import { useCaptions } from "_helpers/client/useCaptions"

const AssistantPanel = ({messages, isOpen, onToggle, isLoading, children}: {messages: Message[], isOpen?: boolean, onToggle?: any, isLoading?: boolean, children?: any}) => {

    const { language, direction } = useLocality()
    const { getCaption } = useCaptions()

    const topbar = (
        <div className="flex justify-between mb-6">
            <div className="flex gap-3">
                <div>
                    <img src="/icons/robot.svg" className="w-[25px]"/>
                </div>
                <div>
                    <span>
                        {getCaption('Python Assistant')}
                    </span>
                </div>
            </div>
            <div>
                <div onClick={onToggle} className="cursor-pointer">
                    <img src='/icons/down-arrow.svg' className={`w-[20px] ${isOpen ? 'rotate-0' : 'rotate-180'} transition-all`}/>
                </div>
            </div>
        </div>
    )

    return (
        <div className="h-full flex flex-col p-6 overflow-y-scroll" dir={direction} lang={language}>
            <div>
                {topbar}
            </div>
            <div>
                {children}
            </div>
            <AutoScrollDiv>
                <Assistant isLoading={isLoading} messages={messages.filter(message => message.role === 'assistant')}/>
            </AutoScrollDiv>
      </div>
    )
}

export default AssistantPanel