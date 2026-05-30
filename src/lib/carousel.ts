import type EmblaCarouselType from 'embla-carousel';

/**
 * Adds horizontal trackpad / mousewheel scrolling to an Embla carousel.
 * Accumulates deltaX until a threshold is crossed, then advances one slide,
 * so a single swipe gesture triggers exactly one scroll step.
 */
export function addWheelScroll(viewport: HTMLElement, carousel: EmblaCarouselType): void {
  let accum = 0;
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  viewport.addEventListener(
    'wheel',
    (e: WheelEvent) => {
      // Only take over clearly horizontal swipes; let vertical scroll pass through.
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();

      accum += e.deltaX;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { accum = 0; }, 200);

      if (accum >= 60) {
        accum = 0;
        carousel.scrollNext();
      } else if (accum <= -60) {
        accum = 0;
        carousel.scrollPrev();
      }
    },
    { passive: false },
  );
}
