import StaffSidebar from "../../components/StaffSidebar";
import { Upload, Camera, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import Logo from "../../components/Logo";

type PhotoPreview = {
  id: string;
  url: string;
  name: string;
};

export default function StaffReports() {
  const [searchParams] = useSearchParams();
  const jobRefFromQuery = searchParams.get("jobRef") ?? "";

  const [formData, setFormData] = useState({
    jobRef: "",
    remarks: "",
    tasksCompleted: "",
    notes: "",
  });
  const [beforePhotos, setBeforePhotos] = useState<PhotoPreview[]>([]);
  const [afterPhotos, setAfterPhotos] = useState<PhotoPreview[]>([]);
  const beforeInputRef = useRef<HTMLInputElement | null>(null);
  const afterInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      beforePhotos.forEach((photo) => URL.revokeObjectURL(photo.url));
      afterPhotos.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
  }, [beforePhotos, afterPhotos]);

  useEffect(() => {
    if (!jobRefFromQuery) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      jobRef: jobRefFromQuery,
    }));
  }, [jobRefFromQuery]);

  const addPhotoPreviews = (
    files: FileList | null,
    setTarget: React.Dispatch<React.SetStateAction<PhotoPreview[]>>,
  ) => {
    if (!files || files.length === 0) {
      return;
    }

    const nextPreviews = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
        url: URL.createObjectURL(file),
        name: file.name,
      }));

    setTarget((prev) => [...prev, ...nextPreviews]);
  };

  const removePreview = (
    id: string,
    photos: PhotoPreview[],
    setTarget: React.Dispatch<React.SetStateAction<PhotoPreview[]>>,
  ) => {
    const targetPhoto = photos.find((photo) => photo.id === id);
    if (targetPhoto) {
      URL.revokeObjectURL(targetPhoto.url);
    }
    setTarget((prev) => prev.filter((photo) => photo.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <StaffSidebar />
      
      <div className="flex-1 md:ml-64 overflow-auto pb-20 md:pb-0">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-[#2a2a2a] bg-[#1e1e1e] sticky top-0 z-40">
          <Logo variant="light" size="md" />
        </div>

        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl text-[#fffefe] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
              Submit Report
            </h1>
            <p className="text-[#fffefe]/60" style={{ fontFamily: 'var(--font-body)' }}>
              Document your completed work
            </p>
          </div>

          {/* Report Form */}
          <div className="bg-[#222222] border border-[#2a2a2a] p-4 md:p-8 rounded-lg max-w-3xl">
            <form className="space-y-6">
              <div>
                <Label htmlFor="jobRef" className="text-[#fffefe]">Job Reference</Label>
                <Input
                  id="jobRef"
                  placeholder="e.g., JOB-2847"
                  value={formData.jobRef}
                  onChange={(e) => setFormData({ ...formData, jobRef: e.target.value })}
                  className="mt-2 bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316]"
                />
              </div>

              <div>
                <Label htmlFor="remarks" className="text-[#fffefe]">Remarks</Label>
                <Textarea
                  id="remarks"
                  placeholder="General observations and notes..."
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  className="mt-2 bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316] min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="tasks" className="text-[#fffefe]">Tasks Completed</Label>
                <Textarea
                  id="tasks"
                  placeholder="List all completed tasks..."
                  value={formData.tasksCompleted}
                  onChange={(e) => setFormData({ ...formData, tasksCompleted: e.target.value })}
                  className="mt-2 bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316] min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-[#fffefe]">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="mt-2 bg-[#1e1e1e] border-[#2a2a2a] text-[#fffefe] placeholder:text-[#fffefe]/40 focus:border-[#fcb316] min-h-[100px]"
                />
              </div>

              {/* Photo Upload Section */}
              <div>
                <Label className="text-[#fffefe] mb-3 block">Before/After Photos</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg p-4">
                    <button
                      type="button"
                      onClick={() => beforeInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-[#2a2a2a] rounded-lg p-6 text-center hover:border-[#fcb316] transition-colors"
                    >
                      <Camera className="text-[#fcb316] mx-auto mb-3" size={28} />
                      <p className="text-[#fffefe] mb-1" style={{ fontFamily: 'var(--font-body)' }}>Before Photos</p>
                      <p className="text-[#fffefe]/50 text-sm">Click to upload and preview</p>
                    </button>
                    <input
                      ref={beforeInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => addPhotoPreviews(e.target.files, setBeforePhotos)}
                    />

                    {beforePhotos.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {beforePhotos.map((photo) => (
                          <div key={photo.id} className="relative rounded-md overflow-hidden border border-[#2a2a2a]">
                            <img src={photo.url} alt={photo.name} className="w-full h-24 object-cover" />
                            <button
                              type="button"
                              onClick={() => removePreview(photo.id, beforePhotos, setBeforePhotos)}
                              className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-black"
                              aria-label="Remove before photo"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg p-4">
                    <button
                      type="button"
                      onClick={() => afterInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-[#2a2a2a] rounded-lg p-6 text-center hover:border-[#fcb316] transition-colors"
                    >
                      <Camera className="text-[#fcb316] mx-auto mb-3" size={28} />
                      <p className="text-[#fffefe] mb-1" style={{ fontFamily: 'var(--font-body)' }}>After Photos</p>
                      <p className="text-[#fffefe]/50 text-sm">Click to upload and preview</p>
                    </button>
                    <input
                      ref={afterInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => addPhotoPreviews(e.target.files, setAfterPhotos)}
                    />

                    {afterPhotos.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {afterPhotos.map((photo) => (
                          <div key={photo.id} className="relative rounded-md overflow-hidden border border-[#2a2a2a]">
                            <img src={photo.url} alt={photo.name} className="w-full h-24 object-cover" />
                            <button
                              type="button"
                              onClick={() => removePreview(photo.id, afterPhotos, setAfterPhotos)}
                              className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-black"
                              aria-label="Remove after photo"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-[#fcb316] hover:bg-[#de950c] text-[#191919] py-6"
                style={{ fontFamily: 'var(--font-subheading)' }}
              >
                <Upload size={20} className="mr-2" />
                Submit Report
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
