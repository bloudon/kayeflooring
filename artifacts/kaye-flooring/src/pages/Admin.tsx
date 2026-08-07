import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, LogOut, ImagePlus, CheckCircle, AlertCircle, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface Photo {
  id: string;
  full: string;
  thumb: string;
}

// ── Auth screen ───────────────────────────────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onLogin();
      } else {
        setError("Incorrect password");
      }
    } catch {
      setError("Could not reach server — is the API running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#1a0f09] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#2c1810] mb-4">
            <Lock className="w-6 h-6 text-[#c8956c]" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white">Gallery Admin</h1>
          <p className="text-sm text-white/50 mt-1">Kaye Flooring Inc</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c8956c] h-12"
            autoFocus
          />
          {error && (
            <p className="text-sm text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={loading || !password}
            className="w-full h-12 bg-[#c8956c] hover:bg-[#b5804f] text-white rounded-none font-medium"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchPhotos = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/api/admin/photos`, { credentials: "include" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as Photo[];
      setPhotos(data.reverse()); // newest first
    } catch {
      showToast("error", "Failed to load photos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchPhotos(); }, [fetchPhotos]);

  async function processFiles(files: FileList | File[]) {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (arr.length === 0) { showToast("error", "Please select image files only"); return; }

    setUploading(true);
    setUploadProgress(`Uploading ${arr.length} photo${arr.length !== 1 ? "s" : ""}…`);

    const fd = new FormData();
    arr.forEach((f) => fd.append("photos", f));

    try {
      const res = await fetch(`${BASE}/api/admin/photos/upload`, {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      const data = (await res.json()) as { uploaded: Photo[] };
      if (!res.ok) throw new Error();
      showToast("success", `${data.uploaded.length} photo${data.uploaded.length !== 1 ? "s" : ""} uploaded`);
      await fetchPhotos();
    } catch {
      showToast("error", "Upload failed — please try again");
    } finally {
      setUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) void processFiles(e.target.files);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) void processFiles(e.dataTransfer.files);
  }

  async function deletePhoto(id: string) {
    if (!confirm("Delete this photo? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await fetch(`${BASE}/api/admin/photos/${id}`, { method: "DELETE", credentials: "include" });
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      showToast("success", "Photo deleted");
    } catch {
      showToast("error", "Failed to delete photo");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleLogout() {
    await fetch(`${BASE}/api/admin/logout`, { method: "POST", credentials: "include" });
    onLogout();
  }

  return (
    <div className="min-h-screen bg-[#f9f7f5]">
      {/* Header */}
      <header className="bg-[#2c1810] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-lg">
        <div>
          <h1 className="text-lg font-serif font-bold">Gallery Admin</h1>
          <p className="text-xs text-white/50">Kaye Flooring Inc — {photos.length} photo{photos.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => void handleLogout()}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* Upload drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-sm cursor-pointer transition-all duration-200 p-12 text-center
            ${dragOver ? "border-[#c8956c] bg-[#c8956c]/5" : "border-[#2c1810]/20 hover:border-[#c8956c]/60 bg-white hover:bg-[#c8956c]/5"}
            ${uploading ? "pointer-events-none opacity-60" : ""}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-[#c8956c] animate-spin" />
              <p className="text-[#2c1810] font-medium">{uploadProgress}</p>
              <p className="text-sm text-[#2c1810]/50">Processing & resizing…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2c1810]/5">
                <ImagePlus className="w-7 h-7 text-[#c8956c]" />
              </div>
              <div>
                <p className="text-lg font-serif font-semibold text-[#2c1810]">Drop photos here</p>
                <p className="text-sm text-[#2c1810]/50 mt-1">or click to browse — any size, any format</p>
                <p className="text-xs text-[#2c1810]/40 mt-1">Images are automatically resized and optimized on upload</p>
              </div>
              <Button
                type="button"
                className="mt-2 bg-[#c8956c] hover:bg-[#b5804f] text-white rounded-none px-6"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                <Upload className="w-4 h-4 mr-2" /> Choose Files
              </Button>
            </div>
          )}
        </div>

        {/* Photo grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#c8956c] animate-spin" />
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20 text-[#2c1810]/40">
            <ImagePlus className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-serif text-lg">No photos yet</p>
            <p className="text-sm mt-1">Upload your first job photo above</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <AnimatePresence>
              {photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25 }}
                  className="relative group aspect-square overflow-hidden rounded-sm bg-[#2c1810]/5"
                >
                  <img
                    src={photo.thumb}
                    alt="Flooring job"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
                    <button
                      onClick={() => void deletePhoto(photo.id)}
                      disabled={deletingId === photo.id}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg"
                      title="Delete photo"
                    >
                      {deletingId === photo.id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-3 rounded-sm text-sm font-medium shadow-xl z-50 ${
              toast.type === "success"
                ? "bg-[#2c1810] text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {toast.type === "success"
              ? <CheckCircle className="w-4 h-4 shrink-0" />
              : <AlertCircle className="w-4 h-4 shrink-0" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Root component ────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null); // null = checking

  useEffect(() => {
    fetch(`${BASE}/api/admin/check`, { credentials: "include" })
      .then((r) => r.json())
      .then((d: { authed: boolean }) => setAuthed(d.authed))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen bg-[#1a0f09] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#c8956c] animate-spin" />
      </div>
    );
  }

  return authed
    ? <Dashboard onLogout={() => setAuthed(false)} />
    : <LoginForm onLogin={() => setAuthed(true)} />;
}
