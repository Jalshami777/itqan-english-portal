export interface VocabItem {
  en: string;
  ar: string;
  phonetic: string;
  example: string;
  exampleAr: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  titleEn: string;
  duration: string;
  xp: number;
  description: string;
  vocabulary: VocabItem[];
  quiz: QuizQuestion[];
}

export interface LevelInfo {
  code: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  name: string;
  nameEn: string;
  description: string;
  color: string;
}

export interface StatementEntry {
  semester: string;
  txNo: string;
  txDate: string;
  description: string;
  debit: number;
  credit: number;
  balanceCredit: number;
  balanceDebit: number;
}

export interface PaymentGateway {
  id: string;
  name: string;
  type: string;
  code: string;
  badgeColor: string;
  instructions: string;
}

export const PAYMENT_GATEWAYS: PaymentGateway[] = [
  {
    id: 'kuraimi',
    name: 'بنك الكريمي الإسلامي (Kuraimi)',
    type: 'تحويل بنكي / محفظة الكريمي',
    code: 'KRM-YE',
    badgeColor: '#0A2A4A',
    instructions:
      'أدخل رقم الطالب ورقم المرجع البنكي (FT...) لتأكيد السداد الفوري عبر الكريمي.',
  },
  {
    id: 'qutaibi',
    name: 'بنك القطيبي الإسلامي (Qutaibi Bank)',
    type: 'سداد بنكي مباشر',
    code: 'QTB-YE',
    badgeColor: '#00A99D',
    instructions:
      'اختر خدمة السداد الجامعي / التعليمي عبر تطبيق أو فروع بنك القطيبي الإسلامي.',
  },
  {
    id: 'tadhamon',
    name: 'بنك التضامن الإسلامي (Tadhamon Bank)',
    type: 'تضامن باي / حوالات',
    code: 'TDB-YE',
    badgeColor: '#0284C7',
    instructions:
      'استخدم حساب السداد المعتمد لدى بنك التضامن مع إدراج اسم الطالب ورقم القيد.',
  },
  {
    id: 'sharq',
    name: 'بنك الشرق اليمني (Bank of Yemen & Sharq)',
    type: 'تحويل مصرفي / محفظة إلكترونية',
    code: 'SHQ-YE',
    badgeColor: '#7C3AED',
    instructions:
      'قم بالتحويل إلى حساب المنصة في بنك الشرق وأرفق رقم الإشعار لإعتماد السند.',
  },
  {
    id: 'cacbank',
    name: 'كاك بنك (CAC Bank)',
    type: 'موبايل كاك / تحويل حسابي',
    code: 'CAC-YE',
    badgeColor: '#059669',
    instructions:
      'ادفع مباشرة عبر تطبيق MobileCAC أو عبر فروع كاك بنك المعتمدة.',
  },
  {
    id: 'onecash_jawali',
    name: 'ون كاش / جوالي / فلوسك',
    type: 'محافظ إلكترونية فورية',
    code: 'WAL-YE',
    badgeColor: '#D97706',
    instructions:
      'اختر المحفظة الإلكترونية المناسبة وأدخل رقم الهاتف المسجل لإتمام السداد.',
  },
];

export const WALLET_STATEMENT_ROWS: StatementEntry[] = [
  {
    semester: '20261',
    txNo: '18860',
    txDate: 'SEP-2026-22 07:51AM',
    description:
      'إيداع لينك بنك الكريمي فرع المطار رقم مرجع FT262650FOLCK للطالب جمال احمد محمد الشامي بتاريخ 2026.0001 (50,000)',
    debit: 0,
    credit: 50000,
    balanceCredit: 50000,
    balanceDebit: 0,
  },
  {
    semester: '20261',
    txNo: '18861',
    txDate: 'SEP-2026-22 07:51AM',
    description:
      'ري(50000) رسوم تسجيل - 5 خصم قائم سداد على الطالب جمال احمد محمد الشامي',
    debit: 50000,
    credit: 0,
    balanceCredit: 0,
    balanceDebit: 50000,
  },
  {
    semester: '20261',
    txNo: '18155',
    txDate: 'SEP-2026-20 07:49AM',
    description:
      'إيداع لينك بنك الكريمي فرع المطار رقم مرجع FT2626347K6K للطالب جمال احمد محمد الشامي بتاريخ 2026.0001 (1,000)',
    debit: 0,
    credit: 1000,
    balanceCredit: 1000,
    balanceDebit: 0,
  },
];

export const ACCOUNT_DETAILS_ROWS = [
  {
    semester: '20261',
    txNo: '18862',
    txDate: 'SEP-2026-22 07:51AM',
    description: 'ري(50000) رسوم تسجيل',
    debit: 0,
    credit: 50000,
  },
  {
    semester: '20261',
    txNo: '18629',
    txDate: 'SEP-2026-12 11:29AM',
    description: 'رسوم تسجيل',
    debit: 50000,
    credit: 0,
  },
];

export const LEVELS: LevelInfo[] = [
  {
    code: 'A1',
    name: 'المبتدئ التأسيسي',
    nameEn: 'Beginner',
    description: 'الحروف، التحيات، الأرقام، وتكوين الجمل البسيطة اليومية.',
    color: '#00A99D',
  },
  {
    code: 'A2',
    name: 'المبتدئ المتقدم',
    nameEn: 'Elementary',
    description: 'التحدث عن الروتين اليومي، التسوق، الاتجاهات، والماضي البسيط.',
    color: '#0284C7',
  },
  {
    code: 'B1',
    name: 'المتوسط',
    nameEn: 'Intermediate',
    description: 'إدارة المحادثات في السفر والعمل والتعبير عن الآراء والخطط.',
    color: '#2563EB',
  },
  {
    code: 'B2',
    name: 'فوق المتوسط',
    nameEn: 'Upper-Intermediate',
    description: 'النقاش بطلاقة، فهم المقالات المعقدة، والكتابة الأكاديمية والمهنية.',
    color: '#7C3AED',
  },
  {
    code: 'C1',
    name: 'المتقدم',
    nameEn: 'Advanced',
    description: 'استخدام اللغة بمرونة عالية في البيئات الأكاديمية والقيادية.',
    color: '#DB2777',
  },
  {
    code: 'C2',
    name: 'الإتقان الاحترافي',
    nameEn: 'Proficiency',
    description: 'فهم أدق الفروق الدلالية والتعابير الاصطلاحية كمتحدث أصلي.',
    color: '#0A2A4A',
  },
];

export const LESSONS: Lesson[] = [
  {
    id: 'a1-greetings',
    level: 'A1',
    title: 'التحيات والتعارف الأساسي',
    titleEn: 'Greetings & Introductions',
    duration: '10 دقائق',
    xp: 50,
    description: 'تعلم كيف تبدأ محادثة وتعرف عن نفسك بثقة في المواقف اليومية.',
    vocabulary: [
      {
        en: 'Nice to meet you',
        ar: 'تشرفت بلقائك',
        phonetic: '/naɪs tə miːt juː/',
        example: 'Hello! My name is Jamal. Nice to meet you.',
        exampleAr: 'مرحباً! اسمي جمال. تشرفت بلقائك.',
      },
      {
        en: 'Where are you from?',
        ar: 'من أين أنت؟',
        phonetic: '/weər ɑː juː frɒm/',
        example: 'Where are you from? I am from Yemen.',
        exampleAr: 'من أين أنت؟ أنا من اليمن.',
      },
    ],
    quiz: [
      {
        question: 'ما هي العبارة الصحيحة لقول "تشرفت بلقائك" باللغة الإنجليزية؟',
        options: ['See you later', 'Nice to meet you', 'How old are you', 'Excuse me'],
        correctIndex: 1,
        explanation: 'عبارة "Nice to meet you" تُستخدم عند التعرف على شخص للمرة الأولى.',
      },
    ],
  },
  {
    id: 'a2-daily-routine',
    level: 'A2',
    title: 'الروتين اليومي وإدارة الوقت',
    titleEn: 'Daily Routine & Time Management',
    duration: '15 دقيقة',
    xp: 75,
    description: 'وصف الأنشطة اليومية باستخدام المضارع البسيط وظروف التكرار.',
    vocabulary: [
      {
        en: 'Commute',
        ar: 'التنقل اليومي للعمل أو الدراسة',
        phonetic: '/kəˈmjuːt/',
        example: 'My daily commute takes thirty minutes.',
        exampleAr: 'يستغرق تنقلي اليومي ثلاثين دقيقة.',
      },
      {
        en: 'Accomplish',
        ar: 'يُنجز / يحقق',
        phonetic: '/əˈkʌmplɪʃ/',
        example: 'I accomplish my main tasks every morning.',
        exampleAr: 'أنجز مهامي الرئيسية كل صباح.',
      },
    ],
    quiz: [
      {
        question: 'ماذا تعني كلمة "Commute"؟',
        options: ['الطبخ', 'التنقل اليومي للعمل أو الدراسة', 'النوم', 'السفر الدولي'],
        correctIndex: 1,
        explanation: 'كلمة "Commute" تشير إلى التنقل اليومي المنتظم.',
      },
    ],
  },
  {
    id: 'b1-workplace',
    level: 'B1',
    title: 'التواصل المهني واجتماعات العمل',
    titleEn: 'Professional Communication',
    duration: '20 دقيقة',
    xp: 100,
    description: 'مفردات أساسية لإدارة النقاشات المهنية وتقديم المقترحات.',
    vocabulary: [
      {
        en: 'Collaborate',
        ar: 'يتعاون في مشروع مشترك',
        phonetic: '/kəˈlæbəreɪt/',
        example: 'Our teams collaborate closely on every release.',
        exampleAr: 'تتعاون فرقنا بشكل وثيق في كل إصدار.',
      },
    ],
    quiz: [
      {
        question: 'أي كلمة تعبر عن "التعاون في مشروع مشترك"؟',
        options: ['Collaborate', 'Hesitate', 'Postpone', 'Isolate'],
        correctIndex: 0,
        explanation: '"Collaborate" تعني العمل والتعاون المشترك.',
      },
    ],
  },
];
