import { ReactNode } from "react";

export const Page = ({className, children}: {className?: string, children?: ReactNode}) => (
    <div className={`${className} mx-auto w-full`}>
        <div className="mx-auto w-full max-w-[1180px]">
            {children}
        </div>
    </div>
)