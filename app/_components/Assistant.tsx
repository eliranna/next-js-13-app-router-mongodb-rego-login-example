import { Message } from "ai"
import { useEffect, useState } from "react";
import Markdown from "_components/base/Markdown"

const Assistant = ({messages}: {messages: Message[]}) => {

    const [currentMessage, setCurrentMessage] = useState<string | null>()
    
    useEffect(() => {
        messages && messages.length > 0 && setCurrentMessage(messages[messages.length-1].content)
    }, messages)

    return (
        <div>
            <Markdown>
                {currentMessage}
            </Markdown>
        </div>
    )
}

export default Assistant