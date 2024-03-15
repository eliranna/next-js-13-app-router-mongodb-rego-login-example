import { ReactNode } from "react";
import Spinner from "./Spinner";
import { useLocality } from "_helpers/client/useLocality";

type ButtonProps = {
  processing?: boolean; 
  disabled?: boolean; 
  children: ReactNode, 
  icon?: string, 
  secondary?: boolean, 
  onClick?: any
}

const RunButton = ({
  processing, 
  disabled, 
  children, 
  icon, 
  secondary, 
  onClick
}: ButtonProps) => {

    const { direction } = useLocality()

    return (
      <div dir={direction} className={`${secondary ? 'bg-white border border-black' : 'bg-black'} ${secondary ? 'text-black' : 'text-white'} rounded-full w-fit flex gap-2 py-2 px-4 h-[41px] transition-all justify-center items-center ${processing ? 'cursor-default w-[41px]' : 'w-[116.4px] cursor-pointer'}`} onClick={!processing ? onClick : null}>
        <div>
          {processing ? <Spinner/> : <img src={icon} className={`w-[25px] ${!secondary && 'invert'}`}/>}
        </div>
        {!processing && (
          <div>
            {children}
          </div>
        )}
      </div>
    )
}

export default RunButton