import { ReactNode } from "react";

const TextNote = ({className, children}: {className?: string, children: ReactNode}) => (
    <div className={`${className} text-sm font-normal text-dark-gray`}>
        {children}
    </div>
)

export default TextNote