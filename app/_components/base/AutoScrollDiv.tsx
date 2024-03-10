import { ReactNode, useEffect, useRef } from "react";

const AutoScrollDiv = ({ children }: {children: ReactNode}) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [children]); // Dependency array includes `children` to react on content change

  return (
    <div ref={scrollRef} className="h-full overflow-y-scroll">
      {children}
    </div>
  );
}

export default AutoScrollDiv