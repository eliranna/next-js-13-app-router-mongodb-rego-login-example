import { ReactNode } from "react"
import TextInput from "./base/TextInput"
import { useCaptions } from "_helpers/client/useCaptions"

const SectionHeader = ({topic, title, description, editMode = false, custom}: {topic?: string, title?:string, description?: string, editMode?:boolean, custom?: ReactNode}) => {
    const {getCaption} = useCaptions()
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    {topic && (
                        <div>
                            <div className={`flex gap-1 rounded-full bg-black px-[14px] py-[4px] w-fit`}>
                                <span className={`text-xs font-normal text-white`}> { topic } </span>
                            </div>
                        </div>
                    )}  
                    <div>
                        <div className="text-5xl leading-snug font-light">
                            {editMode ? <TextInput placeholder={getCaption("Title")} className="text-5"/> : title}
                        </div>
                    </div>              
                </div>
                <div>
                    <span className='text-lg leading-relaxed'>
                        {description}
                    </span>
                </div>
                <div>
                    {custom}
                </div>
            </div>
        </div>
    )
}

export default SectionHeader