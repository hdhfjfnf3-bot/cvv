import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import VideoSplashScreen from './VideoSplashScreen';
import {
    ArrowUpRight,
    Instagram,
    Mail,
    Menu,
    MessageCircle,
    Music2,
    Send,
    Sparkles,
    X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    courses,
    experiencePoints,
    heroSkills,
    industries,
    platformCards,
    profileFacts,
    services,
    skillGroups,
    skillTags,
    staticMessages,
    staticSiteContent,
    staticStudentResults,
    staticTestimonials,
    statsCards,
    systems,
    whyMe,
    type ContactMessage,
    type SiteContent,
    type StudentResult,
    type Testimonial,
} from './data/content';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

// Stagger container — children animate one by one
const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.25, // كان 0.25، زودته لـ 0.5 عشان يبقى أبطأ بضعف الوقت
            delayChildren: 0.1,
        },
    },
};

// Each item: slides up + scales in from 92%
const buildItem = {
    hidden: { opacity: 0, y: 32, scale: 0.92 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }, // البطء في الأنيميشن نفسه خليته 0.8 بدل 0.5
    },
};

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
        >
            {eyebrow ? <p className="mb-3 text-sm font-medium tracking-[0.3em] text-cyan-300/80">{eyebrow}</p> : null}
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h2>
            {subtitle ? <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{subtitle}</p> : null}
        </motion.div>
    );
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_10px_40px_rgba(0,0,0,0.45),0_0_40px_rgba(0,209,255,0.08)] ${className}`}
        >
            {children}
        </div>
    );
}

function SkillPill({ label }: { label: string }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 shadow-[0_0_16px_rgba(0,209,255,0.06)]">
            <span className="text-cyan-300">✦</span>
            {label}
        </div>
    );
}

function LineChart({ points }: { points: number[] }) {
    const path = useMemo(() => {
        if (!points.length) return '';
        const max = Math.max(...points);
        const min = Math.min(...points);
        const range = max - min || 1;
        return points
            .map((point, index) => {
                const x = (index / (points.length - 1 || 1)) * 100;
                const y = 100 - ((point - min) / range) * 100;
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ');
    }, [points]);

    return (
        <svg viewBox="0 0 100 100" className="h-24 w-full overflow-visible">
            <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7B3FE4" />
                    <stop offset="100%" stopColor="#00D1FF" />
                </linearGradient>
            </defs>
            <path d={path} fill="none" stroke="url(#chartGradient)" strokeWidth="4" strokeLinecap="round" />
            {points.map((point, index) => {
                const max = Math.max(...points);
                const min = Math.min(...points);
                const range = max - min || 1;
                const x = (index / (points.length - 1 || 1)) * 100;
                const y = 100 - ((point - min) / range) * 100;
                return <circle key={`${point}-${index}`} cx={x} cy={y} r="2.5" fill="#00D1FF" className="drop-shadow-[0_0_10px_#00D1FF]" />;
            })}
        </svg>
    );
}

function AutoDraggableRail<T>({
    items,
    renderItem,
    className = '',
    speed = 1.2,
    resumeDelay = 900,
}: {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
    speed?: number;
    resumeDelay?: number;
}) {
    const parentRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let isDragging = false;
        let startX = 0;
        let startXVal = 0;
        let x = 0; // Starts uninitialized
        let isInitialized = false;
        let autoPlay = true;
        let resumeTimer = 0;
        let frame = 0;
        let pointerId: number | null = null;

        const initScroll = () => {
            if (isInitialized) return;
            const thirdW = track.scrollWidth / 3;
            if (thirdW > 0) {
                x = thirdW;
                track.style.transform = `translateX(${x}px)`;
                isInitialized = true;
            }
        };

        const restartAutoPlay = () => {
            window.clearTimeout(resumeTimer);
            resumeTimer = window.setTimeout(() => {
                autoPlay = true;
            }, resumeDelay);
        };

        const validateBounds = () => {
            const thirdW = track.scrollWidth / 3;
            if (thirdW <= 0) return;
            if (x >= thirdW * 2) {
                x -= thirdW;
                startXVal -= thirdW;
            } else if (x <= 0) {
                x += thirdW;
                startXVal += thirdW;
            }
        };

        const animate = () => {
            if (track && autoPlay && !isDragging) {
                initScroll();
                x += speed;
                validateBounds();
                track.style.transform = `translateX(${x}px)`;
            }
            frame = requestAnimationFrame(animate);
        };

        const onPointerDown = (event: PointerEvent) => {
            initScroll();
            isDragging = true;
            autoPlay = false;
            window.clearTimeout(resumeTimer);
            startX = event.clientX;
            startXVal = x;
            pointerId = event.pointerId;
            track.setPointerCapture(event.pointerId);
            track.style.cursor = 'grabbing';
        };

        const onPointerMove = (event: PointerEvent) => {
            if (!isDragging) return;
            const delta = event.clientX - startX;
            x = startXVal + delta;
            validateBounds();
            track.style.transform = `translateX(${x}px)`;
        };

        const onPointerUp = () => {
            if (!isDragging) return;
            isDragging = false;
            track.style.cursor = 'grab';
            if (pointerId !== null) {
                try {
                    track.releasePointerCapture(pointerId);
                } catch { }
            }
            pointerId = null;
            restartAutoPlay();
        };

        const onMouseEnter = () => {
            autoPlay = false;
            window.clearTimeout(resumeTimer);
        };

        const onMouseLeave = () => {
            if (!isDragging) restartAutoPlay();
        };

        const onTouchStart = () => {
            autoPlay = false;
            window.clearTimeout(resumeTimer);
        };

        const onTouchEnd = () => {
            if (!isDragging) restartAutoPlay();
        };

        track.addEventListener('pointerdown', onPointerDown);
        track.addEventListener('mouseenter', onMouseEnter);
        track.addEventListener('mouseleave', onMouseLeave);
        track.addEventListener('touchstart', onTouchStart, { passive: true });
        track.addEventListener('touchend', onTouchEnd, { passive: true });
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);

        // Give layout a bit of time then init
        setTimeout(initScroll, 50);
        frame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frame);
            window.clearTimeout(resumeTimer);
            track.removeEventListener('pointerdown', onPointerDown);
            track.removeEventListener('mouseenter', onMouseEnter);
            track.removeEventListener('mouseleave', onMouseLeave);
            track.removeEventListener('touchstart', onTouchStart);
            track.removeEventListener('touchend', onTouchEnd);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
        };
    }, [resumeDelay, speed]);

    const tripleItems = [...items, ...items, ...items];

    return (
        <div ref={parentRef} className={`overflow-hidden w-full touch-pan-y ${className}`}>
            <div ref={trackRef} className="flex w-max items-center cursor-grab" style={{ willChange: 'transform' }}>
                {tripleItems.map((item, index) => renderItem(item, index))}
            </div>
        </div>
    );
}

function FeatureMarqueeSection({
    eyebrow,
    title,
    subtitle,
    image,
    imageAlt,
    items,
}: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
    imageAlt: string;
    items: Array<{ title: string; text?: string; badge?: string; emoji?: string; image?: string; imageClassName?: string; bullets?: string[] }>;
}) {
    return (
        <section>
            <SectionTitle eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <GlassCard className="overflow-hidden p-0">
                <div className="relative h-[280px] overflow-hidden sm:h-[400px] lg:h-[480px]">
                    <img src={image} alt={imageAlt} className="h-full w-full object-cover object-center" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,15,0.12),rgba(11,11,15,0.88))]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,63,228,0.3),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(0,209,255,0.18),transparent_28%)]" />
                    <div className="absolute bottom-0 right-0 left-0 p-4 sm:p-6">
                        <div className="inline-flex max-w-xl flex-col rounded-[24px] border border-white/10 bg-black/25 p-4 backdrop-blur-xl sm:p-5">
                            <p className="text-xs tracking-[0.3em] text-cyan-200/80">{eyebrow}</p>
                            <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{title}</h3>
                            <p className="mt-2 text-sm leading-7 text-white/70">{subtitle}</p>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden p-4 sm:p-5">
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0B0B0F] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0B0B0F] to-transparent" />
                    <AutoDraggableRail
                        className="gap-4"
                        items={items}
                        renderItem={(item, index) => (
                            <GlassCard key={`${item.title}-${index}`} className="industry-card min-w-[230px] max-w-[230px] overflow-hidden border-white/8 bg-white/[0.04] p-0 sm:min-w-[290px] sm:max-w-[290px]">
                                {item.image ? (
                                    <div className="relative h-32 overflow-hidden sm:h-36">
                                        <img src={item.image} alt={item.title} className={`h-full w-full transition-transform duration-500 hover:scale-[1.03] ${item.imageClassName || 'object-cover'}`} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F]/90 via-[#0B0B0F]/10 to-transparent pointer-events-none" />
                                    </div>
                                ) : null}
                                <div className="p-4 sm:p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            {item.emoji ? (
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-base shadow-[0_0_20px_rgba(0,209,255,0.08)]">
                                                    {item.emoji}
                                                </div>
                                            ) : null}
                                            <div>
                                                <h4 className="text-base font-semibold text-white">{item.title}</h4>
                                                {item.badge ? <p className="mt-1 text-sm text-cyan-200/85">{item.badge}</p> : null}
                                            </div>
                                        </div>
                                    </div>

                                    {item.text ? <p className="mt-4 text-sm leading-7 text-white/68">{item.text}</p> : null}

                                    {item.bullets?.length ? (
                                        <div className="mt-4 space-y-2">
                                            {item.bullets.map((bullet) => (
                                                <div key={bullet} className="rounded-[16px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75">
                                                    {bullet}
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            </GlassCard>
                        )}
                    />
                </div>
            </GlassCard>
        </section>
    );
}

const fakeNotifications = [
    { id: 1, type: 'Shopify', icon: '🛍️', text: 'New Order #4092 - $3,450.00', subtext: 'Payment processed successfully via Stripe.', time: 'الآن' },
    { id: 2, type: 'Meta Ads', icon: '♾️', text: 'Campaign Scaling Alert', subtext: 'ROAS surpassed 9.4x. Budget automatically increased by 20%.', time: 'منذ 1د' },
    { id: 3, type: 'WhatsApp', icon: '💬', text: 'عميل جديد (VIP)', subtext: 'أهلاً، محتاجين شغل ميديا باينج بعقد سنوي $25,000.', time: 'منذ 3د' },
    { id: 4, type: 'TikTok Ads', icon: '🎵', text: 'Cost Per Action Drop', subtext: 'CPA dropped by 64% today. Excellent performance.', time: 'منذ 8د' },
    { id: 5, type: 'Stripe', icon: '💳', text: 'Payment Received', subtext: '+$8,500.00 USD from TechCorp LLC.', time: 'منذ 12د' }
];

function LiveNotifications() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % fakeNotifications.length);
        }, 3500);

        const updateClock = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            hours = hours % 12 || 12;
            setCurrentTime(`${hours}:${minutes}`);
        };
        updateClock();
        const clockInterval = setInterval(updateClock, 60000);

        return () => {
            clearInterval(interval);
            clearInterval(clockInterval);
        };
    }, []);

    const currentNotif = fakeNotifications[currentIndex];
    const prevNotif = fakeNotifications[(currentIndex - 1 + fakeNotifications.length) % fakeNotifications.length];

    return (
        <section>
            <SectionTitle eyebrow="THE VIBE" title="شكل موبايلك وأنا ماسك إعلاناتك" subtitle="استعد لكمية الإشعارات دي لما نطلق الحملات والـ Pixel يبدأ يفهم جمهورك 🚀" />
            <div className="flex justify-center py-6 px-4">
                <div className="relative">
                    {/* Hardware Buttons */}
                    <div className="absolute top-[105px] -left-[5px] w-[4px] h-[28px] bg-[#2a2a2a] rounded-l-md shadow-[-1px_0_2px_rgba(0,0,0,0.5)]" />
                    <div className="absolute top-[150px] -left-[5px] w-[4px] h-[52px] bg-[#2a2a2a] rounded-l-md shadow-[-1px_0_2px_rgba(0,0,0,0.5)]" />
                    <div className="absolute top-[212px] -left-[5px] w-[4px] h-[52px] bg-[#2a2a2a] rounded-l-md shadow-[-1px_0_2px_rgba(0,0,0,0.5)]" />
                    <div className="absolute top-[165px] -right-[5px] w-[4px] h-[80px] bg-[#2a2a2a] rounded-r-md shadow-[1px_0_2px_rgba(0,0,0,0.5)]" />

                    {/* Phone shell */}
                    <div
                        className="relative overflow-hidden"
                        style={{
                            width: 280,
                            height: 590,
                            borderRadius: 52,
                            background: 'linear-gradient(160deg,#111528 0%,#0A0D15 100%)',
                            border: '10px solid #1a1a1c',
                            boxShadow: '0 0 0 1px #333, 0 40px_90px rgba(0,0,0,0.8), inset 0 0 30px rgba(255,255,255,0.03)',
                        }}
                    >
                        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-55 mix-blend-screen" alt="" />
                        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />

                        {/* Screen glare */}
                        <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/[0.04] to-transparent rounded-t-[42px] pointer-events-none" />

                        {/* Dynamic Island */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[88px] h-[26px] bg-black rounded-[18px] z-10 flex items-center justify-between px-2.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0a] border border-white/5" />
                            <div className="w-[7px] h-[7px] rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,1)] animate-pulse" />
                        </div>

                        {/* Status bar */}
                        <div className="absolute top-[14px] left-5 z-10 text-[13px] font-semibold text-white tracking-wide">{currentTime}</div>
                        <div className="absolute top-[15px] right-4 z-10 flex gap-1 items-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21L23.6 7.8C23.1 7.3 18.6 4 12 4C5.4 4 0.9 7.3 0.4 7.8L12 21Z" /></svg>
                            <div className="w-5 h-2.5 rounded-[3px] border border-white/70 relative flex items-center p-[2px]">
                                <div className="w-full h-full bg-white/90 rounded-sm" />
                                <div className="absolute -right-[3px] w-[2px] h-1.5 bg-white/60 rounded-r-sm" />
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="absolute inset-x-3 top-14 flex flex-col gap-2.5">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={currentNotif.id}
                                    initial={{ opacity: 0, y: -30, scale: 0.92 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.92, filter: 'blur(4px)' }}
                                    transition={{ duration: 0.55, type: 'spring', damping: 20, stiffness: 320 }}
                                    className="bg-[#1e1e20]/92 backdrop-blur-[30px] rounded-[22px] px-3.5 py-3 border border-white/[0.07] shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-4 h-4 rounded-[5px] bg-[#2a2a2c] flex items-center justify-center text-[9px]">{currentNotif.icon}</div>
                                            <span className="text-[9px] font-semibold text-white/45 tracking-widest uppercase">{currentNotif.type}</span>
                                        </div>
                                        <span className="text-[9px] text-white/35">{currentNotif.time}</span>
                                    </div>
                                    <div dir="ltr">
                                        <p className="text-[12.5px] font-semibold text-white leading-tight mb-0.5">{currentNotif.text}</p>
                                        <p className="text-[11px] text-emerald-400 leading-snug">{currentNotif.subtext}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            <div className="opacity-35 scale-[0.97] origin-top pointer-events-none">
                                <div className="bg-[#1e1e20]/70 backdrop-blur-[30px] rounded-[22px] px-3.5 py-3 border border-white/[0.04]">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-4 h-4 rounded-[5px] bg-[#2a2a2c] flex items-center justify-center text-[9px]">{prevNotif.icon}</div>
                                            <span className="text-[9px] font-semibold text-white/45 tracking-widest uppercase">{prevNotif.type}</span>
                                        </div>
                                    </div>
                                    <div dir="ltr">
                                        <p className="text-[12.5px] font-semibold text-white/65 leading-tight mb-0.5">{prevNotif.text}</p>
                                        <p className="text-[11px] text-white/45 leading-snug">{prevNotif.subtext}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Home bar */}
                        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[30%] h-1 bg-white/60 rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function App() {
    const [loadingDone, setLoadingDone] = useState(false);
    const [appReady, setAppReady] = useState(false);
    const handleLoadingDone = useCallback(() => setLoadingDone(true), []);
    const handleVideoDone = useCallback(() => setAppReady(true), []);
    const [menuOpen, setMenuOpen] = useState(false);
    const [content, setContent] = useState<SiteContent[]>(staticSiteContent);
    const [results] = useState<StudentResult[]>(staticStudentResults);
    const [testimonials] = useState<Testimonial[]>(staticTestimonials);
    const [messages, setMessages] = useState<ContactMessage[]>(staticMessages);
    const [loading] = useState(false);
    const [form, setForm] = useState({ name: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState('');
    const [adSpend, setAdSpend] = useState<number>(3000);

    useEffect(() => {
        setContent(staticSiteContent);
        setMessages(staticMessages);
    }, []);

    const submitMessage = async (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
        setSuccess('');
        try {
            const newMessage: ContactMessage = {
                id: Date.now(),
                name: form.name,
                message: form.message,
                created_at: new Date().toISOString(),
            };
            setForm({ name: '', message: '' });
            setMessages((current) => [newMessage, ...current]);
            setSuccess('تم إرسال رسالتك بنجاح. هتواصل معاك قريبًا.');
            const whatsappText = encodeURIComponent(`الاسم: ${newMessage.name}\nالرسالة: ${newMessage.message}`);
            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappText}`, '_blank');
        } catch (err) {
            console.error(err);
            setSuccess('حدث خطأ أثناء الإرسال، حاول مرة أخرى.');
        } finally {
            setSubmitting(false);
        }
    };

    const contactSection = content.find((item) => item.section_key === 'contact');
    const whatsappLink = contactSection?.meta?.whatsapp || 'https://wa.me/201080172165';
    const whatsappNumber = whatsappLink.replace('https://wa.me/', '').replace(/\D/g, '');

    return (
        <>
            {!loadingDone && <LoadingScreen onDone={handleLoadingDone} />}
            {loadingDone && !appReady && <VideoSplashScreen onDone={handleVideoDone} />}
            {appReady && <div dir="rtl" className="min-h-screen overflow-x-hidden bg-[#05060A] text-white">
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    <video
                        className="absolute inset-0 h-full w-full object-cover opacity-18"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/videos/neon-background.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,63,228,0.24),transparent_28%),radial-gradient(circle_at_left_20%,rgba(0,209,255,0.16),transparent_25%),linear-gradient(180deg,rgba(5,6,10,0.48),rgba(5,6,10,0.82))]" />
                </div>
                <div className="pointer-events-none fixed inset-0">
                    <div className="absolute right-[-10%] top-[-5%] h-64 w-64 rounded-full bg-[#7B3FE4]/25 blur-3xl sm:h-96 sm:w-96" />
                    <div className="absolute left-[-10%] top-[20%] h-72 w-72 rounded-full bg-[#00D1FF]/20 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
                    <div className="absolute bottom-[-10%] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7B3FE4]/20 blur-3xl sm:h-96 sm:w-96" />
                    {Array.from({ length: 18 }).map((_, index) => (
                        <span
                            key={index}
                            className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/70 shadow-[0_0_16px_rgba(0,209,255,0.9)] animate-pulse"
                            style={{
                                top: `${8 + (index * 5) % 80}%`,
                                left: `${5 + (index * 7) % 90}%`,
                                animationDelay: `${index * 0.2}s`,
                                animationDuration: `${2 + (index % 4)}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 mx-auto min-h-screen w-full max-w-[1920px] px-0 py-0 xl:px-6 xl:py-6">
                    <div className="min-h-screen overflow-hidden rounded-none border-0 bg-[#0B0B0F]/90 shadow-none xl:min-h-[calc(100vh-3rem)] xl:rounded-[40px] xl:border xl:border-white/10 xl:bg-[#0B0B0F]/76 xl:shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(0,209,255,0.08)]">
                        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-2xl">
                            <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6">
                                <button
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white md:hidden"
                                    onClick={() => setMenuOpen((value) => !value)}
                                    aria-label="menu"
                                >
                                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                                </button>

                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7B3FE4] to-[#00D1FF] shadow-[0_0_24px_rgba(0,209,255,0.45)]">
                                        <Sparkles size={18} />
                                    </div>
                                    <span className="text-sm font-semibold tracking-[0.3em] text-white/90">MEDIA BUYER</span>
                                </div>

                                <div className="hidden items-center gap-8 md:flex">
                                    <a href="#courses" className="text-sm text-white/70 transition hover:text-cyan-300">Courses</a>
                                    <a href="#about" className="text-sm text-white/70 transition hover:text-cyan-300">عني</a>
                                    <a
                                        href="#contact"
                                        className="rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-[#7B3FE4] to-[#00D1FF] px-5 py-2 text-sm font-semibold text-white shadow-[0_0_30px_rgba(0,209,255,0.28)] transition hover:scale-[1.02]"
                                    >
                                        ابدأ الآن
                                    </a>
                                </div>
                            </nav>
                            {menuOpen ? (
                                <div className="border-t border-white/10 px-4 py-4 md:hidden">
                                    <div className="flex flex-col gap-3">
                                        <a href="#courses" className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/80">Courses</a>
                                        <a href="#about" className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/80">عني</a>
                                        <a href="#contact" className="rounded-2xl bg-gradient-to-r from-[#7B3FE4] to-[#00D1FF] px-4 py-3 text-center text-sm font-semibold text-white">ابدأ الآن</a>
                                    </div>
                                </div>
                            ) : null}
                        </header>

                        <main className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-6 px-4 pb-16 pt-5 sm:gap-10 sm:px-6 sm:pt-8">
                            <section id="about" className="grid items-center gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={fadeUp}
                                    transition={{ duration: 0.6 }}
                                    className="order-2 lg:order-1"
                                >
                                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-xs text-cyan-200 shadow-[0_0_20px_rgba(0,209,255,0.12)]">
                                        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(0,209,255,1)]" />
                                        متاح للعمل
                                    </div>
                                    <p className="mb-2 text-[11px] tracking-[0.35em] text-white/45 sm:text-sm">ميديا باير</p>
                                    <h1 className="max-w-xl text-[2.5rem] font-bold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                                        حوّل
                                        <br />
                                        <span className="bg-gradient-to-r from-[#7B3FE4] to-[#00D1FF] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(0,209,255,0.35)]">
                                            إنفاقك الإعلاني
                                        </span>
                                        <span className="text-white/70"> إلى أرباح</span>
                                        <br />
                                        <span className="text-xl font-medium text-white/55 sm:text-3xl">حقيقية</span>
                                    </h1>
                                    <p className="mt-4 max-w-xl text-[13px] leading-7 text-white/70 sm:text-base">
                                        أحوّل الإنفاق الإعلاني إلى مبيعات حقيقية، وليس مجرد نقرات. أعمل بعقلية تعتمد على البيانات على ميتا وتيك توك وسناب شات لتحقيق أفضل نتائج ممكنة لنشاطك التجاري.
                                    </p>
                                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                        <a
                                            href="#contact"
                                            className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-gradient-to-r from-[#7B3FE4] to-[#00D1FF] px-6 py-4 text-sm font-semibold text-white shadow-[0_0_35px_rgba(0,209,255,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(123,63,228,0.45)]"
                                        >
                                            تواصل معي الآن
                                            <ArrowUpRight size={18} />
                                        </a>
                                        <a
                                            href="#skills"
                                            className="inline-flex items-center justify-center rounded-[20px] border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white/85 shadow-[0_0_20px_rgba(255,255,255,0.05)] transition hover:border-cyan-400/30 hover:text-cyan-200"
                                        >
                                            شاهد المهارات
                                        </a>
                                    </div>
                                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                        {[
                                            'ميديا باير',
                                            'متاح للعمل',
                                            'خبير إعلانات ميتا',
                                            'خبير تحسين العائد الإعلاني',
                                        ].map((item) => (
                                            <GlassCard key={item} className="p-3 text-center sm:p-4">
                                                <p className="text-xs font-semibold text-white/90 sm:text-sm">{item}</p>
                                            </GlassCard>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.7 }}
                                    className="order-1 lg:order-2"
                                >
                                    <GlassCard className="relative overflow-hidden p-2.5 sm:p-3">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#7B3FE4]/20 via-transparent to-[#00D1FF]/20" />
                                        <img
                                            src="/images/media-buyer-hero.png"
                                            alt="ميديا باير"
                                            className="relative h-[420px] w-full rounded-[22px] object-cover object-center sm:h-[520px]"
                                        />
                                        <div className="absolute inset-0 rounded-[22px] bg-[linear-gradient(180deg,rgba(11,11,15,0.08)_0%,rgba(11,11,15,0.18)_38%,rgba(11,11,15,0.78)_100%)]" />
                                        <div className="absolute bottom-4 right-4 left-4 rounded-[20px] border border-white/10 bg-[#0B0B0F]/55 p-4 backdrop-blur-xl sm:bottom-6 sm:right-6 sm:left-6">
                                            <p className="text-xs tracking-[0.25em] text-cyan-300/80">Media Buyer</p>
                                            <p className="mt-1 text-xl font-bold text-white">Abdelrahman Mohamed</p>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            </section>

                            <section className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] py-5">
                                <AutoDraggableRail
                                    className="gap-3 px-4"
                                    items={heroSkills}
                                    renderItem={(item, index) => <SkillPill key={`${item}-${index}`} label={item} />}
                                />
                            </section>

                            <motion.section
                                className="grid grid-cols-2 gap-3 md:grid-cols-4 sm:gap-4"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={staggerContainer}
                            >
                                {statsCards.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.div key={item.label} variants={buildItem}>
                                            <GlassCard className="p-3 sm:p-4">
                                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7B3FE4]/30 to-[#00D1FF]/20 text-cyan-200 shadow-[0_0_20px_rgba(0,209,255,0.12)]">
                                                    <Icon size={16} />
                                                </div>
                                                <p className="mt-2 text-xl font-bold text-white sm:text-2xl">{item.number}</p>
                                                <p className="mt-1 text-[11px] leading-5 text-white/55 sm:text-xs">{item.label}</p>
                                            </GlassCard>
                                        </motion.div>
                                    );
                                })}
                            </motion.section>

                            <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                                <GlassCard className="p-5 sm:p-6">
                                    <p className="text-xs tracking-[0.3em] text-white/40">الملف الشخصي</p>
                                    <h2 className="mt-3 text-3xl font-bold text-white">ميديا باير</h2>
                                    <p className="mt-2 text-white/60">التسويق الأدائي</p>
                                    <motion.div
                                        className="mt-6 space-y-4"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.2 }}
                                        variants={staggerContainer}
                                    >
                                        {profileFacts.map((fact) => {
                                            const Icon = fact.icon;
                                            return (
                                                <motion.div key={fact.label} variants={buildItem} className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-black/20 p-4">
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-cyan-300">
                                                        <Icon size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs tracking-[0.2em] text-white/40">{fact.label}</p>
                                                        <p className="mt-1 text-sm text-white/85">{fact.value}</p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {['ميتا', 'تيك توك', 'سناب'].map((tag) => (
                                            <span key={tag} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-200">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <a
                                        href="#contact"
                                        className="mt-6 inline-flex items-center justify-center rounded-[20px] bg-gradient-to-r from-[#7B3FE4] to-[#00D1FF] px-6 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(0,209,255,0.28)]"
                                    >
                                        تواصل معي
                                    </a>
                                </GlassCard>

                                <GlassCard className="p-5 sm:p-6">
                                    <div className="mb-5 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs tracking-[0.3em] text-white/40">01</p>
                                            <h2 className="mt-2 text-3xl font-bold text-white">نتائج مختارة</h2>
                                            <p className="mt-2 text-sm text-white/60">سجل مثبت من النتائج عبر مشاريع متعددة</p>
                                        </div>
                                    </div>
                                    {loading ? (
                                        <div className="grid gap-4 md:grid-cols-3">
                                            {Array.from({ length: 3 }).map((_, index) => (
                                                <div key={index} className="h-64 animate-pulse rounded-[24px] border border-white/10 bg-white/5" />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid gap-4 md:grid-cols-3">
                                            {results.map((result, index) => (
                                                <motion.div
                                                    key={result.id}
                                                    initial="hidden"
                                                    whileInView="visible"
                                                    viewport={{ once: true, amount: 0.25 }}
                                                    variants={fadeUp}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                >
                                                    <GlassCard className="h-full p-5">
                                                        <div className="mb-5 flex items-start justify-between">
                                                            <div>
                                                                <p className="text-sm text-white/55">{result.student_name}</p>
                                                                <p className="mt-2 bg-gradient-to-r from-[#7B3FE4] to-[#00D1FF] bg-clip-text text-3xl font-bold text-transparent">{result.revenue}</p>
                                                            </div>
                                                            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                                                +{result.growth_percent}%
                                                            </span>
                                                        </div>
                                                        <LineChart points={result.chart_points} />
                                                        <p className="mt-4 text-sm leading-7 text-white/65">{result.note}</p>
                                                    </GlassCard>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </GlassCard>
                            </section>

                            {/* Live Notifications Demo */}
                            <LiveNotifications />

                            <section id="skills">
                                <SectionTitle eyebrow="01" title="المهارات" subtitle="كل ما أتقنه في عالم الإعلانات الرقمية" />
                                <motion.div
                                    className="grid gap-4 lg:grid-cols-2"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.15 }}
                                    variants={staggerContainer}
                                >
                                    {skillGroups.map((group) => (
                                        <motion.div key={group.title} variants={buildItem}>
                                            <GlassCard className="p-5 sm:p-6">
                                                <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                                                <div className="mt-5 space-y-4">
                                                    {group.items.map((item) => (
                                                        <div key={item.label}>
                                                            <div className="mb-2 flex items-center justify-between text-sm text-white/75">
                                                                <span>{item.label}</span>
                                                                <span>{item.value}%</span>
                                                            </div>
                                                            <div className="h-2 rounded-full bg-white/8">
                                                                <div
                                                                    className="h-2 rounded-full bg-gradient-to-r from-[#7B3FE4] to-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.35)]"
                                                                    style={{ width: `${item.value}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </GlassCard>
                                        </motion.div>
                                    ))}
                                </motion.div>
                                <motion.div
                                    className="mt-4 flex flex-wrap gap-2"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.15 }}
                                    variants={staggerContainer}
                                >
                                    {skillTags.map((tag) => (
                                        <motion.div key={tag} variants={buildItem}>
                                            <SkillPill label={tag} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </section>

                            <FeatureMarqueeSection
                                eyebrow="02"
                                title="الخبرة"
                                subtitle="رحلتي المهنية في التسويق الأدائي"
                                image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                                imageAlt="الخبرة العملية"
                                items={experiencePoints.map((point, index) => ({
                                    title: `محطة خبرة ${index + 1}`,
                                    text: point.text,
                                    image: point.image,
                                    badge: index === 0 ? 'منهج عملي' : index === 1 ? 'تحسين مستمر' : 'نتائج قابلة للقياس',
                                    emoji: '✦',
                                }))}
                            />

                            <FeatureMarqueeSection
                                eyebrow="03"
                                title="المنصات"
                                subtitle="المنصات التي أحقق عليها النتائج يوميًا"
                                image="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1920&q=80"
                                imageAlt="منصات الإعلانات"
                                items={platformCards.map((platform, index) => ({
                                    title: platform.title,
                                    text: platform.subtitle,
                                    bullets: platform.bullets,
                                    image: platform.image,
                                    imageClassName: platform.imageClassName,
                                    emoji: index === 0 ? '🔵' : index === 1 ? '🎵' : '👻',
                                }))}
                            />

                            <FeatureMarqueeSection
                                eyebrow="04"
                                title="Services"
                                subtitle="ما الذي أقدمه لنشاطك التجاري"
                                image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80"
                                imageAlt="الخدمات التسويقية"
                                items={services.map((service) => ({
                                    title: service.title,
                                    text: service.text,
                                    image: service.image,
                                    emoji: service.emoji,
                                }))}
                            />

                            <FeatureMarqueeSection
                                eyebrow="05"
                                title="أنظمة متقدمة"
                                subtitle="الجانب التقني الذي يصنع الفارق في النتائج"
                                image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80"
                                imageAlt="أنظمة متقدمة"
                                items={systems.map((item) => ({
                                    title: 'نظام متقدم',
                                    text: item.text,
                                    image: item.image,
                                    emoji: '⚡',
                                }))}
                            />

                            <section>
                                <SectionTitle eyebrow="06" title="الخبرة القطاعية" subtitle="خبرة في مجالات متعددة مع حالات توسع حقيقية" />
                                <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] p-3 sm:p-5">
                                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0B0B0F] to-transparent" />
                                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0B0B0F] to-transparent" />
                                    <AutoDraggableRail
                                        className="gap-3 px-1"
                                        items={industries}
                                        renderItem={(industry, index) => (
                                            <GlassCard key={`${industry.title}-${index}`} className="industry-card min-w-[200px] max-w-[200px] overflow-hidden p-0 sm:min-w-[246px] sm:max-w-[246px]">
                                                <div className="relative h-36 overflow-hidden sm:h-44">
                                                    <img src={industry.image} alt={industry.title} className="h-full w-full object-cover" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/35 to-transparent" />
                                                    <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-lg backdrop-blur-md">
                                                        {industry.emoji}
                                                    </div>
                                                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                                                        <h3 className="text-base font-semibold text-white sm:text-lg">{industry.title}</h3>
                                                    </div>
                                                </div>
                                                <div className="p-3 sm:p-4">
                                                    <p className="text-xs leading-6 text-white/65 line-clamp-3">{industry.text}</p>
                                                </div>
                                            </GlassCard>
                                        )}
                                    />
                                </div>
                            </section>

                            <section id="courses">
                                <SectionTitle eyebrow="07" title="Courses & Training" subtitle="رحلتي التعليمية الكاملة في التسويق الرقمي والميديا باينج" />
                                <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] p-3 sm:p-5">
                                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0B0B0F] to-transparent" />
                                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0B0B0F] to-transparent" />
                                    <AutoDraggableRail
                                        className="gap-3 px-1"
                                        items={courses}
                                        renderItem={(course, index) => (
                                            <GlassCard key={`${course.title}-${index}`} className="industry-card min-w-[200px] max-w-[200px] overflow-hidden p-0 sm:min-w-[246px] sm:max-w-[246px]">
                                                <div className="relative h-36 overflow-hidden sm:h-44">
                                                    <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/35 to-transparent" />
                                                    <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-lg backdrop-blur-md">
                                                        {course.emoji}
                                                    </div>
                                                    <div className="absolute left-4 top-4 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200 backdrop-blur-md">
                                                        {course.badge}
                                                    </div>
                                                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                                                        <h3 className="text-base font-semibold text-white">{course.title}</h3>
                                                        <p className="mt-0.5 text-xs text-white/65">{course.subtitle}</p>
                                                    </div>
                                                </div>
                                                <div className="p-3 sm:p-4">
                                                    <p className="text-xs text-cyan-200/90 truncate">{course.mentor}</p>
                                                    <p className="mt-2 text-xs leading-5 text-white/65 line-clamp-3">{course.text}</p>
                                                </div>
                                            </GlassCard>
                                        )}
                                    />
                                </div>
                            </section>

                            <section>
                                <SectionTitle eyebrow="08" title="لماذا أنا؟" subtitle="ما الذي يميزني عن غيري" />
                                <GlassCard className="p-5 sm:p-8">
                                    <p className="max-w-3xl text-sm leading-8 text-white/70">
                                        أنا لا أعمل بالتخمين أو الإحساس، بل أعتمد على البيانات. كل قرار أتخذه مبني على أرقام حقيقية من حملات مباشرة تتم متابعتها يوميًا.
                                    </p>
                                    <motion.div
                                        className="mt-6 grid gap-3 md:grid-cols-2"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.2 }}
                                        variants={staggerContainer}
                                    >
                                        {whyMe.map((item) => (
                                            <motion.div key={item} variants={buildItem} className="rounded-[20px] border border-white/10 bg-white/5 p-4 text-sm text-white/75">
                                                <span className="mr-2 text-cyan-300">✦</span>
                                                {item}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                    <p className="mt-6 text-2xl">✨📱💰🛒🚀</p>
                                </GlassCard>
                            </section>

                            <section>
                                <SectionTitle title="نتائج إضافية" subtitle="أمثلة حقيقية على الأداء والنمو من حملات تم تنفيذها بنجاح." />
                                {loading ? (
                                    <div className="grid gap-4 md:grid-cols-3">
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <div key={index} className="h-64 animate-pulse rounded-[24px] border border-white/10 bg-white/5" />
                                        ))}
                                    </div>
                                ) : (
                                    <motion.div
                                        className="grid gap-4 md:grid-cols-3"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.15 }}
                                        variants={staggerContainer}
                                    >
                                        {results.map((result) => (
                                            <motion.div key={result.id} variants={buildItem}>
                                                <GlassCard className="h-full p-4 sm:p-5">
                                                    <div className="mb-5 flex items-start justify-between">
                                                        <div>
                                                            <p className="text-sm text-white/55">{result.student_name}</p>
                                                            <p className="mt-2 bg-gradient-to-r from-[#7B3FE4] to-[#00D1FF] bg-clip-text text-3xl font-bold text-transparent">{result.revenue}</p>
                                                        </div>
                                                        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                                            +{result.growth_percent}%
                                                        </span>
                                                    </div>
                                                    <LineChart points={result.chart_points} />
                                                    <p className="mt-4 text-sm leading-7 text-white/65">{result.note}</p>
                                                </GlassCard>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </section>


                            <section>
                                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} transition={{ duration: 0.6 }}>
                                    <GlassCard className="overflow-hidden p-5 sm:p-8">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#7B3FE4]/10 to-[#00D1FF]/10" />
                                        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-2xl font-bold text-white sm:text-3xl">جاهز تكبر مشروعك؟</p>
                                                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/65">خلّيني أحوّل إنفاقك الإعلاني إلى إيراد حقيقي قابل للقياس.</p>
                                            </div>
                                            <a
                                                href="#contact"
                                                className="inline-flex items-center justify-center rounded-[20px] bg-gradient-to-r from-[#7B3FE4] to-[#00D1FF] px-8 py-4 text-base font-bold text-white shadow-[0_0_35px_rgba(0,209,255,0.35)] transition hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(123,63,228,0.45)]"
                                            >
                                                ابدأ الآن 🚀
                                            </a>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            </section>

                            <section id="contact" className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.25 }}
                                    variants={fadeUp}
                                    transition={{ duration: 0.6 }}
                                >
                                    <GlassCard className="h-full p-5 sm:p-6">
                                        <SectionTitle eyebrow="09" title="تواصل معي" subtitle="جاهز أبدأ معك في أي وقت" />
                                        <div className="space-y-3">
                                            <a
                                                href={contactSection?.meta?.whatsapp || 'https://wa.me/201080172165'}
                                                className="flex items-center justify-between rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/85 transition hover:border-emerald-400/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.18)]"
                                            >
                                                <span>واتساب</span>
                                                <MessageCircle className="text-emerald-300" size={18} />
                                            </a>
                                            <a
                                                href={contactSection?.meta?.instagram || 'https://www.instagram.com/abdo_mo20022'}
                                                target="_blank" rel="noopener noreferrer"
                                                className="flex items-center justify-between rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/85 transition hover:border-fuchsia-400/40 hover:shadow-[0_0_25px_rgba(217,70,239,0.18)]"
                                            >
                                                <span>إنستجرام — @abdo_mo20022</span>
                                                <Instagram className="text-fuchsia-300" size={18} />
                                            </a>
                                            <a
                                                href="mailto:apdelrahman3rt@gmail.com"
                                                className="flex items-center justify-between rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/85 transition hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(0,209,255,0.18)]"
                                            >
                                                <span>البريد الإلكتروني — apdelrahman3rt@gmail.com</span>
                                                <Mail className="text-cyan-300" size={18} />
                                            </a>
                                            <a
                                                href={contactSection?.meta?.tiktok || 'https://www.tiktok.com/@abdo_nady20'}
                                                target="_blank" rel="noopener noreferrer"
                                                className="flex items-center justify-between rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/85 transition hover:border-pink-400/40 hover:shadow-[0_0_25px_rgba(244,114,182,0.18)]"
                                            >
                                                <span>تيك توك — @abdo_nady20</span>
                                                <Music2 className="text-pink-300" size={18} />
                                            </a>
                                        </div>
                                    </GlassCard>
                                </motion.div>

                                <motion.form
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.25 }}
                                    variants={fadeUp}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    onSubmit={submitMessage}
                                >
                                    <GlassCard className="p-5 sm:p-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2 block text-sm text-white/65">الاسم</label>
                                                <input
                                                    value={form.name}
                                                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                                                    className="w-full rounded-[18px] border border-white/10 bg-[#11131A] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-400/40 focus:shadow-[0_0_0_4px_rgba(0,209,255,0.08),0_0_24px_rgba(0,209,255,0.12)]"
                                                    placeholder="اكتب اسمك"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm text-white/65">رسالتك</label>
                                                <textarea
                                                    value={form.message}
                                                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                                                    className="min-h-[180px] w-full rounded-[18px] border border-white/10 bg-[#11131A] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-400/40 focus:shadow-[0_0_0_4px_rgba(0,209,255,0.08),0_0_24px_rgba(0,209,255,0.12)]"
                                                    placeholder="احكي لي عن مشروعك وهدفك من الإعلانات"
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-[20px] bg-gradient-to-r from-[#7B3FE4] to-[#00D1FF] px-6 py-4 text-sm font-semibold text-white shadow-[0_0_35px_rgba(0,209,255,0.35)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                                            >
                                                {submitting ? 'جاري الإرسال...' : 'أرسل رسالتك'}
                                                <Send size={18} />
                                            </button>
                                            {success ? <p className="text-center text-sm text-cyan-200">{success}</p> : null}
                                        </div>
                                    </GlassCard>
                                </motion.form>
                            </section>

                            <footer className="pb-4 pt-2 text-center text-xs text-white/35 sm:text-sm">
                                © 2025 أحمد محرم
                            </footer>
                        </main>
                    </div>
                </div>
            </div>}
        </>
    );
}
