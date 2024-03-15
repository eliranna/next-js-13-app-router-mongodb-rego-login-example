import { Message } from "ai"
import { useChat } from "ai/react"
import { useEffect, useState } from "react"

const composeTranslationPrompt = (content: string, language: string) => {
    return `Translate the following to ${language}: ${content}. `
}

export const useAssistant = (language?: string) => {

    const { messages: gptMessages, append: appendToGpt, isLoading: gptIsLoading } = useChat({api: '/api/gpt'})
    const { messages: cludeMessages, append: appendToClude, isLoading: CludeIsLoading } = useChat({api: '/api/clude'})

    const [GPTLastResponse, setGPTLastResponse] = useState<string>()

    useEffect(() => {
        !gptIsLoading && gptMessages && gptMessages.length > 0 && setGPTLastResponse(gptMessages[gptMessages.length-1].content)
    }, [gptMessages, gptIsLoading])

    language && useEffect(() => {
        GPTLastResponse && appendToClude({
            content: composeTranslationPrompt(GPTLastResponse, language),
            role: 'user'
        })
    }, [GPTLastResponse])

    return {
        messages: language ? cludeMessages: gptMessages,
        isLoading: language ? (gptIsLoading || CludeIsLoading) : gptIsLoading,
        append: async (message: Message) => {
            await appendToGpt(message)
        },
    }
}

