import Image from "next/image";
import Link from "next/link";

import Logo from "../../../assets/svgs/logos/full-pink.svg";

interface BuyerLogoProps {
  variant?: "mobile" | "desktop" | "both";
}

export default function BuyerLogo({ variant = "both" }: BuyerLogoProps) {
  const showMobile = variant === "both" || variant === "mobile";
  const showDesktop = variant === "both" || variant === "desktop";

  return (
    <>
      {showMobile && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center">
            <div className="my-4 ml-2">
              <Link href="#" onClick={() => {}}>
                <Image
                  src={Logo}
                  alt="UseBridgde Inc. logo"
                  priority
                  width={120}
                  height={45}
                />
              </Link>
            </div>
          </div>
        </div>
      )}

      {showDesktop && (
        <div className="hidden lg:block p-10">
          <Link href="#" onClick={() => {}}>
            <Image
              src={Logo}
              alt="UseBridgee Inc. logo"
              priority
              width={120}
              height={45}
            />
          </Link>
        </div>
      )}
    </>
  );
}
