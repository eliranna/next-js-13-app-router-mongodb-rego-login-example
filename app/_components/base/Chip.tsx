const Chip = ({caption, icon, selected, onClick}: {caption: string, icon?: string, selected?: boolean, onClick?: any}) => {
    return (
        <div className={`flex gap-1 rounded-full border ${selected ? ' border-dark-gray' : 'border-white'} px-2 cursor-pointer`} onClick={onClick}>
            {icon && (
                <div className={`flex flex-col justify-center`}>
                    <img className='w-[18px]' src={icon}/>
                </div>
            )}
            <div className="flex flex-col justify-center">
                <span className={`text-sm text-dark-gray font-normal`}> { caption } </span>
            </div>
        </div>
    )
}

export default Chip