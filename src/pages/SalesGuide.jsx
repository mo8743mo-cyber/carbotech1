import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageSquare, ShieldCheck, Sparkles, Target } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n";

const CONTENT = {
  en: {
    eyebrow: "[ Sales Enablement / 08 ]",
    title: "A better way to talk carbon fiber.",
    intro: "Use this guide to understand Carbotech, explain our value clearly, and help every customer choose the right next step.",
    missionTitle: "What we do",
    mission: "Carbotech designs and manufactures precision carbon-fiber parts for automotive, motorcycle, drone, industrial, and fully custom applications. We take projects from digital design and tooling through layup, curing, finishing, and quality control.",
    principlesTitle: "The Carbotech difference",
    principles: [
      ["Engineering first", "We start with the load case, fitment, function, and finish the part must deliver."],
      ["Built in-house", "Designers, composite technicians, and CNC machinists work together for faster, clearer decisions."],
      ["Quality you can explain", "Material selection, controlled curing, dimensional inspection, and traceability protect the result."],
    ],
    conversationTitle: "A simple customer conversation",
    steps: [
      ["1", "Discover", "Ask what the customer is building, what vehicle or application it fits, the quantity, deadline, and desired finish."],
      ["2", "Clarify", "Confirm whether they need a ready-made product, a modified part, or a fully engineered custom solution."],
      ["3", "Recommend", "Connect the requirement to the right material, process, and next step. Never promise a final price before engineering review."],
      ["4", "Advance", "Invite the customer to share photos, drawings, dimensions, or a quote request so the technical team can respond accurately."],
    ],
    questionsTitle: "Questions worth asking",
    questions: ["What problem should the part solve?", "What vehicle, machine, or platform will it fit?", "Is the priority weight, strength, appearance, speed, or cost?", "Do you have a sample, drawing, scan, or reference part?", "How many parts do you need and when do you need them?"],
    faqTitle: "Quick answers",
    faqs: [
      ["Why carbon fiber?", "It delivers excellent stiffness and strength at low weight, with a distinctive technical finish."],
      ["Can you copy an existing part?", "Yes. Reverse engineering, scanning, and sample-based design are part of our capability."],
      ["Do you only make automotive parts?", "No. We also support motorcycles, drones, robotics, industrial equipment, marine applications, and original prototypes."],
      ["How is pricing decided?", "Pricing depends on geometry, material, tooling, quantity, finish, and schedule. A final quote follows engineering review."],
    ],
    ctaTitle: "Ready to make the next conversation useful?",
    ctaText: "Send the customer to our quote form or invite them to explore our products and portfolio.",
    quote: "Start a Quote",
    portfolio: "Show the Portfolio",
  },
  ar: {
    eyebrow: "[ تمكين المبيعات / 08 ]",
    title: "طريقة أفضل للحديث عن ألياف الكربون.",
    intro: "استخدم هذا الدليل لفهم كاربوتك وشرح قيمتنا بوضوح ومساعدة كل عميل على اختيار الخطوة التالية المناسبة.",
    missionTitle: "ماذا نقدم",
    mission: "تصمم كاربوتك وتصنع أجزاء دقيقة من ألياف الكربون للسيارات والدراجات والطائرات المسيرة والتطبيقات الصناعية والمشاريع المخصصة بالكامل. نرافق المشروع من التصميم الرقمي والقوالب إلى الرص والمعالجة والتشطيب وفحص الجودة.",
    principlesTitle: "ما يميز كاربوتك",
    principles: [
      ["الهندسة أولاً", "نبدأ بمتطلبات الحمل والملاءمة والوظيفة والتشطيب الذي يجب أن تحققه القطعة."],
      ["تصنيع داخلي", "يعمل المصممون وفنيو المواد المركبة ومشغلو CNC معاً لاتخاذ قرارات أسرع وأوضح."],
      ["جودة يمكن شرحها", "يحمي اختيار المواد والمعالجة المنضبطة والفحص البُعدي والتتبع النتيجة النهائية."],
    ],
    conversationTitle: "محادثة بسيطة مع العميل",
    steps: [
      ["1", "اكتشف", "اسأل عما يبنيه العميل، والمركبة أو التطبيق، والكمية والموعد والتشطيب المطلوب."],
      ["2", "وضّح", "تأكد هل يحتاج إلى منتج جاهز أو تعديل قطعة أو حل مخصص بالكامل."],
      ["3", "اقترح", "اربط المتطلب بالمادة والعملية والخطوة التالية المناسبة. لا تعد بسعر نهائي قبل المراجعة الهندسية."],
      ["4", "تقدّم", "اطلب صوراً أو رسومات أو أبعاداً أو نموذجاً حتى يجيب الفريق الفني بدقة."],
    ],
    questionsTitle: "أسئلة مهمة",
    questions: ["ما المشكلة التي يجب أن تحلها القطعة؟", "على أي مركبة أو آلة أو منصة ستُركب؟", "هل الأولوية للوزن أم القوة أم الشكل أم السرعة أم التكلفة؟", "هل لديك عينة أو رسم أو مسح أو قطعة مرجعية؟", "كم قطعة تحتاج ومتى تحتاجها؟"],
    faqTitle: "إجابات سريعة",
    faqs: [
      ["لماذا ألياف الكربون؟", "توفر صلابة وقوة ممتازتين مع وزن منخفض ومظهر تقني مميز."],
      ["هل يمكنكم نسخ قطعة موجودة؟", "نعم. الهندسة العكسية والمسح والتصميم اعتماداً على العينات ضمن قدراتنا."],
      ["هل تصنعون قطع السيارات فقط؟", "لا. ندعم الدراجات والطائرات المسيرة والروبوتات والمعدات الصناعية والتطبيقات البحرية والنماذج الأصلية."],
      ["كيف يتم تحديد السعر؟", "يعتمد السعر على الشكل والمادة والقوالب والكمية والتشطيب والجدول الزمني. يصدر السعر النهائي بعد المراجعة الهندسية."],
    ],
    ctaTitle: "هل أنت مستعد لجعل المحادثة التالية أكثر فائدة؟",
    ctaText: "وجّه العميل إلى نموذج طلب عرض السعر أو ادعه لاستكشاف منتجاتنا وأعمالنا.",
    quote: "ابدأ طلب عرض سعر",
    portfolio: "اعرض معرض الأعمال",
  },
};

export default function SalesGuide() {
  const { language } = useLanguage();
  const content = CONTENT[language];

  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative py-16 lg:py-24 border-b border-border grid-wires">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{content.eyebrow}</span>
            <h1 className="mt-4 max-w-4xl font-heading font-bold text-4xl lg:text-6xl tracking-tight">{content.title}</h1>
            <p className="mt-5 max-w-2xl text-foreground/70 text-lg">{content.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-[1100px] px-5 lg:px-8">
          <Reveal>
            <div className="border border-primary/40 bg-primary/5 p-7 lg:p-10">
              <div className="flex items-start gap-4">
                <Target className="text-primary shrink-0 mt-1" size={24} />
                <div>
                  <h2 className="font-heading font-bold text-2xl lg:text-3xl">{content.missionTitle}</h2>
                  <p className="mt-4 text-foreground/75 leading-relaxed">{content.mission}</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="mt-14">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-8">{content.principlesTitle}</h2>
          </Reveal>
          <div className="grid gap-px bg-border md:grid-cols-3">
            {content.principles.map(([title, text], index) => (
              <Reveal key={title} delay={index * 80}>
                <div className="bg-background p-7 h-full">
                  <CheckCircle2 className="text-primary mb-5" size={24} />
                  <h3 className="font-heading font-semibold text-lg">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-b border-border carbon-weave">
        <div className="mx-auto max-w-[1100px] px-5 lg:px-8">
          <Reveal><h2 className="font-heading font-bold text-3xl lg:text-4xl mb-10">{content.conversationTitle}</h2></Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {content.steps.map(([number, title, text]) => (
              <Reveal key={number} delay={Number(number) * 70}>
                <div className="flex gap-5 border border-border bg-background p-6 h-full">
                  <span className="font-heading font-bold text-3xl text-primary">{number}</span>
                  <div>
                    <h3 className="font-heading font-semibold text-lg">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center gap-3 mb-5"><MessageSquare className="text-primary" size={22} /><h2 className="font-heading font-bold text-2xl">{content.questionsTitle}</h2></div>
                <ul className="space-y-3">
                  {content.questions.map((question) => <li key={question} className="flex gap-3 text-sm text-foreground/75"><span className="text-primary">+</span>{question}</li>)}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-5"><ShieldCheck className="text-primary" size={22} /><h2 className="font-heading font-bold text-2xl">{content.faqTitle}</h2></div>
                <div className="space-y-5">
                  {content.faqs.map(([question, answer]) => <div key={question}><h3 className="font-semibold">{question}</h3><p className="mt-1 text-sm text-muted-foreground leading-relaxed">{answer}</p></div>)}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28 carbon-weave-red">
        <div className="mx-auto max-w-[900px] px-5 lg:px-8 text-center">
          <Reveal>
            <Sparkles className="mx-auto text-primary mb-5" size={28} />
            <h2 className="font-heading font-bold text-3xl lg:text-5xl">{content.ctaTitle}</h2>
            <p className="mt-4 text-foreground/70">{content.ctaText}</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/quote" className="scan-btn inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-white font-mono text-sm uppercase min-h-[44px]">{content.quote}<ArrowRight size={16} /></Link>
              <Link to="/portfolio" className="inline-flex items-center justify-center gap-2 h-12 px-7 border border-border font-mono text-sm uppercase hover:border-primary min-h-[44px]">{content.portfolio}</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
