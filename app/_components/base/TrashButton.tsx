export const TrashButton = ({onClick}: {onClick: any}) => (
    <div className="flex flex-col justify-center cursor-pointer" onClick={onClick}>
        <img className="w-4" src="/icons/trash.svg"/>
    </div>
)