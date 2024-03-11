import { IModuleItem, IQuestion } from "_services/useCourseService"
import Title from "./base/Title"
import Button from "./base/Button"
import Body from "./base/Body"
import TextInput from "./base/TextInput"
import { defaultInputType } from "_types/course"
import Question from "./Question"

const Header = ({title, description, editMode, onChange}: {title?: string, description?: string, editMode?: boolean; onChange?: any}) => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <Title>
                    <TextInput 
                        initialValue={title}
                        eng
                        readOnly={!editMode}
                        placeholder="Quiz title"
                        onChange={(title: string) => onChange({
                            header: {
                                title,
                                description
                            }                        
                        })}/>
                </Title>
            </div>
            {false && (<div>
                {(typeof description === 'undefined') ? (
                    <Button icon='/icons/plus-only.svg' caption='הוסף תיאור תרגיל' onClick={() => onChange({
                        header: {
                            title,
                            description: '',
                        }
                    })}/>
                ): (
                    <Body>
                        <TextInput 
                            initialValue={description} 
                            placeholder="הכנס את תיאור התרגיל" 
                            withDelete 
                            onDelete={() => {
                                onChange({
                                    header: {
                                        title,
                                        description: undefined
                                    }
                                })
                            }} 
                            onChange={(description: string) => onChange({
                                header: {
                                    title,
                                    description
                                }
                        })}/>
                    </Body>
                )}
            </div>)}
        </div>        
    )
}

const AddQuestion = ({onAddQuestion}: {onAddQuestion: any}) => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="flex justify-center cursor-pointer" onClick={() => onAddQuestion(defaultInputType)}>
                    <img src="/icons/plus.svg" className="w-8"/>
                </div>
                {false && (
                    <div className="text-md text-center">
                        הוסף שאלה
                    </div>
                )}
            </div>
        </div>
    )
}

const Quiz = ({quiz}: {quiz: IModuleItem}) => {

    const editMode = false

    const handleQuestionChange = () => {}
    const handleAddQuestion = () => {}
    const handleHeaderChange = () => {}

    return (
        <div className="w-full flex flex-col gap-16 pb-20">
            <div className="flex flex-col gap-12">
                <div>
                    <Header editMode={editMode} title={quiz.title} description={quiz.description} onChange={handleHeaderChange}/>
                </div>
                <div className="flex flex-col gap-12">
                    {quiz.questions && quiz.questions.map((question: IQuestion) => (
                        <Question editMode={editMode} key={question._id} question={question} onChange={handleQuestionChange}/>
                    ))}
                </div>
            </div>
            {editMode && (
                <div className="flex justify-center">
                    <AddQuestion onAddQuestion={handleAddQuestion}/>
                </div>
            )}
        </div>
    )
}

export default Quiz