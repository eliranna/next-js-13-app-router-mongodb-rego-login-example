import { ReactNode, useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';
import TextInput from './TextInput';

export type AccordionItem = {
    id?: string,
    title?: string,
    content?: ReactNode
}

function createStateItemsArray(state: boolean[], items: AccordionItem[]) {
    // If state is longer than items, return state
    if (state.length > items.length) {
        return state;
    }

    // Create a new array with the length of items, initialized with false
    let resultArray = new Array(items.length).fill(false);

    // Set the first values equal to the values of state
    for (let i = 0; i < state.length; i++) {
        resultArray[i] = state[i];
    }

    // The rest of the values in resultArray are already set to false
    return resultArray;
}

const Accordion = ({items = [], onTitleChange}: {items?: AccordionItem[], onTitleChange?: any}) => {

    const stateArray = new Array(items.length).fill(false)
    const [state, setState] = useState(stateArray)

    useEffect(() => {
        setState(createStateItemsArray(state, items))
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

    return (
        <div className='flex flex-col gap-10'>
            {items.map((item: AccordionItem, index: number) => (
                <div key={item.id} className='border-b border-light-gray flex flex-col gap-2'>
                    <div onClick={() => handleItemClick(index)} className={`cursor-pointer`}>
                        <div className='flex justify-between'>
                            <div>
                                <span className={`text-3xl font-light cursor-pointer`}> 
                                    <TextInput 
                                        readOnly={!isOnEditingMode(index)}
                                        initialValue={item.title}
                                        focused 
                                        className='w-full cursor-pointer' 
                                        ghost 
                                        placeholder='הכנס את שם המודול' 
                                        onBlur={(value: string) => isOnEditingMode(index) && onTitleChange(index, value)}/>
                                </span>
                            </div>
                            <div className='flex flex-col justify-center'>
                                <img src="/icons/down-arrow.svg" className={`w-[25px] ${state[index] ? 'rotate-180' : null} transition-all`}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Collapse isOpened={state[index]}>
                            <div className='pb-6'>
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