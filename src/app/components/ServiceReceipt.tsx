import { Download, X } from "lucide-react";
import { Button } from "./ui/button";
import html2canvas from "html2canvas";
import { useRef } from "react";

interface ServiceReceiptProps {
  service: {
    id: string;
    service: string;
    date: string;
    staff: string;
    address: string;
    package?: string;
    amount?: string;
    duration?: string;
    notes?: string;
  };
  onClose: () => void;
}

export default function ServiceReceipt({ service, onClose }: ServiceReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const downloadAsImage = async () => {
    if (receiptRef.current) {
      try {
        const canvas = await html2canvas(receiptRef.current, {
          backgroundColor: "#191919",
          scale: 2,
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `receipt-${service.id}.png`;
        link.click();
      } catch (error) {
        console.error("Error downloading receipt:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#222222] border border-[#2a2a2a] rounded-lg p-8 max-w-md w-full">
        {/* Receipt Content */}
        <div ref={receiptRef} className="bg-[#191919] p-8 rounded-lg mb-6 space-y-6">
          {/* Header */}
          <div className="text-center border-b border-[#2a2a2a] pb-4">
            <h2 className="text-2xl text-[#fcb316] font-light" style={{ fontFamily: 'var(--font-headline)' }}>
              LUXIS PREMIUM
            </h2>
            <p className="text-[#fffefe]/60 text-xs mt-1">Professional Cleaning Services</p>
          </div>

          {/* Receipt Details */}
          <div className="space-y-4 text-sm">
            {/* Booking ID */}
            <div>
              <p className="text-[#fffefe]/60 text-xs uppercase tracking-wide">Booking ID</p>
              <p className="text-[#fffefe] font-semibold text-lg">{service.id}</p>
            </div>

            {/* Service Type */}
            <div>
              <p className="text-[#fffefe]/60 text-xs uppercase tracking-wide">Service</p>
              <p className="text-[#fffefe]">{service.service}</p>
            </div>

            {/* Package */}
            {service.package && (
              <div>
                <p className="text-[#fffefe]/60 text-xs uppercase tracking-wide">Package</p>
                <p className="text-[#fffefe]">{service.package}</p>
              </div>
            )}

            {/* Date */}
            <div>
              <p className="text-[#fffefe]/60 text-xs uppercase tracking-wide">Service Date</p>
              <p className="text-[#fffefe]">{service.date}</p>
            </div>

            {/* Duration */}
            {service.duration && (
              <div>
                <p className="text-[#fffefe]/60 text-xs uppercase tracking-wide">Duration</p>
                <p className="text-[#fffefe]">{service.duration}</p>
              </div>
            )}

            {/* Address */}
            <div>
              <p className="text-[#fffefe]/60 text-xs uppercase tracking-wide">Location</p>
              <p className="text-[#fffefe]">{service.address}</p>
            </div>

            {/* Staff */}
            <div>
              <p className="text-[#fffefe]/60 text-xs uppercase tracking-wide">Service Team</p>
              <p className="text-[#fffefe]">{service.staff}</p>
            </div>

            {/* Amount */}
            {service.amount && (
              <>
                <div className="border-t border-[#2a2a2a] pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-[#fffefe]/60">Service Amount:</p>
                    <p className="text-[#fcb316] font-semibold text-lg">{service.amount}</p>
                  </div>
                </div>
              </>
            )}

            {/* Notes */}
            {service.notes && (
              <div className="border-t border-[#2a2a2a] pt-4">
                <p className="text-[#fffefe]/60 text-xs uppercase tracking-wide mb-2">Notes</p>
                <p className="text-[#fffefe] text-xs">{service.notes}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-[#2a2a2a] pt-4 text-center">
            <p className="text-[#fffefe]/50 text-xs">
              Thank you for using LUXIS Premium Services
            </p>
            <p className="text-[#fffefe]/40 text-xs mt-2">
              Receipt generated on {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={downloadAsImage}
            className="flex-1 bg-[#fcb316] hover:bg-[#de950c] text-[#191919] rounded-lg flex items-center justify-center gap-2"
            style={{ fontFamily: 'var(--font-subheading)' }}
          >
            <Download size={16} />
            Download
          </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#fffefe] font-semibold mt-2 rounded-lg flex items-center justify-center gap-2"
              style={{ fontFamily: 'var(--font-subheading)' }}
            >
              <X size={16} />
              Close
            </Button>
        </div>
      </div>
    </div>
  );
}
