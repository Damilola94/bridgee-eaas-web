import Image from "next/image";

type StatCardProps = {
  icon: any;
  label: string;
  value: string | number;
  badge?: string;
  badgeColor?: "green" | "red" | "orange";
};

const badgeStyles = {
  green: "bg-[#1C623C1A] text-[#237B4B]",
  red: "bg-[#EB3D221A] text-[#EB3D22]",
  orange: "bg-[#F0A1041A] text-[#F0A104]",
};

export default function InventoryStatCard({
  icon,
  label,
  value,
  badge,
  badgeColor = "green",
}: StatCardProps) {
  return (
    <div className="flex-1 bg-white border border-lightText/20 rounded-xl px-5 py-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="rounded-xl bg-primary/10 flex items-center justify-center p-3">
          <Image src={icon} alt={label} width={24} height={24} />
        </span>
        <div>
          <p className="text-sm text-lightText mb-1">{label}</p>
          <p className="font-bold text-2xl text-textColor">
            {value} 
          </p>
        </div>
      </div>
      {badge && (
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${badgeStyles[badgeColor]}`}>
          {badge}
        </span>
      )}
    </div>
  );
}