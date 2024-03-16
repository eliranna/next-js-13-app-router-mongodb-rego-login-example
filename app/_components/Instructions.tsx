import { useLocality } from "_helpers/client/useLocality"
import Markdown from "./base/Markdown"

const Instructions = ({title, description, processing}: {title?: string, description?: string | null, processing?: boolean}) => {

  const {language, direction} = useLocality()

  return (
      <div lang={language} dir={direction} className='flex flex-col p-10'>
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