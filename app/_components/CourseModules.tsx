import { IModule, IModuleItem, IModuleItemType } from "_services/useCourseService"
import Accordion from "./base/Accordion"
import { ReactNode, useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { BiAnalyse } from "react-icons/bi";
import Button from "./base/Button";

type AccordionItem = {
    id: string,
    title?: string,
    content?: ReactNode
}

const ModuleItem = ({item, onEnter}: {item: IModuleItem, onEnter?: any}) => {

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
        <div className='relative border border-light-gray p-6'>
            <div className='flex gap-4'>
                <div className='flex flex-col gap-2'>
                    <div>
                        <span className='text-xs bg-black text-white px-2 py-[1.5px] rounded-full'>
                            {getTypeCaption(item?.type) || 'Untitled'}
                        </span>
                    </div>
                    <div>
                        <span className='text-2xl'>
                            {item?.title || 'Untitled'}
                        </span>
                    </div>
                    <div className='flex gap-6'>
                        <div className='text-sm '>
                            23 Questions
                        </div>
                        <div className='text-sm'>
                            {timeLeftString}
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-6 right-6'>
                <Button underline caption="Open Challenge" onClick={onEnter}/>
            </div>
        </div>
    )
}

const Module = ({courseId, module}: {courseId: string, module: IModule}) => {

    const router = useRouter();

    const handleOpenItem = (courseId: string, moduleId: string, itemId: string) => {
        router.push(`/course/${courseId}/module/${moduleId}/item/${itemId}`)
    }

    const handleCreateItem = () => {}

    return (
        <div>
            <div className='flex flex-col gap-6'>
                <div className='flex gap-4'>
                    <div>
                        <Button caption='Create new' icon='/icons/plus.svg' onClick={handleCreateItem}/>
                    </div>
                </div>
                <div>
                    {module.items && module.items.map((item: IModuleItem) => (
                        <div key={item._id}>
                            <ModuleItem item={item} onEnter={() => handleOpenItem(courseId, module._id, item._id)}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const CourseModules = ({ courseId, modules }: {courseId: string, modules: IModule[]}) => {

    const [accordionItems, setAccordionItems] = useState<AccordionItem[]>([])

    useEffect(() => {
        const modulesItems: AccordionItem[] = modules?.map((module) => ({
            id: module._id,
            title: module.title,
            content: <Module courseId={courseId} module={module}/>
        })) || []
        setAccordionItems(modulesItems)
    }, [modules])

    return (
        <Accordion items={accordionItems}/>
    )
}

export default CourseModules