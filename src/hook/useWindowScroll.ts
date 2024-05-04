import { throttle } from 'lodash';
import { useCallback, useLayoutEffect, useState } from 'react';

export type IWindowPosition = {
  x: number | null;
  y: number | null;
};

export default function useWindowScroll(
  cb?: (scrollPos: IWindowPosition) => void,
): [IWindowPosition, (...args: any[]) => void] {
  const [state, setState] = useState<IWindowPosition>({
    x: null,
    y: null,
  });

  const scrollTo = useCallback((...args: any[]) => {
    if (typeof args[0] === 'object') {
      window.scrollTo(args[0]);
    } else if (typeof args[0] === 'number' && typeof args[1] === 'number') {
      window.scrollTo(args[0], args[1]);
    } else {
      throw new Error(`Invalid arguments passed to scrollTo`);
    }
  }, []);

  useLayoutEffect(() => {
    const handleScroll = throttle(() => {
      setState({ x: window.scrollX, y: window.scrollY });
      if (typeof cb === 'function') {
        cb({ x: window.scrollX, y: window.scrollY });
      }
    }, 50);

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [state, scrollTo];
}
