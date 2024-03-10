const Chip = ({caption, onClick}: {caption: string, onClick: any}) => (
    <div className="rounded-full bg-stone-100 px-4 py-2 w-fit cursor-pointer" onClick={onClick}>
        {caption}
    </div>
)

export default Chip