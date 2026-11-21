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
        example: 'Hello! My name is Omar. Nice to meet you.',
        exampleAr: 'مرحباً! اسمي عمر. تشرفت بلقائك.',
      },
      {
        en: 'Where are you from?',
        ar: 'من أين أنت؟',
        phonetic: '/weər ɑː juː frɒm/',
        example: 'Where are you from? I am from Yemen.',
        exampleAr: 'من أين أنت؟ أنا من اليمن.',
      },
      {
        en: 'How is it going?',
        ar: 'كيف تسير الأمور؟',
        phonetic: '/haʊ ɪz ɪt ˈɡəʊɪŋ/',
        example: 'Hi Sarah, how is it going today?',
        exampleAr: 'أهلاً سارة، كيف تسير الأمور اليوم؟',
      },
      {
        en: 'See you soon',
        ar: 'أراك قريباً',
        phonetic: '/siː juː suːn/',
        example: 'Thank you for your help. See you soon!',
        exampleAr: 'شكراً لمساعدتك. أراك قريباً!',
      },
    ],
    quiz: [
      {
        question: 'ما هي العبارة الصحيحة لقول "تشرفت بلقائك" باللغة الإنجليزية؟',
        options: ['See you later', 'Nice to meet you', 'How old are you', 'Excuse me'],
        correctIndex: 1,
        explanation: 'عبارة "Nice to meet you" تُستخدم عند التعرف على شخص للمرة الأولى.',
      },
      {
        question: 'اختر الرد المناسب لسؤال: "Where are you from?"',
        options: ['I am 25 years old.', 'I am fine, thanks.', 'I am from Sana’a.', 'Yes, I do.'],
        correctIndex: 2,
        explanation: 'السؤال يستفسر عن المكان أو البلد، لذا الإجابة الصحيحة تبدأ بـ "I am from...".',
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
        example: 'My daily commute takes thirty minutes by bus.',
        exampleAr: 'يستغرق تنقلي اليومي ثلاثين دقيقة بالحافلة.',
      },
      {
        en: 'Accomplish',
        ar: 'يُنجز / يحقق',
        phonetic: '/əˈkʌmplɪʃ/',
        example: 'I try to accomplish my main tasks before noon.',
        exampleAr: 'أحاول إنجاز مهامي الرئيسية قبل الظهيرة.',
      },
      {
        en: 'Schedule',
        ar: 'جدول مواعيد',
        phonetic: '/ˈʃedjuːl/',
        example: 'Let me check my schedule for tomorrow morning.',
        exampleAr: 'دعني أتحقق من جدول مواعيدي لصباح الغد.',
      },
    ],
    quiz: [
      {
        question: 'ماذا تعني كلمة "Commute" في سياق الحياة اليومية؟',
        options: ['الطبخ المنزلي', 'التنقل اليومي للعمل أو الدراسة', 'النوم المبكر', 'التسوق الإلكتروني'],
        correctIndex: 1,
        explanation: 'كلمة "Commute" تشير إلى رحلة الذهاب والعودة اليومية بين المنزل ومكان العمل أو الدراسة.',
      },
    ],
  },
  {
    id: 'b1-workplace',
    level: 'B1',
    title: 'التواصل المهني واجتماعات العمل',
    titleEn: 'Professional Communication & Meetings',
    duration: '20 دقيقة',
    xp: 100,
    description: 'مفردات أساسية لإدارة النقاشات المهنية وتقديم المقترحات في العمل.',
    vocabulary: [
      {
        en: 'Collaborate',
        ar: 'يتعاون في مشروع مشترك',
        phonetic: '/kəˈlæbəreɪt/',
        example: 'Our engineering and design teams collaborate closely.',
        exampleAr: 'يتعاون فريقا الهندسة والتصميم لدينا بشكل وثيق.',
      },
      {
        en: 'Deadline',
        ar: 'الموعد النهائي للتسليم',
        phonetic: '/ˈdedlaɪn/',
        example: 'We must submit the final report before Friday’s deadline.',
        exampleAr: 'يجب أن نسلم التقرير النهائي قبل الموعد النهائي يوم الجمعة.',
      },
      {
        en: 'Feedback',
        ar: 'تغذية راجعة / ملاحظات تقييمية',
        phonetic: '/ˈfiːdbæk/',
        example: 'We appreciate your constructive feedback on the new app.',
        exampleAr: 'نقدّر ملاحظاتك البنّاءة حول التطبيق الجديد.',
      },
    ],
    quiz: [
      {
        question: 'أي كلمة تعبر عن "الموعد النهائي لتسليم العمل"؟',
        options: ['Feedback', 'Deadline', 'Headline', 'Outline'],
        correctIndex: 1,
        explanation: '"Deadline" هو المصطلح المعتمد للموعد النهائي لإنجاز مهمة أو مشروع.',
      },
    ],
  },
  {
    id: 'b2-negotiation',
    level: 'B2',
    title: 'مهارات التفاوض والإقناع المتقدم',
    titleEn: 'Advanced Negotiation & Persuasion',
    duration: '25 دقيقة',
    xp: 130,
    description: 'صياغة الحجج المنطقية والوصول إلى حلول وسط في بيئات الأعمال الدولية.',
    vocabulary: [
      {
        en: 'Compromise',
        ar: 'حل وسط / تسوية متبادلة',
        phonetic: '/ˈkɒmprəmaɪz/',
        example: 'Both sides reached a fair compromise after hours of discussion.',
        exampleAr: 'توصل الطرفان إلى حل وسط عادل بعد ساعات من النقاش.',
      },
      {
        en: 'Leverage',
        ar: 'نقطة قوة / ورقة تفاوض',
        phonetic: '/ˈliːvərɪdʒ/',
        example: 'Strong market demand gives our company significant leverage.',
        exampleAr: 'الطلب القوي في السوق يمنح شركتنا ورقة تفاوض مهمة.',
      },
    ],
    quiz: [
      {
        question: 'ما المقصود بكلمة "Compromise" أثناء المفاوضات؟',
        options: ['إلغاء العقد', 'التوصل إلى حل وسط يرضي الطرفين', 'تأجيل الاجتماع', 'رفض العرض نهائياً'],
        correctIndex: 1,
        explanation: '"Compromise" تعني تقديم تنازلات متبادلة للوصول إلى اتفاق مشترك.',
      },
    ],
  },
  {
    id: 'c1-critical-thinking',
    level: 'C1',
    title: 'التحليل النقدي والخطابة الأكاديمية',
    titleEn: 'Critical Analysis & Academic Rhetoric',
    duration: '30 دقيقة',
    xp: 160,
    description: 'استخدام التراكيب البلاغية الدقيقة لتحليل القضايا المعقدة.',
    vocabulary: [
      {
        en: 'Substantiate',
        ar: 'يُدعّم بالأدلة والبراهين',
        phonetic: '/səbˈstænʃieɪt/',
        example: 'Researchers must substantiate their claims with empirical data.',
        exampleAr: 'يجب على الباحثين تدعيم ادعاءاتهم ببيانات تجريبية.',
      },
      {
        en: 'Nuance',
        ar: 'فارق دقيق في المعنى أو التعبير',
        phonetic: '/ˈnjuːɑːns/',
        example: 'Mastering a language requires understanding every subtle nuance.',
        exampleAr: 'إتقان اللغة يتطلب فهم كل فارق دقيق في المعنى.',
      },
    ],
    quiz: [
      {
        question: 'اختر الفعل الذي يعني "تقديم أدلة لإثبات صحة فكرة أو فرضية":',
        options: ['Substantiate', 'Exaggerate', 'Fluctuate', 'Imitate'],
        correctIndex: 0,
        explanation: '"Substantiate" تعني إثبات أو تدعيم القول بالأدلة الملموسة.',
      },
    ],
  },
  {
    id: 'c2-mastery',
    level: 'C2',
    title: 'البلاغة الأدبية والتعابير الاصطلاحية العليا',
    titleEn: 'Literary Eloquence & Native Idioms',
    duration: '35 دقيقة',
    xp: 200,
    description: 'التعبير بأسلوب المتحدثين الأصليين المثقفين في كافة السياقات.',
    vocabulary: [
      {
        en: 'Ubiquitous',
        ar: 'واسع الانتشار / موجود في كل مكان',
        phonetic: '/juːˈbɪkwɪtəs/',
        example: 'Smartphones have become ubiquitous in modern society.',
        exampleAr: 'أصبحت الهواتف الذكية موجودة في كل مكان في المجتمع الحديث.',
      },
      {
        en: 'Quintessential',
        ar: 'نموذجي / جوهر الشيء ومثاله الأعلى',
        phonetic: '/ˌkwɪntɪˈsenʃl/',
        example: 'Sana’a is the quintessential example of ancient Arabian architecture.',
        exampleAr: 'صنعاء هي المثال النموذجي الأعلى للعمارة العربية العريقة.',
      },
    ],
    quiz: [
      {
        question: 'ما معنى الصفة المتقدمة "Ubiquitous"؟',
        options: ['نادر الوجود', 'موجود في كل مكان وواسع الانتشار', 'معقد للغاية', 'مؤقت وزائل'],
        correctIndex: 1,
        explanation: '"Ubiquitous" تصف الشيء المنتشر في كل مكان في آنٍ واحد.',
      },
    ],
  },
];
