import { useState, useEffect } from 'react';

const useSelectionTooltip = () => {
  const [selectedText, setSelectedText] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isTooltipVisible, setShowTooltip] = useState(false);

  useEffect(() => {

    const handleMouseUp = (e: { clientX: any; clientY: any; }) => {
      const selection = document.getSelection();
      // Check if there is a text selection
      if (selection && selection.type === "Range") {
        setSelectedText(selection.toString());
        setTooltipPosition({
          x: e.clientX,
          y: e.clientY
        });
        setShowTooltip(true);
      } else {
        setShowTooltip(false);
      }
    };

    const handleSelectionChange = () => {
      const selection = document.getSelection();
      // Hide the tooltip if the selection is cleared
      if (!selection || selection.isCollapsed) {
        setShowTooltip(false);
      }
    };

    // Listen to mouseup and selectionchange events on the entire document
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      // Cleanup
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const closeTooltip = () => {
    setShowTooltip(false)
  }

  return { selectedText, tooltipPosition, isTooltipVisible, closeTooltip };
};

export default useSelectionTooltip;
