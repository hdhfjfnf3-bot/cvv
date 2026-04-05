import { useEffect, useRef, useState, useCallback } from 'react';

const LINES = [
    'Meta · TikTok · Snapchat',
    'Performance Marketing',
    'Data-Driven Results',
    'Turning Ads Into Revenue',
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
    const [progress, setProgress] = useState(0);
    const [lineIdx, setLineIdx] = useState(0);
    const [phase, setPhase] = useState<'in' | 'loaded' | 'out'>('in');
    const rafRef = useRef<number>(0);
    const startRef = useRef<number | null>(null);
    const DURATION = 2600; // ms total

    const tick = useCallback((ts: number) => {
        if (!startRef.current) startRef.current = ts;
        const elapsed = ts - startRef.current;
        // Ease: fast start, slow at end
        const raw = Math.min(elapsed / DURATION, 1);
        const eased = raw < 0.5
            ? 4 * raw * raw * raw
            : 1 - Math.pow(-2 * raw + 2, 3) / 2;
        setProgress(Math.round(eased * 100));
        if (raw < 1) {
            rafRef.current = requestAnimationFrame(tick);
        } else {
            setPhase('loaded');
            setTimeout(() => setPhase('out'), 400);
            setTimeout(() => onDone(), 1100);
        }
    }, [onDone]);

    useEffect(() => {
        // Small delay so component mounts first
        const t = setTimeout(() => {
            rafRef.current = requestAnimationFrame(tick);
        }, 120);
        return () => {
            clearTimeout(t);
            cancelAnimationFrame(rafRef.current);
        };
    }, [tick]);

    // Cycle lines
    useEffect(() => {
        const id = setInterval(() => setLineIdx(i => (i + 1) % LINES.length), 600);
        return () => clearInterval(id);
    }, []);

    // SVG ring
    const R = 70;
    const CIRC = 2 * Math.PI * R;
    const offset = CIRC - (progress / 100) * CIRC;

    return (
        <div className={`ls-root ${phase === 'out' ? 'ls-exit' : ''}`}>

            {/* ── Mesh background blobs ── */}
            <div className="ls-blob ls-blob-1" />
            <div className="ls-blob ls-blob-2" />
            <div className="ls-blob ls-blob-3" />

            {/* ── Animated grid lines ── */}
            <div className="ls-grid" />

            {/* ── Floating dots ── */}
            {Array.from({ length: 24 }).map((_, i) => (
                <span
                    key={i}
                    className="ls-dot"
                    style={{
                        top: `${(i * 19 + i * i * 3) % 95}%`,
                        left: `${(i * 23 + 7) % 95}%`,
                        animationDelay: `${(i * 0.22) % 2.4}s`,
                        animationDuration: `${2.2 + (i % 5) * 0.4}s`,
                        width: i % 3 === 0 ? '6px' : '4px',
                        height: i % 3 === 0 ? '6px' : '4px',
                    }}
                />
            ))}

            {/* ── Centre content ── */}
            <div className="ls-center">

                {/* Photo + ring */}
                <div className="ls-ring-wrap">
                    {/* Outer decorative ring (spinning) */}
                    <div className="ls-ring-spin" />

                    {/* SVG progress ring */}
                    <svg className="ls-svg" viewBox="0 0 160 160">
                        <defs>
                            <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#7B3FE4" />
                                <stop offset="100%" stopColor="#00D1FF" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        {/* Track */}
                        <circle
                            cx="80" cy="80" r={R}
                            fill="none"
                            stroke="rgba(255,255,255,0.07)"
                            strokeWidth="5"
                        />
                        {/* Fill */}
                        <circle
                            cx="80" cy="80" r={R}
                            fill="none"
                            stroke="url(#rg)"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeDasharray={CIRC}
                            strokeDashoffset={offset}
                            transform="rotate(-90 80 80)"
                            filter="url(#glow)"
                            style={{ transition: 'stroke-dashoffset 0.06s linear' }}
                        />
                        {/* Dot at tip */}
                        {progress > 2 && (
                            <circle
                                cx={80 + R * Math.cos((progress / 100 * 360 - 90) * Math.PI / 180)}
                                cy={80 + R * Math.sin((progress / 100 * 360 - 90) * Math.PI / 180)}
                                r="4.5"
                                fill="#00D1FF"
                                filter="url(#glow)"
                            />
                        )}
                    </svg>

                    {/* Photo */}
                    <div className="ls-photo-wrap">
                        <img
                            src="/images/media-buyer-hero.png"
                            alt="Abdelrahman Mohamed"
                            className="ls-photo"
                        />
                        <div className="ls-photo-overlay" />
                    </div>

                    {/* Percent badge */}
                    <div className="ls-pct-badge">
                        <span>{progress}</span>
                        <span className="ls-pct-sym">%</span>
                    </div>
                </div>

                {/* Name */}
                <div className="ls-name-wrap">
                    <h1 className="ls-name">Abdelrahman Mohamed</h1>
                    <div className="ls-title-line" />
                    <p className="ls-role">Media Buyer</p>
                </div>

                {/* Rotating tagline */}
                <p className="ls-tagline" key={lineIdx}>{LINES[lineIdx]}</p>

                {/* Platform pills */}
                <div className="ls-pills">
                    {['Meta', 'TikTok', 'Snapchat'].map((p) => (
                        <span key={p} className="ls-pill">{p}</span>
                    ))}
                </div>
            </div>

            {/* Bottom watermark */}
            <p className="ls-watermark">حوّل إنفاقك الإعلاني إلى أرباح حقيقية</p>
        </div>
    );
}
