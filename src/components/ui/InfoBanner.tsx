import { Info } from "lucide-react";

interface InfoBannerProps {
  children: React.ReactNode;
}

export function InfoBanner({ children }: InfoBannerProps) {
  return (
    <div className="bg-pink-50 text-pink-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
      <span className="w-5 h-5 rounded-full bg-[#A3195B] text-white flex items-center justify-center shrink-0">
        <Info className="h-3 w-3" />
      </span>
      {children}
    </div>
  );
}