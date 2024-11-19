import { useEffect } from 'react';

export const useScrollBehavior = () => {
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const isScrollable = (element: HTMLElement): boolean => {
        const style = window.getComputedStyle(element);
        const overflowY = style.getPropertyValue('overflow-y');
        return overflowY === 'auto' || overflowY === 'scroll';
      };

      let el = target;
      while (el && el !== document.body) {
        if (isScrollable(el)) {
          const canScroll = el.scrollHeight > el.clientHeight;
          const isAtTop = el.scrollTop <= 0;
          const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;

          if (canScroll && !isAtTop && !isAtBottom) {
            return;
          }
        }
        el = el.parentElement as HTMLElement;
      }

      // Permetti il refresh di sistema solo quando si è all'inizio della pagina
      if (document.documentElement.scrollTop === 0) {
        return;
      }

      e.preventDefault();
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
}; 