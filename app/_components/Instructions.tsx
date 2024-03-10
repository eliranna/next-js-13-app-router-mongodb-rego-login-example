import { Task } from "_types/exercise"
import Markdown from "./base/Markdown"

const Instructions = ({task}: {task?: Task}) => {
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