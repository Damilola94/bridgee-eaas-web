// import { StepData } from "@/pages/seller/create-account";
// NOTE: You would need a library like 'react-webcam' for a real implementation.
// This is a placeholder to match the UI design.

import Image from "next/image";
import ProfilePicImage from "../../../../assets/images/profile-pic.jpg";

// interface Props {
//   formData: StepData;
//   setFormData: (data: StepData) => void;
// }

export default function LivenessCheck() {
  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-2 text-textColor">Take a Selfie</h3>
      <ul className="text-sm font-normal text-grey2 list-disc list-inside text-left mb-6">
        <li>Make sure you are in a well-lit area</li>
        <li>Make sure you are in front of a plain background</li>
        <li>Make sure you remove hats, thick glasses or anything else</li>
        <li>Make sure to keep your expression neutral</li>
        <li>Make sure to keep your face within the circle</li>
      </ul>
      <div className="w-full lg:w-52 h-[340px] lg:h-52 bg-gray-200 flex items-center overflow-hidden">
        <Image src={ProfilePicImage} alt="Selfie Preview" className="h-full w-full object-cover" />
        {/* In a real app, a <Webcam /> component would go here */}
        {/* <img src="/placeholder-selfie.png" alt="Selfie preview" className="w-full h-full object-cover" /> */}
      </div>
    </div>
  );
}