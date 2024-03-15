import ReactMarkdown from "react-markdown";

const Markdown = ({children}: {children: string | null | undefined}) => (
    <ReactMarkdown className={'markdown prose text-md text-black prose-p:text-black prose-p:text-lg'}>
        {children}
    </ReactMarkdown>
)

export default Markdown