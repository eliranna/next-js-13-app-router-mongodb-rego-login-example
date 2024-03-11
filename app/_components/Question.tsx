import TextInput from "./base/TextInput"
import Body from "./base/Body"
import Button from "./base/Button"
import Chip from "./base/Chip"
import TextNote from "./base/TextNote"
import { useEffect, useState } from "react"
import FreeTextPrompt from "./FreeTextPrompt"
import CodeInput from "./CodeInput"
import MathInput from "./MathInput"
import { IAddition, IInputType, IOption, IQuestion } from "_services/useCourseService"
import { defaultInputType } from "_types/course"

const QuestionNumber = ({value}: {value: number}) => {
    return (
        <div className="rounded-full w-10 h-10 flex justify-center align-middle text-lg text-gray font-semibold justify-items-center content-center line-height-35">
            {value}
        </div>
    )
}

const QuestionPrompt = ({id, caption, additions, editMode, onChange}: {id: string, caption?: string, additions?: IAddition[], editMode?:boolean, onChange?: any}) => {

    const handleAddedContent = (inputType: IInputType) => {
        const updatedAdditionsArray = [...(additions || []), {
            type: inputType,
        }];
        onChange({
            additions: updatedAdditionsArray
        })
    }

    const handleAdditionRemove = (indexToRemove: number) => {
        if (!additions) return;
        let updatedAdditionsArray = [
            ...additions.slice(0, indexToRemove), 
            ...additions.slice(indexToRemove + 1)
          ];
        onChange({
            additions: updatedAdditionsArray
        })        
    }

    const handleAdditionChange = (indexToUpdate: number, content: string) => {
        const updateValues = { content }; 
        const updatedAdditionsArray = additions && additions.map((addition, index) => 
            index === indexToUpdate ? { ...addition, ...updateValues } : addition
        ); 
        onChange({
            additions: updatedAdditionsArray
        })       
    }

    const AdditionsMenu = ({}) => {
        return (
            <div className="flex gap-4 align-middle h-full">
                <div className="flex flex-col justify-center cursor-pointer" onClick={() => handleAddedContent('code')}>
                    <img className='w-[18px]' src="/icons/code.svg"/>
                </div>
                <div className="flex flex-col justify-center cursor-pointer" onClick={() => handleAddedContent('math')}>
                    <img className='w-[18px]' src="/icons/math.svg"/>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <Body>
                    <TextInput 
                        eng
                        initialValue={caption}
                        readOnly={!editMode}
                        placeholder="Insert the question"
                        onChange={(caption: string) => {
                            onChange({
                                caption
                            })
                        }}
                        CustomOptions = {editMode && <AdditionsMenu/>}
                    />
                </Body>
            </div>
            <div className="flex flex-col gap-6">
                {additions && additions.map((addition: IAddition, index: number) => {
                    return (
                        <div key={`question-${id}-addition-${index}`}>
                            {addition.type === 'code' && <CodeInput 
                                                            withRemove
                                                            code={addition.content} 
                                                            onChange={(content: string) => handleAdditionChange(index, content)} 
                                                            onRemove={() => handleAdditionRemove(index)}
                                                            />}
                            {addition.type === 'math' && <MathInput 
                                                            withRemove
                                                            formula={addition.content} 
                                                            onChange={(content: string) => handleAdditionChange(index, content)}
                                                            onRemove={() => handleAdditionRemove(index)}
                                                            />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const InputTypeSelector = ({inputType = defaultInputType, onChange}: {inputType: IInputType | undefined, onChange: any}) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-start gap-2">
                <div className="flex flex-col justify-center">
                    <div className="text-md text-dark-gray">
                        Answare Format:
                    </div>
                </div>
                <div className="flex gap-2">
                    <Chip caption="Options" icon="/icons/list.svg" selected={inputType === 'selection'} onClick={() => onChange('selection')}/>
                    <Chip caption="Free Text" icon="/icons/text.svg" selected={inputType === 'text'} onClick={() => onChange('text')}/>
                    <Chip caption="Code Snippet" icon="/icons/code.svg" selected={inputType === 'code'} onClick={() => onChange('code')}/>
                    <Chip caption="Formula" icon="/icons/math.svg" selected={inputType === 'math'} onClick={() => onChange('math')}/>
                </div>
            </div>
        </div>
    )
}

const AnswarePrompt = ({type, content, onChange}: {type?: IInputType, content?: string, onChange?: any}) => {

    const [selectedInputType, setSelectedInputType] = useState<IInputType>(defaultInputType)

    useEffect(() => {
        type && setSelectedInputType(type)
    }, [type])

    return (
        <div className="flex flex-col gap-6">
            <div>
                <Body>
                    <FreeTextPrompt inputType={selectedInputType} content={content} onChange={onChange}/>
                </Body>
            </div>
        </div>
    )
}

const Option = ({option, withDelete, editMode, onChange, onDelete}: {option: IOption, withDelete?: boolean, editMode?: boolean, onChange: any, onDelete: any}) => (
    <div className="flex gap-8 ">
        <div className="flex flex-col justify-center">
            <div className="w-3 h-3 rounded-full border border-some-gray cursor-pointer"/>
        </div>
        <div className="w-full flex flex-col justify-center">
            <TextInput eng readOnly={!editMode} withDelete={withDelete} initialValue={option.caption} placeholder="Insert Option" onChange={onChange} onDelete={onDelete}/>
        </div>
    </div>
)

const Question = ({question, editMode, onChange}: {question: IQuestion, editMode?: boolean, onChange?: any}) => {

    const handleChange = (change: any) => {
        onChange({
            ...question,
            ...change
        })
    }

    const handleOptionChange = (indexToUpdate: number, caption: string) => {

        const updateValues = { caption }; 
        const updatedOptionsArray = question.options && question.options.map((option, index) => 
            index === indexToUpdate ? { ...option, ...updateValues } : option
        );

        console.log(updatedOptionsArray)

        handleChange({
            options: updatedOptionsArray 
        })
    }

    const handleOptionRemove = (indexToRemove: number) => {
        if (!question.options) return;
        let updatedOptionsArray = [
            ...question.options.slice(0, indexToRemove), 
            ...question.options.slice(indexToRemove + 1)
          ];
        handleChange({
            options: updatedOptionsArray
        }) 
    }

    const handleOptionAddition = () => {
        const updatedOptionsArray = [...(question.options || []), {
            id: `${question._id}-option-${question.options ? (question.options?.length + 1) : 1}`,
            caption: ''
        }];
        handleChange({
            options: updatedOptionsArray
        })
    }
    
    return (
        <div className="relative">
            <div className="absolute -right-16">
                <QuestionNumber value={question.position}/>
            </div>
            <div className="w-full rounded-xl p-12 box-shadow">
                <div className="flex flex-col gap-6">
                    <div>
                        <QuestionPrompt 
                            id={question._id}
                            caption={question.caption} 
                            additions={question.additions}
                            editMode={editMode}
                            onChange={handleChange}
                            />
                    </div>
                    <div className="flex flex-col gap-8">
                        {editMode && (
                            <div>
                                <InputTypeSelector
                                    inputType={question.inputType}
                                    onChange={(inputType: IInputType) => handleChange({
                                        inputType
                                    })}
                                />                        
                            </div>
                        )}
                        {(question.inputType === 'selection') && (
                            <div className="flex flex-col gap-4">
                                {question.options?.map((option: IOption, index: number) => (
                                    <div key={`option-${option._id}`}>
                                        <Option 
                                            withDelete={question.options && question.options?.length > 2}
                                            option={option} 
                                            editMode={editMode}
                                            onChange={(caption: string) => handleOptionChange(index, caption)}
                                            onDelete={() => handleOptionRemove(index)}
                                            />
                                    </div>
                                ))}
                                {editMode && (
                                    <div>
                                        <Button icon="/icons/plus.svg" caption="Insert Option" onClick={handleOptionAddition}/>
                                    </div>
                                )}
                            </div>
                        )}
                        {(editMode && (question.answare == undefined) && (question.inputType !== 'selection')) ? (
                            <div>
                                <Button icon="/icons/plus.svg" caption="Insert Answare" onClick={() => handleChange({
                                    answare: {
                                        type: 'text',
                                        content: ''
                                    }
                                })}/>
                            </div>
                        ) : (
                            <div>
                                <AnswarePrompt
                                    type={question.inputType}
                                    content={question.answare?.content}
                                    onChange={(content: string) => handleChange ({
                                        answare: {
                                            content 
                                        }
                                    })}
                                />
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Question