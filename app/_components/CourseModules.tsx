import { IModule, IModuleItem, IModuleItemType } from "_services/useCourseService"
import Accordion from "./base/Accordion"
import { ReactNode, useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import Button from "./base/Button";
import { useLocality } from "_helpers/client/useLocality";
import { useCaptions } from "_helpers/client/useCaptions";

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

const ModuleItem = ({item, onEnter, editMode}: ModuleItemProps) => {    

    const { direction } = useLocality()
    const { getCaption } = useCaptions()

    return (
        <div className='relative box-shadow rounded-md p-6 group cursor-pointer' onClick={onEnter}>
            <div className='flex gap-4'>
                <div className='flex flex-col gap-2'>
                    <div>
                        <span className='text-xl font-medium'>
                            {item?.title || 'Untitled'}
                        </span>
                    </div>
                    <div className='flex gap-6'>
                        <div className='text-sm'>
                            {item.timeLeft}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`absolute bottom-6 ${direction === 'rtl' ? 'left-6' : 'right-6'} flex gap-4 opacity-0 group-hover:opacity-100`}>
                {!editMode && <Button underline caption={getCaption("Start")} onClick={onEnter}/>}
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
                                onEnter={() => editMode ? handleViewResults(item._id) : handleOpenItem(courseId, module._id, item._id)}
                                />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const CourseModules = ({ courseId, modules, editMode }: {courseId: string, modules: IModule[], editMode?: boolean}) => {

    const router = useRouter();

    const [accordionItems, setAccordionItems] = useState<AccordionItem[]>([])

    useEffect(() => {
        const modulesItems: AccordionItem[] = modules?.map((module) => ({
            id: module._id,
            title: module.title,
            content: <Module courseId={courseId} module={module} editMode={editMode}/>
        })) || []
        setAccordionItems(modulesItems)
    }, [modules])

    const handleAddToItem = (itemId: string) => {
      router.push(`/builder`)
    }

    return (
        <Accordion items={accordionItems} editMode={editMode} initialState={true} onAddToItem={handleAddToItem}/>
    )
}

export default CourseModules