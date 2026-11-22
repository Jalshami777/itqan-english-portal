export type Lesson = {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  titleEn: string;
  duration: string;
  xp: number;
  description: string;
  vocabulary: {
    en: string;
    ar: string;
    phonetic: string;
    example: string;
    exampleAr: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
};

export type Level = {
  code: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  name: string;
  nameEn: string;
  description: string;
  color: string;
};

export const LEVELS: Level[] = [
  { code: 'A1', name: 'تأسيسي', nameEn: 'Beginner', description: 'التحية والتعريف بالنفس والأرقام.', color: '#00A99D' },
  { code: 'A2', name: 'ابتدائي', nameEn: 'Elementary', description: 'الحياة اليومية والتسوق والسفر البسيط.', color: '#0A2A4A' },
  { code: 'B1', name: 'متوسط', nameEn: 'Intermediate', description: 'التحدث بطلاقة عن العمل والدراسة.', color: '#F59E0B' },
  { code: 'B2', name: 'فوق المتوسط', nameEn: 'Upper Intermediate', description: 'النقاشات والآراء والحجج.', color: '#8B5CF6' },
  { code: 'C1', name: 'متقدم', nameEn: 'Advanced', description: 'اللغة الأكاديمية والمهنية المتقدمة.', color: '#EC4899' },
  { code: 'C2', name: 'احترافي', nameEn: 'Proficient', description: 'إتقان كامل قريب من الناطق الأصلي.', color: '#EF4444' },
];

const vocab = (en: string, ar: string, example: string, exampleAr: string) => ({
  en, ar, phonetic: '/.../', example, exampleAr,
});

export const LESSONS: Lesson[] = [
  {
    id: 'a1-greetings', level: 'A1', title: 'التحية والتعريف بالنفس', titleEn: 'Greetings & Introductions',
    duration: '10 دقيقة', xp: 50, description: 'تعلم كيف تحيي الناس وتعرف بنفسك بالإنجليزية.',
    vocabulary: [
      vocab('Hello', 'مرحباً', 'Hello, my name is Ahmed.', 'مرحباً، اسمي أحمد.'),
      vocab('Good morning', 'صباح الخير', 'Good morning, how are you?', 'صباح الخير، كيف حالك؟'),
    ],
    quiz: [{ question: 'ما معنى Hello؟', options: ['مرحباً', 'وداعاً', 'شكراً'], correctIndex: 0, explanation: 'Hello تعني مرحباً.' }],
  },
  {
    id: 'a1-numbers', level: 'A1', title: 'الأرقام والأيام', titleEn: 'Numbers & Days',
    duration: '12 دقيقة', xp: 50, description: 'الأرقام من 1 إلى 100 وأيام الأسبوع.',
    vocabulary: [
      vocab('One', 'واحد', 'I have one book.', 'لدي كتاب واحد.'),
      vocab('Monday', 'الاثنين', 'Today is Monday.', 'اليوم هو الاثنين.'),
    ],
    quiz: [{ question: 'ما معنى Monday؟', options: ['الاثنين', 'الجمعة', 'الأحد'], correctIndex: 0, explanation: 'Monday هو يوم الاثنين.' }],
  },
  {
    id: 'a2-shopping', level: 'A2', title: 'التسوق والأسعار', titleEn: 'Shopping & Prices',
    duration: '12 دقيقة', xp: 60, description: 'كيف تسأل عن السعر وتشتري في المتجر.',
    vocabulary: [
      vocab('How much is this?', 'بكم هذا؟', 'How much is this shirt?', 'بكم هذا القميص؟'),
      vocab('Discount', 'خصم', 'Is there a discount?', 'هل يوجد خصم؟'),
    ],
    quiz: [{ question: 'كيف تسأل عن السعر؟', options: ['How much is this?', 'What is your name?', 'Where are you?'], correctIndex: 0, explanation: 'How much is this تعني بكم هذا؟' }],
  },
  {
    id: 'a2-travel', level: 'A2', title: 'السفر والمطار', titleEn: 'Travel & Airport',
    duration: '15 دقيقة', xp: 60, description: 'مفردات المطار والفندق والسفر.',
    vocabulary: [
      vocab('Boarding Pass', 'بطاقة صعود الطائرة', 'Here is my boarding pass.', 'هذه بطاقة صعود الطائرة.'),
      vocab('Hotel', 'فندق', 'I booked a hotel.', 'حجزت فندقاً.'),
    ],
    quiz: [{ question: 'ما معنى Boarding Pass؟', options: ['بطاقة صعود الطائرة', 'جواز سفر', 'تذكرة قطار'], correctIndex: 0, explanation: 'Boarding Pass هي بطاقة صعود الطائرة.' }],
  },
  {
    id: 'b1-work', level: 'B1', title: 'الإنجليزية في العمل', titleEn: 'English at Work',
    duration: '15 دقيقة', xp: 70, description: 'الاجتماعات والإيميلات والعروض التقديمية.',
    vocabulary: [
      vocab('Meeting', 'اجتماع', 'We have a meeting at 10.', 'لدينا اجتماع الساعة 10.'),
      vocab('Deadline', 'موعد نهائي', 'The deadline is Friday.', 'الموعد النهائي يوم الجمعة.'),
    ],
    quiz: [{ question: 'ما معنى Deadline؟', options: ['موعد نهائي', 'إجازة', 'راتب'], correctIndex: 0, explanation: 'Deadline تعني الموعد النهائي للتسليم.' }],
  },
  {
    id: 'b1-opinion', level: 'B1', title: 'التعبير عن الرأي', titleEn: 'Expressing Opinions',
    duration: '14 دقيقة', xp: 70, description: 'كيف تعبر عن رأيك وتوافق أو تعارض بلباقة.',
    vocabulary: [
      vocab('In my opinion', 'في رأيي', 'In my opinion, this is a good idea.', 'في رأيي، هذه فكرة جيدة.'),
      vocab('I agree', 'أوافق', 'I agree with you.', 'أوافقك الرأي.'),
    ],
    quiz: [{ question: 'كيف تقول "في رأيي"؟', options: ['In my opinion', 'In my house', 'In my car'], correctIndex: 0, explanation: 'In my opinion تعني في رأيي.' }],
  },
  {
    id: 'b2-debate', level: 'B2', title: 'النقاش والحجج', titleEn: 'Debate & Arguments',
    duration: '18 دقيقة', xp: 80, description: 'بناء حجة قوية والرد على الآراء المخالفة.',
    vocabulary: [
      vocab('On the other hand', 'من ناحية أخرى', 'On the other hand, it is expensive.', 'من ناحية أخرى، إنه غالي.'),
      vocab('Evidence', 'دليل', 'There is no evidence.', 'لا يوجد دليل.'),
    ],
    quiz: [{ question: 'ما معنى Evidence؟', options: ['دليل', 'قصة', 'حلم'], correctIndex: 0, explanation: 'Evidence تعني دليل.' }],
  },
  {
    id: 'b2-movies', level: 'B2', title: 'الأفلام والثقافة', titleEn: 'Movies & Culture',
    duration: '15 دقيقة', xp: 80, description: 'التحدث عن الأفلام والكتب والثقافة.',
    vocabulary: [
      vocab('Plot', 'حبكة / قصة', 'The plot was amazing.', 'كانت القصة رائعة.'),
      vocab('Character', 'شخصية', 'My favorite character is Ali.', 'شخصيتي المفضلة هي علي.'),
    ],
    quiz: [{ question: 'ما معنى Plot في فيلم؟', options: ['حبكة / قصة', 'مسرح', 'أغنية'], correctIndex: 0, explanation: 'Plot تعني قصة الفيلم.' }],
  },
  {
    id: 'c1-academic', level: 'C1', title: 'الكتابة الأكاديمية', titleEn: 'Academic Writing',
    duration: '20 دقيقة', xp: 90, description: 'كتابة المقالات والتقارير بأسلوب أكاديمي.',
    vocabulary: [
      vocab('Furthermore', 'علاوة على ذلك', 'Furthermore, the results show...', 'علاوة على ذلك، النتائج تظهر...'),
      vocab('Consequently', 'نتيجة لذلك', 'Consequently, we changed the plan.', 'نتيجة لذلك، غيرنا الخطة.'),
    ],
    quiz: [{ question: 'ما معنى Furthermore؟', options: ['علاوة على ذلك', 'أخيراً', 'بالمناسبة'], correctIndex: 0, explanation: 'Furthermore تعني علاوة على ذلك.' }],
  },
  {
    id: 'c1-business', level: 'C1', title: 'إنجليزية الأعمال المتقدمة', titleEn: 'Advanced Business English',
    duration: '20 دقيقة', xp: 90, description: 'التفاوض والعقود والعروض التجارية.',
    vocabulary: [
      vocab('Negotiation', 'تفاوض', 'The negotiation was successful.', 'كان التفاوض ناجحاً.'),
      vocab('Revenue', 'إيرادات', 'Revenue increased this year.', 'زادت الإيرادات هذا العام.'),
    ],
    quiz: [{ question: 'ما معنى Revenue؟', options: ['إيرادات', 'خسارة', 'ضريبة'], correctIndex: 0, explanation: 'Revenue تعني الإيرادات.' }],
  },
  {
    id: 'c2-idioms', level: 'C2', title: 'التعابير الاصطلاحية', titleEn: 'Idioms & Native Expressions',
    duration: '18 دقيقة', xp: 100, description: 'تعابير يستخدمها الناطقون الأصليون.',
    vocabulary: [
      vocab('Break the ice', 'كسر الجمود', 'He told a joke to break the ice.', 'قال نكتة لكسر الجمود.'),
      vocab('Piece of cake', 'سهل جداً', 'The exam was a piece of cake.', 'الامتحان كان سهلاً جداً.'),
    ],
    quiz: [{ question: 'ما معنى Piece of cake؟', options: ['سهل جداً', 'قطعة كيك', 'صعب'], correctIndex: 0, explanation: 'Piece of cake تعني سهل جداً.' }],
  },
  {
    id: 'c2-fluency', level: 'C2', title: 'الطلاقة والخطابة', titleEn: 'Fluency & Public Speaking',
    duration: '22 دقيقة', xp: 100, description: 'الخطابة والإلقاء بثقة أمام الجمهور.',
    vocabulary: [
      vocab('Persuade', 'يقنع', 'She persuaded the audience.', 'أقنعت الجمهور.'),
      vocab('Eloquent', 'بليغ / فصيح', 'He is an eloquent speaker.', 'إنه متحدث بليغ.'),
    ],
    quiz: [{ question: 'ما معنى Persuade؟', options: ['يقنع', 'يضحك', 'ينام'], correctIndex: 0, explanation: 'Persuade تعني يقنع.' }],
  },
];
