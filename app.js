/* ============================================================
   HSC BUET Tracker — app.js
   Architecture:
   - Each subject page is built once using DOM APIs (no innerHTML for cards)
   - Event delegation: ONE listener for checkboxes, ONE for buttons
   - IDs are simple numbers ("0", "1", ...) — no Bengali in IDs
   - State updates are surgical: only the affected DOM node changes
   ============================================================ */

// ── DATA DEFINITIONS ──────────────────────────────────────────
const SUBJECTS = {
    physics: {
        label: 'পদার্থবিজ্ঞান',
        checkboxCount: 4,
        papers: {
            '১ম পত্র': [
                'ভৌত জগৎ ও পরিমাপ', 'ভেক্টর', 'গতিবিদ্যা', 'নিউটনীয় বলবিদ্যা',
                'কাজ, ক্ষমতা ও শক্তি', 'মহাকর্ষ ও মহাকর্ষীয় ক্ষেত্র',
                'পদার্থের গাঠনিক ধর্ম', 'পর্যায়বৃত্ত গতি', 'তরঙ্গ',
                'আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব'
            ],
            '২য় পত্র': [
                'তাপগতিবিদ্যা', 'স্থির তড়িৎ', 'চল তড়িৎ',
                'তড়িৎ প্রবাহের চৌম্বক ক্রিয়া ও চুম্বকত্ব',
                'তড়িচ্চুম্বকীয় আবেশ ও পরিবর্তী প্রবাহ',
                'জ্যামিতিক আলোকবিজ্ঞান', 'ভৌত আলোকবিজ্ঞান',
                'আধুনিক পদার্থবিজ্ঞানের সূচনা',
                'পরমাণুর মডেল ও নিউক্লিয়ার পদার্থবিজ্ঞান',
                'সেমিকন্ডাক্টর ও ইলেকট্রনিক্স', 'জ্যোতির্বিজ্ঞান'
            ]
        }
    },
    chemistry: {
        label: 'রসায়ন',
        checkboxCount: 4,
        papers: {
            '১ম পত্র': [
                'ল্যাবরেটরিতে নিরাপত্তা ও পরিচ্ছন্নতা', 'গুণগত রসায়ন',
                'মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন',
                'রাসায়নিক পরিবর্তন', 'কর্মমুখী রসায়ন'
            ],
            '২য় পত্র': [
                'পরিবেশ রসায়ন', 'জৈব রসায়ন', 'পরিমাণগত রসায়ন',
                'রাসায়নিক গতিবিদ্যা ও রাসায়নিক সাম্যাবস্থা', 'তড়িৎ রসায়ন'
            ]
        }
    },
    math: {
        label: 'উচ্চতর গণিত',
        checkboxCount: 4,
        papers: {
            '১ম পত্র': [
                'ম্যাট্রিক্স ও নির্ণায়ক', 'ভেক্টর', 'সরলরেখা', 'বৃত্ত',
                'পরাবৃত্ত', 'কনিক', 'ত্রিকোণমিতিক অনুপাত',
                'ত্রিকোণমিতিক সমীকরণ', 'সমীকরণের প্রয়োগ',
                'অন্তরীকরণ', 'যোগজীকরণ', 'সমতল স্থানাঙ্ক জ্যামিতি'
            ],
            '২য় পত্র': [
                'জটিল সংখ্যা', 'বহুপদী ও আংশিক ভগ্নাংশ',
                'সূচকীয় ও লগারিদমীয় ধারা', 'অসমতা', 'কনিক',
                'ত্রিমাত্রিক স্থানাঙ্ক জ্যামিতি',
                'বিপরীত বৃত্তীয় ও বিপরীত অধিবৃত্তীয় ফাংশন',
                'বিন্যাস ও সমাবেশ', 'দ্বিপদী বিস্তৃতি',
                'সম্ভাব্যতা', 'স্থিতিবিদ্যা', 'গতিবিদ্যা'
            ]
        }
    },
    biology: {
        label: 'জীববিজ্ঞান',
        checkboxCount: 2,
        papers: {
            '১ম পত্র': [
                'কোষ ও এর গঠন', 'কোষ বিভাজন', 'কোষ রসায়ন', 'অণুজীব',
                'শৈবাল ও ছত্রাক', 'ব্রায়োফাইটা ও টেরিডোফাইটা',
                'নগ্নবীজী ও আবৃতবীজী উদ্ভিদ', 'টিস্যু ও টিস্যুতন্ত্র',
                'উদ্ভিদের শারীরতত্ত্ব', 'উদ্ভিদের প্রজনন', 'জীবপ্রযুক্তি'
            ],
            '২য় পত্র': [
                'প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস',
                'মানব শারীরতত্ত্ব: পরিপাক ও শোষণ',
                'মানব শারীরতত্ত্ব: রক্ত ও সংবহন',
                'মানব শারীরতত্ত্ব: শ্বসন ও শ্বাসক্রিয়া',
                'মানব শারীরতত্ত্ব: রেচন প্রক্রিয়া',
                'মানব শারীরতত্ত্ব: চলন ও অঙ্গসঞ্চালন',
                'মানব শারীরতত্ত্ব: সমন্বয়',
                'মানব শারীরতত্ত্ব: মানব জনন',
                'জীবের পরিবেশ, বিস্তার ও সংরক্ষণ',
                'মানব কল্যাণে জীববিজ্ঞান', 'জীবপ্রযুক্তি',
                'বংশগতি ও বিবর্তন'
            ]
        }
    },
    bangla: {
        label: 'বাংলা',
        checkboxCount: 2,
        papers: {
            'গদ্য': [
                'বাংলার নব্য লেখকদের প্রতি নিবেদন — বঙ্কিমচন্দ্র চট্টোপাধ্যায়',
                'অপরিচিতা — রবীন্দ্রনাথ ঠাকুর',
                'বিলাসী — শরৎচন্দ্র চট্টোপাধ্যায়',
                'গৃহ — বেগম রোকেয়া সাখাওয়াত হোসেন',
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
                'সূচনা — জীবনানন্দ দাশ',
                'তাহারেই পড়ে মনে — সুফিয়া কামাল',
                'পদ্মা — ফররুখ আহমদ',
                '১৮ বছর বয়স — সুকান্ত ভট্টাচার্য',
                'ফেব্রুয়ারি ১৯৬৯ — শামসুর রাহমান',
                'আমি কিংবদন্তির কথা বলছি — আবু জাফর ওবায়দুল্লাহ',
                'নুরুলদীনের কথা মনে পড়ে যায় — সৈয়দ শামসুল হক',
                'রক্তে আমার অনাদি অস্থি — আবুল হাসান'
            ],
            'সহপাঠ': [
                'লালসালু (উপন্যাস) — সৈয়দ ওয়ালীউল্লাহ্',
                'সিরাজউদ্দৌলা (নাটক) — সিকান্দার আবু জাফর'
            ],
            'ব্যাকরণ ও নির্মিতি': [
                'উচ্চারণ ও বানান', 'ব্যাকরণিক শব্দশ্রেণি', 'বাক্যতত্ত্ব',
                'আবেদনপত্র/ইমেইল', 'প্রতিবেদন', 'সারাংশ/সারমর্ম',
                'ভাবসম্প্রসারণ', 'সংলাপ/অনুবাদ'
            ]
        }
    },
    english: {
        label: 'English',
        checkboxCount: 2,
        papers: {
            'Reading': [
                'Unit 1: Nelson Mandela', 'Unit 2: Dreams & Dreamers',
                'Unit 3: Traffic Education', 'Unit 4: Food Adulteration',
                'Unit 5: Adolescence', 'Unit 6: Diaspora',
                'Unit 7: The River', 'Unit 8: Devotion',
                'Unit 9: Digital Bangladesh', 'Unit 10: Renewable Energy',
                'Unit 11: Heritage', 'Unit 12: Nakshi Kantha'
            ],
            'Writing': [
                'Formal Letter', 'Application', 'Email', 'Paragraph',
                'Composition', 'Summary', 'Report', 'Dialogue'
            ]
        }
    },
    ict: {
        label: 'ICT',
        checkboxCount: 2,
        papers: {
            'অধ্যায়': [
                'তথ্য ও যোগাযোগ প্রযুক্তি: বিশ্ব ও বাংলাদেশ',
                'কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং',
                'সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস',
                'ওয়েব ডিজাইন ও HTML',
                'প্রোগ্রামিং (C)',
                'ডেটাবেজ ম্যানেজমেন্ট'
            ]
        }
    }
};

// Subject page key → page element id
const PAGE_IDS = {
    dashboard: 'dashboard-page',
    physics:   'physics-page',
    chemistry: 'chemistry-page',
    math:      'math-page',
    biology:   'biology-page',
    bangla:    'bangla-page',
    english:   'english-page',
    ict:       'ict-page',
    settings:  'settings-page'
};

// ── STATE ──────────────────────────────────────────────────────
// chapterData[id] = { subjectKey, paper, chapter, cbCount,
//                     mainBook, testPaper, questionBank, guidebook, revision }
const chapterData = {};
let currentPageKey = 'dashboard';
// Track which subject pages have already been built into the DOM
const builtPages = new Set();

// ── INIT ───────────────────────────────────────────────────────
function init() {
    let idx = 0;
    Object.keys(SUBJECTS).forEach(subjectKey => {
        const subj = SUBJECTS[subjectKey];
        Object.keys(subj.papers).forEach(paper => {
            subj.papers[paper].forEach(chapter => {
                const id = String(idx++);
                chapterData[id] = {
                    subjectKey,
                    paper,
                    chapter,
                    cbCount: subj.checkboxCount,
                    mainBook:    false,
                    testPaper:   false,
                    questionBank:false,
                    guidebook:   false,
                    revision:    0
                };
            });
        });
    });

    // Load from localStorage
    const raw = localStorage.getItem('hscTracker');
    if (raw) {
        try {
            const saved = JSON.parse(raw);
            Object.keys(saved).forEach(id => {
                if (chapterData[id]) {
                    const s = saved[id];
                    chapterData[id].mainBook     = !!s.mainBook;
                    chapterData[id].testPaper    = !!s.testPaper;
                    chapterData[id].questionBank = !!s.questionBank;
                    chapterData[id].guidebook    = !!s.guidebook;
                    chapterData[id].revision     = Number(s.revision) || 0;
                }
            });
        } catch (e) {
            // Corrupted data — ignore
        }
    }

    attachListeners();
    showPage('dashboard');
}

// ── SAVE ───────────────────────────────────────────────────────
function save() {
    // Save minimal object (only changed fields needed to restore)
    const out = {};
    Object.keys(chapterData).forEach(id => {
        const d = chapterData[id];
        out[id] = {
            mainBook:     d.mainBook,
            testPaper:    d.testPaper,
            questionBank: d.questionBank,
            guidebook:    d.guidebook,
            revision:     d.revision
        };
    });
    localStorage.setItem('hscTracker', JSON.stringify(out));
}

// ── PROGRESS HELPERS ───────────────────────────────────────────
function calcProgress(id) {
    const d = chapterData[id];
    if (d.cbCount === 4) {
        return (d.mainBook ? 25 : 0) + (d.testPaper ? 25 : 0) +
               (d.questionBank ? 25 : 0) + (d.guidebook ? 25 : 0);
    }
    return (d.mainBook ? 50 : 0) + (d.testPaper ? 50 : 0);
}

function subjectIds(subjectKey) {
    return Object.keys(chapterData).filter(id => chapterData[id].subjectKey === subjectKey);
}

function subjectProgress(subjectKey) {
    const ids = subjectIds(subjectKey);
    if (!ids.length) return 0;
    return Math.round(ids.reduce((s, id) => s + calcProgress(id), 0) / ids.length);
}

function subjectCompleted(subjectKey) {
    const ids = subjectIds(subjectKey);
    return ids.filter(id => calcProgress(id) === 100).length;
}

function overallProgress() {
    const ids = Object.keys(chapterData);
    if (!ids.length) return 0;
    return Math.round(ids.reduce((s, id) => s + calcProgress(id), 0) / ids.length);
}

// ── EVENT DELEGATION ───────────────────────────────────────────
function attachListeners() {
    // Tab navigation
    document.getElementById('nav-tabs').addEventListener('click', e => {
        const tab = e.target.closest('.nav-tab');
        if (!tab) return;
        showPage(tab.dataset.page);
    });

    // Checkbox changes (single delegated listener on document)
    document.addEventListener('change', e => {
        const cb = e.target;
        if (cb.type !== 'checkbox' || !cb.dataset.id) return;

        const id    = cb.dataset.id;
        const field = cb.dataset.field;

        // Sync state from the actual checkbox DOM value (not toggle — avoids all sync bugs)
        chapterData[id][field] = cb.checked;
        save();

        // Update only this card's progress bar
        refreshCardProgress(id);
        // Update the subject stats header
        refreshSubjectStats(chapterData[id].subjectKey);
        // If dashboard is open, refresh it
        if (currentPageKey === 'dashboard') {
            refreshDashboard();
        }
    });

    // Revision +/- buttons
    document.addEventListener('click', e => {
        const btn = e.target.closest('.revision-btn');
        if (!btn || !btn.dataset.id) return;

        const id    = btn.dataset.id;
        const delta = Number(btn.dataset.delta);
        const cur   = chapterData[id].revision;
        chapterData[id].revision = Math.max(0, Math.min(10, cur + delta));
        save();

        // Update only the revision number in this card
        const card = document.querySelector(`.chapter-card[data-id="${id}"]`);
        if (card) {
            card.querySelector('.revision-value').textContent = chapterData[id].revision;
        }
    });

    // Settings reset button (delegated)
    document.addEventListener('click', e => {
        if (e.target.classList.contains('danger-btn')) {
            if (confirm('সব progress মুছে ফেলতে চান? এটি undo করা যাবে না!')) {
                if (confirm('শেষবার নিশ্চিত করুন — সব data মুছে যাবে!')) {
                    resetAll();
                }
            }
        }
    });
}

function resetAll() {
    Object.keys(chapterData).forEach(id => {
        chapterData[id].mainBook     = false;
        chapterData[id].testPaper    = false;
        chapterData[id].questionBank = false;
        chapterData[id].guidebook    = false;
        chapterData[id].revision     = 0;
    });
    save();
    // Wipe all built pages so they re-render fresh
    builtPages.clear();
    showPage(currentPageKey);
}

// ── SURGICAL DOM UPDATES ───────────────────────────────────────
function refreshCardProgress(id) {
    const prog = calcProgress(id);
    const card = document.querySelector(`.chapter-card[data-id="${id}"]`);
    if (!card) return;
    card.querySelector('.progress-fill').style.width = prog + '%';
    card.querySelector('.progress-text').textContent  = prog + '% সম্পন্ন';
}

function refreshSubjectStats(subjectKey) {
    const statsEl = document.getElementById(PAGE_IDS[subjectKey])
                             .querySelector('.subject-stats');
    if (!statsEl) return;
    const ids   = subjectIds(subjectKey);
    const total = ids.length;
    const prog  = subjectProgress(subjectKey);
    const done  = subjectCompleted(subjectKey);
    statsEl.querySelector('[data-stat="progress"]').textContent  = prog + '%';
    statsEl.querySelector('[data-stat="completed"]').textContent = done + '/' + total;
}

function refreshDashboard() {
    const pg = document.getElementById('dashboard-page');
    const ovEl = pg.querySelector('[data-stat="overall"]');
    const subEl = pg.querySelector('[data-stat="chapters"]');
    if (ovEl) {
        ovEl.textContent = overallProgress() + '%';
        const ids  = Object.keys(chapterData);
        const done = ids.filter(id => calcProgress(id) === 100).length;
        subEl.textContent = done + ' / ' + ids.length + ' chapters completed';
    }
    // Update each subject row
    Object.keys(SUBJECTS).forEach(key => {
        const pct  = subjectProgress(key);
        const row  = pg.querySelector(`.subject-row[data-key="${key}"]`);
        if (!row) return;
        row.querySelector('.subject-row-pct').textContent     = pct + '%';
        row.querySelector('.subject-row-bar-fill').style.width = pct + '%';
    });
}

// ── PAGE NAVIGATION ────────────────────────────────────────────
function showPage(pageKey) {
    currentPageKey = pageKey;

    // Update active tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.page === pageKey);
    });

    // Update active page container
    document.querySelectorAll('.page').forEach(pg => pg.classList.remove('active'));
    const pageEl = document.getElementById(PAGE_IDS[pageKey]);
    pageEl.classList.add('active');

    // Build content if not already built
    if (pageKey === 'dashboard') {
        buildDashboard(pageEl);
    } else if (pageKey === 'settings') {
        buildSettings(pageEl);
    } else if (!builtPages.has(pageKey)) {
        buildSubjectPage(pageKey, pageEl);
        builtPages.add(pageKey);
    }
    // If page was already built, existing DOM (with live checkbox states) is reused — no flicker, no state loss
}

// ── BUILD: DASHBOARD ───────────────────────────────────────────
function buildDashboard(el) {
    // Dashboard is always rebuilt so stats are fresh
    el.innerHTML = '';

    const grid = div('dashboard-grid');

    // Overall card
    const overallCard = div('dashboard-card');
    const h1 = document.createElement('h3');
    h1.textContent = 'Overall Progress';
    const bigStat = div('big-stat');
    bigStat.dataset.stat = 'overall';
    bigStat.textContent = overallProgress() + '%';
    const ids  = Object.keys(chapterData);
    const done = ids.filter(id => calcProgress(id) === 100).length;
    const sub  = div('big-stat-sub');
    sub.dataset.stat = 'chapters';
    sub.textContent = done + ' / ' + ids.length + ' chapters completed';
    overallCard.append(h1, bigStat, sub);

    // Subject list card
    const listCard = div('dashboard-card');
    const h2 = document.createElement('h3');
    h2.textContent = 'Subject Progress';
    const list = div('subject-list');
    Object.keys(SUBJECTS).forEach(key => {
        const pct = subjectProgress(key);
        const row = div('subject-row');
        row.dataset.key = key;
        const name = div('subject-row-name');
        name.textContent = SUBJECTS[key].label;
        const right = div('subject-row-right');
        const bar = div('subject-row-bar');
        const fill = div('subject-row-bar-fill');
        fill.style.width = pct + '%';
        bar.appendChild(fill);
        const pctEl = div('subject-row-pct');
        pctEl.textContent = pct + '%';
        right.append(bar, pctEl);
        row.append(name, right);
        list.appendChild(row);
    });
    listCard.append(h2, list);
    grid.append(overallCard, listCard);
    el.appendChild(grid);
}

// ── BUILD: SUBJECT PAGE ────────────────────────────────────────
function buildSubjectPage(pageKey, el) {
    const subj = SUBJECTS[pageKey];
    el.innerHTML = '';

    // Title
    const title = div('subject-title');
    title.textContent = subj.label;
    el.appendChild(title);

    // Stats bar
    const ids   = subjectIds(pageKey);
    const total = ids.length;
    const prog  = subjectProgress(pageKey);
    const done  = subjectCompleted(pageKey);
    const stats = div('subject-stats');
    const s1 = div('stat-item');
    const l1 = div('stat-label'); l1.textContent = 'PROGRESS';
    const v1 = div('stat-value'); v1.dataset.stat = 'progress'; v1.textContent = prog + '%';
    s1.append(l1, v1);
    const s2 = div('stat-item');
    const l2 = div('stat-label'); l2.textContent = 'COMPLETED';
    const v2 = div('stat-value'); v2.dataset.stat = 'completed'; v2.textContent = done + '/' + total;
    s2.append(l2, v2);
    stats.append(s1, s2);
    el.appendChild(stats);

    // Chapter cards — built with DOM API, never innerHTML for checkbox inputs
    Object.keys(subj.papers).forEach(paper => {
        subj.papers[paper].forEach(chapterName => {
            const id = Object.keys(chapterData).find(k =>
                chapterData[k].subjectKey === pageKey &&
                chapterData[k].paper      === paper   &&
                chapterData[k].chapter    === chapterName
            );
            if (id === undefined) return;
            el.appendChild(buildCard(id));
        });
    });
}

// ── BUILD: SINGLE CARD ─────────────────────────────────────────
function buildCard(id) {
    const d    = chapterData[id];
    const prog = calcProgress(id);

    const card = div('chapter-card');
    card.dataset.id = id;

    // Header
    const header = div('chapter-header');
    const name   = div('chapter-name');
    name.textContent = d.chapter;
    const tag = div('paper-tag');
    tag.textContent = d.paper;
    header.append(name, tag);
    card.appendChild(header);

    // Checkboxes
    const grid = div('checkboxes-grid');
    const cbFields = d.cbCount === 4
        ? [['mainBook', 'মূল বই'], ['testPaper', 'টেস্ট পেপার'], ['questionBank', 'প্রশ্নব্যাংক'], ['guidebook', 'গাইড বই']]
        : [['mainBook', 'মূল বই'], ['testPaper', 'বোর্ড প্রশ্ন']];

    cbFields.forEach(([field, labelText]) => {
        const item  = div('checkbox-item');
        const input = document.createElement('input');
        input.type          = 'checkbox';
        input.checked       = d[field];       // set from data, not attribute string
        input.dataset.id    = id;
        input.dataset.field = field;
        const lbl = div('checkbox-label');
        lbl.textContent = labelText;
        item.append(input, lbl);
        grid.appendChild(item);
    });
    card.appendChild(grid);

    // Revision
    const revSec = div('revision-section');
    const revLbl = div('revision-label');
    revLbl.textContent = 'রিভিশন (১-১০)';
    const revCtrl = div('revision-controls');
    const btnMinus = document.createElement('button');
    btnMinus.className = 'revision-btn';
    btnMinus.textContent = '−';
    btnMinus.dataset.id    = id;
    btnMinus.dataset.delta = '-1';
    const revVal = div('revision-value');
    revVal.textContent = d.revision;
    const btnPlus = document.createElement('button');
    btnPlus.className = 'revision-btn';
    btnPlus.textContent = '+';
    btnPlus.dataset.id    = id;
    btnPlus.dataset.delta = '1';
    revCtrl.append(btnMinus, revVal, btnPlus);
    revSec.append(revLbl, revCtrl);
    card.appendChild(revSec);

    // Progress bar
    const progSec  = div('progress-section');
    const bar      = div('progress-bar');
    const fill     = div('progress-fill');
    fill.style.width = prog + '%';
    bar.appendChild(fill);
    const progText = div('progress-text');
    progText.textContent = prog + '% সম্পন্ন';
    progSec.append(bar, progText);
    card.appendChild(progSec);

    return card;
}

// ── BUILD: SETTINGS ────────────────────────────────────────────
function buildSettings(el) {
    el.innerHTML = '';

    const total = Object.keys(chapterData).length;

    const cards = [
        {
            title: '📱 Add to Home Screen — iOS (iPhone / iPad)',
            content: `<ol>
                <li>Open this page in <strong>Safari</strong></li>
                <li>Tap the <strong>Share</strong> button (📤) at the bottom of the screen</li>
                <li>Scroll down in the menu and tap <strong>"Add to Home Screen"</strong></li>
                <li>Tap <strong>"Add"</strong> at the top right</li>
                <li>The app icon will appear on your Home Screen ✅</li>
            </ol>`
        },
        {
            title: '🤖 Add to Home Screen — Android',
            content: `<ol>
                <li>Open this page in <strong>Chrome</strong></li>
                <li>Tap the <strong>three-dot menu</strong> (⋮) at the top right</li>
                <li>Tap <strong>"Add to Home screen"</strong></li>
                <li>Tap <strong>"Add"</strong></li>
                <li>The app icon will appear on your Home Screen ✅</li>
            </ol>`
        },
        {
            title: '🔢 Checkbox & Progress System',
            content: `
                <p><strong>Physics, Chemistry, Higher Math — 4 checkboxes (25% each):</strong></p>
                <ul>
                    <li>মূল বই — 25%</li>
                    <li>টেস্ট পেপার — 25%</li>
                    <li>প্রশ্নব্যাংক — 25%</li>
                    <li>গাইড বই — 25%</li>
                </ul>
                <p><strong>Biology, Bangla, English, ICT — 2 checkboxes (50% each):</strong></p>
                <ul>
                    <li>মূল বই — 50%</li>
                    <li>বোর্ড প্রশ্ন — 50%</li>
                </ul>
                <p><strong>Revision Counter:</strong> Track 0–10 revisions per chapter.</p>
                <p><strong>PROGRESS</strong> = average % across all chapters of that subject.</p>
                <p><strong>COMPLETED</strong> = chapters where all checkboxes are ticked (100%).</p>
            `
        },
        {
            title: '💾 Data Storage',
            content: `<p>All progress is saved in your browser's local storage automatically. It persists when you close the browser or restart your device.</p>
            <p><strong>⚠️ Warning:</strong> Do NOT clear browser data or history — your progress will be lost!</p>`
        },
        {
            title: '🗑️ Reset All Data',
            content: `<p>Clears all checkboxes and resets revision counts to zero. This <strong>cannot be undone</strong>.</p>
            <button class="danger-btn">Clear All Progress</button>`
        },
        {
            title: 'ℹ️ About',
            content: `<p>HSC BUET Tracker &nbsp;·&nbsp; Total chapters: <strong>${total}</strong></p>`
        }
    ];

    cards.forEach(c => {
        const card = div('settings-card');
        const h3 = document.createElement('h3');
        h3.textContent = c.title;
        const body = div('');
        body.innerHTML = c.content;
        card.append(h3, body);
        el.appendChild(card);
    });
}

// ── UTILITY ────────────────────────────────────────────────────
function div(className) {
    const el = document.createElement('div');
    if (className) el.className = className;
    return el;
}

// ── START ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
