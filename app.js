/* ============================================================
   HSC Syllabus Tracker (Engineering) — app.js  v5.0
   New: Status (running/done), Deadline (next 10 days),
   Today's Checklist on Dashboard, corrected chapter list
   ============================================================ */

// ── SYLLABUS DATA ─────────────────────────────────────────────
const SUBJECTS = {
    physics: {
        label: 'পদার্থবিজ্ঞান', icon: '⚛️', checkboxCount: 4,
        papers: {
            '১ম পত্র': [
                'ভৌত জগৎ ও পরিমাপ',
                'ভেক্টর',
                'গতিবিদ্যা',
                'নিউটনীয় বলবিদ্যা',
                'কাজ, শক্তি ও ক্ষমতা',
                'মহাকর্ষ ও মহাকর্ষীয় ক্ষেত্র',
                'পদার্থের গাঠনিক ধর্ম',
                'পর্যাবৃত্ত গতি',
                'তরঙ্গ',
                'আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব'
            ],
            '২য় পত্র': [
                'তাপগতিবিদ্যা',
                'স্থির তড়িৎ',
                'চলতড়িৎ',
                'তড়িৎ প্রবাহের চৌম্বক ক্রিয়া ও চুম্বকত্ব',
                'তড়িচ্চুম্বকীয় আবেশ ও পরিবর্তী প্রবাহ',
                'জ্যামিতিক আলোকবিজ্ঞান',
                'ভৌত আলোকবিজ্ঞান',
                'আধুনিক পদার্থবিজ্ঞানের সূচনা',
                'পরমাণুর মডেল ও নিউক্লিয়ার পদার্থবিজ্ঞান',
                'সেমিকন্ডাক্টর ও ইলেকট্রনিক্স'
            ]
        }
    },
    chemistry: {
        label: 'রসায়ন', icon: '🧪', checkboxCount: 4,
        papers: {
            '১ম পত্র': [
                'ল্যাবরেটরিতে নিরাপত্তা ও পরিচ্ছন্নতা',
                'গুণগত রসায়ন',
                'মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন',
                'রাসায়নিক পরিবর্তন',
                'কর্মমুখী রসায়ন'
            ],
            '২য় পত্র': [
                'পরিবেশ রসায়ন',
                'জৈব রসায়ন',
                'পরিমাণগত রসায়ন',
                'রাসায়নিক গতিবিদ্যা ও রাসায়নিক সাম্যাবস্থা',
                'তড়িৎ রসায়ন'
            ]
        }
    },
    math: {
        label: 'উচ্চতর গণিত', icon: '📐', checkboxCount: 4,
        papers: {
            '১ম পত্র': [
                'ম্যাট্রিক্স ও নির্ণায়ক',
                'ভেক্টর',
                'সরলরেখা',
                'বৃত্ত',
                'বিন্যাস ও সমাবেশ',
                'ত্রিকোণমিতিক অনুপাত',
                'সংযুক্ত কোণের ত্রিকোণমিতিক অনুপাত',
                'ফাংশন ও ফাংশনের লেখচিত্র',
                'অন্তরীকরণ',
                'যোগজীকরণ'
            ],
            '২য় পত্র': [
                'বাস্তব সংখ্যা ও অসমতা',
                'যোগাশ্রয়ী প্রোগ্রামিং',
                'জটিল সংখ্যা',
                'বহুপদী ও বহুপদী সমীকরণ',
                'দ্বিপদী বিস্তৃতি',
                'কনিক',
                'বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ',
                'স্থিতিবিদ্যা',
                'সমতলে বস্তুকণার গতি',
                'বিস্তার পরিমাপ ও সম্ভাবনা'
            ]
        }
    },
    biology: {
        label: 'জীববিজ্ঞান', icon: '🌿', checkboxCount: 2,
        papers: {
            '১ম পত্র (উদ্ভিদবিজ্ঞান)': [
                'কোষ ও এর গঠন',
                'কোষ বিভাজন',
                'কোষ রসায়ন',
                'অণুজীব',
                'শৈবাল ও ছত্রাক',
                'ব্রায়োফাইটা ও টেরিডোফাইটা',
                'নগ্নবীজী ও আবৃতবীজী উদ্ভিদ',
                'টিস্যু ও টিস্যুতন্ত্র',
                'উদ্ভিদের শারীরতত্ত্ব',
                'উদ্ভিদের প্রজনন',
                'জীবপ্রযুক্তি'
            ],
            '২য় পত্র (প্রাণিবিজ্ঞান)': [
                'প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস',
                'মানব শারীরতত্ত্ব: পরিপাক ও শোষণ',
                'মানব শারীরতত্ত্ব: রক্ত ও সংবহন',
                'মানব শারীরতত্ত্ব: শ্বসন ও শ্বাসক্রিয়া',
                'মানব শারীরতত্ত্ব: রেচন প্রক্রিয়া',
                'মানব শারীরতত্ত্ব: চলন ও অঙ্গসঞ্চালন',
                'মানব শারীরতত্ত্ব: স্নায়বিক সমন্বয় ও অন্তঃক্ষরা তন্ত্র',
                'মানব শারীরতত্ত্ব: জনন ও পরিস্ফুটন',
                'বংশগতি ও বিবর্তন',
                'জীবের পরিবেশ, বিস্তার ও সংরক্ষণ',
                'মানব কল্যাণে প্রাণিবিজ্ঞান'
            ]
        }
    },
    bangla: {
        label: 'বাংলা', icon: '🖊️', checkboxCount: 2,
        papers: {
            'গদ্য': [
                'বাংলার নব্য লেখকদের প্রতি নিবেদন — বঙ্কিমচন্দ্র চট্টোপাধ্যায়',
                'অপরিচিতা — রবীন্দ্রনাথ ঠাকুর',
                'বিলাসী — শরৎচন্দ্র চট্টোপাধ্যায়',
                'আহ্বান — বিভূতিভূষণ বন্দ্যোপাধ্যায়',
                'আমার পথ — কাজী নজরুল ইসলাম',
                'মাসি-পিসি — মানিক বন্দ্যোপাধ্যায়',
                'বায়ান্নর দিনগুলি — শেখ মুজিবুর রহমান',
                'জাদুঘরে কেন যাব — আনিসুজ্জামান',
                'রেইনকোট — আখতারুজ্জামান ইলিয়াস',
                'মহাজাগতিক কিউরেটর — মুহম্মদ জাফর ইকবাল',
                'নেকলেস — গি দ্য মোপাসাঁ'
            ],
            'কবিতা': [
                'বিভীষণের প্রতি মেঘনাদ — মাইকেল মধুসূদন দত্ত',
                'সোনার তরী — রবীন্দ্রনাথ ঠাকুর',
                'বিদ্রোহী — কাজী নজরুল ইসলাম',
                'প্রতিদান — জসীমউদ্দীন',
                'তাহারেই পড়ে মনে — সুফিয়া কামাল',
                'ফেব্রুয়ারি ১৯৬৯ — শামসুর রাহমান',
                'আমি কিংবদনন্তির কথা বলছি — আবু জাফর ওবায়দুল্লাহ',
                'নুরুলদীনের কথা মনে পড়ে যায় — সৈয়দ শামসুল হক',
                'রক্তে আমার অনাদি অস্থি — আবুল হাসান'
            ],
            'সহপাঠ': [
                'লালসালু (উপন্যাস) — সৈয়দ ওয়ালীউল্লাহ্',
                'সিরাজউদ্দৌলা (নাটক) — সিকান্দার আবু জাফর'
            ],
            'ব্যাকরণ ও নির্মিতি': [
                'উচ্চারণ ও বানান',
                'ব্যাকরণিক শব্দশ্রেণি',
                'বাক্যতত্ত্ব',
                'আবেদনপত্র/ইমেইল',
                'প্রতিবেদন',
                'সারাংশ/সারমর্ম',
                'ভাবসম্প্রসারণ',
                'সংলাপ/অনুবাদ'
            ]
        }
    },
    english: {
        label: 'English', icon: '🌐', checkboxCount: 2,
        papers: {
            'Reading (1st Paper)': [
                'Unit 1: Nelson Mandela',
                'Unit 2: Dreams & Dreamers',
                'Unit 3: Traffic Education',
                'Unit 4: Food Adulteration',
                'Unit 5: Adolescence',
                'Unit 6: Diaspora',
                'Unit 7: The River',
                'Unit 8: Devotion',
                'Unit 9: Digital Bangladesh',
                'Unit 10: Renewable Energy',
                'Unit 11: Heritage',
                'Unit 12: Nakshi Kantha'
            ],
            'Writing Skills (2nd Paper)': [
                'Formal Letter',
                'Application / Email',
                'Paragraph Writing',
                'Essay / Composition',
                'Summary Writing',
                'Report Writing',
                'Dialogue Writing',
                'Graph / Chart Description',
                'CV / Resume'
            ]
        }
    },
    ict: {
        label: 'তথ্য ও যোগাযোগ প্রযুক্তি', icon: '💻',
        checkboxCount: 2,
        papers: {
            'অধ্যায়': [
                'তথ্য ও যোগাযোগ প্রযুক্তি: বিশ্ব ও বাংলাদেশ',
                'কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং',
                'সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস',
                'ওয়েব ডিজাইন ও HTML',
                'প্রোগ্রামিং ভাষা (C)',
                'ডেটাবেজ ম্যানেজমেন্ট সিস্টেম'
            ]
        }
    }
};

// ── TIME-AWARE QUOTES ─────────────────────────────────────────
const QUOTES = {
    morning: [
        { text: 'আজকের এই ছোট ছোট টিকমার্কই তোমাকে পৌঁছে দেবে স্বপ্নের লাল দালানে।', cat: '🎯 স্বপ্ন যখন বুয়েট' },
        { text: 'পলাশীর মোড়ের রাস্তাটা তোমার শেষ করা অধ্যায়গুলো দিয়েই তৈরি।', cat: '🎯 স্বপ্ন যখন বুয়েট' },
        { text: 'কঠিন অঙ্কটা মিলিয়ে ফেলা মানেই তোমার সিটটা আরেকটু নিশ্চিত করা।', cat: '🎯 স্বপ্ন যখন বুয়েট' },
        { text: 'শুধু সূত্র মুখস্থ করো না, একজন ইঞ্জিনিয়ারের মতো প্রয়োগ করতে শিখো।', cat: '⚙️ ইঞ্জিনিয়ারিং মাইন্ডসেট' },
        { text: 'ফিউচার ইঞ্জিনিয়ার, পড়তে বসো।', cat: '📌 শর্ট মেসেজ' },
        { text: 'আজকের দিনটা কাজে লাগাও।', cat: '📌 শর্ট মেসেজ' },
    ],
    day: [
        { text: 'সাফল্য কোনো মিরাকল নয়, এটি তোমার প্রতিদিনের অভ্যাসের এক জটিল সমীকরণ।', cat: '⚙️ ইঞ্জিনিয়ারিং মাইন্ডসেট' },
        { text: 'পুরো সিলেবাসকে একটা জটিল সার্কিট ভাবো, একবারে একটা লুপ সলভ করো।', cat: '⚙️ ইঞ্জিনিয়ারিং মাইন্ডসেট' },
        { text: 'থেমে গেলেই এন্ট্রপি বাড়বে। মোমেন্টাম ধরে রাখো।', cat: '⚙️ ইঞ্জিনিয়ারিং মাইন্ডসেট' },
        { text: 'প্রতিযোগীরা যখন ঘুমাচ্ছে, তুমি তখন ট্র্যাকার আপডেট করছো — পার্থক্যটা এখানেই।', cat: '🎯 স্বপ্ন যখন বুয়েট' },
        { text: 'টার্গেট: বুয়েট।', cat: '📌 শর্ট মেসেজ' },
        { text: 'আর একটা টপিক?', cat: '📌 শর্ট মেসেজ' },
        { text: 'একদিনের অতি-পড়াশোনার চেয়ে প্রতিদিনের অল্প পড়াশোনা অনেক বেশি দামী।', cat: '🔗 ধারাবাহিকতাই শক্তি' },
        { text: 'সিলেবাস হলো পাহাড়ের মতো, প্রতিদিন একটু একটু করে সরাও।', cat: '🔗 ধারাবাহিকতাই শক্তি' },
        { text: 'চেইনটা ভাঙতে দিও না। তোমার ধারাবাহিকতাই তোমার আসল মেধা।', cat: '🔗 ধারাবাহিকতাই শক্তি' },
        { text: 'মোটিভেশন তোমাকে শুরু করতে সাহায্য করবে, কিন্তু ট্র্যাকার তোমাকে লক্ষ্যে পৌঁছে দেবে।', cat: '🔗 ধারাবাহিকতাই শক্তি' },
    ],
    night: [
        { text: 'ক্লান্ত মস্তিষ্কে ক্যালকুলাস মেলে না। পর্যাপ্ত ঘুম সিলেবাসেরই অংশ।', cat: '💚 সুস্থতা ও মনোযোগ' },
        { text: 'ফিউজ যাতে পুড়ে না যায়, তাই ব্যাটারি রিচার্জ করাও জরুরি।', cat: '💚 সুস্থতা ও মনোযোগ' },
        { text: 'টেবিল গোছাও, মাথা ঠান্ডা রাখো, টপিক শেষ করো।', cat: '💚 সুস্থতা ও মনোযোগ' },
        { text: 'চেইনটা ভাঙতে দিও না। তোমার ধারাবাহিকতাই তোমার আসল মেধা।', cat: '🔗 ধারাবাহিকতাই শক্তি' },
        { text: 'মোটিভেশন তোমাকে শুরু করতে সাহায্য করবে, কিন্তু ট্র্যাকার তোমাকে লক্ষ্যে পৌঁছে দেবে।', cat: '🔗 ধারাবাহিকতাই শক্তি' },
        { text: 'আর একটা টপিক?', cat: '📌 শর্ট মেসেজ' },
    ]
};

function getTimeBasedQuote() {
    const h = new Date().getHours();
    const pool = (h >= 5 && h < 11) ? QUOTES.morning
               : (h < 18)           ? QUOTES.day
                                     : QUOTES.night;
    return pool[Math.floor(Math.random() * pool.length)];
}

// ── THEMES ────────────────────────────────────────────────────
const THEMES = {
    dark: {
        label: '🌑 Dark (ডিফল্ট)',
        vars: {
            '--bg':        '#0d0d18',
            '--surface':   '#171728',
            '--surface2':  '#20203a',
            '--border':    '#2c2c50',
            '--accent':    '#7066ff',
            '--accent2':   '#3ecfca',
            '--green':     '#43d9a2',
            '--red':       '#ff6b6b',
            '--yellow':    '#ffd166',
            '--text':      '#e4e4f4',
            '--text-muted':'#8080aa'
        }
    },
    light: {
        label: '☀️ Light Mode',
        vars: {
            '--bg':        '#f0f2f8',
            '--surface':   '#ffffff',
            '--surface2':  '#e8eaf5',
            '--border':    '#cccde0',
            '--accent':    '#4f46e0',
            '--accent2':   '#0891b2',
            '--green':     '#059669',
            '--red':       '#dc2626',
            '--yellow':    '#b45309',
            '--text':      '#111827',
            '--text-muted':'#4b5563'
        }
    },
    buet: {
        label: '🔴 BUET Red',
        vars: {
            '--bg':        '#0e0406',
            '--surface':   '#1a0609',
            '--surface2':  '#270a0f',
            '--border':    '#420d17',
            '--accent':    '#dc2626',
            '--accent2':   '#f97316',
            '--green':     '#4ade80',
            '--red':       '#f87171',
            '--yellow':    '#fbbf24',
            '--text':      '#fef2f2',
            '--text-muted':'#fca5a5'
        }
    }
};

function applyTheme(themeKey) {
    const theme = THEMES[themeKey] || THEMES.dark;
    const root  = document.documentElement;
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    document.body.dataset.theme = themeKey in THEMES ? themeKey : 'dark';
}

// ── STORAGE ───────────────────────────────────────────────────
const STORAGE_KEY  = 'hscTracker_v2';
const SETTINGS_KEY = 'hscSettings_v4';

// ── STATE ─────────────────────────────────────────────────────
const chapterData    = {};
let   currentPageKey = 'dashboard';
const builtPages     = new Set();
let   settings       = { examDate: '', theme: 'dark' };

// ── INIT ──────────────────────────────────────────────────────
function init() {
    let idx = 0;
    Object.keys(SUBJECTS).forEach(subjectKey => {
        const subj = SUBJECTS[subjectKey];
        Object.keys(subj.papers).forEach(paper => {
            subj.papers[paper].forEach(chapter => {
                chapterData[String(idx++)] = {
                    subjectKey, paper, chapter,
                    cbCount:      subj.checkboxCount,
                    mainBook:     false,
                    testPaper:    false,
                    questionBank: false,
                    guidebook:    false,
                    revision:     0,
                    notes:        '',
                    status:       'not_started',  // 'not_started' | 'running' | 'done'
                    deadline:     ''              // 'YYYY-MM-DD' or ''
                };
            });
        });
    });

    loadSettings();
    applyTheme(settings.theme || 'dark');
    loadData();
    attachListeners();
    updateCountdown();
    setInterval(updateCountdown, 60_000);
    showPage('dashboard');
    updateOverallBadge();
}

// ── PERSISTENCE ───────────────────────────────────────────────
function loadData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const saved = JSON.parse(raw);
        Object.keys(saved).forEach(id => {
            if (!chapterData[id]) return;
            const s = saved[id];
            chapterData[id].mainBook     = !!s.mainBook;
            chapterData[id].testPaper    = !!s.testPaper;
            chapterData[id].questionBank = !!s.questionBank;
            chapterData[id].guidebook    = !!s.guidebook;
            chapterData[id].revision     = Number(s.revision) || 0;
            chapterData[id].notes        = s.notes    || '';
            chapterData[id].status       = s.status   || 'not_started';
            chapterData[id].deadline     = s.deadline || '';
        });
    } catch (_) {}
}

function save() {
    const out = {};
    Object.keys(chapterData).forEach(id => {
        const d = chapterData[id];
        out[id] = {
            mainBook:     d.mainBook,
            testPaper:    d.testPaper,
            questionBank: d.questionBank,
            guidebook:    d.guidebook,
            revision:     d.revision,
            notes:        d.notes,
            status:       d.status,
            deadline:     d.deadline
        };
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(out));
}

function loadSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (raw) settings = { ...settings, ...JSON.parse(raw) };
    } catch (_) {}
}

function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// ── PROGRESS & COMPLETION ─────────────────────────────────────
function calcProgress(id) {
    const d = chapterData[id];
    if (d.cbCount === 4) {
        return (d.mainBook ? 25 : 0) + (d.testPaper ? 25 : 0)
             + (d.questionBank ? 25 : 0) + (d.guidebook ? 25 : 0);
    }
    return (d.mainBook ? 50 : 0) + (d.testPaper ? 50 : 0);
}

function isChapterCompleted(id) {
    const prog = calcProgress(id);
    return chapterData[id].cbCount === 4 ? prog >= 75 : prog === 100;
}

function subjectIds(sk) {
    return Object.keys(chapterData).filter(id => chapterData[id].subjectKey === sk);
}

function subjectProgress(sk) {
    const ids = subjectIds(sk);
    if (!ids.length) return 0;
    return Math.round(ids.reduce((s, id) => s + calcProgress(id), 0) / ids.length);
}

function subjectCompleted(sk) {
    return subjectIds(sk).filter(id => isChapterCompleted(id)).length;
}

function overallProgress() {
    const ids = Object.keys(chapterData);
    if (!ids.length) return 0;
    return Math.round(ids.reduce((s, id) => s + calcProgress(id), 0) / ids.length);
}

function totalRevisions() {
    return Object.keys(chapterData).reduce((s, id) => s + chapterData[id].revision, 0);
}

// ── DATE HELPERS ──────────────────────────────────────────────
function getTodayStr() {
    return new Date().toISOString().split('T')[0];
}

function dateFromToday(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
}

function formatDeadline(dateStr) {
    if (!dateStr) return '';
    const today  = new Date(); today.setHours(0,0,0,0);
    const target = new Date(dateStr + 'T00:00:00');
    const diff   = Math.round((target - today) / 86400000);
    if (diff === 0) return '🔴 আজ শেষ করতে হবে';
    if (diff === 1) return '🟡 আগামীকাল';
    if (diff < 0)   return `⚫ ${Math.abs(diff)} দিন আগে (মিস)`;
    return `🟢 ${diff} দিন বাকি`;
}

// ── COUNTDOWN ─────────────────────────────────────────────────
function updateCountdown() {
    const el = document.getElementById('countdown-display');
    if (!el) return;
    if (!settings.examDate) {
        el.textContent = '📅 পরীক্ষার তারিখ সেট করুন (Settings)';
        return;
    }
    const diff = new Date(settings.examDate + 'T00:00:00') - new Date();
    if (diff <= 0) { el.textContent = '🎉 পরীক্ষা শুরু হয়ে গেছে!'; return; }
    const days  = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    el.textContent = `⏳ HSC পরীক্ষা: ${days} দিন ${hours} ঘণ্টা বাকি`;
}

function updateOverallBadge() {
    const el = document.getElementById('overall-badge');
    if (el) el.textContent = overallProgress() + '%';
}

// ── EVENT LISTENERS ───────────────────────────────────────────
function attachListeners() {
    // Navigation
    document.getElementById('nav-tabs').addEventListener('click', e => {
        const tab = e.target.closest('.nav-tab');
        if (tab) showPage(tab.dataset.page);
    });

    // All change events
    document.addEventListener('change', e => {
        const t = e.target;

        if (t.type === 'checkbox' && t.dataset.id) {
            chapterData[t.dataset.id][t.dataset.field] = t.checked;
            save();
            refreshCardProgress(t.dataset.id);
            refreshSubjectStats(chapterData[t.dataset.id].subjectKey);
            updateOverallBadge();
            if (currentPageKey === 'dashboard') buildDashboard(document.getElementById('dashboard-page'));
        }

        if (t.tagName === 'TEXTAREA' && t.dataset.id) {
            chapterData[t.dataset.id].notes = t.value;
            save();
        }

        if (t.id === 'import-file-input') importData(t);

        if (t.id === 'exam-date-input') {
            settings.examDate = t.value;
            saveSettings();
            updateCountdown();
        }

        if (t.id === 'theme-select') {
            settings.theme = t.value;
            saveSettings();
            applyTheme(t.value);
        }
    });

    // All click events
    document.addEventListener('click', e => {
        // Revision +/-
        const revBtn = e.target.closest('.revision-btn');
        if (revBtn && revBtn.dataset.id) {
            const id = revBtn.dataset.id;
            chapterData[id].revision = Math.max(
                0, Math.min(20, chapterData[id].revision + Number(revBtn.dataset.delta))
            );
            save();
            const card = document.querySelector(`.chapter-card[data-id="${id}"]`);
            if (card) card.querySelector('.revision-value').textContent = chapterData[id].revision;
            return;
        }

        // Status buttons
        const statusBtn = e.target.closest('.status-btn');
        if (statusBtn && statusBtn.dataset.id) {
            const id = statusBtn.dataset.id;
            chapterData[id].status = statusBtn.dataset.status;
            save();
            const card = document.querySelector(`.chapter-card[data-id="${id}"]`);
            if (card) {
                card.querySelectorAll('.status-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.status === chapterData[id].status);
                });
            }
            if (currentPageKey === 'dashboard') buildDashboard(document.getElementById('dashboard-page'));
            return;
        }

        // Deadline quick-day buttons
        const dlBtn = e.target.closest('.deadline-day-btn');
        if (dlBtn && dlBtn.dataset.id) {
            const id   = dlBtn.dataset.id;
            const days = parseInt(dlBtn.dataset.days, 10);
            chapterData[id].deadline = dateFromToday(days);
            save();
            refreshCardDeadline(id);
            if (currentPageKey === 'dashboard') buildDashboard(document.getElementById('dashboard-page'));
            return;
        }

        // Deadline clear
        const dlClear = e.target.closest('.deadline-clear-btn');
        if (dlClear && dlClear.dataset.id) {
            const id = dlClear.dataset.id;
            chapterData[id].deadline = '';
            save();
            refreshCardDeadline(id);
            if (currentPageKey === 'dashboard') buildDashboard(document.getElementById('dashboard-page'));
            return;
        }

        // Notes toggle
        const notesBtn = e.target.closest('.notes-toggle');
        if (notesBtn) {
            const id   = notesBtn.dataset.id;
            const area = document.querySelector(`.notes-area[data-id="${id}"]`);
            if (!area) return;
            area.classList.toggle('open');
            notesBtn.textContent = area.classList.contains('open')
                ? '📝 নোট বন্ধ করুন'
                : '📝 নোট লিখুন / দেখুন';
            if (area.classList.contains('open')) area.focus();
            return;
        }

        // Dashboard subject row → navigate
        const row = e.target.closest('.subject-row[data-key]');
        if (row) { showPage(row.dataset.key); return; }

        // Danger / reset
        if (e.target.classList.contains('danger-btn')) {
            if (confirm('সব progress মুছে ফেলতে চান? এটি undo করা যাবে না!')) {
                if (confirm('শেষবার নিশ্চিত করুন — সব data মুছে যাবে!')) resetAll();
            }
            return;
        }

        // Export / Import
        if (e.target.classList.contains('export-btn')) { exportData(); return; }
        if (e.target.classList.contains('import-btn')) {
            document.getElementById('import-file-input').click();
            return;
        }
    });

    // Scroll-to-top
    const scrollBtn = document.getElementById('scroll-top-btn');
    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── RESET ─────────────────────────────────────────────────────
function resetAll() {
    Object.keys(chapterData).forEach(id => {
        const d = chapterData[id];
        d.mainBook = d.testPaper = d.questionBank = d.guidebook = false;
        d.revision  = 0;
        d.notes     = '';
        d.status    = 'not_started';
        d.deadline  = '';
    });
    localStorage.removeItem(STORAGE_KEY);
    builtPages.clear();
    updateOverallBadge();
    showPage(currentPageKey);
    alert('✅ সব data সফলভাবে মুছে ফেলা হয়েছে।');
}

// ── EXPORT / IMPORT ───────────────────────────────────────────
function exportData() {
    const payload = {
        version: 5,
        appName: 'HSC Syllabus Tracker (Engineering)',
        exportDate: new Date().toISOString(),
        settings,
        data: {}
    };
    Object.keys(chapterData).forEach(id => {
        const d = chapterData[id];
        payload.data[id] = {
            mainBook:     d.mainBook,
            testPaper:    d.testPaper,
            questionBank: d.questionBank,
            guidebook:    d.guidebook,
            revision:     d.revision,
            notes:        d.notes,
            status:       d.status,
            deadline:     d.deadline
        };
    });
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), {
        href: url,
        download: 'hsc-syllabus-tracker-backup.json'
    });
    a.click();
    URL.revokeObjectURL(url);
}

function importData(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        try {
            const payload = JSON.parse(e.target.result);
            const src = payload.data || payload;
            Object.keys(src).forEach(id => {
                if (!chapterData[id]) return;
                const s = src[id];
                chapterData[id].mainBook     = !!s.mainBook;
                chapterData[id].testPaper    = !!s.testPaper;
                chapterData[id].questionBank = !!s.questionBank;
                chapterData[id].guidebook    = !!s.guidebook;
                chapterData[id].revision     = Number(s.revision) || 0;
                chapterData[id].notes        = s.notes    || '';
                chapterData[id].status       = s.status   || 'not_started';
                chapterData[id].deadline     = s.deadline || '';
            });
            if (payload.settings) {
                settings = { ...settings, ...payload.settings };
                if (!(settings.theme in THEMES)) settings.theme = 'dark';
                saveSettings();
                updateCountdown();
                applyTheme(settings.theme);
            }
            save();
            builtPages.clear();
            updateOverallBadge();
            showPage(currentPageKey);
            alert('✅ ডেটা সফলভাবে import হয়েছে!');
        } catch (_) {
            alert('❌ ফাইলটি সঠিক নয়। আবার চেষ্টা করুন।');
        }
        input.value = '';
    };
    reader.readAsText(file);
}

// ── SURGICAL DOM UPDATES ──────────────────────────────────────
function refreshCardProgress(id) {
    const prog = calcProgress(id);
    const card = document.querySelector(`.chapter-card[data-id="${id}"]`);
    if (!card) return;
    card.querySelector('.progress-fill').style.width = prog + '%';
    card.querySelector('.progress-text').textContent = prog + '% সম্পন্ন';
    card.classList.toggle('completed', isChapterCompleted(id));
}

function refreshCardDeadline(id) {
    const card = document.querySelector(`.chapter-card[data-id="${id}"]`);
    if (!card) return;
    const dl       = chapterData[id].deadline;
    const dispEl   = card.querySelector('.deadline-display');
    const clearBtn = card.querySelector('.deadline-clear-btn');
    if (dispEl)   dispEl.textContent = dl ? formatDeadline(dl) : 'তারিখ সেট করা হয়নি';
    if (clearBtn) clearBtn.style.display = dl ? 'inline-flex' : 'none';
    card.querySelectorAll('.deadline-day-btn').forEach(btn => {
        const btnDate = dateFromToday(parseInt(btn.dataset.days, 10));
        btn.classList.toggle('active', dl === btnDate);
    });
}

function refreshSubjectStats(sk) {
    const pageEl = document.getElementById(sk + '-page');
    if (!pageEl) return;
    const statsEl = pageEl.querySelector('.subject-stats');
    if (!statsEl) return;
    const ids = subjectIds(sk);
    statsEl.querySelector('[data-stat="progress"]').textContent  = subjectProgress(sk) + '%';
    statsEl.querySelector('[data-stat="completed"]').textContent = subjectCompleted(sk) + '/' + ids.length;
}

// ── NAVIGATION ────────────────────────────────────────────────
function showPage(pageKey) {
    currentPageKey = pageKey;
    document.querySelectorAll('.nav-tab').forEach(tab =>
        tab.classList.toggle('active', tab.dataset.page === pageKey)
    );
    document.querySelectorAll('.page').forEach(pg => pg.classList.remove('active'));
    const pageEl = document.getElementById(pageKey + '-page');
    pageEl.classList.add('active');

    if      (pageKey === 'dashboard') buildDashboard(pageEl);
    else if (pageKey === 'settings')  buildSettings(pageEl);
    else if (!builtPages.has(pageKey)) {
        buildSubjectPage(pageKey, pageEl);
        builtPages.add(pageKey);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
}

// ── BUILD DASHBOARD ───────────────────────────────────────────
function buildDashboard(el) {
    const frag    = document.createDocumentFragment();
    const overall = overallProgress();
    const ids     = Object.keys(chapterData);
    const done    = ids.filter(id => isChapterCompleted(id)).length;
    const quote   = getTimeBasedQuote();

    // Hero
    const hero = div('dashboard-hero');
    hero.innerHTML = `
        <div class="hero-percent" data-stat="overall-pct">${overall}%</div>
        <div class="hero-label">সামগ্রিক অগ্রগতি</div>
        <div class="hero-progress-bar">
            <div class="hero-progress-fill" data-stat="overall-bar" style="width:${overall}%"></div>
        </div>
        <div class="hero-chapters" data-stat="chapters">${done} / ${ids.length} chapters সম্পন্ন</div>
    `;
    frag.appendChild(hero);

    // ── TODAY'S CHECKLIST ─────────────────────────────────────
    const todayStr   = getTodayStr();
    const todayIds   = ids.filter(id => chapterData[id].deadline === todayStr);
    const runningIds = ids.filter(id => chapterData[id].status === 'running' && chapterData[id].deadline !== todayStr);

    if (todayIds.length > 0 || runningIds.length > 0) {
        const todayCard = div('dashboard-card today-checklist-card');

        if (todayIds.length > 0) {
            const todayTitle = div('dashboard-card-title');
            todayTitle.innerHTML = `📋 আজকের পড়ার তালিকা <span class="today-badge">${todayIds.length}টি</span>`;
            todayCard.appendChild(todayTitle);

            const list = div('today-chapter-list');
            todayIds.forEach(id => {
                const d    = chapterData[id];
                const item = div('today-chapter-item');
                if (d.status === 'done')    item.classList.add('tdone');
                if (d.status === 'running') item.classList.add('trunning');
                item.innerHTML = `
                    <span class="today-status-icon">${d.status === 'done' ? '✅' : d.status === 'running' ? '🟡' : '⬜'}</span>
                    <div class="today-chapter-info">
                        <span class="today-subj-tag">${SUBJECTS[d.subjectKey].icon} ${SUBJECTS[d.subjectKey].label}</span>
                        <span class="today-chapter-name">${d.chapter}</span>
                    </div>
                `;
                list.appendChild(item);
            });
            todayCard.appendChild(list);
        }

        if (runningIds.length > 0) {
            const runTitle = div('dashboard-card-title');
            if (todayIds.length > 0) runTitle.style.borderTop = '1px solid var(--border)';
            runTitle.innerHTML = `🟡 চলমান অধ্যায় <span class="today-badge">${runningIds.length}টি</span>`;
            todayCard.appendChild(runTitle);

            const rlist = div('today-chapter-list');
            runningIds.forEach(id => {
                const d    = chapterData[id];
                const item = div('today-chapter-item trunning');
                const dlTxt = d.deadline ? ' · ' + formatDeadline(d.deadline) : '';
                item.innerHTML = `
                    <span class="today-status-icon">🟡</span>
                    <div class="today-chapter-info">
                        <span class="today-subj-tag">${SUBJECTS[d.subjectKey].icon} ${SUBJECTS[d.subjectKey].label}</span>
                        <span class="today-chapter-name">${d.chapter}<small class="today-dl-hint">${dlTxt}</small></span>
                    </div>
                `;
                rlist.appendChild(item);
            });
            todayCard.appendChild(rlist);
        }

        frag.appendChild(todayCard);
    }

    // Quick Stats
    const completedSubjects = Object.keys(SUBJECTS).filter(k => {
        const sIds = subjectIds(k);
        return sIds.length > 0 && sIds.every(id => isChapterCompleted(id));
    }).length;

    const qs = div('quick-stats');
    qs.innerHTML = `
        <div class="quick-stat-box">
            <div class="quick-stat-val">${done}</div>
            <div class="quick-stat-lbl">Chapters Done</div>
        </div>
        <div class="quick-stat-box">
            <div class="quick-stat-val" data-stat="revisions">${totalRevisions()}</div>
            <div class="quick-stat-lbl">মোট রিভিশন</div>
        </div>
        <div class="quick-stat-box">
            <div class="quick-stat-val">${completedSubjects}</div>
            <div class="quick-stat-lbl">Subjects Done</div>
        </div>
    `;
    frag.appendChild(qs);

    // Quote
    const tipEl = div('study-tip');
    tipEl.innerHTML = `<div class="study-tip-cat">${quote.cat}</div><div class="study-tip-text">${quote.text}</div>`;
    frag.appendChild(tipEl);

    // Subject progress card
    const card      = div('dashboard-card');
    const cardTitle = div('dashboard-card-title');
    cardTitle.textContent = '📊 বিষয়ভিত্তিক অগ্রগতি  (ক্লিক করলে বিস্তারিত দেখুন)';
    const list = div('subject-list');
    Object.keys(SUBJECTS).forEach(key => {
        const pct = subjectProgress(key);
        const row = div('subject-row');
        row.dataset.key = key;
        row.innerHTML = `
            <div class="subject-row-name">${SUBJECTS[key].icon} ${SUBJECTS[key].label}</div>
            <div class="subject-row-right">
                <div class="subject-row-bar">
                    <div class="subject-row-bar-fill" style="width:${pct}%"></div>
                </div>
                <div class="subject-row-pct">${pct}%</div>
            </div>
        `;
        list.appendChild(row);
    });
    card.append(cardTitle, list);
    frag.appendChild(card);

    el.innerHTML = '';
    el.appendChild(frag);
}

// ── BUILD SUBJECT PAGE ────────────────────────────────────────
function buildSubjectPage(pageKey, el) {
    const subj = SUBJECTS[pageKey];
    const ids  = subjectIds(pageKey);
    const frag = document.createDocumentFragment();

    const title = div('subject-title');
    title.textContent = subj.icon + ' ' + subj.label;
    frag.appendChild(title);

    const stats = div('subject-stats');
    stats.innerHTML = `
        <div class="stat-item">
            <div class="stat-label">অগ্রগতি</div>
            <div class="stat-value" data-stat="progress">${subjectProgress(pageKey)}%</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">সম্পন্ন</div>
            <div class="stat-value" data-stat="completed">${subjectCompleted(pageKey)}/${ids.length}</div>
        </div>
    `;
    frag.appendChild(stats);

    Object.keys(subj.papers).forEach(paper => {
        const sep = div('paper-separator');
        sep.innerHTML = `
            <div class="paper-separator-line"></div>
            <div class="paper-separator-label">${paper}</div>
            <div class="paper-separator-line"></div>
        `;
        frag.appendChild(sep);

        subj.papers[paper].forEach(chapterName => {
            const id = Object.keys(chapterData).find(k =>
                chapterData[k].subjectKey === pageKey &&
                chapterData[k].paper      === paper   &&
                chapterData[k].chapter    === chapterName
            );
            if (id !== undefined) frag.appendChild(buildCard(id));
        });
    });

    el.innerHTML = '';
    el.appendChild(frag);
}

// ── BUILD SINGLE CARD ─────────────────────────────────────────
function buildCard(id) {
    const d    = chapterData[id];
    const prog = calcProgress(id);

    const card = div('chapter-card');
    card.dataset.id      = id;
    card.dataset.cbcount = d.cbCount;
    if (isChapterCompleted(id)) card.classList.add('completed');

    // Header
    const header = div('chapter-header');
    header.innerHTML = `
        <div class="chapter-name">${d.chapter}</div>
        <div class="paper-tag">${d.paper}</div>
    `;
    card.appendChild(header);

    // Completion badge
    if (d.cbCount === 4) {
        const badge = div('completion-rule');
        badge.textContent = '✅ ৩টি tick = সম্পন্ন';
        card.appendChild(badge);
    }

    // Checkboxes
    const grid     = div('checkboxes-grid');
    const cbFields = d.cbCount === 4
        ? [['mainBook','📗 মূল বই'], ['testPaper','📄 টেস্ট পেপার'],
           ['questionBank','📋 প্রশ্নব্যাংক'], ['guidebook','📘 গাইড বই']]
        : [['mainBook','📗 মূল বই'], ['testPaper','📋 বোর্ড প্রশ্ন']];

    cbFields.forEach(([field, labelText]) => {
        const item  = div('checkbox-item');
        const input = document.createElement('input');
        input.type          = 'checkbox';
        input.checked       = d[field];
        input.dataset.id    = id;
        input.dataset.field = field;
        const lbl = div('checkbox-label');
        lbl.textContent = labelText;
        item.append(input, lbl);
        grid.appendChild(item);
    });
    card.appendChild(grid);

    // ── STATUS SECTION ────────────────────────────────────────
    const statusSec = div('status-section');
    const statusLabel = document.createElement('span');
    statusLabel.className   = 'status-label';
    statusLabel.textContent = '📌 অবস্থা:';
    statusSec.appendChild(statusLabel);

    const statusGroup = div('status-btn-group');
    [
        ['not_started', '⚪ শুরু করিনি'],
        ['running',     '🟡 পড়ছি'],
        ['done',        '✅ শেষ']
    ].forEach(([val, label]) => {
        const btn = document.createElement('button');
        btn.className      = 'status-btn status-' + val;
        btn.dataset.id     = id;
        btn.dataset.status = val;
        btn.textContent    = label;
        if (d.status === val) btn.classList.add('active');
        statusGroup.appendChild(btn);
    });
    statusSec.appendChild(statusGroup);
    card.appendChild(statusSec);

    // ── DEADLINE SECTION ──────────────────────────────────────
    const dlSec = div('deadline-section');

    const dlRow = div('deadline-header-row');

    const dlLabel = document.createElement('span');
    dlLabel.className   = 'deadline-label';
    dlLabel.textContent = '📅 টার্গেট:';
    dlRow.appendChild(dlLabel);

    const dlDisplay = div('deadline-display');
    dlDisplay.textContent = d.deadline ? formatDeadline(d.deadline) : 'সেট করা হয়নি';
    dlRow.appendChild(dlDisplay);

    const dlClearBtn = document.createElement('button');
    dlClearBtn.className     = 'deadline-clear-btn';
    dlClearBtn.dataset.id    = id;
    dlClearBtn.textContent   = '✕';
    dlClearBtn.title         = 'তারিখ মুছুন';
    dlClearBtn.style.display = d.deadline ? 'inline-flex' : 'none';
    dlRow.appendChild(dlClearBtn);

    dlSec.appendChild(dlRow);

    const dlBtns = div('deadline-quick-btns');
    [[0,'আজ'],[1,'+১'],[2,'+২'],[3,'+৩'],[5,'+৫'],[7,'+৭'],[10,'+১০']].forEach(([days, label]) => {
        const btn = document.createElement('button');
        btn.className    = 'deadline-day-btn';
        btn.dataset.id   = id;
        btn.dataset.days = days;
        btn.textContent  = label;
        if (d.deadline && d.deadline === dateFromToday(days)) btn.classList.add('active');
        dlBtns.appendChild(btn);
    });
    dlSec.appendChild(dlBtns);
    card.appendChild(dlSec);

    // Revision counter
    const revSec = div('revision-section');
    revSec.innerHTML = `
        <span class="revision-label">🔁 রিভিশন (০–২০)</span>
        <div class="revision-controls">
            <button class="revision-btn" data-id="${id}" data-delta="-1">−</button>
            <span class="revision-value">${d.revision}</span>
            <button class="revision-btn" data-id="${id}" data-delta="1">+</button>
        </div>
    `;
    card.appendChild(revSec);

    // Notes
    const notesBtn = document.createElement('button');
    notesBtn.className   = 'notes-toggle';
    notesBtn.dataset.id  = id;
    notesBtn.textContent = d.notes ? '📝 নোট দেখুন / সম্পাদনা করুন' : '📝 নোট লিখুন / দেখুন';
    card.appendChild(notesBtn);

    const notesArea = document.createElement('textarea');
    notesArea.className   = 'notes-area' + (d.notes ? ' open' : '');
    notesArea.dataset.id  = id;
    notesArea.placeholder = 'এই অধ্যায় সম্পর্কে এমন কিছু যা তোমার মাথায় থাকা জরুরি...';
    notesArea.value       = d.notes;
    card.appendChild(notesArea);

    // Progress bar
    const progSec = div('progress-section');
    progSec.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill" style="width:${prog}%"></div>
        </div>
        <div class="progress-text">${prog}% সম্পন্ন</div>
    `;
    card.appendChild(progSec);

    return card;
}

// ── BUILD SETTINGS ────────────────────────────────────────────
function buildSettings(el) {
    el.innerHTML = '';
    const frag  = document.createDocumentFragment();
    const total = Object.keys(chapterData).length;

    const themeCard = div('settings-card');
    const themeOptions = Object.entries(THEMES)
        .map(([k, v]) => `<option value="${k}"${k === (settings.theme || 'dark') ? ' selected' : ''}>${v.label}</option>`)
        .join('');
    themeCard.innerHTML = `
        <h3>🎨 Theme / রঙের থিম</h3>
        <p>তিনটি থিমের মধ্যে যেকোনো একটি বেছে নিন।</p>
        <div class="settings-input-row" style="margin-top:12px">
            <label for="theme-select">থিম:</label>
            <select id="theme-select" class="theme-select">${themeOptions}</select>
        </div>
    `;
    frag.appendChild(themeCard);

    const countdownCard = div('settings-card');
    countdownCard.innerHTML = `
        <h3>📅 HSC পরীক্ষার তারিখ</h3>
        <p>তারিখ সেট করলে header-এ countdown দেখা যাবে।</p>
        <div class="settings-input-row">
            <label for="exam-date-input">পরীক্ষার তারিখ:</label>
            <input type="date" id="exam-date-input" value="${settings.examDate || ''}">
        </div>
    `;
    frag.appendChild(countdownCard);

    const backupCard = div('settings-card');
    backupCard.innerHTML = `
        <h3>💾 Backup ও Restore</h3>
        <p>সব progress একটি JSON file-এ export করুন। পরে import করে পুনরুদ্ধার করুন।</p>
        <p style="margin-top:6px;color:var(--red)"><strong>⚠️ Browser clear করলে progress মুছে যাবে!</strong> নিয়মিত backup রাখুন।</p>
        <button class="action-btn export-btn">⬇️ Export Backup</button>
        <button class="action-btn secondary import-btn">⬆️ Import Backup</button>
        <input type="file" id="import-file-input" accept=".json" style="display:none">
    `;
    frag.appendChild(backupCard);

    const cbCard = div('settings-card');
    cbCard.innerHTML = `
        <h3>☑️ Completion System</h3>
        <p><strong>⚙️ Engineering বিষয় (Physics, Chemistry, উচ্চতর গণিত) — ৪টি checkbox:</strong></p>
        <p style="margin-top:4px">📗 মূল বই &nbsp;·&nbsp; 📄 টেস্ট পেপার &nbsp;·&nbsp; 📋 প্রশ্নব্যাংক &nbsp;·&nbsp; 📘 গাইড বই</p>
        <p style="margin-top:6px;color:var(--accent)"><strong>✅ নিয়ম: যেকোনো ৩টি tick = chapter সম্পন্ন (৭৫%)</strong></p>
        <hr style="border-color:var(--border);margin:12px 0">
        <p><strong>📚 Board বিষয় (Biology, বাংলা, English, ICT) — ২টি checkbox:</strong></p>
        <p style="margin-top:4px">📗 মূল বই &nbsp;·&nbsp; 📋 বোর্ড প্রশ্ন</p>
        <p style="margin-top:6px;color:var(--accent)"><strong>✅ নিয়ম: দুটোই tick = chapter সম্পন্ন (১০০%)</strong></p>
        <hr style="border-color:var(--border);margin:12px 0">
        <p><strong>📌 Status:</strong> প্রতিটি chapter "⚪ শুরু করিনি", "🟡 পড়ছি" বা "✅ শেষ" করে mark করুন।</p>
        <p style="margin-top:4px"><strong>📅 Deadline:</strong> পরের ১০ দিনের মধ্যে target date দিন। Dashboard-এ আজকের তালিকা দেখুন।</p>
        <hr style="border-color:var(--border);margin:12px 0">
        <p><strong>🔁 রিভিশন Counter:</strong> প্রতি chapter-এ ০–২০ রিভিশন track করা যাবে।</p>
    `;
    frag.appendChild(cbCard);

    const iosCard = div('settings-card');
    iosCard.innerHTML = `
        <h3>📱 Home Screen-এ Add করুন</h3>
        <p><strong>iPhone/iPad (Safari):</strong> Share (📤) → "Add to Home Screen" → Add ✅</p>
        <p style="margin-top:8px"><strong>Android (Chrome):</strong> ⋮ মেনু → "Add to Home screen" → Add ✅</p>
    `;
    frag.appendChild(iosCard);

    const resetCard = div('settings-card');
    resetCard.innerHTML = `
        <h3>🗑️ সব Data মুছে ফেলুন</h3>
        <p>সব checkbox, status, deadline ও revision count শূন্যে রিসেট হবে। এটি <strong>undo করা যাবে না</strong>।</p>
        <button class="danger-btn">⚠️ সব Progress মুছে ফেলুন</button>
    `;
    frag.appendChild(resetCard);

    const aboutCard = div('settings-card');
    aboutCard.innerHTML = `
        <h3>ℹ️ About</h3>
        <p><strong>HSC Syllabus Tracker (Engineering)</strong> &nbsp;·&nbsp; Version 5.0</p>
        <p style="margin-top:4px">মোট অধ্যায়: <strong>${total}</strong> &nbsp;·&nbsp; NCTB অনুমোদিত সিলেবাস (২০২৪–২৫)</p>
    `;
    frag.appendChild(aboutCard);

    el.appendChild(frag);
}

// ── UTILITY ───────────────────────────────────────────────────
function div(className) {
    const el = document.createElement('div');
    if (className) el.className = className;
    return el;
}

// ── START ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
