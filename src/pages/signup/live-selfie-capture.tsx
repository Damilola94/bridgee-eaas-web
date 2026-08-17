import { useEffect, useRef, useState } from "react";
import { Camera, RefreshCcw } from "lucide-react";

export default function LiveSelfieCapture({
  label,
  required,
  onChange,
  capturedFile,
}: {
  label: string;
  required?: boolean;
  onChange: (file: File | null) => void;
  capturedFile?: File | null;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsStreaming(true);
    } catch (err) {
      setError(
        "Camera access was denied or is unavailable. Please allow camera permissions and try again.",
      );
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsStreaming(false);
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], `selfie-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        setPreviewUrl(URL.createObjectURL(blob));
        onChange(file);
        stopCamera();
      },
      "image/jpeg",
      0.92,
    );
  };

  const handleRetake = () => {
    setPreviewUrl(null);
    onChange(null);
    startCamera();
  };

  useEffect(() => {
    return () => {
      stopCamera();
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-textColor">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
        {previewUrl ? (
          <div className="relative">
            <img src={previewUrl} alt="Captured selfie" className="w-full aspect-video object-cover" />
            <button
              type="button"
              onClick={handleRetake}
              className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 text-sm font-medium px-3 py-1.5 rounded-lg"
            >
              <RefreshCcw size={14} /> Retake
            </button>
          </div>
        ) : (
          <div className="relative aspect-video flex items-center justify-center">
            <video
              ref={videoRef}
              className={`w-full h-full object-cover -scale-x-100 ${isStreaming ? "" : "hidden"}`}
              muted
              playsInline
            />
            {!isStreaming && (
              <button
                type="button"
                onClick={startCamera}
                className="flex flex-col items-center gap-2 text-gray-500 text-sm"
              >
                <Camera size={28} />
                Turn on camera
              </button>
            )}
            {isStreaming && (
              <button
                type="button"
                onClick={handleCapture}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#A3195B] hover:bg-[#8a1650] text-white text-sm font-medium px-5 py-2 rounded-lg"
              >
                Capture
              </button>
            )}
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {capturedFile && !previewUrl && (
        <p className="text-xs text-gray-500">Selected: {capturedFile.name}</p>
      )}
    </div>
  );
}