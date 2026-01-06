import { motion } from "framer-motion";
import { 
  HelpCircle, 
  MessageSquare,
  Phone,
  Mail,
  FileQuestion,
  ChevronDown,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "كيف يمكنني تحميل فاتورة بصيغة PDF؟",
    answer: "يمكنك تحميل أي فاتورة بالذهاب إلى قسم الفواتير، ثم النقر على زر القائمة بجانب الفاتورة واختيار 'تحميل PDF'."
  },
  {
    question: "كيف أتابع حالة مشروعي؟",
    answer: "يمكنك متابعة حالة جميع مشاريعك من خلال قسم المشاريع، حيث ستجد نسبة التقدم والمهام المكتملة والجدول الزمني."
  },
  {
    question: "كيف يمكنني تغيير كلمة المرور؟",
    answer: "اذهب إلى الإعدادات > الأمان > تغيير كلمة المرور، وأدخل كلمة المرور الحالية والجديدة."
  },
  {
    question: "هل يمكنني تصدير جميع الفواتير دفعة واحدة؟",
    answer: "نعم، يمكنك تصدير جميع الفواتير من خلال زر 'تصدير الفواتير' في أعلى صفحة الفواتير."
  },
  {
    question: "كيف يتم حساب المستحقات؟",
    answer: "المستحقات هي إجمالي مبالغ الفواتير غير المدفوعة أو المدفوعة جزئياً."
  },
];

const Support = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">الدعم والمساعدة</h1>
        <p className="text-muted-foreground">كيف يمكننا مساعدتك اليوم؟</p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">الدردشة المباشرة</h3>
          <p className="text-sm text-muted-foreground mb-4">تحدث مع فريق الدعم مباشرة</p>
          <Button className="w-full gradient-primary">ابدأ المحادثة</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-success" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">اتصل بنا</h3>
          <p className="text-sm text-muted-foreground mb-4">متاحون من 9 ص - 5 م</p>
          <Button variant="outline" className="w-full">920012345</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-warning" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">البريد الإلكتروني</h3>
          <p className="text-sm text-muted-foreground mb-4">نرد خلال 24 ساعة</p>
          <Button variant="outline" className="w-full">support@company.com</Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-primary/10">
              <FileQuestion className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">الأسئلة الشائعة</h2>
              <p className="text-sm text-muted-foreground">إجابات سريعة لأكثر الأسئلة شيوعاً</p>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-right hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-success/10">
              <Send className="w-5 h-5 text-success" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">إرسال استفسار</h2>
              <p className="text-sm text-muted-foreground">أرسل لنا رسالة وسنرد عليك قريباً</p>
            </div>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label>الموضوع</Label>
              <Input placeholder="موضوع الاستفسار" />
            </div>
            <div className="space-y-2">
              <Label>الرسالة</Label>
              <Textarea 
                placeholder="اكتب رسالتك هنا..." 
                className="min-h-[120px]"
              />
            </div>
            <Button type="submit" className="w-full gradient-primary">
              <Send className="w-4 h-4 ml-2" />
              إرسال الرسالة
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;
