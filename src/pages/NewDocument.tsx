import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Upload, 
  ArrowRight, 
  Plus, 
  Trash2,
  FileText,
  X,
  Send
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useProjects } from "@/hooks/useData";
import { useCreateDocument } from "@/hooks/useDocuments";

interface Reviewer {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
}

const departments = [
  { value: "engineering", label: "الهندسة" },
  { value: "finance", label: "المالية" },
  { value: "procurement", label: "المشتريات" },
  { value: "accounting", label: "الحسابات" },
  { value: "management", label: "الإدارة" },
  { value: "legal", label: "الشؤون القانونية" },
];

const NewDocument = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: projects } = useProjects();
  const createDocument = useCreateDocument();

  const [files, setFiles] = useState<File[]>([]);
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [senderName, setSenderName] = useState("");
  const [reviewers, setReviewers] = useState<Reviewer[]>([
    { id: "1", name: "", email: "", phone: "", department: "engineering" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).filter(
      (file) => file.type === "application/pdf"
    );
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addReviewer = () => {
    setReviewers((prev) => [
      ...prev,
      { 
        id: Date.now().toString(), 
        name: "", 
        email: "", 
        phone: "",
        department: "engineering" 
      },
    ]);
  };

  const removeReviewer = (id: string) => {
    if (reviewers.length > 1) {
      setReviewers((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const updateReviewer = (id: string, field: keyof Reviewer, value: string) => {
    setReviewers((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !senderName || reviewers.some(r => !r.name || !r.email)) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createDocument.mutateAsync({
        title,
        description,
        senderName,
        projectId: projectId || null,
        files,
        reviewers: reviewers.map((r, index) => ({
          name: r.name,
          email: r.email,
          phone: r.phone,
          department: r.department,
          order: index + 1,
        })),
      });

      toast({
        title: "تم الإرسال",
        description: "تم رفع المستند وإرساله للمراجعة بنجاح",
      });

      navigate("/documents");
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء رفع المستند",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/documents">
          <Button variant="ghost" size="icon">
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Upload className="w-6 h-6" />
            رفع مستند جديد
          </h1>
          <p className="text-muted-foreground">ملفات PDF (يمكن رفع عدة ملفات)</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="p-6">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  isDragging 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-foreground font-medium mb-1">
                  اسحب الملفات هنا أو اضغط للاختيار
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  PDF فقط - يمكن رفع عدة ملفات
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button type="button" variant="outline" asChild>
                    <span>اختر الملفات</span>
                  </Button>
                </label>
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Document Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>المشروع</Label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المشروع (اختياري)" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects?.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>عنوان المستند *</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: مستخلص أعمال فرع المهندسين"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>الوصف</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وصف مختصر للمستند..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>اسم المرسل</Label>
                <Input
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="اسمك"
                  required
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reviewers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">المراجعون</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addReviewer}
                className="gap-1"
              >
                <Plus className="w-4 h-4" />
                إضافة مراجع
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviewers.map((reviewer, index) => (
                <div
                  key={reviewer.id}
                  className="p-4 rounded-xl border border-border bg-muted/30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-foreground">
                      مراجع {index + 1}
                    </span>
                    {reviewers.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeReviewer(reviewer.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>الإدارة</Label>
                      <Select
                        value={reviewer.department}
                        onValueChange={(value) =>
                          updateReviewer(reviewer.id, "department", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.value} value={dept.value}>
                              {dept.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>اسم المراجع *</Label>
                      <Input
                        value={reviewer.name}
                        onChange={(e) =>
                          updateReviewer(reviewer.id, "name", e.target.value)
                        }
                        placeholder="الاسم"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>البريد الإلكتروني</Label>
                      <Input
                        type="email"
                        value={reviewer.email}
                        onChange={(e) =>
                          updateReviewer(reviewer.id, "email", e.target.value)
                        }
                        placeholder="email@example.com"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label>رقم واتساب</Label>
                    <Input
                      type="tel"
                      value={reviewer.phone}
                      onChange={(e) =>
                        updateReviewer(reviewer.id, "phone", e.target.value)
                      }
                      placeholder="+201234567890"
                      dir="ltr"
                      className="mt-2"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            type="submit"
            className="w-full gradient-primary gap-2 h-12 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>جارٍ الإرسال...</>
            ) : (
              <>
                <Send className="w-5 h-5" />
                رفع وإرسال للمراجعة
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default NewDocument;