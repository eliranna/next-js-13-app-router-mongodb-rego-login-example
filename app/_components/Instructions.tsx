import Markdown from "./base/Markdown"
import { ICodingChallange } from "_services/useModuleItemService"

const Instructions = ({task}: {task?: ICodingChallange}) => {
  return (
    <div>
      {task && (
        <div className='flex flex-col gap-10'>
          <div className='text-4xl font-light'>
            {task.title}
          </div>
          <div className='text-md'>
            <Markdown>
              {task.description}
            </Markdown>
          </div>
        </div>
      )}
    </div>
  )
}

export default Instructions