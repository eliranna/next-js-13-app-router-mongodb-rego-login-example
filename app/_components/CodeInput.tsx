import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import { TrashButton } from "./base/TrashButton";

const CodeInput = ({code, withRemove, onChange, onRemove}: {code?: string, withRemove?: boolean, onChange?: any, onRemove?: any}) => {

    const [value, setValue] = useState('')

    useEffect(() => {
        code && setValue(code)
    }, [code])

    return (
        <div dir="ltr" className="group relative w-full p-4 border border-white hover:border-light-gray focus-within:border-light-gray transition-colors" 
        style={{fontSize: '13.5px'}}>
            {withRemove && (
                <div className="absolute right-4 top-4 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TrashButton onClick={onRemove}/>
                </div>
            )}
            <div>
                <CodeEditor code={value} onChange={value => {setValue(value); onChange(value)}}/>
            </div>
        </div>
    )
}

export default CodeInput