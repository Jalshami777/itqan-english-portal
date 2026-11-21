'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  LayoutDashboard,
  Volume2,
  Award,
  Flame,
  CheckCircle2,
  Smartphone,
  Sparkles,
  ChevronLeft,
  Headphones,
  Mic,
  PenTool,
  BookMarked,
  Sliders,
  PlusCircle,
} from 'lucide-react';
import { LEVELS, LESSONS, Lesson } from '@/data/curriculum';

type TabType = 'dashboard' | 'curriculum' | 'speech' | 'admin' | 'android';

export default function ItqanPlatform() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['a1-greetings']);
  const [xp, setXp] = useState<number>(350);
  const [streak] = useState<number>(12);
  const [accent, setAccent] = useState<'en-US' | 'en-GB'>('en-US');

  // Quiz state inside lesson modal
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Admin custom lesson state
  const [lessonsList, setLessonsList] = useState<Lesson[]>(LESSONS);
  const [newTitle, setNewTitle] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newLevel, setNewLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>('A1');
  const [newWordEn, setNewWordEn] = useState('');
  const [newWordAr, setNewWordAr] = useState('');

  // Speech lab state
  const [customPhrase, setCustomPhrase] = useState(
    'Consistency is the key to mastering any language.'
  );
  const [speechRate, setSpeechRate] = useState<number>(1);

  const speakText = (text: string, customRate?: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('متصفحك الحالي لا يدعم النطق الصوتي المباشر.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = accent;
    utterance.rate = customRate ?? speechRate;
    window.speechSynthesis.speak(utterance);
  };

  const handleOpenLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleCompleteLesson = (lesson: Lesson) => {
    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons([...completedLessons, lesson.id]);
      setXp((prev) => prev + lesson.xp);
    }
    setActiveLesson(null);
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTitleEn.trim() || !newWordEn.trim()) return;

    const created: Lesson = {
      id: `custom-${Date.now()}`,
      level: newLevel,
      title: newTitle,
      titleEn: newTitleEn,
      duration: '12 دقيقة',
      xp: 60,
      description: 'درس مضاف عبر لوحة تحكم الإدارة التعليمية.',
      vocabulary: [
        {
          en: newWordEn,
          ar: newWordAr || 'مفردة جديدة',
          phonetic: '/ˈkʌstəm/',
          example: `Practice using "${newWordEn}" in a real sentence.`,
          exampleAr: `تدرب على استخدام "${newWordEn}" في جملة حقيقية.`,
        },
      ],
      quiz: [
        {
          question: `ما معنى عبارة "${newWordEn}"؟`,
          options: [newWordAr || 'مفردة جديدة', 'خيار غير صحيح 1', 'خيار غير صحيح 2'],
          correctIndex: 0,
          explanation: 'تمت إضافة هذا السؤال تلقائياً من لوحة التحكم.',
        },
      ],
    };

    setLessonsList([created, ...lessonsList]);
    setNewTitle('');
    setNewTitleEn('');
    setNewWordEn('');
    setNewWordAr('');
    alert('تم نشر الدرس الجديد بنجاح في المنصة!');
  };

  const filteredLessons =
    selectedLevel === 'ALL'
      ? lessonsList
      : lessonsList.filter((l) => l.level === selectedLevel);

  const progressPercentage = Math.round(
    (completedLessons.length / lessonsList.length) * 100
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-72 bg-[#0A2A4A] text-white flex-col justify-between p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-3 pb-6 border-b border-white/10">
            <div className="w-11 h-11 rounded-xl bg-[#00A99D] flex items-center justify-center font-cairo font-bold text-xl shadow-lg">
              EN
            </div>
            <div>
              <h1 className="font-cairo font-bold text-xl tracking-wide">منصة إتقان</h1>
              <p className="text-xs text-teal-300">Next.js + Android Ready</p>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {[
              { id: 'dashboard', label: 'لوحة التحكم والإحصائيات', icon: LayoutDashboard },
              { id: 'curriculum', label: 'المسار التعليمي (A1 - C2)', icon: BookOpen },
              { id: 'speech', label: 'مختبر النطق والصوتيات', icon: Headphones },
              { id: 'admin', label: 'إدارة المحتوى والدروس', icon: Sliders },
              { id: 'android', label: 'تصدير تطبيق أندرويد', icon: Smartphone },
            ].map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-right font-medium transition-all ${
                    active
                      ? 'bg-[#00A99D] text-white shadow-md'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-teal-300 font-bold">نقاط الخبرة (XP)</span>
            <span className="font-bold">{xp} XP</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#00A99D] h-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-300 mt-2">
            أنجزت {completedLessons.length} من أصل {lessonsList.length} دروس
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 pb-24 md:pb-10">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#0A2A4A]">
              {activeTab === 'dashboard' && 'لوحة التحكم التعليمية'}
              {activeTab === 'curriculum' && 'منهج تعلم الإنجليزية الشامل'}
              {activeTab === 'speech' && 'مختبر النطق الصوتي التفاعلي'}
              {activeTab === 'admin' && 'لوحة تحكم المشرف وإضافة الدروس'}
              {activeTab === 'android' && 'دليل بناء تطبيق الأندرويد (APK)'}
            </h2>
            <p className="text-sm text-slate-500">
              من الصفر إلى الطلاقة الاحترافية وفق الإطار الأوروبي المرجعي (CEFR)
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Accent Switcher */}
            <div className="flex items-center bg-[#EAF6F5] p-1 rounded-xl border border-[#00A99D]/30">
              <button
                onClick={() => setAccent('en-US')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  accent === 'en-US'
                    ? 'bg-[#0A2A4A] text-white'
                    : 'text-[#0A2A4A] hover:bg-white/60'
                }`}
              >
                🇺🇸 US
              </button>
              <button
                onClick={() => setAccent('en-GB')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  accent === 'en-GB'
                    ? 'bg-[#0A2A4A] text-white'
                    : 'text-[#0A2A4A] hover:bg-white/60'
                }`}
              >
                🇬🇧 UK
              </button>
            </div>

            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-2 rounded-xl border border-amber-200 font-bold text-sm">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
              <span>{streak} يوم</span>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-6xl mx-auto space-y-6">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">المستوى الحالي</span>
                    <Award className="w-5 h-5 text-[#00A99D]" />
                  </div>
                  <p className="text-2xl font-bold text-[#0A2A4A] mt-2">A1 - تأسيسي</p>
                  <p className="text-xs text-emerald-600 mt-1">جاهز للانتقال إلى A2</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">إجمالي النقاط</span>
                    <Sparkles className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-2xl font-bold text-[#0A2A4A] mt-2">{xp} XP</p>
                  <p className="text-xs text-slate-500 mt-1">+50 XP عن كل درس مكتمل</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">الدروس المكتملة</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-bold text-[#0A2A4A] mt-2">
                    {completedLessons.length} / {lessonsList.length}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">نسبة الإنجاز {progressPercentage}%</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">حالة تطبيق الأندرويد</span>
                    <Smartphone className="w-5 h-5 text-[#0A2A4A]" />
                  </div>
                  <p className="text-2xl font-bold text-[#00A99D] mt-2">جاهز للبناء</p>
                  <p className="text-xs text-slate-500 mt-1">Capacitor Android SDK</p>
                </div>
              </div>

              {/* Four Language Skills */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-[#0A2A4A] mb-4">
                  تحليل المهارات اللغوية الأربعة
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { name: 'الاستماع والفهم الصوتي (Listening)', percent: 78, icon: Headphones },
                    { name: 'التحدث والنطق السليم (Speaking)', percent: 64, icon: Mic },
                    { name: 'القراءة والاستيعاب (Reading)', percent: 85, icon: BookMarked },
                    { name: 'الكتابة والقواعد (Writing)', percent: 70, icon: PenTool },
                  ].map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div key={skill.name} className="p-4 rounded-xl bg-[#EAF6F5]/60 border border-[#00A99D]/20">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 font-bold text-[#0A2A4A]">
                            <Icon className="w-4 h-4 text-[#00A99D]" />
                            <span>{skill.name}</span>
                          </div>
                          <span className="font-bold text-[#00A99D]">{skill.percent}%</span>
                        </div>
                        <div className="w-full bg-white h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#0A2A4A] h-full rounded-full"
                            style={{ width: `${skill.percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CEFR Roadmap Overview */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0A2A4A]">
                    خريطة المستويات من الصفر إلى الاحتراف
                  </h3>
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className="text-sm font-bold text-[#00A99D] hover:underline flex items-center gap-1"
                  >
                    <span>استعراض جميع الدروس</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {LEVELS.map((lvl) => (
                    <div
                      key={lvl.code}
                      onClick={() => {
                        setSelectedLevel(lvl.code);
                        setActiveTab('curriculum');
                      }}
                      className="cursor-pointer p-4 rounded-xl border border-slate-200 hover:border-[#00A99D] hover:shadow-md transition bg-slate-50/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="px-3 py-1 rounded-lg text-white font-bold text-sm"
                          style={{ backgroundColor: lvl.color }}
                        >
                          {lvl.code}
                        </span>
                        <span className="text-xs font-bold text-slate-400">{lvl.nameEn}</span>
                      </div>
                      <h4 className="font-bold text-[#0A2A4A]">{lvl.name}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {lvl.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: CURRICULUM */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedLevel('ALL')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                    selectedLevel === 'ALL'
                      ? 'bg-[#0A2A4A] text-white'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  جميع المستويات ({lessonsList.length})
                </button>
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl.code}
                    onClick={() => setSelectedLevel(lvl.code)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                      selectedLevel === lvl.code
                        ? 'bg-[#00A99D] text-white'
                        : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    {lvl.code} - {lvl.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredLessons.map((lesson) => {
                  const isDone = completedLessons.includes(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 rounded-lg bg-[#EAF6F5] text-[#0A2A4A] font-bold text-xs">
                            المستوى {lesson.level}
                          </span>
                          <span className="text-xs font-bold text-amber-600">
                            +{lesson.xp} XP • {lesson.duration}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#0A2A4A]">{lesson.title}</h3>
                        <p className="text-xs font-semibold text-[#00A99D] mb-2" dir="ltr">
                          {lesson.titleEn}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {lesson.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          {lesson.vocabulary.length} مفردات • {lesson.quiz.length} أسئلة
                        </span>
                        <button
                          onClick={() => handleOpenLesson(lesson)}
                          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition ${
                            isDone
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-[#0A2A4A] text-white hover:bg-[#00A99D]'
                          }`}
                        >
                          {isDone ? 'مراجعة الدرس ✓' : 'ابدأ الدرس الآن'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SPEECH LAB */}
          {activeTab === 'speech' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#0A2A4A]">
                  مختبر النطق الفوري (Text-to-Speech Engine)
                </h3>
                <p className="text-sm text-slate-600">
                  اكتب أي جملة إنجليزية للاستماع إلى نطقها الصحيح باللكنة الأمريكية أو البريطانية.
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-[#0A2A4A]">
                  النص الإنجليزي المراد نطقه:
                </label>
                <textarea
                  dir="ltr"
                  rows={3}
                  value={customPhrase}
                  onChange={(e) => setCustomPhrase(e.target.value)}
                  className="w-full p-4 rounded-xl border border-slate-300 focus:border-[#00A99D] focus:outline-none text-left font-medium text-lg"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => speakText(customPhrase, 1)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A2A4A] text-white font-bold hover:bg-[#00A99D] transition"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>استماع بسرعة طبيعية</span>
                </button>
                <button
                  onClick={() => {
                    setSpeechRate(0.65);
                    speakText(customPhrase, 0.65);
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#EAF6F5] text-[#0A2A4A] font-bold border border-[#00A99D]/30 hover:bg-[#00A99D]/20 transition"
                >
                  <Headphones className="w-5 h-5 text-[#00A99D]" />
                  <span>استماع بطيء للتدريب</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: ADMIN CMS */}
          {activeTab === 'admin' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <PlusCircle className="w-6 h-6 text-[#00A99D]" />
                <h3 className="text-lg font-bold text-[#0A2A4A]">
                  إضافة درس جديد إلى المنهج
                </h3>
              </div>
              <form onSubmit={handleAddLesson} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    عنوان الدرس بالعربية
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: مصطلحات السفر والمطار"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      عنوان الدرس بالإنجليزية
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      required
                      placeholder="Airport & Travel"
                      value={newTitleEn}
                      onChange={(e) => setNewTitleEn(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-left"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      المستوى (CEFR)
                    </label>
                    <select
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-slate-300 bg-white"
                    >
                      {LEVELS.map((l) => (
                        <option key={l.code} value={l.code}>
                          {l.code} - {l.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      مفردة أساسية (English)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      required
                      placeholder="Boarding Pass"
                      value={newWordEn}
                      onChange={(e) => setNewWordEn(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-left"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      الترجمة العربية
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="بطاقة صعود الطائرة"
                      value={newWordAr}
                      onChange={(e) => setNewWordAr(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#00A99D] text-white font-bold hover:bg-[#0A2A4A] transition"
                >
                  حفظ ونشر الدرس في المنصة
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: ANDROID BUILD GUIDE */}
          {activeTab === 'android' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#EAF6F5] text-[#00A99D]">
                  <Smartphone className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A2A4A]">
                    تحويل مشروع Next.js إلى تطبيق أندرويد (APK / AAB)
                  </h3>
                  <p className="text-sm text-slate-500">
                    تم إعداد ملفات next.config.mjs و capacitor.config.ts مسبقاً في هذا المشروع
                  </p>
                </div>
              </div>

              <div className="bg-[#0A2A4A] text-slate-100 p-5 rounded-xl font-mono text-sm space-y-2" dir="ltr">
                <p className="text-teal-300"># 1. Install dependencies & build static Next.js bundle</p>
                <p>npm install</p>
                <p>npm run build</p>
                <p className="text-teal-300 pt-2"># 2. Initialize & sync Android native project</p>
                <p>npx cap add android</p>
                <p>npx cap sync android</p>
                <p className="text-teal-300 pt-2"># 3. Open in Android Studio to generate APK</p>
                <p>npx cap open android</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation (Android Native Feel) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 flex justify-around py-2.5 z-30 shadow-lg">
        {[
          { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
          { id: 'curriculum', label: 'الدروس', icon: BookOpen },
          { id: 'speech', label: 'النطق', icon: Headphones },
          { id: 'admin', label: 'الإدارة', icon: Sliders },
          { id: 'android', label: 'أندرويد', icon: Smartphone },
        ].map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`flex flex-col items-center gap-1 text-xs font-bold ${
                active ? 'text-[#00A99D]' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Interactive Lesson Modal */}
      {activeLesson && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="px-3 py-1 rounded-lg bg-[#EAF6F5] text-[#00A99D] font-bold text-xs">
                  المستوى {activeLesson.level}
                </span>
                <h3 className="text-xl font-bold text-[#0A2A4A] mt-2">
                  {activeLesson.title}
                </h3>
                <p className="text-sm text-slate-500" dir="ltr">
                  {activeLesson.titleEn}
                </p>
              </div>
              <button
                onClick={() => setActiveLesson(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-sm font-bold hover:bg-slate-200"
              >
                إغلاق ✕
              </button>
            </div>

            {/* Vocabulary Cards */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#0A2A4A]">1. المفردات والعبارات الأساسية:</h4>
              {activeLesson.vocabulary.map((v, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2" dir="ltr">
                      <span className="font-bold text-lg text-[#0A2A4A]">{v.en}</span>
                      <span className="text-xs text-slate-400 font-mono">{v.phonetic}</span>
                    </div>
                    <p className="text-sm font-bold text-[#00A99D]">{v.ar}</p>
                    <p className="text-xs text-slate-600 pt-1" dir="ltr">
                      &ldquo;{v.example}&rdquo;
                    </p>
                    <p className="text-xs text-slate-500">{v.exampleAr}</p>
                  </div>
                  <button
                    onClick={() => speakText(v.en)}
                    className="p-3 rounded-xl bg-[#0A2A4A] text-white hover:bg-[#00A99D] transition shrink-0"
                    title="استمع للنطق"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Interactive Quiz */}
            <div className="space-y-4 pt-2">
              <h4 className="font-bold text-[#0A2A4A]">2. اختبار الفهم السريع:</h4>
              {activeLesson.quiz.map((q, qIdx) => (
                <div key={qIdx} className="p-4 rounded-2xl bg-[#EAF6F5]/50 border border-[#00A99D]/20 space-y-3">
                  <p className="font-bold text-sm text-[#0A2A4A]">{q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => {
                      const selected = quizAnswers[qIdx] === oIdx;
                      const isCorrect = q.correctIndex === oIdx;
                      let btnStyle = 'bg-white border-slate-200 text-slate-700';
                      if (quizSubmitted) {
                        if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-600';
                        else if (selected) btnStyle = 'bg-rose-600 text-white border-rose-600';
                      } else if (selected) {
                        btnStyle = 'bg-[#0A2A4A] text-white border-[#0A2A4A]';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() =>
                            !quizSubmitted &&
                            setQuizAnswers({ ...quizAnswers, [qIdx]: oIdx })
                          }
                          className={`p-3 rounded-xl border text-sm font-medium text-right transition ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <p className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  className="w-full py-3.5 rounded-xl bg-[#0A2A4A] text-white font-bold hover:bg-[#00A99D] transition"
                >
                  تحقق من الإجابات
                </button>
              ) : (
                <button
                  onClick={() => handleCompleteLesson(activeLesson)}
                  className="w-full py-3.5 rounded-xl bg-[#00A99D] text-white font-bold hover:bg-[#0A2A4A] transition"
                >
                  إتمام الدرس واستلام +{activeLesson.xp} XP 🎉
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
