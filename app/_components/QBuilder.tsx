'use client';

import { PanelGroup } from "react-resizable-panels"
import ResizeHandle from "./base/ResizeHandle"
import Panel from "./base/Panel";
import TeacherAssistant from "./TeacherAssistant";
import { Message, useChat } from 'ai/react';
import Instructions from "./Instructions";
import { useEffect, useState } from "react";

const pythonTopics: Topic[] = [
  {
    id: "fundamentals",
    caption: "Fundamentals",
    description: "Introduces variables, data types, operators, strings, I/O operations, and basic file handling."
  },
  {
    id: "control-structures",
    caption: "Control Structures",
    description: "Explains conditional statements, loops, and comprehensions for controlling the flow of programs."
  },
  {
    id: "functions-and-modules",
    caption: "Functions and Modules",
    description: "Covers defining functions, scope of variables, importing modules, and exploring the standard library."
  },
  {
    id: "data-structures",
    caption: "Data Structures",
    description: "Introduces Python's built-in data structures: lists, tuples, sets, and dictionaries for data organization."
  },
  {
    id: "oop",
    caption: "Object-Oriented Programming",
    description: "Covers principles like classes, inheritance, polymorphism, encapsulation, and magic methods."
  },
  {
    id: "error-handling",
    caption: "Exception Handling",
    description: "Teaches handling errors and exceptions to write more robust and error-free code."
  },
  {
    id: "working-with-files",
    caption: "Working with Files",
    description: "Covers file operations, working with file paths, directory operations, and handling file exceptions."
  },
  {
    id: "iterators",
    caption: "Iterators",
    description: "Delves into iterators."
  },
  {
    id: "generators",
    caption: "Generators",
    description: "Generators, decorators, context managers, lambdas, and the collections module."
  },
  {
    id: "decorators",
    caption: "Decorators",
    description: "Delves into decorators."
  },
];

const questionThemes: QuestionTheme[] = [
  "Space",
  "Biology",
  "Finance",
  "Sports Analytics",
  "Environmental Science",
  "Artificial Intelligence",
  "Web Development",
  "Game Development",
  "Data Visualization",
  "Cybersecurity",
  "Healthcare",
  "Music",
  "Social Media Analysis",
  "Robotics",
  "Education",
  "Geography",
  "Automotive",
  "Fashion",
  "Culinary Arts",
  "Astronomy"
].map((theme, index) => ({
  id: theme.toLowerCase().replace(/ /g, "-"),
  caption: theme
}));

const levels: QuestionLevel[] = [
  {
    caption: 'Basic',
    icon: '/icons/student.png'
  },
  {
    caption: 'Advanced',
    icon: '/icons/rocket.png'
  },
  {
    caption: 'Expert',
    icon: '/icons/crown.png'
  }
]

export type Topic = {
  id: string,
  caption: string,
  description: string
}

export type QuestionTheme = {
  id: string,
  caption: string
}
export type QuestionLevel = {
    caption: string,
    icon: string
}

export type QuestionGenerationQuery = {
  topics: string[],
  level: string,
  themes: string[]
}

const composePrompt = (level: string, themes: string[], topics: string[]) => {
    return `Generate a ${level} level Python exercise for high-school students that checkes thier knowladge in the subjects of ${topics.join(', ')} in the themes of ${themes.join('and ')}. Provide examples for inputs and outputs. write input and output examples inside code blocks. DO NOT provide the solution for the question.`
}

/*
const composeTranslationPrompt = (content: string) => {
    return `Translate the following Python exercise to Hebrew. Avoid translating code or inpput/output samples, or anything that is inside a code block: ${content}`
}
*/

const QBuilder = () => {

    const { append, messages, isLoading } = useChat({api: '/api/gpt'});
    const [questionBody, setQuestionBody] = useState<string>("");

    useEffect(() => {
        messages && messages.length > 0 && messages[messages.length-1].role != 'user' && setQuestionBody(messages[messages.length-1].content)
    }, [messages])

    const handleQuestionGeneration = async (questionGenerationQuery: QuestionGenerationQuery) => {
        await append({
            content: composePrompt(questionGenerationQuery.level, questionGenerationQuery.themes, questionGenerationQuery.topics),
            role: 'user'
        })    
    } 

    /*
    const { append: appendToClude, messages: cludeMessages, isLoading: cludeIsLoading } = useChat({api: '/api/clude'});

    useEffect(() => {
        englishQuestion && appendToClude({
            content: composeTranslationPrompt(englishQuestion),
            role: 'user'
        })
    }, [englishQuestion])

    useEffect(() => {
        cludeMessages && cludeMessages.length > 0 && setQuestionBody(cludeMessages[cludeMessages.length-1].content)
    }, [cludeMessages])

    */   
    
    return (
        <div lang="eng" dir="ltr">
            <PanelGroup direction="horizontal">
                <Panel defaultSize={30} minSize={20}>
                    <TeacherAssistant topics={pythonTopics} themes={questionThemes} levels={levels} processing={isLoading} onGenerateQuestion={handleQuestionGeneration}/>
                </Panel>
                <ResizeHandle direction="horizontal"/>
                <Panel defaultSize={25} minSize={20}>
                    <Instructions description={questionBody} processing={isLoading}/>
                </Panel>
            </PanelGroup>
        </div>
    )
}

export default QBuilder