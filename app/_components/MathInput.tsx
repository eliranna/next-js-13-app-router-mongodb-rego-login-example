import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { TrashButton } from "./base/TrashButton";

declare global {
    namespace JSX {
      interface IntrinsicElements {
        'math-field': React.DetailedHTMLProps<React.HTMLAttributes<MathMLElement>, MathMLElement>;
      }
    }
}

const MathInput = ({formula, withRemove, onChange, onRemove}: {formula?: string, withRemove?: boolean, onChange?: any, onRemove?: any}) => {

    const [value, setValue] = useState('')
    const parentRef = useRef(null);

    // Customize the mathfield when it is mounted
    const mf = useRef()
    /*
    useEffect(() => {
        if (mf.current) {
            // Read more about customizing the mathfield: https://cortexjs.io/mathlive/guides/customizing/
            mf.current.smartFence = true

            mf.current.mathVirtualKeyboardPolicy = "manual";
            mf.current.addEventListener("focusin", (evt) => 
                window.mathVirtualKeyboard.show()
            );
            mf.current.addEventListener("focusout", (evt) => 
                window.mathVirtualKeyboard.hide()
            );
        
            // This could be an `onInput` handler, but this is an alternative
            mf.current.addEventListener('input', (evt) => {
                // When the return key is pressed, play a sound
                if (evt.inputType === 'insertLineBreak') {
                // The mathfield is available as `evt.target`
                // The mathfield can be controlled with `executeCommand`
                // Read more: https://cortexjs.io/mathlive/guides/commands/
                evt.target.executeCommand('plonk')
                }
            })

            setTimeout(() => {
                handleFocus()
            }, 100)
        }
    }, [])
    */

    useEffect(() => {
        formula && setValue(formula)
    }, [formula])
  

    const handleFocus = () => {
       // mf.current.focus();
    };

    return (
        <>
            <Script src="//unpkg.com/mathlive"/>
            <div dir="ltr" ref={parentRef} className="group relative w-full border border-white hover:border-light-gray focus-within:border-light-gray p-2 transition-colors" onFocus={handleFocus} tabIndex={0}>
                {withRemove && (
                    <div className="absolute right-4 top-4 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <TrashButton onClick={onRemove}/>
                    </div>
                )}
                { /*
                <math-field ref={mf} onInput={(evt) => {setValue(evt.target.value); onChange && onChange(evt.target.value)}} placeholder="Example: 2x + 5">
                    {value}
                </math-field>
                */}
            </div>
        </>
    )
}

export default MathInput