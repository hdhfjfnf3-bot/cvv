import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RoasCalculator() {
    const [budget, setBudget] = useState(5000);
    const [animatedRevenue, setAnimatedRevenue] = useState(0);

    // Numbers tuned for highly professional e-com/lead-gen results
    const ROAS = 8.5;  // 8.5x ROAS
    const AOV = 9;     // Low AOV = higher sales volume

    const expectedRevenue = Math.floor(budget * ROAS);
    const expectedSales = Math.floor(expectedRevenue / AOV);

    // Number animation effect
    useEffect(() => {
        let current = animatedRevenue;
        const target = expectedRevenue;
        if (current === target) return;

        const delta = (target - current) / 15; // Smooth spring-like update
        const interval = setInterval(() => {
            current += delta;
            if (Math.abs(target - current) < 10) {
                setAnimatedRevenue(target);
                clearInterval(interval);
            } else {
                setAnimatedRevenue(current);
            }
        }, 16);

        return () => clearInterval(interval);
    }, [expectedRevenue, animatedRevenue]);

    return (
        <section className="relative overflow-hidden rounded-[30px] border border-cyan-400/20 bg-gradient-to-br from-black/60 to-[#0B0B0F]/80 p-6 sm:p-10 shadow-[0_0_40px_rgba(0,209,255,0.08)] backdrop-blur-xl my-10">
            {/* Glow effects */}
            <div className="absolute top-0 right-0 -m-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -m-20 h-64 w-64 rounded-full bg-[#7B3FE4]/15 blur-[80px] pointer-events-none" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                
                {/* Left side: Inputs */}
                <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        أداة حصرية للعملاء
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        حاسبة الأرباح التفاعلية 🧮
                    </h3>
                    <p className="text-sm leading-7 text-white/65 mb-8">
                        اكتشف شكل الأرقام لما تستثمر ميزانيتك الإعلانية مع استراتيجيات مبنية على الداتا. اسحب المؤشر وحدد ميزانيتك الشهرية وجرب بنفسك!
                    </p>

                    <div className="mb-6">
                        <div className="flex justify-between items-end mb-4">
                            <label className="text-base font-semibold text-white/80">الميزانية الإعلانية (شهرياً)</label>
                            <span className="text-2xl font-bold text-white bg-white/5 px-4 py-1.5 rounded-[14px] border border-white/10">
                                ${budget.toLocaleString()}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="500"
                            max="50000"
                            step="500"
                            value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))}
                            className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00D1FF]"
                            style={{
                                background: `linear-gradient(to left, #00D1FF 0%, #7B3FE4 ${(budget / 50000) * 100}%, rgba(255,255,255,0.1) ${(budget / 50000) * 100}%, rgba(255,255,255,0.1) 100%)`
                            }}
                        />
                        <div className="flex justify-between text-xs text-white/40 mt-3 font-mono">
                            <span>$50,000</span>
                            <span>$500</span>
                        </div>
                    </div>
                </div>

                {/* Right side: Outputs */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    
                    {/* Revenue Card - Spans 2 columns on small/xl to be visually bigger */}
                    <motion.div 
                        key={expectedRevenue}
                        initial={{ scale: 0.95, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="sm:col-span-2 relative overflow-hidden rounded-[24px] border border-emerald-400/20 bg-emerald-400/5 p-6 shadow-[inset_0_0_20px_rgba(52,211,153,0.05)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent opacity-50" />
                        <p className="relative z-10 text-sm font-medium text-emerald-200/70 mb-2 tracking-wide">الإيرادات المتوقعة (Revenue)</p>
                        <p className="relative z-10 text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 drop-shadow-lg">
                            ${Math.round(animatedRevenue).toLocaleString()}
                        </p>
                    </motion.div>

                    <div className="rounded-[20px] border border-white/10 bg-black/40 p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-gradient-to-br from-[#7B3FE4]/30 to-[#00D1FF]/20 rounded-lg text-cyan-300">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            </div>
                            <p className="text-xs text-white/50">متوسط ROAS</p>
                        </div>
                        <p className="text-2xl font-bold text-white">{ROAS}x</p>
                    </div>

                    <div className="rounded-[20px] border border-white/10 bg-black/40 p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-gradient-to-br from-[#7B3FE4]/30 to-[#00D1FF]/20 rounded-lg text-[#7B3FE4]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                            </div>
                            <p className="text-xs text-white/50">مبيعات متوقعة</p>
                        </div>
                        <p className="text-2xl font-bold text-white">+{expectedSales.toLocaleString()}</p>
                    </div>

                </div>
            </div>
            
            <p className="relative z-10 mt-6 text-center text-[10px] sm:text-xs text-white/30">
                * هذه الأرقام هي متوسطات تقريبية مبنية على الأداء السابق، وقد تختلف باختلاف جودة المنتج ونوع السوق.
            </p>
        </section>
    );
}
