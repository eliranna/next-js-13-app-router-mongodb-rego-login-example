import { MousePosition } from "_types/utils"

const SelectionTooltip = ({position, onSelectionQuery}: {position: MousePosition, onSelectionQuery: any}) => {
    return (
          <div style={{
            position: 'absolute',
            top: `${position.y}px`,
            left: `${position.x}px`,
            transform: 'translateY(-100%)', 
            backgroundColor: 'white',
            border: '1px solid gray',
            padding: '4px',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 1000
          }} onClick={onSelectionQuery}>
            <img src="https://res.cloudinary.com/dfdk4g2pj/image/upload/v1710677607/image_31_dkwgzy.png" className='w-[25px]'/>
          </div>        
    )
}

export default SelectionTooltip