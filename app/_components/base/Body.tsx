import { ReactNode } from "react";

const Body = ({className, children}: {className?: string, children: ReactNode}) => (
    <div className={`${className} text-xl font-normal`}>
        {children}
    </div>
)

export default Body
