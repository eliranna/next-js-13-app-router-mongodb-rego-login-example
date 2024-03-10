import { ReactNode } from "react";

const Grid = ({className, children}: {className?: string, children?: ReactNode}) => (
    <div className={`${className} w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4`}>
        {children}
    </div>
)

export default Grid