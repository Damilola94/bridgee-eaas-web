import { ReactNode } from "react";
import clsx from "clsx";

const variants = {
  blue: {
    border: "border-[#2435A1]",
    value: "text-[#2435A1]",
    iconBg: "bg-[#EEF2FF]",
    icon: "text-[#2435A1]",
  },
  green: {
    border: "border-[#2FA65A]",
    value: "text-[#2FA65A]",
    iconBg: "bg-[#EAF8EF]",
    icon: "text-[#2FA65A]",
  },
  pink: {
    border: "border-[#B31772]",
    value: "text-[#B31772]",
    iconBg: "bg-[#FCEAF4]",
    icon: "text-[#B31772]",
  },
  neutral: {
    border: "border-[#D9D9D9]",
    value: "text-[#1A1A1A]",
    iconBg: "bg-[#F3F3F3]",
    icon: "text-[#444444]",
  },
};

type Props = {
  icon: ReactNode;
  label: string;
  value: string;
  variant?: keyof typeof variants;
};

export function StatCard({
  icon,
  label,
  value,
  variant = "neutral",
}: Props) {
  const style = variants[variant];

  return (
    <div
      className={clsx(
        "bg-white rounded-[20px] border px-7 py-7 h-[185px] flex flex-col justify-between",
        style.border
      )}
    >
      <div
        className={clsx(
          "w-14 h-14 rounded-full flex items-center justify-center",
          style.iconBg,
          style.icon
        )}
      >
        {icon}
      </div>

      <div>
        <p className="text-[15px] font-medium text-[#202020] mb-2">
          {label}
        </p>

        <h3 className={clsx("text-[22px] font-bold", style.value)}>
          {value}
        </h3>
      </div>
    </div>
  );
}