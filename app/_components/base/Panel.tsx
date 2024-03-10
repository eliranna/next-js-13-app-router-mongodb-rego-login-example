import React, { ReactNode, ComponentProps } from "react";
import { Panel as ResizablePanel } from "react-resizable-panels";

// Assuming you want to extend ResizablePanel's props and include children
interface PanelProps extends ComponentProps<typeof ResizablePanel> {
    children: ReactNode;
}

const Panel: React.FC<PanelProps> = React.forwardRef((props, ref) => {
    return (
        <ResizablePanel ref={ref} {...props}>
            <div className="h-full p-3">
                {props.children}
            </div>
        </ResizablePanel>
    );
});

export default Panel;