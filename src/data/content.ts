import { BarChart3, Briefcase, Calendar, DollarSign, MapPin, Target, TrendingUp, type LucideIcon } from 'lucide-react';

export type SiteContent = {
    section_key: string;
    title: string | null;
    subtitle: string | null;
    body: string | null;
    cta_primary: string | null;
    cta_secondary: string | null;
    meta: Record<string, any> | null;
};

export type StudentResult = {
    id: number;
    student_name: string;
    revenue: string;
    growth_percent: number;
    chart_points: number[];
    note: string;
    sort_order: number;
};

export type Testimonial = {
    id: number;
    name: string;
    review: string;
    avatar_url: string;
    role: string;
    sort_order: number;
};

export type ContactMessage = {
    id: number;
    name: string;
    message: string;
    created_at: string;
};

export const heroSkills = [
    'إعلانات Meta',
    'إعلانات TikTok',
    'إعلانات Snapchat',
    'تحسين العائد على الإنفاق الإعلاني',
    'اختبارات أ/ب',
    'تحليل البيانات',
    'إعداد الـ Pixel',
    'توسيع الحملات',
    'تحسين معدل التحويل',
    'التجارة الإلكترونية',
    'إعادة الاستهداف',
    'التسويق الأدائي',
    'اختبار الـ Creative',
    'تحسين الميزانية',
    'بحث الجمهور',
];

export const profileFacts = [
    { icon: MapPin, label: 'الموقع', value: 'القاهرة، المعادي' },
    { icon: Calendar, label: 'تاريخ الميلاد', value: '28 أغسطس 2003' },
    { icon: Briefcase, label: 'نوع العمل', value: 'Freelancer' },
];

export const skillGroups = [
    {
        title: 'منصات الإعلانات',
        items: [
            { label: 'إعلانات Meta (Facebook وInstagram)', value: 92 },
            { label: 'إعلانات TikTok', value: 85 },
            { label: 'إعلانات Snapchat', value: 80 },
            { label: 'تحسين العائد على الإنفاق الإعلاني', value: 91 },
        ],
    },
    {
        title: 'مهارات النمو',
        items: [
            { label: 'اختبارات أ/ب', value: 88 },
            { label: 'التتبع وإعداد الـ Pixel', value: 87 },
            { label: 'توسيع الحملات', value: 86 },
            { label: 'تحليل البيانات والتقارير', value: 90 },
        ],
    },
];

export const skillTags = [
    'مدير إعلانات Meta',
    'مدير أعمال TikTok',
    'إعلانات Snapchat',
    'اختبارات أ/ب',
    'العائد على الإنفاق الإعلاني',
    'إعادة الاستهداف',
    'الجماهير المشابهة',
    'تحسين معدل التحويل',
    'تحليل البيانات',
    'إعداد الـ Pixel',
    'توسيع الحملات',
    'اختبار الـ Creative',
    'إدارة الميزانية',
    'التجارة الإلكترونية',
];

export const experiencePoints = [
    { text: 'إدارة الحملات الإعلانية على Meta (Facebook وInstagram) وTikTok وSnapchat', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
    { text: 'اختبار عدة Creatives وجماهير وعروض للوصول إلى أفضل تركيبة رابحة', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { text: 'متابعة يومية للحملات واتخاذ القرارات بناءً على البيانات', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80' },
    { text: 'تحسين معدل التحويل وتقليل تكلفة النتيجة', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
    { text: 'توسيع الحملات الناجحة مع الحفاظ على عائد قوي على الإنفاق الإعلاني', image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=600&q=80' },
    { text: 'إعداد وإدارة أدوات التتبع لضمان جمع بيانات دقيقة', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80' },
    { text: 'تقديم تقارير أداء واضحة مع توصيات عملية قابلة للتنفيذ', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
];

export const platformCards = [
    {
        title: 'إعلانات Meta',
        subtitle: 'إعلانات Facebook وInstagram',
        bullets: ['جماهير مخصصة', 'جماهير مشابهة', 'حملات إعادة الاستهداف', 'إعداد الـ Pixel والتتبع', 'توسيع الحملات'],
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
        imageClassName: 'object-contain p-6 bg-white',
    },
    {
        title: 'إعلانات TikTok',
        subtitle: 'أداء قوي في الفيديوهات القصيرة',
        bullets: ['إعلانات داخل الخلاصة', 'إعلانات Spark', 'حملات TopView', 'اختبار الـ Creative', 'إعداد TikTok Pixel', 'استهداف الجيل الجديد'],
        image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg',
        imageClassName: 'object-contain p-8 bg-black',
    },
    {
        title: 'إعلانات Snapchat',
        subtitle: 'منصة مثالية للوصول للشباب',
        bullets: ['إعلانات القصص', 'إعلانات المجموعات', 'الإعلانات الديناميكية', 'حملات عدسات الواقع المعزز', 'إعداد Snapchat Pixel', 'استهداف الفئة الشابة'],
        image: 'https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg',
        imageClassName: 'object-contain p-8 bg-[#FFFC00]',
    },
];

export const services = [
    { emoji: '🎯', title: 'Campaign Management', text: 'إدارة كاملة لحملاتك الإعلانية على Meta وTikTok وSnapchat بأعلى كفاءة ممكنة.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
    { emoji: '📊', title: 'Data Analysis & Reporting', text: 'تقارير يومية وأسبوعية وشهرية برؤية واضحة وتوصيات قابلة للتنفيذ.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { emoji: '📈', title: 'Campaign Scaling', text: 'تنمية الحملات الرابحة تدريجيًا مع الحفاظ على العائد على الإنفاق الإعلاني والأداء المستهدف.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
    { emoji: '🧪', title: 'A/B Testing', text: 'اختبار منظم لللـ Creatives والجماهير والعروض للوصول لأفضل تركيبة تحقق النتائج.', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80' },
    { emoji: '⚙️', title: 'Tracking Setup', text: 'ضبط الـ Pixel وأدوات التتبع بدقة لضمان بيانات نظيفة وقرارات واثقة.', image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=600&q=80' },
    { emoji: '💡', title: 'Marketing Consulting', text: 'استراتيجية إعلانية كاملة مناسبة لنوع منتجك وجمهورك المستهدف.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80' },
];

export const systems = [
    { text: 'بناء وتوسيع أنظمة تسويق كاملة عبر مراحل الـ Funnel لمجالات متعددة', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80' },
    { text: 'تطبيق التتبع من جهة الخادم للوصول لأعلى دقة ممكنة في البيانات', image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=600&q=80' },
    { text: 'إنشاء أنظمة إعادة استهداف تربط بين الإعلانات والمحتوى والعروض', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
    { text: 'تطوير أطر قوية لاختبار الـ Creative واكتشاف الحملات الرابحة بشكل مستمر', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80' },
    { text: 'إدارة حملات ضخمة متعددة المنصات في نفس الوقت (Meta + Google + TikTok)', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
];

export const industries = [
    { emoji: '🍽', title: 'المطاعم والكافيهات', text: 'إدارة أكثر من 60 Brand محلي وتحقيق نمو في الإيرادات من 150% إلى 300% مع عروض افتتاح قوية ملأت الحجوزات خلال 48 ساعة.', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80' },
    { emoji: '🛍', title: 'التجارة الإلكترونية', text: 'توسيع متاجر من الصفر حتى أكثر من 250 ألف دولار شهريًا مع إدارة إنفاق إعلاني يتجاوز 200 ألف دولار والحفاظ على عائد قوي على الإنفاق الإعلاني.', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80' },
    { emoji: '👕', title: 'علامات الأزياء', text: 'رفع المبيعات من 10 آلاف إلى 120 ألف دولار شهريًا خلال 4 شهور فقط مع تقليل تكلفة الاكتساب بنسبة 45% من خلال اختبار مكثف للـ Creative.', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80' },
    { emoji: '💄', title: 'الجمال والعناية بالبشرة', text: 'تحقيق أكثر من 500 ألف دولار إيرادات باستخدام استراتيجيات هجينة بين المؤثرين والمحتوى الذي ينشئه المستخدم للوصول إلى معدل نقر قوي جدًا.', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80' },
    { emoji: '🏥', title: 'العيادات الطبية', text: 'إدارة أكثر من 30 عيادة وتوLead أكثر من 10,000 عميل محتمل مؤهل مع خفض تكلفة العميل المحتمل بنسبة 50% عبر مسارات تحويل أكثر ذكاءً.', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80' },
    { emoji: '🏢', title: 'العقارات', text: 'توLead عملاء محتملين ذوي قيمة عالية وبناء مسارات تحويل على واتساب مع تقليل تكلفة العميل المحتمل بنسبة 40% واستهداف المستثمر الجاهز للشراء.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
    { emoji: '🏋️‍♂️', title: 'الجيم واللياقة', text: 'زيادة الاشتراكات بنسبة 200% خلال 3 شهور عبر استهداف محلي وعروض موسمية عالية التحويل.', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
    { emoji: '🎓', title: 'الCourseات الOnline', text: 'إطلاق وتوسيع المنتجات الرقمية وبناء مسارات تحويل للندوات التعليمية عالية التحويل بتكلفة اكتساب منخفضة جدًا.', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80' },
    { emoji: '🍔', title: 'توصيل الطعام', text: 'زيادة الطلبات اليومية بنسبة 180% من خلال استغلال أوقات الذروة والعروض السريعة والإلحاح البيعي.', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80' },
    { emoji: '🚗', title: 'الخدمات المحلية', text: 'توLead Leads يومية ثابتة لخدمات السيارات والتعليم والصيانة وغيرها من الأنشطة المحلية.', image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?auto=format&fit=crop&w=600&q=80' },
];

export const courses = [
    { emoji: '🎓', title: 'التسويق الرقمي', subtitle: 'التسويق الرقمي', badge: 'مسار تدريبي', mentor: '🎯 Udacity - مبادرة مستقبلنا رقمي', text: 'برنامج متكامل يغطي تحسين محركات البحث والتسويق عبر محركات البحث والسوشيال ميديا وصناعة المحتوى والتسويق بالبريد الإلكتروني والتحليلات.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
    { emoji: '🚀', title: 'التسويق الرقمي', subtitle: 'اختراق النمو', badge: 'النمو', mentor: '🎯 Growth Hacking', text: 'منهجيات متقدمة في النمو السريع، وتحسين الاحتفاظ، وبناء استراتيجيات توسع فعالة.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { emoji: '📊', title: 'تحليلات التسويق', subtitle: 'التحليلات', badge: 'تحليلات', mentor: '🎯 م/ إيهاب شفيق', text: 'تعمق في تحليلات التسويق وقراءة البيانات وقياس الحملات وبناء تقارير الأداء.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { emoji: '💰', title: 'الـ Media Buying', subtitle: 'شراء الإعلانات', badge: 'النمو', mentor: '🎯 Growth Hacking', text: 'أساسيات الـ Media Buying من بحث الجمهور إلى استراتيجيات المزايدة وتوزيع الميزانية وتحسين الحملات.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { emoji: '🔍', title: 'إعلانات Google', subtitle: 'إعلانات Google', badge: 'Udemy', mentor: '🎯 Udemy', text: 'إتقان حملات إعلانات Google في البحث والعرض والتسوق والفيديو مع التتبع والتحسين المتقدم.', image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=600&q=80' },
    { emoji: '👻', title: 'إعلانات Snapchat', subtitle: 'الإعلانات المدفوعة', badge: 'Snapchat', mentor: '🎯 م/ محمود سعيد', text: 'فهم كامل لمنظومة Snapchat الإعلانية من إعلانات القصص إلى الإعلانات الديناميكية وSnapchat Pixel واستراتيجيات الاستهداف.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
    { emoji: '🎵', title: 'إعلانات TikTok', subtitle: 'الإعلانات المدفوعة', badge: 'TikTok', mentor: '🎯 م/ محمود داوود', text: 'إعلانات داخل الخلاصة وإعلانات Spark وTopView مع اختبار الـ Creative وإعداد TikTok Pixel للتجارة الإلكترونية.', image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=600&q=80' },
    { emoji: '⚡', title: 'تحسين معدل التحويل', subtitle: 'تحسين التحويل', badge: 'تحويل', mentor: '🎯 م/ محمد نعمة الله', text: 'تحسين صفحات الهبوط واختبارات أ/ب وتحليل مسار التحويل والسلوك لرفع معدلات التحويل.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { emoji: '🧠', title: 'Course تغيير العقلية', subtitle: 'الاستراتيجية والعقلية', badge: 'عقلية', mentor: '🎯 عقلية الـ Media Buyer', text: 'التفكير بعقلية Media Buyer محترف: استراتيجيات اتخاذ القرار، والتعامل مع الضغط، وحل المشكلات بذكاء.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { emoji: '📈', title: 'Google Analytics 4', subtitle: 'التحليلات', badge: 'تحليلات', mentor: '🎯 م/ إيهاب شفيق', text: 'Google Analytics 4 من الإعداد حتى الاحتراف: الأحداث والتحويلات والجماهير ومسارات التحويل والتقارير.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { emoji: '🏷️', title: 'مدير الوسوم من Google', subtitle: 'التتبع والتقنية', badge: 'تتبع', mentor: '🎯 م/ إبراهيم هنداوي', text: 'إتقان مدير الوسوم من Google في تركيب الـ Pixels والأحداث والمحفزات والتتبع من جهة الخادم.', image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=600&q=80' },
];

export const whyMe = [
    'قرارات مبنية على البيانات وليس التخمين',
    'متابعة يومية وتحسين مستمر',
    'شفافية كاملة في النتائج',
    'تركيز على الربح الحقيقي وليس الأرقام الوهمية',
];

export const staticSiteContent: SiteContent[] = [
    {
        section_key: 'contact',
        title: 'تواصل معي',
        subtitle: 'جاهز أبدأ معك في أي وقت',
        body: 'قسم التواصل',
        cta_primary: null,
        cta_secondary: null,
        meta: {
            whatsapp: 'https://wa.me/201080172165',
            instagram: 'https://www.instagram.com/abdo_mo20022?igsh=MTdnd21kZGw1NDJ0ag%3D%3D',
            tiktok: 'https://www.tiktok.com/@abdo_nady20?_r=1&_t=ZS-95IDpAU5nR2',
        },
    },
];

export const staticStudentResults: StudentResult[] = [
    {
        id: 1,
        student_name: 'محمد خالد',
        revenue: '$12,540',
        growth_percent: 186,
        chart_points: [12, 18, 24, 33, 48, 65, 82],
        note: 'بعد أول 6 أسابيع من تطبيق الاستراتيجية، قدر يحقق أول نتائج مستقرة ويقفل عملاء بعائد واضح.',
        sort_order: 1,
    },
    {
        id: 2,
        student_name: 'سارة أحمد',
        revenue: '$8,920',
        growth_percent: 143,
        chart_points: [10, 14, 22, 28, 39, 51, 67],
        note: 'انتقلت من تنفيذ عشوائي إلى حملات مبنية على تحليل وأصبحت تحقق نتائج أقوى بتكلفة أقل.',
        sort_order: 2,
    },
    {
        id: 3,
        student_name: 'عمر هشام',
        revenue: '$21,300',
        growth_percent: 228,
        chart_points: [8, 12, 17, 29, 44, 73, 96],
        note: 'طبّق نظام التوسيع داخل الخطة ورفع الأداء بشكل ملحوظ مع تحكم أفضل في الميزانية.',
        sort_order: 3,
    },
];

export const staticTestimonials: Testimonial[] = [
    {
        id: 1,
        name: 'يوسف علي',
        review: 'الشغل فرق معايا جدًا، أخيرًا فهمت إزاي أبني حملة صح وأقرأ الأرقام بدل ما أشتغل بشكل عشوائي.',
        avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        role: 'صاحب متجر إلكتروني',
        sort_order: 1,
    },
    {
        id: 2,
        name: 'مريم سمير',
        review: 'أكتر حاجة عجبتني إن التنفيذ عملي جدًا. بدأت أطبق فورًا وجبت أول عميل أسرع من المتوقع.',
        avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        role: 'Media Buyer مبتدئة',
        sort_order: 2,
    },
    {
        id: 3,
        name: 'عبدالله ناصر',
        review: 'التنظيم ممتاز وحقيقي حسيت إن عندي خريطة واضحة بدل التشتت اللي كنت فيه قبل كده.',
        avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        role: 'Freelancer',
        sort_order: 3,
    },
];

export const staticMessages: ContactMessage[] = [
    {
        id: 1,
        name: 'أحمد من الرياض',
        message: 'حابب أعرف هل الخدمة مناسبة لو لسه مبتدئ وما عنديش خبرة عملية؟',
        created_at: '2025-01-10T10:00:00Z',
    },
    {
        id: 2,
        name: 'سلمى من القاهرة',
        message: 'ممكن تفاصيل أكتر عن طريقة الشغل وهل فيه متابعة بعد البداية؟',
        created_at: '2025-01-11T12:00:00Z',
    },
];

export const statsCards: { number: string; label: string; icon: LucideIcon }[] = [
    { number: '2M+', label: 'إيرادات تم تحقيقها ($)', icon: DollarSign },
    { number: 'ستة أرقام', label: 'ميزانيات إعلانية تمت إدارتها', icon: BarChart3 },
    { number: '8 أضعاف', label: 'أعلى عائد على الإنفاق الإعلاني', icon: TrendingUp },
    { number: '60%', label: 'خفض في تكلفة الاكتساب', icon: Target },
];
