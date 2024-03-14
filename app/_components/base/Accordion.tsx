import { ReactNode, useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';
import TextInput from './TextInput';

export type AccordionItem = {
    id?: string,
    title?: string,
    content?: ReactNode
}

function createStateItemsArray(state: boolean[], items: AccordionItem[], initialState: boolean) {
    // If state is longer than items, return state
    if (state.length > items.length) {
        return state;
    }

    // Create a new array with the length of items, initialized with false
    let resultArray = new Array(items.length).fill(initialState);

    // Set the first values equal to the values of state
    for (let i = 0; i < state.length; i++) {
        resultArray[i] = state[i];
    }

    // The rest of the values in resultArray are already set to false
    return resultArray;
}

const Accordion = ({items = [], editMode, initialState = false, onTitleChange, onAddToItem}: {items?: AccordionItem[], editMode?: boolean, initialState?: boolean, onTitleChange?: any, onAddToItem?: any}) => {

    const stateArray = new Array(items.length).fill(initialState)
    const [state, setState] = useState(stateArray)

    useEffect(() => {
        setState(createStateItemsArray(state, items, initialState))
    }, [items])

    const toggleItem = (itemIndex: number) => {
        const newState = state.map((item, index) => {
            if (index === itemIndex) {
                return !item
            }
            return item;
        })
        console.log(newState)
        setState(newState);
    }

    const isOnEditingMode = (index: number) => items[index].title == '' || !items[index].title

    const handleItemClick = (index: number) => {
        toggleItem(index)
    }

    const handleAddToItem = (clickEvent: any, itemId: string | undefined) => {
        clickEvent.stopPropagation()
        onAddToItem(itemId)
    }

    return (
        <div className='flex flex-col gap-8'>
            {items.map((item: AccordionItem, index: number) => (
                <div key={item.id} className='border-b border-white flex flex-col gap-2'>
                    <div onClick={() => handleItemClick(index)} className={`cursor-pointer`}>
                        <div className='flex justify-between'>
                            <div className='w-full'>
                                <span className={`text-3xl font-light cursor-pointer`}> 
                                    <TextInput 
                                        readOnly={!isOnEditingMode(index)}
                                        initialValue={item.title}
                                        eng
                                        focused 
                                        className='w-full cursor-pointer' 
                                        ghost 
                                        placeholder='הכנס את שם המודול' 
                                        onBlur={(value: string) => isOnEditingMode(index) && onTitleChange(index, value)}/>
                                </span>
                            </div>
                            <div className='flex flex-row justify-end gap-6'>
                                {editMode && (
                                    <div className={`flex flex-col justify-center opacity-0 ${state[index] && 'opacity-100'} transition-opacity`} onClick={(e) => handleAddToItem(e, item.id)}>
                                        <img src="/icons/plus.svg" className='w-[25px]'/>
                                    </div>
                                )}
                                <div className='flex flex-col justify-center'>
                                    <img src="/icons/down-arrow.svg" className={`w-[25px] ${state[index] ? 'rotate-180' : null} transition-all`}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Collapse isOpened={state[index]}>
                            <div className='py-4'>
                                {item.content}
                            </div>
                        </Collapse>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Accordion