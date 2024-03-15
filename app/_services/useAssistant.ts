import { Language, LanguageName, useLocality } from "_helpers/client/useLocality"
import { useChat, Message } from "ai/react"
import { useEffect, useState } from "react"

const composeTranslationPrompt = (content: string, languageName: LanguageName) => {
    return `Translate the following to ${languageName}: ${content}. `
}

export const useAssistant = () => {

    const { language, languageName } = useLocality()

    const [ translateOutput, setTranslateOutput ] = useState(false)

    const { messages: gptMessages, append: appendToGpt, isLoading: gptIsLoading } = useChat({api: '/api/gpt'})
    const { messages: cludeMessages, append: appendToClude, isLoading: cludeIsLoading } = useChat({api: '/api/clude'})

    const [GPTLastResponse, setGPTLastResponse] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        language && (language != 'en') && setTranslateOutput(true)
    }, [language])

    useEffect(() => {
        !translateOutput && gptMessages && gptMessages.length > 0 && setIsLoading(false)
    }, [gptMessages])    

    useEffect(() => {
        !gptIsLoading && gptMessages && gptMessages.length > 0 && setGPTLastResponse(gptMessages[gptMessages.length-1].content)
    }, [gptMessages, gptIsLoading])

    useEffect(() => {
        translateOutput && GPTLastResponse && appendToClude({
            content: composeTranslationPrompt(GPTLastResponse, languageName),
            role: 'user'
        })
    }, [GPTLastResponse])

    useEffect(() => {
        cludeMessages && cludeMessages.length > 0 && setIsLoading(false)
    }, [cludeMessages])

    return {
        messages: translateOutput ? cludeMessages: gptMessages,
        isLoading,
        append: async (message: Message) => {
            setIsLoading(true)
            await appendToGpt(message)
        },
    }
}

