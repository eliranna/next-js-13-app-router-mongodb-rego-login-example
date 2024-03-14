import { IModule, IModuleItem, IModuleItemType } from "_services/useCourseService"
import Accordion from "./base/Accordion"
import { ReactNode, useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { BiAnalyse } from "react-icons/bi";
import Button from "./base/Button";

const MODULES: IModule[] = [
    {
      _id: "65ef6b8a2a17b1fca9535096",
      title: "Introduction to Python",
      items: [
        {
          _id: "65ef6b382a17b1fca9535094",
          type: "codingChallenge",
          title: "Hello, Python!",
          description: "Write a program that prints 'Hello, World!' to the console."
        },
        {
          _id: "exercise2",
          type: "codingChallenge",
          title: "Poetic Python",
          description: "Create a script that outputs a three-line poem or haiku."
        },
        {
          _id: "exercise3",
          type: "codingChallenge",
          title: "The Name Age Calculator",
          description: "Write a program that takes a user's name and age, then calculates the year they were born."
        },
        {
          _id: "exercise4",
          type: "codingChallenge",
          title: "Grocery List Maker",
          description: "Develop a script that helps users make a list of items to buy from the grocery store."
        },
      ]
    },
    // Follow the same structure for the remaining modules...
    {
      _id: "module2",
      title: "Control Structures",
      items: [
        {
          _id: "exercise5",
          type: "codingChallenge",
          title: "Build a Space Robot",
          description: "Create a simple text-based adventure game that gives users choices."
        },
        {
          _id: "exercise6",
          type: "codingChallenge",
          title: "Rock, Paper, Scissors, Python!",
          description: "Write a Rock, Paper, Scissors game that the user plays against the computer."
        },
        {
          _id: "exercise7",
          type: "codingChallenge",
          title: "The Grade Sorter",
          description: "Develop a program that sorts a list of grades from highest to lowest."
        },
        {
          _id: "exercise8",
          type: "codingChallenge",
          title: "Journey Through the Loop",
          description: "Create a script that uses loops to print all the numbers from 1 to 100."
        },
      ]
    },
    {
        _id: "module3",
        title: "Functions and Modules",
        items: [
          {
            _id: "exercise9",
            type: "codingChallenge",
            title: "Mad Libs Generator",
            description: "Build a Mad Libs game where users input words to generate a funny story."
          },
          {
            _id: "exercise10",
            type: "codingChallenge",
            title: "The Temperature Converter",
            description: "Write a function that converts temperatures between Fahrenheit and Celsius."
          },
          {
            _id: "exercise11",
            type: "codingChallenge",
            title: "Fitness Fun",
            description: "Develop a module that calculates various fitness metrics, like BMI."
          },
          {
            _id: "exercise12",
            type: "codingChallenge",
            title: "Email Slicer",
            description: "Create a function that extracts the username and domain name from an email address."
          },
        ]
      }
    // Add additional modules following the same pattern
  ];

type AccordionItem = {
    id: string,
    title?: string,
    content?: ReactNode
}

type ModuleItemProps = {
    item: IModuleItem, 
    editMode?: boolean, 
    onEnter?: any, 
    onEdit?: any, 
    onViewResults?: any
}

const ModuleItem = ({item, onEnter, onEdit, onViewResults, editMode}: ModuleItemProps) => {

    const timeLeftString = '5 days left'

    const getTypeCaption = (type: IModuleItemType) => {
        switch (type) {
            case 'codingChallenge':
                return 'Coding'
            case 'quiz':
                return 'Quiz'
            default:
                break;
        }
    }
    
    return (
        <div className='relative box-shadow rounded-md p-6 group cursor-pointer' onClick={onEnter}>
            <div className='flex gap-4'>
                <div className='flex flex-col gap-2'>
                    <div>
                        <span className='text-2xl'>
                            {item?.title || 'Untitled'}
                        </span>
                    </div>
                    <div className='flex gap-6'>
                        <div className='text-sm'>
                            {timeLeftString}
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-6 right-6 flex gap-4 opacity-0 group-hover:opacity-100">
                {!editMode && <Button underline caption="Start" onClick={onEnter}/>}
            </div>
        </div>
    )
}

const Module = ({courseId, module, editMode}: {courseId: string, module: IModule, editMode?: boolean}) => {

    const router = useRouter();

    const handleOpenItem = (courseId: string, moduleId: string, itemId: string) => {
        router.push(`/course/${courseId}/module/${moduleId}/item/${itemId}`)
    }

    const handleCreateItem = () => {
        router.push(`/builder`)
    }

    const handleViewResults = (id: string) => {
        router.push(`/item/${id}`)
    }

    return (
        <div>
            <div className='flex flex-col gap-6'>
                <div className="flex flex-col gap-4">
                    {module.items && module.items.map((item: IModuleItem) => (
                        <div key={item._id}>
                            <ModuleItem 
                                item={item} 
                                editMode={editMode} 
                                onEnter={() => handleOpenItem(courseId, module._id, item._id)}
                                onEdit={() => handleOpenItem(courseId, module._id, item._id)}
                                onViewResults={() => handleViewResults(item._id)}
                                />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const CourseModules = ({ courseId, modules, editMode }: {courseId: string, modules: IModule[], editMode?: boolean}) => {

    const [accordionItems, setAccordionItems] = useState<AccordionItem[]>([])

    useEffect(() => {
        modules = MODULES
        const modulesItems: AccordionItem[] = modules?.map((module) => ({
            id: module._id,
            title: module.title,
            content: <Module courseId={courseId} module={module} editMode={editMode}/>
        })) || []
        setAccordionItems(modulesItems)
    }, [modules])

    return (
        <Accordion items={accordionItems} editMode={editMode} initialState={true}/>
    )
}

export default CourseModules