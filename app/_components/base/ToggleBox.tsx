import { ReactNode } from 'react';
import { Collapse } from 'react-collapse';

const ToggleBox = ({isOpen, title, onToggle, children}: {isOpen: boolean, title: string, onToggle: any, children: ReactNode}) => {
    return (
        <div className='flex flex-col gap-4'>
            <div>
                <div className='flex gap-2 w-fit cursor-pointer' onClick={onToggle}>
                    <div className='flex flex-col justify-center'>
                        <img className={`w-6 transition-all duration-500 ${!isOpen ? `rotate-0` : '-rotate-45'}`} src={'/icons/plus.svg'} />
                    </div>
                    <div className='text-lg'>
                        {title}
                    </div>
                </div>
            </div>
            <div>
                <Collapse isOpened={isOpen}>
                    {children}
                </Collapse>                
            </div>
        </div>        
    )
}

export default ToggleBox