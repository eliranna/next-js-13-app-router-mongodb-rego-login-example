import CodeInput from "./CodeInput";
import TextInput from "./base/TextInput";
import MathInput from "./MathInput";
import { IInputType } from "_services/useCourseService";

const FreeTextPrompt = ({inputType, content, onChange}: {inputType: IInputType, content?: string, onChange?: any}) => {

    const onTextChange = (value: string) => {
        onChange(value)
    }

    const onCodeChange = (value: string) => {
        onChange(value)
    }

    const onMathChange = (value: any) => {
        onChange(value)
    }

    return (
        <div className="wrapper w-full">
            <div className="input-panel overflow-x-scroll">
                {inputType === 'text' && <TextInput initialValue={content} onChange={onTextChange} placeholder="הכנס את התשובה"/>}
                {inputType === 'code' && <CodeInput code={content} onChange={onCodeChange}/>}
                {inputType === 'math' && <MathInput formula={content} onChange={onMathChange}/>}
            </div>
        </div>
    )
}

export default FreeTextPrompt