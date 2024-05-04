import { inRange, throttle } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import useWindowScroll, { IWindowPosition } from './useWindowScroll';

interface IUseHideDOMItem {
  scrollDownCB?: () => void;
  scrollUpCB?: () => void;
  initCB?: () => void;
}

type ScrollUpOld = {
  scrollOld: number;
  isScrollUpOld: 'init' | 'scroll-top' | 'scroll-bottom';
};

export default function useHideDOMItem({
  scrollDownCB,
  scrollUpCB,
  initCB,
}: IUseHideDOMItem) {
  const [isTop, setIsTop] = useState(true);
  const refScroller = useRef<ScrollUpOld>({
    isScrollUpOld: 'init',
    scrollOld: 0,
  });

  const onScrolling = useCallback(({ y }: IWindowPosition) => {
    if (y === 0) {
      refScroller.current.isScrollUpOld = 'init';
      refScroller.current.scrollOld = 0;
      if (typeof initCB === 'function') {
        initCB();
      }
      return;
    }
    if (
      !y ||
      inRange(
        y,
        refScroller.current.scrollOld - 100,
        refScroller.current.scrollOld + 100,
      )
    )
      return;

    let scrollStateDetect: ScrollUpOld['isScrollUpOld'] =
      refScroller.current.isScrollUpOld;

    if (y < 200) {
      scrollStateDetect = 'init';
    } else if (refScroller.current.scrollOld < y) {
      scrollStateDetect = 'scroll-bottom';
    } else if (refScroller.current.scrollOld > y) {
      scrollStateDetect = 'scroll-top';
    }
    refScroller.current.scrollOld = y;

    if (
      refScroller.current.isScrollUpOld !== 'scroll-top' &&
      scrollStateDetect === 'scroll-top'
    ) {
      refScroller.current.isScrollUpOld = 'scroll-top';
      if (typeof scrollUpCB === 'function') {
        scrollUpCB();
      }
    } else if (
      scrollStateDetect === 'scroll-bottom' &&
      refScroller.current.isScrollUpOld !== 'scroll-bottom'
    ) {
      refScroller.current.isScrollUpOld = 'scroll-bottom';
      if (typeof scrollDownCB === 'function') {
        scrollDownCB();
      }
    } else if (scrollStateDetect === 'init') {
      refScroller.current.isScrollUpOld = 'init';
      if (typeof initCB === 'function') {
        initCB();
      }
    }
  }, []);
  useWindowScroll(onScrolling);

  useEffect(() => {
    const checkScroll = () => {
      setIsTop(window.scrollY <= 30);
    };
    setIsTop(window.scrollY <= 30);
    window.addEventListener('scroll', throttle(checkScroll, 50));

    return () => {
      window.removeEventListener('scroll', throttle(checkScroll, 50));
    };
  }, []);

  return { isTop };
}
