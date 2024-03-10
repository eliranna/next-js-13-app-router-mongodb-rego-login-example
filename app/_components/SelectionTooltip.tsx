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
            <img src="/icons/robot.svg" className='w-[25px]'/>
          </div>        
    )
}

export default SelectionTooltip