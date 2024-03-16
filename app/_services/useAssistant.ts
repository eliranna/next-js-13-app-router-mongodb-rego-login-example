import { Language, LanguageName, useLocality } from "_helpers/client/useLocality"
import { useChat, Message } from "ai/react"
import { useEffect, useState } from "react"

const composeTranslationPrompt = (content: string, languageName: LanguageName) => {
    return `Translate the following to ${languageName}: ${content}. `
}

function replaceCodeBlocks(s: string, replacements: string[]) {
  // Regular expression to match code blocks
  const regex = /```(.*?)```/gs;
  let match;
  let i = 0; // To keep track of the replacement index
  
  // Replace each match with the corresponding element from the replacements array
  const replacedString = s.replace(regex, (match) => {
    if (i >= replacements.length) {
      // If there are more matches than replacements, return the match itself
      return match;
    }
    // Replace the match with the corresponding replacement and increment the index
    return `\`\`\`${replacements[i++]}\`\`\``;
  });

  return replacedString;
}

function preserveBacktickContent(originalString: string | null, translatedString: string) {

    if (!originalString) return null;
    
    const backtickContent = [];
    const backtickRegex = /```(.*?)```/gs;

    let match;
    while ((match = backtickRegex.exec(originalString)) !== null) {
        backtickContent.push(match[1]);
    }

    console.log(backtickContent)
    console.log(translatedString)

    const replacedString = replaceCodeBlocks(translatedString, backtickContent)

    console.log(replacedString)

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

    const [GPTLastResponse, setGPTLastResponse] = useState<string | null>('')
    
    useEffect(() => {
        if (language === 'en') {
            setTranslateOutput(false)
        } else {
            setTranslateOutput(true)
        }
    }, [language])

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
            console.log(original)
            console.log(translated)
            const fixed: string | null = preserveBacktickContent(original, translated)
            console.log(fixed)
            setMessage(fixed)
            setIsLoading(false)
        }
    }, [cludeMessages, cludeIsLoading])

    const getMessageStream = () => {
        const messages = translateOutput ? cludeMessages : gptMessages
        const assistantMessages = messages.filter((message: Message) => message.role == 'assistant')
        return assistantMessages && assistantMessages[assistantMessages.length - 1] && assistantMessages[assistantMessages.length - 1].content
    }

    const resetMessageStream = (content: string | null) => {
        setMessageStream(content)
        setMessage(content)
        setGPTLastResponse(content)
        content ? setGPTMessages([{
            id: 'some-id',
            content,
            role: 'assistant'
        }]) : setGPTMessages([])
        content ? setCludeMessages([{
            id: 'some-id',
            content,
            role: 'assistant'
        }]) : setGPTMessages([])
    }

    return {
        message,
        messageStream: getMessageStream(),
        resetMessageStream,
        append: async (message: Message) => {
            setMessage(null)
            setMessageStream(null)
            setGPTLastResponse(null)
            setGPTMessages([])
            setCludeMessages([])
            setIsLoading(true)
            await appendToGpt(message)
        },
    }
}

