import { ReactNode, useEffect, useRef, useState } from "react";
import { TrashButton } from "./TrashButton";

const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

interface TextAreaProps {
    className: string;
    initialValue?: string;
    placeholder?: string;
    password?:boolean;
    eng?: boolean;
    readOnly?: boolean;
    focused?: boolean;
    onChange?: any;
    onFocus?: any;
    onBlur?: any;
    onClick?: any;
}

const TextArea = ({
    className, 
    initialValue, 
    placeholder, 
    password, 
    eng, 
    readOnly,
    focused,
    onChange, 
    onFocus,
    onBlur,
    onClick
}: TextAreaProps) => {

    const [value, setValue] = useState("");
    const textAreaRef = useRef<any>(null);
    const inputRef = useRef<any>(null);

    // useEffect hook to focus the input element when the component mounts
    useEffect(() => {
        // Check if the input element is present and then focus it
        if (focused && textAreaRef.current) {
            textAreaRef.current.focus();
        }
        if (focused && inputRef.current) {
            inputRef.current.focus();
        }
    }, []);     

    useEffect(() => {
        initialValue && setValue(initialValue)
    }, [initialValue])

    useAutosizeTextArea(textAreaRef.current, value);

    const handleChange = (evt: any) => {
        const val = evt.target?.value;
        setValue(val);
        onChange && onChange(val)
    };

    return !password ? (
        <textarea
            readOnly={readOnly}
            className={`${readOnly && 'select-none'} ${className}`}
            onChange={handleChange}
            placeholder={placeholder}
            ref={textAreaRef}
            rows={1}
            dir={eng ? 'ltr': 'rtl'}
            lang={eng ? 'eng' : 'he'}
            value={value}
            onFocus={onFocus}
            onClick={onClick}
            onBlur={() => onBlur(value)}
        />
    ): (
        <input
            readOnly={readOnly}
            type="password" 
            onChange={handleChange}
            className={`${className}`} 
            placeholder={placeholder}
            ref={inputRef}
            dir={eng ? 'ltr': 'rtl'}
            lang={eng ? 'eng' : 'he'}
            value={value}
            onFocus={onFocus}
            onClick={onClick}
            onBlur={() => onBlur(value)}
        />
    )
}

type TextInputProps = {
    initialValue?: string, 
    placeholder?: string, 
    className?: string, 
    password?: boolean,
    eng?: boolean, 
    focused?: boolean,
    ghost?: boolean,
    readOnly?: boolean,
    withDelete?: boolean, 
    onChange?: any, 
    onDelete?: any, 
    onClick?: any,
    onBlur?: any,
    CustomOptions?: ReactNode
}

const TextInput = ({
    initialValue, 
    placeholder, 
    className, 
    password, 
    eng, 
    focused,
    ghost,
    readOnly,
    withDelete, 
    onChange, 
    onDelete,
    onClick,
    onBlur,
    CustomOptions
}: TextInputProps) => {

    const [onFocus, setOnFocus] = useState(false)
    
    return (
        <div className={`group w-full ${ghost ? 'border-none' : 'border-b border-light-gray'} flex justify-betwee`}>
            <div className="w-full">
                <TextArea className={`${className} w-full focus:outline-none resize-none placeholder:text-gray`} readOnly={readOnly} eng={eng} password={password} initialValue={initialValue} focused={focused} placeholder={placeholder} onChange={onChange} onClick={onClick} onFocus={() => setOnFocus(true)} onBlur={(value: string) => {setOnFocus(false); onBlur && onBlur(value)}}/>
            </div>
            <div className={`opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity ${onFocus && 'opacity-100'}`}>
                {withDelete && !CustomOptions && (
                    <TrashButton onClick={onDelete}/>
                )}
                {CustomOptions}
            </div>
        </div>
    ) 
}

export default TextInput