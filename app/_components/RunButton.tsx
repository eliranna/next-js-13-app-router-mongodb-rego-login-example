import Spinner from "./base/Spinner";

const RunButton = ({processing, disabled, onClick}: {processing?: boolean; disabled?: boolean; onClick: any}) => (
  <div className={`bg-black rounded-full w-fit flex gap-2 text-white py-2 px-4 h-[41px] transition-all justify-center items-center ${processing ? 'cursor-default w-[41px]' : 'w-[116.4px] cursor-pointer'}`} onClick={!processing ? onClick : null}>
    <div>
      {processing ? <Spinner/> : <img src="/icons/run.svg" className='w-[25px] invert'/>}
    </div>
    {!processing && (
      <div>
        Execute
      </div>
    )}
  </div>
)

export default RunButton