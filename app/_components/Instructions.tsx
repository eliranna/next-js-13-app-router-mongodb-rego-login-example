import Markdown from "./base/Markdown"
import Spinner from "./base/Spinner"

const Instructions = ({title, description, processing}: {title?: string, description?: string, processing?: boolean}) => {
  return (
      <div className='flex flex-col p-10'>
        <div className='text-4xl font-light'>
          {title}
        </div>
        <div className='text-lg text-black prose-p:text-black prose-p:text-lg'>
          <Markdown>
            {description}
          </Markdown>
        </div>
      </div>
  )
}

export default Instructions