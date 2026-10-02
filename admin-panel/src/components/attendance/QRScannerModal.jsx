import React, { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";
import { 
  Camera, X, CheckCircle2, AlertCircle, RefreshCw, 
  Keyboard, ScanLine, UserCheck, Loader2 
} from "lucide-react";
import toast from "react-hot-toast";
import { scanQRAttendanceAPI } from "../../api/attendance.api";

// Web Audio API beep sound for scan confirmation
const playSuccessBeep = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.25);
  } catch {
    // Ignore audio autoplay restrictions
  }
};

export default function QRScannerModal({ isOpen, onClose, batchId, onScanSuccess }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const streamRef = useRef(null);

  const [hasCamera, setHasCamera] = useState(true);
  const [cameraError, setCameraError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [manualId, setManualId] = useState("");
  const [lastScanned, setLastScanned] = useState(null);
  const [facingMode, setFacingMode] = useState("environment"); // back camera on phones

  // Start Camera
  const startCamera = async () => {
    setCameraError("");
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facingMode }, width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
      }
      setHasCamera(true);
      requestAnimationFrame(tick);
    } catch (err) {
      console.warn("Camera access error:", err);
      setHasCamera(false);
      setCameraError(err.message || "Camera permission denied or camera not found.");
    }
  };

  // Process Camera Frames with jsQR
  const tick = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code && code.data && !isProcessing) {
        handleCodeDetected(code.data);
        return; // Pause scanning while processing
      }
    }

    animationFrameRef.current = requestAnimationFrame(tick);
  };

  const handleCodeDetected = async (data) => {
    setIsProcessing(true);
    try {
      const res = await scanQRAttendanceAPI({ qrData: data, batchId });
      playSuccessBeep();
      setLastScanned(res.student);
      toast.success(res.message || "Student Marked Present!");
      if (onScanSuccess) onScanSuccess(res);
      // Wait 2.5s before resuming scan to prevent duplicate scans
      setTimeout(() => {
        setIsProcessing(false);
        requestAnimationFrame(tick);
      }, 2500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Student scan failed");
      setTimeout(() => {
        setIsProcessing(false);
        requestAnimationFrame(tick);
      }, 2000);
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualId.trim()) return toast.error("Enter a Student ID or Reg Number");
    setIsProcessing(true);
    try {
      const res = await scanQRAttendanceAPI({ qrData: manualId.trim(), batchId });
      playSuccessBeep();
      setLastScanned(res.student);
      toast.success(res.message || "Student Marked Present!");
      setManualId("");
      if (onScanSuccess) onScanSuccess(res);
    } catch (err) {
      toast.error(err.response?.data?.message || "Student not found");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setLastScanned(null);
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, facingMode]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-power-red/10 text-power-red rounded-xl border border-power-red/20">
              <ScanLine size={20} />
            </div>
            <div>
              <h2 className="text-base font-black text-zinc-100 tracking-tight">Camera QR Scanner</h2>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Instant Student Attendance</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-white/5 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Viewport / Scanner */}
        <div className="p-6 flex flex-col items-center">
          {hasCamera ? (
            <div className="relative w-full aspect-square max-w-[340px] rounded-3xl overflow-hidden bg-black border-2 border-dashed border-white/20 shadow-inner flex items-center justify-center">
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover" 
                muted 
                playsInline 
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Scanning Target Overlay */}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                <div className="w-56 h-56 border-2 border-emerald-400/80 rounded-2xl relative shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                  {/* Corner Accent Markers */}
                  <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" />
                  <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />

                  {/* Laser Scan Animation Bar */}
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent absolute animate-pulse top-1/2 -translate-y-1/2" />
                </div>
                <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                  Align Student ID Card QR Code
                </p>
              </div>

              {/* Camera Switch button (Mobile front/back) */}
              <button
                onClick={() => setFacingMode((prev) => (prev === "environment" ? "user" : "environment"))}
                className="absolute bottom-3 right-3 p-2.5 bg-black/60 hover:bg-black text-white rounded-xl backdrop-blur-md border border-white/10 transition-all text-xs flex items-center gap-1.5"
                title="Switch Camera"
              >
                <RefreshCw size={14} /> Flip
              </button>
            </div>
          ) : (
            <div className="w-full aspect-video bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 text-center flex flex-col items-center justify-center">
              <AlertCircle size={36} className="text-rose-400 mb-2" />
              <p className="text-xs font-bold text-rose-300">Camera Unavailable</p>
              <p className="text-[11px] text-zinc-400 mt-1 max-w-xs">{cameraError || "Permission not granted. Please enter the student ID below."}</p>
              <button 
                onClick={startCamera} 
                className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Last Scanned Feedback Banner */}
          {lastScanned && (
            <div className="w-full mt-4 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center shrink-0">
                {lastScanned.photo_url ? (
                  <img src={lastScanned.photo_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <UserCheck size={20} className="text-emerald-400" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-black text-zinc-100 truncate">{lastScanned.student_name}</h4>
                  <span className="text-[9px] font-black uppercase bg-emerald-500 text-black px-1.5 py-0.5 rounded">Present</span>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{lastScanned.student_id}</p>
              </div>
            </div>
          )}

          {/* Manual Input Fallback */}
          <form onSubmit={handleManualSubmit} className="w-full mt-5 flex gap-2">
            <div className="relative flex-1">
              <Keyboard size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                placeholder="Or type Student ID (e.g. STD-2024-001)..."
                className="w-full bg-white/5 border border-white/10 text-zinc-200 text-xs font-bold rounded-xl pl-9 pr-3 py-3 outline-none focus:border-power-red/50 focus:ring-1 focus:ring-power-red/50 transition-all placeholder:text-zinc-600"
              />
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-4 py-3 bg-power-red hover:bg-[#C8102E] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-power-red/20 disabled:opacity-50 flex items-center gap-1.5"
            >
              {isProcessing ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
              Mark
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-zinc-300 font-bold text-xs rounded-xl transition-all"
          >
            Close Scanner
          </button>
        </div>
      </div>
    </div>
  );
}
