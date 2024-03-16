'use client';

import TeacherAssistant from "./TeacherAssistant";
import { useChat } from 'ai/react';
import Instructions from "./Instructions";
import { useEffect, useState } from "react";
import Grid from "./base/Grid";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import RunButton from "./base/RunButton";
import { useAssistant } from "_services/useAssistant";
import { CaptionToken, useCaptions } from "_helpers/client/useCaptions";
import { useLocality } from "_helpers/client/useLocality";

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

const QBuilder = () => {

    const {getCaption} = useCaptions()

    const { append, messageStream, resetMessageStream, message } = useAssistant();
    const [isLoading, setIsLoading] = useState(false)

    const [query, setQuery] = useState<QuestionGenerationQuery>()

    const handleQuestionGeneration = (questionGenerationQuery: QuestionGenerationQuery) => {
      resetMessageStream(null)
      setQuery(questionGenerationQuery)
    }

    useEffect(() => {
      resetMessageStream(message)
    },[message])

    useEffect(() => {
      if (query) {
        setIsLoading(true)
        resetMessageStream(null)
      }
    }, [query])

    useEffect(() => {
      if ((isLoading === true) && query) {
        append({
          id: 'some-id',
          content: composePrompt(query.level, query.themes, query.topics),
          role: 'user'
        })   
      }
    }, [isLoading])  
    
    useEffect(() => {
      if (messageStream) {
        setIsLoading(false)
      }
    }, [messageStream])
    
    return (
      <Section header={{
        editMode: true,
        custom: <TeacherAssistant topics={pythonTopics} themes={questionThemes} levels={levels} processing={isLoading} onGenerateQuestion={handleQuestionGeneration}/>
      }}>
        <div className="flex flex-col gap-10 h-full">
          <div className="flex justify-end">
            <RunButton secondary icon="/icons/check-black.svg">
              {getCaption("Publish" as CaptionToken)}
            </RunButton>
          </div>
          <div className="border border-[#dddddd] h-full rounded-lg">
            <Instructions description={messageStream} processing={isLoading}/>
          </div>  
        </div>      
      </Section>


    )
}

export default QBuilder