import { useState, useRef, useEffect } from 'react';

/**
 * VirtualizedList Component
 * Handles rendering large datasets efficiently with smooth scrolling.
 */
const VirtualizedList = ({ items, itemHeight = 50, containerHeight = 400, buffer = 5 }) => {
  const containerRef = useRef(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });

  // Total number of items
  const totalItems = items.length;

  /**
   * Calculates the visible range based on scroll position
   */
  const calculateVisibleRange = (scrollTop) => {
    console.log("scrollTop:", scrollTop);
    const startIndex = Math.floor(scrollTop / itemHeight); // Index of the first visible item
    const endIndex = startIndex + Math.ceil(containerHeight / itemHeight); // Last visible item
    setVisibleRange({
      start: Math.max(0, startIndex - buffer), // Include buffer above
      end: Math.min(totalItems, endIndex + buffer), // Include buffer below
    });
  };

  /**
   * Scroll event handler
   */
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      calculateVisibleRange(scrollTop);
    }
  };

  /**
   * Effect: Attach scroll event listener
   */
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /**
   * Render a single item
   */
  const renderItem = (index) => {
    const item = items[index];
    if (!item) return null;

    return (
      <div
        key={index}
        style={{
          position: 'absolute',
          top: `${index * itemHeight}px`, // Calculate item position
          height: `${itemHeight}px`,
          width: '100%',
          backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#e8e8e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #ccc',
        }}
      >
        {item}
      </div>
    );
  };

  return (
    <div>
      <div
      ref={containerRef}
      style={{
        height: `${containerHeight}px`, // Height of the viewport
        overflowY: 'auto',
        position: 'relative',
        border: '1px solid #ddd',
      }}
    >
      <div
        style={{
          height: `${totalItems * itemHeight}px`, // Total height of the list
          position: 'relative',
        }}
      >
        {Array.from({ length: visibleRange.end - visibleRange.start }, (_, i) =>
          renderItem(visibleRange.start + i)
        )}
      </div>
    </div>
    </div>
    
  );
};

export default VirtualizedList;
