import Markdown from "_components/base/Markdown"
import Spinner from "./base/Spinner";
import { useEffect } from "react";

const Assistant = ({isLoading, message}: {isLoading?: boolean, setIsLoading?: any, message: string | null}) => {
    return (
        <div>
            {isLoading ? <Spinner/> : (
                <Markdown>
                    {message}
                </Markdown>
            )}
        </div>
    )
}

export default Assistant