import { PanelResizeHandle } from "react-resizable-panels"

const ResizeHandle = ({direction}: {direction: "horizontal" | "vertical"}) => (
    <PanelResizeHandle className={`${direction === 'horizontal' ? 'w-[1px]' : 'h-[1px]'} bg-[#eee] hover:bg-black transition-all`}/>
)

export default ResizeHandle