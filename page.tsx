'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Wallet,
  BookOpen,
  CreditCard,
  Volume2,
  VolumeX,
  Headphones,
  Smartphone,
  CheckCircle2,
  FileText,
  Users,
  Calendar,
  Search,
  Send,
  Award,
  Layers,
  Flame,
  Sparkles,
} from 'lucide-react';
import {
  LEVELS,
  LESSONS,
  Lesson,
  PAYMENT_GATEWAYS,
  WALLET_STATEMENT_ROWS,
  ACCOUNT_DETAILS_ROWS,
} from '@/data/curriculum';

type PortalTab = 'student' | 'lms' | 'wallet' | 'payments' | 'speech' | 'android';
type WalletSubTab =
  | 'remaining'
  | 'invoices'
  | 'account_details'
  | 'wallet_statement'
  | 'electronic_tx'
  | 'wallet_balance';

export default function ItqanStudentPortal() {
  const [activeTab, setActiveTab] = useState<PortalTab>('student');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<string>('wallet');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [accent, setAccent] = useState<'en-US' | 'en-GB'>('en-US');

  // Wallet & Statement states
  const [walletSubTab, setWalletSubTab] = useState<WalletSubTab>('wallet_statement');
  const [txSearch, setTxSearch] = useState<string>('');

  // Payment Gateway state
  const [selectedGatewayId, setSelectedGatewayId] = useState<string>('kuraimi');
  const [paymentAmount, setPaymentAmount] = useState<string>('50000');
  const [referenceNo, setReferenceNo] = useState<string>('');
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState<string>('');

  // LMS & Speech states
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [customPhrase, setCustomPhrase] = useState<string>(
    'Welcome to Itqan Student and Learning Portal.'
  );

  // Anjez request state
  const [requestType, setRequestType] = useState<string>('إفادة قيد دراسي');
  const [requestNotes, setRequestNotes] = useState<string>('');
  const [requestSubmitted, setRequestSubmitted] = useState<boolean>(false);

  const playTone = (freq = 660) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch {
      // Ignore audio restrictions if any
    }
  };

  const speakText = (text: string, rate = 1) => {
    playTone(740);
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = accent;
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  };

  const filteredWalletRows = WALLET_STATEMENT_ROWS.filter(
    (r) =>
      r.description.toLowerCase().includes(txSearch.toLowerCase()) ||
      r.txNo.includes(txSearch) ||
      r.semester.includes(txSearch)
  );

  const selectedGateway =
    PAYMENT_GATEWAYS.find((g) => g.id === selectedGatewayId) || PAYMENT_GATEWAYS[0];

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTone(880);
    setPaymentSuccessMsg(
      `تم تسجيل طلب السداد بمبلغ (${Number(
        paymentAmount
      ).toLocaleString()} ريال يمني) عبر ${selectedGateway.name} برقم مرجع ${
        referenceNo || 'REF-2026-8841'
      }.`
    );
    setReferenceNo('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* Top Header Bar */}
      <header className="bg-[#0A2A4A] text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#00A99D] flex items-center justify-center font-cairo font-extrabold text-base shrink-0">
              إتقان
            </div>
            <div className="min-w-0">
              <h1 className="font-cairo font-bold text-base md:text-lg leading-tight truncate">
                بوابة الطالب والتعليم — منصة إتقان
              </h1>
              <p className="text-xs text-teal-200 truncate">
                جمال احمد محمد الشامي • الرقم الأكاديمي: 20260001
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Accent Selector */}
            <div className="flex items-center bg-white/10 p-1 rounded-lg text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setAccent('en-US');
                  playTone(600);
                }}
                className={`px-2.5 py-1 rounded transition ${
                  accent === 'en-US'
                    ? 'bg-[#00A99D] text-white'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                US
              </button>
              <button
                type="button"
                onClick={() => {
                  setAccent('en-GB');
                  playTone(640);
                }}
                className={`px-2.5 py-1 rounded transition ${
                  accent === 'en-GB'
                    ? 'bg-[#00A99D] text-white'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                UK
              </button>
            </div>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition shrink-0"
              title={soundEnabled ? 'كتم الصوت' : 'تفعيل الصوت'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-teal-300" />
              ) : (
                <VolumeX className="w-4 h-4 text-rose-300" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="bg-[#08223C] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-1.5 py-2 text-xs md:text-sm font-bold">
            {[
              { id: 'student', label: 'لوحة التحكم وبوابة الطالب', icon: GraduationCap },
              { id: 'wallet', label: 'المحفظة وكشف الحساب', icon: Wallet },
              { id: 'payments', label: 'السداد الإلكتروني والبنوك', icon: CreditCard },
              { id: 'lms', label: 'بوابة التعليم (A1 - C2)', icon: BookOpen },
              { id: 'speech', label: 'مختبر الصوت والنطق', icon: Headphones },
              { id: 'android', label: 'بناء تطبيق أندرويد', icon: Smartphone },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as PortalTab);
                    playTone(580);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition shrink-0 ${
                    isActive
                      ? 'bg-[#00A99D] text-white shadow'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-6">
        {/* ================= TAB 1: STUDENT PORTAL & DASHBOARD ================= */}
        {activeTab === 'student' && (
          <div className="space-y-6">
            {/* Learning & Academic Dashboard Summary */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="font-cairo font-bold text-lg text-[#0A2A4A]">
                    لوحة التحكم الأكاديمية والتعليمية
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    متابعة المسار التعليمي وفق الإطار الأوروبي (A1 - C2) وحالة السداد الأكاديمي
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#EAF6F5] text-[#00A99D] text-xs font-bold">
                  النظام جاهز ومحدث
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">المستوى الحالي</p>
                    <p className="font-cairo font-bold text-base text-[#0A2A4A] mt-1">
                      A1 — تأسيسي
                    </p>
                    <p className="text-[11px] text-[#00A99D] mt-0.5">جاهز للانتقال إلى A2</p>
                  </div>
                  <Award className="w-6 h-6 text-[#00A99D] shrink-0" />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">نقاط الخبرة (XP)</p>
                    <p className="font-cairo font-bold text-base text-[#0A2A4A] mt-1">
                      350 XP
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">+50 XP لكل درس مكتمل</p>
                  </div>
                  <Sparkles className="w-6 h-6 text-amber-500 shrink-0" />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">الدروس وسلسلة المواظبة</p>
                    <p className="font-cairo font-bold text-base text-[#0A2A4A] mt-1" dir="ltr">
                      1 / 12
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">مواظبة 12 يوم • إنجاز 8%</p>
                  </div>
                  <Flame className="w-6 h-6 text-orange-500 shrink-0" />
                </div>

                <div className="p-4 rounded-xl bg-[#0A2A4A] text-white flex items-center justify-between">
                  <div>
                    <p className="text-xs text-teal-200">المعدل ونسبة السداد</p>
                    <p className="font-cairo font-bold text-base mt-1">88.5% • سداد 100%</p>
                    <p className="text-[11px] text-teal-200 mt-0.5">متبقي: 6 إجباري / 2 اختياري</p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-[#00A99D] shrink-0" />
                </div>
              </div>
            </section>

            {/* Academic Services Grid */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <h2 className="font-cairo font-bold text-lg text-[#0A2A4A] border-r-4 border-[#00A99D] pr-3">
                الخدمات الأكاديمية
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    key: 'wallet',
                    title: 'محفظة الطالب',
                    desc: 'استعراض تفاصيل كشف حساب محفظة الطالب والحركات المالية',
                    icon: Wallet,
                  },
                  {
                    key: 'grades',
                    title: 'علامات الطلبة',
                    desc: 'استعراض الدرجات، النتائج، والتقديرات الأكاديمية',
                    icon: Award,
                  },
                  {
                    key: 'anjez',
                    title: 'منصة أنجز',
                    desc: 'تقديم معاملة إدارية ومتابعة إجراءات الطلب',
                    icon: Send,
                  },
                  {
                    key: 'groups',
                    title: 'مجموعاتي الدراسية',
                    desc: 'استعراض المجموعات الدراسية في المقررات المسجلة',
                    icon: Users,
                  },
                  {
                    key: 'absence',
                    title: 'تقرير الغياب',
                    desc: 'استعراض تقرير الغياب ونسب الحضور اليومي',
                    icon: FileText,
                  },
                  {
                    key: 'calendar',
                    title: 'التقويم الدراسي',
                    desc: 'استعراض التقويم الأكاديمي المعتمد ومواعيد الاختبارات',
                    icon: Calendar,
                  },
                ].map((srv) => {
                  const Icon = srv.icon;
                  const active = selectedServiceDetail === srv.key;
                  return (
                    <button
                      type="button"
                      key={srv.key}
                      onClick={() => {
                        setSelectedServiceDetail(srv.key);
                        playTone(620);
                      }}
                      className={`text-right p-4 rounded-xl border transition flex items-start gap-3 ${
                        active
                          ? 'bg-[#EAF6F5] border-[#00A99D] shadow-sm'
                          : 'bg-slate-50/60 border-slate-200 hover:border-[#00A99D]/60'
                      }`}
                    >
                      <div className="p-2.5 rounded-lg bg-[#0A2A4A] text-white shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-[#0A2A4A]">{srv.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {srv.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Detailed View of Selected Service */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <h3 className="font-cairo font-bold text-base text-[#0A2A4A]">
                  تفاصيل القسم المحدد
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('wallet')}
                    className="px-3 py-1.5 rounded-lg bg-[#EAF6F5] text-[#0A2A4A] text-xs font-bold hover:bg-[#00A99D] hover:text-white transition"
                  >
                    فتح المحفظة الكاملة
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('lms')}
                    className="px-3 py-1.5 rounded-lg bg-[#0A2A4A] text-white text-xs font-bold hover:bg-[#00A99D] transition"
                  >
                    الدخول إلى بوابة التعليم (LMS)
                  </button>
                </div>
              </div>

              {selectedServiceDetail === 'wallet' && (
                <div className="space-y-3">
                  <p className="text-sm text-slate-600">
                    تم اعتماد كافة حركات الإيداع والرسوم للفصل الدراسي{' '}
                    <span className="font-bold">20261</span>. يمكنك الانتقال إلى تبويب «المحفظة وكشف الحساب» للاطلاع على كامل التفاصيل.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-xs text-slate-500">إجمالي الإيداعات المعتمدة</p>
                      <p className="font-bold text-lg text-emerald-700 mt-1">51,000 ريال</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-xs text-slate-500">رسوم التسجيل المقيدة</p>
                      <p className="font-bold text-lg text-[#0A2A4A] mt-1">50,000 ريال</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-xs text-slate-500">حالة السداد</p>
                      <p className="font-bold text-lg text-[#00A99D] mt-1">
                        مسدد بالكامل (100%)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedServiceDetail === 'grades' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#0A2A4A] text-white text-right">
                        <th className="p-3">المقرر الدراسي</th>
                        <th className="p-3">أعمال الفصل</th>
                        <th className="p-3">الاختبار النهائي</th>
                        <th className="p-3">المجموع</th>
                        <th className="p-3">التقدير</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-3 font-bold">
                          English Grammar & Phonetics (A1-A2)
                        </td>
                        <td className="p-3">28 / 30</td>
                        <td className="p-3">62 / 70</td>
                        <td className="p-3 font-bold text-emerald-700">90%</td>
                        <td className="p-3 font-bold">ممتاز</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">Conversation & Listening Lab</td>
                        <td className="p-3">27 / 30</td>
                        <td className="p-3">60 / 70</td>
                        <td className="p-3 font-bold text-[#00A99D]">87%</td>
                        <td className="p-3 font-bold">جيد جداً</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {selectedServiceDetail === 'anjez' && (
                <div className="space-y-3 max-w-xl">
                  <p className="text-xs text-slate-600">
                    ارفع طلبك الإداري أو الأكاديمي ليتم معالجته إلكترونياً:
                  </p>
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-sm"
                  >
                    <option>إفادة قيد دراسي</option>
                    <option>طلب تسوية مالية / سند سداد</option>
                    <option>طلب تغيير شعبة أو مجموعة دراسية</option>
                    <option>إشعار غياب بعذر</option>
                  </select>
                  <textarea
                    rows={2}
                    placeholder="اكتب تفاصيل المعاملة..."
                    value={requestNotes}
                    onChange={(e) => setRequestNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setRequestSubmitted(true);
                      playTone(760);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#00A99D] text-white text-sm font-bold hover:bg-[#0A2A4A] transition"
                  >
                    إرسال المعاملة عبر أنجز
                  </button>
                  {requestSubmitted && (
                    <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      تم إرسال طلب ({requestType}) بنجاح وحالة الطلب: قيد المراجعة الأكاديمية.
                    </p>
                  )}
                </div>
              )}

              {selectedServiceDetail === 'groups' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="font-bold text-[#0A2A4A]">
                      المجموعة الصباحية (A1-A2) — شعبة 1
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      الأيام: السبت، الإثنين، الأربعاء • 09:00 ص
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="font-bold text-[#0A2A4A]">
                      مختبر النطق والمحادثة التفاعلي
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      الأيام: الأحد والثلاثاء • 11:00 ص
                    </p>
                  </div>
                </div>
              )}

              {selectedServiceDetail === 'absence' && (
                <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <p className="font-bold text-sm text-[#0A2A4A]">
                      نسبة الحضور والالتزام: 96.5%
                    </p>
                    <p className="text-xs text-slate-500">
                      عدد أيام الغياب المسجلة: 1 يوم فقط (بعذر معتمد)
                    </p>
                  </div>
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                    منتظم أكاديمياً
                  </span>
                </div>
              )}

              {selectedServiceDetail === 'calendar' && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold">بدء الفصل الدراسي 20261</span>
                    <span className="text-slate-600">سبتمبر 2026</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold">اختبارات منتصف الفصل والمحادثة</span>
                    <span className="text-slate-600">نوفمبر 2026</span>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ================= TAB 2: WALLET & STATEMENT ================= */}
        {activeTab === 'wallet' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
            <div className="bg-[#0284C7] text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-between">
              <span>إحصائيات عامة — محفظة الطالب وكشف الحساب</span>
              <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded">الفصل: 20261</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="bg-teal-600 text-white p-4 rounded-xl">
                <p className="text-2xl font-extrabold">0</p>
                <p className="text-xs mt-1 opacity-90">حركات الدفع الإلكتروني (المعتمدة)</p>
              </div>
              <div className="bg-cyan-600 text-white p-4 rounded-xl">
                <p className="text-2xl font-extrabold">0</p>
                <p className="text-xs mt-1 opacity-90">
                  حركات الدفع الإلكتروني (قيد المعالجة)
                </p>
              </div>
              <div className="bg-blue-600 text-white p-4 rounded-xl">
                <p className="text-2xl font-extrabold">0</p>
                <p className="text-xs mt-1 opacity-90">حركات الدفع الإلكتروني</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3 text-xs font-bold">
              {[
                { id: 'remaining', label: 'المتبقي على الطالب في كشف الحساب' },
                { id: 'invoices', label: 'الفواتير المطلوب سدادها' },
                { id: 'account_details', label: 'تفاصيل كشف الحساب' },
                { id: 'wallet_statement', label: 'كشف حساب المحفظة' },
                { id: 'electronic_tx', label: 'حركات الدفع الإلكتروني' },
                { id: 'wallet_balance', label: 'رصيد الطالب في المحفظة' },
              ].map((sub) => {
                const isSubActive = walletSubTab === sub.id;
                return (
                  <button
                    type="button"
                    key={sub.id}
                    onClick={() => {
                      setWalletSubTab(sub.id as WalletSubTab);
                      playTone(650);
                    }}
                    className={`px-3 py-2 rounded-lg border transition ${
                      isSubActive
                        ? 'bg-[#0A2A4A] text-white border-[#0A2A4A]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#00A99D]'
                    }`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                <input
                  type="text"
                  placeholder="بحث برقم الحركة أو الوصف أو المرجع..."
                  value={txSearch}
                  onChange={(e) => setTxSearch(e.target.value)}
                  className="w-full pr-9 pl-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-[#00A99D] focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('payments')}
                className="px-4 py-2 rounded-xl bg-[#00A99D] text-white text-xs font-bold hover:bg-[#0A2A4A] transition"
              >
                + سداد إلكتروني جديد
              </button>
            </div>

            {walletSubTab === 'remaining' && (
              <div className="overflow-x-auto">
                <p className="text-xs font-bold text-[#0A2A4A] mb-2">
                  المتبقي على الطالب في كشف الحساب
                </p>
                <table className="w-full text-xs border border-slate-200">
                  <thead className="bg-slate-100 text-[#0A2A4A]">
                    <tr>
                      <th className="p-3 border">العملة</th>
                      <th className="p-3 border">المبلغ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="p-3 border font-bold">ريال يمني</td>
                      <td className="p-3 border font-bold">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {walletSubTab === 'invoices' && (
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600">
                لا توجد فواتير مستحقة غير مسددة — كافة الرسوم الدراسية للفصل الحالي مسددة بنسبة 100%.
              </div>
            )}

            {walletSubTab === 'account_details' && (
              <div className="overflow-x-auto space-y-2">
                <div className="bg-slate-100 px-3 py-2 rounded text-xs font-bold text-[#0A2A4A]">
                  العملة: ريال يمني
                </div>
                <table className="w-full text-xs border border-slate-200 text-center">
                  <thead className="bg-slate-50 text-[#0A2A4A]">
                    <tr>
                      <th className="p-2.5 border">الفصل</th>
                      <th className="p-2.5 border">رقم الحركة</th>
                      <th className="p-2.5 border">تاريخ الحركة</th>
                      <th className="p-2.5 border text-right">وصف الحركة</th>
                      <th className="p-2.5 border">مدين</th>
                      <th className="p-2.5 border">دائن</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ACCOUNT_DETAILS_ROWS.map((row) => (
                      <tr key={row.txNo}>
                        <td className="p-2.5 border">{row.semester}</td>
                        <td className="p-2.5 border">{row.txNo}</td>
                        <td className="p-2.5 border">{row.txDate}</td>
                        <td className="p-2.5 border text-right font-medium">
                          {row.description}
                        </td>
                        <td className="p-2.5 border">{row.debit.toLocaleString()}</td>
                        <td className="p-2.5 border">{row.credit.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold">
                      <td colSpan={4} className="p-2.5 border text-right">
                        الإجمالي
                      </td>
                      <td className="p-2.5 border">50,000</td>
                      <td className="p-2.5 border">50,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {walletSubTab === 'wallet_statement' && (
              <div className="overflow-x-auto space-y-2">
                <div className="bg-slate-100 px-3 py-2 rounded text-xs font-bold text-[#0A2A4A]">
                  كشف حساب المحفظة — العملة: ريال يمني
                </div>
                <table className="w-full text-xs border border-slate-200 text-center">
                  <thead className="bg-slate-50 text-[#0A2A4A]">
                    <tr>
                      <th className="p-2.5 border">الفصل</th>
                      <th className="p-2.5 border">رقم الحركة</th>
                      <th className="p-2.5 border text-right">وصف الحركة</th>
                      <th className="p-2.5 border">العملة</th>
                      <th className="p-2.5 border">دائن</th>
                      <th className="p-2.5 border">مدين</th>
                      <th className="p-2.5 border">الرصيد دائن</th>
                      <th className="p-2.5 border">الرصيد مدين</th>
                      <th className="p-2.5 border">تاريخ الحركة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWalletRows.map((row) => (
                      <tr key={row.txNo} className="hover:bg-slate-50">
                        <td className="p-2.5 border">{row.semester}</td>
                        <td className="p-2.5 border">{row.txNo}</td>
                        <td className="p-2.5 border text-right leading-relaxed">
                          {row.description}
                        </td>
                        <td className="p-2.5 border">ريال يمني</td>
                        <td className="p-2.5 border font-bold text-emerald-700">
                          {row.credit.toLocaleString()}
                        </td>
                        <td className="p-2.5 border font-bold text-rose-700">
                          {row.debit.toLocaleString()}
                        </td>
                        <td className="p-2.5 border">
                          {row.balanceCredit.toLocaleString()}
                        </td>
                        <td className="p-2.5 border">
                          {row.balanceDebit.toLocaleString()}
                        </td>
                        <td className="p-2.5 border whitespace-nowrap">{row.txDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {walletSubTab === 'electronic_tx' && (
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600">
                لا توجد حركات دفع إلكتروني معلقة حالياً. يمكنك تنفيذ عملية سداد فوري من تبويب «السداد الإلكتروني والبنوك».
              </div>
            )}

            {walletSubTab === 'wallet_balance' && (
              <div className="overflow-x-auto">
                <p className="text-xs font-bold text-[#0A2A4A] mb-2">
                  رصيد الطالب في المحفظة
                </p>
                <table className="w-full text-xs border border-slate-200 text-center">
                  <thead className="bg-slate-100 text-[#0A2A4A]">
                    <tr>
                      <th className="p-3 border">العملة</th>
                      <th className="p-3 border">المبلغ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border font-bold">ريال يمني</td>
                      <td className="p-3 border font-bold text-[#00A99D]">1,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: PAYMENT GATEWAYS ================= */}
        {activeTab === 'payments' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <h2 className="font-cairo font-bold text-lg text-[#0A2A4A]">
                وسائل الدفع والسداد الإلكتروني المعتمدة
              </h2>
              <p className="text-xs text-slate-600">
                اختر البنك أو المحفظة الإلكترونية المناسبة لإتمام السداد أو تغذية محفظة الطالب:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PAYMENT_GATEWAYS.map((gw) => {
                  const active = gw.id === selectedGatewayId;
                  return (
                    <button
                      type="button"
                      key={gw.id}
                      onClick={() => {
                        setSelectedGatewayId(gw.id);
                        setPaymentSuccessMsg('');
                        playTone(670);
                      }}
                      className={`text-right p-4 rounded-xl border transition ${
                        active
                          ? 'bg-[#EAF6F5] border-[#00A99D] shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:border-[#00A99D]/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <span className="font-bold text-sm text-[#0A2A4A]">{gw.name}</span>
                        <span
                          className="text-[10px] font-bold text-white px-2 py-0.5 rounded shrink-0"
                          style={{ backgroundColor: gw.badgeColor }}
                        >
                          {gw.code}
                        </span>
                      </div>
                      <p className="text-xs text-[#00A99D] font-medium">{gw.type}</p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {gw.instructions}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 h-fit">
              <h3 className="font-cairo font-bold text-base text-[#0A2A4A]">
                إتمام عملية السداد ({selectedGateway.name})
              </h3>
              <form onSubmit={handlePaymentSubmit} className="space-y-3 text-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    المبلغ (ريال يمني)
                  </label>
                  <input
                    type="number"
                    required
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رقم المرجع البنكي / رقم الإشعار
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: FT262650FOLCK"
                    value={referenceNo}
                    onChange={(e) => setReferenceNo(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0A2A4A] text-white font-bold hover:bg-[#00A99D] transition"
                >
                  تأكيد وإرسال سند السداد
                </button>
              </form>

              {paymentSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{paymentSuccessMsg}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: LMS ================= */}
        {activeTab === 'lms' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h2 className="font-cairo font-bold text-lg text-[#0A2A4A] mb-3">
                بوابة التعليم (LMS) — المقررات والمستويات (A1 إلى C2)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                {LEVELS.map((lvl) => (
                  <div
                    key={lvl.code}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="px-2.5 py-0.5 rounded text-white text-xs font-bold"
                        style={{ backgroundColor: lvl.color }}
                      >
                        {lvl.code}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{lvl.nameEn}</span>
                    </div>
                    <h3 className="font-bold text-sm text-[#0A2A4A]">{lvl.name}</h3>
                    <p className="text-xs text-slate-600 mt-1">{lvl.description}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {LESSONS.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-4 rounded-2xl border border-slate-200 flex flex-col justify-between bg-white"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#00A99D] bg-[#EAF6F5] px-2.5 py-1 rounded-lg">
                        المستوى {lesson.level}
                      </span>
                      <h4 className="font-bold text-base text-[#0A2A4A] mt-2">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-400" dir="ltr">
                        {lesson.titleEn}
                      </p>
                      <p className="text-xs text-slate-600 mt-2">{lesson.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveLesson(lesson);
                        playTone(720);
                      }}
                      className="mt-4 w-full py-2.5 rounded-xl bg-[#0A2A4A] text-white text-xs font-bold hover:bg-[#00A99D] transition"
                    >
                      فتح الدرس الصوتي والتفاعلي
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: SPEECH LAB ================= */}
        {activeTab === 'speech' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 max-w-3xl">
            <h2 className="font-cairo font-bold text-lg text-[#0A2A4A]">
              مختبر الصوت والنطق الإنجليزي الفوري
            </h2>
            <textarea
              dir="ltr"
              rows={3}
              value={customPhrase}
              onChange={(e) => setCustomPhrase(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-slate-300 text-left font-medium"
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => speakText(customPhrase, 1)}
                className="px-5 py-2.5 rounded-xl bg-[#0A2A4A] text-white text-sm font-bold hover:bg-[#00A99D] transition flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>نطق طبيعي ({accent})</span>
              </button>
              <button
                type="button"
                onClick={() => speakText(customPhrase, 0.65)}
                className="px-5 py-2.5 rounded-xl bg-[#EAF6F5] text-[#0A2A4A] text-sm font-bold border border-[#00A99D]/40 flex items-center gap-2"
              >
                <Headphones className="w-4 h-4 text-[#00A99D]" />
                <span>نطق بطيء للتدريب</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 6: ANDROID BUILD ================= */}
        {activeTab === 'android' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#00A99D]" />
              <h2 className="font-cairo font-bold text-lg text-[#0A2A4A]">
                البناء الآلي لتطبيق أندرويد عبر GitHub Actions
              </h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              يتم بناء التطبيق وتوليد ملف <span className="font-mono font-bold">app-debug.apk</span> تلقائياً عبر سير العمل <span className="font-mono font-bold">.github/workflows/main.yml</span> داخل مستودع GitHub دون الحاجة لأوامر محلية على الهاتف.
            </p>
          </div>
        )}
      </main>

      {/* Active Lesson Modal */}
      {activeLesson && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-xs font-bold text-[#00A99D]">
                  المستوى {activeLesson.level}
                </span>
                <h3 className="font-cairo font-bold text-lg text-[#0A2A4A]">
                  {activeLesson.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveLesson(null)}
                className="px-3 py-1 rounded-lg bg-slate-100 text-xs font-bold"
              >
                إغلاق
              </button>
            </div>

            {activeLesson.vocabulary.map((v, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="font-bold text-sm text-[#0A2A4A]" dir="ltr">
                    {v.en}{' '}
                    <span className="text-xs text-slate-400 font-mono">{v.phonetic}</span>
                  </p>
                  <p className="text-xs font-bold text-[#00A99D]">{v.ar}</p>
                  <p className="text-xs text-slate-600 mt-1" dir="ltr">
                    &ldquo;{v.example}&rdquo;
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => speakText(v.en)}
                  className="p-2.5 rounded-xl bg-[#0A2A4A] text-white hover:bg-[#00A99D] transition shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
