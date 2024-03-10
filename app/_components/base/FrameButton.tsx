import Button from "./Button"

const FrameButton = ({icon, caption, onClick}: {icon?: string, caption: string, onClick?: any}) => (
    <div className='w-full cursor-pointer py-4 px-8 rounded-lg border border-accent' onClick={onClick}>
        <Button caption={caption} icon={icon} onClick={onClick}/>
    </div>    
)

export default FrameButton