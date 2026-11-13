import { useCallback, useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://v15-kling.klingai.com/klingai-stream-sgp/kling/download/MzI2NTcxNTMyMzE0MTYwMTI2NDQ5MzcyNw==?x-kcdn-pid=112372';
const SENSITIVITY = 1;

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  const seekToTarget = useCallback((video: HTMLVideoElement) => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }
    isSeekingRef.current = true;
    video.currentTime = targetTimeRef.current;
  }, []);

  const handleSeeked = useCallback(() => {
    const video = videoRef.current;
    isSeekingRef.current = false;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.001) {
      seekToTarget(video);
    }
  }, [seekToTarget]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const currentX = event.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const video = videoRef.current;
      if (
        !video ||
        !Number.isFinite(video.duration) ||
        video.duration <= 0 ||
        window.innerWidth <= 0
      ) {
        return;
      }

      const timeOffset =
        (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const nextTarget = Math.min(
        video.duration,
        Math.max(0, targetTimeRef.current + timeOffset)
      );

      targetTimeRef.current = nextTarget;

      if (!isSeekingRef.current && !video.seeking) {
        seekToTarget(video);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [seekToTarget]);

  return (
    <video
      ref={videoRef}
      src={VIDEO_URL}
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
      className="fixed inset-0 z-0 h-full w-full object-cover pointer-events-none"
      style={{ objectPosition: '70% center' }}
      aria-hidden="true"
    />
  );
}
