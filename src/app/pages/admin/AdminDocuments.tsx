import AdminSidebar from "../../components/AdminSidebar";
import { FileText, Download, Eye, Trash2, ArrowLeft, Receipt, FileSignature, ShieldCheck, BarChart3, Upload } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useRef, useState, type ChangeEvent } from "react";

type DocumentType = "Contract" | "Policy" | "Report";

type TemplateSection = {
  title: string;
  content: string;
};

type DocumentTemplate = {
  summary: string;
  sections: TemplateSection[];
  staffChecklist?: string[];
};

type OtherDocument = {
  id: number;
  name: string;
  type: DocumentType;
  uploadedBy: string;
  date: string;
  size: string;
  template: DocumentTemplate;
};

type UploadedDocument = {
  id: number;
  name: string;
  type: "Uploaded";
  uploadedBy: string;
  date: string;
  size: string;
  file: File;
  createdAt: number;
};

type RecentDocument = OtherDocument | UploadedDocument;

const receipts = [
  { id: 1, name: "Receipt - BK-3401 - Maria Santos.pdf", client: "Maria Santos", amount: "PHP 4,500", date: "Apr 16, 2026", service: "Luxe Package 2", size: "1.2 MB" },
  { id: 2, name: "Receipt - BK-3400 - Jose Reyes.pdf", client: "Jose Reyes", amount: "PHP 3,200", date: "Apr 15, 2026", service: "Condominiums and Houses", size: "1.1 MB" },
  { id: 3, name: "Receipt - BK-3398 - Carlos Mendoza.pdf", client: "Carlos Mendoza", amount: "PHP 3,200", date: "Apr 15, 2026", service: "Luxe Package 1", size: "1.0 MB" },
  { id: 4, name: "Receipt - BK-3397 - Elena Torres.pdf", client: "Elena Torres", amount: "PHP 7,800", date: "Apr 14, 2026", service: "Post-Construction", size: "1.3 MB" },
  { id: 5, name: "Receipt - BK-3395 - Ana Cruz.pdf", client: "Ana Cruz", amount: "PHP 2,600", date: "Apr 13, 2026", service: "Offices", size: "980 KB" },
];

const contracts: OtherDocument[] = [
  {
    id: 101,
    name: "Contract – CL-1082 – Maria Santos.pdf",
    type: "Contract",
    uploadedBy: "Admin",
    date: "Apr 18, 2026",
    size: "1.5 MB",
    template: {
      summary: "Service agreement for recurring residential deep cleaning.",
      sections: [
        { title: "Parties", content: "NEAT Services Inc. and Maria Santos." },
        { title: "Scope", content: "Twice-monthly deep cleaning for kitchen, bathrooms, and bedrooms." },
        { title: "Payment", content: "Monthly fee payable every 5th of the month via bank transfer." },
      ],
    },
  },
  {
    id: 102,
    name: "Contract – CL-1079 – Jose Reyes.pdf",
    type: "Contract",
    uploadedBy: "Admin",
    date: "Apr 16, 2026",
    size: "1.4 MB",
    template: {
      summary: "Move-out cleaning contract for condominium handover.",
      sections: [
        { title: "Property", content: "Unit 1809, Pasig City, Metro Manila." },
        { title: "Deliverables", content: "Wall spot removal, floor polishing, and full bathroom sanitation." },
        { title: "Completion", content: "Service completion and correction window within 24 hours." },
      ],
    },
  },
  {
    id: 103,
    name: "Contract – CL-1074 – Carlos Mendoza.pdf",
    type: "Contract",
    uploadedBy: "Manager",
    date: "Apr 14, 2026",
    size: "1.6 MB",
    template: {
      summary: "Office cleaning agreement with weekly schedule and consumables.",
      sections: [
        { title: "Schedule", content: "Monday, Wednesday, Friday from 7:00 PM to 10:00 PM." },
        { title: "Materials", content: "Eco-friendly cleaning materials provided by NEAT." },
        { title: "Term", content: "Six-month initial contract with 30-day termination notice." },
      ],
    },
  },
];

const policies: OtherDocument[] = [
  {
    id: 201,
    name: "Safety Policy – Field Operations 2026.pdf",
    type: "Policy",
    uploadedBy: "Manager",
    date: "Apr 17, 2026",
    size: "1.8 MB",
    template: {
      summary: "Safety standards for all field teams and job sites.",
      sections: [
        { title: "PPE", content: "Gloves, masks, and non-slip footwear are required on all assignments." },
        { title: "Incidents", content: "All incidents must be reported within 30 minutes to the team lead." },
        { title: "Chemical Use", content: "Chemical mixing outside approved combinations is strictly prohibited." },
      ],
    },
  },
  {
    id: 202,
    name: "Data Privacy and Client Handling Policy.pdf",
    type: "Policy",
    uploadedBy: "Admin",
    date: "Apr 12, 2026",
    size: "1.2 MB",
    template: {
      summary: "Client data access and communication policy.",
      sections: [
        { title: "Access", content: "Only assigned roles can access client details in the operations system." },
        { title: "Sharing", content: "No external sharing of client identities, addresses, or private notes." },
        { title: "Retention", content: "Booking records retained for 24 months prior to archival." },
      ],
    },
  },
  {
    id: 203,
    name: "Uniform and Conduct Policy.pdf",
    type: "Policy",
    uploadedBy: "HR",
    date: "Apr 10, 2026",
    size: "920 KB",
    template: {
      summary: "Professional conduct and appearance standards for staff.",
      sections: [
        { title: "Uniform", content: "Official uniform and visible ID are required during shifts." },
        { title: "Conduct", content: "Staff must maintain respectful, professional client communication." },
        { title: "Escalation", content: "Concerns are escalated through team lead before shift completion." },
      ],
    },
  },
];

const reports: OtherDocument[] = [
  {
    id: 301,
    name: "Monthly Revenue Report – March 2026.xlsx",
    type: "Report",
    uploadedBy: "Finance",
    date: "Apr 19, 2026",
    size: "740 KB",
    template: {
      summary: "Monthly revenue and operations report for March 2026.",
      sections: [
        { title: "Revenue", content: "Gross revenue reached P1,285,000 across all service categories." },
        { title: "Expenses", content: "Total operating expenses amounted to P812,000." },
        { title: "Net Income", content: "Net operating income posted at P473,000 for the month." },
      ],
    },
  },
  {
    id: 302,
    name: "Service Completion Report – Week 15.pdf",
    type: "Report",
    uploadedBy: "Staff Lead",
    date: "Apr 16, 2026",
    size: "1.1 MB",
    template: {
      summary: "Weekly service completion and quality performance report.",
      sections: [
        { title: "Completion Rate", content: "124 of 129 jobs completed on time for a 96.1 percent rate." },
        { title: "Delays", content: "5 jobs were delayed and rescheduled within 48 hours." },
        { title: "Quality", content: "Average quality score improved to 4.7 out of 5." },
      ],
      staffChecklist: [
        "Arrival check-in with on-site contact",
        "Pre-cleaning hazard and equipment check",
        "Task-by-task area completion verification",
        "Supervisor quality walk-through",
        "Client sign-off and report upload",
      ],
    },
  },
  {
    id: 303,
    name: "Client Satisfaction Summary – Q1 2026.pdf",
    type: "Report",
    uploadedBy: "Manager",
    date: "Apr 11, 2026",
    size: "860 KB",
    template: {
      summary: "Quarterly satisfaction trends and retention indicators.",
      sections: [
        { title: "CSAT", content: "Overall satisfaction averaged 4.6 out of 5 from 812 responses." },
        { title: "Strengths", content: "Top comments praised punctuality and cleaning thoroughness." },
        { title: "Opportunities", content: "Clients requested tighter evening arrival time windows." },
      ],
    },
  },
];

const documentsByCategory: Record<"Contracts" | "Policies" | "Reports", OtherDocument[]> = {
  Contracts: contracts,
  Policies: policies,
  Reports: reports,
};

const documentTypeOrder = ["Receipts", "Contracts", "Policies", "Reports"];

const categoryFileCounts = {
  Receipts: receipts.length,
  Contracts: contracts.length,
  Policies: policies.length,
  Reports: reports.length,
};

const recentOtherDocuments = [...contracts, ...policies, ...reports]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 6);

const allowedDocumentExtensions = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".csv", ".txt", ".rtf"];
const allowedDocumentMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "text/plain",
  "application/rtf",
  "text/rtf",
]);

const acceptedDocumentTypes = allowedDocumentExtensions.join(",");

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;

  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};

const formatUploadDate = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const getDocumentTimestamp = (document: RecentDocument) =>
  "createdAt" in document ? document.createdAt : new Date(document.date).getTime();

const isAllowedDocumentFile = (file: File) => {
  const fileName = file.name.toLowerCase();
  const hasAllowedExtension = allowedDocumentExtensions.some((extension) => fileName.endsWith(extension));

  return hasAllowedExtension || allowedDocumentMimeTypes.has(file.type);
};

type Receipt = typeof receipts[0];

export default function AdminDocuments() {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [previewReceipt, setPreviewReceipt] = useState<Receipt | null>(null);
  const [previewDocument, setPreviewDocument] = useState<OtherDocument | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [uploadStatus, setUploadStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const recentDocuments: RecentDocument[] = [...uploadedDocuments, ...recentOtherDocuments]
    .sort((a, b) => getDocumentTimestamp(b) - getDocumentTimestamp(a))
    .slice(0, 6);

  const getTypeIcon = (type: DocumentType) => {
    if (type === "Contract") return <FileSignature size={16} className="text-[#191919]" />;
    if (type === "Policy") return <ShieldCheck size={16} className="text-[#191919]" />;
    return <BarChart3 size={16} className="text-[#191919]" />;
  };

  const handleUploadClick = () => {
    uploadInputRef.current?.click();
  };

  const handleDocumentUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    const invalidFiles = files.filter((file) => !isAllowedDocumentFile(file));

    if (invalidFiles.length > 0) {
      setUploadStatus({
        type: "error",
        message: "Only document files are allowed: PDF, DOC, DOCX, XLS, XLSX, CSV, TXT, and RTF.",
      });
      event.target.value = "";
      return;
    }

    const timestamp = Date.now();
    const newUploads = files.map((file, index) => ({
      id: timestamp + index,
      name: file.name,
      type: "Uploaded" as const,
      uploadedBy: "You",
      date: formatUploadDate(timestamp),
      size: formatFileSize(file.size),
      file,
      createdAt: timestamp + index,
    }));

    setUploadedDocuments((currentDocuments) => [...newUploads, ...currentDocuments]);
    setUploadStatus({
      type: "success",
      message: `${files.length} document${files.length > 1 ? "s" : ""} uploaded successfully.`,
    });
    event.target.value = "";
  };

  const handlePreviewUploadedDocument = (document: UploadedDocument) => {
    const objectUrl = URL.createObjectURL(document.file);
    const previewWindow = window.open(objectUrl, "_blank", "noopener,noreferrer");

    if (previewWindow) {
      previewWindow.opener = null;
    }

    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  };

  const handleDownloadUploadedDocument = (uploadedDocument: UploadedDocument) => {
    const objectUrl = URL.createObjectURL(uploadedDocument.file);
    const downloadLink = globalThis.document.createElement("a");

    downloadLink.href = objectUrl;
    downloadLink.download = uploadedDocument.name;
    downloadLink.click();

    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  };

  const handleDeleteUploadedDocument = (documentId: number) => {
    setUploadedDocuments((currentDocuments) => currentDocuments.filter((document) => document.id !== documentId));
    setUploadStatus({
      type: "success",
      message: "Uploaded document removed from the current session.",
    });
  };

  if (previewReceipt) {
    return (
      <div className="flex min-h-screen bg-[#191919]">
        <AdminSidebar />
        <div className="ml-64 flex-1 overflow-auto p-8">
          <button
            onClick={() => setPreviewReceipt(null)}
            className="flex items-center gap-2 text-[#fffefe]/70 hover:text-[#fcb316] mb-6 transition-colors"
            style={{ fontFamily: 'var(--font-subheading)' }}
          >
            <ArrowLeft size={20} />
            Back to Documents
          </button>
          <div className="max-w-2xl mx-auto bg-[#222222] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-[#fcb316] p-6">
              <h2 className="text-2xl text-[#191919]" style={{ fontFamily: 'var(--font-headline)' }}>NEAT Receipt</h2>
              <p className="text-[#191919]/70 text-sm mt-1">Premium Field Service Management</p>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[#fffefe]/50 text-sm mb-1">Receipt For</p>
                  <p className="text-[#fffefe] text-lg" style={{ fontFamily: 'var(--font-subheading)' }}>{previewReceipt.client}</p>
                </div>
                <div>
                  <p className="text-[#fffefe]/50 text-sm mb-1">Date</p>
                  <p className="text-[#fffefe]">{previewReceipt.date}</p>
                </div>
              </div>
              <div className="border-t border-[#2a2a2a] pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>{previewReceipt.service}</p>
                    <p className="text-[#fffefe]/50 text-sm mt-1">Professional cleaning service</p>
                  </div>
                  <p className="text-[#fcb316] text-xl" style={{ fontFamily: 'var(--font-headline)' }}>{previewReceipt.amount}</p>
                </div>
                <div className="mt-4 border-t border-[#2a2a2a] pt-4 flex justify-between">
                  <p className="text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>Transportation Fee</p>
                  <p className="text-[#fffefe]">PHP 600</p>
                </div>
                <div className="mt-4 border-t border-[#fcb316]/30 pt-4 flex justify-between">
                  <p className="text-xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>Total</p>
                  <p className="text-2xl text-[#fcb316]" style={{ fontFamily: 'var(--font-headline)' }}>{previewReceipt.amount}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-[#fcb316] hover:bg-[#de950c] text-[#191919]">
                  <Download size={16} className="mr-2" />
                  Download Receipt
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (previewDocument) {
    return (
      <div className="flex min-h-screen bg-[#191919]">
        <AdminSidebar />
        <div className="ml-64 flex-1 overflow-auto p-8">
          <button
            onClick={() => setPreviewDocument(null)}
            className="flex items-center gap-2 text-[#fffefe]/70 hover:text-[#fcb316] mb-6 transition-colors"
            style={{ fontFamily: 'var(--font-subheading)' }}
          >
            <ArrowLeft size={20} />
            Back to Documents
          </button>

          <div className="max-w-3xl mx-auto bg-[#222222] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-[#fcb316] p-6">
              <div className="flex items-center gap-2 text-[#191919]/80 text-sm mb-1">
                {getTypeIcon(previewDocument.type)}
                <span>{previewDocument.type} File Preview</span>
              </div>
              <h2 className="text-2xl text-[#191919]" style={{ fontFamily: 'var(--font-headline)' }}>{previewDocument.name}</h2>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[#fffefe]/50 text-sm mb-1">Uploaded By</p>
                  <p className="text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>{previewDocument.uploadedBy}</p>
                </div>
                <div>
                  <p className="text-[#fffefe]/50 text-sm mb-1">Date</p>
                  <p className="text-[#fffefe]">{previewDocument.date}</p>
                </div>
              </div>

              {previewDocument.type === "Contract" && (
                <>
                  <div className="border-t border-[#2a2a2a] pt-6">
                    <h3 className="text-[#fcb316] mb-2" style={{ fontFamily: 'var(--font-subheading)' }}>Service Agreement</h3>
                    <p className="text-[#fffefe]/80 leading-relaxed">
                      This contract is executed between NEAT Services Inc. and the named client for the delivery of cleaning services according to the terms below.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {previewDocument.template.sections.map((section, index) => (
                      <div key={section.title} className="border border-[#2a2a2a] rounded-xl p-4 bg-[#1e1e1e]">
                        <h4 className="text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-subheading)' }}>Clause {index + 1}: {section.title}</h4>
                        <p className="text-[#fffefe]/75 text-sm leading-relaxed">{section.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="border border-[#2a2a2a] rounded-xl p-4 bg-[#1e1e1e]">
                      <p className="text-[#fffefe]/60 text-xs mb-2">Client Signature</p>
                      <div className="border-b border-[#fffefe]/30 h-8" />
                    </div>
                    <div className="border border-[#2a2a2a] rounded-xl p-4 bg-[#1e1e1e]">
                      <p className="text-[#fffefe]/60 text-xs mb-2">Authorized NEAT Representative</p>
                      <div className="border-b border-[#fffefe]/30 h-8" />
                    </div>
                  </div>
                </>
              )}

              {previewDocument.type === "Policy" && (
                <>
                  <div className="border-t border-[#2a2a2a] pt-6">
                    <h3 className="text-[#fcb316] mb-2" style={{ fontFamily: 'var(--font-subheading)' }}>Policy Statement</h3>
                    <p className="text-[#fffefe]/80 leading-relaxed">{previewDocument.template.summary}</p>
                  </div>
                  <div className="border border-[#2a2a2a] rounded-xl p-4 bg-[#1e1e1e]">
                    <h4 className="text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-subheading)' }}>Applicability</h4>
                    <p className="text-[#fffefe]/75 text-sm">Applies to all NEAT staff, managers, and contractors handling on-site operations and client data.</p>
                  </div>
                  <div className="space-y-4">
                    {previewDocument.template.sections.map((section, index) => (
                      <div key={section.title} className="border border-[#2a2a2a] rounded-xl p-4 bg-[#1e1e1e]">
                        <h4 className="text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-subheading)' }}>Section {index + 1}: {section.title}</h4>
                        <p className="text-[#fffefe]/75 text-sm leading-relaxed">{section.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border border-[#2a2a2a] rounded-xl p-4 bg-[#1e1e1e]">
                    <h4 className="text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-subheading)' }}>Review and Enforcement</h4>
                    <p className="text-[#fffefe]/75 text-sm leading-relaxed">Policy compliance is monitored by department leads. Violations are escalated to Admin and HR for corrective action.</p>
                  </div>
                </>
              )}

              {previewDocument.type === "Report" && (
                <>
                  <div className="border-t border-[#2a2a2a] pt-6">
                    <h3 className="text-[#fcb316] mb-2" style={{ fontFamily: 'var(--font-subheading)' }}>Executive Summary</h3>
                    <p className="text-[#fffefe]/80 leading-relaxed">{previewDocument.template.summary}</p>
                  </div>
                  <div className="space-y-4">
                    {previewDocument.template.sections.map((section) => (
                      <div key={section.title} className="border border-[#2a2a2a] rounded-xl p-4 bg-[#1e1e1e]">
                        <h4 className="text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-subheading)' }}>{section.title}</h4>
                        <p className="text-[#fffefe]/75 text-sm leading-relaxed">{section.content}</p>
                      </div>
                    ))}
                  </div>
                  {previewDocument.template.staffChecklist && (
                    <div className="border border-[#2a2a2a] rounded-xl p-4 bg-[#1e1e1e]">
                      <h4 className="text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-subheading)' }}>Staff Checklist</h4>
                      <ul className="space-y-2">
                        {previewDocument.template.staffChecklist.map((item) => (
                          <li key={item} className="text-[#fffefe]/75 text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-[#fcb316] mt-[2px]">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              <div className="flex gap-3 mt-6">
                <Button className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919]">
                  <Download size={16} className="mr-2" />
                  Download {previewDocument.type}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeCategory) {
    return (
      <div className="flex min-h-screen bg-[#191919]">
        <AdminSidebar />
        <div className="ml-64 flex-1 overflow-auto p-8">
          <button
            onClick={() => setActiveCategory(null)}
            className="flex items-center gap-2 text-[#fffefe]/70 hover:text-[#fcb316] mb-6 transition-colors"
            style={{ fontFamily: 'var(--font-subheading)' }}
          >
            <ArrowLeft size={20} />
            Back to Documents
          </button>
          <h2 className="text-3xl text-[#fffefe] mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
            {activeCategory === "Receipts" ? "Receipts" : activeCategory}
          </h2>

          {activeCategory === "Receipts" ? (
            <div className="bg-[#222222] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full">
                <thead className="bg-[#1e1e1e]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Receipt</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Client</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Amount</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Date</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {receipts.map((r) => (
                    <tr key={r.id} className="border-t border-[#2a2a2a] hover:bg-[#1e1e1e] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Receipt className="text-[#fcb316]" size={20} />
                          <span className="text-[#fffefe] text-sm">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#fffefe]/70">{r.client}</td>
                      <td className="px-6 py-4 text-[#fcb316]">{r.amount}</td>
                      <td className="px-6 py-4 text-[#fffefe]/70">{r.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-[#fcb316]" onClick={() => setPreviewReceipt(r)}>
                            <Eye size={16} />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-[#fcb316]">
                            <Download size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-[#222222] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full">
                <thead className="bg-[#1e1e1e]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Document</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Date</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Size</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(documentsByCategory[activeCategory as keyof typeof documentsByCategory] || []).map((doc) => (
                    <tr key={doc.id} className="border-t border-[#2a2a2a] hover:bg-[#1e1e1e] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <FileText className="text-[#fcb316]" size={20} />
                          <span className="text-[#fffefe]">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#fffefe]/70">{doc.date}</td>
                      <td className="px-6 py-4 text-[#fffefe]/70">{doc.size}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-[#fcb316]" onClick={() => setPreviewDocument(doc)}><Eye size={16} /></Button>
                          <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-[#fcb316]"><Download size={16} /></Button>
                          <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-red-500"><Trash2 size={16} /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
      <div className="flex min-h-screen bg-[#191919]">
        <AdminSidebar />
        <div className="ml-64 flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-4xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
                Document Management
              </h1>
              <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>
                Store and manage important business documents
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 md:items-end">
              <Button
                type="button"
                onClick={handleUploadClick}
                className="bg-[#fcb316] hover:bg-[#de950c] text-[#191919] font-semibold shadow-lg shadow-[#fcb316]/20"
              >
                <Upload size={16} className="mr-2" />
                Upload Document
              </Button>
              {uploadStatus && (
                <p className={`text-sm ${uploadStatus.type === "error" ? "text-red-400" : "text-[#fffefe]/50"}`}>
                  {uploadStatus.message}
                </p>
              )}
            </div>
            <input
              ref={uploadInputRef}
              type="file"
              accept={acceptedDocumentTypes}
              multiple
              className="hidden"
              onChange={handleDocumentUpload}
            />
          </div>

          {/* Document Types Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {documentTypeOrder.map((type) => (
              <div
                key={type}
                onClick={() => setActiveCategory(type)}
                className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-2xl text-center hover:border-[#fcb316] transition-all cursor-pointer group shadow-lg"
              >
                <FileText className="text-[#fcb316] mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
                <p className="text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>{type}</p>
                <p className="text-[#fffefe]/50 text-xs mt-1">{categoryFileCounts[type as keyof typeof categoryFileCounts]} files</p>
              </div>
            ))}
          </div>

          {/* Recent Documents */}
          <div className="bg-[#222222] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between">
              <h2 className="text-xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>
                Recent Other Documents
              </h2>
              <Button size="sm" variant="ghost" className="text-[#fcb316]" onClick={() => setActiveCategory("Contracts")}>
                View All
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1e1e1e]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Document Name</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Type</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Uploaded By</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Date</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDocuments.map((doc) => (
                    <tr key={doc.id} className="border-t border-[#2a2a2a] hover:bg-[#1e1e1e] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <FileText className="text-[#fcb316]" size={20} />
                          <span className="text-[#fffefe]">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#fcb316]">{doc.type}</td>
                      <td className="px-6 py-4 text-[#fffefe]/70">{doc.uploadedBy}</td>
                      <td className="px-6 py-4 text-[#fffefe]/70">{doc.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {doc.type === "Uploaded" ? (
                            <>
                              <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-[#fcb316]" onClick={() => handlePreviewUploadedDocument(doc)}>
                                <Eye size={16} />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-[#fcb316]" onClick={() => handleDownloadUploadedDocument(doc)}>
                                <Download size={16} />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-red-500" onClick={() => handleDeleteUploadedDocument(doc.id)}>
                                <Trash2 size={16} />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-[#fcb316]" onClick={() => setPreviewDocument(doc)}>
                                <Eye size={16} />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-[#fcb316]">
                                <Download size={16} />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-red-500">
                                <Trash2 size={16} />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
