const fs = require('fs');
const files = ['f:\\كوتش\\cv\\src\\data\\content.ts', 'f:\\كوتش\\cv\\src\\App.tsx'];

const dict = {
    'فريلانسر': 'Freelancer',
    'الكريتيفات': 'الـ Creatives',
    'الكريتيف': 'الـ Creative',
    'لكريتيفات': 'للـ Creatives',
    'للكريتيفات': 'للـ Creatives',
    'للكريتيف': 'للـ Creative',
    'لكريتيف': 'للـ Creative',
    'بكريتيف': 'بـ Creative',
    'كريتيفات': 'Creatives',
    'كريتيف': 'Creative',
    
    'البيكسلات': 'الـ Pixels',
    'البيكسل': 'الـ Pixel',
    'بيكسل تيك توك': 'TikTok Pixel',
    'بيكسل سناب': 'Snapchat Pixel',
    'بيكسل': 'Pixel',
    
    'الميديا باينج': 'الـ Media Buying',
    'ميديا باينج': 'Media Buying',
    
    'الميديا باير': 'الـ Media Buyer',
    'ميديا باير': 'Media Buyer',
    
    'جروث هاكينج': 'Growth Hacking',
    
    'الفانل': 'الـ Funnel',
    'فانل': 'Funnel',
    
    'ليدات': 'Leads',
    'ليد': 'Lead',
    
    'براندات': 'Brands',
    'براند': 'Brand',
    
    'أونلاين': 'Online',
    
    'يوداسيتي': 'Udacity',
    'يوديمي': 'Udemy',
    'سناب شات': 'Snapchat',
    'تيك توك': 'TikTok',
    'جوجل أناليتكس': 'Google Analytics',
    
    'كورس': 'Course',
    
    'توب فيو': 'TopView',
    'سبارك': 'Spark',

    'سناب': 'Snapchat',
    'فيسبوك': 'Facebook',
    'إنستجرام': 'Instagram',
    'ميتا': 'Meta',
    'جوجل': 'Google'
};

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    for (const [ar, en] of Object.entries(dict)) {
        const regex = new RegExp(ar, 'g');
        content = content.replace(regex, en);
    }
    fs.writeFileSync(file, content);
});
console.log('Replacement done');
