import { ReactNode } from "react";

const Title = ({className, children}: {className?: string, children: ReactNode}) => (
    <div className={`${className} text-5xl font-light`}>
        {children}
    </div>
)

export default Title
