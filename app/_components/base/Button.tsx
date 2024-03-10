const Button = ({icon, caption, underline, onClick}: {icon?: string, caption: string, underline?: boolean, onClick?: any}) => (
    <div className='flex gap-1 w-fit cursor-pointer' onClick={onClick}>
        {icon && (
            <div className='flex flex-col justify-center'>
                <img className={`w-[18px] dark-gray-color`} src={icon} />
            </div>
        )}
        <div>
            <span className={`text-sm ${underline && 'border-b pb-1'}`}>
                {caption}
            </span>
        </div>
    </div>    
)

export default Button