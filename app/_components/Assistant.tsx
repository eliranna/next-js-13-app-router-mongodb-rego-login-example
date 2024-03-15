import { Message } from "ai"
import { useEffect, useState } from "react";
import Markdown from "_components/base/Markdown"
import Spinner from "./base/Spinner";

const Assistant = ({isLoading, messages}: {isLoading?: boolean, messages: Message[]}) => {

    const [currentMessage, setCurrentMessage] = useState<string | null>()
    
    useEffect(() => {
        messages && messages.length > 0 && setCurrentMessage(messages[messages.length-1].content)
    }, [messages])

    return (
        <div>
            {isLoading ? <Spinner/> : (
                <Markdown>
                    {currentMessage}
                </Markdown>
            )}
        </div>
    )
}

export default Assistant