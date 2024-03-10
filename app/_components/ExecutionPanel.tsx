import CustomInput from "./CustomInput"
import OutputWindow from "./OutputWindow"
import RunButton from "./RunButton"

interface ExecutionPanel {
    outputDetails: any,
    customInput: string,
    onCustomInputChange: any,
    processing: boolean,
    onExecute: any,
    disableExecute: boolean
}

const ExecutionPanel = ({outputDetails, customInput, onCustomInputChange, processing, disableExecute, onExecute}: ExecutionPanel) => {
    return (
        <div className='h-full p-6 flex flex-col gap-10'>
            <div className='h-full flex flex-col'>
                <div className='h-full'>
                    <OutputWindow outputDetails={outputDetails} />
                </div>
                <div className='hidden'>
                    <CustomInput customInput={customInput} onCustomInputChange={onCustomInputChange}/>
                </div>
            </div>
            <div>
                <RunButton processing={processing} onClick={onExecute} disabled={disableExecute}/>
            </div>
        </div>
    )
}

export default ExecutionPanel