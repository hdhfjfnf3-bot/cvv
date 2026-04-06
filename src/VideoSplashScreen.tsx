import { useEffect, useRef, useState } from 'react';

export default function VideoSplashScreen({ onDone }: { onDone: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [exiting, setExiting] = useState(false);

    const doSkip = () => {
        if (exiting) return;
        setExiting(true);
        setTimeout(() => onDone(), 420); // wait for fade then unmount
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // User already clicked "اضغط للبدء" so browser allows sound
        video.muted = false;
        video.volume = 1;
        video.play().catch(() => {});

        const onEnded = () => doSkip();
        video.addEventListener('ended', onEnded);
        return () => video.removeEventListener('ended', onEnded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#000',
                opacity: exiting ? 0 : 1,
                pointerEvents: exiting ? 'none' : 'auto',
                transition: 'opacity 0.4s ease',
                overflow: 'hidden',
            }}
        >
            {/* Fullscreen video with sound */}
            <video
                ref={videoRef}
                src="/promo-video.mp4"
                playsInline
                preload="auto"
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    background: '#000',
                    display: 'block',
                }}
            />

            {/* Skip button — bottom center */}
            <button
                onClick={doSkip}
                style={{
                    position: 'absolute',
                    bottom: 40,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '13px 38px',
                    borderRadius: 100,
                    border: '1.5px solid rgba(255,255,255,0.28)',
                    background: 'rgba(0,0,0,0.55)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 28px rgba(0,0,0,0.5)',
                    transition: 'background 0.2s, transform 0.15s',
                }}
                onMouseEnter={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.background = 'rgba(0,0,0,0.8)';
                    btn.style.transform = 'translateX(-50%) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.background = 'rgba(0,0,0,0.55)';
                    btn.style.transform = 'translateX(-50%) scale(1)';
                }}
            >
                تخطي
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 4 15 12 5 20 5 4" />
                    <line x1="19" y1="5" x2="19" y2="19" />
                </svg>
            </button>
        </div>
    );
}
