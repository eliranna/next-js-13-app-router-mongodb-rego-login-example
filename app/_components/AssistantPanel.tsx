import { Message } from "ai"
import Assistant from "./Assistant"
import AutoScrollDiv from "./base/AutoScrollDiv"
import Chip from "./base/Chip"

const AssistantPanel = ({messages, isOpen, onToggle, children}: {messages: Message[], isOpen?: boolean, onToggle?: any, children?: any}) => {

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
                    <img src='/icons/down-arrow.svg' className={`w-[20px] ${isOpen ? 'rotate-0' : 'rotate-180'} transition-all`}/>
                </div>
            </div>
        </div>
    )

    return (
        <div className="h-full flex flex-col p-6 overflow-y-scroll">
            <div>
                {topbar}
            </div>
            <div>
                {children}
            </div>
            <AutoScrollDiv>
                <Assistant messages={messages}/>
            </AutoScrollDiv>
      </div>
    )
}

export default AssistantPanel