import React from "react";
import CodeEditor from "./CodeEditor";

const OutputWindow = ({ outputDetails }: {outputDetails: any}) => {
  console.log(outputDetails)
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      const code = atob(outputDetails.stdout) !== null
      ? `${atob(outputDetails.stdout)}`
      : null
      return (
        <CodeEditor readonly code={code || ''}/>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <div className="w-full h-full font-normal text-md overflow-y-auto">
      {outputDetails ? <>{getOutput()}</> : null}
    </div>
  );
};

export default OutputWindow;