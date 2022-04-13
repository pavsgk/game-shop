import React, {useEffect, useRef} from 'react';

function useOutsideTracker(ref, func) {
  const clickHandler = (e) => {
    if (!ref.current.contains(e.target)) func();
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickHandler);
    return () => document.removeEventListener('mousedown', clickHandler);
  });
}

function OutsideTracker({children, func}) {
  const wrapRef = useRef(null);

  useOutsideTracker(wrapRef, func);
  return <div ref={wrapRef}>{children}</div>;
}

export default OutsideTracker;
