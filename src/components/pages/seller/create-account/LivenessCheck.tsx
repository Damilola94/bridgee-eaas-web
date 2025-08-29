import Image from "next/image";
import ProfilePicImage from "../../../../assets/images/profile-pic.jpg";
import Button from "../../../inputs/Button";

interface Props {
  onNavigateNext?: () => void;
}

export default function LivenessCheck({ onNavigateNext }: Props) {
  const handleNext = () => {
    if (onNavigateNext) {
      onNavigateNext();
    }
  };

  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-textColor">
          Take a Selfie
        </h3>
        <ul className="text-sm font-normal text-grey2 list-disc list-inside text-left mb-6">
          <li>Make sure you are in a well-lit area</li>
          <li>Make sure you are in front of a plain background</li>
          <li>Make sure you remove hats, thick glasses or anything else</li>
          <li>Make sure to keep your expression neutral</li>
          <li>Make sure to keep your face within the circle</li>
        </ul>
        <div className="w-full lg:w-52 h-[340px] lg:h-52 bg-gray-200 flex items-center overflow-hidden">
          <Image
            src={ProfilePicImage}
            alt="Selfie Preview"
            className="h-full w-full object-cover"
          />
          {/* In a real app, a <Webcam /> component would go here */}
          {/* <img src="/placeholder-selfie.png" alt="Selfie preview" className="w-full h-full object-cover" /> */}
        </div>
      </div>
      <div className="lg:flex gap-x-4 space-y-4 lg:space-y-0 mt-10">
        <Button className="w-full h-12 bg-transparent border border-grey !text-greyDark">
          Try again
        </Button>

        <Button
          onClick={handleNext}
          className="w-full h-12 bg-success text-white rounded-lg"
        >
          Save and Continue
        </Button>
      </div>
    </>
  );
}
