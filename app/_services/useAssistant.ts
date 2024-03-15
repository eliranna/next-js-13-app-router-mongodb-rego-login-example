import { Language, LanguageName, useLocality } from "_helpers/client/useLocality"
import { useChat, Message } from "ai/react"
import { useEffect, useState } from "react"

const composeTranslationPrompt = (content: string, languageName: LanguageName) => {
    return `Translate the following to ${languageName} and DO NOT write anything else except the translation result: ${content}. `
}

function preserveBacktickContent(originalString: string, translatedString: string) {
    const backtickContent = [];
    const backtickRegex = /```(.*?)```/gs;

    let match;
    while ((match = backtickRegex.exec(originalString)) !== null) {
        backtickContent.push(match[1]);
    }

    let replacedString = translatedString;
    backtickContent.forEach((content) => {
        replacedString = replacedString.replace(/```(.*?)```/, '```' + content + '```');
    });

    return replacedString;
}

export const useAssistant = () => {

    const [message, setMessage] = useState<string | null>(null)
    const [messageStream, setMessageStream] = useState<string | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { language, languageName } = useLocality()
    const [ translateOutput, setTranslateOutput ] = useState(false)

    const { messages: gptMessages, append: appendToGpt, isLoading: gptIsLoading, setMessages: setGPTMessages } = useChat({api: '/api/gpt'})
    const { messages: cludeMessages, append: appendToClude, isLoading: cludeIsLoading, setMessages: setCludeMessages } = useChat({api: '/api/clude'})

    const [GPTLastResponse, setGPTLastResponse] = useState<string>('')
    
    useEffect(() => {
        language && (language != 'en') && setTranslateOutput(true)
    }, [language])

    useEffect(() => {
        setMessageStream(getMessageStream())
    }, [gptMessages, cludeMessages])

    useEffect(() => {
        !gptIsLoading && gptMessages && gptMessages.length > 0 && setGPTLastResponse(gptMessages[gptMessages.length-1].content)
    }, [gptMessages, gptIsLoading])

    useEffect(() => {
        if (translateOutput) {
            GPTLastResponse && appendToClude({
                content: composeTranslationPrompt(GPTLastResponse, languageName),
                role: 'user'
            })
        } else {
            setMessage(GPTLastResponse)
            setIsLoading(false)
        }
    }, [GPTLastResponse])

    useEffect(() => {
        if (!cludeIsLoading && cludeMessages && cludeMessages.length > 0 ) {
            const original = GPTLastResponse
            const translated = cludeMessages[cludeMessages.length - 1].content
            const fixed: string = preserveBacktickContent(original, translated)
            setMessage(fixed)
            setIsLoading(false)
        }
    }, [cludeMessages, cludeIsLoading])

    const getMessageStream = () => {
        const messages = translateOutput ? cludeMessages : gptMessages
        const assistantMessages = messages.filter((message: Message) => message.role == 'assistant')
        return assistantMessages && assistantMessages[assistantMessages.length - 1] && assistantMessages[assistantMessages.length - 1].content
    }

    const resetMessageStream = () => {
        setMessageStream(null)
        setGPTMessages([])
        setCludeMessages([])
    }

    return {
        message,
        messageStream,
        resetMessageStream,
        append: async (message: Message) => {
            setMessage(null)
            setIsLoading(true)
            await appendToGpt(message)
        },
    }
}

