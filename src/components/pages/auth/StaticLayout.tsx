import Image from "next/image";
import OnboardingImage from "../../../assets/images/onboarding-image.png"

export default function StaticLayout() {
  return (
    <div className="hidden lg:flex w-1/2 relative h-auto">
      <Image src={OnboardingImage} alt="Onboarding Image" className="object-cover w-full h-full"  />
    </div>
  );
}