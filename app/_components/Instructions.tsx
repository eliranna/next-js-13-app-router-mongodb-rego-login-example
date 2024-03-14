import Markdown from "./base/Markdown"

const Instructions = ({title, description, processing}: {title?: string, description?: string, processing?: boolean}) => {
  return (
      <div className='flex flex-col p-10'>
        <div className='text-4xl font-light'>
          {title}
        </div>
        <div>
          <Markdown>
            {description}
          </Markdown>
        </div>
      </div>
  )
}

export default Instructions