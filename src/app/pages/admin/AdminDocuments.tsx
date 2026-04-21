import AdminSidebar from "../../components/AdminSidebar";
import { FileText, Download, Eye, Trash2, X, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";

const receipts = [
  { id: 1, name: "Receipt – BK-3401 – Maria Santos.pdf", client: "Maria Santos", amount: "₱4,500", date: "Apr 16, 2026", service: "Luxe Package 2", size: "1.2 MB" },
  { id: 2, name: "Receipt – BK-3400 – Jose Reyes.pdf", client: "Jose Reyes", amount: "₱3,200", date: "Apr 15, 2026", service: "Condominiums and Houses", size: "1.1 MB" },
  { id: 3, name: "Receipt – BK-3398 – Carlos Mendoza.pdf", client: "Carlos Mendoza", amount: "₱3,200", date: "Apr 15, 2026", service: "Luxe Package 1", size: "1.0 MB" },
  { id: 4, name: "Receipt – BK-3397 – Elena Torres.pdf", client: "Elena Torres", amount: "₱7,800", date: "Apr 14, 2026", service: "Post-Construction", size: "1.3 MB" },
  { id: 5, name: "Receipt – BK-3395 – Ana Cruz.pdf", client: "Ana Cruz", amount: "₱2,600", date: "Apr 13, 2026", service: "Offices", size: "980 KB" },
];

const categoryDocs = [
  { id: 1, name: "Safety Protocols 2026.pdf", type: "Policy", uploadedBy: "Manager", date: "Apr 08, 2026", size: "1.8 MB" },
  { id: 2, name: "Client Contract Template.docx", type: "Contract", uploadedBy: "Admin", date: "Apr 05, 2026", size: "856 KB" },
  { id: 3, name: "Equipment Inventory March.xlsx", type: "Report", uploadedBy: "Admin", date: "Apr 01, 2026", size: "512 KB" },
];

type Receipt = typeof receipts[0];

export default function AdminDocuments() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [previewReceipt, setPreviewReceipt] = useState<Receipt | null>(null);

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
              <h2 className="text-2xl text-[#191919]" style={{ fontFamily: 'var(--font-headline)' }}>LUXIS Receipt</h2>
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
                  <p className="text-[#fffefe]">₱600</p>
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
                          <FileText className="text-[#fcb316]" size={20} />
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
                  {categoryDocs.map((doc) => (
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
                          <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-[#fcb316]"><Eye size={16} /></Button>
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
                Document Management
              </h1>
              <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>
                Store and manage important business documents
              </p>
            </div>
          </div>

          {/* Document Types Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {["Receipts", "Contracts", "Policies", "Reports"].map((type) => (
              <div
                key={type}
                onClick={() => setActiveCategory(type)}
                className="bg-[#222222] border border-[#2a2a2a] p-6 rounded-2xl text-center hover:border-[#fcb316] transition-all cursor-pointer group shadow-lg"
              >
                <FileText className="text-[#fcb316] mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
                <p className="text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>{type}</p>
                {type === "Receipts" && (
                  <p className="text-[#fffefe]/50 text-xs mt-1">{receipts.length} files</p>
                )}
              </div>
            ))}
          </div>

          {/* Recent Receipts */}
          <div className="bg-[#222222] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between">
              <h2 className="text-xl text-[#fffefe]" style={{ fontFamily: 'var(--font-subheading)' }}>
                Recent Receipts
              </h2>
              <Button size="sm" variant="ghost" className="text-[#fcb316]" onClick={() => setActiveCategory("Receipts")}>
                View All
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1e1e1e]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Document Name</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Client</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Amount</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Date</th>
                    <th className="px-6 py-4 text-left text-[#fffefe]/70" style={{ fontFamily: 'var(--font-subheading)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {receipts.slice(0, 3).map((r) => (
                    <tr key={r.id} className="border-t border-[#2a2a2a] hover:bg-[#1e1e1e] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <FileText className="text-[#fcb316]" size={20} />
                          <span className="text-[#fffefe]">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#fffefe]/70">{r.client}</td>
                      <td className="px-6 py-4 text-[#fcb316]">{r.amount}</td>
                      <td className="px-6 py-4 text-[#fffefe]/70">{r.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-[#fcb316]" onClick={() => setPreviewReceipt(r)}>
                            <Eye size={16} />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-[#fcb316]">
                            <Download size={16} />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-[#fffefe] hover:text-red-500">
                            <Trash2 size={16} />
                          </Button>
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
