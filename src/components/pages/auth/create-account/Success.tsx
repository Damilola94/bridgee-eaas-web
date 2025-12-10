import Image from "next/image";

import { useRouter } from "next/router";

import Button from "../../../inputs/Button";
import BadgeCheck from "../../../../assets/svgs/check-star.svg";

interface Props {
  title?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function Success({
  title = "Account created successfully",
  buttonText = "Login",
  onButtonClick
}: Props) {
  const router = useRouter();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      router.push("/seller/login");
    }
  };

  return (
    <div className="text-center w-full max-w-md mt-24">
      <div className="w-20 h-20 mx-auto flex items-center justify-center mb-8">
        <Image src={BadgeCheck} alt="Success Check" />
      </div>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <Button
        onClick={handleButtonClick}
        className="w-full h-12 bg-success text-white rounded-lg"
      >
        {buttonText}
      </Button>
    </div>
  );
}