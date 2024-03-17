import { useLocality } from "_helpers/client/useLocality"
import Markdown from "./base/Markdown"

const Instructions = ({title, description}: {title?: string, description?: string | null, processing?: boolean}) => {

  const {language, direction} = useLocality()

  return (
      <div lang={language} dir={direction} className='flex flex-col overflow-x-hidden overflow-y-scroll'>
        <div className='text-4xl font-light'>
          {title}
        </div>
        <div className="overflow-y-scroll">
          <Markdown>
            {description}
          </Markdown>
        </div>
      </div>
  )
}

export default Instructions