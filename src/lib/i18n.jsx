import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  en: {
    nav: {
      home: "Home", spoilers: "Pre-Made Spoilers", mirrors: "Mirror Caps", custom: "Custom Parts",
      technology: "Technology", portfolio: "Portfolio", about: "About", quote: "Request a Quote", contact: "Contact",
    },
    footer: {
      description: "Precision carbon-fiber manufacturing for automotive, motorcycle, drone, industrial, and fully custom applications.",
      navigate: "Navigate", contact: "Contact", hours: "Hours", privacy: "Privacy Policy", terms: "Terms & Conditions",
    },
    language: "العربية",
  },
  ar: {
    nav: {
      home: "الرئيسية", spoilers: "أجنحة جاهزة", mirrors: "أغطية المرايا", custom: "قطع مخصصة",
      technology: "التقنية", portfolio: "أعمالنا", about: "من نحن", quote: "طلب عرض سعر", contact: "اتصل بنا",
    },
    footer: {
      description: "تصنيع دقيق لأجزاء ألياف الكربون للسيارات والدراجات والطائرات المسيرة والتطبيقات الصناعية والمخصصة بالكامل.",
      navigate: "التنقل", contact: "تواصل معنا", hours: "ساعات العمل", privacy: "سياسة الخصوصية", terms: "الشروط والأحكام",
    },
    language: "English",
  },
};

const arabicText = {
  "Carbon Fiber Manufacturing": "تصنيع ألياف الكربون",
  "Carbon Fiber Parts,": "أجزاء ألياف الكربون،",
  "Engineered": "هندسة",
  "Without Limits": "بلا حدود",
  "Carbotech designs and manufactures high-performance carbon-fiber parts for cars, motorcycles, drones, industrial applications, and anything you can imagine.": "تصمم كاربوتك وتصنع أجزاء عالية الأداء من ألياف الكربون للسيارات والدراجات والطائرات المسيرة والتطبيقات الصناعية وكل ما يمكنك تخيله.",
  "Request a Custom Part": "اطلب قطعة مخصصة",
  "Explore Our Products": "استكشف منتجاتنا",
  "ISO-Grade QC": "فحص جودة بمستوى ISO",
  "CNC + Autoclave": "CNC + الأوتوكلاف",
  "Vacuum Infusion": "التشريب بالتفريغ",
  "Applications": "التطبيقات",
  "If You Can Imagine It,": "إذا استطعت تخيله،",
  "We Can Engineer It.": "يمكننا هندسته.",
  "Start a custom project": "ابدأ مشروعاً مخصصاً",
  "Tell Us What You Want to Build": "أخبرنا بما تريد بناءه",
  "Your Idea. Our Engineering.": "فكرتك. هندستنا.",
  "Carbon Fiber Without Limits.": "ألياف كربون بلا حدود.",
  "From ready-made spoilers to completely original components — share your vision and our engineers will take it from there.": "من الأجنحة الجاهزة إلى المكونات الأصلية بالكامل، شارك رؤيتك وسيتولى مهندسونا الباقي.",
  "Lightweight Performance": "أداء خفيف الوزن",
  "Up to 70% lighter than metal equivalents without sacrificing rigidity.": "أخف بنسبة تصل إلى 70٪ من البدائل المعدنية دون التضحية بالصلابة.",
  "Exceptional Strength": "قوة استثنائية",
  "High tensile-to-weight ratio engineered for extreme loads and stress.": "نسبة شد إلى وزن عالية مصممة للأحمال والإجهادات القصوى.",
  "Precision Manufacturing": "تصنيع دقيق",
  "CAD-driven, CNC-assisted production with micron-level tolerances.": "إنتاج يعتمد على CAD ومدعوم بـ CNC مع تفاوتات بمستوى الميكرون.",
  "Custom-Made Solutions": "حلول مصممة حسب الطلب",
  "From concept to delivery — built around your exact specification.": "من الفكرة إلى التسليم، مصمم وفق مواصفاتك الدقيقة.",
  "Pre-Made Spoilers": "أجنحة جاهزة",
  "Ready-to-ship carbon-fiber spoilers engineered for precise vehicle fitment. Filter by make, type, and availability.": "أجنحة من ألياف الكربون جاهزة للشحن ومصممة لتناسب المركبة بدقة. صفّ حسب الشركة والنوع والتوفر.",
  "Filter": "تصفية",
  "Search name or model": "ابحث بالاسم أو الطراز",
  "All Makes": "كل الشركات",
  "All Types": "كل الأنواع",
  "Any Availability": "أي حالة توفر",
  "Clear": "مسح",
  "No spoilers match your filters.": "لا توجد أجنحة تطابق عوامل التصفية.",
  "Featured": "مميز",
  "Request Price": "اطلب السعر",
  "View Details": "عرض التفاصيل",
  "Close": "إغلاق",
  "Mirror Caps": "أغطية المرايا",
  "Custom Parts": "قطع مخصصة",
  "Technology": "التقنية",
  "3D Design & Manufacturing Technology": "تقنية التصميم والتصنيع ثلاثي الأبعاد",
  "Carbotech combines composite craftsmanship with advanced digital engineering — from first scan to final finish.": "تجمع كاربوتك بين حرفة المواد المركبة والهندسة الرقمية المتقدمة، من المسح الأول حتى التشطيب النهائي.",
  "Live Process": "عملية مباشرة",
  "Precision at every stage": "دقة في كل مرحلة",
  "Capabilities": "القدرات",
  "Have a part that needs": "هل لديك قطعة تحتاج إلى",
  "engineering precision?": "هندسة دقيقة؟",
  "Start an Engineering Project": "ابدأ مشروعاً هندسياً",
  "Project Portfolio": "معرض المشاريع",
  "A selection of carbon-fiber components engineered and manufactured by Carbotech.": "مجموعة من مكونات ألياف الكربون التي هندستها وصنعتها كاربوتك.",
  "all": "الكل",
  "No projects in this category yet.": "لا توجد مشاريع في هذه الفئة بعد.",
  "Watch Video": "شاهد الفيديو",
  "Materials": "المواد",
  "Process": "العملية",
  "Completed": "تاريخ الإنجاز",
  "About Carbotech": "عن كاربوتك",
  "A precision-focused carbon-fiber manufacturing company combining composite craftsmanship with advanced 3D design and manufacturing technology.": "شركة تصنيع لألياف الكربون تركز على الدقة وتجمع بين حرفة المواد المركبة وتقنيات التصميم والتصنيع ثلاثي الأبعاد المتقدمة.",
  "Engineered to perform, built to last": "هندسة للأداء، وبناء يدوم",
  "What drives us": "ما يدفعنا",
  "Manufacturing standards": "معايير التصنيع",
  "Let's build something": "لنبنِ شيئاً",
  "extraordinary": "استثنائياً",
  "Get in touch": "تواصل معنا",
  "Questions, partnerships, or a project to discuss — reach out and our team will respond within one business day.": "للاستفسارات أو الشراكات أو مناقشة مشروع، تواصل معنا وسيرد فريقنا خلال يوم عمل واحد.",
  "Visit": "العنوان",
  "Call": "اتصال",
  "Email": "البريد الإلكتروني",
  "Hours": "ساعات العمل",
  "WhatsApp": "واتساب",
  "Contact us for chat details": "تواصل معنا لمعرفة تفاصيل المحادثة",
  "Ready to start a project?": "هل أنت مستعد لبدء مشروع؟",
  "Submit a detailed quotation request and our engineers will get back to you with a tailored proposal.": "أرسل طلب عرض سعر مفصلاً وسيرد عليك مهندسونا بمقترح مخصص.",
  "Request a Quote": "طلب عرض سعر",
  "Rough Price Estimator": "تقدير تقريبي للسعر",
  "Select your material and part complexity to get a ballpark estimate before you submit a request. Final pricing is confirmed after engineering review.": "اختر المادة وتعقيد القطعة للحصول على تقدير تقريبي قبل إرسال الطلب. يتم تأكيد السعر النهائي بعد المراجعة الهندسية.",
  "Material": "المادة",
  "Complexity": "التعقيد",
  "Quantity": "الكمية",
  "Estimated Range": "النطاق التقديري",
  "Per unit": "للوحدة",
  "Estimated total": "الإجمالي التقديري",
  "Indicative only. Final quote includes finishing, hardware, tooling, and shipping after engineering review.": "تقديري فقط. يشمل السعر النهائي التشطيب والملحقات والقوالب والشحن بعد المراجعة الهندسية.",
  "Tell us about your project. The more detail you provide, the more accurate your quotation will be.": "أخبرنا عن مشروعك. كلما زادت التفاصيل التي تقدمها، كان عرض السعر أدق.",
  "Name": "الاسم",
  "Phone": "الهاتف",
  "Country / City": "الدولة / المدينة",
  "Individual or Company": "فرد أم شركة",
  "Project Category": "فئة المشروع",
  "Select…": "اختر…",
  "Vehicle / Application": "المركبة / التطبيق",
  "Dimensions (mm)": "الأبعاد (مم)",
  "Budget Range": "نطاق الميزانية",
  "Deadline": "الموعد النهائي",
  "Part Description": "وصف القطعة",
  "File Attachments": "المرفقات",
  "Drag & drop or click to browse": "اسحب الملفات وأفلتها أو اضغط للتصفح",
  "Quote Request Received": "تم استلام طلب عرض السعر",
  "Thank you": "شكراً لك",
  "Privacy Policy": "سياسة الخصوصية",
  "Terms & Conditions": "الشروط والأحكام",
  "Individual": "فرد",
  "Company": "شركة",
  "Automotive": "سيارات",
  "Motorcycle": "دراجات نارية",
  "Drone": "طائرات مسيرة",
  "Industrial": "صناعي",
  "Marine": "بحري",
  "Prototype": "نموذج أولي",
  "Other": "أخرى",
  "in stock": "متوفر",
  "low stock": "كمية محدودة",
  "made to order": "حسب الطلب",
  "out of stock": "غير متوفر",
  "BMW 2 Series — Carbon Mirror Caps": "أغطية مرايا BMW الفئة الثانية من الكربون",
  "BMW 4 Series — Carbon Mirror Caps": "أغطية مرايا BMW الفئة الرابعة من الكربون",
  "BMW 5 Series — Carbon Mirror Caps": "أغطية مرايا BMW الفئة الخامسة من الكربون",
  "BMW 7 Series — Carbon Mirror Caps": "أغطية مرايا BMW الفئة السابعة من الكربون",
  "Mercedes C-Class — Carbon Mirror Caps": "أغطية مرايا Mercedes الفئة C من الكربون",
  "Mercedes E-Class — Carbon Mirror Caps": "أغطية مرايا Mercedes الفئة E من الكربون",
  "911 GT3 Touring Rear Wing": "جناح خلفي Porsche 911 GT3 Touring",
  "M3 Competition Front Lip": "شفرة أمامية BMW M3 Competition",
  "AMG GT Ducktail": "جناح ذيل بطة Mercedes AMG GT",
  "Track Aero Package": "حزمة ديناميكا هوائية للحلبات",
  "Long-Range UAV Shell": "هيكل طائرة مسيرة بعيدة المدى",
  "Autoclave-cured rear wing with OEM mounting points and UV-stable clear coat.": "جناح خلفي معالج بالأوتوكلاف بنقاط تثبيت أصلية وطبقة حماية ثابتة ضد الأشعة فوق البنفسجية.",
  "Lightweight front lip designed for direct fitment and a clean aggressive profile.": "شفرة أمامية خفيفة مصممة للتركيب المباشر ومظهر رياضي أنيق.",
  "Hand-finished ducktail spoiler with balanced downforce and a deep gloss finish.": "جناح ذيل بطة مشطب يدوياً مع قوة ضغط متوازنة ولمعان عميق.",
  "Pre-preg carbon fiber": "ألياف كربون مسبقة التشريب",
  "2x2 twill carbon": "كربون بنسيج 2x2",
  "Forged carbon": "كربون مطروق",
  "Carbon/Kevlar hybrid": "مزيج كربون وكيفلار",
  "Autoclave cure and CNC trimming": "معالجة بالأوتوكلاف وتشذيب CNC",
  "Vacuum infusion and bonded assembly": "تشريب بالتفريغ وتجميع باللصق",
};

const originalText = new WeakMap();
let translating = false;

function translateDom(language) {
  if (typeof document === "undefined" || translating) return;
  translating = true;
  const root = document.body;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const original = originalText.get(node);
    const trimmed = original.trim();
    if (!trimmed) return;
    const translated = language === "ar" ? arabicText[trimmed] : original;
    if (translated) node.nodeValue = original.replace(trimmed, translated);
  });
  root.querySelectorAll("input, textarea, [aria-label], [alt], [title]").forEach((element) => {
    if (!(element instanceof HTMLElement)) return;
    const htmlElement = element;
    ["placeholder", "aria-label", "alt", "title"].forEach((attribute) => {
      if (!htmlElement.hasAttribute(attribute)) return;
      const value = htmlElement.getAttribute(attribute);
      const key = `originalI18n${attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}`;
      if (!htmlElement.dataset[key]) htmlElement.dataset[key] = value;
      const original = htmlElement.dataset[key];
      htmlElement.setAttribute(attribute, language === "ar" ? arabicText[original] || original : original);
    });
  });
  translating = false;
}

function detectLanguage() {
  const locales = [...(navigator.languages || []), navigator.language || "en"];
  return locales.some((locale) => locale.toLowerCase().startsWith("ar")) ? "ar" : "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(detectLanguage);
  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    translateDom(language);
    const observer = new MutationObserver(() => translateDom(language));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function formatSAR(value, language = "en") {
  return new Intl.NumberFormat(language === "ar" ? "ar-SA" : "en-SA", {
    style: "currency",
    currency: "SAR",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}
