import Button from "../../../inputs/Button";
import BadgeCheck from "../../../../assets/svgs/check-star.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter()
  return (
    <div className="text-center w-full max-w-md mt-24">
      <div className="w-20 h-20 mx-auto flex items-center justify-center mb-8">
        <Image src={BadgeCheck} alt="Success Check" />
      </div>
      <h2 className="text-2xl font-bold mb-6">Account created successfully</h2>
      <Button
        onClick={() => router.push("/seller/login")}
        className="w-full h-12 bg-success text-white rounded-lg"
      >
        Login
      </Button>
    </div>
  );
}
