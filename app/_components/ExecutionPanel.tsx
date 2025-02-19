import { useCaptions } from "_helpers/client/useCaptions"
import CustomInput from "./CustomInput"
import OutputWindow from "./OutputWindow"
import RunButton from "./base/RunButton"

interface ExecutionPanel {
    outputDetails: any,
    customInput: string,
    onCustomInputChange: any,
    processing: boolean,
    onExecute: any,
    disableExecute: boolean
}

const ExecutionPanel = ({outputDetails, customInput, onCustomInputChange, processing, disableExecute, onExecute}: ExecutionPanel) => {

    const { getCaption } = useCaptions()

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
                <RunButton icon={"/icons/run.svg"} processing={processing} onClick={onExecute} disabled={disableExecute}>
                    {getCaption('Execute')}
                </RunButton>
            </div>
        </div>
    )
}

export default ExecutionPanel